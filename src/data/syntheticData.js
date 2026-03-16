export const therapeuticAreas = [
  {
    id: 'oncology',
    name: 'Oncology',
    description: 'Cancer treatment and precision medicine',
    totalPatients: 2847,
    activeTrials: 23,
    biomarkersTracked: 42
  },
  {
    id: 'neurology',
    name: 'Neurology',
    description: 'Neurological disorders and brain health',
    totalPatients: 1923,
    activeTrials: 18,
    biomarkersTracked: 35
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    description: 'Cardiovascular disease management',
    totalPatients: 3156,
    activeTrials: 15,
    biomarkersTracked: 28
  },
  {
    id: 'immunology',
    name: 'Immunology',
    description: 'Autoimmune and inflammatory conditions',
    totalPatients: 1654,
    activeTrials: 12,
    biomarkersTracked: 31
  }
];

export const patientJourneys = [
  {
    id: 'PJ-001',
    patientCode: 'PT-2847-A',
    age: 58,
    gender: 'Female',
    therapeuticArea: 'oncology',
    condition: 'HER2+ Breast Cancer',
    stage: 'Stage IIIA',
    diagnosis: 'March 2024',
    treatment: 'Trastuzumab + Pertuzumab + Docetaxel',
    biomarker: 'HER2 amplification',
    biomarkerValue: '3+ IHC',
    currentStatus: 'Responding',
    narrative: 'Sarah, a 58-year-old teacher, was diagnosed with HER2+ breast cancer after a routine mammogram. Her tumor showed strong HER2 amplification, making her an ideal candidate for targeted therapy. After 6 cycles of combination therapy, her tumor has shrunk by 67%, and she continues to maintain good quality of life.',
    timeline: [
      { month: 0, event: 'Initial Diagnosis', tumorSize: 4.2, ca153: 45, quality: 65 },
      { month: 1, event: 'Treatment Start', tumorSize: 4.0, ca153: 42, quality: 60 },
      { month: 2, event: 'First Assessment', tumorSize: 3.2, ca153: 35, quality: 68 },
      { month: 3, event: 'Continued Response', tumorSize: 2.5, ca153: 28, quality: 72 },
      { month: 4, event: 'Mid-Treatment', tumorSize: 1.8, ca153: 22, quality: 75 },
      { month: 5, event: 'Near Remission', tumorSize: 1.4, ca153: 18, quality: 78 },
      { month: 6, event: 'Current Status', tumorSize: 1.4, ca153: 16, quality: 80 }
    ],
    biometrics: {
      her2Score: 3,
      erStatus: 'Positive',
      prStatus: 'Positive',
      ki67: '28%',
      pdl1: 'Negative'
    },
    adverseEvents: [
      { event: 'Mild Nausea', grade: 1, resolved: true },
      { event: 'Fatigue', grade: 2, resolved: false },
      { event: 'Peripheral Neuropathy', grade: 1, resolved: true }
    ],
    predictedOutcome: {
      twoYearSurvival: 89,
      fiveYearSurvival: 76,
      recurrenceRisk: 'Low',
      confidence: 0.87
    }
  },
  {
    id: 'PJ-002',
    patientCode: 'PT-1923-B',
    age: 45,
    gender: 'Male',
    therapeuticArea: 'neurology',
    condition: 'Multiple Sclerosis',
    stage: 'Relapsing-Remitting',
    diagnosis: 'January 2023',
    treatment: 'Ocrelizumab (Anti-CD20)',
    biomarker: 'CD20+ B-cells',
    biomarkerValue: 'Depleted',
    currentStatus: 'Stable',
    narrative: 'Michael, a 45-year-old software engineer, experienced his first MS relapse with vision problems and numbness. MRI revealed multiple lesions. Started on Ocrelizumab, his B-cell counts dropped appropriately, and he has been relapse-free for 14 months with no new lesions on recent MRI.',
    timeline: [
      { month: 0, event: 'Diagnosis', edss: 2.5, lesionCount: 12, cd20: 450, quality: 55 },
      { month: 2, event: 'Treatment Start', edss: 2.5, lesionCount: 12, cd20: 420, quality: 58 },
      { month: 4, event: 'B-cell Depletion', edss: 2.0, lesionCount: 12, cd20: 45, quality: 68 },
      { month: 6, event: 'First MRI Follow-up', edss: 1.5, lesionCount: 11, cd20: 38, quality: 75 },
      { month: 9, event: 'Stable Disease', edss: 1.5, lesionCount: 11, cd20: 42, quality: 78 },
      { month: 12, event: 'Annual Assessment', edss: 1.0, lesionCount: 10, cd20: 40, quality: 82 },
      { month: 14, event: 'Current Status', edss: 1.0, lesionCount: 10, cd20: 38, quality: 85 }
    ],
    biometrics: {
      cd20Count: 38,
      neurofilamentLight: '8.2 pg/mL',
      oligoclonalBands: 'Positive',
      vitaminD: '42 ng/mL',
      jcvStatus: 'Negative'
    },
    adverseEvents: [
      { event: 'Infusion Reaction', grade: 1, resolved: true },
      { event: 'Upper Respiratory Infection', grade: 1, resolved: true }
    ],
    predictedOutcome: {
      tenYearProgression: 15,
      relapseRisk: 'Very Low',
      disabilityProgression: 'Minimal',
      confidence: 0.91
    }
  },
  {
    id: 'PJ-003',
    patientCode: 'PT-3156-C',
    age: 62,
    gender: 'Male',
    therapeuticArea: 'cardiology',
    condition: 'Heart Failure with Reduced EF',
    stage: 'NYHA Class III',
    diagnosis: 'June 2023',
    treatment: 'ARNI + SGLT2i + Beta-blocker',
    biomarker: 'NT-proBNP',
    biomarkerValue: '1,245 pg/mL',
    currentStatus: 'Improving',
    narrative: 'Robert, a 62-year-old retired firefighter, developed heart failure after a silent MI. His ejection fraction was 28%. With guideline-directed medical therapy including the latest SGLT2 inhibitor, his NT-proBNP has dropped 68%, EF improved to 38%, and he can now walk his dog without shortness of breath.',
    timeline: [
      { month: 0, event: 'Diagnosis', ef: 28, ntprobnp: 3850, sixmwt: 245, quality: 42 },
      { month: 1, event: 'Treatment Initiation', ef: 28, ntprobnp: 3600, sixmwt: 260, quality: 48 },
      { month: 2, event: 'Titration Phase', ef: 30, ntprobnp: 2900, sixmwt: 295, quality: 55 },
      { month: 3, event: 'SGLT2i Added', ef: 32, ntprobnp: 2200, sixmwt: 325, quality: 62 },
      { month: 4, event: 'Clinical Improvement', ef: 35, ntprobnp: 1750, sixmwt: 360, quality: 70 },
      { month: 6, event: 'Significant Progress', ef: 37, ntprobnp: 1420, sixmwt: 395, quality: 76 },
      { month: 8, event: 'Current Status', ef: 38, ntprobnp: 1245, sixmwt: 415, quality: 82 }
    ],
    biometrics: {
      ejectionFraction: 38,
      ntProBNP: 1245,
      troponinT: '12 ng/L',
      creatinine: '1.1 mg/dL',
      potassium: '4.3 mEq/L'
    },
    adverseEvents: [
      { event: 'Hypotension', grade: 1, resolved: true },
      { event: 'Dizziness', grade: 1, resolved: true }
    ],
    predictedOutcome: {
      oneYearMortality: 8,
      fiveYearMortality: 28,
      hospitalizationRisk: 'Low',
      confidence: 0.84
    }
  },
  {
    id: 'PJ-004',
    patientCode: 'PT-1654-D',
    age: 34,
    gender: 'Female',
    therapeuticArea: 'immunology',
    condition: 'Rheumatoid Arthritis',
    stage: 'Moderate-Severe',
    diagnosis: 'September 2023',
    treatment: 'JAK Inhibitor (Upadacitinib)',
    biomarker: 'Anti-CCP, RF',
    biomarkerValue: 'High Positive',
    currentStatus: 'Remission',
    narrative: 'Emily, a 34-year-old graphic designer, struggled with severe joint pain and swelling that threatened her career. Traditional DMARDs provided minimal relief. After switching to a JAK inhibitor, her DAS28 score dropped from 6.2 to 1.8, and she achieved clinical remission within 5 months.',
    timeline: [
      { month: 0, event: 'Diagnosis', das28: 6.2, crp: 28, esr: 45, quality: 38 },
      { month: 1, event: 'JAK Inhibitor Start', das28: 5.8, crp: 25, esr: 42, quality: 42 },
      { month: 2, event: 'Early Response', das28: 4.5, crp: 15, esr: 32, quality: 58 },
      { month: 3, event: 'Continued Improvement', das28: 3.2, crp: 8, esr: 22, quality: 72 },
      { month: 4, event: 'Low Disease Activity', das28: 2.4, crp: 4, esr: 15, quality: 82 },
      { month: 5, event: 'Clinical Remission', das28: 1.8, crp: 2, esr: 10, quality: 90 },
      { month: 6, event: 'Current Status', das28: 1.8, crp: 2, esr: 9, quality: 92 }
    ],
    biometrics: {
      antiCCP: 'High Positive (>250 U/mL)',
      rheumatoidFactor: 'Positive (85 IU/mL)',
      crp: 2,
      esr: 9,
      hemoglobin: '13.2 g/dL'
    },
    adverseEvents: [
      { event: 'Mild Headache', grade: 1, resolved: true },
      { event: 'Upper Respiratory Infection', grade: 1, resolved: true }
    ],
    predictedOutcome: {
      sustainedRemission: 78,
      radiographicProgression: 'Minimal',
      functionalOutcome: 'Excellent',
      confidence: 0.89
    }
  }
];

