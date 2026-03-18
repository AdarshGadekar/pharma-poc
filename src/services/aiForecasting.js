// AI service with OpenAI GPT-4 integration
// To enable real AI, add VITE_OPENAI_API_KEY to .env file

let openaiClient = null;

// Initialize OpenAI client if API key is available
const initializeOpenAI = async () => {
  if (openaiClient) return openaiClient;
  
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) return null;
  
  try {
    const { default: OpenAI } = await import('openai');
    openaiClient = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // For demo purposes only
    });
    return openaiClient;
  } catch (error) {
    console.error('Failed to initialize OpenAI:', error);
    return null;
  }
};

export const generatePatientOutcomePrediction = async (patientData) => {
  const client = await initializeOpenAI();
  
  if (client) {
    try {
      return await generateOpenAIPrediction(client, patientData);
    } catch (error) {
      console.error('OpenAI prediction failed, falling back to rule-based:', error);
    }
  }
  
  return generateMockPrediction(patientData);
};

export const generateDrugEfficacyForecast = async (drugData) => {
  // Validate drugData first
  if (!drugData || !drugData.responseRate) {
    console.error('Invalid drugData:', drugData);
    return generateMockDrugForecast(drugData || {
      responseRate: { sixMonth: 0, oneYear: 0, twoYear: 0 }
    });
  }

  const client = await initializeOpenAI();
  
  if (client) {
    try {
      return await generateOpenAIDrugForecast(client, drugData);
    } catch (error) {
      console.error('OpenAI forecast failed, falling back to rule-based:', error);
    }
  }
  
  return generateMockDrugForecast(drugData);
};

export const generateBiomarkerInsight = async (biomarkerData) => {
  const client = await initializeOpenAI();
  
  if (client) {
    try {
      return await generateOpenAIBiomarkerInsight(client, biomarkerData);
    } catch (error) {
      console.error('OpenAI insight failed, falling back to rule-based:', error);
    }
  }
  
  return generateMockBiomarkerInsight(biomarkerData);
};

