/**
 * ALCHEMIST MASTER V80.3
 * Dataset: 85 Units | Physics: Pivot Engine | Logic: Unit Circle
 */

/* 1. THE 85-UNIT DATASET */


const CONFIG = {
    THRESHOLD: 80,    // Min drag distance
    DAMPING: 18,      // 1 deg rotation per 18px move (Pivot Logic)
    SMOOTHING: 0.8,   // 120Hz Velocity Clamp
    OPACITY_DIV: 50
};

let STATE = { 
    pool: [], 
    score: 0, 
    isBusy: false, 
    mode: "QUIZ", 
    active: false, 
    tx: 0, ty: 0, cx: 0, cy: 0, sx: 0, sy: 0 
};

/** * 2. UNIT CIRCLE INTENT DETECTION 
 * Maps 360° space into four 90° quadrants
 */
const getDirection = (x, y) => {
    let ang = Math.atan2(-y, x) * (180 / Math.PI);
    if (ang < 0) ang += 360;
    
    if (ang >= 45 && ang < 135) return "UP";
    if (ang >= 135 && ang < 225) return "LEFT";
    if (ang >= 225 && ang < 315) return "DOWN";
    return "RIGHT";
};



/** * 3. PHYSICS LOOP (120Hz Optimized + Middle Screen Pivot)
 */
function physicsLoop() {
    if (!STATE.active && !STATE.isBusy) return;

    // Velocity Clamping
    STATE.cx += (STATE.tx - STATE.cx) * CONFIG.SMOOTHING;
    STATE.cy += (STATE.ty - STATE.cy) * CONFIG.SMOOTHING;

    const el = document.querySelector('.card');
    if (el && !STATE.isBusy) {
        const dist = Math.sqrt(STATE.cx**2 + STATE.cy**2);
        const rot = STATE.cx / CONFIG.DAMPING; // Spatial Rotation

        // Apply Pivot Physics
        el.style.transform = `translate3d(${STATE.cx}px, ${STATE.cy}px, 0) rotate(${rot}deg)`;

        // Label Feedback
        const labels = el.querySelectorAll('.swipe-label');
        labels.forEach(l => l.style.opacity = 0);
        
        if (dist > 15) {
            const dir = getDirection(STATE.cx, STATE.cy).toLowerCase().slice(0,2);
            const activeL = el.querySelector(`.sl-${dir}`);
            if (activeL) {
                activeL.style.opacity = Math.min(dist / CONFIG.OPACITY_DIV, 1);
                activeL.style.transform = `scale(${0.9 + (dist/500)})`;
            }
        }
    }
    requestAnimationFrame(physicsLoop);
}

/** * 4. INPUT & STATE GUARDRAILS 
 */
const bindEvents = (el, data) => {
    const start = e => {
        if (STATE.isBusy || document.querySelector('.overlay.active')) return;
        STATE.active = true;
        const p = e.touches ? e.touches[0] : e;
        STATE.sx = p.clientX; STATE.sy = p.clientY;
        STATE.tx = 0; STATE.ty = 0;
        physicsLoop();
    };

    const move = e => {
        if (!STATE.active) return;
        const p = e.touches ? e.touches[0] : e;
        STATE.tx = p.clientX - STATE.sx;
        STATE.ty = p.clientY - STATE.sy;
    };

    const end = () => {
        if (!STATE.active) return;
        STATE.active = false;
        const dist = Math.sqrt(STATE.tx**2 + STATE.ty**2);
        const dir = getDirection(STATE.tx, STATE.ty);

        if (dist > CONFIG.THRESHOLD) {
            if (dir === "DOWN") {
                if (STATE.mode === "QUIZ") {
                    document.getElementById('overlay-content').innerText = data.explanation;
                    document.getElementById('analysis-overlay').classList.add('active');
                    resetPosition(el);
                } else { location.reload(); }
            } else { handleSwipe(el, data, dir); }
        } else { resetPosition(el); }
    };

    el.onmousedown = start; window.onmousemove = move; window.onmouseup = end;
    el.ontouchstart = start; el.ontouchmove = move; el.ontouchend = end;
};

const handleSwipe = (el, data, dir) => {
    STATE.isBusy = true;
    if (STATE.mode === "QUIZ") {
        const weight = data.weight || 1;
        if (dir === data.correct) STATE.score += (10 * weight);
        else STATE.score = Math.max(0, STATE.score - 5);
        updateHUD();
    }
    
    // Exit Acceleration
    el.style.transition = "transform 0.5s ease-in";
    el.style.transform = `translate3d(${STATE.tx * 5}px, ${STATE.ty * 5}px, 0) rotate(${STATE.tx / 5}deg)`;
    
    setTimeout(() => {
        el.remove();
        STATE.isBusy = false;
        renderNext();
    }, 500);
};

const resetPosition = (el) => {
    STATE.tx = 0; STATE.ty = 0;
    el.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    el.style.transform = `translate3d(0,0,0) rotate(0deg)`;
};

const renderNext = () => {
    const stack = document.getElementById('stack');
    if (!STATE.pool.length) {
        STATE.mode = "END";
        const endCard = document.createElement('div');
        endCard.className = 'card';
        endCard.innerHTML = `<div class="card-q">MISSION COMPLETE</div><div class="swipe-label sl-up">RESTART</div><div class="swipe-label sl-do">RELOAD</div>`;
        stack.appendChild(endCard);
        bindEvents(endCard, {});
        return;
    }
    
    const data = STATE.pool.shift();
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-q">${data.question_text}</div>
        <div class="swipe-label sl-up">${data.swipe_up_label}</div>
        <div class="swipe-label sl-le">${data.swipe_left_label}</div>
        <div class="swipe-label sl-ri">${data.swipe_right_label}</div>
        <div class="swipe-label sl-do">${data.swipe_down_label}</div>
        <div id="analysis-overlay" class="overlay">
            <div class="overlay-label">LOGIC ANALYSIS</div>
            <div id="overlay-content" class="overlay-body"></div>
            <button class="btn" onclick="this.parentNode.classList.remove('active')">CONTINUE</button>
        </div>
    `;
    stack.appendChild(card);
    bindEvents(card, data);
};

const updateHUD = () => {
    document.getElementById('xp-ui').innerText = `${STATE.score} XP`;
    document.getElementById('progress-bar').style.width = `${(STATE.score % 100)}%`;
    document.getElementById('rank-ui').innerText = `RANK: ${STATE.score > 500 ? 'SCHOLAR' : 'NOVICE'}`;
};

/** * 5. DIRECT ENTRY INIT 
 */
window.onload = () => {
    STATE.pool = [...RAW_DATA].sort(() => Math.random() - 0.5);
    document.getElementById('loader').remove();
    renderNext();
};
