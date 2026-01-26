
// LIVE ENDPOINT (Google Sheet Connection)
const ENDPOINT = "https://script.google.com/macros/s/AKfycbxaMo1Gi8KjfYOr1_pHJI5XYJ1t9FK4PWkFCm8lU4MsCmUXvY0nSUIqYTAqhpumFRFL/exec";

const BACKUP_DATA = [
  {
    "id": "SET_A_0301",
    "set": "SET_A",
    "category": "Gas Laws",
    "question": "The ideal gas constant R has the same value regardless of gas identity.",
    "option_up": "Depends on gas type",
    "option_right": "Universal constant",
    "option_left": "Changes with pressure",
    "correct_option": "option_right",
    "explanation": "R does not vary with gas identity. Pressure does not alter the constant. R is a universal constant for ideal gases.",
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
  },
  {
    "id": "SET_A_0304",
    "set": "SET_A",
    "category": "Physical Chemistry",
    "question": "Kinetic molecular theory assumes negligible molecular volume.",
    "option_up": "Molecules occupy significant volume",
    "option_right": "Only valid for liquids",
    "option_left": "Particle volume neglected",
    "correct_option": "option_left",
    "explanation": "Kinetic theory neglects molecular volume compared to container size.",
    "hint": "Point particles.",
    "weight": 0.38
  },
  {
    "id": "SET_A_0305",
    "set": "SET_A",
    "category": "Physical Chemistry",
    "question": "Average kinetic energy of gas molecules depends only on temperature.",
    "option_up": "Depends on gas mass",
    "option_right": "Depends on pressure only",
    "option_left": "Depends only on temperature",
    "correct_option": "option_left",
    "explanation": "Temperature alone determines average kinetic energy.",
    "hint": "KE–T relation.",
    "weight": 0.34
  },
  {
    "id": "SET_A_0306",
    "set": "SET_A",
    "category": "Physical Chemistry",
    "question": "Root mean square speed increases with temperature.",
    "option_up": "Decreases with temperature",
    "option_right": "Independent of temperature",
    "option_left": "Increases with temperature",
    "correct_option": "option_left",
    "explanation": "RMS speed rises as temperature increases.",
    "hint": "Speed–T relation.",
    "weight": 0.40
  },
  {
    "id": "SET_A_0307",
    "set": "SET_A",
    "category": "Thermodynamics",
    "question": "Entropy is an extensive property.",
    "option_up": "Independent of system size",
    "option_right": "Depends on system size",
    "option_left": "Always constant",
    "correct_option": "option_right",
    "explanation": "Entropy scales with the amount of substance.",
    "hint": "Extensive vs intensive.",
    "weight": 0.35
  },
  {
    "id": "SET_A_0308",
    "set": "SET_A",
    "category": "Thermodynamics",
    "question": "Specific heat capacity is an intensive property.",
    "option_up": "Depends on amount of substance",
    "option_right": "Independent of mass",
    "option_left": "Only pressure dependent",
    "correct_option": "option_right",
    "explanation": "Specific heat is independent of system size.",
    "hint": "Normalized quantity.",
    "weight": 0.37
  },
  {
    "id": "SET_A_0309",
    "set": "SET_A",
    "category": "Thermodynamics",
    "question": "The efficiency of a heat engine is always less than 100%.",
    "option_up": "Can reach 100%",
    "option_right": "Depends only on fuel",
    "option_left": "Always less than 100%",
    "correct_option": "option_left",
    "explanation": "No heat engine can be 100% efficient.",
    "hint": "Second law.",
    "weight": 0.42
  },
  {
    "id": "SET_A_0310",
    "set": "SET_A",
    "category": "Thermodynamics",
    "question": "Carnot efficiency depends only on reservoir temperatures.",
    "option_up": "Depends on working substance",
    "option_right": "Depends on engine design",
    "option_left": "Depends only on temperatures",
    "correct_option": "option_left",
    "explanation": "Carnot efficiency is determined solely by temperatures.",
    "hint": "Carnot limit.",
    "weight": 0.39
  }
 ,
{
  "id": "SET_A_0311",
  "set": "SET_A",
  "category": "Kinetics",
  "question": "The Arrhenius plot is a graph of ln k versus 1/T.",
  "option_up": "k versus T",
  "option_right": "ln k versus T",
  "option_left": "ln k versus 1/T",
  "correct_option": "option_left",
  "explanation": "Arrhenius plot uses ln k against inverse temperature.",
  "hint": "Arrhenius plot.",
  "weight": 0.33
},
{
  "id": "SET_A_0312",
  "set": "SET_A",
  "category": "Kinetics",
  "question": "A catalyst provides an alternative reaction pathway.",
  "option_up": "Lowers ΔG",
  "option_right": "Changes equilibrium constant",
  "option_left": "Provides lower Ea pathway",
  "correct_option": "option_left",
  "explanation": "Catalysts offer a pathway with lower activation energy.",
  "hint": "Energy pathway.",
  "weight": 0.36
},
{
  "id": "SET_A_0313",
  "set": "SET_A",
  "category": "Kinetics",
  "question": "Increasing surface area of a solid reactant increases reaction rate.",
  "option_up": "Has no effect",
  "option_right": "Decreases rate",
  "option_left": "Increases rate",
  "correct_option": "option_left",
  "explanation": "More surface area allows more effective collisions.",
  "hint": "Surface exposure.",
  "weight": 0.31
},
{
  "id": "SET_A_0314",
  "set": "SET_A",
  "category": "Solutions",
  "question": "Solubility of gases in liquids generally decreases with temperature.",
  "option_up": "Always increases with temperature",
  "option_right": "Independent of temperature",
  "option_left": "Decreases with temperature",
  "correct_option": "option_left",
  "explanation": "Higher temperature reduces gas solubility in liquids.",
  "hint": "Gas escape.",
  "weight": 0.38
},
{
  "id": "SET_A_0315",
  "set": "SET_A",
  "category": "Solutions",
  "question": "Solubility of most solids increases with temperature.",
  "option_up": "Always decreases",
  "option_right": "Independent of temperature",
  "option_left": "Generally increases",
  "correct_option": "option_left",
  "explanation": "Most solids dissolve better at higher temperatures.",
  "hint": "Dissolution trend.",
  "weight": 0.34
},
{
  "id": "SET_A_0316",
  "set": "SET_A",
  "category": "Solutions",
  "question": "The common ion effect reduces solubility of a salt.",
  "option_up": "Increases solubility",
  "option_right": "Has no effect",
  "option_left": "Reduces solubility",
  "correct_option": "option_left",
  "explanation": "Common ions suppress solubility.",
  "hint": "Le Châtelier.",
  "weight": 0.40
},
{
  "id": "SET_A_0317",
  "set": "SET_A",
  "category": "Equilibrium",
  "question": "Le Châtelier’s principle predicts response to stress.",
  "option_up": "Predicts reaction rate",
  "option_right": "Predicts equilibrium constant",
  "option_left": "Predicts shift in equilibrium",
  "correct_option": "option_left",
  "explanation": "The principle predicts how equilibrium shifts.",
  "hint": "Stress response.",
  "weight": 0.35
},
{
  "id": "SET_A_0318",
  "set": "SET_A",
  "category": "Equilibrium",
  "question": "Increasing pressure favors side with fewer gas moles.",
  "option_up": "Side with more moles",
  "option_right": "No effect ever",
  "option_left": "Fewer gas moles",
  "correct_option": "option_left",
  "explanation": "Higher pressure favors fewer gas molecules.",
  "hint": "Mole count.",
  "weight": 0.37
},
{
  "id": "SET_A_0319",
  "set": "SET_A",
  "category": "Equilibrium",
  "question": "Adding a catalyst does not shift equilibrium position.",
  "option_up": "Shifts equilibrium",
  "option_right": "Changes K value",
  "option_left": "No shift in position",
  "correct_option": "option_left",
  "explanation": "Catalysts do not alter equilibrium position.",
  "hint": "Rate vs equilibrium.",
  "weight": 0.42
},
{
  "id": "SET_A_0320",
  "set": "SET_A",
  "category": "Equilibrium",
  "question": "Equilibrium constants are independent of initial concentrations.",
  "option_up": "Depend on starting amounts",
  "option_right": "Depend on catalyst",
  "option_left": "Independent of initial amounts",
  "correct_option": "option_left",
  "explanation": "K depends only on temperature.",
  "hint": "K property.",
  "weight": 0.39
},
{
  "id": "SET_A_0321",
  "set": "SET_A",
  "category": "Electrochemistry",
  "question": "Oxidation number represents electron bookkeeping.",
  "option_up": "Actual charge only",
  "option_right": "Mass number",
  "option_left": "Formal electron accounting",
  "correct_option": "option_left",
  "explanation": "Oxidation number tracks electrons formally.",
  "hint": "Electron count.",
  "weight": 0.33
},
{
  "id": "SET_A_0322",
  "set": "SET_A",
  "category": "Electrochemistry",
  "question": "Electronegativity measures tendency to attract electrons.",
  "option_up": "To lose electrons",
  "option_right": "To attract electrons",
  "option_left": "To gain protons",
  "correct_option": "option_right",
  "explanation": "Electronegativity reflects attraction for electrons.",
  "hint": "Electron pull.",
  "weight": 0.36
},
{
  "id": "SET_A_0323",
  "set": "SET_A",
  "category": "Electrochemistry",
  "question": "Standard hydrogen electrode has potential defined as zero.",
  "option_up": "Depends on conditions",
  "option_right": "Nonzero reference",
  "option_left": "Zero by definition",
  "correct_option": "option_left",
  "explanation": "SHE potential is defined as zero.",
  "hint": "Reference electrode.",
  "weight": 0.31
},
{
  "id": "SET_A_0324",
  "set": "SET_A",
  "category": "Electrochemistry",
  "question": "Increasing temperature generally decreases cell potential.",
  "option_up": "Always increases potential",
  "option_right": "Has no effect",
  "option_left": "Generally decreases potential",
  "correct_option": "option_left",
  "explanation": "Higher temperature often lowers cell potential.",
  "hint": "Temperature effect.",
  "weight": 0.38
},
{
  "id": "SET_A_0325",
  "set": "SET_A",
  "category": "Spectroscopy",
  "question": "Beer–Lambert law can fail at high concentrations.",
  "option_up": "Always holds",
  "option_right": "Only fails at low concentration",
  "option_left": "Deviates at high concentration",
  "correct_option": "option_left",
  "explanation": "High concentrations cause deviations.",
  "hint": "Linearity limits.",
  "weight": 0.34
},
{
  "id": "SET_A_0326",
  "set": "SET_A",
  "category": "Spectroscopy",
  "question": "Absorbance is directly proportional to path length.",
  "option_up": "Independent of path length",
  "option_right": "Inversely proportional",
  "option_left": "Directly proportional",
  "correct_option": "option_left",
  "explanation": "Absorbance increases linearly with path length.",
  "hint": "Path length.",
  "weight": 0.40
},
{
  "id": "SET_A_0327",
  "set": "SET_A",
  "category": "Spectroscopy",
  "question": "In NMR, shielding shifts resonance upfield.",
  "option_up": "Downfield shift",
  "option_right": "No shift",
  "option_left": "Upfield shift",
  "correct_option": "option_left",
  "explanation": "Shielding moves signals upfield.",
  "hint": "Shielding.",
  "weight": 0.35
},
{
  "id": "SET_A_0328",
  "set": "SET_A",
  "category": "Spectroscopy",
  "question": "Deshielded protons resonate downfield.",
  "option_up": "Upfield shift",
  "option_right": "No shift",
  "option_left": "Downfield shift",
  "correct_option": "option_left",
  "explanation": "Deshielding moves resonance downfield.",
  "hint": "Chemical shift.",
  "weight": 0.37
},
{
  "id": "SET_A_0329",
  "set": "SET_A",
  "category": "Mathematics for Chemists",
  "question": "A straight line has constant first derivative.",
  "option_up": "Variable derivative",
  "option_right": "Zero derivative always",
  "option_left": "Constant derivative",
  "correct_option": "option_left",
  "explanation": "Linear functions have constant first derivative.",
  "hint": "Derivative concept.",
  "weight": 0.42
},
{
  "id": "SET_A_0330",
  "set": "SET_A",
  "category": "Mathematics for Chemists",
  "question": "The integral of a constant is a linear function.",
  "option_up": "Quadratic function",
  "option_right": "Exponential function",
  "option_left": "Linear function",
  "correct_option": "option_left",
  "explanation": "Integrating a constant yields a linear function.",
  "hint": "Integration result.",
  "weight": 0.39
},
{
  "id": "SET_A_0331",
  "set": "SET_A",
  "category": "Environmental Chemistry",
  "question": "Acidic oxides form acids in water.",
  "option_up": "Form bases only",
  "option_right": "Do not react with water",
  "option_left": "Form acids",
  "correct_option": "option_left",
  "explanation": "Acidic oxides produce acids on hydration.",
  "hint": "Oxide type.",
  "weight": 0.33
},
{
  "id": "SET_A_0332",
  "set": "SET_A",
  "category": "Environmental Chemistry",
  "question": "Basic oxides neutralize acids.",
  "option_up": "Form acids",
  "option_right": "Have no reaction",
  "option_left": "Neutralize acids",
  "correct_option": "option_left",
  "explanation": "Basic oxides neutralize acidic substances.",
  "hint": "Acid–base.",
  "weight": 0.36
},
{
  "id": "SET_A_0333",
  "set": "SET_A",
  "category": "Environmental Chemistry",
  "question": "Carbon cycle involves exchange of carbon among Earth systems.",
  "option_up": "Only atmosphere",
  "option_right": "Only oceans",
  "option_left": "Multiple Earth systems",
  "correct_option": "option_left",
  "explanation": "Carbon cycles through atmosphere, biosphere, hydrosphere, and lithosphere.",
  "hint": "Earth systems.",
  "weight": 0.31
},
{
  "id": "SET_A_0334",
  "set": "SET_A",
  "category": "Biochemistry",
  "question": "Metabolic pathways consist of sequential enzyme-catalyzed steps.",
  "option_up": "Single-step reactions",
  "option_right": "Random reactions",
  "option_left": "Sequential enzyme steps",
  "correct_option": "option_left",
  "explanation": "Pathways involve ordered enzyme-catalyzed reactions.",
  "hint": "Pathway flow.",
  "weight": 0.38
},
{
  "id": "SET_A_0335",
  "set": "SET_A",
  "category": "Biochemistry",
  "question": "ATP acts as the primary energy currency of the cell.",
  "option_up": "Structural protein",
  "option_right": "Genetic material",
  "option_left": "Energy carrier",
  "correct_option": "option_left",
  "explanation": "ATP stores and transfers energy in cells.",
  "hint": "Energy currency.",
  "weight": 0.34
},
{
  "id": "SET_A_0336",
  "set": "SET_A",
  "category": "Biochemistry",
  "question": "Coenzymes assist enzymes by carrying chemical groups.",
  "option_up": "Replace enzymes",
  "option_right": "Act independently",
  "option_left": "Transfer groups or electrons",
  "correct_option": "option_left",
  "explanation": "Coenzymes shuttle groups or electrons during reactions.",
  "hint": "Helper molecules.",
  "weight": 0.40
},
{
  "id": "SET_A_0337",
  "set": "SET_A",
  "category": "Nuclear Chemistry",
  "question": "Radioisotopes are used in medical imaging.",
  "option_up": "Only in industry",
  "option_right": "Only in power generation",
  "option_left": "Medical diagnostics",
  "correct_option": "option_left",
  "explanation": "Radioisotopes help diagnose and image medical conditions.",
  "hint": "Imaging use.",
  "weight": 0.35
},
{
  "id": "SET_A_0338",
  "set": "SET_A",
  "category": "Nuclear Chemistry",
  "question": "Radioactive tracers follow biochemical pathways.",
  "option_up": "Destroy tissues",
  "option_right": "Have no application",
  "option_left": "Trace pathways",
  "correct_option": "option_left",
  "explanation": "Tracers help follow biochemical processes.",
  "hint": "Tracing.",
  "weight": 0.37
},
{
  "id": "SET_A_0339",
  "set": "SET_A",
  "category": "Materials Chemistry",
  "question": "Superconductors exhibit zero electrical resistance.",
  "option_up": "Very high resistance",
  "option_right": "Low but nonzero resistance",
  "option_left": "Zero resistance",
  "correct_option": "option_left",
  "explanation": "Superconductors conduct electricity with zero resistance.",
  "hint": "Zero resistance.",
  "weight": 0.42
},
{
  "id": "SET_A_0340",
  "set": "SET_A",
  "category": "Materials Chemistry",
  "question": "Superconductivity occurs below a critical temperature.",
  "option_up": "At any temperature",
  "option_right": "Only at high temperature",
  "option_left": "Below critical temperature",
  "correct_option": "option_left",
  "explanation": "Superconductivity appears below a critical temperature.",
  "hint": "Critical temperature.",
  "weight": 0.39
},
{
  "id": "SET_A_0341",
  "set": "SET_A",
  "category": "Polymers",
  "question": "Polymer degradation can occur due to heat or UV exposure.",
  "option_up": "Never degrades",
  "option_right": "Only mechanical stress",
  "option_left": "Heat or UV causes degradation",
  "correct_option": "option_left",
  "explanation": "Heat and UV radiation can break polymer chains.",
  "hint": "Degradation factors.",
  "weight": 0.33
},
{
  "id": "SET_A_0342",
  "set": "SET_A",
  "category": "Polymers",
  "question": "Biodegradable polymers break down via biological processes.",
  "option_up": "Never decompose",
  "option_right": "Only chemically degrade",
  "option_left": "Broken down biologically",
  "correct_option": "option_left",
  "explanation": "Biodegradable polymers decompose through biological action.",
  "hint": "Biodegradation.",
  "weight": 0.36
},
{
  "id": "SET_A_0343",
  "set": "SET_A",
  "category": "Surface Chemistry",
  "question": "Heterogeneous catalysis occurs at the surface.",
  "option_up": "In solution only",
  "option_right": "In gas phase only",
  "option_left": "At solid surface",
  "correct_option": "option_left",
  "explanation": "Heterogeneous catalysis occurs at solid surfaces.",
  "hint": "Catalyst phase.",
  "weight": 0.31
},
{
  "id": "SET_A_0344",
  "set": "SET_A",
  "category": "Surface Chemistry",
  "question": "Homogeneous catalysis involves same phase catalyst and reactants.",
  "option_up": "Different phases",
  "option_right": "Only solids",
  "option_left": "Same phase",
  "correct_option": "option_left",
  "explanation": "Homogeneous catalysis occurs in a single phase.",
  "hint": "Same phase.",
  "weight": 0.38
},
{
  "id": "SET_A_0345",
  "set": "SET_A",
  "category": "Colloids",
  "question": "A sol is a colloidal dispersion of solid in liquid.",
  "option_up": "Liquid in liquid",
  "option_right": "Gas in liquid",
  "option_left": "Solid in liquid",
  "correct_option": "option_left",
  "explanation": "Sols consist of solid particles dispersed in liquid.",
  "hint": "Sol type.",
  "weight": 0.34
},
{
  "id": "SET_A_0346",
  "set": "SET_A",
  "category": "Colloids",
  "question": "A gel is a semi-solid colloidal system.",
  "option_up": "Free-flowing liquid",
  "option_right": "Gas dispersion",
  "option_left": "Semi-solid network",
  "correct_option": "option_left",
  "explanation": "Gels form semi-solid networks.",
  "hint": "Gel nature.",
  "weight": 0.40
},
{
  "id": "SET_A_0347",
  "set": "SET_A",
  "category": "Electrochemistry",
  "question": "Electroplating deposits a metal layer using electric current.",
  "option_up": "Without electricity",
  "option_right": "By chemical reduction only",
  "option_left": "Using electric current",
  "correct_option": "option_left",
  "explanation": "Electric current drives metal deposition in electroplating.",
  "hint": "Metal coating.",
  "weight": 0.35
},
{
  "id": "SET_A_0348",
  "set": "SET_A",
  "category": "Electrochemistry",
  "question": "Corrosion involves oxidation of metals.",
  "option_up": "Reduction of metals",
  "option_right": "No electron transfer",
  "option_left": "Oxidation of metals",
  "correct_option": "option_left",
  "explanation": "Corrosion is an oxidation process of metals.",
  "hint": "Metal loss.",
  "weight": 0.37
},
{
  "id": "SET_A_0349",
  "set": "SET_A",
  "category": "Solutions",
  "question": "Buffer solutions resist changes in pH.",
  "option_up": "Cause rapid pH change",
  "option_right": "Have no effect on pH",
  "option_left": "Resist pH change",
  "correct_option": "option_left",
  "explanation": "Buffers resist changes in pH when small acids or bases are added.",
  "hint": "pH stability.",
  "weight": 0.42
},
{
  "id": "SET_A_0350",
  "set": "SET_A",
  "category": "Solutions",
  "question": "A buffer contains a weak acid and its conjugate base.",
  "option_up": "Strong acid only",
  "option_right": "Strong base only",
  "option_left": "Weak acid and conjugate base",
  "correct_option": "option_left",
  "explanation": "Buffers consist of a weak acid and its conjugate base.",
  "hint": "Buffer pair.",
  "weight": 0.39
}

];

