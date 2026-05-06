import { AlertOctagon, AlertTriangle, CheckCircle, ArrowRight, Info } from 'lucide-react'
import { drugs } from '../data/competitiveData'

const AE_ROWS = [
  { key: 'somnolence',           label: 'Somnolence' },
  { key: 'decreasedAppetite',    label: 'Decreased appetite' },
  { key: 'fatigue',              label: 'Fatigue' },
  { key: 'diarrhea',             label: 'Diarrhea' },
  { key: 'altElevation3xULN',    label: 'ALT elevation > 3× ULN' },
  { key: 'seriousAdverseEvents', label: 'Serious adverse events' },
  { key: 'discontinuationDueToAE', label: 'Discontinuation due to AE' },
]

function AERatesTable() {
  const max = Math.max(
    ...AE_ROWS.flatMap(r => drugs.map(d => d.aeRates?.[r.key] ?? 0))
  )
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 flex items-end justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Adverse Event Rates — Pooled from Pivotal Trials</div>
          <div className="text-[11px] text-slate-400 mt-0.5">All values are % of patients reporting the event. "n/r" = not reported.</div>
        </div>
      </div>
      <table className="w-full text-xs">
        <thead className="bg-slate-50">
          <tr className="text-[10px] uppercase tracking-wider text-slate-500">
            <th className="text-left px-5 py-2.5 font-medium w-1/3">Adverse event</th>
            {drugs.map(d => (
              <th key={d.id} className="text-left px-5 py-2.5 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className={d.isTarget ? 'text-slate-900' : 'text-slate-500'}>{d.brandName}</span>
                  {d.isTarget && (
                    <span className="text-[9px] font-semibold bg-slate-900 text-white px-1 py-0.5 rounded tracking-wider">TARGET</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {AE_ROWS.map(row => (
            <tr key={row.key} className="border-t border-slate-100">
              <td className="px-5 py-3 align-middle font-medium text-slate-700">{row.label}</td>
              {drugs.map(d => {
                const v = d.aeRates?.[row.key]
                const pct = v == null ? 0 : Math.min(100, (v / Math.max(max, 1)) * 100)
                return (
                  <td key={d.id} className="px-5 py-3 align-middle">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-800 tabular-nums w-10">
                        {v == null ? <span className="text-slate-400 font-normal">n/r</span> : `${v}%`}
                      </span>
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm"
                          style={{ width: `${pct}%`, backgroundColor: d.isTarget ? '#0f172a' : '#94a3b8' }}
                        />
                      </div>
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center gap-3 text-[10px] text-slate-500">
        <span className="uppercase tracking-wider">Sources:</span>
        {drugs.map((d, i) => (
          <span key={d.id}>
            {i > 0 && <span className="text-slate-300 mx-2">·</span>}
            {d.brandName}: {d.aeRates?.source}
          </span>
        ))}
      </div>
    </div>
  )
}

function BoxedWarning({ drug }) {
  return (
    <div className="border border-red-300 rounded-lg overflow-hidden bg-white">
      <div className="bg-red-50 border-b border-red-200 px-5 py-3 flex items-center gap-3">
        <div className="bg-red-700 rounded p-1.5">
          <AlertOctagon size={14} className="text-white flex-shrink-0" />
        </div>
        <div>
          <div className="text-red-900 font-semibold text-sm uppercase tracking-wide">Boxed Warning</div>
          <div className="text-red-700 text-xs">{drug.brandName} ({drug.genericName}) · FDA & EMA</div>
        </div>
      </div>

      <div className="px-5 py-4 border-b border-slate-100">
        <p className="text-sm text-slate-800 leading-relaxed">{drug.safety.boxedWarningText}</p>
      </div>

      <div className="px-5 py-4">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-3">
          {drug.safety.remsName} Requirements
        </div>
        <ul className="space-y-2">
          {drug.safety.remsRequirements.map((req, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-semibold text-slate-600 flex-shrink-0 mt-0.5 tabular-nums">
                {i + 1}
              </span>
              <span className="text-xs text-slate-700 leading-relaxed">{req}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
          <Info size={12} className="text-slate-400 mt-0.5 flex-shrink-0" />
          <span>
            Prescribers, dispensing pharmacies, and patients must each be individually enrolled in the FINTEPLA REMS before any prescription can be filled — a significant administrative burden at initiation.
          </span>
        </div>
      </div>
    </div>
  )
}

function SafetyProfile({ drug }) {
  const hasBoxed = drug.safety.boxedWarning
  return (
    <div className={`rounded-lg border bg-white overflow-hidden ${hasBoxed ? 'border-red-200' : drug.isTarget ? 'border-slate-900' : 'border-slate-200'}`}>
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-slate-900">{drug.brandName}</span>
            {drug.isTarget && (
              <span className="text-[10px] font-semibold bg-slate-900 text-white px-1.5 py-0.5 rounded tracking-wide">TARGET</span>
            )}
            {hasBoxed && (
              <span className="text-[10px] font-medium text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                Black Box
              </span>
            )}
            {drug.safety.rems && (
              <span className="text-[10px] font-medium text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                REMS
              </span>
            )}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">{drug.genericName}</div>
        </div>
        {!hasBoxed && !drug.safety.rems && (
          <div className="flex items-center gap-1 text-[10px] text-slate-500">
            <CheckCircle size={11} className="text-slate-400" />
            <span>No box / REMS</span>
          </div>
        )}
      </div>

      <div className="px-4 py-3">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">Key Warnings</div>
        <ul className="space-y-1.5">
          {drug.safety.keyWarnings.map((w, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
              <span className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function DDIConnector() {
  const epidyolex = drugs.find(d => d.id === 'epidyolex')

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Drug–Drug Interaction</div>
        <div className="text-sm font-semibold text-slate-900 mt-0.5">Pharmacokinetic interaction — clinically significant</div>
      </div>

      <div className="p-5">
        <div className="flex items-stretch gap-4 mb-5">
          <div className="flex-1 rounded-lg border border-slate-300 bg-slate-50 p-4">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Perpetrator</div>
            <div className="text-sm font-semibold text-slate-900">Epidyolex</div>
            <div className="text-xs text-slate-500">Cannabidiol</div>
            <div className="mt-3 text-xs text-slate-700 bg-white border border-slate-200 rounded px-2.5 py-1.5 inline-block">
              CYP2C19 inhibitor (potent)
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 px-2 text-slate-400">
            <ArrowRight size={18} />
            <div className="text-[10px] font-medium text-center leading-tight">
              inhibits<br />CYP2C19
            </div>
          </div>

          <div className="flex-1 rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Affected substrate</div>
            <div className="text-sm font-semibold text-slate-900">Clobazam</div>
            <div className="text-xs text-slate-500">CYP2C19 substrate</div>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-100 rounded">
                <span className="text-slate-600">Clobazam (parent)</span>
                <span className="text-slate-400 font-mono">→</span>
              </div>
              <div className="flex items-center justify-between text-xs px-2.5 py-1.5 bg-slate-100 border border-slate-200 rounded">
                <span className="text-slate-700 font-medium">N-desmethylclobazam</span>
                <span className="text-red-700 font-semibold tabular-nums">↑ ~3×</span>
              </div>
              <div className="text-[10px] text-slate-400 italic">Active metabolite</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded p-3.5">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">Mechanism</div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {epidyolex.safety.ddi.description}
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded p-3.5">
            <div className="flex items-center gap-1.5 text-[10px] text-amber-700 uppercase tracking-wider mb-1.5">
              <AlertTriangle size={11} />
              Clinical Action
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              {epidyolex.safety.ddi.clinicalAction}
            </p>
          </div>
        </div>

        <div className="mt-3 px-3 py-2.5 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
          <Info size={12} className="text-slate-400 mt-0.5 flex-shrink-0" />
          <span>
            <span className="font-medium text-slate-700">Clinical context. </span>
            Clobazam is used as background AED in many Dravet Syndrome patients, including in the Epidyolex and Fintepla pivotal trials. This interaction is therefore common in real-world use.
          </span>
        </div>
      </div>
    </div>
  )
}

export default function SafetyWarnings() {
  const fintepla = drugs.find(d => d.id === 'fintepla')

  return (
    <div className="space-y-6">
      <BoxedWarning drug={fintepla} />

      <AERatesTable />

      <div className="grid grid-cols-3 gap-4">
        {drugs.map(d => (
          <SafetyProfile key={d.id} drug={d} />
        ))}
      </div>

      <DDIConnector />

      <div className="bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 flex items-start gap-2.5">
        <Info size={13} className="text-slate-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-600 leading-relaxed">
          <span className="font-medium text-slate-700">Safety comparison note. </span>
          Safety data is sourced from respective prescribing information and EMA Summary of Product Characteristics. Adverse event frequencies vary across trials due to differences in population, dose, and background therapy. This view is intended to support scientific hypothesis generation and Medical Affairs discussion, not for clinical decision-making. Refer to the full prescribing information for complete safety information.
        </p>
      </div>
    </div>
  )
}
