/* --- MASTER PRODUCTION CONFIG --- */
const ENDPOINT = "https://script.google.com/macros/s/AKfycbwv_n-Q0J0hwRPIzy2D0mx54-fKNDmvKG0kPgZZwoN5xZGloJbAFP-upgMbGf/exec";

/* --- COMPLETE INDUSTRIAL DATASET (50Q) --- */
const BACKUP_DATA = [
    { "id": "SET_A_0301", "question": "The ideal gas constant R has the same value regardless of gas identity.", "option_up": "Depends on gas type", "option_right": "Universal constant", "option_left": "Changes with pressure", "correct_option": "option_right", "explanation": "R is a universal constant for ideal gases.", "hint": "Universal constant.", "weight": 0.34 },
    { "id": "SET_A_0302", "question": "At constant volume an increase in temperature increases pressure.", "option_up": "Pressure decreases", "option_right": "Pressure remains same", "option_left": "Pressure increases", "correct_option": "option_left", "explanation": "Higher temperature increases molecular collisions, raising pressure.", "hint": "Gay-Lussac.", "weight": 0.36 },
    { "id": "SET_A_0303", "question": "Absolute temperature must be used in gas law calculations.", "option_up": "Celsius scale acceptable", "option_right": "Only Fahrenheit works", "option_left": "Temperature in Kelvin", "correct_option": "option_left", "explanation": "Kelvin scale reflects absolute temperature.", "hint": "Absolute scale.", "weight": 0.31 },
    { "id": "SET_A_0304", "question": "Kinetic molecular theory assumes negligible molecular volume.", "option_up": "Molecules occupy significant volume", "option_right": "Only valid for liquids", "option_left": "Particle volume neglected", "correct_option": "option_left", "explanation": "Kinetic theory neglects molecular volume compared to container size.", "hint": "Point particles.", "weight": 0.38 },
    { "id": "SET_A_0305", "question": "Average kinetic energy of gas molecules depends only on temperature.", "option_up": "Depends on gas mass", "option_right": "Depends on pressure only", "option_left": "Depends only on temperature", "correct_option": "option_left", "explanation": "Temperature alone determines average kinetic energy.", "hint": "KE–T relation.", "weight": 0.34 },
    { "id": "SET_A_0306", "question": "Root mean square speed increases with temperature.", "option_up": "Decreases with temperature", "option_right": "Independent of temperature", "option_left": "Increases with temperature", "correct_option": "option_left", "explanation": "RMS speed rises as temperature increases.", "hint": "Speed–T relation.", "weight": 0.40 },
    { "id": "SET_A_0307", "question": "Entropy is an extensive property.", "option_up": "Independent of system size", "option_right": "Depends on system size", "option_left": "Always constant", "correct_option": "option_right", "explanation": "Entropy scales with the amount of substance.", "hint": "Extensive vs intensive.", "weight": 0.35 },
    { "id": "SET_A_0308", "question": "Specific heat capacity is an intensive property.", "option_up": "Depends on amount of substance", "option_right": "Independent of mass", "option_left": "Only pressure dependent", "correct_option": "option_right", "explanation": "Specific heat is independent of system size.", "hint": "Normalized quantity.", "weight": 0.37 },
    { "id": "SET_A_0309", "question": "The efficiency of a heat engine is always less than 100%.", "option_up": "Can reach 100%", "option_right": "Depends only on fuel", "option_left": "Always less than 100%", "correct_option": "option_left", "explanation": "No heat engine can be 100% efficient due to the second law of thermodynamics.", "hint": "Second law.", "weight": 0.42 },
    { "id": "SET_A_0310", "question": "Carnot efficiency depends only on reservoir temperatures.", "option_up": "Depends on working substance", "option_right": "Depends on engine design", "option_left": "Depends only on temperatures", "correct_option": "option_left", "explanation": "Efficiency is determined solely by the temperatures of the hot and cold reservoirs.", "hint": "Carnot limit.", "weight": 0.39 },
    { "id": "SET_A_0311", "question": "The Arrhenius plot is a graph of ln k versus 1/T.", "option_up": "k versus T", "option_right": "ln k versus T", "option_left": "ln k versus 1/T", "correct_option": "option_left", "explanation": "Arrhenius plot uses the natural log of rate constant against inverse temperature.", "hint": "Arrhenius plot.", "weight": 0.33 },
    { "id": "SET_A_0312", "question": "A catalyst provides an alternative reaction pathway.", "option_up": "Lowers ΔG", "option_right": "Changes equilibrium constant", "option_left": "Provides lower Ea pathway", "correct_option": "option_left", "explanation": "Catalysts offer a pathway with lower activation energy without being consumed.", "hint": "Energy pathway.", "weight": 0.36 },
    { "id": "SET_A_0313", "question": "Increasing surface area of a solid reactant increases reaction rate.", "option_up": "Has no effect", "option_right": "Decreases rate", "option_left": "Increases rate", "correct_option": "option_left", "explanation": "More surface area allowed for more frequent effective collisions.", "hint": "Surface exposure.", "weight": 0.31 },
    { "id": "SET_A_0314", "question": "Solubility of gases in liquids generally decreases with temperature.", "option_up": "Always increases with temperature", "option_right": "Independent of temperature", "option_left": "Decreases with temperature", "correct_option": "option_left", "explanation": "Increased kinetic energy allows gas molecules to escape the liquid phase.", "hint": "Gas escape.", "weight": 0.38 },
    { "id": "SET_A_0315", "question": "Solubility of most solids increases with temperature.", "option_up": "Always decreases", "option_right": "Independent of temperature", "option_left": "Generally increases", "correct_option": "option_left", "explanation": "Higher temperature usually facilitates the endothermic process of dissolution.", "hint": "Dissolution trend.", "weight": 0.34 },
    { "id": "SET_A_0316", "question": "The common ion effect reduces solubility of a salt.", "option_up": "Increases solubility", "option_right": "Has no effect", "option_left": "Reduces solubility", "correct_option": "option_left", "explanation": "The presence of a common ion shifts equilibrium toward the solid precipitate.", "hint": "Le Chatelier.", "weight": 0.40 },
    { "id": "SET_A_0317", "question": "Le Chatelier’s principle predicts response to stress.", "option_up": "Predicts reaction rate", "option_right": "Predicts equilibrium constant", "option_left": "Predicts shift in equilibrium", "correct_option": "option_left", "explanation": "Predicts how a system at equilibrium responds to changes in conditions.", "hint": "Stress response.", "weight": 0.35 },
    { "id": "SET_A_0318", "question": "Increasing pressure favors side with fewer gas moles.", "option_up": "Side with more moles", "option_right": "No effect ever", "option_left": "Fewer gas moles", "correct_option": "option_left", "explanation": "Equilibrium shifts to reduce pressure by favoring the side with fewer gas particles.", "hint": "Mole count.", "weight": 0.37 },
    { "id": "SET_A_0319", "question": "Adding a catalyst does not shift equilibrium position.", "option_up": "Shifts equilibrium", "option_right": "Changes K value", "option_left": "No shift in position", "correct_option": "option_left", "explanation": "Catalysts increase forward and backward rates equally.", "hint": "Rate vs equilibrium.", "weight": 0.42 },
    { "id": "SET_A_0320", "question": "Equilibrium constants are independent of initial concentrations.", "option_up": "Depend on starting amounts", "option_right": "Depend on catalyst", "option_left": "Independent of initial amounts", "correct_option": "option_left", "explanation": "K depends only on temperature for a specific reaction.", "hint": "K property.", "weight": 0.39 },
    { "id": "SET_A_0321", "question": "Oxidation number represents formal electron bookkeeping.", "option_up": "Actual charge only", "option_right": "Mass number", "option_left": "Formal electron accounting", "correct_option": "option_left", "explanation": "Oxidation numbers track the distribution of electrons in compounds.", "hint": "Electron count.", "weight": 0.33 },
    { "id": "SET_A_0322", "question": "Electronegativity measures tendency to attract electrons.", "option_up": "To lose electrons", "option_right": "To attract electrons", "option_left": "To gain protons", "correct_option": "option_right", "explanation": "It quantifies an atom's ability to pull electron density toward itself in a bond.", "hint": "Electron pull.", "weight": 0.36 },
    { "id": "SET_A_0323", "question": "Standard hydrogen electrode has potential defined as zero.", "option_up": "Depends on conditions", "option_right": "Nonzero reference", "option_left": "Zero by definition", "correct_option": "option_left", "explanation": "SHE serves as the universal reference point for cell potentials.", "hint": "Reference electrode.", "weight": 0.31 },
    { "id": "SET_A_0324", "question": "Increasing temperature generally decreases cell potential.", "option_up": "Always increases potential", "option_right": "Has no effect", "option_left": "Generally decreases potential", "correct_option": "option_left", "explanation": "Temperature influences the Nernst equation variables.", "hint": "Temperature effect.", "weight": 0.38 },
    { "id": "SET_A_0325", "question": "Beer–Lambert law can fail at high concentrations.", "option_up": "Always holds", "option_right": "Only fails at low concentration", "option_left": "Deviates at high concentration", "correct_option": "option_left", "explanation": "Interactions between molecules at high density cause non-linear absorption.", "hint": "Linearity limits.", "weight": 0.34 },
    { "id": "SET_A_0326", "question": "Absorbance is directly proportional to path length.", "option_up": "Independent of path length", "option_right": "Inversely proportional", "option_left": "Directly proportional", "correct_option": "option_left", "explanation": "Longer path length means more interaction with absorbing species.", "hint": "Path length.", "weight": 0.40 },
    { "id": "SET_A_0327", "question": "In NMR, shielding shifts resonance upfield.", "option_up": "Downfield shift", "option_right": "No shift", "option_left": "Upfield shift", "correct_option": "option_left", "explanation": "Increased electron density around a nucleus shields it from the external magnetic field.", "hint": "Shielding.", "weight": 0.35 },
    { "id": "SET_A_0328", "question": "Deshielded protons resonate downfield.", "option_up": "Upfield shift", "option_right": "No shift", "option_left": "Downfield shift", "correct_option": "option_left", "explanation": "Nearby electronegative atoms pull electrons away, deshielding the nucleus.", "hint": "Chemical shift.", "weight": 0.37 },
    { "id": "SET_A_0329", "question": "A straight line has constant first derivative.", "option_up": "Variable derivative", "option_right": "Zero derivative always", "option_left": "Constant derivative", "correct_option": "option_left", "explanation": "The slope (derivative) of y = mx + c is always 'm'.", "hint": "Derivative concept.", "weight": 0.42 },
    { "id": "SET_A_0330", "question": "The integral of a constant is a linear function.", "option_up": "Quadratic function", "option_right": "Exponential function", "option_left": "Linear function", "correct_option": "option_left", "explanation": "Integrating 'k' with respect to 'x' yields 'kx + C'.", "hint": "Integration result.", "weight": 0.39 },
    { "id": "SET_A_0331", "question": "Acidic oxides form acids in water.", "option_up": "Form bases only", "option_right": "Do not react with water", "option_left": "Form acids", "correct_option": "option_left", "explanation": "Non-metal oxides (like SO2) react with water to form acidic solutions.", "hint": "Oxide type.", "weight": 0.33 },
    { "id": "SET_A_0332", "question": "Basic oxides neutralize acids.", "option_up": "Form acids", "option_right": "Have no reaction", "option_left": "Neutralize acids", "correct_option": "option_left", "explanation": "Metal oxides act as bases in neutralization reactions.", "hint": "Acid–base.", "weight": 0.36 },
    { "id": "SET_A_0333", "question": "The carbon cycle involves exchange among multiple Earth systems.", "option_up": "Only atmosphere", "option_right": "Only oceans", "option_left": "Multiple Earth systems", "correct_option": "option_left", "explanation": "Carbon flows through the atmosphere, hydrosphere, biosphere, and geosphere.", "hint": "Earth systems.", "weight": 0.31 },
    { "id": "SET_A_0334", "question": "Metabolic pathways consist of sequential enzyme-catalyzed steps.", "option_up": "Single-step reactions", "option_right": "Random reactions", "option_left": "Sequential enzyme steps", "correct_option": "option_left", "explanation": "Biochemical reactions occur in ordered chains or cycles.", "hint": "Pathway flow.", "weight": 0.38 },
    { "id": "SET_A_0335", "question": "ATP acts as the primary energy currency of the cell.", "option_up": "Structural protein", "option_right": "Genetic material", "option_left": "Energy carrier", "correct_option": "option_left", "explanation": "High-energy phosphate bonds provide fuel for cellular work.", "hint": "Energy currency.", "weight": 0.34 },
    { "id": "SET_A_0336", "question": "Coenzymes assist enzymes by transferring chemical groups.", "option_up": "Replace enzymes", "option_right": "Act independently", "option_left": "Transfer groups or electrons", "correct_option": "option_left", "explanation": "Small organic molecules like NADH carry groups between enzymes.", "hint": "Helper molecules.", "weight": 0.40 },
    { "id": "SET_A_0337", "question": "Radioisotopes are used in medical diagnostics.", "option_up": "Only in industry", "option_right": "Only in power generation", "option_left": "Medical diagnostics", "correct_option": "option_left", "explanation": "Tracers like Tc-99m allow non-invasive imaging of organs.", "hint": "Imaging use.", "weight": 0.35 },
    { "id": "SET_A_0338", "question": "Radioactive tracers follow biochemical pathways.", "option_up": "Destroy tissues", "option_right": "Have no application", "option_left": "Trace pathways", "correct_option": "option_left", "explanation": "They allow researchers to 'see' the flow of metabolic products.", "hint": "Tracing.", "weight": 0.37 },
    { "id": "SET_A_0339", "question": "Superconductors exhibit zero electrical resistance.", "option_up": "Very high resistance", "option_right": "Low but nonzero resistance", "option_left": "Zero resistance", "correct_option": "option_left", "explanation": "Electric current flows indefinitely without energy loss below Tc.", "hint": "Zero resistance.", "weight": 0.42 },
    { "id": "SET_A_0340", "question": "Superconductivity occurs below a critical temperature.", "option_up": "At any temperature", "option_right": "Only at high temperature", "option_left": "Below critical temperature", "correct_option": "option_left", "explanation": "The transition to superconductivity is temperature-dependent.", "hint": "Critical temperature.", "weight": 0.39 },
    { "id": "SET_A_0341", "question": "Polymer degradation can occur due to UV exposure.", "option_up": "Never degrades", "option_right": "Only mechanical stress", "option_left": "Heat or UV causes degradation", "correct_option": "option_left", "explanation": "Photodegradation breaks backbone bonds in long-chain polymers.", "hint": "Degradation factors.", "weight": 0.33 },
    { "id": "SET_A_0342", "question": "Biodegradable polymers break down biologically.", "option_up": "Never decompose", "option_right": "Only chemically degrade", "option_left": "Broken down biologically", "correct_option": "option_left", "explanation": "Microorganisms secrete enzymes to metabolize the polymer chains.", "hint": "Biodegradation.", "weight": 0.36 },
    { "id": "SET_A_0343", "question": "Heterogeneous catalysis occurs at a solid surface.", "option_up": "In solution only", "option_right": "In gas phase only", "option_left": "At solid surface", "correct_option": "option_left", "explanation": "Reactants adsorb to the solid catalyst surface to react.", "hint": "Catalyst phase.", "weight": 0.31 },
    { "id": "SET_A_0344", "question": "Homogeneous catalysis involves the same phase.", "option_up": "Different phases", "option_right": "Only solids", "option_left": "Same phase", "correct_option": "option_left", "explanation": "Catalyst and reactants are in the same state (usually liquid).", "hint": "Same phase.", "weight": 0.38 },
    { "id": "SET_A_0345", "question": "A sol is a colloidal dispersion of solid in liquid.", "option_up": "Liquid in liquid", "option_right": "Gas in liquid", "option_left": "Solid in liquid", "correct_option": "option_left", "explanation": "Fine solid particles suspended in a liquid medium.", "hint": "Sol type.", "weight": 0.34 },
    { "id": "SET_A_0346", "question": "A gel is a semi-solid colloidal system.", "option_up": "Free-flowing liquid", "option_right": "Gas dispersion", "option_left": "Semi-solid network", "correct_option": "option_left", "explanation": "Cross-linked networks entrap a liquid phase.", "hint": "Gel nature.", "weight": 0.40 },
    { "id": "SET_A_0347", "question": "Electroplating uses electric current to deposit metal.", "option_up": "Without electricity", "option_right": "By chemical reduction only", "option_left": "Using electric current", "correct_option": "option_left", "explanation": "Cations are reduced at the cathode using an external power source.", "hint": "Metal coating.", "weight": 0.35 },
    { "id": "SET_A_0348", "question": "Corrosion involves oxidation of metals.", "option_up": "Reduction of metals", "option_right": "No electron transfer", "option_left": "Oxidation of metals", "correct_option": "option_left", "explanation": "Metal atoms lose electrons to form oxides or salts.", "hint": "Metal loss.", "weight": 0.37 },
    { "id": "SET_A_0349", "question": "Buffer solutions resist changes in pH.", "option_up": "Cause rapid pH change", "option_right": "Have no effect on pH", "option_left": "Resist pH change", "correct_option": "option_left", "explanation": "Buffers neutralize small amounts of added acid or base.", "hint": "pH stability.", "weight": 0.42 },
    { "id": "SET_A_0350", "question": "A buffer contains a weak acid and its conjugate base.", "option_up": "Strong acid only", "option_right": "Strong base only", "option_left": "Weak acid and conjugate base", "correct_option": "option_left", "explanation": "The pair provides both acidic and basic components for neutralizing.", "hint": "Buffer pair.", "weight": 0.39 }
];

