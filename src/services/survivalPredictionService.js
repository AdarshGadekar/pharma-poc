const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

export const generateSurvivalPrediction = async (drugData) => {
  // Fallback to mathematical model if no API key
  if (!OPENAI_API_KEY) {
    return generateMathematicalPrediction(drugData)
  }

  try {
    const prompt = `You are a clinical pharmacology AI analyzing drug efficacy data. Based on the observed response rates below, predict the survival/response rates at future timepoints.

**Drug:** ${drugData.drugName}
**Therapeutic Area:** ${drugData.therapeuticArea}
**Patient Cohort:** ${drugData.patientsEnrolled} patients

**Observed Response Rates:**
- 6 months: ${drugData.responseRate.sixMonth}%
- 12 months: ${drugData.responseRate.oneYear}%
- 24 months: ${drugData.responseRate.twoYear}%

**Task:** Predict response rates at 27, 30, 33, and 36 months based on:
1. Observed temporal efficacy decline patterns
2. Known pharmacology of this drug class
3. Typical disease progression patterns
4. Treatment resistance development over time

**Requirements:**
- Provide realistic predictions accounting for expected efficacy degradation
- Include 95% confidence intervals (lower and upper bounds)
- Consider that uncertainty increases with longer prediction horizons
- Response rates should not drop below 40% (floor for clinical relevance)
- Confidence intervals should widen over time

**Output Format (JSON only, no explanation):**
{
  "predictions": [
    { "month": 27, "survival": <number>, "lower": <number>, "upper": <number> },
    { "month": 30, "survival": <number>, "lower": <number>, "upper": <number> },
    { "month": 33, "survival": <number>, "lower": <number>, "upper": <number> },
    { "month": 36, "survival": <number>, "lower": <number>, "upper": <number> }
  ],
  "rationale": "<brief 2-3 sentence explanation of prediction logic>",
  "confidence": "<high|medium|low>"
}`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a clinical pharmacology expert specializing in long-term drug efficacy modeling and survival analysis. You provide scientifically grounded predictions based on observed clinical data.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3, // Lower temperature for more consistent predictions
        max_tokens: 500
      })
    })

    if (!response.ok) {
      console.error('OpenAI API error:', response.status)
      return generateMathematicalPrediction(drugData)
    }

    const data = await response.json()
    const content = data.choices[0].message.content
    
    // Parse JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('Failed to parse LLM response')
      return generateMathematicalPrediction(drugData)
    }
    
    const prediction = JSON.parse(jsonMatch[0])
    
    // Combine observed data with LLM predictions
    const fullData = [
      { month: 0, survival: 100, type: 'observed', lower: null, upper: null },
      { month: 6, survival: drugData.responseRate.sixMonth, type: 'observed', lower: null, upper: null },
      { month: 12, survival: drugData.responseRate.oneYear, type: 'observed', lower: null, upper: null },
      { month: 24, survival: drugData.responseRate.twoYear, type: 'observed', lower: null, upper: null },
      ...prediction.predictions.map(p => ({
        month: p.month,
        survival: p.survival,
        type: p.month === 24 ? 'both' : 'predicted',
        lower: p.lower,
        upper: p.upper
      }))
    ]
    
    return {
      data: fullData,
      rationale: prediction.rationale,
      confidence: prediction.confidence,
      method: 'llm'
    }

  } catch (error) {
    console.error('Error generating LLM prediction:', error)
    return generateMathematicalPrediction(drugData)
  }
}

// Fallback mathematical prediction
const generateMathematicalPrediction = (drugData) => {
  const sixMonth = drugData?.responseRate?.sixMonth || 84
  const oneYear = drugData?.responseRate?.oneYear || 76
  const twoYear = drugData?.responseRate?.twoYear || 68
  
  // Calculate decline rate per month
  const declineRate = (oneYear - twoYear) / 12
  
  const data = []
  
  // Observed data (0-24 months)
  data.push({ month: 0, survival: 100, type: 'observed', lower: null, upper: null })
  data.push({ month: 6, survival: sixMonth, type: 'observed', lower: null, upper: null })
  data.push({ month: 12, survival: oneYear, type: 'observed', lower: null, upper: null })
  data.push({ month: 24, survival: twoYear, type: 'observed', lower: null, upper: null })
  
  // Predicted data (24-36 months) with confidence intervals
  for (let month = 27; month <= 36; month += 3) {
    const survival = Math.max(40, twoYear - (declineRate * (month - 24)))
    const confidenceRange = 8 + (month - 24) * 0.3
    
    data.push({
      month,
      survival: Math.round(survival * 10) / 10,
      type: 'predicted',
      lower: Math.max(30, Math.round((survival - confidenceRange) * 10) / 10),
      upper: Math.min(95, Math.round((survival + confidenceRange) * 10) / 10)
    })
  }
  
  return {
    data,
    rationale: 'Mathematical extrapolation based on observed temporal efficacy decline patterns. Linear projection of response rate degradation from 12-24 month period.',
    confidence: 'medium',
    method: 'mathematical'
  }
}
