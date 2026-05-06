import { Globe, ClipboardList, Calendar, AlertTriangle, Info, CheckCircle, MinusCircle } from 'lucide-react'
import { drugs, evidenceSources, evidenceUpdates } from '../data/competitiveData'

const STATUS_TONE = {
  recommended: { label: 'Recommended', className: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  partial:     { label: 'Partial',     className: 'text-amber-700 bg-amber-50 border-amber-200' },
  generic:     { label: 'Generic',     className: 'text-slate-600 bg-slate-50 border-slate-200' },
}

function classifyStatus(text = '') {
  const t = text.toLowerCase()
  if (t.includes('recommended')) return STATUS_TONE.recommended
  if (t.includes('non-quantifiable') || t.includes('partial')) return STATUS_TONE.partial
  return STATUS_TONE.generic
}

function HtaTable() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 flex items-end justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">HTA & Reimbursement Status</div>
          <div className="text-[11px] text-slate-400 mt-0.5">UK NICE, Germany G-BA, EU EMA — public assessment outcomes</div>
        </div>
      </div>
      <table className="w-full text-xs">
        <thead className="bg-slate-50">
          <tr className="text-[10px] uppercase tracking-wider text-slate-500">
            <th className="text-left px-5 py-2.5 font-medium w-1/4">Drug</th>
            <th className="text-left px-5 py-2.5 font-medium w-1/4">UK · NICE</th>
            <th className="text-left px-5 py-2.5 font-medium w-1/4">Germany · G-BA</th>
            <th className="text-left px-5 py-2.5 font-medium w-1/4">EU · EMA</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map(d => {
            const ma = d.marketAccess
            const niceTone = classifyStatus(ma.ukNice.status)
            const gbaTone = classifyStatus(ma.germanyGba.status)
            return (
              <tr key={d.id} className="border-t border-slate-100 align-top">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-900">{d.brandName}</span>
                    {d.isTarget && (
                      <span className="text-[9px] font-semibold bg-slate-900 text-white px-1 py-0.5 rounded tracking-wider">TARGET</span>
                    )}
                  </div>
                  <div className="text-slate-500">{d.genericName}</div>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded border ${niceTone.className} mb-1`}>
                    {ma.ukNice.id !== 'n/a' ? ma.ukNice.id : 'No DS TA'}
                  </span>
                  <div className="text-slate-700">{ma.ukNice.status}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{ma.ukNice.note}</div>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded border ${gbaTone.className} mb-1`}>
                    {ma.germanyGba.year || '—'}
                  </span>
                  <div className="text-slate-700">{ma.germanyGba.status}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{ma.germanyGba.note}</div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="text-slate-700">{ma.euEma.status}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{ma.euEma.note}</div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function TitrationCard({ drug }) {
  const ma = drug.marketAccess
  return (
    <div className={`rounded-lg border bg-white overflow-hidden ${drug.isTarget ? 'border-slate-900' : 'border-slate-200'}`}>
      <div className="px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-slate-900">{drug.brandName}</span>
          {drug.isTarget && (
            <span className="text-[10px] font-semibold bg-slate-900 text-white px-1.5 py-0.5 rounded tracking-wide">TARGET</span>
          )}
          {drug.isOffLabel && (
            <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
              Off-label DS
            </span>
          )}
        </div>
        <div className="text-xs text-slate-500 mt-0.5">{drug.genericName}</div>
      </div>

      <div className="px-4 py-3 space-y-3">
        <div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Titration schedule</div>
          <div className="text-xs text-slate-700 font-medium">{ma.titration.schedule}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{ma.titration.duration} · complexity: {ma.titration.complexity}</div>
        </div>

        <div className="pt-3 border-t border-slate-100">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Formulation</div>
          <div className="text-xs text-slate-700">{ma.formulation}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{ma.administration}</div>
        </div>

        <div className="pt-3 border-t border-slate-100">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">Monitoring burden</div>
          <ul className="space-y-1">
            {ma.monitoringBurden.map((b, i) => {
              const isHeavy = /echo|rems|enrol/i.test(b)
              return (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                  {isHeavy
                    ? <AlertTriangle size={11} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    : <span className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
                  }
                  <span>{b}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function EvidenceTimeline() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 flex items-end justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">What's New — Recent Evidence</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Most recent updates surfaced from monitored sources (illustrative)</div>
        </div>
        <span className="text-[10px] text-slate-400">As of 5 May 2026</span>
      </div>
      <ul className="divide-y divide-slate-100">
        {evidenceUpdates.map((u, i) => (
          <li key={i} className="px-5 py-3 flex items-start gap-3">
            <Calendar size={12} className="text-slate-400 mt-1 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-700 leading-relaxed">{u.label}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-slate-400 font-mono">{u.date}</span>
                <span className="text-[10px] text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">{u.tag}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SourcesPanel() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Evidence Sources Synthesised</div>
        <div className="text-[11px] text-slate-400 mt-0.5">Public, regulator-recognised data feeds powering this PoC</div>
      </div>
      <ul className="divide-y divide-slate-100">
        {evidenceSources.map((s, i) => (
          <li key={i} className="px-5 py-2.5 flex items-center gap-4">
            <span className="text-[10px] text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded uppercase tracking-wider w-24 flex-shrink-0 text-center">
              {s.type}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-800 font-medium">{s.name}</div>
              <div className="text-[11px] text-slate-500">{s.detail}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function MarketAccessView() {
  return (
    <div className="space-y-6">
      <HtaTable />

      <div>
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Titration, Formulation & Monitoring Burden</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Real-world prescriber and patient experience</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {drugs.map(d => <TitrationCard key={d.id} drug={d} />)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <EvidenceTimeline />
        <SourcesPanel />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 flex items-start gap-2.5">
        <Info size={13} className="text-slate-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-600 leading-relaxed">
          <span className="font-medium text-slate-700">Market access note. </span>
          HTA outcomes shown reflect publicly available decision summaries and are simplified for comparison. Patient access schemes, confidential discounts, and country-specific reimbursement conditions are not exhaustively represented. The "What's New" stream is illustrative and would, in production, be powered by automated monitoring of NICE, EMA, FDA, ClinicalTrials.gov, PubMed, and major neurology conferences (AES, EPNS, ILAE).
        </p>
      </div>
    </div>
  )
}
