/* --- V81.1 PRODUCTION CONFIG --- */
var DEPLOY_URL = "https://script.google.com/macros/s/AKfycbxMOVzmONXP6nAHNoN92nmO2MnMPek7omYcw0JCeizbsIOQZUik0VmUK0nTfikIfFLm/exec";

/* --- INDUSTRIAL DATASET (R1 MAPPED) --- */
var DATASET = [
  { 
    "id": "SET_A_0301", 
    "set": "SET_A", 
    "category": "Gas Laws", 
    "question": "The ideal gas constant R has the same value regardless of gas identity.", 
    "option_up": "Depends on gas type", 
    "option_right": "Universal constant", 
    "option_left": "Changes with pressure", 
    "correct_option": "option_right", 
    "explanation": "R does not vary with gas identity. It is a universal constant for ideal gases.", 
    "hint": "Universal constant.", 
    "weight": 0.34 
  },
  { 
    "id": "SET_A_0302", 
    "set": "SET_A", 
    "category": "Gas Laws", 
    "question": "At constant volume an increase in temperature increases pressure.", 
    "option_up": "Pressure decreases", 
    "option_right": "Pressure remains same", 
    "option_left": "Pressure increases", 
    "correct_option": "option_left", 
    "explanation": "Higher temperature increases molecular collisions, raising pressure.", 
    "hint": "Gay-Lussac.", 
    "weight": 0.36 
  },
  { 
    "id": "SET_A_0303", 
    "set": "SET_A", 
    "category": "Gas Laws", 
    "question": "Absolute temperature must be used in gas law calculations.", 
    "option_up": "Celsius scale acceptable", 
    "option_right": "Only Fahrenheit works", 
    "option_left": "Temperature in Kelvin", 
    "correct_option": "option_left", 
    "explanation": "Kelvin scale reflects absolute temperature.", 
    "hint": "Absolute scale.", 
    "weight": 0.31 
  }
  /* ... Paste all 50 JSON objects here ... */
];

/* --- STATE ENGINE --- */
var POOL = DATASET.slice();
var sy = 0;
var isLocked = false;
var startTime = 0;
var latency = 0;

/* --- BOOT SEQUENCE --- */
function init() { 
    console.log("ALCHEMIST: System Booting...");
    setTimeout(function() { 
        var loader = document.getElementById('loader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(function() { loader.remove(); }, 500);
        }
        render(); 
    }, 1200); 
}

/* --- RENDER ENGINE --- */
function render() {
    var s = document.getElementById('stack');
    var existing = s.querySelector('.card');
    if(existing) existing.remove();
    
    if(!POOL.length) { 
        s.innerHTML = '<div class="card"><div class="card-q" style="color:#ffd600">MISSION COMPLETE</div></div>'; 
        return; 
    }
    
    var d = POOL[0];
    var card = document.createElement('div');
    card.className = "card";
    card.innerHTML = '<div class="card-q">' + d.question + '</div>';
    s.appendChild(card);
    
    // UI HUD Update
    document.getElementById('category-ui').innerText = d.category;
    document.getElementById('id-ui').innerText = d.id;
    document.getElementById('hint-ui').innerText = "HINT: " + d.hint;
    
    // Matrix Population
    document.getElementById('opt-up').innerText = d.option_up;
    document.getElementById('opt-right').innerText = d.option_right;
    document.getElementById('opt-left').innerText = d.option_left;
    document.getElementById('explanation-mount').innerText = d.explanation;

    // Reset Lock & Transitions
    document.getElementById('study-drawer').classList.remove('active');
    isLocked = false;
    bindPhysics(card);
}

/* --- TOUCH PHYSICS (V81.1 STABLE) --- */
function bindPhysics(el) {
    el.ontouchstart = function(e) { 
        sy = e.touches[0].clientY; 
        startTime = Date.now(); 
        el.style.transition = "none"; 
    };
    
    el.ontouchmove = function(e) {
        var dy = e.touches[0].clientY - sy;
        
        // Rift Trigger at 110px
        if(!isLocked && dy > 110) { 
            isLocked = true;
            latency = Date.now() - startTime;
            document.getElementById('study-drawer').classList.add('active');
            el.classList.add('study-active');
        }
        
        // Pull Resistance
        if(!isLocked && dy > 0) {
            el.style.transform = "translateY(" + (dy * 0.22) + "px)";
        }
    };

    el.ontouchend = function(e) {
        if(!isLocked) { 
            el.style.transition = "transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)"; 
            el.style.transform = "translateY(0)"; 
        }
    };
}

/* --- BACKEND TRANSMISSION (GHOST PIXEL) --- */
function submit(choice) {
    var d = POOL[0];
    var correct = (("option_" + choice.toLowerCase()) === d.correct_option);
    
    // Construct Routing URL for Telemetry Sub-Sheet
    var ping = DEPLOY_URL + 
               "?target=Telemetry" + 
               "&questionId=" + encodeURIComponent(d.id) + 
               "&result=" + correct + 
               "&vectorChoice=" + choice + 
               "&latency=" + latency +
               "&weight=" + d.weight;

    // Execute Passive Ping (Ghost Pixel)
    var img = new Image();
    img.src = ping;

    // Visual Feedback & Ejection
    var card = document.querySelector('.card');
    if(card) {
        card.style.transition = "transform 0.5s ease-in, opacity 0.4s, filter 0.5s";
        card.style.transform = "translateY(-800px) scale(1.1)";
        card.style.opacity = "0";
        card.style.filter = "blur(40px)";
    }

    // Shift to Next Question
    setTimeout(function() { 
        POOL.shift(); 
        render(); 
    }, 450);
}

// System Entry Point
window.onload = init;
