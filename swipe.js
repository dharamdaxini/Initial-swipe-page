var DATABASE = [
    { "q": "Predict spontaneity: ΔH = -120 kJ, ΔS = -150 J/K at 298 K.", "bullets": ["ΔG = ΔH - TΔS", "ΔG = -75.3 kJ (Negative)"], "j": "Exothermic release overcomes entropy loss at standard temperatures." },
    { "q": "Mechanism: (R)-2-bromobutane + aqueous NaOH?", "bullets": ["SN2 Backside Attack", "100% Walden Inversion"], "j": "The configuration flips like an umbrella in high wind." }
];

var POOL = DATABASE.slice();
var sy = 0;
var isLocked = false;

function init() { 
    setTimeout(function() { 
        var l = document.getElementById('loader');
        if(l) l.remove(); 
        renderNext(); 
    }, 1000); 
}

function renderNext() {
    var s = document.getElementById('stack');
    var existing = s.querySelector('.card');
    if(existing) existing.remove();
    
    if(!POOL.length) { 
        s.innerHTML = '<div class="card"><div class="card-q">POOL COMPLETE</div></div>'; 
        return; 
    }
    
    var q = POOL[0];
    var c = document.createElement('div');
    c.className = "card";
    c.innerHTML = '<div class="card-q">' + q.q + '</div>';
    s.appendChild(c);
    
    document.getElementById('bullet-mount').innerHTML = q.bullets.map(function(b) { 
        return '<div class="bullet-item">' + b + '</div>'; 
    }).join('');
    
    document.getElementById('judgement-text').innerText = q.j;
    document.getElementById('study-drawer').classList.remove('active');
    isLocked = false;
    
    bindPhysics(c);
}

function bindPhysics(el) {
    el.addEventListener('touchstart', function(e) { 
        sy = e.touches[0].clientY; 
        el.style.transition = "none"; 
    });
    
    el.addEventListener('touchmove', function(e) {
        var dy = e.touches[0].clientY - sy;
        if(!isLocked && dy > 100) { // Rift Trigger
            isLocked = true;
            document.getElementById('study-drawer').classList.add('active');
            el.classList.add('study-active');
        }
        if(!isLocked && dy > 0) {
            // V81.10 Addition: Added subtle rotation during pull
            el.style.transform = "translateY(" + (dy * 0.25) + "px) rotate(" + (dy/65) + "deg)";
        }
    });

    el.addEventListener('touchend', function(e) {
        var dy = e.changedTouches[0].clientY - sy;
        if(isLocked && dy < -60) { // Eject card
            el.style.transition = "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.4s";
            el.style.transform = "translateY(-800px) scale(1.1)";
            el.style.opacity = "0";
            setTimeout(function() { 
                POOL.shift(); 
                renderNext(); 
            }, 350);
        } else {
            el.style.transition = "transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)";
            el.style.transform = "translateY(0) rotate(0deg) scale(1)";
        }
    });
}

window.onload = init;
