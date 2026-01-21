/* --- UNIVERSAL HANDLER FIX --- */
function handleAction(el, data, x, y, dir) {
    isTransitioning = true;

    // 1. DATASET ROUTING (CURRICULUM)
    if (MODE === "DATASET_SELECT") {
        const dsMap = { UP: "SET_A", LEFT: "SET_B", RIGHT: "SET_C", DOWN: "SET_D" };
        renderTopicSelect(dsMap[dir]);
    } 
    
    // 2. TOPIC ROUTING (DOMAIN) - FIXED
    else if (MODE === "TOPIC_SELECT") {
        const topicMap = { 
            UP: "Physical", 
            LEFT: "Organic", 
            RIGHT: "Inorganic", 
            DOWN: "Analytical" 
        };
        // Special check: If Analytical selected, it also covers Stats/Electrochem
        renderGenreSelect(topicMap[dir]);
    } 
    
    // 3. GENRE ROUTING (DEPTH)
    else if (MODE === "GENRE_SELECT") {
        // Swipe UP for Concept, DOWN for Application
        if (dir === "UP") startQuiz("CONCEPT");
        else if (dir === "DOWN") startQuiz("APPLICATION");
        else { isTransitioning = false; return; } // Safety
    } 
    
    // 4. QUIZ LOGIC
    else if (MODE === "QUIZ") {
        const correct = dir === data.c; 
        if (correct) SCORE += 10;
        
        // Telemetry Ping
        new Image().src = `${ENDPOINT}?target=Telemetry&questionId=${data.id}&result=${correct}&vectorChoice=${dir}&latency=${Date.now() - startTime}`;
        
        POOL.shift(); 
        renderNext();
    }

    // SWIPE ANIMATION EXIT
    el.style.transition = "transform 0.4s ease-in, opacity 0.3s";
    el.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0) rotate(${x / 5}deg)`;
    el.style.opacity = "0";

    setTimeout(() => {
        el.remove();
        isTransitioning = false;
        updateUI();
    }, 400);
}

/* --- POOL FILTER REFINEMENT --- */
function startQuiz(genre) {
    CUR_GENRE = genre;
    
    // Improved Filter: Search by Topic Name or Sub-topic
    POOL = RAW_DATA.filter(q => {
        const matchDS = q.ds === CUR_DATASET;
        const matchTY = q.ty === CUR_GENRE;
        // Allows "Analytical" selection to find "Analytical Chemistry", "Statistics", or "Electrochem"
        const matchTP = q.tp.toLowerCase().includes(CUR_TOPIC.toLowerCase()) || 
                       (CUR_TOPIC === "Analytical" && (q.tp === "Statistics" || q.tp === "Electrochem"));
        
        return matchDS && matchTP && matchTY;
    }).sort(() => Math.random() - 0.5);

    if (!POOL.length) {
        alert("Niche Empty. Returning to Main Menu.");
        renderDatasetSelect();
        return;
    }
    renderNext();
}
