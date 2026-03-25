import { Shield, AlertTriangle, ArrowRight, TrendingUp, FileText, Clock, CheckCircle, Users, BookOpen } from 'lucide-react'
import { signalData } from '../data/pvData'

function MetricCard({ label, value, sub, color = '#1d4ed8', note }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">{label}</div>
      <div className="text-3xl font-bold mb-0.5" style={{ color }}>{value}</div>
      {sub && <div className="text-xs text-slate-500">{sub}</div>}
      {note && <div className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-100">{note}</div>}
    </div>
  )
}

function TraceabilityStep({ step, isLast }) {
  const nodeColors = {
    Drug: { bg: '#eff6ff', border: '#bfdbfe', icon: '#1d4ed8', dot: '#2563eb' },
    Indication: { bg: '#f0f9ff', border: '#bae6fd', icon: '#0369a1', dot: '#0284c7' },
    Population: { bg: '#f5f3ff', border: '#ddd6fe', icon: '#6d28d9', dot: '#7c3aed' },
    'Adverse Event': { bg: '#fef2f2', border: '#fecaca', icon: '#dc2626', dot: '#dc2626' },
    Literature: { bg: '#f0fdf4', border: '#bbf7d0', icon: '#059669', dot: '#059669' },
    Signal: { bg: '#fffbeb', border: '#fde68a', icon: '#b45309', dot: '#d97706' },
  }
  const c = nodeColors[step.node] || nodeColors.Signal

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-sm"
          style={{ background: c.dot }}
        >
          {step.step}
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 mt-1" style={{ background: `${c.dot}40`, minHeight: 24 }} />
        )}
      </div>
      <div
        className="flex-1 rounded-xl border px-4 py-3 mb-3"
        style={{ background: c.bg, borderColor: c.border }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-bold uppercase tracking-wide"
            style={{ color: c.icon }}
          >
            {step.node}
          </span>
          <ArrowRight size={10} style={{ color: c.icon }} />
          <span className="text-sm font-bold text-slate-900">{step.label}</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">{step.detail}</p>
      </div>
    </div>
  )
}

function PRRGauge({ value, label, ci }) {
  const pct = Math.min((value / 5) * 100, 100)
  const color = value >= 3 ? '#dc2626' : value >= 2 ? '#ea580c' : '#ca8a04'
  const strengthLabel = value >= 3 ? 'Strong' : value >= 2 ? 'Moderate' : 'Weak'
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{label}</div>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-bold" style={{ color }}>{value.toFixed(2)}</span>
        <span className="text-xs text-slate-400 mb-1 font-mono">(95% CI {ci[0]}–{ci[1]})</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-1">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="flex justify-between text-xs text-slate-400 mt-0.5">
        <span>1.0 (no signal)</span>
        <span className="font-semibold" style={{ color }}>{strengthLabel} signal</span>
        <span>≥5.0</span>
      </div>
    </div>
  )
}

function EvidenceSummaryBar({ supporting, partial, contradicting }) {
  const total = supporting + partial + contradicting
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Evidence Balance</div>
      <div className="flex h-3 rounded-full overflow-hidden gap-0.5 mb-2">
        <div className="rounded-l-full bg-emerald-500" style={{ width: `${(supporting / total) * 100}%` }} />
        <div className="bg-amber-400" style={{ width: `${(partial / total) * 100}%` }} />
        <div className="rounded-r-full bg-orange-500" style={{ width: `${(contradicting / total) * 100}%` }} />
      </div>
      <div className="flex gap-3 text-xs">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-500" />{supporting} Supporting</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-400" />{partial} Partial</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-orange-500" />{contradicting} Contradicting</span>
      </div>
    </div>
  )
}