let RAW_DATA = [...BACKUP_DATA], POOL=[], MISTAKES=[], SCORE=0, isTransitioning=false;
let MODE="DATASET_SELECT", CURRENT_DATASET="", CURRENT_TOPIC="", CURRENT_GENRE="";

// PHYSICS: 0.8cm Clamp (32px), 0.6cm Opacity (24px)
const CLAMP_DIST = 32;   
const OPACITY_DIST = 24; 

const formatChem = t => {
    if(!t) return "";
    return t.toString().replace(/([A-Z][a-z]?)(\d+)/g,'$1<sub>$2</sub>').replace(/(\d*)([+\-])/g, '<sup>$1$2</sup>').replace(/\|\|/g, '<br><br>');
};

async function init(){
    const l = document.getElementById('loader');
    
    // ATTEMPT CLOUD SYNC
    try {
        const r = await fetch(ENDPOINT);
        const json = await r.json();
        
        if(Array.isArray(json) && json.length > 0) { 
            console.log("Cloud sync successful.");
            RAW_DATA = json; 
        } else {
            console.warn("Cloud empty. Using backup.");
        }
    } catch(e) { 
        console.warn("Offline/Sync Fail. Using backup."); 
    }

    // AUTO-START SEQUENCE
    // Attempt to start Physical / Concept. 
    // If unavailable in data, find the first available topic.
    CURRENT_DATASET = "SET_A";
    let startSuccess = attemptAutoStart("Physical", "CONCEPT");
    
    if(!startSuccess) {
        // Fallback: Just grab the first question's metadata and start that
        const first = RAW_DATA[0];
        CURRENT_DATASET = first.dataset;
        attemptAutoStart(first.topic, first.q_type);
    }
    
    l.remove();
}

