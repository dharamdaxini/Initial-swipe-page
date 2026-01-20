/**
 * ALCHEMIST MASTER V75 - LOGIC HUB
 * Optimized for 85-Question State Isolation
 */

// --- CONFIGURATION ---
const ENDPOINT = "https://script.google.com/macros/s/AKfycbxaMo1Gi8KjfYOr1_pHJI5XYJ1t9FK4PWkFCm8lU4MsCmUXvY0nSUIqYTAqhpumFRFL/exec";

// --- GLOBAL STATE MACHINE ---
let RAW_DATA = [], POOL = [], MISTAKES = [], SCORE = 0, isBusy = false;
let MODE = "INIT", CURR_DATASET = "", CURR_TOPIC = "", CURR_GENRE = "";

/**
 * 1. CHEMISTRY RENDERING ENGINE
 * Automatically converts H2O to H₂O and handles line breaks
 */
const formatChem = t => !t ? "" : t.toString()
    .replace(/([A-Z][a-z]?)(\d+)/g, '$1<sub>$2</sub>')
    .replace(/(\d*)([+\-])/g, '<sup>$1$2</sup>')
    .replace(/\|\|/g, '<br><br>');

/**
 * 2. DATA SYNCHRONIZATION
 */
async function init() {
    try {
        const r = await fetch(ENDPOINT);
        RAW_DATA = await r.json();
        document.getElementById('loader').remove();
        renderDatasetSelect();
    } catch (e) {
        document.getElementById('loader').innerText = "SYNC ERROR: CHECK PERMISSIONS";
        console.error("Sync Failure:", e);
    }
}

/**
 * 3. UNIT FACTORY: Centralized Card Generation
 */
function createCard(title, labels, dataObj = null) {
    const s = document.getElementById('stack'); s.innerHTML = "";
    const c = document.createElement('div'); c.className = "card";
    
    // Isolate Blue Hint color for Quiz Mode only
    const hintClass = (MODE === 'QUIZ') ? 'sl-blue' : '';

    c.innerHTML = `
        <div class="card-q">${formatChem(title)}</div>
        ${labels.up ? `<div class="swipe-label sl-up">${labels.up}</div>` : ''}
        ${labels.lt ? `<div class="swipe-label sl-lt">${labels.lt}</div>` : ''}
        ${labels.rt ? `<div class="swipe-label sl-rt">${labels.rt}</div>` : ''}
        ${labels.dn ? `<div class="swipe-label sl-dn ${hintClass}">${labels.dn}</div>` : ''}
    `;
    
    if (MODE === "QUIZ") {
        c.innerHTML += `
            <div class="overlay">
                <div class="overlay-label">LOGIC PATH</div>
                <div class="overlay-body">${formatChem(dataObj.explanation)}</div>
                <button class="btn" onclick="this.parentElement.classList.remove('active')">DISMISS</button>
            </div>`;
    }
    s.appendChild(c);
    bindPhysics(c, dataObj);
}

/**
 * 4. NAVIGATION TIERS (State Gating)
 */
function renderDatasetSelect() {
    MODE = "DATASET_SELECT";
    createCard("SELECT CURRICULUM", { up: "CORE CHEMISTRY", lt: "INDUSTRIAL APPS", rt: "REVISION SET", dn: "EXPERT CHALLENGE" });
}

function renderTopicSelect(ds) {
    MODE = "TOPIC_SELECT"; CURR_DATASET = ds;
    createCard("DOMAIN SELECTION", { up: "PHYSICAL", lt: "ORGANIC", rt: "INORGANIC", dn: "ANALYTICAL" });
}

function renderGenreSelect(top) {
    MODE = "GENRE_SELECT"; CURR_TOPIC = top;
    createCard("CHOOSE DEPTH", { up: "CONCEPT MASTERY", dn: "APPLIED PROBLEMS" });
}

function startQuiz(top, gen) {
    CURR_GENRE = gen;
    // Filter logic for specific tracks
    POOL = RAW_DATA.filter(q => 
        q.dataset.toUpperCase() === CURR_DATASET.toUpperCase() && 
        q.topic.toLowerCase() === top.toLowerCase() && 
        q.q_type.toUpperCase() === gen.toUpperCase()
    ).sort(() => Math.random() - 0.5);

    if (!POOL.length) { 
        alert("Section empty."); 
        renderDatasetSelect(); 
        return; 
    }
    renderNext();
}

function renderNext() {
    if (!POOL.length) { 
        MODE = "SESSION_END"; 
        createCard("SESSION COMPLETE", { up: "RESTART", dn: "MAIN MENU" }); 
        return; 
    }
    MODE = "QUIZ";
    const q = POOL.shift();
    createCard(q.question_text, { up: q.swipe_up_label, lt: q.swipe_left_label, rt: q.swipe_right_label, dn: q.hint }, q);
}

