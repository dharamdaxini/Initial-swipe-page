/**
 * VIA.STACK | MASTER LAB CORE v133.30
 * High-Fidelity Science Rendering & Gesture Physics Engine
 */

/* --- 1. SCIENTIFIC NORMALIZER (v133.30) --- */
// Resolves raw drift (e.g. CH3I, [Ni(CN)4]2-, psi(x)) found in screenshots
const ProtocolNormalizer = {
    patterns: [
        { regex: /([A-Z][a-z]?)(\d+)/g, replace: '$1_{$2}' },         // Formulas: Na2SO4 -> Na_{2}SO_{4}
        { regex: /\]\^([\+\-\d]+)/g, replace: ']^{$1}' },           // Coordination Charges
        { regex: /\]\^\{([\+\-\d]+)\}/g, replace: ']^{$1}' },        // Charge Double-Brace Correction
        { regex: /\b([n|l|m|s])\s?=/g, replace: '\\mathit{$1} =' }, // Quantum Variables
        { regex: /psi/g, replace: '\\psi' },                        // Wavefunction rendering
        { regex: /pi/g, replace: '\\pi' },                          // Pi constant
        { regex: /E\^circ|E\*/g, replace: 'E^\\circ' }              // Standard Potential
    ],

    apply(text) {
        if (!text) return "";
        let f = text.toString().trim();
        // Scrub accidental double-wrapping markers from TSV source
        f = f.replace(/^\$+/, '').replace(/\$+$/, '');
        this.patterns.forEach(p => f = f.replace(p.regex, p.replace));
        return `$${f}$`;
    }
};

/* --- 2. GLOBAL SYSTEM STATE --- */
let RAW_DATA = [];
let POOL = [];
let MODE = "DATASET_SELECT";
let SCORE = 0;
let XP = 0;
let CURRENT_DATASET, CURRENT_TOPIC, CURRENT_GENRE;
let isTransitioning = false;
const ENDPOINT = "https://script.google.com/macros/s/AKfycbxaMo1Gi8KjfYOr1_pHJI5XYJ1t9FK4PWkFCm8lU4MsCmUXvY0nSUIqYTAqhpumFRFL/exec";

/* --- 3. INITIALIZATION & DATA SYNC --- */
async function init() {
    try {
        const r = await fetch(ENDPOINT);
        const json = await r.json();
        if (Array.isArray(json) && json.length > 0) {
            RAW_DATA = json; // Use Cloud Data
        } else {
            RAW_DATA = [...BACKUP_DATA];
        }
    } catch (e) {
        RAW_DATA = [...BACKUP_DATA]; // Failover to local JSON
    }
    document.getElementById('loader').remove();
    renderDatasetSelect();
}

/* --- 4. START QUIZ (FILTERING & PRE-NORMALIZATION) --- */
function startQuiz(topic, genre) {
    CURRENT_TOPIC = topic;
    CURRENT_GENRE = genre;
    MODE = "QUIZ";
    
    // Advanced Filter: Maps master.json keys to UI labels
    POOL = RAW_DATA.filter(q => {
        const dMatch = (q.set || q.dataset) === CURRENT_DATASET;
        const tMatch = (q.category || q.topic).toLowerCase().includes(topic.toLowerCase()) || 
                      (topic === "Analytical" && (q.category === "Statistics" || q.category === "Electrochem"));
        return dMatch && tMatch;
    }).map(q => ({
        ...q,
        // Pre-normalize text fields before rendering to ensure KaTeX accuracy
        q_text: ProtocolNormalizer.apply(q.question || q.question_text),
        u_label: ProtocolNormalizer.apply(q.option_up || q.swipe_up_label),
        r_label: ProtocolNormalizer.apply(q.option_right || q.swipe_right_label),
        l_label: ProtocolNormalizer.apply(q.option_left || q.swipe_left_label),
        explanation: ProtocolNormalizer.apply(q.explanation),
        hint: ProtocolNormalizer.apply(q.hint || "Hint unavailable"),
        correctVector: (q.correct_option?.toUpperCase().replace('OPTION_', '') || q.correct?.toUpperCase())
    })).sort(() => Math.random() - 0.5);

    if (POOL.length === 0) {
        alert("Domain Empty. Returning to Domain Select.");
        renderTopicSelect(CURRENT_DATASET);
        return;
    }
    renderNext();
}

/* --- 5. RENDERER (TYPESETTING) --- */
function renderNext() {
    const s = document.getElementById('stack');
    s.innerHTML = "";
    if (!POOL.length) { renderEnd(); return; }
    
    const q = POOL[0];
    const c = document.createElement('div');
    c.className = "card";
    c.innerHTML = `
        <div class="card-q">${q.q_text}</div>
        <div class="swipe-label sl-up">${q.u_label}</div>
        <div class="swipe-label sl-left">${q.l_label}</div>
        <div class="swipe-label sl-right">${q.r_label}</div>
        <div class="swipe-label sl-down sl-down-hint">${q.hint}</div>
        <div class="overlay">
            <div class="overlay-label">LOGIC ANALYSIS</div>
            <div class="overlay-body">${q.explanation}</div>
            <button class="btn" onclick="this.parentElement.classList.remove('active')">CONTINUE</button>
        </div>`;
    
    s.appendChild(c);
    bindPhysics(c, q);

    // CRITICAL: Vector Equation Trigger
    renderMathInElement(c, {
        delimiters: [{ left: "$", right: "$", display: false }],
        throwOnError: false
    });
}

/* --- 6. UNIVERSAL HANDLER FIX (v133.30) --- */
function handleAction(el, data, x, y, dir) {
    if (isTransitioning) return;
    isTransitioning = true;

    if (MODE === "DATASET_SELECT") {
        const dsMap = { UP: "SET_A", LEFT: "SET_B", RIGHT: "SET_C", DOWN: "SET_D" };
        renderTopicSelect(dsMap[dir]);
    } 
    else if (MODE === "TOPIC_SELECT") {
        const topicMap = { UP: "Physical", LEFT: "Organic", RIGHT: "Inorganic", DOWN: "Analytical" };
        renderGenreSelect(topicMap[dir]);
    } 
    else if (MODE === "GENRE_SELECT") {
        if (dir === "UP") startQuiz(CURRENT_TOPIC, "CONCEPT");
        else if (dir === "DOWN") startQuiz(CURRENT_TOPIC, "APPLICATION");
        else { isTransitioning = false; return; }
    } 
    else if (MODE === "QUIZ") {
        const isCorrect = dir === data.correctVector;
        if (isCorrect) {
            SCORE += 10;
            XP += 10;
        }
        // Advanced Telemetry for Structural Drift Analysis
        new Image().src = `https://telemetry.stack.io/ping?id=${data.id}&res=${isCorrect}&dir=${dir}&v=133.30`;
        
        POOL.shift();
        renderNext();
    }

    // Gesture Animation
    el.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s";
    el.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0) rotate(${x / 5}deg)`;
    el.style.opacity = "0";

    setTimeout(() => {
        el.remove();
        isTransitioning = false;
        updateUI();
    }, 400);
}
