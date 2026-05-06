import { Users, Clock, AlertTriangle, ExternalLink } from 'lucide-react'
import { drugs } from '../data/competitiveData'

function TrialCard({ trial }) {
  const hasWarning = !!trial.importantNote
  return (
    <div className={`rounded-lg border p-4 bg-white ${hasWarning ? 'border-amber-200' : 'border-slate-200'}`}>
      <div className="flex items-start justify-between mb-3 pb-3 border-b border-slate-100">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400 mb-1">
            {trial.phase}
          </div>
          <div className="text-sm font-semibold text-slate-900">{trial.name}</div>
        </div>
        <a
          href={`https://clinicaltrials.gov/study/${trial.nctId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-slate-700 transition-colors"
        >
          {trial.nctId}
          <ExternalLink size={9} />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Users size={12} className="text-slate-400 flex-shrink-0" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Enrolled</div>
            <div className="text-xs font-semibold text-slate-800 tabular-nums">N = {trial.n}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-slate-400 flex-shrink-0" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Duration</div>
            <div className="text-xs font-semibold text-slate-800">{trial.duration}</div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Population</div>
        <div className="text-xs text-slate-700 leading-relaxed">{trial.population}</div>
      </div>

      <div className="mb-3">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Key Inclusion</div>
        <div className="text-xs text-slate-600 leading-relaxed">{trial.keyInclusion}</div>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded p-3">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Primary Result</div>
        <div className="text-xs text-slate-800 font-medium leading-relaxed">
          {trial.primaryResult}
        </div>
      </div>

      {hasWarning && (
        <div className="mt-3 flex items-start gap-2 px-3 py-2.5 border border-amber-200 bg-amber-50 rounded">
          <AlertTriangle size={11} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <span className="text-xs text-amber-800 leading-relaxed">{trial.importantNote}</span>
        </div>
      )}
    </div>
  )
}

function DrugColumn({ drug }) {
  return (
    <div className="flex flex-col gap-3">
      <div className={`rounded-lg border p-4 bg-white ${drug.isTarget ? 'border-slate-900' : 'border-slate-200'}`}>
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-semibold text-slate-900">{drug.brandName}</span>
              {drug.isTarget && (
                <span className="text-[10px] font-semibold bg-slate-900 text-white px-1.5 py-0.5 rounded tracking-wide">TARGET</span>
              )}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">{drug.genericName} · {drug.company}</div>
          </div>
          {drug.isOffLabel && (
            <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded flex-shrink-0">
              Off-label DS
            </span>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Approval Status</div>
          <div className="text-xs text-slate-700">{drug.approvalStatus}</div>
          <div className="text-xs text-slate-500 mt-0.5">{drug.approvedIndication}</div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
          {drug.backgroundNote}
        </div>
      </div>

      {drug.trials.map(trial => (
        <TrialCard key={trial.nctId} trial={trial} />
      ))}
    </div>
  )
}

export default function TrialContext() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {drugs.map(d => (
          <DrugColumn key={d.id} drug={d} />
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-4">
          Cross-Trial Design Considerations
        </div>
        <div className="grid grid-cols-3 gap-6 text-xs text-slate-600">
          <div>
            <div className="font-semibold text-slate-800 mb-1.5">Background Therapy</div>
            <p className="leading-relaxed">GWPCARE trials permitted, but did not require, clobazam as background. The Epidyolex–clobazam DDI was not anticipated at design; post-hoc analyses show the effect is partly attributable to raised clobazam metabolite levels.</p>
          </div>
          <div>
            <div className="font-semibold text-slate-800 mb-1.5">Fintepla Study 1 vs Study 2</div>
            <p className="leading-relaxed">Study 1 required concurrent clobazam; Study 2 included patients with and without clobazam. The design change demonstrated efficacy independent of the clobazam combination, strengthening the label.</p>
          </div>
          <div>
            <div className="font-semibold text-slate-800 mb-1.5">Clobazam CONTAIN Trial</div>
            <p className="leading-relaxed">CONTAIN enrolled LGS patients. The primary endpoint was drop seizures — a different seizure type than the convulsive seizures targeted in DS trials. Direct efficacy comparison to Epidyolex or Fintepla in DS is methodologically inappropriate.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
