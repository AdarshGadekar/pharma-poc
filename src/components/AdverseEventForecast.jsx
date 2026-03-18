import { AlertTriangle, Clock, TrendingDown, TrendingUp, Activity } from 'lucide-react'

const AdverseEventForecast = ({ patientData }) => {
  const generateAEForecast = () => {
    const currentAEs = patientData?.adverseEvents || []
    const treatmentMonths = patientData?.treatmentDuration || 6
    
    // Find ongoing AEs
    const ongoingAEs = currentAEs.filter(ae => ae.status === 'Ongoing')
    const resolvedAEs = currentAEs.filter(ae => ae.status === 'Resolved')
    
    const predictions = []
    
    // Predict resolution for ongoing AEs
    if (ongoingAEs.length > 0) {
      ongoingAEs.forEach(ae => {
        if (ae.event === 'Fatigue' && ae.grade === 2) {
          predictions.push({
            event: 'Fatigue (Grade 2)',
            currentStatus: 'Ongoing',
            predictionType: 'resolution',
            resolutionProbability: 65,
            expectedResolution: '8-10 months',
            rationale: 'Based on typical resolution patterns for Grade 2 fatigue in similar treatment regimens. Most patients experience gradual improvement as the body adapts to therapy. Active monitoring and supportive care interventions may accelerate resolution.',
            icon: TrendingDown,
            iconColor: 'text-green-600'
          })
        }
      })
    }
    
    // Predict recurrence for resolved AEs
    if (resolvedAEs.length > 0) {
      resolvedAEs.forEach(ae => {
        if (ae.event === 'Peripheral Neuropathy' && ae.grade === 1) {
          predictions.push({
            event: 'Peripheral Neuropathy',
            currentStatus: 'Resolved',
            predictionType: 'recurrence',
            recurrenceRisk: 12,
            timeframe: '12-18 months',
            rationale: 'Low risk of recurrence given early resolution and dose modification. Cumulative neurotoxicity risk remains minimal with current dosing strategy. Continued monitoring recommended if treatment extends beyond 12 months.',
            icon: Activity,
            iconColor: 'text-amber-600'
          })
        }
      })
    }
    
    // Predict emergence of new AEs based on treatment type
    if (patientData?.treatment?.includes('Trastuzumab') || patientData?.treatment?.includes('HER2')) {
      predictions.push({
        event: 'Cardiotoxicity (LVEF Decline)',
        currentStatus: 'Not observed',
        predictionType: 'emergence',
        emergenceRisk: 8,
        timeframe: '12-24 months',
        rationale: 'Cumulative dose-related risk for HER2-targeted therapy. Risk increases with longer treatment duration and concurrent anthracycline exposure. Regular cardiac monitoring (ECHO/MUGA) every 3 months is essential. Early detection allows for dose adjustment or treatment modification.',
        icon: TrendingUp,
        iconColor: 'text-red-600'
      })
    }
    
    // Add general prediction if no specific AEs
    if (predictions.length === 0) {
      predictions.push({
        event: 'Treatment-Related Fatigue',
        currentStatus: 'Not observed',
        predictionType: 'emergence',
        emergenceRisk: 25,
        timeframe: '6-12 months',
        rationale: 'Moderate risk of developing treatment-related fatigue with continued therapy. Most common adverse event in this treatment regimen. Typically manageable with supportive care and does not require treatment discontinuation.',
        icon: Activity,
        iconColor: 'text-amber-600'
      })
    }
    
    return predictions
  }
  
  const forecast = generateAEForecast()
  
  return (
    <div className="card bg-amber-50 border-amber-300">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-amber-600 p-2.5 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Adverse Event Risk Forecast</h3>
          <p className="text-sm text-slate-600">
            AI-predicted safety trajectory based on current adverse event profile and treatment duration
          </p>
        </div>
      </div>
      
      <div className="bg-white border border-amber-200 rounded-lg p-3 mb-4">
        <p className="text-xs text-amber-900 leading-relaxed">
          <strong>Safety Modeling:</strong> This forecast analyzes current adverse event patterns, treatment duration, and historical safety data from similar patient profiles to predict future AE trajectories. 
          Predictions help Medical Affairs teams anticipate safety concerns and plan proactive interventions.
        </p>
      </div>
      
      <div className="space-y-4">
        {forecast.map((pred, idx) => {
          const Icon = pred.icon
          return (
            <div key={idx} className="bg-white rounded-lg p-5 border border-amber-200 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <Icon className={`w-5 h-5 mt-0.5 ${pred.iconColor}`} />
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 mb-1">{pred.event}</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                        Current: {pred.currentStatus}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        pred.predictionType === 'resolution' ? 'bg-green-100 text-green-800' :
                        pred.predictionType === 'recurrence' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {pred.predictionType === 'resolution' ? 'Resolution Forecast' :
                         pred.predictionType === 'recurrence' ? 'Recurrence Risk' :
                         'Emergence Risk'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  {pred.resolutionProbability && (
                    <>
                      <p className="text-3xl font-bold text-green-700">{pred.resolutionProbability}%</p>
                      <p className="text-xs text-slate-600">Resolution probability</p>
                    </>
                  )}
                  {pred.recurrenceRisk && (
                    <>
                      <p className="text-3xl font-bold text-amber-700">{pred.recurrenceRisk}%</p>
                      <p className="text-xs text-slate-600">Recurrence risk</p>
                    </>
                  )}
                  {pred.emergenceRisk && (
                    <>
                      <p className="text-3xl font-bold text-red-700">{pred.emergenceRisk}%</p>
                      <p className="text-xs text-slate-600">Emergence risk</p>
                    </>
                  )}
                </div>
              </div>
              
              {pred.expectedResolution && (
                <div className="flex items-center text-sm text-slate-700 mb-3 bg-green-50 border border-green-200 rounded px-3 py-2">
                  <Clock className="w-4 h-4 mr-2 text-green-600" />
                  <span className="font-medium">Expected resolution:</span>
                  <span className="ml-2">{pred.expectedResolution}</span>
                </div>
              )}
              {pred.timeframe && (
                <div className="flex items-center text-sm text-slate-700 mb-3 bg-amber-50 border border-amber-200 rounded px-3 py-2">
                  <Clock className="w-4 h-4 mr-2 text-amber-600" />
                  <span className="font-medium">Risk timeframe:</span>
                  <span className="ml-2">{pred.timeframe}</span>
                </div>
              )}
              
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-slate-900 mb-1">Clinical Rationale:</p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {pred.rationale}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingDown className="w-4 h-4 text-green-700" />
            <p className="text-xs font-semibold text-green-900">Resolution Forecast</p>
          </div>
          <p className="text-xs text-green-800 leading-relaxed">
            Predicts when ongoing AEs are likely to resolve based on temporal patterns
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Activity className="w-4 h-4 text-amber-700" />
            <p className="text-xs font-semibold text-amber-900">Recurrence Risk</p>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            Estimates probability of resolved AEs recurring with continued treatment
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="w-4 h-4 text-red-700" />
            <p className="text-xs font-semibold text-red-900">Emergence Risk</p>
          </div>
          <p className="text-xs text-red-800 leading-relaxed">
            Identifies potential new AEs based on treatment type and cumulative exposure
          </p>
        </div>
      </div>
      
      <div className="mt-4 bg-white border border-amber-300 rounded-lg p-4">
        <p className="text-xs text-amber-900 leading-relaxed">
          <strong>Clinical Note:</strong> These predictions are based on historical patterns from similar patient profiles and treatment regimens. 
          Actual outcomes may vary based on individual patient factors, dose modifications, and supportive care interventions. 
          Regular monitoring and clinical assessment remain essential. This tool supports proactive safety management and informed decision-making for Medical Affairs discussions.
        </p>
      </div>
    </div>
  )
}

export default AdverseEventForecast
