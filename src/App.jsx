import { useState } from 'react'
import { Activity, Users, Microscope, TrendingUp, Heart, Brain, Pill, Shield } from 'lucide-react'
import Dashboard from './components/Dashboard'
import PatientJourneyView from './components/PatientJourneyView'
import DrugPerformanceView from './components/DrugPerformanceView'
import BiomarkerInsightsView from './components/BiomarkerInsightsView'
import { therapeuticAreas, populationInsights } from './data/syntheticData'

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedTherapeuticArea, setSelectedTherapeuticArea] = useState(null)

  const getIcon = (iconName) => {
    const icons = {
      Activity,
      Users,
      Microscope,
      TrendingUp,
      Heart,
      Brain,
      Pill,
      Shield
    }
    return icons[iconName] || Activity
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-[1400px] mx-auto px-8 py-5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="professional-gradient p-3 rounded-xl shadow-lg">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Clinical Intelligence Platform</h1>
                <p className="text-sm text-slate-500 font-medium">AI-Powered Patient Analytics & Predictive Medicine</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-lg font-bold text-slate-900">{populationInsights.totalPatients.toLocaleString()}</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Patients</div>
              </div>
              <div className="text-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-lg font-bold text-slate-900">{populationInsights.activeStudies}</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Studies</div>
              </div>
              <div className="text-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-lg font-bold text-slate-900">{populationInsights.biomarkersTracked}</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Biomarkers</div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeView === 'dashboard'
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Overview</span>
              </div>
            </button>
            <button
              onClick={() => setActiveView('journeys')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeView === 'journeys'
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Patient Journeys</span>
              </div>
            </button>
            <button
              onClick={() => setActiveView('drugs')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeView === 'drugs'
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Pill className="w-4 h-4" />
                <span>Drug Performance</span>
              </div>
            </button>
            <button
              onClick={() => setActiveView('biomarkers')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeView === 'biomarkers'
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Microscope className="w-4 h-4" />
                <span>Biomarker Insights</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-8 py-10">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'journeys' && <PatientJourneyView />}
        {activeView === 'drugs' && <DrugPerformanceView />}
        {activeView === 'biomarkers' && <BiomarkerInsightsView />}
      </main>
    </div>
  )
}

export default App
