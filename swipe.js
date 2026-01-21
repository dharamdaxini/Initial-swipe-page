/* ALCHEMIST V81.8 - RESOLUTE ENGINE
   Physics: 32px Clamp | 24px Opacity
   Logic: Contrastive Explanations & Universal Hints
*/

let POOL = [], SCORE = 0, isTransitioning = false;
const CLAMP = 32, OPACITY = 24;

/**
 * CHEMISTRY FORMATTER
 * Automatically handles subscripts, superscripts, and paragraph breaks (||)
 */
const format = t => {
    if(!t) return "";
    return t.toString()
        .replace(/([A-Z][a-z]?)(\d+)/g,'$1<sub>$2</sub>')
        .replace(/(\d*)([+\-])/g, '<sup>$1$2</sup>')
        .replace(/\|\|/g, '<br><br>')
        .replace(/Δ/g, '&Delta;');
};

/**
 * INITIALIZATION
 * Shuffles the integrated dataset and removes the V81.8 loader
 */
function init(){
    const l = document.getElementById('loader');
    // Ensure DATABASE is defined in your HTML or questions.js
    if(typeof DATABASE !== 'undefined') {
        POOL = [...DATABASE].sort(() => Math.random() - 0.5);
        setTimeout(() => { if(l) l.remove(); renderNext(); }, 1000);
    } else {
        console.error("DATABASE not found. Check your questions.js.");
    }
}

/**
 * RENDERING ENGINE
 * Creates the card and attaches the V81.8 Centered Hint Layout
 */
function renderNext(){
    const s = document.getElementById('stack'); s.innerHTML = "";
    
    if(!POOL.length){ 
        s.innerHTML = `
            <div class="card">
                <div class="card-q">MISSION COMPLETE<br>${SCORE} XP</div>
                <button class="btn" onclick="location.reload()">REPLAY</button>
            </div>`; 
        return; 
    }

    const q = POOL.shift();
    const c = document.createElement('div'); 
    c.className = "card";
    
    c.innerHTML = `
        <div class="card-q">${format(q.question_text)}</div>
        <div class="swipe-label sl-up">${format(q.swipe_up_label)}</div>
        <div class="swipe-label sl-lt">${format(q.swipe_left_label)}</div>
        <div class="swipe-label sl-rt">${format(q.swipe_right_label)}</div>
        <div class="swipe-label sl-dn">
            <span class="sl-down-emoji">💡</span>
            <span class="sl-down-hint-text">${format(q.hint)}</span>
        </div>
        <div class="overlay">
            <div style="color:var(--gold); font-size:0.75rem; margin-bottom:12px; letter-spacing:2px; font-weight:900;">ANALYSIS</div>
            <div class="overlay-body">${format(q.explanation)}</div>
            <button class="btn" onclick="this.parentElement.classList.remove('active')">CONTINUE</button>
        </div>
    `;
    
    s.appendChild(c); 
    bindPhysics(c, q);
}

/**
 * PHYSICS ENGINE
 * Anchors the card and handles the Down-Swipe Hint trigger
 */
function bindPhysics(el, data){
    let sx=0, sy=0, active=false, dir=null;
    const labels = { 
        up: el.querySelector('.sl-up'), 
        dn: el.querySelector('.sl-dn'), 
        lt: el.querySelector('.sl-lt'), 
        rt: el.querySelector('.sl-rt') 
    };

    const start = e => { 
        if(isTransitioning || el.querySelector('.overlay').classList.contains('active')) return; 
        active = true; 
        const p = e.touches ? e.touches[0] : e; 
        sx = p.clientX; sy = p.clientY; 
        el.style.transition = "none"; 
    };

    const move = e => {
        if(!active) return; 
        const p = e.touches ? e.touches[0] : e;
        const dx = p.clientX - sx;
        const dy = p.clientY - sy;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        // Calculate label opacity based on 24px threshold
        const op = Math.min(dist / OPACITY, 1);
        
        // Determine swipe angle
        let ang = Math.atan2(-dy, dx) * (180 / Math.PI); 
        if(ang < 0) ang += 360;
        
        // Reset and show appropriate label
        Object.values(labels).forEach(l => { if(l) l.style.opacity = 0; });
        if(dist > 5){
            if(ang>=45 && ang<135) labels.up.style.opacity = op;
            else if(ang>=135 && ang<225) labels.lt.style.opacity = op;
            else if(ang>=225 && ang<315) labels.dn.style.opacity = op;
            else labels.rt.style.opacity = op;
        }

        // Apply visual transformation
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${dx/25}deg)`;
        
        // Lock direction at 32px clamp
        dir = (dist >= CLAMP) ? (ang>=45 && ang<135 ? "UP" : ang>=135 && ang<225 ? "LEFT" : ang>=225 && ang<315 ? "DOWN" : "RIGHT") : null;
    };

    const end = () => {
        if(!active) return; 
        active = false;
        
        if(dir === "DOWN"){ 
            // Trigger Hint Overlay
            el.querySelector('.overlay').classList.add('active'); 
            el.style.transition = "transform .3s"; 
            el.style.transform = "translate3d(0,0,0) rotate(0deg)"; 
        } else if(dir){
            // Process Answer
            isTransitioning = true; 
            const correctDir = data.correct.toUpperCase();
            if(dir === correctDir) SCORE += (10 * (data.weight || 1));
            
            el.style.transition = "transform .4s ease-in"; 
            el.style.transform = `translate3d(${dir==="LEFT"?-400:400}px, ${dir==="UP"?-400:400}px, 0)`;
            
            setTimeout(() => { 
                el.remove(); 
                isTransitioning = false; 
                renderNext(); 
                updateUI(); 
            }, 300);
        } else { 
            // Snap back
            el.style.transition = "transform .2s"; 
            el.style.transform = "translate3d(0,0,0) rotate(0deg)"; 
        }
        Object.values(labels).forEach(l => { if(l) l.style.opacity = 0; });
    };

    // Event Bindings
    el.onmousedown = start; window.onmousemove = move; window.onmouseup = end; 
    el.ontouchstart = start; el.ontouchmove = move; el.ontouchend = end;
}

/**
 * UI UPDATER
 * Manages XP and Progress Bar states
 */
function updateUI(){ 
    document.getElementById('xp-ui').innerText = `${SCORE} XP`; 
    document.getElementById('progress-bar').style.width = `${(SCORE % 100)}%`; 
}

window.onload = init;