/* --- STATE ENGINE --- */
let POOL = [...BACKUP_DATA].sort(() => Math.random() - .5);
let SCORE = 0, isTransitioning = false, startTime = 0, latency = 0;

/* --- UI UTILS --- */
const formatChem = t => t.toString().replace(/([A-Z][a-z]?)(\d+)/g,'$1<sub>$2</sub>').replace(/(\d*)([+\-])/g, '<sup>$1$2</sup>');

/* --- BOOT SEQUENCE --- */
async function init() {
    console.log("ALCHEMIST V80.0: Online.");
    setTimeout(() => { 
        const loader = document.getElementById('loader');
        if(loader) loader.remove(); 
        renderNext(); 
    }, 1200);
}

/* --- RENDER ENGINE --- */
function renderNext() {
    const s = document.getElementById('stack'); 
    s.innerHTML = "";
    
    if (!POOL.length) { renderEnd(); return; }
    
    const q = POOL[0];
    const c = document.createElement('div'); 
    c.className = "card";
    
    c.innerHTML = `
        <div class="card-q">${formatChem(q.question)}</div>
        <div class="swipe-label sl-up">${q.option_up}</div>
        <div class="swipe-label sl-left">${q.option_left}</div>
        <div class="swipe-label sl-right">${q.option_right}</div>
        <div class="swipe-label sl-down sl-down-hint">${q.hint}</div>
        <div class="overlay">
            <div class="overlay-label">LOGIC ANALYSIS</div>
            <div class="overlay-body">${formatChem(q.explanation)}</div>
            <button class="btn" onclick="this.parentElement.classList.remove('active')">CONTINUE</button>
        </div>
    `;
    s.appendChild(c);
    document.getElementById('id-ui').innerText = q.id;
    bindPhysics(c, q);
}

