// ============================================================
// ALCHEMIST V78.2 — FINAL STABLE BUILD (INLINE DATA)
// ============================================================

// ---------------- CONFIG ----------------
const CONFIG = {
  SWIPE_THRESHOLD: 75,
  HINT_THRESHOLD: 15,
  RANK_THRESHOLDS: {
    NOVICE: 0,
    SCHOLAR: 500,
    GRAND_ALCHEMIST: 1000
  }
};

// ---------------- STATE ----------------
const STATE = {
  rawData: [],
  pool: [],
  score: 0,
  isBusy: false,
  mode: "INIT",
  currentDataset: "",
  currentTopic: "",
  currentGenre: ""
};

// ============================================================
// INLINE DATASET (NO FETCH, NO JSON FILE)
// ============================================================

const INLINE_DATA = [
  {
    dataset: "SET_A",
    topic: "Physical",
    q_type: "CONCEPT",
    question_text: "Why does the signal-to-noise ratio in FT-NMR scale as √N?",
    hint: "Statistical averaging",
    explanation:
      "In FT-NMR, repeated scans add the signal coherently while random noise adds statistically, so S/N increases as the square root of the number of scans.",
    swipe: {
      UP: "Coherent signal",
      RIGHT: "Random noise",
      LEFT: "Magnetic field strength",
      DOWN: "HINT"
    },
    correct: "RIGHT",
    weight: 3
  },
  {
    dataset: "SET_A",
    topic: "Analytical",
    q_type: "CONCEPT",
    question_text:
      "Why does a conjugated C=O stretch appear at a lower wavenumber than an isolated carbonyl?",
    hint: "Bond order",
    explanation:
      "Conjugation delocalizes electrons and reduces effective C=O bond order, lowering the force constant and shifting the IR absorption to lower frequency.",
    swipe: {
      UP: "Increased mass",
      RIGHT: "Reduced bond order",
      LEFT: "Hydrogen bonding",
      DOWN: "HINT"
    },
    correct: "RIGHT",
    weight: 3
  }
];

// ============================================================
// CHEM FORMATTER
// ============================================================

function formatChem(text) {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/([A-Z][a-z]?)(\d+)/g, "$1<sub>$2</sub>")
    .replace(/(\d+)([+-])/g, "<sup>$1$2</sup>")
    .replace(/\|\|/g, "<br><br>");
}

// ============================================================
// INIT
// ============================================================

function init() {
  const loader = document.getElementById("loader");
  STATE.rawData = INLINE_DATA;
  if (loader) loader.remove();
  renderDatasetSelect();
}

// ============================================================
// CARD RENDERING
// ============================================================

