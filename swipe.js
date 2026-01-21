/* ===============================
   ALCHEMIST V77.1 — IRONCLAD CORE
   =============================== */

/* ─── LIVE ENDPOINT ─── */
const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxaMo1Gi8KjfYOr1_pHJI5XYJ1t9FK4PWkFCm8lU4MsCmUXvY0nSUIqYTAqhpumFRFL/exec";

/* ─── FALLBACK DATA ─── */
const BACKUP_DATA = [ /* UNCHANGED — FULL DATASET AS PROVIDED */ ];

/* ─── GLOBAL STATE ─── */
let RAW_DATA = [...BACKUP_DATA];
let POOL = [];
let MISTAKES = [];
let SCORE = 0;
let isTransitioning = false;

let MODE = "DATASET_SELECT";
let CURRENT_DATASET = "";
let CURRENT_TOPIC = "";
let CURRENT_GENRE = "";

/* ─── PHYSICS CONSTANTS ─── */
const CLAMP_DIST = 32;
const OPACITY_DIST = 24;

/* ─── TEXT FORMATTER ─── */
function formatChem(text) {
    if (!text) return "";
    return text
        .toString()
        .replace(/([A-Z][a-z]?)(\d+)/g, "$1<sub>$2</sub>")
        .replace(/(\d*)([+\-])/g, "<sup>$1$2</sup>")
        .replace(/\|\|/g, "<br><br>");
}

/* ─── INIT ─── */
async function init() {
    const loader = document.getElementById("loader");

    try {
        const res = await fetch(ENDPOINT);
        const json = await res.json();
        if (Array.isArray(json) && json.length) {
            RAW_DATA = json;
            console.log("Cloud sync OK");
        }
    } catch {
        console.warn("Offline — using backup data");
    }

    CURRENT_DATASET = "SET_A";

    if (!attemptAutoStart("Physical", "CONCEPT")) {
        const first = RAW_DATA[0];
        CURRENT_DATASET = first.dataset;
        attemptAutoStart(first.topic, first.q_type);
    }

    if (loader) loader.remove();
}

/* ─── DATA FILTER ─── */
function attemptAutoStart(topic, genre) {
    const d = CURRENT_DATASET.trim().toUpperCase();
    const t = topic.trim().toLowerCase();
    const g = genre.trim().toUpperCase();

    POOL = RAW_DATA.filter(q => {
        return (
            (!q.dataset || q.dataset.toUpperCase() === d) &&
            q.topic.toLowerCase() === t &&
            q.q_type.toUpperCase() === g
        );
    }).sort(() => Math.random() - 0.5);

    if (!POOL.length) return false;

    CURRENT_TOPIC = topic;
    CURRENT_GENRE = genre;
    renderNext();
    return true;
}

/* ─── RENDER SCREENS ─── */
function renderDatasetSelect() {
    MODE = "DATASET_SELECT";
    mountCard(`
        <div class="card-q">SELECT CURRICULUM</div>
        <div class="swipe-label sl-up">CORE CHEMISTRY</div>
        <div class="swipe-label sl-left">INDUSTRIAL APPS</div>
        <div class="swipe-label sl-right">REVISION SET</div>
        <div class="swipe-label sl-down">EXPERT CHALLENGE</div>
    `);
}

function renderTopicSelect(dataset) {
    MODE = "TOPIC_SELECT";
    CURRENT_DATASET = dataset;
    mountCard(`
        <div class="card-q">CHOOSE DOMAIN</div>
        <div class="swipe-label sl-up">PHYSICAL</div>
        <div class="swipe-label sl-left">ORGANIC</div>
        <div class="swipe-label sl-right">INORGANIC</div>
        <div class="swipe-label sl-down">ANALYTICAL</div>
    `);
}

function renderGenreSelect(topic) {
    MODE = "GENRE_SELECT";
    CURRENT_TOPIC = topic;
    mountCard(`
        <div class="card-q">SELECT DEPTH</div>
        <div class="swipe-label sl-up">CONCEPT MASTERY</div>
        <div class="swipe-label sl-down">APPLIED PROBLEMS</div>
    `);
}

function renderNext() {
    if (!POOL.length) return renderEnd();

    MODE = "QUIZ";
    const q = POOL.shift();

    mountCard(`
        <div class="card-q">${formatChem(q.question_text)}</div>
        <div class="swipe-label sl-up">${q.swipe_up_label}</div>
        <div class="swipe-label sl-left">${q.swipe_left_label}</div>
        <div class="swipe-label sl-right">${q.swipe_right_label}</div>
        <div class="swipe-label sl-down sl-down-hint">${formatChem(q.hint)}</div>
        <div class="overlay">
            <div class="overlay-label">LOGIC ANALYSIS</div>
            <div class="overlay-body">${formatChem(q.explanation)}</div>
            <button class="btn" onclick="this.parentElement.classList.remove('active')">CONTINUE</button>
        </div>
    `, q);
}

