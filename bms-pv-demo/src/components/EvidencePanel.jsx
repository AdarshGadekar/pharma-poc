import { useState } from 'react'
import { BookOpen, CheckCircle, XCircle, MinusCircle, Users, BarChart2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { evidence } from '../data/pvData'

const STANCE_CONFIG = {
  supporting: {
    label: 'Supports Signal',
    icon: CheckCircle,
    iconColor: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-800',
    bar: '#059669',
    leftBorder: 'evidence-supporting',
  },
  contradicting: {
    label: 'Contradicts Signal',
    icon: XCircle,
    iconColor: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-800',
    bar: '#ea580c',
    leftBorder: 'evidence-contradicting',
  },
  partial: {
    label: 'Partial Support',
    icon: MinusCircle,
    iconColor: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
    bar: '#ca8a04',
    leftBorder: 'evidence-partial',
  },
}

function QualityBar({ score }) {
  const pct = (score / 10) * 100
  const color = score >= 9 ? '#059669' : score >= 8 ? '#0284c7' : '#ca8a04'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="text-xs font-semibold" style={{ color }}>{score}/10</span>
    </div>
  )
}

function StudyTypeChip({ type }) {
  const colors = {
    'RCT Sub-analysis': 'bg-blue-50 text-blue-700 border-blue-200',
    'Retrospective Cohort': 'bg-slate-50 text-slate-700 border-slate-200',
    'Registry Analysis': 'bg-teal-50 text-teal-700 border-teal-200',
    'Claims Database Analysis': 'bg-purple-50 text-purple-700 border-purple-200',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-md border font-medium ${colors[type] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
      {type}
    </span>
  )
}

function EvidenceCard({ item }) {
  const [expanded, setExpanded] = useState(false)
  const cfg = STANCE_CONFIG[item.stance] || STANCE_CONFIG.partial
  const Icon = cfg.icon

  return (
    <div className={`rounded-xl border ${cfg.border} bg-white overflow-hidden ${cfg.leftBorder} transition-all duration-200 hover:shadow-md`}>
      <div
        className="px-5 py-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${cfg.badge} flex items-center gap-1`}>
                <Icon size={11} />
                {cfg.label}
              </span>
              <StudyTypeChip type={item.studyType} />
              <span className="text-xs text-slate-400">{item.year}</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight mb-1">{item.title}</h3>
            <div className="text-xs text-slate-500 mb-2">{item.authors} · <span className="italic">{item.journal}</span></div>
          </div>
          <div className="flex-shrink-0 mt-1">
            {expanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed mb-3">{item.finding}</p>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-1.5 text-xs">
            <div
              className="font-mono font-bold px-2.5 py-1 rounded-md text-white text-xs"
              style={{ background: cfg.bar }}
            >
              {item.keyMetric}
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Users size={11} />
            <span>N={item.sampleSize.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 min-w-[140px]">
            <BarChart2 size={11} />
            <span className="mr-1">Quality</span>
            <QualityBar score={item.qualityScore} />
          </div>
        </div>
      </div>

      {expanded && (
        <div className={`px-5 pb-4 pt-3 border-t ${cfg.border} ${cfg.bg}`}>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
            <BookOpen size={10} />
            Abstract Summary
          </div>
          <p className="text-sm text-slate-700 leading-relaxed mb-3">{item.abstract}</p>
          <div className="flex flex-wrap gap-3">
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Linked AEs</div>
              <div className="flex gap-1.5 flex-wrap">
                {item.linkedAEs.map(ae => (
                  <span key={ae} className="text-xs bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium">{ae}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Population Focus</div>
              <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${item.populationFocus === 'elderly' ? 'bg-violet-100 text-violet-800' : 'bg-slate-100 text-slate-700'}`}>
                {item.populationFocus === 'elderly' ? 'Elderly (≥65)' : 'All ages'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function EvidencePanel() {
  const [filter, setFilter] = useState('all')

  const filtered = evidence.filter(e => filter === 'all' || e.stance === filter)
  const supporting = evidence.filter(e => e.stance === 'supporting')
  const contradicting = evidence.filter(e => e.stance === 'contradicting')
  const partial = evidence.filter(e => e.stance === 'partial')

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-center">
          <div className="text-2xl font-bold text-emerald-800">{supporting.length}</div>
          <div className="text-xs font-semibold text-emerald-700 mt-0.5">Supporting</div>
          <div className="text-xs text-emerald-600 mt-1">ARISTOTLE · SENIORS · Nordic</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-center">
          <div className="text-2xl font-bold text-orange-800">{contradicting.length}</div>
          <div className="text-xs font-semibold text-orange-700 mt-0.5">Contradicting</div>
          <div className="text-xs text-orange-600 mt-1">AMPLIFY Extension</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-center">
          <div className="text-2xl font-bold text-amber-800">{partial.length}</div>
          <div className="text-xs font-semibold text-amber-700 mt-0.5">Partial Support</div>
          <div className="text-xs text-amber-600 mt-1">Medicare Cohort</div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
        <div className="text-sm font-semibold text-blue-900 mb-1">Why contradicting evidence matters</div>
        <p className="text-sm text-blue-800 leading-relaxed">
          The AMPLIFY Extension sub-analysis (HR 1.22, p=0.12) does not reach statistical significance.
          However, it covers a VTE population — not AF — with lower baseline comorbidity burden.
          This difference in population context is itself informative: it suggests age-related risk may
          be moderated by comorbidity load, not age alone.
        </p>
      </div>

      <div className="flex gap-2">
        {[
          { v: 'all', l: 'All Evidence (5)' },
          { v: 'supporting', l: '✓ Supporting (3)' },
          { v: 'contradicting', l: '✗ Contradicting (1)' },
          { v: 'partial', l: '± Partial (1)' },
        ].map(opt => (
          <button
            key={opt.v}
            onClick={() => setFilter(opt.v)}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filter === opt.v
                ? 'bg-slate-800 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {opt.l}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(item => (
          <EvidenceCard key={item.id} item={item} />
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Evidence Weight Summary</div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-3 rounded-full overflow-hidden bg-slate-200 flex">
            <div className="h-full bg-emerald-500" style={{ width: '60%' }} />
            <div className="h-full bg-amber-400" style={{ width: '20%' }} />
            <div className="h-full bg-orange-500" style={{ width: '20%' }} />
          </div>
          <span className="text-xs text-slate-600 font-medium">60% supporting · 20% partial · 20% contradicting</span>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Weighted by sample size and study quality. Contradicting evidence is incorporated — not dismissed. Majority weight supports signal hypothesis.
        </p>
      </div>
    </div>
  )
}
