import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Cell, LabelList,
} from 'recharts'
import { AlertTriangle, Info } from 'lucide-react'
import { drugs, placeboBaseline } from '../data/competitiveData'

const DRUG_FILL = {
  epidyolex: '#0f172a',
  fintepla:  '#475569',
  clobazam:  '#94a3b8',
}
const PLACEBO_FILL = '#cbd5e1'

const METRICS = [
  {
    key: 'medianSeizureReduction',
    label: 'Median seizure reduction',
    unit: '%',
    placebo: placeboBaseline.value,
    placeboLabel: 'Placebo baseline',
    description: 'Active arm vs. own placebo comparator',
  },
  {
    key: 'responderRate50',
    label: '≥50% responder rate',
    unit: '%',
    placebo: 18,
    placeboLabel: 'Placebo avg ~18%',
    description: 'Patients achieving ≥50% reduction in seizure frequency',
  },
  {
    key: 'seizureFreedomPct',
    label: 'Seizure-free during trial',
    unit: '%',
    placebo: 0,
    placeboLabel: 'Placebo ~0%',
    description: 'Patients achieving zero seizures during the maintenance phase',
  },
]

const EfficacyTooltip = ({ active, payload, metric }) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-md p-3 max-w-xs">
      <div className="font-semibold text-slate-900 text-sm mb-0.5">{d.shortLabel}</div>
      <div className="text-2xl font-semibold mb-1 text-slate-900 tabular-nums">
        {d.value === null ? 'n/r' : `${d.value}${metric.unit}`}
      </div>
      <div className="text-xs text-slate-500 leading-snug">{metric.description}</div>
      {d.warning && (
        <div className="mt-2 border-t border-slate-100 pt-2 flex items-start gap-1.5">
          <AlertTriangle size={11} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <span className="text-xs text-slate-600">{d.warning}</span>
        </div>
      )}
    </div>
  )
}

function MetricChart({ metric }) {
  const chartData = drugs.map(d => ({
    id: d.id,
    shortLabel: d.brandName,
    generic: d.genericName,
    value: d.efficacy[metric.key],
    color: DRUG_FILL[d.id],
    isOffLabel: d.isOffLabel,
    warning: d.isOffLabel ? 'Data from LGS population (CONTAIN)' : null,
  }))

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">{metric.label}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{metric.description}</p>
        </div>
        <span className="text-[10px] text-slate-400">{metric.placeboLabel}</span>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={chartData}
          margin={{ top: 16, right: 8, left: -12, bottom: 4 }}
          barSize={36}
        >
          <CartesianGrid strokeDasharray="2 4" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="shortLabel"
            axisLine={false}
            tickLine={false}
            tick={({ x, y, payload }) => {
              const d = chartData.find(c => c.shortLabel === payload.value)
              return (
                <g transform={`translate(${x},${y})`}>
                  <text x={0} y={0} dy={12} textAnchor="middle" fontSize={11} fontWeight="500" fill="#334155">
                    {payload.value}
                  </text>
                  {d?.isOffLabel && (
                    <text x={0} y={0} dy={26} textAnchor="middle" fontSize={9} fill="#b45309">
                      ⚠ LGS
                    </text>
                  )}
                </g>
              )
            }}
            height={36}
            interval={0}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={v => `${v}`}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            width={32}
          />
          <Tooltip content={<EfficacyTooltip metric={metric} />} cursor={{ fill: '#f8fafc' }} />
          <ReferenceLine
            y={metric.placebo}
            stroke="#cbd5e1"
            strokeDasharray="3 3"
            strokeWidth={1}
          />
          <Bar dataKey="value" radius={[2, 2, 0, 0]}>
            {chartData.map(d => (
              <Cell key={d.id} fill={d.color} />
            ))}
            <LabelList
              dataKey="value"
              position="top"
              formatter={v => v == null ? 'n/r' : `${v}${metric.unit}`}
              style={{ fontSize: 11, fontWeight: 600, fill: '#0f172a' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function EfficacyComparison() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {drugs.map(d => (
          <div
            key={d.id}
            className={`rounded-lg p-5 border bg-white ${d.isTarget ? 'border-slate-900' : 'border-slate-200'}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-slate-900">{d.brandName}</span>
                  {d.isTarget && (
                    <span className="text-[10px] font-semibold bg-slate-900 text-white px-1.5 py-0.5 rounded tracking-wide">TARGET</span>
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{d.genericName}</div>
              </div>
              {d.isOffLabel && (
                <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                  Off-label DS
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="text-4xl font-semibold text-slate-900 leading-none tabular-nums">
                {d.efficacy.medianSeizureReduction}%
              </span>
              <span className="text-xs text-slate-500 leading-tight">
                median seizure reduction
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">≥50% responder</div>
                <div className="text-sm font-semibold text-slate-800 tabular-nums">
                  {d.efficacy.responderRate50}%
                  <span className="text-[10px] text-slate-400 font-normal ml-1">vs {d.efficacy.placeboResponderRate50}% pbo</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Seizure-free</div>
                <div className="text-sm font-semibold text-slate-800 tabular-nums">
                  {d.efficacy.seizureFreedomPct == null ? 'n/r' : `${d.efficacy.seizureFreedomPct}%`}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Time to response</div>
              <div className="text-xs text-slate-600 leading-snug">{d.efficacy.timeToResponse}</div>
            </div>

            {d.isOffLabel && (
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-start gap-1.5">
                <AlertTriangle size={11} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-slate-600 leading-snug">
                  Efficacy from LGS (CONTAIN), not Dravet Syndrome
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {METRICS.map(m => <MetricChart key={m.key} metric={m} />)}
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-end justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Source attribution</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Each efficacy figure linked to its peer-reviewed pivotal publication</div>
          </div>
        </div>
        <table className="w-full text-xs">
          <thead className="bg-slate-50">
            <tr className="text-[10px] uppercase tracking-wider text-slate-500">
              <th className="text-left px-5 py-2 font-medium">Drug</th>
              <th className="text-left px-5 py-2 font-medium">Primary endpoint</th>
              <th className="text-left px-5 py-2 font-medium">Source</th>
            </tr>
          </thead>
          <tbody>
            {drugs.map(d => (
              <tr key={d.id} className="border-t border-slate-100">
                <td className="px-5 py-3 align-top">
                  <div className="font-semibold text-slate-900">{d.brandName}</div>
                  <div className="text-slate-500">{d.genericName}</div>
                </td>
                <td className="px-5 py-3 align-top text-slate-700">{d.efficacy.primaryEndpoint}</td>
                <td className="px-5 py-3 align-top text-slate-500">{d.efficacy.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 flex items-start gap-2.5">
        <Info size={13} className="text-slate-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-600 leading-relaxed">
          <span className="font-medium text-slate-700">Methodological note. </span>
          Figures are not from head-to-head trials. Each value reflects the active arm vs. its own placebo comparator in separate pivotal studies with different patient populations, background therapies, and seizure-type definitions. Placebo baselines shown on each chart are approximate cross-trial averages and are illustrative only. Cross-trial comparisons are hypothesis-generating and should not be interpreted as superiority claims. Clobazam (Onfi) data is derived exclusively from CONTAIN in an LGS population — no RCT data exists for clobazam in Dravet Syndrome. "n/r" = not reported.
        </p>
      </div>
    </div>
  )
}
