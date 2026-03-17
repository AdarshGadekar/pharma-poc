import { Heart, Brain, Activity, Shield, TrendingUp, Users, Microscope, AlertCircle } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { therapeuticAreas, populationInsights, drugPerformanceData } from '../data/syntheticData'
import ScientificKPIPanel from './ScientificKPIPanel'

const Dashboard = () => {
  const outcomeData = [
    { name: 'Response Rate', value: populationInsights.outcomeMetrics.overallResponseRate },
    { name: 'QoL Improvement', value: populationInsights.outcomeMetrics.qualityOfLifeImprovement },
    { name: 'Adverse Events', value: populationInsights.outcomeMetrics.adverseEventRate },
    { name: 'Discontinuation', value: populationInsights.outcomeMetrics.treatmentDiscontinuation }
  ]

  const therapeuticAreaData = therapeuticAreas.map(area => ({
    name: area.name,
    patients: area.totalPatients,
    trials: area.activeTrials,
    biomarkers: area.biomarkersTracked
  }))

  const ageDistribution = populationInsights.demographicBreakdown.ageGroups

  const COLORS = ['#475569', '#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0']

  const getTherapeuticIcon = (name) => {
    const icons = {
      'Oncology': Activity,
      'Neurology': Brain,
      'Cardiology': Heart,
      'Immunology': Shield
    }
    const Icon = icons[name] || Activity
    return <Icon className="w-5 h-5" />
  }

  return (
    <div className="space-y-6">
      <ScientificKPIPanel />
      
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold mb-2 text-slate-900">Clinical Intelligence Dashboard</h2>
        <p className="text-slate-600 text-lg">
          Real-time insights from {populationInsights.totalPatients.toLocaleString()} patient journeys across {populationInsights.therapeuticAreas} therapeutic areas
        </p>
        <div className="grid grid-cols-4 gap-6 mt-6">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-6 h-6 text-slate-600" />
              <span className="text-xs text-slate-500 uppercase tracking-wide">Total</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">{populationInsights.totalPatients.toLocaleString()}</div>
            <div className="text-sm text-slate-600">Patients Enrolled</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-6 h-6 text-slate-600" />
              <span className="text-xs text-slate-500 uppercase tracking-wide">Active</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">{populationInsights.activeStudies}</div>
            <div className="text-sm text-slate-600">Clinical Studies</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Microscope className="w-6 h-6 text-slate-600" />
              <span className="text-xs text-slate-500 uppercase tracking-wide">Tracked</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">{populationInsights.biomarkersTracked}</div>
            <div className="text-sm text-slate-600">Biomarkers</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-6 h-6 text-slate-600" />
              <span className="text-xs text-slate-500 uppercase tracking-wide">Avg</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">{populationInsights.averageFollowUp}</div>
            <div className="text-sm text-slate-600">Months Follow-up</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {therapeuticAreas.map((area, index) => (
          <div key={area.id} className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-slate-100 text-slate-700">
                {getTherapeuticIcon(area.name)}
              </div>
              <span className="badge badge-info">{area.activeTrials} trials</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">{area.name}</h3>
            <p className="text-sm text-slate-500 mb-4">{area.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Patients</span>
                <span className="font-semibold text-slate-900">{area.totalPatients.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Biomarkers</span>
                <span className="font-semibold text-slate-900">{area.biomarkersTracked}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <h3 className="card-header">Patient Distribution by Therapeutic Area</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={therapeuticAreaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="patients" fill="#475569" name="Patients" radius={[8, 8, 0, 0]} />
              <Bar dataKey="trials" fill="#64748b" name="Active Trials" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="card-header">Age Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ageDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ range, percentage }) => `${range}: ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="percentage"
              >
                {ageDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <h3 className="card-header">Clinical Outcome Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={outcomeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                formatter={(value) => `${value}%`}
              />
              <Bar dataKey="value" fill="#475569" radius={[0, 8, 8, 0]}>
                {outcomeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={
                    entry.name === 'Response Rate' ? '#475569' :
                    entry.name === 'QoL Improvement' ? '#64748b' :
                    entry.name === 'Adverse Events' ? '#94a3b8' :
                    '#cbd5e1'
                  } />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="card-header">Drug Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={drugPerformanceData.map(drug => ({
              drug: drug.drugName.split(' ')[0],
              efficacy: drug.responseRate.oneYear,
              safety: 100 - (drug.adverseEventProfile.reduce((acc, ae) => acc + ae.grade3Plus, 0) / drug.adverseEventProfile.length),
              qaly: drug.costEffectiveness.qaly * 10,
              patients: (drug.patientsEnrolled / 10)
            }))}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="drug" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar name="Efficacy" dataKey="efficacy" stroke="#475569" fill="#475569" fillOpacity={0.3} />
              <Radar name="Safety" dataKey="safety" stroke="#64748b" fill="#64748b" fillOpacity={0.3} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card bg-slate-50 border-slate-200">
        <div className="flex items-start space-x-4">
          <div className="bg-slate-200 p-3 rounded-lg">
            <AlertCircle className="w-6 h-6 text-slate-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Key Insights</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">Highest Response Rate</div>
                <div className="text-xl font-bold text-slate-900">Ocrelizumab - 91%</div>
                <div className="text-xs text-slate-500 mt-1">In Relapsing-Remitting MS at 6 months</div>
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">Best QoL Improvement</div>
                <div className="text-xl font-bold text-slate-900">JAK Inhibitors - 92%</div>
                <div className="text-xs text-slate-500 mt-1">In Rheumatoid Arthritis patients</div>
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">Most Cost-Effective</div>
                <div className="text-xl font-bold text-slate-900">ARNI+SGLT2i - $78K/QALY</div>
                <div className="text-xs text-slate-500 mt-1">In Heart Failure management</div>
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">Data Completeness</div>
                <div className="text-xl font-bold text-slate-900">{populationInsights.dataCompleteness}%</div>
                <div className="text-xs text-slate-500 mt-1">Across all therapeutic areas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
