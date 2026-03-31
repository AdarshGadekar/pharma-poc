import { useState, useMemo } from 'react'
import { Filter, AlertTriangle, User, Calendar, MapPin, Pill, ChevronDown, ChevronUp, Activity, FileText } from 'lucide-react'
import { cases } from '../data/pvData'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const INDICATION_LABELS = {
  AF: 'non-valvular atrial fibrillation (AF)',
  VTE: 'VTE treatment',
  DVT_PREV: 'DVT prevention',
}

function joinList(arr) {
  if (!arr || arr.length === 0) return null
  if (arr.length === 1) return arr[0]
  return arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1]
}

function buildNarrative(c) {
  const gender = c.gender === 'F' ? 'female' : 'male'
  const indication = INDICATION_LABELS[c.indication] || c.indication
  const comorbStr = joinList(c.comorbidities)
  const medStr = joinList(c.concomitantMeds)
  const outcomeLabel =
    c.outcome === 'not recovered' ? 'not recovered at time of reporting'
    : c.outcome === 'recovering'  ? 'recovering at time of reporting'
    : c.outcome

  return [
    `A ${c.age}-year-old ${gender} patient from ${c.country} was prescribed apixaban for ${indication}.`,
    comorbStr ? `Medical history included ${comorbStr}.` : null,
    medStr    ? `Concomitant medications: ${medStr}.` : null,
    `On ${c.dateReported}, the patient reported ${c.event.toLowerCase()} (${c.eventCode}).`,
    `The event was classified as ${c.severity} — seriousness category: ${c.seriousnessCategory}.`,
    `Outcome: ${outcomeLabel}. Reported by a ${c.source}.`,
  ].filter(Boolean).join(' ')
}

const SEVERITY_COLORS = {
  'serious': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: '#dc2626' },
  'non-serious': { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', dot: '#94a3b8' },
}

const OUTCOME_COLORS = {
  'fatal': { bg: 'bg-red-100', text: 'text-red-800' },
  'not recovered': { bg: 'bg-orange-100', text: 'text-orange-800' },
  'recovering': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'recovered': { bg: 'bg-green-100', text: 'text-green-800' },
  'unknown': { bg: 'bg-slate-100', text: 'text-slate-600' },
}

const AE_COLORS = {
  'Major Haemorrhage': '#dc2626',
  'Intracranial Haemorrhage': '#991b1b',
  'Gastrointestinal Haemorrhage': '#ea580c',
  'Minor Bleeding': '#ca8a04',
}

