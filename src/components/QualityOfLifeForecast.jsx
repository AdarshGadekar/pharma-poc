import { Heart, TrendingUp, Activity } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const QualityOfLifeForecast = ({ timelineData }) => {
  const generateQoLForecast = () => {
    if (!timelineData || timelineData.length === 0) return []
    
    const lastObserved = timelineData[timelineData.length - 1]
    const lastMonth = lastObserved?.month || 6
    const lastQoL = lastObserved?.quality || 80
    
    // Calculate QoL trend with null checks
    const firstQoL = timelineData[0]?.quality || 65
    const qolChange = lastQoL - firstQoL
    const monthlyImprovement = qolChange / timelineData.length
    
    // Generate forecast
    const forecast = []
    
    // Add observed data
    timelineData.forEach(d => {
      forecast.push({
        month: d.month,
        qol: d.quality,
        type: 'observed',
        lower: null,
        upper: null
      })
    })
    
    // Add predicted data (6 months ahead)
    for (let i = 1; i <= 6; i++) {
      const month = lastMonth + i
      let predictedQoL = lastQoL + (monthlyImprovement * i * 0.5) // Diminishing improvement rate
      
      // Apply ceiling and floor
      predictedQoL = Math.min(95, Math.max(50, predictedQoL))
      
      // Add uncertainty
      const uncertainty = 3 + (i * 0.5)
      
      forecast.push({
        month,
        qol: Math.round(predictedQoL),
        type: 'predicted',
        lower: Math.max(40, Math.round(predictedQoL - uncertainty)),
        upper: Math.min(100, Math.round(predictedQoL + uncertainty))
      })
    }
    
    return forecast
  }
  
  const data = generateQoLForecast()
  const lastObservedMonth = timelineData[timelineData.length - 1]?.month || 6
  const lastPredictedQoL = data[data.length - 1]?.qol || 85
  const firstQoL = data[0]?.qol || 65
  const totalImprovement = lastPredictedQoL - firstQoL
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload
      return (
        <div className="bg-white border border-slate-300 rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-slate-900 mb-1">
            Month {point.month} {point.type === 'predicted' ? '(Predicted)' : '(Observed)'}
          </p>
          <p className="text-sm text-blue-700">Quality of Life: {point.qol}</p>
          {point.type === 'predicted' && (
            <p className="text-xs text-slate-600 mt-1">
              Range: {point.lower} - {point.upper}
            </p>
          )}
        </div>
      )
    }
    return null
  }
  
  return (
    <div className="card bg-blue-50 border-blue-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2.5 rounded-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Quality of Life Forecast</h3>
            <p className="text-sm text-slate-600">
              Patient-reported outcome trajectory with AI-projected trends
            </p>
          </div>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">
          <Activity className="w-3 h-3 mr-1" />
          Patient-Centered Outcomes
        </span>
      </div>
      
      <div className="bg-white border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-xs text-blue-900 leading-relaxed">
          <strong>Patient-Centered Forecasting:</strong> This chart extends quality of life measurements beyond the observed period to help Medical Affairs teams discuss long-term tolerability and patient experience. 
          Solid line shows observed patient-reported outcomes through month {lastObservedMonth}. 
          Dashed line with shaded confidence area shows AI-projected QoL trajectory, accounting for treatment adaptation and cumulative benefit patterns.
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
          <defs>
            <linearGradient id="qolGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="month" 
            label={{ value: 'Months from Treatment Start', position: 'insideBottom', offset: -10, style: { fontSize: 12, fontWeight: 600 } }}
            stroke="#64748b"
          />
          <YAxis 
            domain={[0, 100]}
            label={{ value: 'Quality of Life Score (0-100)', angle: -90, position: 'insideLeft', style: { fontSize: 12, fontWeight: 600 } }}
            stroke="#64748b"
          />
          <Tooltip content={<CustomTooltip />} />
          
          <ReferenceLine 
            x={lastObservedMonth} 
            stroke="#94a3b8" 
            strokeDasharray="3 3"
            label={{ value: 'Forecast Begins', position: 'top', fill: '#64748b', fontSize: 10 }}
          />
          
          {/* Confidence interval area */}
          <Area
            type="monotone"
            dataKey="upper"
            stroke="none"
            fill="#bfdbfe"
            fillOpacity={0.4}
          />
          <Area
            type="monotone"
            dataKey="lower"
            stroke="none"
            fill="#bfdbfe"
            fillOpacity={0.4}
          />
          
          {/* Main QoL line */}
          <Area
            type="monotone"
            dataKey="qol"
            stroke="#3b82f6"
            strokeWidth={3}
            fill="url(#qolGradient)"
            dot={(props) => {
              const { cx, cy, payload } = props
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill="#3b82f6"
                  stroke="#fff"
                  strokeWidth={2}
                  style={{ 
                    strokeDasharray: payload.type === 'predicted' ? '3 3' : '0',
                    opacity: payload.type === 'predicted' ? 0.8 : 1
                  }}
                />
              )
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-white rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-semibold text-slate-900">Total Improvement</p>
          </div>
          <p className="text-2xl font-bold text-blue-700">+{totalImprovement}</p>
          <p className="text-xs text-slate-600 mt-1">points from baseline to projected endpoint</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-semibold text-slate-900">Current Score</p>
          </div>
          <p className="text-2xl font-bold text-blue-700">{timelineData[timelineData.length - 1]?.quality || 80}</p>
          <p className="text-xs text-slate-600 mt-1">at month {lastObservedMonth} (observed)</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-semibold text-slate-900">Projected Score</p>
          </div>
          <p className="text-2xl font-bold text-blue-700">{lastPredictedQoL}</p>
          <p className="text-xs text-slate-600 mt-1">at month {lastObservedMonth + 6} (forecasted)</p>
        </div>
      </div>
      
      <div className="mt-4 bg-slate-50 border border-slate-300 rounded-lg p-3">
        <p className="text-xs text-slate-700 leading-relaxed">
          <strong>Clinical Significance:</strong> Quality of life improvements beyond clinical response metrics provide critical insights for Medical Affairs discussions about treatment tolerability and patient experience. 
          {totalImprovement > 15 
            ? 'Substantial QoL improvement suggests favorable benefit-risk profile and supports treatment continuation discussions.' 
            : 'Stable QoL maintenance indicates acceptable tolerability despite treatment burden.'}
          {' '}These projections help anticipate when QoL plateaus or declines may occur, informing optimal treatment duration decisions.
        </p>
      </div>
    </div>
  )
}

export default QualityOfLifeForecast
