<script>
// -----------------------------------------------------------
// V77.1 IRONCLAD — MASTER JS (UI SAFE)
// -----------------------------------------------------------

const ENDPOINT = "https://script.google.com/macros/s/AKfycbxaMo1Gi8KjfYOr1_pHJI5XYJ1t9FK4PWkFCm8lU4MsCmUXvY0nSUIqYTAqhpumFRFL/exec";

let RAW_DATA = [], POOL = [], SCORE = 0, MISTAKES = [];
let MODE = "DATASET_SELECT";
let CURRENT_DATASET = "", CURRENT_TOPIC = "", CURRENT_GENRE = "";
let isTransitioning = false;

const CLAMP_DIST = 32;
const OPACITY_DIST = 24;

// ---------- UTIL ----------
const formatChem = t =>
    t ? t.toString()
        .replace(/([A-Z][a-z]?)(\d+)/g,'$1<sub>$2</sub>')
        .replace(/(\d*)([+\-])/g,'<sup>$1$2</sup>')
        .replace(/\|\|/g,'<br><br>') : "";

// ---------- INIT ----------
async function init(){
    const loader = document.getElementById("loader");

    try {
        const r = await fetch(ENDPOINT);
        const j = await r.json();
        if (Array.isArray(j) && j.length) RAW_DATA = j;
    } catch {
        RAW_DATA = [...BACKUP_DATA];
    }

    renderDatasetSelect();
    loader.remove();
}

// ---------- SCREENS ----------
function renderDatasetSelect(){
    MODE="DATASET_SELECT";
    const s=document.getElementById("stack");
    s.innerHTML="";
    const c=document.createElement("div");
    c.className="card";
    c.innerHTML=`
        <div class="card-q">SELECT CURRICULUM</div>
        <div class="swipe-label sl-up">CORE CHEMISTRY</div>
        <div class="swipe-label sl-left">INDUSTRIAL APPS</div>
        <div class="swipe-label sl-right">REVISION SET</div>
        <div class="swipe-label sl-down">EXPERT CHALLENGE</div>`;
    s.appendChild(c);
    bindPhysics(c);
}

function renderTopicSelect(ds){
    MODE="TOPIC_SELECT";
    CURRENT_DATASET=ds;
    const s=document.getElementById("stack");
    s.innerHTML="";
    const c=document.createElement("div");
    c.className="card";
    c.innerHTML=`
        <div class="card-q">CHOOSE DOMAIN</div>
        <div class="swipe-label sl-up">PHYSICAL</div>
        <div class="swipe-label sl-left">ORGANIC</div>
        <div class="swipe-label sl-right">INORGANIC</div>
        <div class="swipe-label sl-down">ANALYTICAL</div>`;
    s.appendChild(c);
    bindPhysics(c);
}

function renderGenreSelect(topic){
    MODE="GENRE_SELECT";
    CURRENT_TOPIC=topic;
    const s=document.getElementById("stack");
    s.innerHTML="";
    const c=document.createElement("div");
    c.className="card";
    c.innerHTML=`
        <div class="card-q">SELECT DEPTH</div>
        <div class="swipe-label sl-up">CONCEPT MASTERY</div>
        <div class="swipe-label sl-down">APPLIED PROBLEMS</div>
        <div class="swipe-label sl-left">LAB</div>
        <div class="swipe-label sl-right">PH.D</div>`;
    s.appendChild(c);
    bindPhysics(c);
}

function renderComingSoon(label){
    MODE="COMING_SOON";
    const s=document.getElementById("stack");
    s.innerHTML="";
    const c=document.createElement("div");
    c.className="card";
    c.innerHTML=`
        <div class="card-q">${label}<br><small>COMING SOON</small></div>
        <div class="swipe-label sl-down">BACK</div>`;
    s.appendChild(c);
    bindPhysics(c);
}

// ---------- QUIZ ----------
function startQuiz(topic, genre){
    CURRENT_GENRE = genre;
    POOL = RAW_DATA.filter(q =>
        q.dataset===CURRENT_DATASET &&
        q.topic===topic &&
        q.q_type===genre
    ).sort(()=>Math.random()-0.5);

    renderNext();
}