export const drugPerformanceData = [
  {
    drugName: 'Trastuzumab + Pertuzumab',
    indication: 'HER2+ Breast Cancer',
    biomarker: 'HER2 amplification',
    patientsEnrolled: 487,
    responseRate: {
      sixMonth: 84,
      oneYear: 76,
      twoYear: 68
    },
    survivalData: [
      { month: 0, observed: 100, predicted: 100 },
      { month: 6, observed: 98, predicted: 97 },
      { month: 12, observed: 94, predicted: 92 },
      { month: 18, observed: 89, predicted: 86 },
      { month: 24, observed: 84, predicted: 80 },
      { month: 30, observed: 79, predicted: 74 },
      { month: 36, observed: 73, predicted: 68 }
    ],
    adverseEventProfile: [
      { event: 'Cardiotoxicity', incidence: 8, grade3Plus: 2 },
      { event: 'Infusion Reactions', incidence: 22, grade3Plus: 1 },
      { event: 'Diarrhea', incidence: 45, grade3Plus: 5 },
      { event: 'Fatigue', incidence: 58, grade3Plus: 8 },
      { event: 'Neuropathy', incidence: 35, grade3Plus: 6 }
    ],
    costEffectiveness: {
      qaly: 4.2,
      costPerQaly: 125000,
      incrementalBenefit: 2.1
    }
  },
  {
    drugName: 'Ocrelizumab',
    indication: 'Relapsing-Remitting MS',
    biomarker: 'CD20+ B-cells',
    patientsEnrolled: 623,
    responseRate: {
      sixMonth: 91,
      oneYear: 88,
      twoYear: 85
    },
    relapseReduction: [
      { year: 1, relapseRate: 0.08, placeboRate: 0.42, reduction: 81 },
      { year: 2, relapseRate: 0.12, placeboRate: 0.45, reduction: 73 },
      { year: 3, relapseRate: 0.15, placeboRate: 0.48, reduction: 69 }
    ],
    disabilityProgression: [
      { month: 0, edss: 2.5 },
      { month: 6, edss: 2.3 },
      { month: 12, edss: 2.1 },
      { month: 18, edss: 2.0 },
      { month: 24, edss: 1.9 },
      { month: 30, edss: 1.8 },
      { month: 36, edss: 1.7 }
    ],
    adverseEventProfile: [
      { event: 'Infusion Reactions', incidence: 34, grade3Plus: 2 },
      { event: 'Infections', incidence: 58, grade3Plus: 4 },
      { event: 'Headache', incidence: 28, grade3Plus: 0 }
    ],
    costEffectiveness: {
      qaly: 8.5,
      costPerQaly: 95000,
      incrementalBenefit: 3.8
    }
  },
  {
    drugName: 'ARNI + SGLT2i Combination',
    indication: 'Heart Failure (HFrEF)',
    biomarker: 'NT-proBNP',
    patientsEnrolled: 892,
    responseRate: {
      sixMonth: 78,
      oneYear: 72,
      twoYear: 68
    },
    clinicalOutcomes: [
      { metric: 'CV Death Reduction', value: 26, ci: '18-33' },
      { metric: 'HF Hospitalization Reduction', value: 31, ci: '24-37' },
      { metric: 'All-cause Mortality Reduction', value: 18, ci: '11-24' },
      { metric: 'QoL Improvement', value: 12.5, ci: '9.2-15.8' }
    ],
    biomarkerResponse: [
      { month: 0, ntprobnp: 3200, ef: 28 },
      { month: 1, ntprobnp: 2800, ef: 29 },
      { month: 3, ntprobnp: 2100, ef: 32 },
      { month: 6, ntprobnp: 1600, ef: 35 },
      { month: 9, ntprobnp: 1350, ef: 37 },
      { month: 12, ntprobnp: 1200, ef: 39 }
    ],
    adverseEventProfile: [
      { event: 'Hypotension', incidence: 18, grade3Plus: 2 },
      { event: 'Hyperkalemia', incidence: 12, grade3Plus: 3 },
      { event: 'Renal Dysfunction', incidence: 8, grade3Plus: 1 },
      { event: 'Dizziness', incidence: 24, grade3Plus: 1 }
    ],
    costEffectiveness: {
      qaly: 6.8,
      costPerQaly: 78000,
      incrementalBenefit: 2.9
    }
  },
  {
    drugName: 'Upadacitinib',
    indication: 'Rheumatoid Arthritis',
    biomarker: 'Anti-CCP, CRP',
    patientsEnrolled: 534,
    responseRate: {
      sixMonth: 82,
      oneYear: 76,
      twoYear: 71
    },
    clinicalResponse: [
      { timepoint: 'Week 12', acr20: 71, acr50: 48, acr70: 28, remission: 18 },
      { timepoint: 'Week 24', acr20: 78, acr50: 58, acr70: 38, remission: 32 },
      { timepoint: 'Week 52', acr20: 82, acr50: 64, acr70: 45, remission: 42 }
    ],
    biomarkerTrends: [
      { month: 0, das28: 5.8, crp: 24, haq: 1.8 },
      { month: 1, das28: 5.2, crp: 18, haq: 1.6 },
      { month: 3, das28: 3.8, crp: 8, haq: 1.1 },
      { month: 6, das28: 2.6, crp: 4, haq: 0.6 },
      { month: 9, das28: 2.2, crp: 3, haq: 0.4 },
      { month: 12, das28: 2.0, crp: 2, haq: 0.3 }
    ],
    adverseEventProfile: [
      { event: 'Infections', incidence: 42, grade3Plus: 3 },
      { event: 'Elevated Liver Enzymes', incidence: 15, grade3Plus: 2 },
      { event: 'Anemia', incidence: 8, grade3Plus: 1 },
      { event: 'Headache', incidence: 28, grade3Plus: 0 }
    ],
    costEffectiveness: {
      qaly: 7.2,
      costPerQaly: 88000,
      incrementalBenefit: 3.4
    }
  }
];

