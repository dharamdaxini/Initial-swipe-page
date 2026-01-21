/* --- UNIVERSAL ALCHEMIST JS V81.53 --- */
let POOL = [], SCORE = 0, DIFFICULTY = 1, isTransitioning = false;
let questionStartTime = 0, latencyMS = 0, confidenceRating = null, isLocked = false, decisionPath = "";

const CM_0_5 = 16, CM_1_0 = 32, CM_3_0 = 96;
const MAX_TEXT_PX = 190, MAX_BULB_PX = 155;

// PASTE YOUR LATEST DEPLOYMENT URL HERE
const DEPLOY_URL = "https://script.google.com/macros/s/AKfycbzXysKDBmYF6cyPVG55ShZ1k0u0kK7vJQ7Vm65OqGUEGgEFdZdtfi7O1TRnodJh_GaG/exec";

// STRESS TEST POOL: CHEMISTRY SETS B & C
const DATABASE = [
    { "q": "Signs of ΔH and ΔS for spontaneity at all temps?", "topic": "Thermodynamics", "difficulty": "B", "c": "UP", "bullets": ["ΔH must be negative (Exothermic)", "ΔS must be positive (Increased entropy)"], "j": "Nature favors states of lower energy and higher chaos." },
    { "q": "Under what condition is a reaction with +ΔH and +ΔS spontaneous?", "topic": "Thermodynamics", "difficulty": "C", "c": "UP", "bullets": ["High Temperatures", "TΔS term must outweigh the ΔH barrier"], "j": "The 'Entropy Overdrive' threshold where heat fuels spontaneity." },
    { "q": "Order of reaction if doubling [A] increases rate 4x?", "topic": "Kinetics", "difficulty": "B", "c": "UP", "bullets": ["Rate = k[A]^2", "Square relationship (2^2 = 4)"], "j": "A standard second-order quadratic rate law." },
    { "q": "How does a catalyst affect the rate constant k and activation energy Ea?", "topic": "Kinetics", "difficulty": "C", "c": "UP", "bullets": ["Lowers Ea (pathway shift)", "Increases k exponentially (Arrhenius)"], "j": "Catalysts are molecular shortcuts, not energy sources." },
    { "q": "Effect of increasing pressure on: N2 + 3H2 ⇌ 2NH3?", "topic": "Equilibrium", "difficulty": "B", "c": "UP", "bullets": ["Shifts Right (Forward)", "Favors side with fewer gas moles (4 to 2)"], "j": "Le Chatelier's principle acts as a pressure-relief valve." },
    { "q": "Does adding inert gas at constant volume shift equilibrium?", "topic": "Equilibrium", "difficulty": "C", "c": "UP", "bullets": ["No shift occurs", "Partial pressures of reactants/products stay constant"], "j": "Total pressure rises, but the chemical 'tension' remains unchanged." },
    { "q": "Why do polar aprotic solvents favor SN2 reactions?", "topic": "Organic", "difficulty": "B", "c": "UP", "bullets": ["They don't solvate the nucleophile", "Keeps nucleophile 'naked' and highly reactive"], "j": "Solvent choice determines the speed of the backside attack." },
    { "q": "Predicted stereochemistry of an SN2 reaction at a chiral center?", "topic": "Organic", "difficulty": "C", "c": "UP", "bullets": ["Walden Inversion", "100% inversion of configuration"], "j": "The spatial equivalent of an umbrella turning inside out in the wind." }
];

function init(){ POOL = [...DATABASE]; setTimeout(() => { document.getElementById('loader').remove(); renderNext(); }, 1000); }

function updateUI(){ 
    document.getElementById('xp-ui').innerText = `${SCORE} XP`; 
    document.getElementById('difficulty-ui').innerText = `LEVEL: ${DIFFICULTY}`;
    document.getElementById('progress-bar').style.width = `${(SCORE % 100)}%`; 
}

function renderNext(){
    const s = document.getElementById('stack');
    const existing = s.querySelector('.card'); if(existing) existing.remove();
    if(!POOL.length){ s.innerHTML = `<div class="card"><div class="card-q">MISSION COMPLETE</div></div>`; return; }
    
    const q = POOL[0];
    const c = document.createElement('div'); c.className = "card";
    c.innerHTML = `<div class="card-q">${format(q.q)}</div>`;
    s.appendChild(c); 
    
    // ANALYTICS RESET
    questionStartTime = Date.now(); 
    latencyMS = 0; confidenceRating = null; isLocked = false; decisionPath = "";
    
    document.getElementById('bullet-mount').innerHTML = q.bullets.map(b => `<li class="bullet-item">${format(b)}</li>`).join('');
    document.getElementById('judgement-text').innerText = q.j;
    updateUI();
    bindPhysics(c, q);
}

function bindPhysics(el, qData){
    let sx=0, sy=0, active=false, dir=null, finalDist=0;
    const labels = { up: document.getElementById('sl-up'), dn: document.getElementById('sl-dn'), lt: document.getElementById('sl-lt'), rt: document.getElementById('sl-rt'), dnLab: document.getElementById('sl-dn-label') };
    const bulb = document.getElementById('bulb-element');
    const wrap = document.getElementById('study-mount');
