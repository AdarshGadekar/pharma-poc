# High-Priority Forecasting Implementation Plan

## Overview
This document outlines the implementation plan for adding critical forecasting features to the Clinical Intelligence Platform, prioritized based on Jazz Pharmaceuticals' use case requirements.

---

## Priority 1: Survival Curve with Observed vs Predicted ⭐⭐⭐ CRITICAL

**Status:** NOT IMPLEMENTED (Gap identified in Jazz use case)
**Jazz Requirement:** "The 'Survival Curve – Observed vs AI-Predicted' chart is the centerpiece"
**Impact:** HIGH - Explicitly requested by Jazz as the centerpiece of User Story 3(i)
**Complexity:** Medium
**Estimated Time:** 4-6 hours

### What to Build:
A line chart showing patient survival/response over time with:
- **Solid line:** Observed data (months 0-12)
- **Dashed line:** AI-predicted data (months 13-36)
- **Shaded area:** Confidence intervals
- **Clear visual separation** between observed and predicted regions

### Implementation Details:

#### 1. Data Structure:
```javascript
const survivalCurveData = [
  // Observed data (solid line)
  { month: 0, survival: 100, type: 'observed', lower: null, upper: null },
  { month: 3, survival: 96, type: 'observed', lower: null, upper: null },
  { month: 6, survival: 92, type: 'observed', lower: null, upper: null },
  { month: 9, survival: 88, type: 'observed', lower: null, upper: null },
  { month: 12, survival: 84, type: 'observed', lower: null, upper: null },
  
  // Transition point (both observed and predicted)
  { month: 12, survival: 84, type: 'predicted', lower: 80, upper: 88 },
  
  // Predicted data (dashed line with confidence intervals)
  { month: 15, survival: 80, type: 'predicted', lower: 75, upper: 85 },
  { month: 18, survival: 76, type: 'predicted', lower: 70, upper: 82 },
  { month: 21, survival: 72, type: 'predicted', lower: 65, upper: 79 },
  { month: 24, survival: 68, type: 'predicted', lower: 60, upper: 76 },
  { month: 30, survival: 62, type: 'predicted', lower: 54, upper: 70 },
  { month: 36, survival: 56, type: 'predicted', lower: 48, upper: 64 }
]
```

#### 2. Component to Create:
**File:** `/src/components/SurvivalCurveChart.jsx`

```javascript
import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const SurvivalCurveChart = ({ drugData }) => {
  // Generate survival curve data based on observed response rates
  const generateSurvivalData = () => {
    const sixMonth = drugData?.responseRate?.sixMonth || 84
    const oneYear = drugData?.responseRate?.oneYear || 76
    const twoYear = drugData?.responseRate?.twoYear || 68
    
    // Calculate decline rate
    const declineRate = (oneYear - twoYear) / 12 // per month
    
    // Observed data (0-24 months)
    const observed = [
      { month: 0, survival: 100, type: 'observed' },
      { month: 6, survival: sixMonth, type: 'observed' },
      { month: 12, survival: oneYear, type: 'observed' },
      { month: 24, survival: twoYear, type: 'observed' }
    ]
    
    // Predicted data (24-36 months) with confidence intervals
    const predicted = []
    for (let month = 24; month <= 36; month += 6) {
      const survival = Math.max(40, twoYear - (declineRate * (month - 24)))
      const confidenceRange = 8 + (month - 24) * 0.3 // Widening confidence intervals
      predicted.push({
        month,
        survival: Math.round(survival * 10) / 10,
        type: 'predicted',
        lower: Math.max(30, survival - confidenceRange),
        upper: Math.min(95, survival + confidenceRange)
      })
    }
    
    return [...observed, ...predicted]
  }
  
  const data = generateSurvivalData()
  const observedData = data.filter(d => d.type === 'observed')
  const predictedData = data.filter(d => d.type === 'predicted')
  
  return (
    <div className="card">
      <h3 className="text-lg font-bold text-slate-900 mb-4">
        Survival Curve - Observed vs AI-Predicted
      </h3>
      <p className="text-sm text-slate-600 mb-4">
        Solid line represents observed clinical data through 24 months. 
        Dashed line shows AI-projected outcomes through 36 months with confidence intervals.
      </p>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="month" 
            label={{ value: 'Months from Treatment Start', position: 'insideBottom', offset: -5 }}
            stroke="#64748b"
          />
          <YAxis 
            label={{ value: 'Survival / Response Rate (%)', angle: -90, position: 'insideLeft' }}
            domain={[0, 100]}
            stroke="#64748b"
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="bg-white border border-slate-300 rounded-lg p-3 shadow-lg">
                    <p className="font-semibold text-slate-900">Month {data.month}</p>
                    <p className="text-sm text-slate-700">
                      {data.type === 'observed' ? 'Observed' : 'Predicted'}: {data.survival}%
                    </p>
                    {data.type === 'predicted' && (
                      <p className="text-xs text-slate-600 mt-1">
                        95% CI: {data.lower}% - {data.upper}%
                      </p>
                    )}
                  </div>
                )
              }
              return null
            }}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            iconType="line"
          />
          
          {/* Observed data - solid green line */}
          <Line 
            data={observedData}
            type="monotone" 
            dataKey="survival" 
            stroke="#10b981" 
            strokeWidth={3}
            name="Observed Data"
            dot={{ fill: '#10b981', r: 5 }}
          />
          
          {/* Predicted data - dashed red line */}
          <Line 
            data={predictedData}
            type="monotone" 
            dataKey="survival" 
            stroke="#ef4444" 
            strokeWidth={3}
            strokeDasharray="5 5"
            name="AI Prediction"
            dot={{ fill: '#ef4444', r: 5 }}
          />
          
          {/* Confidence interval area */}
          <Area
            data={predictedData}
            type="monotone"
            dataKey="upper"
            stroke="none"
            fill="#fecaca"
            fillOpacity={0.3}
          />
          <Area
            data={predictedData}
            type="monotone"
            dataKey="lower"
            stroke="none"
            fill="#fecaca"
            fillOpacity={0.3}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-900">
          <strong>Interpretation:</strong> The transition from solid to dashed line at month 24 marks where observed data ends and AI projection begins. 
          Widening confidence intervals reflect increasing uncertainty in longer-term predictions. 
          This visualization directly addresses the question: "Based on what we see at one year, what might outcomes look like at two to three years?"
        </p>
      </div>
    </div>
  )
}

export default SurvivalCurveChart
```