export const biomarkerInsights = [
  {
    biomarker: 'HER2 Amplification',
    therapeuticArea: 'Oncology',
    predictiveValue: 'High',
    patientsScreened: 2847,
    positiveRate: 18,
    clinicalUtility: 'Predicts response to HER2-targeted therapies',
    associatedDrugs: ['Trastuzumab', 'Pertuzumab', 'T-DM1'],
    outcomeImprovement: 67,
    testingMethod: 'IHC/FISH',
    turnaroundTime: '5-7 days',
    costPerTest: 450
  },
  {
    biomarker: 'CD20+ B-cells',
    therapeuticArea: 'Neurology',
    predictiveValue: 'High',
    patientsScreened: 1923,
    positiveRate: 100,
    clinicalUtility: 'Monitors B-cell depletion therapy effectiveness',
    associatedDrugs: ['Ocrelizumab', 'Rituximab'],
    outcomeImprovement: 73,
    testingMethod: 'Flow Cytometry',
    turnaroundTime: '2-3 days',
    costPerTest: 180
  },
  {
    biomarker: 'NT-proBNP',
    therapeuticArea: 'Cardiology',
    predictiveValue: 'Moderate-High',
    patientsScreened: 3156,
    positiveRate: 85,
    clinicalUtility: 'Predicts HF prognosis and treatment response',
    associatedDrugs: ['ARNI', 'SGLT2i', 'Beta-blockers'],
    outcomeImprovement: 54,
    testingMethod: 'Immunoassay',
    turnaroundTime: '1 day',
    costPerTest: 85
  },
  {
    biomarker: 'Anti-CCP Antibodies',
    therapeuticArea: 'Immunology',
    predictiveValue: 'High',
    patientsScreened: 1654,
    positiveRate: 72,
    clinicalUtility: 'Predicts erosive disease and treatment response',
    associatedDrugs: ['JAK Inhibitors', 'Biologics'],
    outcomeImprovement: 61,
    testingMethod: 'ELISA',
    turnaroundTime: '2-4 days',
    costPerTest: 120
  }
];