const generateMockPrediction = (patientData) => {
  // Analyze actual patient data
  const timeline = patientData.timeline || [];
  const biometrics = patientData.biometrics || {};
  const adverseEvents = patientData.adverseEvents || [];
  const currentStatus = patientData.currentStatus;
  
  // Calculate trends from timeline
  const recentData = timeline.slice(-3);
  const tumorSizeTrend = calculateTrend(recentData, 'tumorSize');
  const qualityOfLifeTrend = calculateTrend(recentData, 'qualityOfLife');
  const biomarkerTrend = calculateTrend(recentData, 'biomarkerLevel');
  
  // Analyze adverse events
  const unresolvedEvents = adverseEvents.filter(e => !e.resolved);
  const severeEvents = adverseEvents.filter(e => e.grade >= 3);
  const hasAdverseEvents = adverseEvents.length > 0;
  
  // Determine outcome based on actual data
  let predictedOutcome;
  let confidenceScore;
  
  if (currentStatus === 'Remission') {
    predictedOutcome = 'Excellent';
    confidenceScore = 92;
  } else if (currentStatus === 'Responding' && tumorSizeTrend < -10) {
    predictedOutcome = 'Excellent';
    confidenceScore = 88;
  } else if (currentStatus === 'Improving' || (currentStatus === 'Responding' && tumorSizeTrend < 0)) {
    predictedOutcome = 'Good';
    confidenceScore = 82;
  } else if (currentStatus === 'Stable') {
    predictedOutcome = 'Fair';
    confidenceScore = 76;
  } else {
    predictedOutcome = 'Good';
    confidenceScore = 80;
  }
  
  // Determine risk based on trends and adverse events
  let riskAssessment;
  if (severeEvents.length > 0 || tumorSizeTrend > 5) {
    riskAssessment = 'Moderate';
  } else if (unresolvedEvents.length > 2) {
    riskAssessment = 'Moderate';
  } else {
    riskAssessment = 'Low';
  }
  
  // Generate contextual key factors
  const keyFactors = [];
  
  if (tumorSizeTrend < -15) {
    keyFactors.push('Significant tumor reduction observed (-' + Math.abs(tumorSizeTrend).toFixed(0) + '% trend)');
  } else if (tumorSizeTrend < 0) {
    keyFactors.push('Positive tumor response with steady reduction');
  } else if (tumorSizeTrend === 0) {
    keyFactors.push('Stable disease with controlled tumor size');
  }
  
  if (biomarkerTrend < -10) {
    keyFactors.push('Strong biomarker response indicating treatment efficacy');
  } else if (biomarkerTrend < 0) {
    keyFactors.push('Favorable biomarker trend supporting positive prognosis');
  }
  
  if (qualityOfLifeTrend > 5) {
    keyFactors.push('Improving quality of life metrics');
  } else if (qualityOfLifeTrend > 0) {
    keyFactors.push('Maintained quality of life during treatment');
  }
  
  if (adverseEvents.length === 0) {
    keyFactors.push('Excellent treatment tolerance with no adverse events');
  } else if (unresolvedEvents.length === 0) {
    keyFactors.push('All adverse events successfully managed and resolved');
  }
  
  if (timeline.length >= 12) {
    keyFactors.push('Extended treatment duration demonstrating sustained response');
  }
  
  // Ensure we have at least 3 factors
  if (keyFactors.length < 3) {
    keyFactors.push('Consistent treatment adherence observed');
  }
  
  // Generate contextual recommendations
  const recommendations = [];
  
  if (currentStatus === 'Remission') {
    recommendations.push('Continue maintenance therapy and surveillance protocol');
    recommendations.push('Schedule quarterly follow-up scans to monitor for recurrence');
  } else if (tumorSizeTrend < -15) {
    recommendations.push('Maintain current treatment regimen given excellent response');
    recommendations.push('Consider de-escalation strategies if sustained response continues');
  } else if (tumorSizeTrend > 0) {
    recommendations.push('Evaluate for treatment modification or combination therapy');
    recommendations.push('Increase monitoring frequency to assess progression');
  } else {
    recommendations.push('Continue current treatment protocol with close monitoring');
  }
  
  if (unresolvedEvents.length > 0) {
    const eventTypes = unresolvedEvents.map(e => e.event).join(', ');
    recommendations.push(`Address ongoing adverse events: ${eventTypes}`);
  } else if (severeEvents.length > 0) {
    recommendations.push('Monitor for recurrence of previous Grade 3+ adverse events');
  }
  
  if (biomarkerTrend > 5) {
    recommendations.push('Investigate rising biomarker levels - consider imaging assessment');
  } else if (biomarkerTrend < -10) {
    recommendations.push('Excellent biomarker response - continue monthly monitoring');
  } else {
    recommendations.push('Maintain standard biomarker monitoring schedule');
  }
  
  if (qualityOfLifeTrend < -5) {
    recommendations.push('Implement supportive care measures to improve quality of life');
  }
  
  // Limit to 3-4 recommendations
  const finalRecommendations = recommendations.slice(0, 4);
  
  // Estimate time to remission
  let estimatedTimeToRemission;
  if (currentStatus === 'Remission') {
    estimatedTimeToRemission = 'Currently in remission';
  } else if (tumorSizeTrend < -15) {
    estimatedTimeToRemission = '3-6 months';
  } else if (tumorSizeTrend < -5) {
    estimatedTimeToRemission = '6-9 months';
  } else if (tumorSizeTrend < 0) {
    estimatedTimeToRemission = '9-12 months';
  } else {
    estimatedTimeToRemission = '12+ months';
  }
  
  return {
    predictedOutcome,
    confidenceScore,
    keyFactors: keyFactors.slice(0, 4),
    recommendations: finalRecommendations,
    riskAssessment,
    estimatedTimeToRemission
  };
};

// Helper function to calculate trend
const calculateTrend = (data, field) => {
  if (data.length < 2) return 0;
  
  const first = data[0][field];
  const last = data[data.length - 1][field];
  
  if (first === 0 || first === undefined) return 0;
  
  return ((last - first) / first) * 100;
};

const generateMockDrugForecast = (drugData) => {
  // Defensive programming - handle missing data
  const responseRate = drugData?.responseRate || { sixMonth: 0, oneYear: 0, twoYear: 0 };
  const twoYear = responseRate.twoYear || 0;
  const oneYear = responseRate.oneYear || 0;
  
  const decline = (twoYear - oneYear);
  
  return {
    threeYearPrediction: Math.max(40, twoYear + decline * 0.5),
    fiveYearPrediction: Math.max(35, twoYear + decline * 1.5),
    trendAnalysis: decline > -5 ? 'Stable' : 'Declining',
    confidenceInterval: {
      lower: Math.max(30, twoYear - 15),
      upper: Math.min(95, twoYear + 10)
    },
    keyInsights: [
      'Response rates show expected temporal decline',
      'Long-term efficacy remains clinically significant',
      'Patient selection criteria may improve outcomes',
      'Combination therapy potential exists'
    ],
    marketProjection: 'Strong market position with continued clinical adoption expected'
  };
};