function attemptAutoStart(topic, genre){
    const cleanD = (CURRENT_DATASET||"").trim().toUpperCase();
    const cleanT = (topic||"").trim().toLowerCase();
    const cleanG = (genre||"").trim().toUpperCase();

    // Flexible matching: If dataset doesn't match, ignore it for backup data
    POOL = RAW_DATA.filter(q => {
        const d = (q.dataset||"").trim().toUpperCase();
        const t = (q.topic||"").trim().toLowerCase();
        const g = (q.q_type||"").trim().toUpperCase();
        return (d === cleanD || d === "") && t === cleanT && g === cleanG;
    }).sort(() => Math.random() - .5);
    
    if(POOL.length > 0) {
        CURRENT_TOPIC = topic;
        CURRENT_GENRE = genre;
        renderNext();
        return true;
    }
    return false;
}

function renderDatasetSelect(){
    MODE="DATASET_SELECT"; const s=document.getElementById('stack'); s.innerHTML="";
    const c=document.createElement('div'); c.className="card";
    c.innerHTML=`<div class="card-q">SELECT CURRICULUM</div>
        <div class="swipe-label sl-up">CORE CHEMISTRY</div><div class="swipe-label sl-left">INDUSTRIAL APPS</div>
        <div class="swipe-label sl-right">REVISION SET</div><div class="swipe-label sl-down">EXPERT CHALLENGE</div>`;
    s.appendChild(c); bindPhysics(c);
}