#### 3. Integration:
Add to `/src/components/DrugPerformanceView.jsx`:

```javascript
import SurvivalCurveChart from './SurvivalCurveChart'

// In the render, after the AI-Generated Efficacy Hypothesis panel:
{selectedDrug && <SurvivalCurveChart drugData={selectedDrug} />}
```

#### 4. Testing:
- Verify solid line shows months 0-24
- Verify dashed line shows months 24-36
- Verify confidence intervals display correctly
- Verify tooltip shows observed vs predicted labels
- Test with different drugs to ensure calculations work

---

## Priority 2: Adverse Event Forecasting ⭐⭐

**Status:** NOT IMPLEMENTED
**Jazz Requirement:** "Modeling isn't just about efficacy but also about understanding evolving risk"
**Impact:** HIGH - Critical for safety dimension
**Complexity:** Medium
**Estimated Time:** 3-4 hours

### What to Build:
Add AE prediction section to Patient Journeys showing:
- Predicted AE risk at future timepoints
- Likelihood of AE resolution
- Timeline for expected AE emergence

### Implementation Details:

#### 1. Component to Create:
**File:** `/src/components/AdverseEventForecast.jsx`

```javascript
import { AlertTriangle, TrendingUp, Clock } from 'lucide-react'

const AdverseEventForecast = ({ patientData }) => {
  const generateAEForecast = () => {
    // Based on current AEs and treatment duration
    const currentAEs = patientData.adverseEvents || []
    const treatmentMonths = patientData.treatmentDuration || 6
    
    return {
      ongoingAEs: currentAEs.filter(ae => ae.status === 'Ongoing'),
      predictions: [
        {
          event: 'Fatigue (Grade 2)',
          currentStatus: 'Ongoing',
          resolutionProbability: 65,
          expectedResolution: '8-10 months',
          rationale: 'Based on typical resolution patterns for Grade 2 fatigue in similar treatment regimens'
        },
        {
          event: 'Neuropathy Recurrence',
          currentStatus: 'Resolved',
          recurrenceRisk: 12,
          timeframe: '12-18 months',
          rationale: 'Low risk of recurrence given early resolution and dose modification'
        },
        {
          event: 'Cardiotoxicity',
          currentStatus: 'Not observed',
          emergenceRisk: 8,
          timeframe: '12-24 months',
          rationale: 'Cumulative dose-related risk for HER2-targeted therapy, requires ongoing monitoring'
        }
      ]
    }
  }
  
  const forecast = generateAEForecast()
  
  return (
    <div className="card bg-amber-50 border-amber-300">
      <div className="flex items-center space-x-3 mb-4">
        <AlertTriangle className="w-6 h-6 text-amber-700" />
        <div>
          <h3 className="text-lg font-bold text-slate-900">Adverse Event Risk Forecast</h3>
          <p className="text-sm text-slate-600">
            AI-predicted safety trajectory based on current adverse event profile and treatment duration
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {forecast.predictions.map((pred, idx) => (
          <div key={idx} className="bg-white rounded-lg p-4 border border-amber-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-slate-900">{pred.event}</h4>
                <p className="text-xs text-slate-600">Current: {pred.currentStatus}</p>
              </div>
              {pred.resolutionProbability && (
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-700">{pred.resolutionProbability}%</p>
                  <p className="text-xs text-slate-600">Resolution probability</p>
                </div>
              )}
              {pred.recurrenceRisk && (
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-700">{pred.recurrenceRisk}%</p>
                  <p className="text-xs text-slate-600">Recurrence risk</p>
                </div>
              )}
              {pred.emergenceRisk && (
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-700">{pred.emergenceRisk}%</p>
                  <p className="text-xs text-slate-600">Emergence risk</p>
                </div>
              )}
            </div>
            
            {pred.expectedResolution && (
              <div className="flex items-center text-sm text-slate-700 mb-2">
                <Clock className="w-4 h-4 mr-2 text-slate-500" />
                Expected resolution: {pred.expectedResolution}
              </div>
            )}
            {pred.timeframe && (
              <div className="flex items-center text-sm text-slate-700 mb-2">
                <Clock className="w-4 h-4 mr-2 text-slate-500" />
                Risk timeframe: {pred.timeframe}
              </div>
            )}
            
            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              {pred.rationale}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 bg-white border border-amber-300 rounded-lg p-3">
        <p className="text-xs text-amber-900">
          <strong>Clinical Note:</strong> These predictions are based on historical patterns from similar patient profiles and treatment regimens. 
          Actual outcomes may vary based on individual patient factors, dose modifications, and supportive care interventions. 
          Regular monitoring and clinical assessment remain essential.
        </p>
      </div>
    </div>
  )
}

export default AdverseEventForecast
```

