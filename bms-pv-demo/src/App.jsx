import { useState, useEffect } from 'react'
import { Shield, Network, FileSearch, BookOpen, AlertTriangle, ChevronRight, ChevronLeft, Activity, Play, RotateCcw, Info, X, Database } from 'lucide-react'
import SignalGraph from './components/SignalGraph'
import CaseExplorer from './components/CaseExplorer'
import EvidencePanel from './components/EvidencePanel'
import SignalAssessment from './components/SignalAssessment'
import { demoSteps, signalData } from './data/pvData'
import PortfolioPipeline from './components/PortfolioPipeline'

const TABS = [
  { id: 'graph', label: 'Signal Graph', icon: Network, desc: 'Knowledge graph — drug to signal' },
  { id: 'cases', label: 'Case Analysis', icon: FileSearch, desc: 'Individual case safety reports' },
  { id: 'evidence', label: 'Evidence Review', icon: BookOpen, desc: 'Supporting & contradicting literature' },
  { id: 'signal', label: 'Signal Assessment', icon: Shield, desc: 'PRR metrics, traceability, recommendation' },
  { id: 'pipeline', label: 'Portfolio & Pipeline', icon: Database, desc: 'Drug portfolio, data model & Neo4j injection plan' },
]

function DemoStepGuide({ step, onNext, onPrev, onClose }) {
  if (!step) return null
  const isFirst = step.id === 1
  const isLast = step.id === demoSteps.length

  return (
    <div className="bg-slate-900 text-white rounded-xl overflow-hidden shadow-xl border border-slate-700">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {demoSteps.map(s => (
              <div
                key={s.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${s.id === step.id ? 'w-6 bg-amber-400' : s.id < step.id ? 'w-2 bg-amber-600' : 'w-2 bg-slate-600'}`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400 font-mono">Step {step.id} / {demoSteps.length}</span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
          <X size={14} />
        </button>
      </div>

      <div className="px-4 py-4">
        <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">{step.title}</div>
        <p className="text-sm font-semibold text-white leading-tight mb-3">{step.headline}</p>
        <p className="text-xs text-slate-300 leading-relaxed">{step.narrative}</p>
      </div>

      <div className="px-4 pb-4 flex gap-2">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
            isFirst ? 'opacity-30 cursor-not-allowed bg-slate-700 text-slate-400' : 'bg-slate-700 hover:bg-slate-600 text-white'
          }`}
        >
          <ChevronLeft size={12} /> Prev
        </button>
        <button
          onClick={onNext}
          disabled={isLast}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
            isLast ? 'opacity-30 cursor-not-allowed bg-slate-700 text-slate-400' : 'bg-amber-500 hover:bg-amber-400 text-white'
          }`}
        >
          {isLast ? 'Complete' : 'Next'} {!isLast && <ChevronRight size={12} />}
        </button>
      </div>
    </div>
  )
}

function DrugBanner({ activeStep }) {
  return (
    <div className="bg-slate-800 text-white px-6 py-2.5 flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 rounded-md px-2.5 py-1">
          <span className="text-xs font-black tracking-wider">ELIQUIS</span>
        </div>
        <span className="text-xs text-slate-400">Apixaban · Factor Xa Inhibitor · Anticoagulant</span>
      </div>
      <div className="flex items-center gap-1 text-slate-500">
        <span className="text-slate-600">|</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-xs text-amber-300 font-semibold">Active Signal Review</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <span>40 ICSRs</span>
        <span className="text-slate-600">·</span>
        <span>PRR 2.41</span>
        <span className="text-slate-600">·</span>
        <span>3 supporting studies</span>
        <span className="text-slate-600">·</span>
        <span className="text-amber-400">Under Assessment</span>
      </div>
      <div className="ml-auto text-xs text-slate-500 font-mono hidden md:block">
        SIG-2024-ELIQUIS-001
      </div>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('graph')
  const [demoStep, setDemoStep] = useState(null)
  const [guideClosed, setGuideClosed] = useState(false)
  const [demoStarted, setDemoStarted] = useState(false)

  const currentStep = demoStep !== null ? demoSteps[demoStep] : null
  const activeNodes = currentStep ? currentStep.activeNodes : []

  useEffect(() => {
    if (currentStep && currentStep.activeTab) {
      setActiveTab(currentStep.activeTab)
    }
  }, [currentStep])

  const startDemo = () => {
    setDemoStep(0)
    setDemoStarted(true)
    setGuideClosed(false)
    setActiveTab('graph')
  }

  const nextStep = () => {
    if (demoStep < demoSteps.length - 1) setDemoStep(s => s + 1)
  }

  const prevStep = () => {
    if (demoStep > 0) setDemoStep(s => s - 1)
  }

  const resetDemo = () => {
    setDemoStep(null)
    setDemoStarted(false)
    setGuideClosed(false)
    setActiveTab('graph')
  }

  const caseFilter = currentStep?.caseFilter || null

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-xl">
              <Activity size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                Pharmacovigilance Signal Intelligence
              </h1>
              <p className="text-xs text-slate-400 font-medium">Safety reasoning — explicit, traceable, explorable</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!demoStarted ? (
              <button
                onClick={startDemo}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm"
              >
                <Play size={13} />
                Start Demo Walkthrough
              </button>
            ) : (
              <button
                onClick={resetDemo}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all border border-slate-200"
              >
                <RotateCcw size={13} />
                Reset
              </button>
            )}
          </div>
        </div>
      </nav>

      <DrugBanner activeStep={currentStep} />

      <div className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-6 flex gap-6">
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          <div className="flex items-center gap-1 bg-white rounded-xl border border-slate-200 p-1 shadow-sm w-full overflow-x-auto">
            {TABS.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {activeTab === 'graph' && (
            <div className="flex flex-col gap-3">
              {currentStep && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-start gap-3">
                  <Info size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <span className="font-bold">Step {currentStep.id}: </span>
                    {currentStep.headline}
                    <span className="text-blue-600 ml-2">Highlighted nodes are active. Hover for details.</span>
                  </div>
                </div>
              )}
              {!currentStep && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">Context Graph — </span>
                  Drug → Indication → Population → Adverse Event → Evidence → Signal.
                  Hover any node for details. Click <span className="font-semibold">"Start Demo Walkthrough"</span> for guided narrative.
                </div>
              )}
              <SignalGraph activeNodes={activeNodes} demoStep={demoStep !== null ? demoStep + 1 : 0} />
            </div>
          )}

          {activeTab === 'cases' && (
            <CaseExplorer filterGroup={caseFilter} key={caseFilter} />
          )}

          {activeTab === 'evidence' && (
            <EvidencePanel />
          )}

          {activeTab === 'signal' && (
            <SignalAssessment />
          )}

          {activeTab === 'pipeline' && (
            <PortfolioPipeline />
          )}
        </div>

        {demoStarted && !guideClosed && currentStep && (
          <div className="w-72 flex-shrink-0 sticky top-6 self-start">
            <DemoStepGuide
              step={currentStep}
              onNext={nextStep}
              onPrev={prevStep}
              onClose={() => setGuideClosed(true)}
            />
            <div className="mt-3 bg-white rounded-xl border border-slate-200 p-4">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2.5">All Steps</div>
              <div className="space-y-1.5">
                {demoSteps.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setDemoStep(s.id - 1)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center gap-2 ${
                      s.id === currentStep.id
                        ? 'bg-slate-900 text-white font-semibold'
                        : s.id < currentStep.id
                        ? 'text-slate-500 hover:bg-slate-50 bg-slate-50'
                        : 'text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      s.id === currentStep.id ? 'bg-amber-400 text-amber-900' :
                      s.id < currentStep.id ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-200 text-slate-400'
                    }`}>
                      {s.id < currentStep.id ? '✓' : s.id}
                    </span>
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {demoStarted && guideClosed && (
          <div className="w-10 flex-shrink-0">
            <button
              onClick={() => setGuideClosed(false)}
              className="bg-slate-900 text-white rounded-xl p-2 hover:bg-slate-700 transition-all"
              title="Reopen demo guide"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
