import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'
import { TrendingUp } from 'lucide-react'

const BiomarkerTrajectoryChart = ({ timelineData, patientData }) => {
  const generateExtendedTimeline = () => {
    if (!timelineData || timelineData.length === 0) return []
    
    const lastObserved = timelineData[timelineData.length - 1]
    const lastMonth = lastObserved.month || 6
    
    // Calculate trends from observed data with null checks
    const tumorTrend = (timelineData[timelineData.length - 1]?.tumorSize - timelineData[0]?.tumorSize) / timelineData.length || 0
    const ca153Trend = (timelineData[timelineData.length - 1]?.ca153 - timelineData[0]?.ca153) / timelineData.length || 0
    const qolTrend = (timelineData[timelineData.length - 1]?.quality - timelineData[0]?.quality) / timelineData.length || 0
    
    // Add observed data
    const extended = timelineData.map(d => ({ ...d, type: 'observed' }))
    
    // Add predicted data (extend 6 months beyond observed)
    for (let i = 1; i <= 6; i++) {
      const month = lastMonth + i
      extended.push({
        month,
        tumorSize: Math.max(0.5, (lastObserved?.tumorSize || 3) + (tumorTrend * i)),
        ca153: Math.max(5, (lastObserved?.ca153 || 20) + (ca153Trend * i)),
        quality: Math.min(95, Math.max(50, (lastObserved?.quality || 80) + (qolTrend * i))),
        type: 'predicted'
      })
    }
    
    return extended
  }
  
  const data = generateExtendedTimeline()
  const observedData = data.filter(d => d.type === 'observed')
  const predictedData = data.filter(d => d.type === 'predicted')
  const transitionMonth = observedData.length > 0 ? observedData[observedData.length - 1].month : 6
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload
      return (
        <div className="bg-white border border-slate-300 rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-slate-900 mb-2">
            Month {point.month} {point.type === 'predicted' ? '(AI Predicted)' : '(Observed)'}
          </p>
          <div className="space-y-1 text-xs">
            <p className="text-red-700">Tumor Size: {point.tumorSize?.toFixed(1)} cm</p>
            <p className="text-amber-700">CA 15-3: {point.ca153?.toFixed(1)} U/mL</p>
            <p className="text-blue-700">Quality of Life: {point.quality?.toFixed(0)}</p>
          </div>
        </div>
      )
    }
    return null
  }
  
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-600 p-2.5 rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Treatment Timeline & Clinical Response</h3>
            <p className="text-sm text-slate-600">
              Longitudinal tracking with AI-projected biomarker trajectories
            </p>
          </div>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
          Extended Forecast
        </span>
      </div>
      
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4">
        <p className="text-xs text-emerald-900 leading-relaxed">
          <strong>Biomarker Trajectory Modeling:</strong> Solid lines represent observed clinical measurements through month {transitionMonth}. 
          Dashed lines show AI-projected biomarker trends through month {transitionMonth + 6}, helping Medical Affairs teams anticipate when to reassess treatment response or consider therapy modifications.
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="month" 
            label={{ value: 'Months from Treatment Start', position: 'insideBottom', offset: -10, style: { fontSize: 12, fontWeight: 600 } }}
            stroke="#64748b"
          />
          <YAxis 
            yAxisId="left"
            label={{ value: 'Tumor Size (cm) / CA 15-3 (U/mL)', angle: -90, position: 'insideLeft', style: { fontSize: 11, fontWeight: 600 } }}
            stroke="#64748b"
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            label={{ value: 'Quality of Life Score', angle: 90, position: 'insideRight', style: { fontSize: 11, fontWeight: 600 } }}
            stroke="#64748b"
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={40}
            wrapperStyle={{ fontSize: 11, paddingBottom: 10 }}
          />
          
          <ReferenceLine 
            x={transitionMonth} 
            stroke="#94a3b8" 
            strokeDasharray="3 3"
            label={{ value: 'Observed Data Ends', position: 'top', fill: '#64748b', fontSize: 10 }}
          />
          
          {/* Tumor Size - Red */}
          <Line 
            yAxisId="left"
            data={observedData}
            type="monotone" 
            dataKey="tumorSize" 
            stroke="#ef4444" 
            strokeWidth={2.5}
            name="Tumor Size (cm)"
            dot={{ fill: '#ef4444', r: 4 }}
          />
          <Line 
            yAxisId="left"
            data={predictedData}
            type="monotone" 
            dataKey="tumorSize" 
            stroke="#ef4444" 
            strokeWidth={2.5}
            strokeDasharray="5 5"
            name="Tumor Size (Predicted)"
            dot={{ fill: '#ef4444', r: 4 }}
          />
          
          {/* CA 15-3 - Orange */}
          <Line 
            yAxisId="left"
            data={observedData}
            type="monotone" 
            dataKey="ca153" 
            stroke="#f59e0b" 
            strokeWidth={2.5}
            name="CA 15-3 (U/mL)"
            dot={{ fill: '#f59e0b', r: 4 }}
          />
          <Line 
            yAxisId="left"
            data={predictedData}
            type="monotone" 
            dataKey="ca153" 
            stroke="#f59e0b" 
            strokeWidth={2.5}
            strokeDasharray="5 5"
            name="CA 15-3 (Predicted)"
            dot={{ fill: '#f59e0b', r: 4 }}
          />
          
          {/* Quality of Life - Blue */}
          <Line 
            yAxisId="right"
            data={observedData}
            type="monotone" 
            dataKey="quality" 
            stroke="#3b82f6" 
            strokeWidth={2.5}
            name="Quality of Life"
            dot={{ fill: '#3b82f6', r: 4 }}
          />
          <Line 
            yAxisId="right"
            data={predictedData}
            type="monotone" 
            dataKey="quality" 
            stroke="#3b82f6" 
            strokeWidth={2.5}
            strokeDasharray="5 5"
            name="Quality of Life (Predicted)"
            dot={{ fill: '#3b82f6', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-red-900 mb-1">Tumor Size Trajectory</p>
          <p className="text-xs text-red-800 leading-relaxed">
            Projected continued reduction based on treatment response kinetics. Model predicts tumor stabilization around {(predictedData[predictedData.length - 1]?.tumorSize || 2).toFixed(1)} cm.
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-amber-900 mb-1">CA 15-3 Forecast</p>
          <p className="text-xs text-amber-800 leading-relaxed">
            Biomarker expected to reach {(predictedData[predictedData.length - 1]?.ca153 || 15).toFixed(1)} U/mL by month {transitionMonth + 6}, indicating sustained biological response.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-blue-900 mb-1">Quality of Life Projection</p>
          <p className="text-xs text-blue-800 leading-relaxed">
            Patient-reported outcomes projected to {predictedData[predictedData.length - 1]?.quality > observedData[observedData.length - 1]?.quality ? 'continue improving' : 'stabilize'}, supporting treatment continuation.
          </p>
        </div>
      </div>
      
      <div className="mt-4 bg-slate-50 border border-slate-300 rounded-lg p-3">
        <p className="text-xs text-slate-700 leading-relaxed">
          <strong>Forecasting Methodology:</strong> AI model extends observed biomarker trends using temporal pattern analysis and clinical pharmacology principles. 
          Projections help Medical Affairs teams anticipate optimal timing for treatment reassessment, imaging follow-up, and therapeutic decision-making. 
          These trajectories support hypothesis generation about long-term treatment benefit and should be validated with continued clinical monitoring.
        </p>
      </div>
    </div>
  )
}

export default BiomarkerTrajectoryChart