function renderTopicSelect(dataset){
    MODE="TOPIC_SELECT"; CURRENT_DATASET=dataset; const s=document.getElementById('stack'); s.innerHTML="";
    const c=document.createElement('div'); c.className="card";
    c.innerHTML=`<div class="card-q">CHOOSE DOMAIN</div>
        <div class="swipe-label sl-up">PHYSICAL</div><div class="swipe-label sl-left">ORGANIC</div>
        <div class="swipe-label sl-right">INORGANIC</div><div class="swipe-label sl-down">ANALYTICAL</div>`;
    s.appendChild(c); bindPhysics(c);
}

function renderGenreSelect(topic){
    MODE="GENRE_SELECT"; CURRENT_TOPIC=topic; const s=document.getElementById('stack'); s.innerHTML="";
    const c=document.createElement('div'); c.className="card";
    c.innerHTML=`<div class="card-q">SELECT DEPTH</div>
        <div class="swipe-label sl-up">CONCEPT MASTERY</div>
        <div class="swipe-label sl-down">APPLIED PROBLEMS</div>`;
    s.appendChild(c); bindPhysics(c);
}

function startQuiz(topic, genre){
    if(!attemptAutoStart(topic, genre)) {
        alert("No questions found.");
        renderDatasetSelect();
    }
}

function renderNext(){
    const s=document.getElementById('stack'); s.innerHTML="";
    if(!POOL.length){ renderEnd(); return; }
    MODE="QUIZ"; const q = POOL.shift();
    const c=document.createElement('div'); c.className="card";
    c.innerHTML=`<div class="card-q">${formatChem(q.question_text)}</div>
        <div class="swipe-label sl-up">${q.swipe_up_label}</div><div class="swipe-label sl-left">${q.swipe_left_label}</div>
        <div class="swipe-label sl-right">${q.swipe_right_label}</div><div class="swipe-label sl-down sl-down-hint">${formatChem(q.hint)}</div>
        <div class="overlay"><div class="overlay-label">LOGIC ANALYSIS</div><div class="overlay-body">${formatChem(q.explanation)}</div><button class="btn" onclick="this.parentElement.classList.remove('active')">CONTINUE</button></div>`;
    s.appendChild(c); bindPhysics(c, q);
}

function renderEnd(){
    MODE="SESSION_END"; const s=document.getElementById('stack'); s.innerHTML="";
    const c=document.createElement('div'); c.className="card";
    c.innerHTML=`<div class="card-q">SESSION COMPLETE<br><small>${SCORE} XP EARNED</small></div>
        <div class="swipe-label sl-up">RESTART</div><div class="swipe-label sl-down">MAIN MENU</div>`;
    s.appendChild(c); bindPhysics(c);
}