/**
 * 5. PIVOT PHYSICS ENGINE (V70 Standard)
 */
function bindPhysics(el, data) {
    let x = 0, y = 0, sx = 0, sy = 0, active = false;
    const labels = { up: el.querySelector('.sl-up'), dn: el.querySelector('.sl-dn'), lt: el.querySelector('.sl-lt'), rt: el.querySelector('.sl-rt') };

    const start = e => {
        if (isBusy || el.querySelector('.overlay.active')) return;
        active = true; const p = e.touches ? e.touches[0] : e;
        sx = p.clientX; sy = p.clientY; el.style.transition = "none";
    };

    const move = e => {
        if (!active) return;
        const p = e.touches ? e.touches[0] : e;
        x = p.clientX - sx; y = p.clientY - sy;
        const dist = Math.sqrt(x * x + y * y);
        let ang = Math.atan2(-y, x) * (180 / Math.PI); if (ang < 0) ang += 360;

        requestAnimationFrame(() => {
            el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${x / 18}deg)`;
            Object.values(labels).forEach(l => { if (l) l.style.opacity = 0; });
            if (dist > 15) {
                let activeL;
                if (ang >= 45 && ang < 135) activeL = labels.up;
                else if (ang >= 135 && ang < 225) activeL = labels.lt;
                else if (ang >= 225 && ang < 315) activeL = labels.dn;
                else activeL = labels.rt;
                if (activeL) activeL.style.opacity = Math.min(dist / 50, 1);
            }
        });
    };

    const end = () => {
        if (!active) return; active = false;
        const dist = Math.sqrt(x * x + y * y);
        let ang = Math.atan2(-y, x) * (180 / Math.PI); if (ang < 0) ang += 360;
        
        if (dist >= 80) {
            let dir = (ang >= 45 && ang < 135) ? "UP" : (ang >= 135 && ang < 225) ? "LEFT" : (ang >= 225 && ang < 315) ? "DOWN" : "RIGHT";
            if (MODE === "QUIZ" && dir === "DOWN") {
                el.querySelector('.overlay').classList.add('active');
                el.style.transition = "transform 0.4s var(--spring-ease)";
                el.style.transform = "translate3d(0,0,0) rotate(0deg)";
            } else handleAction(el, data, x, y, dir);
        } else {
            el.style.transition = "transform 0.4s var(--spring-ease)";
            el.style.transform = "translate3d(0,0,0) rotate(0deg)";
        }
    };
    el.onmousedown = start; window.onmousemove = move; window.onmouseup = end;
    el.ontouchstart = start; el.ontouchmove = move; el.ontouchend = end;
}

/**
 * 6. ACTION CONTROLLER: State Protection Logic
 */
function handleAction(el, data, x, y, dir) {
    isBusy = true;
    let valid = true;

    switch (MODE) {
        case "DATASET_SELECT": 
            renderTopicSelect({ UP: "SET_A", LEFT: "SET_B", RIGHT: "SET_C", DOWN: "SET_D" }[dir]); 
            break;
        case "TOPIC_SELECT": 
            renderTopicSelect({ UP: "Physical", LEFT: "Organic", RIGHT: "Inorganic", DOWN: "Analytical" }[dir]); 
            break;
        case "GENRE_SELECT": 
            if (dir === "UP") startQuiz(CURR_TOPIC, "CONCEPT"); 
            else if (dir === "DOWN") startQuiz(CURR_TOPIC, "APPLICATION"); 
            else valid = false; // Ignore side-swipes in Depth selection
            break;
        case "QUIZ": 
            const w = parseInt(data.weight) || 1; 
            if (dir === data.correct.toUpperCase()) SCORE += (10 * w); 
            else SCORE = Math.max(0, SCORE - 5); 
            renderNext(); 
            break;
        case "SESSION_END": 
            if (dir === "UP") startQuiz(CURR_TOPIC, CURR_GENRE); 
            else if (dir === "DOWN") renderDatasetSelect(); 
            else valid = false; // Ignore side-swipes in Restart menu
            break;
    }

    if (valid) {
        el.style.transition = "transform .4s ease-in";
        el.style.transform = `translate3d(${x * 5}px,${y * 5}px,0)`;
        updateUI();
        setTimeout(() => { el.remove(); isBusy = false; }, 400);
    } else {
        el.style.transition = "transform 0.4s var(--spring-ease)";
        el.style.transform = "translate3d(0,0,0) rotate(0deg)";
        isBusy = false;
    }
}

/**
 * 7. UI METRICS CONTROLLER
 */
function updateUI() {
    document.getElementById('xp-ui').innerText = `${SCORE} XP`;
    document.getElementById('progress-bar').style.width = `${(SCORE % 100)}%`;
    document.getElementById('rank-ui').innerText = `RANK: ${SCORE > 1000 ? 'GRANDMASTER' : 'NOVICE'}`;
}

window.onload = init;
