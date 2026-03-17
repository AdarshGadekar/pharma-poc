import { useState } from 'react'
import { User, Calendar, Activity, TrendingUp, AlertTriangle, CheckCircle, Clock, Heart } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from 'recharts'
import { patientJourneys } from '../data/syntheticData'
import AIPredictionPanel from './AIPredictionPanel'

const PatientJourneyView = () => {
  const [selectedPatient, setSelectedPatient] = useState(patientJourneys[0])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Responding': return 'bg-emerald-100 text-emerald-800'
      case 'Stable': return 'bg-blue-100 text-blue-800'
      case 'Improving': return 'bg-cyan-100 text-cyan-800'
      case 'Remission': return 'bg-purple-100 text-purple-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getTherapeuticColor = (area) => {
    switch (area) {
      case 'oncology': return 'from-blue-500 to-indigo-600'
      case 'neurology': return 'from-purple-500 to-pink-600'
      case 'cardiology': return 'from-pink-500 to-rose-600'
      case 'immunology': return 'from-amber-500 to-orange-600'
      default: return 'from-slate-500 to-slate-600'
    }
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Patient Journey Stories</h2>
        <p className="text-slate-600 mb-6">
          Follow real patient experiences through their treatment journey, tracking clinical outcomes, biomarkers, and quality of life improvements.
        </p>
        
        <div className="grid grid-cols-4 gap-4">
          {patientJourneys.map((patient) => (
            <button
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className={`text-left p-4 rounded-lg border-2 transition-all ${
                selectedPatient.id === patient.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-900">{patient.patientCode}</span>
                <span className={`badge ${getStatusColor(patient.currentStatus)}`}>
                  {patient.currentStatus}
                </span>
              </div>
              <div className="text-sm text-slate-600 mb-1">{patient.condition}</div>
              <div className="text-xs text-slate-500">{patient.age}yo {patient.gender}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedPatient && (
        <>
          <div className={`card bg-gradient-to-r ${getTherapeuticColor(selectedPatient.therapeuticArea)} text-white`}>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <User className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Patient Profile</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/80">Patient ID:</span>
                    <span className="font-semibold">{selectedPatient.patientCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Age/Gender:</span>
                    <span className="font-semibold">{selectedPatient.age}yo {selectedPatient.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Diagnosis:</span>
                    <span className="font-semibold">{selectedPatient.diagnosis}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Stage:</span>
                    <span className="font-semibold">{selectedPatient.stage}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Activity className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Treatment Details</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-white/80 block mb-1">Condition:</span>
                    <span className="font-semibold">{selectedPatient.condition}</span>
                  </div>
                  <div>
                    <span className="text-white/80 block mb-1">Treatment:</span>
                    <span className="font-semibold">{selectedPatient.treatment}</span>
                  </div>
                  <div>
                    <span className="text-white/80 block mb-1">Biomarker:</span>
                    <span className="font-semibold">{selectedPatient.biomarker}: {selectedPatient.biomarkerValue}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Current Status</h3>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">{selectedPatient.currentStatus}</div>
                  <div className="text-sm text-white/90">
                    {selectedPatient.timeline.length} months in treatment
                  </div>
                  {selectedPatient.predictedOutcome.confidence && (
                    <div className="mt-3 pt-3 border-t border-white/20">
                      <div className="text-xs text-white/80">AI Confidence</div>
                      <div className="text-lg font-semibold">
                        {(selectedPatient.predictedOutcome.confidence * 100).toFixed(0)}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="card-header">Patient Story</h3>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <p className="text-slate-700 leading-relaxed">{selectedPatient.narrative}</p>
            </div>
          </div>

          <AIPredictionPanel patientData={selectedPatient} />

          <div className="grid grid-cols-2 gap-6">
            <div className="card">
              <h3 className="card-header">Treatment Timeline & Clinical Response</h3>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={selectedPatient.timeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
                  <YAxis yAxisId="left" label={{ value: 'Clinical Metric', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Quality of Life', angle: 90, position: 'insideRight' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                  <Legend />
                  {selectedPatient.therapeuticArea === 'oncology' && (
                    <>
                      <Bar yAxisId="left" dataKey="tumorSize" fill="#ef4444" name="Tumor Size (cm)" radius={[8, 8, 0, 0]} />
                      <Line yAxisId="left" type="monotone" dataKey="ca153" stroke="#f59e0b" strokeWidth={2} name="CA 15-3" dot={{ r: 4 }} />
                    </>
                  )}
                  {selectedPatient.therapeuticArea === 'neurology' && (
                    <>
                      <Line yAxisId="left" type="monotone" dataKey="edss" stroke="#8b5cf6" strokeWidth={2} name="EDSS Score" dot={{ r: 4 }} />
                      <Line yAxisId="left" type="monotone" dataKey="lesionCount" stroke="#ec4899" strokeWidth={2} name="Lesion Count" dot={{ r: 4 }} />
                    </>
                  )}
                  {selectedPatient.therapeuticArea === 'cardiology' && (
                    <>
                      <Line yAxisId="left" type="monotone" dataKey="ef" stroke="#10b981" strokeWidth={2} name="Ejection Fraction %" dot={{ r: 4 }} />
                      <Line yAxisId="left" type="monotone" dataKey="ntprobnp" stroke="#ef4444" strokeWidth={2} name="NT-proBNP (pg/mL)" dot={{ r: 4 }} />
                    </>
                  )}
                  {selectedPatient.therapeuticArea === 'immunology' && (
                    <>
                      <Line yAxisId="left" type="monotone" dataKey="das28" stroke="#f59e0b" strokeWidth={2} name="DAS28 Score" dot={{ r: 4 }} />
                      <Line yAxisId="left" type="monotone" dataKey="crp" stroke="#ef4444" strokeWidth={2} name="CRP (mg/L)" dot={{ r: 4 }} />
                    </>
                  )}
                  <Line yAxisId="right" type="monotone" dataKey="quality" stroke="#0ea5e9" strokeWidth={3} name="Quality of Life" dot={{ r: 5 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3 className="card-header">Biomarker Profile</h3>
              <div className="space-y-4">
                {Object.entries(selectedPatient.biometrics).map(([key, value]) => (
                  <div key={key} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-lg font-semibold text-slate-900">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="card">
              <h3 className="card-header">Adverse Events</h3>
              <div className="space-y-3">
                {selectedPatient.adverseEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center space-x-3">
                      {event.resolved ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Clock className="w-5 h-5 text-amber-500" />
                      )}
                      <div>
                        <div className="font-medium text-slate-900">{event.event}</div>
                        <div className="text-xs text-slate-500">Grade {event.grade}</div>
                      </div>
                    </div>
                    <span className={`badge ${event.resolved ? 'badge-success' : 'badge-warning'}`}>
                      {event.resolved ? 'Resolved' : 'Ongoing'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="card-header">Predicted Outcomes</h3>
              <div className="space-y-4">
                {Object.entries(selectedPatient.predictedOutcome).map(([key, value]) => {
                  if (key === 'confidence') return null
                  return (
                    <div key={key} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                      <div className="text-sm text-slate-600 mb-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl font-bold text-slate-900">
                          {typeof value === 'number' ? `${value}%` : value}
                        </div>
                        <Heart className="w-5 h-5 text-blue-500" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
            <div className="flex items-start space-x-4">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Clinical Insights</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 rounded-lg p-4">
                    <div className="text-sm text-slate-600 mb-1">Treatment Duration</div>
                    <div className="text-xl font-bold text-slate-900">{selectedPatient.timeline.length} months</div>
                    <div className="text-xs text-slate-500 mt-1">Continuous monitoring</div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4">
                    <div className="text-sm text-slate-600 mb-1">Quality of Life Change</div>
                    <div className="text-xl font-bold text-emerald-600">
                      +{selectedPatient.timeline[selectedPatient.timeline.length - 1].quality - selectedPatient.timeline[0].quality} points
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Significant improvement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PatientJourneyView
