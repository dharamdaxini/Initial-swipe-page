// questions.js - V88.1 (Randomized Answers)

const QUESTIONS_DATA = [
  // --- SET A (CORE) ---
  {
    "dataset": "SET_A", "topic": "Physical", "q_type": "CONCEPT", "weight": 1,
    "question_text": "SI unit of enthalpy?",
    "hint": "💡 Energy per mole.",
    "explanation": "✅ kJ·mol⁻¹ is correct. ❌ J/K is Entropy. ❌ eV is non-SI.",
    "swipe_up_label": "J·K⁻¹", 
    "swipe_right_label": "kJ·mol⁻¹", // Correct
    "swipe_down_label": "HINT", 
    "swipe_left_label": "eV", 
    "correct": "RIGHT"
  },
  {
    "dataset": "SET_A", "topic": "Organic", "q_type": "CONCEPT", "weight": 1,
    "question_text": "Bond type in alkanes?",
    "hint": "💡 Single bonds only.",
    "explanation": "✅ Sigma (σ) bonds are single bonds. ❌ Pi (π) bonds require double/triple.",
    "swipe_up_label": "Sigma (σ)", // Correct
    "swipe_right_label": "Pi (π)", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "H-bond", 
    "correct": "UP"
  },
  {
    "dataset": "SET_A", "topic": "Inorganic", "q_type": "CONCEPT", "weight": 1,
    "question_text": "Common oxidation state of Na?",
    "hint": "💡 Alkali metal (Group 1).",
    "explanation": "✅ +1 is correct. ❌ +2 is Alkaline Earth. ❌ 0 is elemental.",
    "swipe_up_label": "+2", 
    "swipe_right_label": "0", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "+1", // Correct
    "correct": "LEFT"
  },
  {
    "dataset": "SET_A", "topic": "Analytical", "q_type": "CONCEPT", "weight": 1,
    "question_text": "pH range of acids?",
    "hint": "💡 Below neutral.",
    "explanation": "✅ pH < 7 is acidic. ❌ pH = 7 is neutral. ❌ pH > 7 is basic.",
    "swipe_up_label": "pH < 7", // Correct
    "swipe_right_label": "pH > 7", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "pH = 7", 
    "correct": "UP"
  },
  {
    "dataset": "SET_A", "topic": "Physical", "q_type": "CONCEPT", "weight": 1,
    "question_text": "Isothermal process keeps?",
    "hint": "💡 Thermal = Temperature.",
    "explanation": "✅ Temperature remains constant. ❌ Pressure/Volume can change.",
    "swipe_up_label": "Pressure", 
    "swipe_right_label": "Temperature", // Correct
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Volume", 
    "correct": "RIGHT"
  },
  {
    "dataset": "SET_A", "topic": "Organic", "q_type": "CONCEPT", "weight": 1,
    "question_text": "Functional group of alcohol?",
    "hint": "💡 Hydroxyl group.",
    "explanation": "✅ -OH is alcohol. ❌ -COOH is Acid. ❌ -CHO is Aldehyde.",
    "swipe_up_label": "-COOH", 
    "swipe_right_label": "-CHO", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "-OH", // Correct
    "correct": "LEFT"
  },
  {
    "dataset": "SET_A", "topic": "Inorganic", "q_type": "CONCEPT", "weight": 1,
    "question_text": "Color of CuSO4·5H2O?",
    "hint": "💡 Blue Vitriol.",
    "explanation": "✅ Blue due to hydrated Cu²⁺. ❌ Green is incorrect. ❌ White is anhydrous.",
    "swipe_up_label": "Green", 
    "swipe_right_label": "Blue", // Correct
    "swipe_down_label": "HINT", 
    "swipe_left_label": "White", 
    "correct": "RIGHT"
  },
  {
    "dataset": "SET_A", "topic": "Analytical", "q_type": "CONCEPT", "weight": 1,
    "question_text": "End point in titration means?",
    "hint": "💡 Visual change.",
    "explanation": "✅ Color change indicates completion. ❌ Equivalence is theoretical.",
    "swipe_up_label": "Completion", // Correct
    "swipe_right_label": "Start", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Excess", 
    "correct": "UP"
  },

  // --- SET B (INDUSTRIAL) ---
  {
    "dataset": "SET_B", "topic": "Physical", "q_type": "APPLICATION", "weight": 2,
    "question_text": "Gas expands on heating due to?",
    "hint": "💡 Molecular motion.",
    "explanation": "✅ Kinetic Energy increases. ❌ Mass does not change.",
    "swipe_up_label": "Mass", 
    "swipe_right_label": "High KE", // Correct
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Collisions", 
    "correct": "RIGHT"
  },
  {
    "dataset": "SET_B", "topic": "Organic", "q_type": "APPLICATION", "weight": 2,
    "question_text": "Test for alkene?",
    "hint": "💡 Unsaturation test.",
    "explanation": "✅ Bromine Water decolorizes. ❌ Tollens tests aldehydes.",
    "swipe_up_label": "Tollens", 
    "swipe_right_label": "Fehling", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Br2 Water", // Correct
    "correct": "LEFT"
  },
  {
    "dataset": "SET_B", "topic": "Inorganic", "q_type": "APPLICATION", "weight": 2,
    "question_text": "Metal used for galvanization?",
    "hint": "💡 Sacrificial anode.",
    "explanation": "✅ Zinc protects Iron. ❌ Copper accelerates rust.",
    "swipe_up_label": "Iron", 
    "swipe_right_label": "Zinc", // Correct
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Copper", 
    "correct": "RIGHT"
  },
  {
    "dataset": "SET_B", "topic": "Analytical", "q_type": "APPLICATION", "weight": 2,
    "question_text": "Method to separate dyes?",
    "hint": "💡 Color writing.",
    "explanation": "✅ Chromatography separates dyes. ❌ Filtration cannot.",
    "swipe_up_label": "Chromatography", // Correct
    "swipe_right_label": "Filtration", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Distillation", 
    "correct": "UP"
  },
  {
    "dataset": "SET_B", "topic": "Physical", "q_type": "APPLICATION", "weight": 2,
    "question_text": "Work done in free expansion?",
    "hint": "💡 Vacuum expansion.",
    "explanation": "✅ Zero. P_ext is 0, so W = 0.",
    "swipe_up_label": "Positive", 
    "swipe_right_label": "Negative", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Zero", // Correct
    "correct": "LEFT"
  },
  {
    "dataset": "SET_B", "topic": "Organic", "q_type": "APPLICATION", "weight": 2,
    "question_text": "Product of ester hydrolysis?",
    "hint": "💡 Splitting with water.",
    "explanation": "✅ Acid + Alcohol. ❌ Ether/Alkene are incorrect.",
    "swipe_up_label": "Ether", 
    "swipe_right_label": "Acid+Alc", // Correct
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Alkene", 
    "correct": "RIGHT"
  },
  {
    "dataset": "SET_B", "topic": "Inorganic", "q_type": "APPLICATION", "weight": 2,
    "question_text": "Temporary hardness caused by?",
    "hint": "💡 Soluble salts.",
    "explanation": "✅ Bicarbonates. ❌ Sulfates/Chlorides cause permanent hardness.",
    "swipe_up_label": "Sulfate", 
    "swipe_right_label": "Chloride", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Bicarbonate", // Correct
    "correct": "LEFT"
  },
  {
    "dataset": "SET_B", "topic": "Analytical", "q_type": "APPLICATION", "weight": 2,
    "question_text": "Glass electrode measures?",
    "hint": "💡 Ion activity.",
    "explanation": "✅ pH (H+ activity). ❌ Mass/Conductivity are incorrect.",
    "swipe_up_label": "Mass", 
    "swipe_right_label": "pH", // Correct
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Conductivity", 
    "correct": "RIGHT"
  },

  // --- SET C (REVISION) ---
  {
    "dataset": "SET_C", "topic": "Physical", "q_type": "CONCEPT", "weight": 2,
    "question_text": "Order equals molecularity in?",
    "hint": "💡 Single step reaction.",
    "explanation": "✅ Elementary reactions. ❌ Complex reactions differ.",
    "swipe_up_label": "Complex", 
    "swipe_right_label": "Elementary", // Correct
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Chain", 
    "correct": "RIGHT"
  },
  {
    "dataset": "SET_C", "topic": "Organic", "q_type": "CONCEPT", "weight": 2,
    "question_text": "Reagent for nitration?",
    "hint": "💡 Nitrating mixture.",
    "explanation": "✅ Conc. HNO3 + H2SO4 creates NO2+.",
    "swipe_up_label": "HNO3+H2SO4", // Correct
    "swipe_right_label": "HCl+HNO3", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "H2SO4", 
    "correct": "UP"
  },
  {
    "dataset": "SET_C", "topic": "Inorganic", "q_type": "CONCEPT", "weight": 2,
    "question_text": "Strong field ligand?",
    "hint": "💡 Causes pairing.",
    "explanation": "✅ CN- is strong. ❌ F- and Cl- are weak.",
    "swipe_up_label": "F-", 
    "swipe_right_label": "Cl-", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "CN-", // Correct
    "correct": "LEFT"
  },
  {
    "dataset": "SET_C", "topic": "Analytical", "q_type": "CONCEPT", "weight": 2,
    "question_text": "Primary standard must be?",
    "hint": "💡 Stable & Pure.",
    "explanation": "✅ Pure & Stable. ❌ Volatile/Hygroscopic are unstable.",
    "swipe_up_label": "Hygroscopic", 
    "swipe_right_label": "Pure", // Correct
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Volatile", 
    "correct": "RIGHT"
  },
  {
    "dataset": "SET_C", "topic": "Physical", "q_type": "CONCEPT", "weight": 2,
    "question_text": "Entropy change sign for melting?",
    "hint": "💡 Solid -> Liquid.",
    "explanation": "✅ Positive (ΔS > 0). Disorder increases.",
    "swipe_up_label": "Negative", 
    "swipe_right_label": "Zero", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Positive", // Correct
    "correct": "LEFT"
  },
  {
    "dataset": "SET_C", "topic": "Organic", "q_type": "CONCEPT", "weight": 2,
    "question_text": "Type of isomerism in glucose?",
    "hint": "💡 Mirror images.",
    "explanation": "✅ Optical Isomerism (D/L forms).",
    "swipe_up_label": "Optical", // Correct
    "swipe_right_label": "Position", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Chain", 
    "correct": "UP"
  },
  {
    "dataset": "SET_C", "topic": "Inorganic", "q_type": "CONCEPT", "weight": 2,
    "question_text": "Coordination no. of Fe in [Fe(CN)6]³⁻?",
    "hint": "💡 Count the ligands.",
    "explanation": "✅ 6. There are 6 Cyanide ligands.",
    "swipe_up_label": "4", 
    "swipe_right_label": "6", // Correct
    "swipe_down_label": "HINT", 
    "swipe_left_label": "2", 
    "correct": "RIGHT"
  },
  {
    "dataset": "SET_C", "topic": "Analytical", "q_type": "CONCEPT", "weight": 2,
    "question_text": "LOD means?",
    "hint": "💡 Sensitivity limit.",
    "explanation": "✅ Limit of Detection. Lowest reliable quantity.",
    "swipe_up_label": "Max Limit", 
    "swipe_right_label": "Average", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Limit Detect", // Correct
    "correct": "LEFT"
  },

  // --- SET D (EXPERT) ---
  {
    "dataset": "SET_D", "topic": "Physical", "q_type": "APPLICATION", "weight": 3,
    "question_text": "ΔH < 0 indicates?",
    "hint": "💡 Heat release.",
    "explanation": "✅ Exothermic. Heat is released.",
    "swipe_up_label": "Endothermic", 
    "swipe_right_label": "Adiabatic", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Exothermic", // Correct
    "correct": "LEFT"
  },
  {
    "dataset": "SET_D", "topic": "Organic", "q_type": "APPLICATION", "weight": 3,
    "question_text": "SN1 favored by?",
    "hint": "💡 Carbocation stability.",
    "explanation": "✅ Tertiary Substrates form stable carbocations.",
    "swipe_up_label": "Primary", 
    "swipe_right_label": "Tertiary", // Correct
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Methyl", 
    "correct": "RIGHT"
  },
  {
    "dataset": "SET_D", "topic": "Inorganic", "q_type": "APPLICATION", "weight": 3,
    "question_text": "Why transition metals colored?",
    "hint": "💡 Electron jumps.",
    "explanation": "✅ d-d Transitions absorb specific wavelengths.",
    "swipe_up_label": "d-d trans", // Correct
    "swipe_right_label": "Mass", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Charge", 
    "correct": "UP"
  },
  {
    "dataset": "SET_D", "topic": "Analytical", "q_type": "APPLICATION", "weight": 3,
    "question_text": "Best method for ppm analysis?",
    "hint": "💡 Trace amounts.",
    "explanation": "✅ Spectrophotometry is sensitive to trace amounts.",
    "swipe_up_label": "Gravimetry", 
    "swipe_right_label": "Spectro", // Correct
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Volumetry", 
    "correct": "RIGHT"
  },
  {
    "dataset": "SET_D", "topic": "Physical", "q_type": "APPLICATION", "weight": 3,
    "question_text": "Max efficiency limited by?",
    "hint": "💡 Ideal engine.",
    "explanation": "✅ Carnot Theorem (Second Law).",
    "swipe_up_label": "First Law", 
    "swipe_right_label": "Zeroth Law", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Carnot", // Correct
    "correct": "LEFT"
  },
  {
    "dataset": "SET_D", "topic": "Organic", "q_type": "APPLICATION", "weight": 3,
    "question_text": "Product of Ozonolysis (Zn/H2O)?",
    "hint": "💡 Cleaves C=C.",
    "explanation": "✅ Carbonyls (Ald/Ketone). Double bond breaks.",
    "swipe_up_label": "Ald/Ketone", // Correct
    "swipe_right_label": "Alcohols", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Alkanes", 
    "correct": "UP"
  },
  {
    "dataset": "SET_D", "topic": "Inorganic", "q_type": "APPLICATION", "weight": 3,
    "question_text": "Inert pair effect seen in?",
    "hint": "💡 Bottom of Group.",
    "explanation": "✅ Heavy p-block (Lead). s-electrons stable.",
    "swipe_up_label": "Nitrogen", 
    "swipe_right_label": "Lead (Pb)", // Correct
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Carbon", 
    "correct": "RIGHT"
  },
  {
    "dataset": "SET_D", "topic": "Analytical", "q_type": "APPLICATION", "weight": 3,
    "question_text": "Why use Internal Standard?",
    "hint": "💡 Correction factor.",
    "explanation": "✅ Compensates for instrument errors.",
    "swipe_up_label": "Noise", 
    "swipe_right_label": "Impurity", 
    "swipe_down_label": "HINT", 
    "swipe_left_label": "Correction", // Correct
    "correct": "LEFT"
  }
];