function renderNext(){
    const s=document.getElementById("stack");
    s.innerHTML="";
    if(!POOL.length){ renderEnd(); return; }

    MODE="QUIZ";
    const q=POOL.shift();
    const c=document.createElement("div");
    c.className="card";
    c.innerHTML=`
        <div class="card-q">${formatChem(q.question_text)}</div>
        <div class="swipe-label sl-up">${q.swipe_up_label}</div>
        <div class="swipe-label sl-left">${q.swipe_left_label}</div>
        <div class="swipe-label sl-right">${q.swipe_right_label}</div>
        <div class="swipe-label sl-down sl-down-hint">${formatChem(q.hint)}</div>
        <div class="overlay">
            <div class="overlay-label">LOGIC ANALYSIS</div>
            <div class="overlay-body">${formatChem(q.explanation)}</div>
            <button class="btn" onclick="this.parentElement.classList.remove('active')">CONTINUE</button>
        </div>`;
    s.appendChild(c);
    bindPhysics(c,q);
}

function renderEnd(){
    MODE="SESSION_END";
    const s=document.getElementById("stack");
    s.innerHTML="";
    const c=document.createElement("div");
    c.className="card";
    c.innerHTML=`
        <div class="card-q">SESSION COMPLETE<br><small>${SCORE} XP EARNED</small></div>
        <div class="swipe-label sl-up">RESTART</div>
        <div class="swipe-label sl-down">MAIN MENU</div>`;
    s.appendChild(c);
    bindPhysics(c);
}

// ---------- PHYSICS ----------
function bindPhysics(el,data){
    let sx=0,sy=0,x=0,y=0,active=false,dir=null;
    const labels={
        up:el.querySelector(".sl-up"),
        dn:el.querySelector(".sl-down"),
        lt:el.querySelector(".sl-left"),
        rt:el.querySelector(".sl-right")
    };

    const start=e=>{
        if(isTransitioning) return;
        active=true;
        const p=e.touches?e.touches[0]:e;
        sx=p.clientX; sy=p.clientY;
        el.style.transition="none";
    };

    const move=e=>{
        if(!active) return;
        const p=e.touches?e.touches[0]:e;
        const dx=p.clientX-sx, dy=p.clientY-sy;
        const d=Math.hypot(dx,dy);
        let a=Math.atan2(-dy,dx)*180/Math.PI; if(a<0)a+=360;

        Object.values(labels).forEach(l=>l&&(l.style.opacity=0));
        if(d>5){
            if(a>=45&&a<135) labels.up&&(labels.up.style.opacity=1,dir="UP");
            else if(a>=135&&a<225) labels.lt&&(labels.lt.style.opacity=1,dir="LEFT");
            else if(a>=225&&a<315) labels.dn&&(labels.dn.style.opacity=1,dir="DOWN");
            else labels.rt&&(labels.rt.style.opacity=1,dir="RIGHT");
        }

        x=Math.min(CLAMP_DIST,dx);
        y=Math.min(CLAMP_DIST,dy);
        el.style.transform=`translate(${x}px,${y}px) rotate(${x/25}deg)`;
    };

    const end=()=>{
        if(!active) return;
        active=false;
        Object.values(labels).forEach(l=>l&&(l.style.opacity=0));
        if(dir) handleAction(el,data,dir);
        el.style.transition="transform .3s";
        el.style.transform="translate(0,0)";
        dir=null;
    };

    el.onmousedown=start;
    el.ontouchstart=start;
    window.onmousemove=move;
    window.ontouchmove=move;
    window.onmouseup=end;
    window.ontouchend=end;
}

// ---------- ACTION ROUTER ----------
function handleAction(el,data,dir){
    if(MODE==="DATASET_SELECT"){
        const m={UP:"SET_A",LEFT:"SET_B",RIGHT:"SET_C",DOWN:"SET_D"};
        renderTopicSelect(m[dir]);
    }
    else if(MODE==="TOPIC_SELECT"){
        const m={UP:"Physical",LEFT:"Organic",RIGHT:"Inorganic",DOWN:"Analytical"};
        renderGenreSelect(m[dir]);
    }
    else if(MODE==="GENRE_SELECT"){
        if(dir==="UP") startQuiz(CURRENT_TOPIC,"CONCEPT");
        else if(dir==="DOWN") startQuiz(CURRENT_TOPIC,"APPLICATION");
        else if(dir==="LEFT") renderComingSoon("LAB MODE");
        else if(dir==="RIGHT") renderComingSoon("PH.D MODE");
    }
    else if(MODE==="COMING_SOON"){
        if(dir==="DOWN") renderGenreSelect(CURRENT_TOPIC);
    }
    else if(MODE==="QUIZ"){
        if(dir===data.correct) SCORE+=10*data.weight;
        else SCORE=Math.max(0,SCORE-5);
        renderNext();
    }
    else if(MODE==="SESSION_END"){
        if(dir==="UP") startQuiz(CURRENT_TOPIC,CURRENT_GENRE);
        else if(dir==="DOWN") renderDatasetSelect();
    }
}

window.onload=init;
</script>