function StatBadge({ label, value, sub, color = 'slate' }) {
  const colorMap = {
    red: 'bg-red-50 border-red-200 text-red-900',
    violet: 'bg-violet-50 border-violet-200 text-violet-900',
    slate: 'bg-slate-50 border-slate-200 text-slate-900',
    amber: 'bg-amber-50 border-amber-200 text-amber-900',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  }
  return (
    <div className={`rounded-xl border px-4 py-3 ${colorMap[color]}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs font-semibold mt-0.5 opacity-80">{label}</div>
      {sub && <div className="text-xs opacity-60 mt-0.5">{sub}</div>}
    </div>
  )
}

function CaseCard({ c, expanded, onToggle }) {
  const sev = SEVERITY_COLORS[c.severity] || SEVERITY_COLORS['non-serious']
  const out = OUTCOME_COLORS[c.outcome] || OUTCOME_COLORS['unknown']
  const aeColor = AE_COLORS[c.event] || '#64748b'

  return (
    <div
      className={`rounded-lg border transition-all duration-200 icsr-card ${sev.border} ${expanded ? 'shadow-md' : 'hover:shadow-sm'}`}
      style={{ borderLeftWidth: 3, borderLeftColor: aeColor }}
    >
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-slate-500">{c.id}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-semibold ${c.ageGroup === 'elderly' ? 'bg-violet-100 text-violet-800' : 'bg-slate-100 text-slate-600'}`}
            >
              {c.ageGroup === 'elderly' ? `Age ${c.age} · Elderly` : `Age ${c.age}`}
            </span>
            <span className="text-xs text-slate-400">{c.gender}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: aeColor }} />
            <span className="text-sm font-medium text-slate-800 truncate">{c.event}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${sev.bg} ${sev.text}`}>
            {c.severity === 'serious' ? '⚠ Serious' : 'Non-serious'}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${out.bg} ${out.text}`}>
            {c.outcome}
          </span>
          <span className="text-slate-400">
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </span>
        </div>
      </div>

      {expanded && (
        <>
        <div className="px-4 pb-4 border-t border-slate-100 pt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <div className="text-slate-400 font-semibold uppercase tracking-wide mb-1 flex items-center gap-1">
              <Activity size={10} /> Event
            </div>
            <div className="font-medium text-slate-800">{c.event}</div>
            <div className="text-slate-500">{c.eventCode}</div>
            <div className="text-slate-500">{c.soc}</div>
          </div>
          <div>
            <div className="text-slate-400 font-semibold uppercase tracking-wide mb-1 flex items-center gap-1">
              <User size={10} /> Patient
            </div>
            <div className="font-medium text-slate-800">Age {c.age}, {c.gender}</div>
            <div className="text-slate-500">{c.weight} kg · SCr {c.creatinine}</div>
            <div className="text-slate-500">{c.indication}</div>
          </div>
          <div>
            <div className="text-slate-400 font-semibold uppercase tracking-wide mb-1 flex items-center gap-1">
              <Pill size={10} /> Co-medications
            </div>
            {c.concomitantMeds.length > 0
              ? c.concomitantMeds.map(m => <div key={m} className="text-slate-700">{m}</div>)
              : <div className="text-slate-400">None reported</div>
            }
          </div>
          <div>
            <div className="text-slate-400 font-semibold uppercase tracking-wide mb-1 flex items-center gap-1">
              <AlertTriangle size={10} /> Comorbidities
            </div>
            {c.comorbidities.length > 0
              ? c.comorbidities.map(co => <div key={co} className="text-slate-700">{co}</div>)
              : <div className="text-slate-400">None reported</div>
            }
            <div className="mt-1.5 text-slate-500 flex items-center gap-1">
              <MapPin size={10} /> {c.country} · {c.source}
            </div>
            <div className="text-slate-400 flex items-center gap-1 mt-0.5">
              <Calendar size={10} /> {c.dateReported}
            </div>
          </div>
        </div>

        {/* Case Narrative */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <FileText size={10} /> Case Narrative
          </div>
          <p className="text-xs text-slate-600 leading-relaxed border-l-2 border-slate-200 pl-3 italic">
            {buildNarrative(c)}
          </p>
        </div>
        </>
      )}
    </div>
  )
}