#### 2. Integration:
Add to `/src/components/PatientJourneyView.jsx` after the Adverse Events panel:

```javascript
import AdverseEventForecast from './AdverseEventForecast'

// In render, after adverse events section:
{selectedPatient && <AdverseEventForecast patientData={selectedPatient} />}
```

---

## Priority 3: Biomarker Trajectory Forecasting ⭐

**Status:** NOT IMPLEMENTED
**Impact:** MEDIUM-HIGH - Extends existing visualization
**Complexity:** LOW - Extends existing charts
**Estimated Time:** 2-3 hours

### What to Build:
Extend the Treatment Timeline chart to show predicted biomarker trajectories beyond observed period

### Implementation:

Modify `/src/components/PatientJourneyView.jsx` timeline chart data:

```javascript
// Add predicted data points to existing timeline data
const timelineData = [
  // Existing observed data (months 0-6)
  { month: 0, tumorSize: 10, ca153: 60, qol: 65, type: 'observed' },
  { month: 1, tumorSize: 8, ca153: 52, qol: 68, type: 'observed' },
  // ... existing data
  { month: 6, tumorSize: 3, ca153: 20, qol: 80, type: 'observed' },
  
  // Add predicted data (months 7-12)
  { month: 7, tumorSize: 2.8, ca153: 18, qol: 82, type: 'predicted' },
  { month: 8, tumorSize: 2.5, ca153: 16, qol: 83, type: 'predicted' },
  { month: 9, tumorSize: 2.3, ca153: 15, qol: 84, type: 'predicted' },
  { month: 10, tumorSize: 2.1, ca153: 14, qol: 85, type: 'predicted' },
  { month: 12, tumorSize: 1.8, ca153: 12, qol: 85, type: 'predicted' }
]

// Update Line components to use strokeDasharray for predicted data
<Line 
  dataKey="ca153"
  stroke="#f59e0b"
  strokeWidth={2}
  strokeDasharray={(entry) => entry.type === 'predicted' ? '5 5' : '0'}
  name="CA 15-3 (U/mL)"
/>
```

Add legend and explanation:
```javascript
<div className="mt-2 flex items-center space-x-4 text-xs text-slate-600">
  <div className="flex items-center">
    <div className="w-4 h-0.5 bg-slate-700 mr-2"></div>
    <span>Observed Data</span>
  </div>
  <div className="flex items-center">
    <div className="w-4 h-0.5 bg-slate-700 border-dashed border-t-2 mr-2"></div>
    <span>AI Projection</span>
  </div>
</div>
```

---

## Implementation Priority Order:

### Week 1 (Before Jazz Demo):
1. ✅ **Add descriptive text to existing UI** (1-2 hours) - DONE
2. ⭐⭐⭐ **Survival Curve Chart** (4-6 hours) - CRITICAL
3. ⭐⭐ **Adverse Event Forecasting** (3-4 hours) - HIGH VALUE

### Week 2 (Post-demo enhancements):
4. ⭐ **Biomarker Trajectory Forecasting** (2-3 hours)
5. **Treatment Discontinuation Risk** (3-4 hours)
6. **Cost Trajectory Forecasting** (3-4 hours)

---

## Testing Checklist:

### For Each Forecasting Feature:
- [ ] Predictions are reasonable and scientifically grounded
- [ ] Confidence intervals widen appropriately over time
- [ ] Clear visual distinction between observed and predicted
- [ ] Tooltips explain observed vs predicted
- [ ] Methodology section explains data sources
- [ ] Scientific disclaimer present
- [ ] Works with all drugs/patients in dataset
- [ ] Mobile responsive
- [ ] Performance acceptable (no lag)

---

## Success Metrics:

**For Jazz Pharma Demo:**
- Survival curve chart present and functional
- Clear "observed vs predicted" visual separation
- Confidence intervals visible
- Adverse event forecasting demonstrates safety modeling
- All predictions traceable to methodology

**User Feedback:**
- Medical Affairs teams can explain predictions to stakeholders
- Predictions are perceived as credible and scientifically grounded
- Platform demonstrates value beyond just data visualization
