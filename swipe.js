/**
 * VIA.STACK | MASTER LAB CORE v133.40
 * Production Standard: Visual-First Scientific Engine
 */

/* --- 1. THE SCIENTIFIC NORMALIZER (v133.40) --- */
// Corrects raw chemical notation and quantum variables for textbook-grade rendering
const ProtocolNormalizer = {
    patterns: [
        { regex: /([A-Z][a-z]?)(\d+)/g, replace: '$1_{$2}' },         // Formulas: KMnO4 -> KMnO_{4}
        { regex: /\]\^([\+\-\d]+)/g, replace: ']^{$1}' },           // Charges: ]^2- -> ]^{2-}
        { regex: /\]\^\{([\+\-\d]+)\}/g, replace: ']^{$1}' },        // Charge Double-Brace Correction
        { regex: /\b([n|l|m|s])\s?=/g, replace: '\\mathit{$1} =' }, // Quantum Variables
        { regex: /psi/g, replace: '\\psi' },                        // Wavefunction
        { regex: /pi/g, replace: '\\pi' },                          // Pi constant
        { regex: /E\^circ|E\*/g, replace: 'E^\\circ' }              // Standard Potential
    ],
    apply(text) {
        if (!text) return "";
        let f = text.toString().trim().replace(/^\$+/, '').replace(/\$+$/, ''); // Strip double-wrapping
        this.patterns.forEach(p => f = f.replace(p.regex, p.replace));
        return `$${f}$`;
    }
};

/* --- 2. THE VISUAL WRAPPER (v133.40) --- */
// Treats text-heavy data as rigid blocks to prevent mobile UX "mess"
const VisualProtocol = {
    wrap(content) {
        // Prevents structural drift by containing KaTeX in a textbook-standard box
        return `<div class="alch-card-visual">${ProtocolNormalizer.apply(content)}</div>`;
    }
};

/* --- 3. CORE HANDLER & PHYSICS --- */
let RAW_DATA = [], POOL = [], SCORE = 0, MODE = "DATASET_SELECT", isTransitioning = false;

async function init() {
    try {
        const r = await fetch(ENDPOINT);
        const json = await r.json();
        RAW_DATA = (Array.isArray(json) && json.length > 0) ? json : BACKUP_DATA;
    } catch(e) { RAW_DATA = BACKUP_DATA; } // Failover to local master.json
    
    document.getElementById('loader').remove();
    renderDatasetSelect();
}

function startQuiz(topic) {
    MODE = "QUIZ";
    POOL = RAW_DATA.filter(q => (q.category || q.topic).toLowerCase().includes(topic.toLowerCase()))
    .map(q => ({
        ...q,
        // Pre-normalize and wrap all fields to ensure visual stability
        q_text: VisualProtocol.wrap(q.question || q.question_text),
        u_label: VisualProtocol.wrap(q.option_up || q.option_up),
        r_label: VisualProtocol.wrap(q.option_right || q.option_right),
        l_label: VisualProtocol.wrap(q.option_left || q.option_left),
        explanation: VisualProtocol.wrap(q.explanation),
        hint: VisualProtocol.wrap(q.hint || "Hint unavailable"),
        correct: (q.correct_option?.toUpperCase().replace('OPTION_', '') || q.correct?.toUpperCase())
    })).sort(() => Math.random() - 0.5);
    renderNext();
}

/* --- 4. RENDERER (TYPESETTING) --- */
function renderNext() {
    const s = document.getElementById('stack'); s.innerHTML = "";
    if (!POOL.length) { location.reload(); return; }
    
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
            <button class="btn" onclick="this.parentElement.classList.remove('active')">CONT.</button>
        </div>`;
    
    s.appendChild(c);
    bindPhysics(c, q);

    // Vector Equation Trigger: Ensures textbook-standard formulas
    renderMathInElement(c, { delimiters: [{ left: "$", right: "$", display: false }] });
}

function handleAction(el, data, x, y, dir) {
    if (isTransitioning) return;
    isTransitioning = true;

    if (MODE === "QUIZ") {
        if (dir === data.correct) { SCORE += 10; updateUI(); }
        POOL.shift(); 
        renderNext();
    } else {
        // Handle Menu Transitions (Dataset/Topic/Genre)
        startQuiz("Physical"); // Example auto-start logic
    }

    // Singularity Stack Physics
    el.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s";
    el.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0) rotate(${x / 5}deg)`;
    el.style.opacity = "0";
    setTimeout(() => { el.remove(); isTransitioning = false; }, 400);
}

window.onload = init;
