/**
 * VIA.STACK | MASTER LAB v133.20
 * CORE ENGINE: High-Fidelity Science & Gesture Physics
 */

/* --- 1. SCIENTIFIC NORMALIZER --- */
const ProtocolNormalizer = {
    apply(text) {
        if (!text) return "";
        let f = text.toString().trim();
        // Scrub accidental double-delimiters
        f = f.replace(/^\$+/, '').replace(/\$+$/, '');
        // Textbook Standards
        f = f.replace(/%/g, '\\%'); 
        f = f.replace(/E\*/g, 'E^\\circ'); 
        f = f.replace(/->/g, '\\rightarrow'); 
        f = f.replace(/([A-Z][a-z]?)(\d+)/g, '$1_{$2}'); // Formulas: Na2SO4 -> Na_{2}SO_{4}
        f = f.replace(/\]\^([\+\-\d]+)/g, ']^{$1}');    // Fix Charges
        f = f.replace(/\b([n|l|m|s])\b\s?=/g, '\\mathit{$1} ='); // Quantum Logic
        return `$${f}$`;
    }
};

/* --- 2. GLOBAL STATE --- */
let RAW_DATA = [...BACKUP_DATA]; 
let POOL = []; 
let SCORE = 0;
let MODE = "DATASET_SELECT";
let CURRENT_DATASET, CURRENT_TOPIC, CURRENT_GENRE;
const ENDPOINT = "https://script.google.com/macros/s/AKfycbxaMo1Gi8KjfYOr1_pHJI5XYJ1t9FK4PWkFCm8lU4MsCmUXvY0nSUIqYTAqhpumFRFL/exec";

/* --- 3. DATA RECONCILIATION & INIT --- */
async function init() {
    try {
        const r = await fetch(ENDPOINT);
        const json = await r.json();
        if (Array.isArray(json) && json.length > 0) RAW_DATA = json;
    } catch (e) { console.warn("Sync fail. Using backup."); }

    // Normalize and Map Backup Data to UI Labels
    RAW_DATA = RAW_DATA.map(q => ({
        id: q.id,
        dataset: q.set || "SET_A",
        topic: q.category || "General",
        q_type: "CONCEPT", // Defaulting for backup data
        question_text: ProtocolNormalizer.apply(q.question),
        swipe_up_label: ProtocolNormalizer.apply(q.option_up),
        swipe_right_label: ProtocolNormalizer.apply(q.option_right),
        swipe_left_label: ProtocolNormalizer.apply(q.option_left),
        correct: (q.correct_option === "option_up") ? "UP" : 
                 (q.correct_option === "option_right") ? "RIGHT" : "LEFT",
        explanation: ProtocolNormalizer.apply(q.explanation),
        hint: ProtocolNormalizer.apply(q.hint)
    }));

    document.getElementById('loader').remove();
    renderDatasetSelect();
}

/* --- 4. START QUIZ (FILTERING) --- */
function startQuiz(topic, genre) {
    CURRENT_TOPIC = topic;
    CURRENT_GENRE = genre;
    MODE = "QUIZ";
    
    POOL = RAW_DATA.filter(q => {
        const tMatch = q.topic.toLowerCase().includes(topic.toLowerCase());
        const dMatch = q.dataset === CURRENT_DATASET;
        return tMatch && dMatch;
    }).sort(() => Math.random() - 0.5);

    if (POOL.length === 0) {
        alert("Domain Empty. Returning to Domain Select.");
        renderTopicSelect(CURRENT_DATASET);
        return;
    }
    renderNext();
}

/* --- 5. RENDERER (TYPESETTING TRIGGER) --- */
function renderNext() {
    const s = document.getElementById('stack'); s.innerHTML = "";
    if (!POOL.length) { renderEnd(); return; }
    
    const q = POOL[0];
    const c = document.createElement('div'); 
    c.className = "card";
    c.innerHTML = `
        <div class="card-q">${q.question_text}</div>
        <div class="swipe-label sl-up">${q.swipe_up_label}</div>
        <div class="swipe-label sl-left">${q.swipe_left_label}</div>
        <div class="swipe-label sl-right">${q.swipe_right_label}</div>
        <div class="swipe-label sl-down sl-down-hint">${q.hint}</div>
        <div class="overlay">
            <div class="overlay-label">THEORETICAL LOGIC</div>
            <div class="overlay-body">${q.explanation}</div>
            <button class="btn" onclick="this.parentElement.classList.remove('active')">CONTINUE</button>
        </div>`;
    
    s.appendChild(c); 
    bindPhysics(c, q);

    // CRITICAL: KaTeX Render
    renderMathInElement(c, {
        delimiters: [{ left: "$", right: "$", display: false }],
        throwOnError: false
    });
}
