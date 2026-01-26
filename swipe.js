/**
 * ALCHEMIST MASTER v80.3 | MASTER.JSON ADAPTER
 * Logic: Surgical Normalization + GitHub Cloud Sync
 */

/* --- 1. DATA INGESTION & NORMALIZATION --- */
const ProtocolNormalizer = {
    patterns: [
        { regex: /([A-Z][a-z]?)(\d+)/g, replace: '$1_{$2}' },         // Formulas: Na2SO4 -> Na_{2}SO_{4}
        { regex: /\]\^([\+\-\d]+)/g, replace: ']^{$1}' },           // Charges: ]^2- -> ]^{2-}
        { regex: /\b([n|l|m|s])\s?=/g, replace: '\\mathit{$1} =' }, // Quantum Variables
        { regex: /psi/g, replace: '\\psi' },                        // Wavefunction
        { regex: /E\^circ|E\*/g, replace: 'E^\\circ' }              // Standard Potential
    ],
    apply(text) {
        if (!text) return "";
        let f = text.toString().trim().replace(/^\$+/, '').replace(/\$+$/, ''); // Strip double-delimiters
        this.patterns.forEach(p => f = f.replace(p.regex, p.replace));
        return `$${f}$`;
    }
};

const VisualProtocol = {
    wrap(content) {
        // Rigid container to prevent mobile UX drift
        return `<div class="alch-card-visual">${ProtocolNormalizer.apply(content)}</div>`;
    }
};

/* --- 2. GLOBAL SYSTEM INIT --- */
let MASTER_DB = [];
let STATE = { pool: [], score: 0, isBusy: false, active: false, tx: 0, ty: 0, sx: 0, sy: 0 };

// Target: GitHub master.json
const JSON_URL = "https://raw.githubusercontent.com/dharamdaxini/Initial-swipe-page/main/db/master.json";

async function init() {
    try {
        const response = await fetch(JSON_URL);
        const data = await response.json();
        
        // Map master.json keys to Internal Alchemist Properties
        MASTER_DB = data.map(q => ({
            id: q.id,
            category: q.category || q.tp || "General",
            q: VisualProtocol.wrap(q.question),
            u: VisualProtocol.wrap(q.option_up),
            r: VisualProtocol.wrap(q.option_right),
            l: VisualProtocol.wrap(q.option_left),
            ex: ProtocolNormalizer.apply(q.explanation),
            h: q.hint || "Visual Prompt",
            c: q.correct_option.replace('option_', '').toUpperCase(), // Maps "option_right" to "RIGHT"
            weight: q.weight || 1
        }));
        
        document.getElementById('loader').remove();
        startSession(); // Auto-start the pool
    } catch (e) {
        console.error("Master.json Sync Error:", e);
        alert("CRITICAL: Master Vault Offline.");
    }
}

/* --- 3. SESSION EXECUTION --- */
function startSession() {
    // Standard random pool selection
    STATE.pool = [...MASTER_DB].sort(() => Math.random() - 0.5);
    renderNext();
}

function renderNext() {
    const stack = document.getElementById('stack');
    if (!STATE.pool.length) {
        stack.innerHTML = `<div class="card"><div class="alch-card-visual">VAULT DEPLETED</div><button class="btn" onclick="location.reload()">RE-BOOT</button></div>`;
        return;
    }
    
    const data = STATE.pool.shift();
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-q">${data.q}</div>
        <div class="swipe-label sl-up">${data.u}</div>
        <div class="swipe-label sl-left">${data.l}</div>
        <div class="swipe-label sl-right">${data.r}</div>
        <div class="swipe-label sl-down sl-down-hint">HINT: ${data.h}</div>
        <div class="overlay">
            <div class="overlay-label">LOGIC ANALYSIS</div>
            <div class="overlay-body">${data.ex}</div>
            <button class="btn" onclick="this.parentNode.classList.remove('active')">CONTINUE</button>
        </div>
    `;
    stack.appendChild(card);
    document.getElementById('id-ui').innerText = data.id;
    bindEvents(card, data);
    
    // KaTeX vector rendering for chemistry fidelity
    renderMathInElement(card, { delimiters: [{ left: "$", right: "$", display: false }] });
}
