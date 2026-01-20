// ============================================================================
// 1. CHEMISTRY RENDERING ENGINE
// ============================================================================
const formatChem = (text) => {
    if (!text || typeof text !== 'string') return "";
    return text
        .replace(/([A-Z][a-z]?)(\d+)/g, '$1<sub>$2</sub>') // Subscripts for H2O
        .replace(/(\d*)([+\-])/g, '<sup>$1$2</sup>')      // Superscripts for ions like Fe3+
        .replace(/\|\|/g, '<br><br>');                    // Paragraph breaks
};

// ============================================================================
// 2. QUIZ POOL MANAGER
// ============================================================================
function startQuiz(topic, genre) {
    STATE.currentGenre = genre;
    
    // Filter logic to isolate specific curriculum tracks
    STATE.pool = STATE.rawData.filter(q => 
        q.dataset.toUpperCase() === STATE.currentDataset.toUpperCase() &&
        q.topic.toLowerCase() === topic.toLowerCase() &&
        q.q_type.toUpperCase() === genre.toUpperCase()
    ).sort(() => Math.random() - 0.5); // Fisher-Yates style shuffle
    
    if (STATE.pool.length === 0) {
        alert("Section empty. Returning to curriculum selection.");
        renderDatasetSelect();
        return;
    }
    renderNext();
}

// ============================================================================
// 3. DYNAMIC CARD GENERATOR
// ============================================================================
function renderNext() {
    if (STATE.pool.length === 0) {
        STATE.mode = "SESSION_END";
        createCard("SESSION COMPLETE", { up: "RESTART", dn: "MAIN MENU" });
        return;
    }
    
    STATE.mode = "QUIZ";
    const q = STATE.pool.shift(); // Pull next unit from the randomized pool
    
    createCard(q.question_text, {
        up: q.swipe_up_label,
        lt: q.swipe_left_label,
        rt: q.swipe_right_label,
        dn: q.hint || "SWIPE FOR HINT"
    }, q);
}

// ============================================================================
// 4. ACTION GATEKEEPER
// ============================================================================
function handleQuizAction(data, direction) {
    const weight = parseInt(data.weight) || 1; // XP weighting (1-3)
    
    if (direction === data.correct.toUpperCase()) {
        STATE.score += (10 * weight); // Award weighted XP
    } else {
        STATE.score = Math.max(0, STATE.score - 5); // Standard penalty
        STATE.mistakes.push(data); // Store for end-of-session review
    }
    
    updateUI();
    renderNext();
}