function createCard(title, labels, data = null) {
  const stack = document.getElementById("stack");
  stack.innerHTML = "";

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="card-q">${formatChem(title)}</div>

    ${labels.up ? `<div class="swipe-label sl-up">${labels.up}</div>` : ""}
    ${labels.left ? `<div class="swipe-label sl-lt">${labels.left}</div>` : ""}
    ${labels.right ? `<div class="swipe-label sl-rt">${labels.right}</div>` : ""}
    ${labels.down ? `<div class="swipe-label sl-dn sl-blue">${labels.down}</div>` : ""}

    ${
      STATE.mode === "QUIZ" && data?.explanation
        ? `<div class="overlay">
             <div class="overlay-label">ANALYSIS</div>
             <div class="overlay-body">${formatChem(data.explanation)}</div>
             <button class="btn" onclick="closeOverlay()">CONTINUE</button>
           </div>`
        : ""
    }
  `;

  stack.appendChild(card);
  bindPhysics(card, data);
}

function closeOverlay() {
  document.querySelector(".overlay")?.classList.remove("active");
}

// ============================================================
// NAVIGATION
// ============================================================

function renderDatasetSelect() {
  STATE.mode = "DATASET_SELECT";
  createCard("SELECT CURRICULUM", {
    up: "SET_A",
    down: "SET_A"
  });
}

function renderTopicSelect(dataset) {
  STATE.mode = "TOPIC_SELECT";
  STATE.currentDataset = dataset;

  createCard("DOMAIN", {
    up: "Physical",
    down: "Analytical"
  });
}

function renderGenreSelect(topic) {
  STATE.mode = "GENRE_SELECT";
  STATE.currentTopic = topic;

  createCard("DEPTH", {
    up: "CONCEPT",
    down: "APPLICATION"
  });
}

// ============================================================
// QUIZ ENGINE
// ============================================================

function startQuiz(topic, genre) {
  STATE.currentGenre = genre;

  STATE.pool = STATE.rawData.filter(q =>
    q.dataset === STATE.currentDataset &&
    q.topic === topic &&
    q.q_type === genre
  ).sort(() => Math.random() - 0.5);

  renderNext();
}

function renderNext() {
  if (!STATE.pool.length) {
    renderDatasetSelect();
    return;
  }

  STATE.mode = "QUIZ";
  const q = STATE.pool.shift();

  createCard(q.question_text, {
    up: q.swipe.UP,
    left: q.swipe.LEFT,
    right: q.swipe.RIGHT,
    down: "HINT"
  }, q);
}

// ============================================================
// SWIPE PHYSICS
// ============================================================

function bindPhysics(el, data) {
  let sx = 0, sy = 0, dx = 0, dy = 0, active = false;

  const start = e => {
    if (STATE.isBusy) return;
    if (el.querySelector(".overlay.active")) return;
    active = true;
    const p = e.touches ? e.touches[0] : e;
    sx = p.clientX;
    sy = p.clientY;
    el.style.transition = "none";
  };

  const move = e => {
    if (!active) return;
    const p = e.touches ? e.touches[0] : e;
    dx = p.clientX - sx;
    dy = p.clientY - sy;
    el.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx / 18}deg)`;
  };

  const end = () => {
    if (!active) return;
    active = false;

    const dist = Math.hypot(dx, dy);
    let dir = null;

    if (dist > CONFIG.SWIPE_THRESHOLD) {
      const angle = Math.atan2(-dy, dx) * 180 / Math.PI + 360;
      if (angle >= 45 && angle < 135) dir = "UP";
      else if (angle >= 135 && angle < 225) dir = "LEFT";
      else if (angle >= 225 && angle < 315) dir = "DOWN";
      else dir = "RIGHT";
    }

    if (STATE.mode === "QUIZ" && dir === "DOWN") {
      el.querySelector(".overlay")?.classList.add("active");
      reset();
      return;
    }

    if (dir) handleAction(data, dir);
    reset();
  };

  function reset() {
    el.style.transition = "transform 0.4s cubic-bezier(.2,.8,.2,1)";
    el.style.transform = "translate(0,0) rotate(0)";
    dx = dy = 0;
  }

  el.addEventListener("mousedown", start);
  el.addEventListener("touchstart", start, { passive: true });
  window.addEventListener("mousemove", move);
  window.addEventListener("touchmove", move, { passive: true });
  window.addEventListener("mouseup", end);
  window.addEventListener("touchend", end);
}

// ============================================================
// ACTION HANDLER
// ============================================================

function handleAction(data, dir) {
  STATE.isBusy = true;

  switch (STATE.mode) {
    case "DATASET_SELECT":
      renderTopicSelect("SET_A");
      break;

    case "TOPIC_SELECT":
      renderGenreSelect(dir === "UP" ? "Physical" : "Analytical");
      break;

    case "GENRE_SELECT":
      if (dir === "UP") startQuiz(STATE.currentTopic, "CONCEPT");
      break;

    case "QUIZ":
      if (dir === data.correct) {
        STATE.score += 10 * (data.weight || 1);
      } else {
        STATE.score = Math.max(0, STATE.score - 5);
      }
      updateUI();
      renderNext();
      break;
  }

  STATE.isBusy = false;
}

// ============================================================
// UI UPDATE
// ============================================================

function updateUI() {
  document.getElementById("xp-ui").textContent = `${STATE.score} XP`;
  document.getElementById("progress-bar").style.width = `${STATE.score % 100}%`;
}

// ============================================================
// ENTRY POINT
// ============================================================

window.addEventListener("load", init);