export default function SignalAssessment() {
  const s = signalData

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="bg-amber-500 p-2.5 rounded-xl flex-shrink-0">
            <Shield size={22} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">{s.id}</span>
              <span className="text-xs font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full uppercase tracking-wide">
                {s.priority} Priority · {s.status}
              </span>
            </div>
            <h2 className="text-lg font-bold text-amber-900 leading-tight mb-2">{s.name}</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-amber-700">
              <span className="flex items-center gap-1"><Clock size={11} /> Opened {s.dateOpened}</span>
              <span className="flex items-center gap-1"><Clock size={11} /> Updated {s.lastUpdated}</span>
              <span className="flex items-center gap-1"><FileText size={11} /> Assessment due {s.assessmentDue}</span>
              <span className="flex items-center gap-1"><CheckCircle size={11} /> {s.reviewedBy}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          label="Total ICSRs"
          value={s.caseCount.total}
          sub={`${s.caseCount.elderly} elderly · ${s.caseCount.nonElderly} non-elderly`}
          color="#1d4ed8"
          note="40 cases across 12 countries"
        />
        <MetricCard
          label="Serious (Elderly)"
          value={s.seriousCases.elderly}
          sub={`of ${s.caseCount.elderly} elderly cases`}
          color="#dc2626"
          note={`vs. ${s.seriousCases.nonElderly} serious in non-elderly`}
        />
        <MetricCard
          label="Fatal Outcomes"
          value={s.fatalCases.elderly}
          sub="elderly patients only"
          color="#7f1d1d"
          note="Both cases: ICH in patients ≥80 with prior stroke"
        />
        <MetricCard
          label="EB05 Score"
          value={s.ebgm.toFixed(2)}
          sub="Empirical Bayes score"
          color="#059669"
          note="≥2.0 = signal threshold met"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <PRRGauge value={s.prr} label="PRR — Proportional Reporting Ratio" ci={s.prrCI} />
        <PRRGauge value={s.ror} label="ROR — Reporting Odds Ratio" ci={s.rorCI} />
        <EvidenceSummaryBar
          supporting={s.supportingEvidence}
          partial={s.partialEvidence}
          contradicting={s.contradictingEvidence}
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-slate-800 p-1.5 rounded-lg">
            <TrendingUp size={14} className="text-white" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Signal Traceability Chain</h3>
        </div>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Every element of the signal hypothesis is traceable to a source. No inference is unanchored.
        </p>
        {s.traceabilityChain.map((step, i) => (
          <TraceabilityStep
            key={step.step}
            step={step}
            isLast={i === s.traceabilityChain.length - 1}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-amber-600" />
            <h3 className="text-sm font-bold text-slate-800">Clinical Context</h3>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{s.clinicalContext}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 rounded-lg p-2">
              <div className="font-semibold text-slate-700 mb-0.5">Anchor AE</div>
              <div className="text-slate-600">{s.anchorAE}</div>
            </div>
            <div className="bg-violet-50 rounded-lg p-2">
              <div className="font-semibold text-violet-700 mb-0.5">Target Population</div>
              <div className="text-violet-600">{s.targetPopulation}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={16} className="text-blue-600" />
            <h3 className="text-sm font-bold text-slate-800">Recommendation</h3>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{s.recommendation}</p>
          <div className="mt-3 space-y-1.5">
            {[
              'Initiate formal Benefit-Risk Assessment',
              'Evaluate dose-reduction criteria adequacy',
              'Consider enhanced label guidance for ≥65',
              'Coordinate with Regulatory Affairs',
            ].map(action => (
              <div key={action} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle size={12} className="text-blue-500 mt-0.5 flex-shrink-0" />
                {action}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800 text-white rounded-xl p-5">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Why this matters</div>
        <p className="text-sm leading-relaxed text-slate-200">
          This signal was not found in a single dataset. It emerged from the convergence of <strong className="text-white">40 individual case reports</strong>, across <strong className="text-white">12 countries</strong>, supported by <strong className="text-white">3 independent scientific studies</strong>, with contradicting evidence explicitly incorporated and explained.
        </p>
        <p className="text-sm leading-relaxed text-slate-300 mt-3">
          The value is not data retrieval. It is <strong className="text-white">traceable scientific reasoning</strong> — where every node in the knowledge graph connects a cause to an observation to an evidence base to a signal hypothesis.
        </p>
      </div>
    </div>
  )
}