function bindPhysics(el, data){
    let x=0, y=0, sx=0, sy=0, active=false, triggerDir=null;
    const labels={up:el.querySelector('.sl-up'), dn:el.querySelector('.sl-down'), lt:el.querySelector('.sl-left'), rt:el.querySelector('.sl-right')};

    const start=e=>{ if(isTransitioning||(el.querySelector('.overlay')&&el.querySelector('.overlay').classList.contains('active')))return; active=true; const p=e.touches?e.touches[0]:e; sx=p.clientX; sy=p.clientY; el.style.transition="none"; };
    
    const move=e=>{
        if(!active)return; const p=e.touches?e.touches[0]:e;
        const rawDx = p.clientX - sx;
        const rawDy = p.clientY - sy;
        const rawDist = Math.sqrt(rawDx*rawDx + rawDy*rawDy);
        
        const opacity = Math.min(rawDist / OPACITY_DIST, 1);
        
        let clampedDx = rawDx;
        let clampedDy = rawDy;
        if(rawDist > CLAMP_DIST){
            const ratio = CLAMP_DIST / rawDist;
            clampedDx = rawDx * ratio;
            clampedDy = rawDy * ratio;
        }

        let ang = Math.atan2(-clampedDy, clampedDx)*(180/Math.PI); 
        if(ang<0) ang+=360;
        
        let activeLabel = null;
        Object.values(labels).forEach(l=>{if(l)l.style.opacity=0;});

        if(rawDist > 5){
            if(ang>=45&&ang<135) activeLabel=labels.up; 
            else if(ang>=135&&ang<225) activeLabel=labels.lt;
            else if(ang>=225&&ang<315) activeLabel=labels.dn; 
            else activeLabel=labels.rt;
        }

        if(activeLabel){
            activeLabel.style.opacity = opacity;
            activeLabel.style.transform = `scale(${0.85 + (opacity * 0.15)})`;
        }

        x = clampedDx; y = clampedDy;
        requestAnimationFrame(()=>{
            el.style.transform=`translate3d(${x}px,${y}px,0) rotate(${x/25}deg)`;
        });
        
        if(rawDist >= CLAMP_DIST) {
             triggerDir = (ang>=45&&ang<135)?"UP":(ang>=135&&ang<225)?"LEFT":(ang>=225&&ang<315)?"DOWN":"RIGHT";
        } else {
             triggerDir = null;
        }
    };
    
    const end=()=>{
        if(!active)return; active=false;
        
        if(triggerDir){
            if(MODE==="QUIZ" && triggerDir==="DOWN"){ 
                el.querySelector('.overlay').classList.add('active'); 
                el.style.transition="transform .3s"; 
                el.style.transform="translate3d(0,0,0) rotate(0deg)"; 
            }
            else {
                handleAction(el, data, x, y, triggerDir);
            }
        } else {
            el.style.transition="transform .2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"; 
            el.style.transform="translate3d(0,0,0) rotate(0deg)";
        }
        Object.values(labels).forEach(l=>{if(l)l.style.opacity=0;});
    };
    
    el.onmousedown=start; window.onmousemove=move; window.onmouseup=end; el.ontouchstart=start; el.ontouchmove=move; el.ontouchend=end;
}

