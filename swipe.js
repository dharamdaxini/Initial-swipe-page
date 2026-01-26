/* --- SCIENTIFIC NORMALIZER --- */
const ProtocolNormalizer = {
    patterns: [
        { regex: /([A-Z][a-z]?)(\d+)/g, replace: '$1_{$2}' }, 
        { regex: /\]\^([\+\-\d]+)/g, replace: ']^{$1}' },           
        { regex: /\b([n|l|m|s])\s?=/g, replace: '\\mathit{$1} =' },
        { regex: /psi/g, replace: '\\psi' },                  
        { regex: /E\^circ|E\*/g, replace: 'E^\\circ' }        
    ],
    apply(text) {
        if (!text) return "";
        let f = text.toString().trim().replace(/^\$+/, '').replace(/\$+$/, '');
        this.patterns.forEach(p => f = f.replace(p.regex, p.replace));
        return `$${f}$`;
    }
};

/* --- CORE APP LOGIC --- */
let RAW_DATA = [], POOL = [], SCORE = 0, MODE = "DATASET_SELECT", isTransitioning = false;

async function init() {
    // Try cloud, then local backup_data
    try {
        const r = await fetch(ENDPOINT);
        RAW_DATA = await r.json();
    } catch(e) { RAW_DATA = BACKUP_DATA; }
    document.getElementById('loader').remove();
    renderDatasetSelect();
}

function startQuiz(topic) {
    MODE = "QUIZ";
    POOL = RAW_DATA.filter(q => (q.category || q.topic).toLowerCase().includes(topic.toLowerCase()))
    .map(q => ({
        ...q,
        q_text: ProtocolNormalizer.apply(q.question || q.question_text),
        u_label: ProtocolNormalizer.apply(q.option_up || q.swipe_up_label),
        r_label: ProtocolNormalizer.apply(q.option_right || q.swipe_right_label),
        l_label: ProtocolNormalizer.apply(q.option_left || q.swipe_left_label),
        explanation: ProtocolNormalizer.apply(q.explanation),
        correct: (q.correct_option?.toUpperCase().replace('OPTION_', '') || q.correct?.toUpperCase())
    })).sort(() => Math.random() - 0.5);
    renderNext();
}

function renderNext() {
    const s = document.getElementById('stack'); s.innerHTML = "";
    if (!POOL.length) { location.reload(); return; }
    const q = POOL[0];
    const c = document.createElement('div'); c.className = "card";
    c.innerHTML = `<div class="card-q">${q.q_text}</div>
        <div class="swipe-label sl-up">${q.u_label}</div><div class="swipe-label sl-left">${q.l_label}</div>
        <div class="swipe-label sl-right">${q.r_label}</div><div class="overlay">
        <div class="overlay-body">${q.explanation}</div><button class="btn" onclick="this.parentElement.classList.remove('active')">CONT.</button></div>`;
    s.appendChild(c); bindPhysics(c, q);
    renderMathInElement(c, { delimiters: [{ left: "$", right: "$", display: false }] });
}