function renderEnd() {
    MODE = "SESSION_END";
    mountCard(`
        <div class="card-q">SESSION COMPLETE<br><small>${SCORE} XP EARNED</small></div>
        <div class="swipe-label sl-up">RESTART</div>
        <div class="swipe-label sl-down">MAIN MENU</div>
    `);
}

/* ─── CARD MOUNT ─── */
function mountCard(html, data) {
    const stack = document.getElementById("stack");
    stack.innerHTML = "";
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = html;
    stack.appendChild(card);
    bindPhysics(card, data);
}

/* ─── PHYSICS ENGINE ─── */
function bindPhysics(el, data) {
    let sx = 0, sy = 0, dx = 0, dy = 0;
    let active = false, triggerDir = null;

    const labels = {
        UP: el.querySelector(".sl-up"),
        DOWN: el.querySelector(".sl-down"),
        LEFT: el.querySelector(".sl-left"),
        RIGHT: el.querySelector(".sl-right")
    };

    const start = e => {
        if (isTransitioning || el.querySelector(".overlay")?.classList.contains("active")) return;
        active = true;
        const p = e.touches ? e.touches[0] : e;
        sx = p.clientX;
        sy = p.clientY;
        el.style.transition = "none";
    };

    const move = e => {
        if (!active) return;
        const p = e.touches ? e.touches[0] : e;

        const rawDx = p.clientX - sx;
        const rawDy = p.clientY - sy;
        const dist = Math.hypot(rawDx, rawDy);

        const opacity = Math.min(dist / OPACITY_DIST, 1);

        dx = rawDx;
        dy = rawDy;

        if (dist > CLAMP_DIST) {
            const r = CLAMP_DIST / dist;
            dx *= r;
            dy *= r;
        }

        const angle = (Math.atan2(-dy, dx) * 180 / Math.PI + 360) % 360;
        triggerDir =
            dist >= CLAMP_DIST
                ? angle < 45 || angle >= 315 ? "RIGHT"
                : angle < 135 ? "UP"
                : angle < 225 ? "LEFT"
                : "DOWN"
                : null;

        Object.values(labels).forEach(l => l && (l.style.opacity = 0));

        if (triggerDir && labels[triggerDir]) {
            labels[triggerDir].style.opacity = opacity;
            labels[triggerDir].style.transform = `scale(${0.85 + opacity * 0.15})`;
        }

        requestAnimationFrame(() => {
            el.style.transform = `translate3d(${dx}px,${dy}px,0) rotate(${dx / 25}deg)`;
        });
    };

    const end = () => {
        if (!active) return;
        active = false;

        Object.values(labels).forEach(l => l && (l.style.opacity = 0));

        if (triggerDir) handleAction(el, data, dx, dy, triggerDir);
        else {
            el.style.transition = "transform .2s cubic-bezier(.175,.885,.32,1.275)";
            el.style.transform = "translate3d(0,0,0) rotate(0)";
        }
    };

    el.onmousedown = start;
    el.ontouchstart = start;
    window.onmousemove = move;
    el.ontouchmove = move;
    window.onmouseup = end;
    el.ontouchend = end;
}

/* ─── ACTION HANDLER ─── */
function handleAction(el, data, x, y, dir) {
    isTransitioning = true;

    if (MODE === "QUIZ" && dir === "DOWN") {
        el.querySelector(".overlay").classList.add("active");
        el.style.transform = "translate3d(0,0,0)";
        isTransitioning = false;
        return;
    }

    if (MODE === "QUIZ") {
        const w = Number(data.weight) || 1;
        if (dir === data.correct) SCORE += 10 * w;
        else {
            SCORE = Math.max(0, SCORE - 5);
            MISTAKES.push(data);
        }
        renderNext();
    }

    el.style.transition = "transform .4s ease-in";
    el.style.transform = `translate3d(${x * 6}px,${y * 6}px,0) rotate(${x / 5}deg)`;

    updateUI();
    setTimeout(() => {
        el.remove();
        isTransitioning = false;
    }, 350);
}

/* ─── UI UPDATE ─── */
function updateUI() {
    const xp = document.getElementById("xp-ui");
    const bar = document.getElementById("progress-bar");
    if (xp) xp.innerText = `${SCORE} XP`;
    if (bar) bar.style.width = `${SCORE % 100}%`;
}

/* ─── BOOT ─── */
window.onload = init;
