// ---------------- CONFIG ----------------
const CONFIG = { SWIPE: 70 };

// ---------------- STATE ----------------
const STATE = {
  data: [],
  pool: [],
  score: 0,
  mode: "INIT",
  topic: ""
};

// ---------------- DATA ----------------
const DATA = [
  {
    topic: "PHYSICAL",
    q: "Why does signal-to-noise in FT-NMR improve as √N?",
    explanation:
      "Signal adds coherently across scans, while noise adds randomly. Therefore S/N increases as the square root of the number of scans.",
    swipe: {
      UP: "Coherent signal",
      RIGHT: "Random noise",
      LEFT: "Magnetic field",
      DOWN: "HINT"
    },
    correct: "RIGHT"
  },
  {
    topic: "ANALYTICAL",
    q: "Why does a conjugated C=O stretch shift to lower IR frequency?",
    explanation:
      "Conjugation reduces effective bond order of C=O, lowering force constant and IR frequency.",
    swipe: {
      UP: "Higher mass",
      RIGHT: "Lower bond order",
      LEFT: "Hydrogen bonding",
      DOWN: "HINT"
    },
    correct: "RIGHT"
  }
];

// ---------------- INIT ----------------
window.addEventListener("load", () => {
  STATE.data = DATA;
  document.getElementById("loader").remove();
  renderDomain();
});

// ---------------- RENDER ----------------
function renderDomain() {
  STATE.mode = "DOMAIN";
  card("DOMAIN", { UP: "PHYSICAL", DOWN: "ANALYTICAL" });
}

function startQuiz(topic) {
  STATE.mode = "QUIZ";
  STATE.topic = topic;
  STATE.pool = STATE.data.filter(q => q.topic === topic);
  next();
}

function next() {
  if (!STATE.pool.length) return renderDomain();
  const q = STATE.pool.shift();
  card(q.q, q.swipe, q);
}

function card(text, labels, data) {
  const stack = document.getElementById("stack");
  stack.innerHTML = "";

  const c = document.createElement("div");
  c.className = "card";
  c.innerHTML = `
    <div class="card-q">${text}</div>
    ${Object.entries(labels).map(
      ([k,v]) => `<div class="swipe-label sl-${k.toLowerCase().slice(0,2)}">${v}</div>`
    ).join("")}
    ${data ? `
      <div class="overlay">
        <div class="overlay-label">ANALYSIS</div>
        <div class="overlay-body">${data.explanation}</div>
        <button class="btn" onclick="this.parentNode.classList.remove('active')">CONTINUE</button>
      </div>` : ""}
  `;
  stack.appendChild(c);
  bind(c, data);
}

// ---------------- SWIPE ----------------
function bind(el, data) {
  let sx=0, sy=0, dx=0, dy=0, on=false;

  el.onmousedown = e => { on=true; sx=e.clientX; sy=e.clientY; };
  window.onmousemove = e => {
    if(!on) return;
    dx=e.clientX-sx; dy=e.clientY-sy;
    el.style.transform=`translate(${dx}px,${dy}px) rotate(${dx/20}deg)`;
  };
  window.onmouseup = () => {
    if(!on) return; on=false;
    const d=Math.hypot(dx,dy);
    let dir=null;
    if(d>CONFIG.SWIPE){
      const a=Math.atan2(-dy,dx)*180/Math.PI+360;
      dir=a<135&&a>=45?"UP":a<225?"LEFT":a<315?"DOWN":"RIGHT";
    }

    if(STATE.mode==="DOMAIN"){
      if(dir==="UP") startQuiz("PHYSICAL");
      if(dir==="DOWN") startQuiz("ANALYTICAL");
    } else if(STATE.mode==="QUIZ"){
      if(dir==="DOWN"){
        el.querySelector(".overlay")?.classList.add("active");
      } else {
        if(dir===data.correct) STATE.score+=10;
        updateUI();
        next();
      }
    }

    el.style.transform="translate(0,0)";
    dx=dy=0;
  };
}

// ---------------- UI ----------------
function updateUI(){
  document.getElementById("xp-ui").textContent = STATE.score+" XP";
  document.getElementById("progress-bar").style.width = (STATE.score%100)+"%";
}
