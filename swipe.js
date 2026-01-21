var DB = [
    { "q": "Predict spontaneity: ΔH = -120 kJ, ΔS = -150 J/K at 298 K.", "b": ["ΔG = ΔH - TΔS", "Negative ΔG = Spontaneous"], "j": "Exothermic release overcomes entropy loss at 298K." },
    { "q": "Hybridization of Carbon in Ethane (CH3-CH3)?", "b": ["4 single bonds", "Tetrahedral geometry"], "j": "Sp3 allows for flexible molecular rotation." }
];

var POOL = DB.slice();
var sy = 0;
var isLocked = false;

function init() { 
    setTimeout(function() { 
        var l = document.getElementById('loader');
        if(l) l.remove(); 
        render(); 
    }, 1000); 
}

function render() {
    var s = document.getElementById('stack');
    var existing = s.querySelector('.card');
    if(existing) existing.remove();
    
    if(!POOL.length) { 
        s.innerHTML = '<div class="card"><div class="card-q" style="color:#ffd600">STAY HUNGRY</div></div>'; 
        return; 
    }
    
    var data = POOL[0];
    var card = document.createElement('div');
    card.className = "card";
    card.innerHTML = '<div class="card-q">' + data.q + '</div>';
    s.appendChild(card);
    
    document.getElementById('bullet-mount').innerHTML = data.b.map(function(item) { 
        return '<div class="bullet-item">' + item + '</div>'; 
    }).join('');
    
    document.getElementById('judgement-text').innerText = data.j;
    document.getElementById('study-drawer').classList.remove('active');
    isLocked = false;
    
    bindPhysics(card);
}

function bindPhysics(el) {
    el.ontouchstart = function(e) { 
        sy = e.touches[0].clientY; 
        el.style.transition = "none"; 
    };
    
    el.ontouchmove = function(e) {
        var dy = e.touches[0].clientY - sy;
        if(!isLocked && dy > 110) { // Rift threshold
            isLocked = true;
            document.getElementById('study-drawer').classList.add('active');
            el.classList.add('study-active');
        }
        if(!isLocked && dy > 0) {
            // V81.10 Physics: Resistance pull + subtle tilt
            el.style.transform = "translateY(" + (dy * 0.25) + "px) rotate(" + (dy/65) + "deg)";
        }
    };

    el.ontouchend = function(e) {
        var dy = e.changedTouches[0].clientY - sy;
        if(isLocked && dy < -60) { // Eject gesture
            el.style.transition = "transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.4s";
            el.style.transform = "translateY(-800px) scale(1.1)";
            el.style.opacity = "0";
            setTimeout(function() { 
                POOL.shift(); 
                render(); 
            }, 350);
        } else {
            el.style.transition = "transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)";
            el.style.transform = "translateY(0) rotate(0deg) scale(1)";
        }
    };
}

window.onload = init;
