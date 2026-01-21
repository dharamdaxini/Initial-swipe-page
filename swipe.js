/* ===== DATA (SHORT SAMPLE – plug full BACKUP_DATA here) ===== */
const DATA = [
  { q:"Negative ΔG means?", up:"Spontaneous", dn:"HINT", left:"Non-spontaneous", right:"Equilibrium", correct:"UP",
    hint:"Gibbs free energy", expl:"Negative ΔG means spontaneous." }
];

let MODE="MENU";
let SCORE=0;
let POOL=[...DATA];
let activeCard=null;

/* ===== INIT ===== */
window.onload=()=>{
  document.getElementById("loader").remove();
  renderMenu();
};

/* ===== RENDERERS ===== */
function renderMenu(){
  MODE="MENU";
  mount(`
    <div class="card-q">START</div>
    <div class="swipe-label sl-up">BEGIN</div>
  `);
}

function renderQuiz(){
  MODE="QUIZ";
  if(!POOL.length){ renderEnd(); return; }
  const q=POOL.shift();
  mount(`
    <div class="card-q">${q.q}</div>
    <div class="swipe-label sl-up">${q.up}</div>
    <div class="swipe-label sl-left">${q.left}</div>
    <div class="swipe-label sl-right">${q.right}</div>
    <div class="swipe-label sl-down">${q.hint}</div>
    <div class="overlay">
      <div class="overlay-body">${q.expl}</div>
      <button class="btn" onclick="this.parentElement.classList.remove('active')">CONTINUE</button>
    </div>
  `, q);
}

function renderEnd(){
  MODE="END";
  mount(`
    <div class="card-q">DONE<br>${SCORE} XP</div>
    <div class="swipe-label sl-up">RESTART</div>
  `);
}

/* ===== MOUNT ===== */
function mount(html,data){
  const s=document.getElementById("stack");
  s.innerHTML="";
  const c=document.createElement("div");
  c.className="card";
  c.innerHTML=html;
  s.appendChild(c);
  activeCard=c;
  bind(c,data);
}

/* ===== PHYSICS ===== */
function bind(el,data){
  let sx=0,sy=0,dx=0,dy=0,dir=null,active=false;

  const start=e=>{
    active=true;
    const p=e.touches?e.touches[0]:e;
    sx=p.clientX; sy=p.clientY;
    el.style.transition="none";
  };

  const move=e=>{
    if(!active) return;
    const p=e.touches?e.touches[0]:e;
    dx=p.clientX-sx; dy=p.clientY-sy;
    el.style.transform=`translate(${dx}px,${dy}px) rotate(${dx/20}deg)`;
    dir=Math.abs(dx)>Math.abs(dy)?(dx>0?"RIGHT":"LEFT"):(dy>0?"DOWN":"UP");
  };

  const end=()=>{
    active=false;
    handle(el,data,dir,dx,dy);
  };

  el.onmousedown=start; el.ontouchstart=start;
  window.onmousemove=move; el.ontouchmove=move;
  window.onmouseup=end; el.ontouchend=end;
}

/* ===== ACTION DISPATCH ===== */
function handle(el,data,dir,x,y){
  if(MODE==="MENU" && dir==="UP"){ renderQuiz(); return; }

  if(MODE==="QUIZ"){
    if(dir==="DOWN"){ el.querySelector(".overlay").classList.add("active"); reset(el); return; }
    if(dir===data.correct) SCORE+=10;
    renderQuiz(); return;
  }

  if(MODE==="END" && dir==="UP"){
    SCORE=0; POOL=[...DATA];
    renderMenu();
  }
}

function reset(el){
  el.style.transition=".25s";
  el.style.transform="translate(0,0)";
}