function AgeDistributionChart({ data }) {
  const bins = [
    { label: '<45', count: data.filter(c => c.age < 45).length },
    { label: '45–54', count: data.filter(c => c.age >= 45 && c.age < 55).length },
    { label: '55–64', count: data.filter(c => c.age >= 55 && c.age < 65).length },
    { label: '65–74', count: data.filter(c => c.age >= 65 && c.age < 75).length },
    { label: '75–84', count: data.filter(c => c.age >= 75 && c.age < 85).length },
    { label: '≥85', count: data.filter(c => c.age >= 85).length },
  ]
  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={bins} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }}
          cursor={{ fill: 'rgba(148,163,184,0.1)' }}
        />
        <Bar dataKey="count" radius={[3, 3, 0, 0]}>
          {bins.map((entry, i) => (
            <Cell key={i} fill={i >= 3 ? '#7c3aed' : '#94a3b8'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

function AEDistributionChart({ data }) {
  const aeCounts = [
    { name: 'Major Haemorrhage', value: data.filter(c => c.event === 'Major Haemorrhage').length, fill: '#dc2626' },
    { name: 'GI Haemorrhage', value: data.filter(c => c.event === 'Gastrointestinal Haemorrhage').length, fill: '#ea580c' },
    { name: 'ICH', value: data.filter(c => c.event === 'Intracranial Haemorrhage').length, fill: '#991b1b' },
    { name: 'Minor Bleeding', value: data.filter(c => c.event === 'Minor Bleeding').length, fill: '#ca8a04' },
  ]
  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={aeCounts} layout="vertical" margin={{ top: 4, right: 24, left: 8, bottom: 0 }}>
        <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }}
          cursor={{ fill: 'rgba(148,163,184,0.1)' }}
        />
        <Bar dataKey="value" radius={[0, 3, 3, 0]}>
          {aeCounts.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default function CaseExplorer({ filterGroup = null }) {
  const [ageFilter, setAgeFilter] = useState(filterGroup || 'all')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [aeFilter, setAeFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)

  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      if (ageFilter !== 'all' && c.ageGroup !== ageFilter) return false
      if (severityFilter !== 'all' && c.severity !== severityFilter) return false
      if (aeFilter !== 'all' && c.event !== aeFilter) return false
      return true
    })
  }, [ageFilter, severityFilter, aeFilter])

  const elderlyCases = filteredCases.filter(c => c.ageGroup === 'elderly')
  const nonElderlyCases = filteredCases.filter(c => c.ageGroup === 'non-elderly')
  const seriousCases = filteredCases.filter(c => c.severity === 'serious')
  const fatalCases = filteredCases.filter(c => c.outcome === 'fatal')

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatBadge label="Cases Shown" value={filteredCases.length} sub={`of ${cases.length} total`} color="slate" />
        <StatBadge label="Elderly (≥65)" value={elderlyCases.length} sub={`${Math.round(elderlyCases.length / filteredCases.length * 100) || 0}% of shown`} color="violet" />
        <StatBadge label="Serious Events" value={seriousCases.length} sub={`${Math.round(seriousCases.length / filteredCases.length * 100) || 0}% of shown`} color="red" />
        <StatBadge label="Fatal Outcomes" value={fatalCases.length} sub="2 elderly · 0 non-elderly" color="amber" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Age Distribution</div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-violet-600" />
            <span className="text-xs text-slate-500">Elderly (≥65)</span>
            <div className="w-2 h-2 rounded-full bg-slate-400 ml-2" />
            <span className="text-xs text-slate-500">Non-elderly</span>
          </div>
          <AgeDistributionChart data={filteredCases} />
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Adverse Events (shown)</div>
          <AEDistributionChart data={filteredCases} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Filter size={13} />
            <span className="text-xs font-semibold uppercase tracking-wide">Filter</span>
          </div>

          <div className="flex gap-1.5">
            {[{ v: 'all', l: 'All Patients' }, { v: 'elderly', l: 'Elderly ≥65' }, { v: 'non-elderly', l: 'Non-Elderly <65' }].map(opt => (
              <button
                key={opt.v}
                onClick={() => setAgeFilter(opt.v)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  ageFilter === opt.v
                    ? 'bg-violet-700 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {opt.l}
              </button>
            ))}
          </div>

          <div className="flex gap-1.5">
            {[{ v: 'all', l: 'All Severity' }, { v: 'serious', l: 'Serious Only' }, { v: 'non-serious', l: 'Non-Serious' }].map(opt => (
              <button
                key={opt.v}
                onClick={() => setSeverityFilter(opt.v)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  severityFilter === opt.v
                    ? 'bg-red-700 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {opt.l}
              </button>
            ))}
          </div>

          <div className="flex gap-1.5">
            {[
              { v: 'all', l: 'All AEs' },
              { v: 'Major Haemorrhage', l: 'Major Bleed' },
              { v: 'Intracranial Haemorrhage', l: 'ICH' },
              { v: 'Gastrointestinal Haemorrhage', l: 'GI Bleed' },
            ].map(opt => (
              <button
                key={opt.v}
                onClick={() => setAeFilter(opt.v)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  aeFilter === opt.v
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {opt.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {ageFilter === 'elderly' && (
        <div className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 flex items-start gap-3">
          <AlertTriangle size={16} className="text-violet-700 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-violet-900">
            <span className="font-semibold">Elderly cohort (≥65): </span>
            24 serious events · 5 intracranial haemorrhages · 2 fatal outcomes.
            Serious event rate: <span className="font-bold">85.7%</span> vs. <span className="font-bold">41.7%</span> in non-elderly.
            This asymmetry defines the signal hypothesis.
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-1">
          {filteredCases.length} case{filteredCases.length !== 1 ? 's' : ''} · Click to expand
        </div>
        {filteredCases.map(c => (
          <CaseCard
            key={c.id}
            c={c}
            expanded={expandedId === c.id}
            onToggle={() => setExpandedId(expandedId === c.id ? null : c.id)}
          />
        ))}
        {filteredCases.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">No cases match the current filters</div>
        )}
      </div>
    </div>
  )
}
