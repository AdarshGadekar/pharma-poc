import { Microscope, TrendingUp, DollarSign, Clock, Activity, Target } from 'lucide-react'
import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts'
import { biomarkerInsights, drugPerformanceData } from '../data/syntheticData'

const BiomarkerInsightsView = () => {
  const biomarkerComparison = biomarkerInsights.map(b => ({
    name: b.biomarker.split(' ')[0],
    predictive: b.predictiveValue === 'High' ? 90 : 70,
    utility: b.outcomeImprovement,
    cost: (500 - b.costPerTest) / 5,
    turnaround: b.turnaroundTime.includes('1') ? 95 : b.turnaroundTime.includes('2-3') ? 85 : 70
  }))

  const costEffectivenessData = biomarkerInsights.map(b => ({
    biomarker: b.biomarker,
    cost: b.costPerTest,
    improvement: b.outcomeImprovement,
    positiveRate: b.positiveRate
  }))

  const getTherapeuticColor = (area) => {
    switch (area) {
      case 'Oncology': return 'from-blue-500 to-indigo-600'
      case 'Neurology': return 'from-purple-500 to-pink-600'
      case 'Cardiology': return 'from-pink-500 to-rose-600'
      case 'Immunology': return 'from-amber-500 to-orange-600'
      default: return 'from-slate-500 to-slate-600'
    }
  }

  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <h2 className="text-3xl font-bold mb-2">Biomarker Intelligence</h2>
        <p className="text-purple-100 text-lg">
          Predictive biomarkers driving precision medicine and personalized treatment strategies
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {biomarkerInsights.map((biomarker, index) => (
          <div key={biomarker.biomarker} className={`card bg-gradient-to-br ${getTherapeuticColor(biomarker.therapeuticArea)} text-white`}>
            <div className="flex items-center justify-between mb-4">
              <Microscope className="w-6 h-6" />
              <span className="badge bg-white/20 text-white border-white/30">{biomarker.predictiveValue}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{biomarker.biomarker}</h3>
            <div className="text-sm text-white/90 mb-4">{biomarker.therapeuticArea}</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/80">Screened:</span>
                <span className="font-semibold">{biomarker.patientsScreened.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Positive Rate:</span>
                <span className="font-semibold">{biomarker.positiveRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Improvement:</span>
                <span className="font-semibold">+{biomarker.outcomeImprovement}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <h3 className="card-header">Biomarker Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={biomarkerComparison}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar name="Predictive Value" dataKey="predictive" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
              <Radar name="Clinical Utility" dataKey="utility" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.4} />
              <Radar name="Turnaround" dataKey="turnaround" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="card-header">Outcome Improvement by Biomarker</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={biomarkerInsights} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="biomarker" type="category" width={150} tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                formatter={(value) => `${value}%`}
              />
              <Bar dataKey="outcomeImprovement" fill="#10b981" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 className="card-header">Cost vs Clinical Utility Analysis</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              type="number" 
              dataKey="cost" 
              name="Cost per Test" 
              unit="$"
              label={{ value: 'Cost per Test ($)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              type="number" 
              dataKey="improvement" 
              name="Outcome Improvement" 
              unit="%"
              label={{ value: 'Outcome Improvement (%)', angle: -90, position: 'insideLeft' }}
            />
            <ZAxis type="number" dataKey="positiveRate" range={[100, 1000]} name="Positive Rate" unit="%" />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              formatter={(value, name) => {
                if (name === 'Cost per Test') return `$${value}`
                if (name === 'Outcome Improvement' || name === 'Positive Rate') return `${value}%`
                return value
              }}
            />
            <Legend />
            <Scatter name="Biomarkers" data={costEffectivenessData} fill="#8b5cf6">
              {costEffectivenessData.map((entry, index) => {
                const colors = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b']
                return <circle key={index} fill={colors[index]} />
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {biomarkerInsights.map((biomarker, index) => (
          <div key={biomarker.biomarker} className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">{biomarker.biomarker}</h3>
              <span className={`badge ${
                biomarker.predictiveValue === 'High' ? 'badge-success' : 'badge-info'
              }`}>
                {biomarker.predictiveValue}
              </span>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-200">
              <div className="text-sm text-slate-600 mb-2">Clinical Utility</div>
              <p className="text-sm text-slate-900">{biomarker.clinicalUtility}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-slate-600">Patients Screened</span>
                </div>
                <div className="text-xl font-bold text-slate-900">{biomarker.patientsScreened.toLocaleString()}</div>
              </div>
              
              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs text-slate-600">Positive Rate</span>
                </div>
                <div className="text-xl font-bold text-slate-900">{biomarker.positiveRate}%</div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-slate-600">Outcome Improvement</span>
                </div>
                <div className="text-xl font-bold text-slate-900">+{biomarker.outcomeImprovement}%</div>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-4 h-4 text-amber-600" />
                  <span className="text-xs text-slate-600">Cost per Test</span>
                </div>
                <div className="text-xl font-bold text-slate-900">${biomarker.costPerTest}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Testing Method:</span>
                <span className="font-semibold text-slate-900">{biomarker.testingMethod}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Turnaround Time:</span>
                <span className="font-semibold text-slate-900">{biomarker.turnaroundTime}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200">
                <div className="text-xs text-slate-500 mb-2">Associated Drugs</div>
                <div className="flex flex-wrap gap-1">
                  {biomarker.associatedDrugs.map(drug => (
                    <span key={drug} className="badge badge-info text-xs">{drug}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <div className="flex items-start space-x-4">
          <div className="bg-indigo-100 p-3 rounded-lg">
            <Microscope className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Biomarker Strategy Insights</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/60 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">Most Predictive</div>
                <div className="text-xl font-bold text-slate-900">HER2 Amplification</div>
                <div className="text-xs text-slate-500 mt-1">67% outcome improvement in breast cancer</div>
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">Best Value</div>
                <div className="text-xl font-bold text-slate-900">NT-proBNP</div>
                <div className="text-xs text-slate-500 mt-1">$85 per test with 54% improvement</div>
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">Fastest Turnaround</div>
                <div className="text-xl font-bold text-slate-900">NT-proBNP</div>
                <div className="text-xs text-slate-500 mt-1">1-day results for rapid decision-making</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BiomarkerInsightsView
