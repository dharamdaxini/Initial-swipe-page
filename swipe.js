[
  {
    "question_id": "ORG-SYN-001",
    "topic": "Advanced Organic Synthesis",
    "subtopic": "Solvent/Catalyst Misfit",
    "difficulty": "Hard",
    "question": "Synthesis of an ether via $S_N2$ displacement on a secondary alkyl halide is attempted. Which set of conditions ensures the highest yield of the substitution product over elimination?",
    "options": {
      "1": "Sodium ethoxide ($NaOEt$) in Ethanol ($EtOH$) at $25^\\circ C$",
      "2": "Sodium ethoxide ($NaOEt$) in Hexane at $0^\\circ C$",
      "3": "Sodium hydride ($NaH$) to form the alkoxide, then reaction in $DMF$ at $0^\\circ C$"
    },
    "correct_vector": 3,
    "pivot_explanation": "Secondary halides are highly sensitive to the base/nucleophile strength ratio. While ethoxide in ethanol is the textbook 'Williamson' setup, the protic solvent and basicity of ethoxide promote E2 pathways. Hexane prevents the salt from dissolving, stalling the reaction entirely. Using NaH to generate a 'naked' alkoxide in a polar aprotic solvent like DMF maximizes nucleophilicity while the low temperature suppresses the higher-activation-energy elimination pathway.",
    "elimination_map": {
      "1": "Protic solvents stabilize the nucleophile via hydrogen bonding, reducing its power and favoring E2 on hindered substrates.",
      "2": "Non-polar solvents cannot solvate the ionic reagents, leading to zero reaction rate due to phase separation."
    }
  },
  {
    "question_id": "ORG-SYN-002",
    "topic": "Advanced Organic Synthesis",
    "subtopic": "Solvent/Catalyst Misfit",
    "difficulty": "Hard",
    "question": "A chemist intends to oxidize a primary alcohol to an aldehyde. Which protocol avoids the formation of the corresponding carboxylic acid under standard laboratory conditions?",
    "options": {
      "1": "$K_2Cr_2O_7$ in aqueous $H_2SO_4$ (Jones Reagent)",
      "2": "$PCC$ ($Pyridinium\\ Chlorochromate$) in aqueous $Acetone$",
      "3": "$PCC$ ($Pyridinium\\ Chlorochromate$) in anhydrous $CH_2Cl_2$"
    },
    "correct_vector": 3,
    "pivot_explanation": "The critical factor in stopping alcohol oxidation at the aldehyde stage is the absence of water. In aqueous media, aldehydes exist in equilibrium with their hydrates (gem-diols), which are rapidly oxidized to carboxylic acids by Cr(VI) species. Jones reagent is inherently aqueous, and even PCC—which is designed for aldehyde selectivity—will fail to stop at the aldehyde if moisture is present to facilitate the hydrate intermediate.",
    "elimination_map": {
      "1": "Aqueous acidic conditions facilitate the formation of an aldehyde hydrate, which is the necessary substrate for over-oxidation.",
      "2": "The presence of water, even with selective reagents like PCC, allows the formation of the gem-diol intermediate."
    }
  },
  {
    "question_id": "ORG-SYN-003",
    "topic": "Advanced Organic Synthesis",
    "subtopic": "Solvent/Catalyst Misfit",
    "difficulty": "Hard",
    "question": "To perform a Grignard addition to a sterically hindered ketone, which medium and protocol are necessary to prevent reagent quenching or enolization?",
    "options": {
      "1": "$MeMgBr$ in $Ethanol$ at reflux",
      "2": "$MeMgBr$ in $Benzene$ at $25^\\circ C$",
      "3": "$MeMgBr$ in anhydrous $THF$ at $0^\\circ C$"
    },
    "correct_vector": 3,
    "pivot_explanation": "Grignard reagents are extremely strong bases ($pK_a \\approx 50$). Protic solvents like Ethanol will immediately quench the reagent to methane gas. While non-polar solvents like Benzene do not quench the reagent, they fail to coordinate with the Magnesium center, leading to aggregation and poor reactivity. THF acts as a Lewis base, solvating the Grignard species through coordination, which increases its nucleophilicity and allows for addition to hindered centers at low temperatures.",
    "elimination_map": {
      "1": "Protic solvents contain acidic hydrogens that react with the Grignard reagent faster than the carbonyl group.",
      "2": "Lack of a coordinating ether solvent leads to reagent aggregation and dramatically reduced nucleophilic attack rates."
    }
  },
  {
    "question_id": "ORG-SYN-004",
    "topic": "Advanced Organic Synthesis",
    "subtopic": "Solvent/Catalyst Misfit",
    "difficulty": "Hard",
    "question": "A Diels-Alder reaction between a relatively unreactive diene and dienophile is required. Which condition set provides the highest rate acceleration via the 'hydrophobic effect'?",
    "options": {
      "1": "Refluxing in $Toluene$ with $AlCl_3$ catalyst",
      "2": "Reaction in $DMF$ at $100^\\circ C$",
      "3": "Reaction in $H_2O$ or $ethylene\\ glycol$ at $25^\\circ C$"
    },
    "correct_vector": 3,
    "pivot_explanation": "While Lewis acid catalysis in Toluene is the standard method to lower the LUMO of a dienophile, certain Diels-Alder reactions exhibit a 'hydrophobic effect' where water forces the organic reactants together to minimize surface area contact with the solvent. This significantly increases the effective concentration and rate, often outperforming high-temperature organic solvent protocols. Water acts not just as a medium, but as a structural constraint for the transition state.",
    "elimination_map": {
      "1": "Standard Lewis acid catalysis is effective but does not utilize the entropy-driven hydrophobic force found in aqueous media.",
      "2": "Polar aprotic solvents like DMF solvate the transition state but do not provide the forced-association effect of water."
    }
  },
  {
    "question_id": "ORG-SYN-005",
    "topic": "Advanced Organic Synthesis",
    "subtopic": "Solvent/Catalyst Misfit",
    "difficulty": "Hard",
    "question": "In the Birch reduction of benzene to 1,4-cyclohexadiene, which component acts as the essential proton source and how must it be handled?",
    "options": {
      "1": "$Na$ metal and $H_2O$ in $THF$ at $25^\\circ C$",
      "2": "$Li$ metal in liquid $NH_3$ with concentrated $HCl$ added",
      "3": "$Li$ metal in liquid $NH_3$ with $t-BuOH$ as a co-solvent",
      "4": null
    },
    "options_meta": "Constraint: Option 3 is correct.",
    "options": {
      "1": "$Na$ metal and $H_2O$ in $THF$ at $25^\\circ C$",
      "2": "$Li$ metal in liquid $NH_3$ with concentrated $HCl$",
      "3": "$Li$ metal in liquid $NH_3$ with $t-Butanol$"
    },
    "correct_vector": 3,
    "pivot_explanation": "The Birch reduction requires solvated electrons and a proton source with a very specific acidity. Water or HCl would react violently with the alkali metal or liquid ammonia before the benzene ring could be reduced. $t-Butanol$ is used because it is acidic enough to protonate the radical anion intermediate but sterically hindered and weak enough to coexist with the solvated electrons in ammonia long enough for the reaction to occur.",
    "elimination_map": {
      "1": "Sodium reacts explosively with water to produce hydrogen gas, destroying the reagent before any organic reduction happens.",
      "2": "Strong acids quench the ammonia solvent and the metal electrons instantly, preventing the formation of the required reducing environment."
    }
  },
  {
    "question_id": "ORG-SYN-006",
    "topic": "Advanced Organic Synthesis",
    "subtopic": "Solvent/Catalyst Misfit",
    "difficulty": "Hard",
    "question": "For a Wittig reaction using an unstabilized ylide to produce a Z-alkene, which conditions are strictly required?",
    "options": {
      "1": "$Ph_3P=CHCH_3$ in $Methanol$ with $LiI$ salt",
      "2": "$Ph_3P=CHCH_3$ in $THF$ with $LiBr$ present",
      "3": "$Ph_3P=CHCH_3$ in $THF$ under Salt-Free conditions"
    },
    "correct_vector": 3,
    "pivot_explanation": "Z-selectivity in Wittig reactions with unstabilized ylides is governed by the kinetic control of the oxaphosphetane formation. The presence of Lithium salts (like LiI or LiBr) coordinates with the intermediates, stabilizing them and allowing for equilibration or geometric shifts that lead to E-alkenes (Schlosser modification). To maintain high Z-selectivity, the reaction must be performed in an aprotic solvent like THF under 'salt-free' conditions to prevent coordination-induced scrambling.",
    "elimination_map": {
      "1": "Methanol is a protic solvent that will protonate the unstabilized ylide, reverting it to the phosphonium salt.",
      "2": "Lithium salts coordinate to the betaine intermediate, facilitating equilibration which promotes the more stable E-isomer."
    }
  },
  {
    "question_id": "ORG-SYN-007",
    "topic": "Advanced Organic Synthesis",
    "subtopic": "Solvent/Catalyst Misfit",
    "difficulty": "Hard",
    "question": "A chemist performs a Friedel-Crafts acylation of an activated aromatic ring. Which solvent choice is most appropriate to ensure the catalyst remains active?",
    "options": {
      "1": "$N,N-Dimethylformamide$ ($DMF$)",
      "2": "$Diethyl\\ Ether$ ($Et_2O$)",
      "3": "$Nitrobenzene$ or $Dichloromethane$"
    },
    "correct_vector": 3,
    "pivot_explanation": "Friedel-Crafts reactions utilize strong Lewis acids like $AlCl_3$. Solvents that contain basic lone pairs, such as DMF (amide) or Diethyl Ether (ether), will form stable Lewis acid-base complexes with the catalyst. This effectively 'poisons' the catalyst, making it unavailable to activate the acyl halide. Nitrobenzene and DCM are used because they are non-coordinating or poorly coordinating, allowing the AlCl3 to remain free to coordinate with the carbonyl group of the reactant.",
    "elimination_map": {
      "1": "The carbonyl oxygen of DMF is a strong Lewis base that irreversibly binds to $AlCl_3$, stopping the reaction.",
      "2": "Ethers are Lewis bases that coordinate to the aluminum center, preventing it from activating the electrophile."
    }
  },
  {
    "question_id": "ORG-SYN-008",
    "topic": "Advanced Organic Synthesis",
    "subtopic": "Solvent/Catalyst Misfit",
    "difficulty": "Hard",
    "question": "Which set of conditions is optimal for the Reformatsky reaction to prevent the side reaction of enolate condensation?",
    "options": {
      "1": "Magnesium metal in $Diethyl\\ Ether$ at reflux",
      "2": "Zinc dust in $H_2O/Ethanol$ mixture",
      "3": "Activated Zinc dust in anhydrous $THF$ or $Benzene$"
    },
    "correct_vector": 3,
    "pivot_explanation": "The Reformatsky reaction uses Zinc specifically because zinc enolates are less reactive (more covalent) than magnesium or lithium enolates. This lower reactivity allows the enolate to form in the presence of an ester without attacking itself. However, Zinc is highly sensitive to moisture; water would quench the organozinc intermediate. THF or Benzene provides the anhydrous, non-nucleophilic environment required for the zinc enolate to selectively attack an aldehyde or ketone.",
    "elimination_map": {
      "1": "Magnesium would form a Grignard-like reagent that is too reactive, causing the ester to undergo self-condensation.",
      "2": "Water and alcohols protonate organometallic intermediates instantly, leading to the formation of the reduced alkane."
    }
  },
  {
    "question_id": "ORG-SYN-009",
    "topic": "Advanced Organic Synthesis",
    "subtopic": "Solvent/Catalyst Misfit",
    "difficulty": "Hard",
    "question": "To convert an internal alkyne to a trans-alkene, which set of conditions is mechanistically required to avoid cis-reduction?",
    "options": {
      "1": "$H_2$ gas with $Pd/BaSO_4$ and $Quinoline$ (Lindlar)",
      "2": "$LiAlH_4$ in $Diethyl\\ Ether$ at $0^\\circ C$",
      "3": "$Na$ or $Li$ metal in liquid $NH_3$ at $-33^\\circ C$"
    },
    "correct_vector": 3,
    "pivot_explanation": "Trans-alkenes are formed via the Birch-type reduction of alkynes, which involves stepwise electron transfer to form a radical anion. The radical anion prefers the trans-configuration to minimize electronic repulsion. This intermediate is then protonated by the ammonia solvent. Lindlar's catalyst provides cis-alkenes because the hydrogen atoms are added simultaneously to one side of the alkyne on the metal surface. LiAlH4 generally does not reduce simple alkynes unless they are propargylic alcohols.",
    "elimination_map": {
      "1": "Lindlar's catalyst is designed for syn-addition, yielding the less stable cis-isomer due to surface-mediated delivery.",
      "2": "Simple alkynes lack the coordination required for hydride attack; LiAlH4 is ineffective for this transformation."
    }
  },
  {
    "question_id": "ORG-SYN-010",
    "topic": "Advanced Organic Synthesis",
    "subtopic": "Solvent/Catalyst Misfit",
    "difficulty": "Hard",
    "question": "A chemist attempts a Swern oxidation of a primary alcohol. Which mistake in the protocol would lead to the formation of a methylthiomethyl (MTM) ether side product?",
    "options": {
      "1": "Using $DMSO$ and $Oxalyl\\ Chloride$ at $-78^\\circ C$",
      "2": "Adding $Triethylamine$ ($Et_3N$) at $-78^\\circ C$",
      "3": "Warming the reaction to $0^\\circ C$ before adding the alcohol"
    },
    "correct_vector": 3,
    "pivot_explanation": "The Swern oxidation relies on the formation of the dimethylchlorosulfonium cation. This intermediate is unstable and decomposes at temperatures above $-60^\\circ C$ to a Pummerer-type intermediate. If the reaction is warmed before the alcohol is added, the active oxidant is lost, and the resulting species reacts with the alcohol to form the MTM ether side product ($R-O-CH_2SCH_3$). Maintaining cryogenic temperatures until the alcohol is fully incorporated is non-negotiable.",
    "elimination_map": {
      "1": "These are the correct reagents and temperature; they facilitate the formation of the active sulfonium electrophile.",
      "2": "Triethylamine is the essential base added to deprotonate the intermediate and generate the aldehyde."
    }
  },
  {
    "question_id": "ORG-SYN-011",
    "topic": "Advanced Organic Synthesis",
    "subtopic": "Solvent/Catalyst Misfit",
    "difficulty": "Hard",
    "question": "In a Claisen condensation involving Ethyl Acetate, why is the choice of base ($NaOEt$) critical compared to using $NaOH$?",
    "options": {
      "1": "$NaOH$ is not a strong enough base to deprotonate the alpha-carbon",
      "2": "$NaOEt$ provides better solubility in organic solvents like $EtOH$",
      "3": "$NaOH$ would cause irreversible saponification of the ester"
    },
    "correct_vector": 3,
    "pivot_explanation": "Claisen condensations must avoid nucleophilic attack on the ester carbonyl that leads to a different product. If $NaOH$ is used, the hydroxide ion will attack the ester, leading to saponification (hydrolysis to the carboxylate salt), which is irreversible and kills the reaction. Using $NaOEt$ ensures that if the base attacks the carbonyl, the leaving group is also ethoxide, recreating the starting material and allowing the equilibrium to eventually favor the enolate-driven condensation.",
    "elimination_map": {
      "1": "Hydroxide is basic enough to form the enolate, but its nucleophilicity creates a lethal side pathway for esters.",
      "2": "Solubility is a secondary benefit; the primary driver is the chemical compatibility of the alkoxide with the ester group."
    }
  },
  {
    "question_id": "ORG-SYN-012",
    "topic": "Advanced Organic Synthesis",
    "subtopic": "Solvent/Catalyst Misfit",
    "difficulty": "Hard",
    "question": "Which set of conditions allows for the conjugate addition of an alkyl group to an $\\alpha,\\beta$-unsaturated ketone while minimizing 1,2-addition?",
    "options": {
      "1": "$RMgBr$ in $Diethyl\\ Ether$ at $0^\\circ C$",
      "2": "$RLi$ in $THF$ at $-78^\\circ C$",
      "3": "$R_2CuLi$ (Gilman Reagent) in $THF$ at $-20^\\circ C$"
    },
    "correct_vector": 3,
    "pivot_explanation": "Hard nucleophiles like Grignard reagents ($RMgBr$) and Organolithiums ($RLi$) have a strong preference for 1,2-addition (attack at the carbonyl carbon) due to electrostatic attraction. Gilman reagents ($R_2CuLi$) are 'soft' nucleophiles. According to HSAB theory, they prefer to attack the soft beta-carbon of the enone system. The choice of the soft Copper metal over the hard Magnesium/Lithium is the defining constraint for achieving regioselective 1,4-addition.",
    "elimination_map": {
      "1": "Grignard reagents are hard nucleophiles that primarily attack the carbonyl carbon to yield 1,2-addition products.",
      "2": "Organolithiums are even harder than Grignards and will almost exclusively perform 1,2-addition, especially at low temperatures."
    }
  },
  {
    "question_id": "ORG-SYN-013",
    "topic": "Advanced Organic Synthesis",
    "subtopic": "Solvent/Catalyst Misfit",
    "difficulty": "Hard",
    "question": "A chemist attempts the Robinson Annulation. Why is a protic solvent like $Methanol$ often preferred over an aprotic solvent like $Ether$ for this multi-step process?",
    "options": {
      "1": "$Methanol$ increases the nucleophilicity of the enolate intermediate",
      "2": "$Ether$ is too volatile to allow the reaction to reach the required reflux temperature",
      "3": "Protic solvents facilitate the essential proton transfers and the final dehydration step"
    },
    "correct_vector": 3,
    "pivot_explanation": "The Robinson Annulation is a sequence of Michael addition followed by an Aldol condensation and finally dehydration. Each step involves equilibrium and multiple proton transfers. Protic solvents (MeOH/EtOH) stabilize the various oxyanion intermediates and act as a proton reservoir, facilitating the mobility of H+ required to move from the Michael adduct to the cyclic Aldol product. In aprotic solvents, these proton shifts are kinetically hindered.",
    "elimination_map": {
      "1": "Protic solvents actually decrease enolate nucleophilicity by solvating the lone pair via hydrogen bonding.",
      "2": "Volatility can be managed with pressure; the chemical requirement for proton transfer is the true limiting factor."
    }
  },
  {
    "question_id": "ORG-SYN-014",
    "topic": "Advanced Organic Synthesis",
    "subtopic": "Solvent/Catalyst Misfit",
    "difficulty": "Hard",
    "question": "To perform a Heck reaction coupling an aryl halide with an alkene, which combination of catalyst and additive is essential?",
    "options": {
      "1": "$Pd(PPh_3)_4$ with $AlCl_3$ in $Benzene$",
      "2": "$Pd(OAc)_2$ in $Methanol$ with $H_2SO_4$",
      "3": "$Pd(OAc)_2/P(o-tol)_3$ with a base ($Et_3N$ or $K_2CO_3$) in $DMF$"
    },
    "correct_vector": 3,
    "pivot_explanation": "The Heck reaction cycle involves oxidative addition, carbopalladation, and beta-hydride elimination. The final step releases a proton and the halide, forming $HX$. A base is strictly required to neutralize this acid and regenerate the $Pd(0)$ catalyst. Without a base, the cycle stalls. Furthermore, polar aprotic solvents like DMF or MeCN are needed to stabilize the ionic intermediates and the transition metal center throughout the complex cycle.",
    "elimination_map": {
      "1": "Lewis acids like $AlCl_3$ would deactivate the phosphine ligands and the palladium catalyst by coordinating to them.",
      "2": "Acidic conditions prevent the regeneration of the $Pd(0)$ species by keeping the palladium in a protonated or oxidized state."
    }
  },
  {
    "question_id": "ORG-SYN-015",
    "topic": "Advanced Organic Synthesis",
    "subtopic": "Solvent/Catalyst Misfit",
    "difficulty": "Hard",
    "question": "In the Sharpess Asymmetric Epoxidation of an allylic alcohol, what is the role of the molecular sieves ($4\\text{\\AA}$) often added to the reaction?",
    "options": {
      "1": "They act as a solid-phase catalyst to increase the reaction rate",
      "2": "They increase the surface area for the $Titanium$ complex to coordinate",
      "3": "They remove trace water which would hydrolyze the $Titanium$ alkoxide catalyst"
    },
    "correct_vector": 3,
    "pivot_explanation": "The Sharpless Epoxidation is highly sensitive to moisture. The active catalyst is a $Titanium(IV)$ isopropoxide complex coordinated with a tartrate ligand. Trace amounts of water can hydrolyze the Ti-O-R bonds, forming inactive Titanium oxides and destroying the chiral environment. The addition of molecular sieves allows for the use of catalytic amounts of Titanium rather than stoichiometric amounts, as it protects the complex from hydrolytic deactivation.",
    "elimination_map": {
      "1": "Molecular sieves are inert desiccants; they do not participate in the electronic transition states of the mechanism.",
      "2": "Coordination occurs in the homogenous phase; surface area of the sieves is irrelevant to the chiral induction logic."
    }
  }
]