function handleAction(el, data, x, y, dir){
    isTransitioning=true;
    if(MODE==="DATASET_SELECT"){ const map={UP:"SET_A", LEFT:"SET_B", RIGHT:"SET_C", DOWN:"SET_D"}; renderTopicSelect(map[dir]); }
    else if(MODE==="TOPIC_SELECT"){ const map={UP:"Physical", LEFT:"Organic", RIGHT:"Inorganic", DOWN:"Analytical"}; renderGenreSelect(map[dir]); }
    else if(MODE==="GENRE_SELECT"){ 
        if(dir==="UP") { startQuiz(CURRENT_TOPIC, "CONCEPT"); }
        else if(dir==="DOWN") { startQuiz(CURRENT_TOPIC, "APPLICATION"); }
        else { isTransitioning=false; return; }
        el.style.transition="transform .4s ease-in"; el.style.transform=`translate3d(${x*6}px,${y*6}px,0) rotate(${x/5}deg)`;
        setTimeout(()=>{el.remove(); isTransitioning=false;}, 400);
        return; 
    }
    else if(MODE==="QUIZ"){ 
        const w=parseInt(data.weight)||1;
        if(dir===data.correct.toUpperCase()){ SCORE+=(10*w); } 
        else { SCORE=Math.max(0, SCORE-5); MISTAKES.push(data); }
        renderNext();
    } else if(MODE==="SESSION_END"){ 
        if(dir==="UP") startQuiz(CURRENT_TOPIC, CURRENT_GENRE); 
        else if(dir==="DOWN") renderDatasetSelect();
        else { isTransitioning=false; return; }
    }
    el.style.transition="transform .4s ease-in"; el.style.transform=`translate3d(${x*6}px,${y*6}px,0) rotate(${x/5}deg)`;
    updateUI(); setTimeout(()=>{el.remove(); isTransitioning=false;}, 350);
}

function updateUI(){
    document.getElementById('xp-ui').innerText=`${SCORE} XP`;
    document.getElementById('progress-bar').style.width=`${(SCORE%100)}%`;
}
window.onload=init;
