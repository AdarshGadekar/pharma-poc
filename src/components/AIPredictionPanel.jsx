import { useState, useEffect } from 'react'
import { Sparkles, TrendingUp, AlertCircle, CheckCircle, Clock, Brain } from 'lucide-react'
import { generatePatientOutcomePrediction, isAIEnabled } from '../services/aiForecasting'

const AIPredictionPanel = ({ patientData }) => {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadPrediction()
  }, [patientData.id])

  const loadPrediction = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await generatePatientOutcomePrediction(patientData)
      setPrediction(result)
    } catch (err) {
      setError('Unable to generate prediction')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Brain className="w-12 h-12 text-purple-600 animate-pulse mx-auto mb-4" />
            <p className="text-slate-600 font-medium">AI analyzing patient data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !prediction) {
    return null
  }

  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case 'Excellent': return 'text-emerald-700 bg-emerald-50 border-emerald-200'
      case 'Good': return 'text-blue-700 bg-blue-50 border-blue-200'
      case 'Fair': return 'text-amber-700 bg-amber-50 border-amber-200'
      default: return 'text-slate-700 bg-slate-50 border-slate-200'
    }
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-emerald-700 bg-emerald-50 border-emerald-200'
      case 'Moderate': return 'text-amber-700 bg-amber-50 border-amber-200'
      case 'High': return 'text-red-700 bg-red-50 border-red-200'
      default: return 'text-slate-700 bg-slate-50 border-slate-200'
    }
  }

  return (
    <div className="card bg-slate-50 border-slate-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-slate-700 p-2.5 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">AI-Generated Outcome Hypothesis</h3>
            <p className="text-sm text-slate-600">
              ML model trained on publicly available clinical trial data
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-slate-200 text-slate-700 border border-slate-300">
            <Brain className="w-3 h-3 mr-1" />
            AI Analysis
          </span>
          <span className="badge badge-info">
            {prediction.confidenceScore}% Confidence
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Predicted Outcome</span>
            <TrendingUp className="w-5 h-5 text-slate-600" />
          </div>
          <div className={`text-2xl font-bold mb-2 px-4 py-2 rounded-lg border inline-block ${getOutcomeColor(prediction.predictedOutcome)}`}>
            {prediction.predictedOutcome}
          </div>
          <p className="text-xs text-slate-500 mt-2">Based on current trajectory</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Risk Assessment</span>
            <AlertCircle className="w-5 h-5 text-slate-600" />
          </div>
          <div className={`text-2xl font-bold mb-2 px-4 py-2 rounded-lg border inline-block ${getRiskColor(prediction.riskAssessment)}`}>
            {prediction.riskAssessment}
          </div>
          <p className="text-xs text-slate-500 mt-2">Progression risk level</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Time to Remission</span>
            <Clock className="w-5 h-5 text-slate-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-2">
            {prediction.estimatedTimeToRemission}
          </div>
          <p className="text-xs text-slate-500 mt-2">Estimated timeline</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-slate-600" />
            Key Predictive Factors
          </h4>
          <ul className="space-y-3">
            {prediction.keyFactors.map((factor, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="bg-slate-200 rounded-full p-1 mt-0.5">
                  <div className="w-2 h-2 bg-slate-600 rounded-full" />
                </div>
                <span className="text-sm text-slate-700 leading-relaxed">{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide flex items-center">
            <Brain className="w-4 h-4 mr-2 text-slate-600" />
            AI Recommendations
          </h4>
          <ul className="space-y-3">
            {prediction.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="bg-slate-200 rounded-full p-1 mt-0.5">
                  <div className="w-2 h-2 bg-slate-600 rounded-full" />
                </div>
                <span className="text-sm text-slate-700 leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="bg-white border border-slate-300 rounded-xl p-5">
          <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide flex items-center">
            <Brain className="w-4 h-4 mr-2 text-slate-600" />
            Methodology & Data Sources
          </h4>
          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <p>
              <strong>Model Training:</strong> Machine learning model trained on longitudinal patient outcome data from publicly available clinical trial databases and real-world evidence studies.
            </p>
            <p>
              <strong>Data Sources:</strong>
            </p>
            <ul className="ml-4 space-y-1">
              <li>• ClinicalTrials.gov - Phase II/III oncology trial results</li>
              <li>• PubMed Central - Peer-reviewed clinical studies</li>
              <li>• FDA Adverse Event Reporting System (FAERS)</li>
              <li>• National Cancer Institute SEER Database</li>
            </ul>
            <p>
              <strong>Analysis Approach:</strong> Survival modeling and longitudinal outcome extrapolation based on {patientData.timeline?.length || 0} months of observed patient data, including tumor response kinetics, biomarker trajectories, and adverse event patterns.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4">
          <p className="text-xs text-amber-900 leading-relaxed">
            <strong>Scientific Intelligence Layer:</strong> This hypothesis is generated to support Medical Affairs teams in exploring potential clinical outcomes beyond the observed study timeframe. 
            It is intended for hypothesis generation and scientific reasoning, not as definitive clinical conclusions. 
            Always validate insights with clinical expertise and additional evidence. Confidence: {prediction.confidenceScore}%
          </p>
        </div>
      </div>
    </div>
  )
}

export default AIPredictionPanel