/* --- PHYSICS ENGINE (32px CLAMP) --- */
function bindPhysics(el, data) {
    let x=0, y=0, sx=0, sy=0, active=false, triggerDir=null;
    const labels = { 
        up: el.querySelector('.sl-up'), 
        dn: el.querySelector('.sl-down'), 
        lt: el.querySelector('.sl-left'), 
        rt: el.querySelector('.sl-right') 
    };

    const start = e => { 
        if(isTransitioning) return; 
        active=true; 
        const p = e.touches ? e.touches[0] : e; 
        sx=p.clientX; sy=p.clientY; 
        startTime = Date.now(); 
        el.style.transition="none"; 
    };
    
    const move = e => {
        if(!active) return; 
        const p = e.touches ? e.touches[0] : e;
        const dx = p.clientX - sx, dy = p.clientY - sy, dist = Math.sqrt(dx*dx + dy*dy);
        const opacity = Math.min(dist/24, 1);
        
        x = (dist > 32) ? dx * (32/dist) : dx; 
        y = (dist > 32) ? dy * (32/dist) : dy;
        
        let ang = Math.atan2(-y, x) * (180/Math.PI); 
        if(ang<0) ang+=360;
        
        Object.values(labels).forEach(l => l.style.opacity = 0);
        
        if(dist > 5) {
            let L = (ang>=45&&ang<135)?labels.up:(ang>=135&&ang<225)?labels.lt:(ang>=225&&ang<315)?labels.dn:labels.rt;
            L.style.opacity = opacity; 
            L.style.transform = `scale(${0.85 + (opacity*0.15)})`;
        }
        
        el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${x/25}deg)`;
        triggerDir = (dist >= 32) ? ((ang>=45&&ang<135)?"UP":(ang>=135&&ang<225)?"LEFT":(ang>=225&&ang<315)?"DOWN":"RIGHT") : null;
    };
    
    const end = () => {
        if(!active) return; 
        active=false;
        if(triggerDir) {
            if(triggerDir === "DOWN") {
                latency = Date.now() - startTime;
                el.querySelector('.overlay').classList.add('active');
                el.style.transition="transform .3s"; 
                el.style.transform="translate3d(0,0,0)";
            } else handleAction(el, data, x, y, triggerDir);
        } else { 
            el.style.transition="transform .2s"; 
            el.style.transform="translate3d(0,0,0)"; 
        }
    };
    
    el.onmousedown=start; window.onmousemove=move; window.onmouseup=end;
    el.ontouchstart=start; el.ontouchmove=move; el.ontouchend=end;
}

/* --- BACKEND HANDSHAKE --- */
function handleAction(el, data, x, y, dir) {
    isTransitioning = true;
    const correct = ("option_" + dir.toLowerCase()) === data.correct_option;
    if(correct) SCORE += 10;
    
    // GHOST PIXEL TELEMETRY
    new Image().src = `${ENDPOINT}?target=Telemetry&questionId=${data.id}&result=${correct}&vectorChoice=${dir}&latency=${latency}`;
    
    el.style.transition="transform .4s ease-in, opacity .4s";
    el.style.transform=`translate3d(${x*12}px,${y*12}px,0) rotate(${x/2}deg)`; 
    el.style.opacity="0";
    
    setTimeout(() => { 
        POOL.shift(); 
        updateUI(); 
        renderNext(); 
        isTransitioning=false; 
    }, 400);
}

/* --- HUD UPDATE --- */
function updateUI() {
    document.getElementById('xp-ui').innerText = `${SCORE} XP`;
    document.getElementById('progress-bar').style.width = `${(1 - POOL.length/BACKUP_DATA.length)*100}%`;
}

/* --- RE-INITIALIZATION LOOP --- */
function renderEnd() {
    const s = document.getElementById('stack');
    s.innerHTML = `
        <div class="card">
            <div class="card-q">MISSION COMPLETE<br><span style="color:var(--gold)">${SCORE} XP EARNED</span></div>
            <button class="btn" style="margin-top:20px" onclick="location.reload()">RESTART LOOP</button>
        </div>
    `;
}

window.onload = init;
