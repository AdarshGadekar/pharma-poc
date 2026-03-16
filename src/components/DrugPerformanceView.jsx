import { useState } from 'react'
import { Pill, TrendingUp, AlertCircle, DollarSign, Users, Activity } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts'
import { drugPerformanceData } from '../data/syntheticData'

const DrugPerformanceView = () => {
  const [selectedDrug, setSelectedDrug] = useState(drugPerformanceData[0])

  const getDrugColor = (index) => {
    const colors = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b']
    return colors[index % colors.length]
  }

  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <h2 className="text-3xl font-bold mb-2">Drug Performance Analytics</h2>
        <p className="text-indigo-100 text-lg">
          Comprehensive analysis of treatment efficacy, safety profiles, and real-world outcomes across therapeutic areas
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {drugPerformanceData.map((drug, index) => (
          <button
            key={drug.drugName}
            onClick={() => setSelectedDrug(drug)}
            className={`text-left p-4 rounded-lg border-2 transition-all ${
              selectedDrug.drugName === drug.drugName
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className={`p-2 rounded-lg`} style={{ backgroundColor: `${getDrugColor(index)}20` }}>
                <Pill className="w-5 h-5" style={{ color: getDrugColor(index) }} />
              </div>
              <span className="badge badge-info">{drug.patientsEnrolled}</span>
            </div>
            <div className="font-semibold text-slate-900 mb-1 text-sm leading-tight">{drug.drugName}</div>
            <div className="text-xs text-slate-500 mb-2">{drug.indication}</div>
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-emerald-600">{drug.responseRate.oneYear}%</span> 1-year response
            </div>
          </button>
        ))}
      </div>

      {selectedDrug && (
        <>
          <div className="grid grid-cols-3 gap-6">
            <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-blue-600" />
                <span className="badge badge-info">Active</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{selectedDrug.patientsEnrolled}</div>
              <div className="text-sm text-slate-600">Patients Enrolled</div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="text-xs text-slate-500">Biomarker</div>
                <div className="text-sm font-semibold text-slate-900">{selectedDrug.biomarker}</div>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
                <span className="badge badge-success">Efficacy</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{selectedDrug.responseRate.oneYear}%</div>
              <div className="text-sm text-slate-600">1-Year Response Rate</div>
              <div className="mt-4 pt-4 border-t border-emerald-200 grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-slate-500">6 Month</div>
                  <div className="text-sm font-semibold text-slate-900">{selectedDrug.responseRate.sixMonth}%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">2 Year</div>
                  <div className="text-sm font-semibold text-slate-900">{selectedDrug.responseRate.twoYear}%</div>
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-purple-600" />
                <span className="badge badge-info">Value</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">${(selectedDrug.costEffectiveness.costPerQaly / 1000).toFixed(0)}K</div>
              <div className="text-sm text-slate-600">Cost per QALY</div>
              <div className="mt-4 pt-4 border-t border-purple-200">
                <div className="text-xs text-slate-500">QALY Gained</div>
                <div className="text-sm font-semibold text-slate-900">{selectedDrug.costEffectiveness.qaly} years</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="card">
              <h3 className="card-header">Response Rate Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={[
                  { time: '6 Months', rate: selectedDrug.responseRate.sixMonth },
                  { time: '1 Year', rate: selectedDrug.responseRate.oneYear },
                  { time: '2 Years', rate: selectedDrug.responseRate.twoYear }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    formatter={(value) => `${value}%`}
                  />
                  <Area type="monotone" dataKey="rate" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.3} strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {selectedDrug.survivalData && (
              <div className="card">
                <h3 className="card-header">Survival Curve - Observed vs AI-Predicted</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={selectedDrug.survivalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
                    <YAxis domain={[0, 100]} label={{ value: 'Survival %', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                      formatter={(value) => `${value}%`}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="observed" stroke="#10b981" strokeWidth={3} name="Observed" dot={{ r: 5 }} />
                    <Line type="monotone" dataKey="predicted" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="AI-Predicted" dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {selectedDrug.relapseReduction && (
              <div className="card">
                <h3 className="card-header">Relapse Rate Reduction</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={selectedDrug.relapseReduction}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                    <YAxis label={{ value: 'Relapse Rate', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Bar dataKey="relapseRate" fill="#10b981" name="Treatment" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="placeboRate" fill="#ef4444" name="Placebo" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {selectedDrug.clinicalOutcomes && (
              <div className="card">
                <h3 className="card-header">Clinical Outcomes</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={selectedDrug.clinicalOutcomes} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" domain={[0, 40]} />
                    <YAxis dataKey="metric" type="category" width={180} tick={{ fontSize: 11 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                      formatter={(value) => `${value}%`}
                    />
                    <Bar dataKey="value" fill="#0ea5e9" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {selectedDrug.clinicalResponse && (
              <div className="card">
                <h3 className="card-header">ACR Response Rates</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={selectedDrug.clinicalResponse}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="timepoint" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                      formatter={(value) => `${value}%`}
                    />
                    <Legend />
                    <Bar dataKey="acr20" fill="#0ea5e9" name="ACR20" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="acr50" fill="#8b5cf6" name="ACR50" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="acr70" fill="#ec4899" name="ACR70" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="remission" fill="#10b981" name="Remission" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {selectedDrug.biomarkerResponse && (
              <div className="card">
                <h3 className="card-header">Biomarker Response</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={selectedDrug.biomarkerResponse}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="ntprobnp" stroke="#ef4444" strokeWidth={2} name="NT-proBNP" dot={{ r: 4 }} />
                    <Line yAxisId="right" type="monotone" dataKey="ef" stroke="#10b981" strokeWidth={2} name="Ejection Fraction %" dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {selectedDrug.biomarkerTrends && (
              <div className="card">
                <h3 className="card-header">Disease Activity Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={selectedDrug.biomarkerTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="das28" stroke="#f59e0b" strokeWidth={2} name="DAS28 Score" dot={{ r: 4 }} />
                    <Line yAxisId="left" type="monotone" dataKey="crp" stroke="#ef4444" strokeWidth={2} name="CRP (mg/L)" dot={{ r: 4 }} />
                    <Line yAxisId="right" type="monotone" dataKey="haq" stroke="#8b5cf6" strokeWidth={2} name="HAQ Score" dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div className="card">
            <h3 className="card-header">Adverse Event Profile</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={selectedDrug.adverseEventProfile}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="event" angle={-15} textAnchor="end" height={100} tick={{ fontSize: 11 }} />
                <YAxis label={{ value: 'Incidence %', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value) => `${value}%`}
                />
                <Legend />
                <Bar dataKey="incidence" fill="#f59e0b" name="All Grades" radius={[8, 8, 0, 0]} />
                <Bar dataKey="grade3Plus" fill="#ef4444" name="Grade 3+" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-900">Cost-Effectiveness</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Cost per QALY</span>
                  <span className="text-lg font-bold text-slate-900">${(selectedDrug.costEffectiveness.costPerQaly / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">QALY Gained</span>
                  <span className="text-lg font-bold text-slate-900">{selectedDrug.costEffectiveness.qaly}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Incremental Benefit</span>
                  <span className="text-lg font-bold text-emerald-600">+{selectedDrug.costEffectiveness.incrementalBenefit}</span>
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
                <h3 className="text-lg font-semibold text-slate-900">Efficacy Summary</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">6-Month Response</span>
                  <span className="text-lg font-bold text-slate-900">{selectedDrug.responseRate.sixMonth}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">1-Year Response</span>
                  <span className="text-lg font-bold text-slate-900">{selectedDrug.responseRate.oneYear}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">2-Year Response</span>
                  <span className="text-lg font-bold text-slate-900">{selectedDrug.responseRate.twoYear}%</span>
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                <h3 className="text-lg font-semibold text-slate-900">Safety Profile</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Total AE Types</span>
                  <span className="text-lg font-bold text-slate-900">{selectedDrug.adverseEventProfile.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Avg Incidence</span>
                  <span className="text-lg font-bold text-slate-900">
                    {(selectedDrug.adverseEventProfile.reduce((acc, ae) => acc + ae.incidence, 0) / selectedDrug.adverseEventProfile.length).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Grade 3+ Rate</span>
                  <span className="text-lg font-bold text-amber-600">
                    {(selectedDrug.adverseEventProfile.reduce((acc, ae) => acc + ae.grade3Plus, 0) / selectedDrug.adverseEventProfile.length).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default DrugPerformanceView
