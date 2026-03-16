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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Clinical Intelligence Platform</h1>
                <p className="text-xs text-slate-500">Patient Journey Analytics & Predictive Insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right mr-4">
                <div className="text-sm font-semibold text-slate-900">{populationInsights.totalPatients.toLocaleString()}</div>
                <div className="text-xs text-slate-500">Total Patients</div>
              </div>
              <div className="text-right mr-4">
                <div className="text-sm font-semibold text-slate-900">{populationInsights.activeStudies}</div>
                <div className="text-xs text-slate-500">Active Studies</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-900">{populationInsights.biomarkersTracked}</div>
                <div className="text-xs text-slate-500">Biomarkers</div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Overview</span>
              </div>
            </button>
            <button
              onClick={() => setActiveView('journeys')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'journeys'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Patient Journeys</span>
              </div>
            </button>
            <button
              onClick={() => setActiveView('drugs')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'drugs'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Pill className="w-4 h-4" />
                <span>Drug Performance</span>
              </div>
            </button>
            <button
              onClick={() => setActiveView('biomarkers')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'biomarkers'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'journeys' && <PatientJourneyView />}
        {activeView === 'drugs' && <DrugPerformanceView />}
        {activeView === 'biomarkers' && <BiomarkerInsightsView />}
      </main>
    </div>
  )
}

export default App