export const populationInsights = {
  totalPatients: 9580,
  activeStudies: 68,
  biomarkersTracked: 136,
  therapeuticAreas: 4,
  averageFollowUp: 18.5,
  dataCompleteness: 94.7,
  demographicBreakdown: {
    ageGroups: [
      { range: '18-30', count: 856, percentage: 8.9 },
      { range: '31-45', count: 2105, percentage: 22.0 },
      { range: '46-60', count: 3542, percentage: 37.0 },
      { range: '61-75', count: 2489, percentage: 26.0 },
      { range: '76+', count: 588, percentage: 6.1 }
    ],
    genderDistribution: [
      { gender: 'Female', count: 5156, percentage: 53.8 },
      { gender: 'Male', count: 4424, percentage: 46.2 }
    ],
    ethnicityDistribution: [
      { ethnicity: 'Caucasian', percentage: 62 },
      { ethnicity: 'African American', percentage: 18 },
      { ethnicity: 'Hispanic/Latino', percentage: 12 },
      { ethnicity: 'Asian', percentage: 6 },
      { ethnicity: 'Other', percentage: 2 }
    ]
  },
  outcomeMetrics: {
    overallResponseRate: 76.8,
    adverseEventRate: 42.3,
    treatmentDiscontinuation: 8.7,
    qualityOfLifeImprovement: 68.4
  }
};

export const realWorldEvidence = [
  {
    studyName: 'HER2+ Breast Cancer Real-World Outcomes',
    population: 1247,
    setting: 'Community Oncology Practices',
    duration: '36 months',
    keyFindings: [
      'Real-world OS comparable to clinical trials (HR 1.08)',
      'Higher rate of treatment modifications (34% vs 18%)',
      'Cardiotoxicity monitoring varied significantly by site',
      'Patient-reported outcomes showed sustained QoL benefits'
    ],
    comparisonToTrials: {
      efficacy: -8,
      safety: -12,
      adherence: -15
    }
  },
  {
    studyName: 'MS Disease Modification in Clinical Practice',
    population: 892,
    setting: 'Academic and Community Neurology',
    duration: '48 months',
    keyFindings: [
      'Relapse rates lower than pivotal trials (0.06 vs 0.12)',
      'Better disability outcomes in real-world (EDSS -0.8)',
      'Infection rates similar to clinical trials',
      'High treatment persistence (88% at 4 years)'
    ],
    comparisonToTrials: {
      efficacy: 12,
      safety: -2,
      adherence: 8
    }
  }
];
