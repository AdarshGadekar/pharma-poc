import { useState, useEffect } from 'react'
import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'
import { TrendingUp, Brain, Loader } from 'lucide-react'
import { generateSurvivalPrediction } from '../services/survivalPredictionService'

const SurvivalCurveChart = ({ drugData }) => {
  const [predictionData, setPredictionData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPrediction = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await generateSurvivalPrediction(drugData)
        setPredictionData(result)
      } catch (err) {
        console.error('Survival prediction error:', err)
        setError('Failed to generate prediction')
      } finally {
        setLoading(false)
      }
    }

    if (drugData) {
      loadPrediction()
    }
  }, [drugData?.drugName])

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-600 font-medium">Generating survival predictions...</p>
            <p className="text-sm text-slate-500 mt-2">Analyzing temporal efficacy patterns with forecasting models</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !predictionData) {
    return (
      <div className="card bg-red-50 border-red-300">
        <p className="text-red-900">Failed to generate survival prediction</p>
      </div>
    )
  }

  const data = predictionData.data
  const observedData = data.filter(d => d.type === 'observed' || d.type === 'both')
  const predictedData = data.filter(d => d.type === 'predicted' || d.type === 'both')
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white border border-slate-300 rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-slate-900 mb-1">Month {data.month}</p>
          <p className="text-sm text-slate-700 mb-1">
            {data.type === 'observed' ? '📊 Observed' : data.type === 'both' ? '📊 Observed / 🤖 Predicted' : '🤖 AI Predicted'}: <span className="font-semibold">{data.survival}%</span>
          </p>
          {(data.type === 'predicted' || data.type === 'both') && data.lower && data.upper && (
            <p className="text-xs text-slate-600 mt-1">
              95% Confidence Interval: {data.lower}% - {data.upper}%
            </p>
          )}
        </div>
      )
    }
    return null
  }
  
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2.5 rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Survival Curve - Observed vs AI-Predicted</h3>
            <p className="text-sm text-slate-600">
              AI-powered temporal efficacy modeling extending beyond observed study period
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-300">
            <Brain className="w-3 h-3 mr-1" />
            AI Forecasting Model
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold ${
            predictionData.confidence === 'high' ? 'bg-green-100 text-green-800' :
            predictionData.confidence === 'medium' ? 'bg-amber-100 text-amber-800' :
            'bg-red-100 text-red-800'
          }`}>
            {predictionData.confidence.toUpperCase()} Confidence
          </span>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-xs text-blue-900 leading-relaxed mb-2">
          <strong>Interpretation:</strong> Solid green line represents observed clinical data through 24 months from the observational study. 
          Dashed red line shows AI-projected outcomes through 36 months with widening confidence intervals (shaded area) reflecting increasing uncertainty in longer-term predictions. 
          This visualization directly addresses: <em>"Based on what we see at one year, what might outcomes look like at two to three years?"</em>
        </p>
        {predictionData.rationale && (
          <div className="mt-2 pt-2 border-t border-blue-300">
            <p className="text-xs text-blue-900 leading-relaxed">
              <strong>Model Rationale:</strong> {predictionData.rationale}
            </p>
          </div>
        )}
      </div>
      
      <ResponsiveContainer width="100%" height={450}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="month" 
            label={{ value: 'Months from Treatment Start', position: 'insideBottom', offset: -10, style: { fontSize: 12, fontWeight: 600 } }}
            stroke="#64748b"
            tick={{ fontSize: 11 }}
          />
          <YAxis 
            label={{ value: 'Survival / Response Rate (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12, fontWeight: 600 } }}
            domain={[0, 100]}
            stroke="#64748b"
            tick={{ fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={40}
            iconType="line"
            wrapperStyle={{ fontSize: 12, paddingBottom: 10 }}
          />
          
          {/* Reference line at month 24 to mark transition */}
          <ReferenceLine 
            x={24} 
            stroke="#94a3b8" 
            strokeDasharray="3 3"
            label={{ value: 'Observed Data Ends', position: 'top', fill: '#64748b', fontSize: 10 }}
          />
          
          {/* Confidence interval area for predicted data */}
          <Area
            data={predictedData}
            type="monotone"
            dataKey="upper"
            stroke="none"
            fill="#fecaca"
            fillOpacity={0.25}
            name="95% Confidence Interval"
          />
          <Area
            data={predictedData}
            type="monotone"
            dataKey="lower"
            stroke="none"
            fill="#fecaca"
            fillOpacity={0.25}
          />
          
          {/* Observed data - solid green line */}
          <Line 
            data={observedData}
            type="monotone" 
            dataKey="survival" 
            stroke="#10b981" 
            strokeWidth={3}
            name="Observed Data (Study)"
            dot={{ fill: '#10b981', r: 5, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7 }}
          />
          
          {/* Predicted data - dashed red line */}
          <Line 
            data={predictedData}
            type="monotone" 
            dataKey="survival" 
            stroke="#ef4444" 
            strokeWidth={3}
            strokeDasharray="8 4"
            name="AI Prediction"
            dot={{ fill: '#ef4444', r: 5, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-green-900 mb-1">Observed Period</p>
          <p className="text-xs text-green-800 leading-relaxed">
            Months 0-24: Clinical data from observational study showing actual patient outcomes
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-red-900 mb-1">Predicted Period</p>
          <p className="text-xs text-red-800 leading-relaxed">
            Months 24-36: AI-projected outcomes based on temporal efficacy patterns and survival modeling
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-slate-900 mb-1">Confidence Intervals</p>
          <p className="text-xs text-slate-700 leading-relaxed">
            Shaded area represents 95% confidence range, widening over time to reflect prediction uncertainty
          </p>
        </div>
      </div>
      
      <div className="mt-4 bg-amber-50 border border-amber-300 rounded-xl p-4">
        <p className="text-xs text-amber-900 leading-relaxed">
          <strong>Scientific Intelligence Layer:</strong> This survival curve uses advanced AI forecasting models combined with probabilistic survival modeling to project outcomes beyond the observed study period. 
          The AI analyzes observed efficacy patterns, known pharmacology, disease progression dynamics, and treatment resistance development to generate scientifically grounded predictions.
          {' '}Projections are intended for hypothesis generation and strategic planning, not as definitive clinical endpoints. 
          Validation with ongoing clinical trial data and real-world evidence is essential.
        </p>
      </div>
    </div>
  )
}

export default SurvivalCurveChart
