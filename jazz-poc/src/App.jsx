import { useState } from 'react'
import { BarChart2, FlaskConical, ShieldAlert, Globe } from 'lucide-react'
import EfficacyComparison from './components/EfficacyComparison'
import TrialContext from './components/TrialContext'
import SafetyWarnings from './components/SafetyWarnings'
import MarketAccessView from './components/MarketAccessView'
import { drugs, indication } from './data/competitiveData'

const TABS = [
  { id: 'efficacy', label: 'Efficacy Comparison',     icon: BarChart2,     desc: 'Seizure reduction, responder rates, time to response' },
  { id: 'trials',   label: 'Trial & Patient Context', icon: FlaskConical,  desc: 'Study design, NCT IDs, populations' },
  { id: 'safety',   label: 'Safety & Label Warnings', icon: ShieldAlert,   desc: 'AE rates, boxed warnings, REMS, DDIs' },
  { id: 'access',   label: 'Market Access & Real-World', icon: Globe,      desc: 'HTA, titration, monitoring burden, evidence stream' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('efficacy')

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-8 pt-6 pb-0">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-[19px] font-semibold text-slate-900 tracking-tight">
                  Competitive Intelligence: {indication.name}
                </h1>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded tracking-wider uppercase">
                  Evidence Layer · PoC
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-2xl">
                {indication.description}
              </p>
            </div>

            <div className="flex items-center gap-5 text-xs">
              {drugs.map((d, i) => (
                <div key={d.id} className="flex items-center gap-3">
                  {i > 0 && <span className="w-px h-8 bg-slate-200" />}
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="font-semibold text-slate-900">{d.brandName}</span>
                      {d.isTarget && (
                        <span className="text-[9px] font-semibold bg-slate-900 text-white px-1.5 py-0.5 rounded tracking-wider">
                          TARGET
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{d.genericName}</div>
                    {d.isOffLabel && (
                      <div className="text-[10px] text-amber-700 mt-0.5">Off-label DS</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-between border-t border-slate-100 pt-1">
            <div className="flex items-center gap-1">
              {TABS.map(tab => {
                const Icon = tab.icon
                const active = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                      active
                        ? 'text-slate-900 border-slate-900'
                        : 'text-slate-500 border-transparent hover:text-slate-800'
                    }`}
                  >
                    <Icon size={14} />
                    {tab.label}
                  </button>
                )
              })}
            </div>
            <div className="text-[11px] text-slate-400 italic pb-3">
              {TABS.find(t => t.id === activeTab)?.desc}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-8 py-8">
        {activeTab === 'efficacy' && <EfficacyComparison />}
        {activeTab === 'trials'   && <TrialContext />}
        {activeTab === 'safety'   && <SafetyWarnings />}
        {activeTab === 'access'   && <MarketAccessView />}
      </main>

      <footer className="max-w-[1400px] mx-auto px-8 pb-8">
        <div className="border-t border-slate-200 pt-5 flex items-center justify-between">
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
            <span className="font-medium text-slate-500">Medical Affairs internal use only. </span>
            All data is sourced from published prescribing information, FDA labels, and publicly available clinical trial registries. This tool supports hypothesis generation and is not intended for clinical decision-making or promotional use.
          </p>
          <div className="text-[11px] text-slate-300 font-mono flex-shrink-0 ml-4">
            Evidence Layer PoC · v0.1 · {indication.abbreviation}
          </div>
        </div>
      </footer>
    </div>
  )
}
