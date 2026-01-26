/**
 * ALCHEMIST MASTER V80.3
 * Dataset: 85 Units | Physics: Pivot Engine | Logic: Unit Circle
 */

/* 1. THE 85-UNIT DATASET */
const RAW_DATA = [
  { "dataset": "SET_A", "topic": "Physical", "q_type": "CONCEPT", "question_text": "What does a negative ΔG value signify?", "hint": "Gibbs Energy.", "explanation": "✅ A negative ΔG indicates the reaction is spontaneous at the given temperature. || ❌ Positive ΔG means non-spontaneous.", "swipe_up_label": "Spontaneous", "swipe_right_label": "Equilibrium", "swipe_down_label": "HINT", "swipe_left_label": "Non-spontaneous", "correct": "UP", "weight": 1 },
  { "dataset": "SET_A", "topic": "Physical", "q_type": "APPLICATION", "question_text": "If a reaction rate doubles when T increases from 298 K to 308 K, effect on k?", "hint": "Arrhenius eq.", "explanation": "✅ k increases exponentially with temperature as more molecules exceed Ea.", "swipe_up_label": "k Increases", "swipe_right_label": "k is Constant", "swipe_down_label": "HINT", "swipe_left_label": "k Decreases", "correct": "UP", "weight": 2 },
  { "dataset": "SET_A", "topic": "Physical", "q_type": "CONCEPT", "question_text": "How does half-life change with concentration in a 1st order reaction?", "hint": "t1/2 = 0.693/k", "explanation": "✅ Independent of initial concentration.", "swipe_up_label": "Increases", "swipe_right_label": "Independent", "swipe_down_label": "HINT", "swipe_left_label": "Decreases", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_A", "topic": "Physical", "q_type": "APPLICATION", "question_text": "Calculate Eo cell for Zn2+/Zn and Cu2+/Cu.", "hint": "Cathode - Anode.", "explanation": "✅ 0.34 - (-0.76) = 1.10 V.", "swipe_up_label": "-0.42 V", "swipe_right_label": "1.10 V", "swipe_down_label": "HINT", "swipe_left_label": "0.42 V", "correct": "RIGHT", "weight": 2 },
  { "dataset": "SET_A", "topic": "Physical", "q_type": "CONCEPT", "question_text": "At equilibrium, relationship between forward and backward rates?", "hint": "Dynamic state.", "explanation": "✅ Rates are equal; no net concentration change.", "swipe_up_label": "Zero", "swipe_right_label": "Equal", "swipe_down_label": "HINT", "swipe_left_label": "Faster", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_A", "topic": "Physical", "q_type": "APPLICATION", "question_text": "What is the pH of a 0.001 M HCl solution?", "hint": "-log[H+].", "explanation": "✅ -log(10^-3) = 3.", "swipe_up_label": "pH 7", "swipe_right_label": "pH 3", "swipe_down_label": "HINT", "swipe_left_label": "pH 1", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_B", "topic": "Physical", "q_type": "CONCEPT", "question_text": "Why does a catalyst speed up a reaction?", "hint": "Alternative path.", "explanation": "✅ Lowers the Activation Energy (Ea).", "swipe_up_label": "Changes K", "swipe_right_label": "Lowers Ea", "swipe_down_label": "HINT", "swipe_left_label": "Enthalpy", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_B", "topic": "Physical", "q_type": "APPLICATION", "question_text": "Effect of high pressure on Haber process?", "hint": "Le Chatelier.", "explanation": "✅ Shifts right toward fewer gas moles.", "swipe_up_label": "Left", "swipe_right_label": "None", "swipe_down_label": "HINT", "swipe_left_label": "Right", "correct": "LEFT", "weight": 2 },
  { "dataset": "SET_B", "topic": "Physical", "q_type": "CONCEPT", "question_text": "What causes rusting of iron?", "hint": "Electrochemical.", "explanation": "✅ Needs both O2 and Moisture.", "swipe_up_label": "O2 and H2O", "swipe_right_label": "H2O only", "swipe_down_label": "HINT", "swipe_left_label": "N2 Gas", "correct": "UP", "weight": 1 },
  { "dataset": "SET_B", "topic": "Physical", "q_type": "APPLICATION", "question_text": "Product at anode during brine electrolysis?", "hint": "Oxidation.", "explanation": "✅ Cl- forms Cl2 gas.", "swipe_up_label": "H2 Gas", "swipe_right_label": "Cl2 Gas", "swipe_down_label": "HINT", "swipe_left_label": "Na Metal", "correct": "RIGHT", "weight": 2 },
  { "dataset": "SET_B", "topic": "Physical", "q_type": "CONCEPT", "question_text": "Why use Helium in diving tanks?", "hint": "Blood solubility.", "explanation": "✅ Prevents bends due to lower solubility.", "swipe_up_label": "Cheap", "swipe_right_label": "Low Solubility", "swipe_down_label": "HINT", "swipe_left_label": "Light", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_B", "topic": "Physical", "q_type": "APPLICATION", "question_text": "Amount of isotope after 4 half-lives?", "hint": "(1/2)^4.", "explanation": "✅ 6.25% remains.", "swipe_up_label": "12.5%", "swipe_right_label": "25%", "swipe_down_label": "HINT", "swipe_left_label": "6.25%", "correct": "LEFT", "weight": 2 },
  { "dataset": "SET_A", "topic": "Organic", "q_type": "CONCEPT", "question_text": "What defines a chiral carbon?", "hint": "Substituents.", "explanation": "✅ Bonded to four unique groups.", "swipe_up_label": "4 Groups", "swipe_right_label": "Symmetry", "swipe_down_label": "HINT", "swipe_left_label": "Doubles", "correct": "UP", "weight": 1 },
  { "dataset": "SET_A", "topic": "Organic", "q_type": "APPLICATION", "question_text": "Fastest SN2 alkyl halide?", "hint": "Sterics.", "explanation": "✅ Methyl is least hindered.", "swipe_up_label": "Tertiary", "swipe_right_label": "Secondary", "swipe_down_label": "HINT", "swipe_left_label": "Methyl", "correct": "LEFT", "weight": 2 },
  { "dataset": "SET_A", "topic": "Organic", "q_type": "CONCEPT", "question_text": "Intermediate in SN1 reaction?", "hint": "Two-step.", "explanation": "✅ Planar carbocation formed.", "swipe_up_label": "Carbanion", "swipe_right_label": "Radical", "swipe_down_label": "HINT", "swipe_left_label": "Carbocation", "correct": "LEFT", "weight": 1 },
  { "dataset": "SET_A", "topic": "Organic", "q_type": "APPLICATION", "question_text": "IUPAC of CH3CH2CH(CH3)2?", "hint": "Longest chain.", "explanation": "✅ 2-Methylbutane.", "swipe_up_label": "Pentane", "swipe_right_label": "Isopentane", "swipe_down_label": "HINT", "swipe_left_label": "2-Me-Butane", "correct": "LEFT", "weight": 2 },
  { "dataset": "SET_A", "topic": "Organic", "q_type": "CONCEPT", "question_text": "Hybridization in Ethene?", "hint": "Double bond.", "explanation": "✅ sp2 for trigonal planar.", "swipe_up_label": "sp", "swipe_right_label": "sp2", "swipe_down_label": "HINT", "swipe_left_label": "sp3", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_A", "topic": "Organic", "q_type": "APPLICATION", "question_text": "Markovnikov H-addition to propene?", "hint": "Stable cation.", "explanation": "✅ H adds to C1.", "swipe_up_label": "C3", "swipe_right_label": "C1", "swipe_down_label": "HINT", "swipe_left_label": "C2", "correct": "RIGHT", "weight": 2 },
  { "dataset": "SET_B", "topic": "Organic", "q_type": "CONCEPT", "question_text": "Polymer from tetrafluoroethene?", "hint": "Non-stick.", "explanation": "✅ Teflon (PTFE).", "swipe_up_label": "Nylon", "swipe_right_label": "Teflon", "swipe_down_label": "HINT", "swipe_left_label": "PVC", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_B", "topic": "Organic", "q_type": "APPLICATION", "question_text": "Products of saponification?", "hint": "Soap-making.", "explanation": "✅ Soap and Glycerol.", "swipe_up_label": "Soap+Glyc", "swipe_right_label": "Ester+H2O", "swipe_down_label": "HINT", "swipe_left_label": "Acid+Alc", "correct": "UP", "weight": 2 },
  { "dataset": "SET_B", "topic": "Organic", "q_type": "CONCEPT", "question_text": "Why are CFCs harmful?", "hint": "Ozone layer.", "explanation": "✅ Catalyze ozone depletion.", "swipe_up_label": "Smog", "swipe_right_label": "Ozone", "swipe_down_label": "HINT", "swipe_left_label": "Acid Rain", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_B", "topic": "Organic", "q_type": "APPLICATION", "question_text": "Aspirin synthesis group formed?", "hint": "Acid+Anhydride.", "explanation": "✅ Ester group.", "swipe_up_label": "Ether", "swipe_right_label": "Amide", "swipe_down_label": "HINT", "swipe_left_label": "Ester", "correct": "LEFT", "weight": 2 },
  { "dataset": "SET_B", "topic": "Organic", "q_type": "CONCEPT", "question_text": "High octane rating meaning?", "hint": "Engine knock.", "explanation": "✅ Resistance to knocking.", "swipe_up_label": "Energy", "swipe_right_label": "Knock Res", "swipe_down_label": "HINT", "swipe_left_label": "Burning", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_B", "topic": "Organic", "q_type": "APPLICATION", "question_text": "Catalyst for oil hydrogenation?", "hint": "Industry.", "explanation": "✅ Nickel.", "swipe_up_label": "Vanadium", "swipe_right_label": "Platinum", "swipe_down_label": "HINT", "swipe_left_label": "Nickel", "correct": "LEFT", "weight": 2 },
  { "dataset": "SET_A", "topic": "Inorganic", "q_type": "CONCEPT", "question_text": "Geometry of SF6?", "hint": "6 bond pairs.", "explanation": "✅ Octahedral.", "swipe_up_label": "Octahedral", "swipe_right_label": "Tetra", "swipe_down_label": "HINT", "swipe_left_label": "Sq Planar", "correct": "UP", "weight": 1 },
  { "dataset": "SET_A", "topic": "Inorganic", "q_type": "APPLICATION", "question_text": "Hybridization of P in PCl5?", "hint": "5 domains.", "explanation": "✅ sp3d.", "swipe_up_label": "sp3d", "swipe_right_label": "sp3", "swipe_down_label": "HINT", "swipe_left_label": "sp3d2", "correct": "UP", "weight": 2 },
  { "dataset": "SET_A", "topic": "Inorganic", "q_type": "CONCEPT", "question_text": "Why transition metal complexes color?", "hint": "d-orbitals.", "explanation": "✅ d-d transitions.", "swipe_up_label": "d-d Trans", "swipe_right_label": "s-p overlap", "swipe_down_label": "HINT", "swipe_left_label": "Mass", "correct": "UP", "weight": 1 },
  { "dataset": "SET_A", "topic": "Inorganic", "q_type": "APPLICATION", "question_text": "Mn oxidation in KMnO4?", "hint": "Sum = 0.", "explanation": "✅ +7.", "swipe_up_label": "+7", "swipe_right_label": "+2", "swipe_down_label": "HINT", "swipe_left_label": "+4", "correct": "UP", "weight": 2 },
  { "dataset": "SET_A", "topic": "Inorganic", "q_type": "CONCEPT", "question_text": "What is a strong-field ligand?", "hint": "Splitting size.", "explanation": "✅ Large d-splitting; low spin.", "swipe_up_label": "Low Spin", "swipe_right_label": "High Spin", "swipe_down_label": "HINT", "swipe_left_label": "Neutral", "correct": "UP", "weight": 1 },
  { "dataset": "SET_A", "topic": "Inorganic", "q_type": "APPLICATION", "question_text": "Paramagnetic ion?", "hint": "Unpaired e-.", "explanation": "✅ Fe3+ (d5).", "swipe_up_label": "Sc3+", "swipe_right_label": "Zn2+", "swipe_down_label": "HINT", "swipe_left_label": "Fe3+", "correct": "LEFT", "weight": 2 },
  { "dataset": "SET_B", "topic": "Inorganic", "q_type": "CONCEPT", "question_text": "Purpose of froth flotation?", "hint": "Sulfide ores.", "explanation": "✅ Ore concentration.", "swipe_up_label": "Refining", "swipe_right_label": "Concentration", "swipe_down_label": "HINT", "swipe_left_label": "Reduction", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_B", "topic": "Inorganic", "q_type": "APPLICATION", "question_text": "Blast furnace reducing agent?", "hint": "Iron extraction.", "explanation": "✅ Carbon Monoxide (CO).", "swipe_up_label": "CO2", "swipe_right_label": "CO", "swipe_down_label": "HINT", "swipe_left_label": "O2", "correct": "RIGHT", "weight": 2 },
  { "dataset": "SET_B", "topic": "Inorganic", "q_type": "CONCEPT", "question_text": "P in N-P-K fertilizer?", "hint": "Macronutrient.", "explanation": "✅ Phosphorus.", "swipe_up_label": "Lead", "swipe_right_label": "Phosphorus", "swipe_down_label": "HINT", "swipe_left_label": "Potash", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_B", "topic": "Inorganic", "q_type": "APPLICATION", "question_text": "How zeolites soften water?", "hint": "Exchange.", "explanation": "✅ Exchange Na+ for Ca/Mg.", "swipe_up_label": "Ion Ex", "swipe_right_label": "Filter", "swipe_down_label": "HINT", "swipe_left_label": "Precip", "correct": "UP", "weight": 2 },
  { "dataset": "SET_B", "topic": "Inorganic", "q_type": "CONCEPT", "question_text": "Stainless steel 2nd main component?", "hint": "Rust resistance.", "explanation": "✅ Chromium.", "swipe_up_label": "Chromium", "swipe_right_label": "Copper", "swipe_down_label": "HINT", "swipe_left_label": "Carbon", "correct": "UP", "weight": 1 },
  { "dataset": "SET_B", "topic": "Inorganic", "q_type": "APPLICATION", "question_text": "Why AgBr in photography?", "hint": "Light sensitivity.", "explanation": "✅ Decomposes on light exposure.", "swipe_up_label": "Develop", "swipe_right_label": "Sensitivity", "swipe_down_label": "HINT", "swipe_left_label": "Reflect", "correct": "RIGHT", "weight": 2 },
  { "dataset": "SET_A", "topic": "Analytical", "q_type": "CONCEPT", "question_text": "Reference in NMR?", "hint": "0.0 ppm.", "explanation": "✅ TMS.", "swipe_up_label": "TMS", "swipe_right_label": "Benzene", "swipe_down_label": "HINT", "swipe_left_label": "Water", "correct": "UP", "weight": 1 },
  { "dataset": "SET_A", "topic": "Analytical", "q_type": "APPLICATION", "question_text": "IR peak at 1710 cm-1?", "hint": "Strong/Sharp.", "explanation": "✅ Carbonyl (C=O).", "swipe_up_label": "Carbonyl", "swipe_right_label": "Alkane", "swipe_down_label": "HINT", "swipe_left_label": "Alcohol", "correct": "UP", "weight": 2 },
  { "dataset": "SET_A", "topic": "Analytical", "q_type": "CONCEPT", "question_text": "Molecular ion in MS?", "hint": "M+ peak.", "explanation": "✅ Intact mass minus 1 e-.", "swipe_up_label": "Mol Ion", "swipe_right_label": "Fragment", "swipe_down_label": "HINT", "swipe_left_label": "Base", "correct": "UP", "weight": 1 },
  { "dataset": "SET_A", "topic": "Analytical", "q_type": "APPLICATION", "question_text": "pH at equivalence HCl vs NaOH?", "hint": "Strong/Strong.", "explanation": "✅ pH 7.", "swipe_up_label": "pH 9", "swipe_right_label": "pH 7", "swipe_down_label": "HINT", "swipe_left_label": "pH 4", "correct": "RIGHT", "weight": 2 },
  { "dataset": "SET_A", "topic": "Analytical", "q_type": "CONCEPT", "question_text": "Beer-Lambert prop to?", "hint": "A = ecl.", "explanation": "✅ Concentration.", "swipe_up_label": "Volume", "swipe_right_label": "Concentration", "swipe_down_label": "HINT", "swipe_left_label": "Temp", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_B", "topic": "Analytical", "q_type": "CONCEPT", "question_text": "What BOD measures?", "hint": "Pollution.", "explanation": "✅ Oxygen for bacteria.", "swipe_up_label": "O2 Demand", "swipe_right_label": "CO2", "swipe_down_label": "HINT", "swipe_left_label": "Minerals", "correct": "UP", "weight": 1 },
  { "dataset": "SET_B", "topic": "Analytical", "q_type": "APPLICATION", "question_text": "Rf calculation chromatography?", "hint": "Ratio.", "explanation": "✅ Solute/Solvent distance.", "swipe_up_label": "Solute/Solv", "swipe_right_label": "Mass", "swipe_down_label": "HINT", "swipe_left_label": "Solv/Solute", "correct": "UP", "weight": 2 },
  { "dataset": "SET_B", "topic": "Analytical", "q_type": "CONCEPT", "question_text": "HPLC soft drink preservative?", "hint": "Antifungal.", "explanation": "✅ Sodium Benzoate.", "swipe_up_label": "Glucose", "swipe_right_label": "Na Benzoate", "swipe_down_label": "HINT", "swipe_left_label": "Salt", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_B", "topic": "Analytical", "q_type": "APPLICATION", "question_text": "Why soil pH test?", "hint": "Agriculture.", "explanation": "✅ Nutrient access.", "swipe_up_label": "Moisture", "swipe_right_label": "Nutrient", "swipe_down_label": "HINT", "swipe_left_label": "Density", "correct": "UP", "weight": 2 },
  { "dataset": "SET_B", "topic": "Analytical", "q_type": "CONCEPT", "question_text": "Spectro 'blank' purpose?", "hint": "Zeroing.", "explanation": "✅ Subtract solvent signal.", "swipe_up_label": "Zeroing", "swipe_right_label": "Color", "swipe_down_label": "HINT", "swipe_left_label": "Calib", "correct": "UP", "weight": 1 },
  { "dataset": "SET_A", "topic": "Mixed", "q_type": "CONCEPT", "question_text": "Favors SN2 over SN1?", "hint": "Substrate/Solvent.", "explanation": "✅ Primary + Aprotic.", "swipe_up_label": "Pri+Aprotic", "swipe_right_label": "Protic", "swipe_down_label": "HINT", "swipe_left_label": "Tertiary", "correct": "UP", "weight": 1 },
  { "dataset": "SET_A", "topic": "Mixed", "q_type": "APPLICATION", "question_text": "ΔH=-100kJ, ΔS=-200 J/K. Non-spont?", "hint": "ΔG=ΔH-TΔS.", "explanation": "✅ Above 500 K.", "swipe_up_label": "500 K", "swipe_right_label": "100 K", "swipe_down_label": "HINT", "swipe_left_label": "250 K", "correct": "UP", "weight": 2 },
  { "dataset": "SET_B", "topic": "Mixed", "q_type": "CONCEPT", "question_text": "Pool pH maintenance?", "hint": "Neutralize.", "explanation": "✅ Soda Ash.", "swipe_up_label": "Soda Ash", "swipe_right_label": "Salt", "swipe_down_label": "HINT", "swipe_left_label": "Acid", "correct": "UP", "weight": 1 },
  { "dataset": "SET_B", "topic": "Mixed", "q_type": "APPLICATION", "question_text": "Limestone in blast furnace?", "hint": "Flux.", "explanation": "✅ Slag formation.", "swipe_up_label": "Flux/Slag", "swipe_right_label": "Carbon", "swipe_down_label": "HINT", "swipe_left_label": "Reducer", "correct": "UP", "weight": 2 },
  { "dataset": "SET_D", "topic": "Physical", "q_type": "CONCEPT", "question_text": "Rate constant temp exponential?", "hint": "Arrhenius.", "explanation": "✅ More molecules exceed Ea.", "swipe_up_label": "Exceed Ea", "swipe_right_label": "Collision", "swipe_down_label": "HINT", "swipe_left_label": "Ea drops", "correct": "UP", "weight": 1 },
  { "dataset": "SET_D", "topic": "Physical", "q_type": "APPLICATION", "question_text": "ΔG at equilibrium?", "hint": "Condition.", "explanation": "✅ ΔG = 0.", "swipe_up_label": "<0", "swipe_right_label": ">0", "swipe_down_label": "HINT", "swipe_left_label": "=0", "correct": "LEFT", "weight": 1 },
  { "dataset": "SET_D", "topic": "Physical", "q_type": "CONCEPT", "question_text": "Entropy increase melting?", "hint": "Microstates.", "explanation": "✅ Molecular freedom.", "swipe_up_label": "Energy drop", "swipe_right_label": "Volume drop", "swipe_down_label": "HINT", "swipe_left_label": "Microstates", "correct": "LEFT", "weight": 1 },
  { "dataset": "SET_D", "topic": "Physical", "q_type": "APPLICATION", "question_text": "K vs Catalyst?", "hint": "Kinetics/Thermo.", "explanation": "✅ Lowers Ea equally both ways.", "swipe_up_label": "Kinetics only", "swipe_right_label": "Changes H", "swipe_down_label": "HINT", "swipe_left_label": "Stable prod", "correct": "UP", "weight": 2 },
  { "dataset": "SET_D", "topic": "Physical", "q_type": "CONCEPT", "question_text": "Pressure vs Gas Moles?", "hint": "Le Chatelier.", "explanation": "✅ Shift to minimize stress.", "swipe_up_label": "Vol up", "swipe_right_label": "Min stress", "swipe_down_label": "HINT", "swipe_left_label": "Faster", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_D", "topic": "Organic", "q_type": "CONCEPT", "question_text": "Tertiary carbocation speed?", "hint": "Stability.", "explanation": "✅ Hyperconjugation stabilization.", "swipe_up_label": "Stability", "swipe_right_label": "Mass", "swipe_down_label": "HINT", "swipe_left_label": "Sterics", "correct": "UP", "weight": 1 },
  { "dataset": "SET_D", "topic": "Organic", "q_type": "APPLICATION", "question_text": "SN2 tertiary centers?", "hint": "Backside.", "explanation": "✅ Steric hindrance block.", "swipe_up_label": "Instability", "swipe_right_label": "Weak Nuc", "swipe_down_label": "HINT", "swipe_left_label": "Steric Block", "correct": "LEFT", "weight": 2 },
  { "dataset": "SET_D", "topic": "Organic", "q_type": "CONCEPT", "question_text": "Aldehyde vs Ketone react?", "hint": "Sterics/Elec.", "explanation": "✅ Less hindrance in aldehydes.", "swipe_up_label": "Strong C=O", "swipe_right_label": "Resonance", "swipe_down_label": "HINT", "swipe_left_label": "Less Steric", "correct": "LEFT", "weight": 1 },
  { "dataset": "SET_D", "topic": "Organic", "q_type": "APPLICATION", "question_text": "Conjugation UV-Vis energy?", "hint": "Gap.", "explanation": "✅ Decreases HOMO-LUMO gap.", "swipe_up_label": "Bond order", "swipe_right_label": "Lower Gap", "swipe_down_label": "HINT", "swipe_left_label": "Mass", "correct": "RIGHT", "weight": 2 },
  { "dataset": "SET_D", "topic": "Organic", "q_type": "CONCEPT", "question_text": "Phenol acid vs Alcohol?", "hint": "Base.", "explanation": "✅ Resonance phenoxide.", "swipe_up_label": "Resonance", "swipe_right_label": "Mass", "swipe_down_label": "HINT", "swipe_left_label": "H-Bond", "correct": "UP", "weight": 1 },
  { "dataset": "SET_D", "topic": "Inorganic", "q_type": "CONCEPT", "question_text": "Transition metal var ox state?", "hint": "Orbital energy.", "explanation": "✅ ns and d comparable.", "swipe_up_label": "Energy Match", "swipe_right_label": "High EN", "swipe_down_label": "HINT", "swipe_left_label": "Radius", "correct": "UP", "weight": 1 },
  { "dataset": "SET_D", "topic": "Inorganic", "q_type": "APPLICATION", "question_text": "Strong-field low-spin?", "hint": "Splitting.", "explanation": "✅ Large Delta favors pairing.", "swipe_up_label": "Large Delta", "swipe_right_label": "Coord", "swipe_down_label": "HINT", "swipe_left_label": "Weak bond", "correct": "UP", "weight": 2 },
  { "dataset": "SET_D", "topic": "Inorganic", "q_type": "CONCEPT", "question_text": "Zn2+ diamagnetic?", "hint": "Config.", "explanation": "✅ Filled d10.", "swipe_up_label": "All paired", "swipe_right_label": "Oxidat", "swipe_down_label": "HINT", "swipe_left_label": "Strong field", "correct": "UP", "weight": 1 },
  { "dataset": "SET_D", "topic": "Inorganic", "q_type": "APPLICATION", "question_text": "BF3 Lewis acid?", "hint": "Vacancy.", "explanation": "✅ Incomplete octet.", "swipe_up_label": "High EN", "swipe_right_label": "Bond Pol", "swipe_down_label": "HINT", "swipe_left_label": "Inc Octet", "correct": "LEFT", "weight": 2 },
  { "dataset": "SET_D", "topic": "Inorganic", "q_type": "CONCEPT", "question_text": "Lattice energy vs Charge?", "hint": "Coulomb.", "explanation": "✅ Attraction increases with charge.", "swipe_up_label": "Large size", "swipe_right_label": "Covalent", "swipe_down_label": "HINT", "swipe_left_label": "Attraction", "correct": "LEFT", "weight": 1 },
  { "dataset": "SET_C", "topic": "Analytical", "q_type": "CONCEPT", "question_text": "n+1 vs spin I?", "hint": "General formula.", "explanation": "✅ 2nI + 1.", "swipe_up_label": "n+1", "swipe_right_label": "2nI+1", "swipe_down_label": "HINT", "swipe_left_label": "nI+1", "correct": "RIGHT", "weight": 2 },
  { "dataset": "SET_C", "topic": "Analytical", "q_type": "CONCEPT", "question_text": "Aldehyde proton NMR shift?", "hint": "Anisotropy.", "explanation": "✅ Deshielding by C=O.", "swipe_up_label": "H-bond", "swipe_right_label": "Shield", "swipe_down_label": "HINT", "swipe_left_label": "C=O Anis", "correct": "LEFT", "weight": 1 },
  { "dataset": "SET_C", "topic": "Analytical", "q_type": "APPLICATION", "question_text": "C=O freq conjugation?", "hint": "Order.", "explanation": "✅ Reduced bond order.", "swipe_up_label": "Red Order", "swipe_right_label": "Dipole", "swipe_down_label": "HINT", "swipe_left_label": "Steric", "correct": "UP", "weight": 1 },
  { "dataset": "SET_C", "topic": "Analytical", "q_type": "CONCEPT", "question_text": "Homonuclear diatomic IR?", "hint": "Dipole.", "explanation": "✅ No dipole change.", "swipe_up_label": "Bond strength", "swipe_right_label": "No Dipole", "swipe_down_label": "HINT", "swipe_left_label": "Symm", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_C", "topic": "Analytical", "q_type": "APPLICATION", "question_text": "MS 3:1 M/M+2 ratio?", "hint": "Chlorine.", "explanation": "✅ Characteristic isotope pattern.", "swipe_up_label": "Bromine", "swipe_right_label": "Sulfur", "swipe_down_label": "HINT", "swipe_left_label": "Chlorine", "correct": "LEFT", "weight": 2 },
  { "dataset": "SET_C", "topic": "Analytical", "q_type": "CONCEPT", "question_text": "Mass spec base peak?", "hint": "Relative.", "explanation": "✅ Most stable fragment.", "swipe_up_label": "Mol Ion", "swipe_right_label": "Most stable", "swipe_down_label": "HINT", "swipe_left_label": "High m/z", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_C", "topic": "Analytical", "q_type": "APPLICATION", "question_text": "Weak acid titration equivalence pH?", "hint": "Hydrolysis.", "explanation": "✅ Conjugate base hydrolyzes.", "swipe_up_label": "Hydrolysis", "swipe_right_label": "Precip", "swipe_down_label": "HINT", "swipe_left_label": "Error", "correct": "UP", "weight": 2 },
  { "dataset": "SET_C", "topic": "Analytical", "q_type": "CONCEPT", "question_text": "Van Deemter high velocity term?", "hint": "Flow.", "explanation": "✅ C term (Mass transfer).", "swipe_up_label": "C term", "swipe_right_label": "A term", "swipe_down_label": "HINT", "swipe_left_label": "B term", "correct": "UP", "weight": 2 },
  { "dataset": "SET_C", "topic": "Analytical", "q_type": "APPLICATION", "question_text": "Larmor frequency NMR?", "hint": "Magnetic.", "explanation": "✅ Gamma and B0.", "swipe_up_label": "Electron", "swipe_right_label": "Temp", "swipe_down_label": "HINT", "swipe_left_label": "Gamma/B0", "correct": "LEFT", "weight": 2 },
  { "dataset": "SET_C", "topic": "Analytical", "q_type": "APPLICATION", "question_text": "Faraday plating thickness?", "hint": "Charge-mass.", "explanation": "✅ Charge to moles.", "swipe_up_label": "V/R", "swipe_right_label": "Charge/Mol", "swipe_down_label": "HINT", "swipe_left_label": "pH", "correct": "RIGHT", "weight": 2 },
  { "dataset": "SET_E", "topic": "Organic", "q_type": "CONCEPT", "question_text": "Chair vs Boat cyclohexane?", "hint": "Strain.", "explanation": "✅ Chair minimizes torsional strain.", "swipe_up_label": "Min Strain", "swipe_right_label": "Mass", "swipe_down_label": "HINT", "swipe_left_label": "Entropy", "correct": "UP", "weight": 3 },
  { "dataset": "SET_E", "topic": "Physical", "q_type": "CONCEPT", "question_text": "Schrodinger eq meaning?", "hint": "Probability.", "explanation": "✅ System quantum state change.", "swipe_up_label": "Wave func", "swipe_right_label": "Exact orbit", "swipe_down_label": "HINT", "swipe_left_label": "Energy", "correct": "UP", "weight": 3 },
  { "dataset": "SET_E", "topic": "Inorganic", "q_type": "CONCEPT", "question_text": "Jahn-Teller effect?", "hint": "Degeneracy.", "explanation": "✅ Geometrical distortion.", "swipe_up_label": "Splitting", "swipe_right_label": "Distortion", "swipe_down_label": "HINT", "swipe_left_label": "Bonding", "correct": "RIGHT", "weight": 3 },
  { "dataset": "SET_E", "topic": "Analytical", "q_type": "APPLICATION", "question_text": "Internal standard Chromatography?", "hint": "Injection.", "explanation": "✅ Compensate prep/inject error.", "swipe_up_label": "Errors", "swipe_right_label": "Overlap", "swipe_down_label": "HINT", "swipe_left_label": "Mobile", "correct": "UP", "weight": 3 },
  { "dataset": "SET_E", "topic": "Organic", "q_type": "APPLICATION", "question_text": "Hoffmann Bromamide product?", "hint": "Amine.", "explanation": "✅ 1o Amine minus 1 Carbon.", "swipe_up_label": "Amine", "swipe_right_label": "Nitrile", "swipe_down_label": "HINT", "swipe_left_label": "Acid", "correct": "UP", "weight": 3 },
  { "dataset": "SET_E", "topic": "Inorganic", "q_type": "APPLICATION", "question_text": "Ground state d2 term symbol?", "hint": "Hunds.", "explanation": "✅ 3F.", "swipe_up_label": "1D", "swipe_right_label": "3F", "swipe_down_label": "HINT", "swipe_left_label": "3P", "correct": "RIGHT", "weight": 3 },
  { "dataset": "SET_E", "topic": "Analytical", "q_type": "CONCEPT", "question_text": "Resolution (Rs) Chromatography?", "hint": "Separation.", "explanation": "✅ Peak separation measure.", "swipe_up_label": "Separation", "swipe_right_label": "Width", "swipe_down_label": "HINT", "swipe_left_label": "Flow", "correct": "UP", "weight": 3 },
  { "dataset": "SET_A", "topic": "Mixed", "q_type": "CONCEPT", "question_text": "Acid strength Trichloro vs Acetic?", "hint": "Inductive.", "explanation": "✅ Trichloro much stronger.", "swipe_up_label": "Acetic", "swipe_right_label": "Trichloro", "swipe_down_label": "HINT", "swipe_left_label": "Equal", "correct": "RIGHT", "weight": 1 },
  { "dataset": "SET_B", "topic": "Mixed", "q_type": "APPLICATION", "question_text": "Bicarb + Ethanoic gas?", "hint": "Carbonate.", "explanation": "✅ CO2 gas.", "swipe_up_label": "Oxygen", "swipe_right_label": "CO2", "swipe_down_label": "HINT", "swipe_left_label": "H2", "correct": "RIGHT", "weight": 2 },
  { "dataset": "SET_C", "topic": "Mixed", "q_type": "CONCEPT", "question_text": "Zeolite petrochemical role?", "hint": "Cracking.", "explanation": "✅ Shape selective catalyst.", "swipe_up_label": "Pore size", "swipe_right_label": "Stability", "swipe_down_label": "HINT", "swipe_left_label": "Filter", "correct": "UP", "weight": 2 }
];

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
