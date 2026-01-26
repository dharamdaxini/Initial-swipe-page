/* --- IMPROVED UNIVERSAL HANDLER (v133.10) --- */
function handleAction(el, data, x, y, dir) {
    isTransitioning = true;

    // 1. DATASET ROUTING
    if (MODE === "DATASET_SELECT") {
        const dsMap = { UP: "SET_A", LEFT: "SET_B", RIGHT: "SET_C", DOWN: "SET_D" };
        renderTopicSelect(dsMap[dir]);
    } 
    
    // 2. TOPIC ROUTING
    else if (MODE === "TOPIC_SELECT") {
        const topicMap = { 
            UP: "Physical", LEFT: "Organic", 
            RIGHT: "Inorganic", DOWN: "Analytical" 
        };
        renderGenreSelect(topicMap[dir]);
    } 
    
    // 3. GENRE ROUTING
    else if (MODE === "GENRE_SELECT") {
        if (dir === "UP") startQuiz("CONCEPT");
        else if (dir === "DOWN") startQuiz("APPLICATION");
        else { isTransitioning = false; return; }
    } 
    
    // 4. QUIZ LOGIC (SCIENCE RENDERING FIX)
    else if (MODE === "QUIZ") {
        // Normalizer logic is pre-applied during renderNext() 
        // to prevent latency during the swipe animation
        const correct = dir === data.c; 
        if (correct) {
            SCORE += 10;
            XP += 10; // Progress persistence
        }
        
        // Advanced Telemetry: Log specific vector failure for structural analysis
        new Image().src = `${ENDPOINT}?target=Telemetry&questionId=${data.id}&result=${correct}&vectorChoice=${dir}&latency=${Date.now() - startTime}`;
        
        POOL.shift(); 
        renderNext();
    }

    // SWIPE PHYSICS
    el.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s";
    el.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0) rotate(${x / 5}deg)`;
    el.style.opacity = "0";

    setTimeout(() => {
        el.remove();
        isTransitioning = false;
        updateUI();
    }, 400);
}

/* --- POOL FILTER & RENDERING REFINEMENT --- */
function startQuiz(genre) {
    CUR_GENRE = genre;
    MODE = "QUIZ"; // Explicit mode lock
    
    POOL = RAW_DATA.filter(q => {
        const matchDS = q.ds === CUR_DATASET;
        const matchTY = q.ty === CUR_GENRE;
        const matchTP = q.tp.toLowerCase().includes(CUR_TOPIC.toLowerCase()) || 
                       (CUR_TOPIC === "Analytical" && (q.tp === "Statistics" || q.tp === "Electrochem"));
        
        return matchDS && matchTP && matchTY;
    }).map(q => {
        // CRITICAL: Pre-Normalize all text fields before they enter the render queue
        // This prevents the raw LaTeX/TSV drift seen in your mobile view
        return {
            ...q,
            q: ProtocolNormalizer.apply(q.q),
            u: ProtocolNormalizer.apply(q.u),
            r: ProtocolNormalizer.apply(q.r),
            l: ProtocolNormalizer.apply(q.l),
            logic: ProtocolNormalizer.apply(q.logic)
        };
    }).sort(() => Math.random() - 0.5);

    if (!POOL.length) {
        alert("Niche Empty. Returning to Domain Select.");
        renderTopicSelect();
        return;
    }
    renderNext();
}
