/* --- CONFIGURATION --- */
const ENDPOINT = "https://script.google.com/macros/s/AKfycbxMOVzmONXP6nAHNoN92nmO2MnMPek7omYcw0JCeizbsIOQZUik0VmUK0nTfikIfFLm/exec";
let RAW_DATA = [...BACKUP_DATA], POOL=[], MISTAKES=[], SCORE=0, isTransitioning=false;
let MODE="QUIZ", startTime=0, latency=0; 

// PHYSICS CONSTANTS
const CLAMP_DIST = 32;   
const OPACITY_DIST = 24;  

const formatChem = t => {
    if(!t) return "";
    return t.toString().replace(/([A-Z][a-z]?)(\d+)/g,'$1<sub>$2</sub>').replace(/(\d*)([+\-])/g, '<sup>$1$2</sup>');
};

/* --- SYSTEM INIT --- */
async function init(){
    const l = document.getElementById('loader');
    // We default to the 50-question set provided in BACKUP_DATA
    POOL = [...RAW_DATA].sort(() => Math.random() - .5);
    if(l) l.remove();
    renderNext();
}

/* --- RENDER ENGINE (FIXED FOR YOUR DATA) --- */
function renderNext(){
    const s = document.getElementById('stack'); 
    s.innerHTML = "";
    
    if(!POOL.length){ renderEnd(); return; }
    
    const q = POOL[0]; // Peek at the first question
    const c = document.createElement('div'); 
    c.className = "card";
    
    // Mapped exactly to your R1 JSON structure
    c.innerHTML = `
        <div class="card-q">${formatChem(q.question)}</div>
        <div class="swipe-label sl-up">${q.option_up}</div>
        <div class="swipe-label sl-left">${q.option_left}</div>
        <div class="swipe-label sl-right">${q.option_right}</div>
        <div class="swipe-label sl-down" style="font-size:0.7rem; color:#ffd600;">HINT: ${q.hint}</div>
        <div class="overlay">
            <div class="overlay-label">LOGIC ANALYSIS</div>
            <div class="overlay-body">${formatChem(q.explanation)}</div>
            <button class="btn" onclick="this.parentElement.classList.remove('active')">CONTINUE</button>
        </div>
    `;
    s.appendChild(c); 
    bindPhysics(c, q);
}

/* --- PHYSICS ENGINE (V77.1 STABLE) --- */
function bindPhysics(el, data){
    let x=0, y=0, sx=0, sy=0, active=false, triggerDir=null;
    const labels = {
        up: el.querySelector('.sl-up'), 
        dn: el.querySelector('.sl-down'), 
        lt: el.querySelector('.sl-left'), 
        rt: el.querySelector('.sl-right')
    };

    const start = e => { 
        if(isTransitioning) return; 
        active=true; 
        const p = e.touches ? e.touches[0] : e; 
        sx = p.clientX; sy = p.clientY; 
        startTime = Date.now();
        el.style.transition = "none"; 
    };
    
    const move = e => {
        if(!active) return; 
        const p = e.touches ? e.touches[0] : e;
        const dx = p.clientX - sx;
        const dy = p.clientY - sy;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        const opacity = Math.min(dist / OPACITY_DIST, 1);
        
        // V77.1 Recession Logic
        x = (dist > CLAMP_DIST) ? dx * (CLAMP_DIST/dist) : dx;
        y = (dist > CLAMP_DIST) ? dy * (CLAMP_DIST/dist) : dy;

        let ang = Math.atan2(-y, x) * (180/Math.PI); 
        if(ang < 0) ang += 360;
        
        Object.values(labels).forEach(l => { if(l) l.style.opacity = 0; });

        if(dist > 5){
            let activeLabel = (ang>=45&&ang<135)?labels.up:(ang>=135&&ang<225)?labels.lt:(ang>=225&&ang<315)?labels.dn:labels.rt;
            if(activeLabel) {
                activeLabel.style.opacity = opacity;
                activeLabel.style.transform = `scale(${0.85 + (opacity * 0.15)})`;
            }
        }

        el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${x/25}deg)`;
        
        if(dist >= CLAMP_DIST) {
             triggerDir = (ang>=45&&ang<135)?"UP":(ang>=135&&ang<225)?"LEFT":(ang>=225&&ang<315)?"DOWN":"RIGHT";
        } else {
             triggerDir = null;
        }
    };
    
    const end = () => {
        if(!active) return; 
        active = false;
        if(triggerDir){
            if(triggerDir === "DOWN"){
                latency = Date.now() - startTime;
                el.querySelector('.overlay').classList.add('active');
                el.style.transition = "transform .3s";
                el.style.transform = "translate3d(0,0,0) rotate(0deg)";
            } else {
                handleAction(el, data, x, y, triggerDir);
            }
        } else {
            el.style.transition = "transform .2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"; 
            el.style.transform = "translate3d(0,0,0) rotate(0deg)";
        }
    };
    
    el.onmousedown=start; window.onmousemove=move; window.onmouseup=end;
    el.ontouchstart=start; el.ontouchmove=move; el.ontouchend=end;
}

/* --- DATA HANDLING & BACKEND PING --- */
function handleAction(el, data, x, y, dir){
    isTransitioning = true;
    
    // Check Result
    const userChoice = "option_" + dir.toLowerCase();
    const isCorrect = (userChoice === data.correct_option);
    
    if(isCorrect) { SCORE += 10; } 
    else { MISTAKES.push(data.id); }

    // GHOST PIXEL TELEMETRY
    const ping = `${ENDPOINT}?target=Telemetry&questionId=${data.id}&result=${isCorrect}&vectorChoice=${dir}&latency=${latency}`;
    new Image().src = ping;

    // V77.1 Exit Animation
    el.style.transition = "transform .4s ease-in, opacity .4s";
    el.style.transform = `translate3d(${x*10}px, ${y*10}px, 0) rotate(${x/2}deg)`;
    el.style.opacity = "0";

    setTimeout(() => {
        POOL.shift();
        renderNext();
        isTransitioning = false;
    }, 400);
}

window.onload = init;
