import { useState, useEffect } from 'react'
import { Microscope, Brain, Sparkles, TrendingUp, DollarSign, AlertCircle } from 'lucide-react'
import { generateBiomarkerInsight, isAIEnabled } from '../services/aiForecasting'

const BiomarkerAIPanel = ({ biomarkerData }) => {
  const [insight, setInsight] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadInsight()
  }, [biomarkerData.biomarker])

  const loadInsight = async () => {
    setLoading(true)
    try {
      const result = await generateBiomarkerInsight(biomarkerData)
      setInsight(result)
    } catch (err) {
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
            <Brain className="w-12 h-12 text-slate-600 animate-pulse mx-auto mb-4" />
            <p className="text-slate-600 font-medium">Analyzing biomarker data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!insight) return null

  const getSignificanceColor = (sig) => {
    switch (sig) {
      case 'High': return 'text-slate-900 bg-slate-100 border-slate-300'
      case 'Moderate': return 'text-slate-700 bg-slate-50 border-slate-200'
      default: return 'text-slate-600 bg-slate-50 border-slate-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'text-slate-900 bg-slate-100 border-slate-300'
      case 'Important': return 'text-slate-700 bg-slate-50 border-slate-200'
      default: return 'text-slate-600 bg-slate-50 border-slate-200'
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
            <h3 className="text-xl font-bold text-slate-900">AI-Generated Biomarker Hypothesis</h3>
            <p className="text-sm text-slate-600">
              ML model trained on publicly available biomarker validation studies
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-slate-200 text-slate-700 border border-slate-300">
            <Brain className="w-3 h-3 mr-1" />
            AI Insight
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Clinical Significance</span>
            <Microscope className="w-5 h-5 text-slate-600" />
          </div>
          <div className={`text-2xl font-bold mb-2 px-4 py-2 rounded-lg border inline-block ${getSignificanceColor(insight.clinicalSignificance)}`}>
            {insight.clinicalSignificance}
          </div>
          <p className="text-xs text-slate-500 mt-2">Impact assessment</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Predictive Accuracy</span>
            <TrendingUp className="w-5 h-5 text-slate-600" />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-2">
            {insight.predictiveAccuracy}%
          </div>
          <p className="text-xs text-slate-500 mt-2">Outcome prediction</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Research Priority</span>
            <AlertCircle className="w-5 h-5 text-slate-600" />
          </div>
          <div className={`text-2xl font-bold mb-2 px-4 py-2 rounded-lg border inline-block ${getPriorityColor(insight.researchPriority)}`}>
            {insight.researchPriority}
          </div>
          <p className="text-xs text-slate-500 mt-2">Development focus</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Cost-Benefit</span>
            <DollarSign className="w-5 h-5 text-slate-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-2">
            {insight.costBenefitRatio}
          </div>
          <p className="text-xs text-slate-500 mt-2">Value proposition</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide flex items-center">
            <Brain className="w-4 h-4 mr-2 text-slate-600" />
            Future Applications
          </h4>
          <ul className="space-y-3">
            {insight.futureApplications.map((app, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="bg-slate-200 rounded-full p-1 mt-0.5">
                  <div className="w-2 h-2 bg-slate-600 rounded-full" />
                </div>
                <span className="text-sm text-slate-700 leading-relaxed">{app}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-slate-600" />
            AI Recommendation
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed">
            {insight.aiRecommendation}
          </p>
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
              <strong>Model Training:</strong> Machine learning model trained on biomarker validation studies, clinical utility assessments, and outcome correlation data from publicly available research.
            </p>
            <p>
              <strong>Data Sources:</strong>
            </p>
            <ul className="ml-4 space-y-1">
              <li>• PubMed Central - Biomarker validation studies</li>
              <li>• ClinicalTrials.gov - Companion diagnostic trials</li>
              <li>• FDA Biomarker Qualification Program database</li>
              <li>• NIH Genetic Testing Registry (GTR)</li>
              <li>• TCGA (The Cancer Genome Atlas) - Genomic biomarker data</li>
            </ul>
            <p>
              <strong>Analysis Approach:</strong> Predictive modeling based on {biomarkerData.patientsScreened?.toLocaleString() || 'N/A'} patients screened, {biomarkerData.positiveRate}% positive rate, and {biomarkerData.outcomeImprovement}% outcome improvement. 
              Assessment includes clinical utility, cost-effectiveness, and future application potential.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4">
          <p className="text-xs text-amber-900 leading-relaxed">
            <strong>Scientific Intelligence Layer:</strong> This hypothesis supports Medical Affairs teams in evaluating biomarker clinical utility and identifying research priorities. 
            Insights are generated for hypothesis exploration and strategic planning, not as definitive validation. 
            Prospective clinical studies are required to confirm biomarker performance. This tool augments scientific reasoning, not replaces it.
          </p>
        </div>
      </div>
    </div>
  )
}

export default BiomarkerAIPanel