const generateMockBiomarkerInsight = (biomarkerData) => {
  return {
    clinicalSignificance: biomarkerData.outcomeImprovement > 60 ? 'High' : 'Moderate',
    predictiveAccuracy: 70 + Math.floor(Math.random() * 25),
    futureApplications: [
      'Treatment response prediction',
      'Patient stratification in clinical trials',
      'Personalized dosing optimization'
    ],
    researchPriority: biomarkerData.outcomeImprovement > 60 ? 'Critical' : 'Important',
    costBenefitRatio: biomarkerData.costPerTest < 200 ? 'Excellent' : 'Good',
    aiRecommendation: `High-value biomarker for ${biomarkerData.therapeuticArea.toLowerCase()} with strong predictive utility`
  };
};

// OpenAI-based prediction functions
const generateOpenAIPrediction = async (client, patientData) => {
  const prompt = `You are a clinical AI assistant analyzing patient oncology data. Based on the following patient information, provide a structured outcome hypothesis.

Patient Data:
- Current Status: ${patientData.currentStatus}
- Treatment Duration: ${patientData.timeline?.length || 0} months
- Recent Tumor Size Trend: ${JSON.stringify(patientData.timeline?.slice(-3).map(t => ({ month: t.month, size: t.tumorSize })))}
- Recent Biomarker Levels: ${JSON.stringify(patientData.timeline?.slice(-3).map(t => ({ month: t.month, level: t.biomarkerLevel })))}
- Quality of Life Trend: ${JSON.stringify(patientData.timeline?.slice(-3).map(t => ({ month: t.month, qol: t.qualityOfLife })))}
- Adverse Events: ${patientData.adverseEvents?.length || 0} events (${patientData.adverseEvents?.filter(e => e.grade >= 3).length || 0} Grade 3+)
- Unresolved Events: ${patientData.adverseEvents?.filter(e => !e.resolved).map(e => e.event).join(', ') || 'None'}

Provide a JSON response with:
{
  "predictedOutcome": "Excellent" | "Good" | "Fair",
  "confidenceScore": 70-95,
  "keyFactors": [3-4 specific factors from the data],
  "recommendations": [3-4 clinical recommendations],
  "riskAssessment": "Low" | "Moderate" | "High",
  "estimatedTimeToRemission": "3-6 months" | "6-9 months" | etc
}

Focus on survival modeling and longitudinal extrapolation. Be specific and reference actual data points.`;

  const response = await client.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 1000
  });

  return JSON.parse(response.choices[0].message.content);
};

const generateOpenAIDrugForecast = async (client, drugData) => {
  const prompt = `You are a pharmaceutical AI analyst forecasting long-term drug efficacy. Analyze this drug performance data:

Drug: ${drugData.drugName}
Therapeutic Area: ${drugData.therapeuticArea}
Response Rates:
- 6 months: ${drugData.responseRate.sixMonth}%
- 1 year: ${drugData.responseRate.oneYear}%
- 2 years: ${drugData.responseRate.twoYear}%

Patients Enrolled: ${drugData.patientsEnrolled}
Adverse Events Profile: ${JSON.stringify(drugData.adverseEventProfile)}

Using probabilistic survival modeling and temporal efficacy extrapolation, provide a JSON forecast:
{
  "threeYearPrediction": 40-90,
  "fiveYearPrediction": 35-85,
  "trendAnalysis": "Improving" | "Stable" | "Declining",
  "confidenceInterval": {
    "lower": number,
    "upper": number
  },
  "keyInsights": [4 specific insights about long-term efficacy],
  "marketProjection": "brief projection statement"
}

Base predictions on observed temporal trends and provide realistic confidence intervals.`;

  const response = await client.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 800
  });

  return JSON.parse(response.choices[0].message.content);
};

const generateOpenAIBiomarkerInsight = async (client, biomarkerData) => {
  const prompt = `You are a biomarker research AI analyzing clinical utility. Evaluate this biomarker:

Biomarker: ${biomarkerData.biomarker}
Therapeutic Area: ${biomarkerData.therapeuticArea}
Patients Screened: ${biomarkerData.patientsScreened}
Positive Rate: ${biomarkerData.positiveRate}%
Outcome Improvement: ${biomarkerData.outcomeImprovement}%
Cost per Test: $${biomarkerData.costPerTest}
Turnaround Time: ${biomarkerData.turnaroundTime}
Predictive Value: ${biomarkerData.predictiveValue}

Provide a JSON analysis:
{
  "clinicalSignificance": "High" | "Moderate" | "Low",
  "predictiveAccuracy": 70-95,
  "futureApplications": [3 specific future applications],
  "researchPriority": "Critical" | "Important" | "Standard",
  "costBenefitRatio": "Excellent" | "Good" | "Fair",
  "aiRecommendation": "detailed recommendation for Medical Affairs teams"
}

Focus on clinical utility, cost-effectiveness, and research prioritization.`;

  const response = await client.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 700
  });

  return JSON.parse(response.choices[0].message.content);
};

export const isAIEnabled = () => {
  return !!import.meta.env.VITE_OPENAI_API_KEY;
};
