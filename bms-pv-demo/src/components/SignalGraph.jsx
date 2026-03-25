import { useState, useCallback } from 'react'
import { graphNodes, graphEdges, evidence, cases } from '../data/pvData'

const NODE_STYLES = {
  drug:               { fill: '#1d4ed8', stroke: '#1e40af', textFill: '#fff', labelFill: '#bfdbfe' },
  indication:         { fill: '#0369a1', stroke: '#0284c7', textFill: '#fff', labelFill: '#e0f2fe' },
  population_active:  { fill: '#6d28d9', stroke: '#5b21b6', textFill: '#fff', labelFill: '#ede9fe' },
  population_dim:     { fill: '#94a3b8', stroke: '#64748b', textFill: '#fff', labelFill: '#f1f5f9' },
  ae_high:            { fill: '#dc2626', stroke: '#b91c1c', textFill: '#fff', labelFill: '#fee2e2' },
  ae_mid:             { fill: '#ea580c', stroke: '#c2410c', textFill: '#fff', labelFill: '#ffedd5' },
  ae_low:             { fill: '#ca8a04', stroke: '#a16207', textFill: '#fff', labelFill: '#fef9c3' },
  evidence_support:   { fill: '#059669', stroke: '#047857', textFill: '#fff', labelFill: '#d1fae5' },
  evidence_contra:    { fill: '#ea580c', stroke: '#c2410c', textFill: '#fff', labelFill: '#ffedd5' },
  evidence_partial:   { fill: '#ca8a04', stroke: '#a16207', textFill: '#fff', labelFill: '#fef9c3' },
  signal:             { fill: '#92400e', stroke: '#78350f', textFill: '#fff', labelFill: '#fef3c7' },
}

const EDGE_STYLES = {
  INDICATED_FOR:   { stroke: '#0284c7', strokeWidth: 1.5, dashed: false },
  PRESCRIBED_TO:   { stroke: '#7c3aed', strokeWidth: 1.5, dashed: false },
  'REPORTS (n=14)': { stroke: '#dc2626', strokeWidth: 3, dashed: false },
  'REPORTS (n=5)':  { stroke: '#dc2626', strokeWidth: 2.5, dashed: false },
  'REPORTS (n=7)':  { stroke: '#ea580c', strokeWidth: 2, dashed: false },
  'REPORTS (n=2)':  { stroke: '#ca8a04', strokeWidth: 1.2, dashed: false },
  'REPORTS (n=4)':  { stroke: '#94a3b8', strokeWidth: 1.2, dashed: false },
  'REPORTS (n=1)':  { stroke: '#94a3b8', strokeWidth: 0.8, dashed: false },
  SUPPORTED_BY:    { stroke: '#059669', strokeWidth: 1.5, dashed: false },
  QUESTIONED_BY:   { stroke: '#ea580c', strokeWidth: 1.5, dashed: true },
  CONSTITUTES:     { stroke: '#059669', strokeWidth: 1.5, dashed: false },
  CHALLENGES:      { stroke: '#ea580c', strokeWidth: 1.5, dashed: true },
  OBSERVED_IN:     { stroke: '#7c3aed', strokeWidth: 2, dashed: false },
  DEFINES:         { stroke: '#dc2626', strokeWidth: 2.5, dashed: false },
}

function getEdgeStyle(label) {
  return EDGE_STYLES[label] || { stroke: '#94a3b8', strokeWidth: 1, dashed: false }
}

function nodeById(id) {
  return graphNodes.find(n => n.id === id)
}

function getAngle(from, to) {
  return Math.atan2(to.y - from.y, to.x - from.x)
}

function EdgeArrow({ edge, dimmed }) {
  const from = nodeById(edge.from)
  const to = nodeById(edge.to)
  if (!from || !to) return null

  const style = getEdgeStyle(edge.label)
  const angle = getAngle(from, to)
  const startX = from.x + Math.cos(angle) * (from.r + 3)
  const startY = from.y + Math.sin(angle) * (from.r + 3)
  const endX = to.x - Math.cos(angle) * (to.r + 6)
  const endY = to.y - Math.sin(angle) * (to.r + 6)

  const cx1 = startX + (endX - startX) * 0.4
  const cy1 = startY + (endY - startY) * 0.1
  const cx2 = startX + (endX - startX) * 0.6
  const cy2 = startY + (endY - startY) * 0.9

  const opacity = dimmed ? 0.12 : 0.85

  return (
    <g opacity={opacity}>
      <path
        d={`M ${startX} ${startY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${endX} ${endY}`}
        fill="none"
        stroke={style.stroke}
        strokeWidth={style.strokeWidth}
        strokeDasharray={style.dashed ? '5,4' : undefined}
        markerEnd={`url(#arrow-${style.stroke.replace('#', '')})`}
      />
    </g>
  )
}

function GraphNode({ node, isActive, isDimmed, onHover, onLeave, onClick }) {
  const style = NODE_STYLES[node.type] || NODE_STYLES.indication
  const scale = isActive ? 1.12 : 1
  const opacity = isDimmed ? 0.22 : 1

  return (
    <g
      transform={`translate(${node.x}, ${node.y}) scale(${scale})`}
      opacity={opacity}
      style={{ cursor: 'pointer', transition: 'opacity 0.35s ease, transform 0.3s ease' }}
      onMouseEnter={() => onHover(node)}
      onMouseLeave={onLeave}
      onClick={() => onClick(node)}
    >
      {isActive && node.type === 'signal' && (
        <circle r={node.r + 14} fill={style.fill} opacity={0.15}>
          <animate attributeName="r" values={`${node.r + 10};${node.r + 20};${node.r + 10}`} dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
      {isActive && (
        <circle r={node.r + 6} fill="none" stroke={style.stroke} strokeWidth="1.5" opacity={0.4} />
      )}
      <circle
        r={node.r}
        fill={style.fill}
        stroke={style.stroke}
        strokeWidth={isActive ? 2.5 : 1.5}
      />
      <text
        textAnchor="middle"
        dy="-5"
        fontSize={node.r >= 34 ? 11 : 10}
        fontWeight="700"
        fill={style.textFill}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.label}
      </text>
      <text
        textAnchor="middle"
        dy="8"
        fontSize={9}
        fontWeight="400"
        fill={style.textFill}
        opacity={0.85}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.sublabel}
      </text>
    </g>
  )
}

function Tooltip({ node }) {
  if (!node) return null
  const style = NODE_STYLES[node.type] || NODE_STYLES.indication

  const descriptions = {
    DRUG: 'Apixaban — Factor Xa Inhibitor. Approved 2012. 7M+ patients worldwide.',
    IND_AF: '72% of signal cases. Non-valvular atrial fibrillation.',
    IND_VTE: '28% of signal cases. DVT/PE treatment & prevention.',
    POP_ELDERLY: '28 cases · 24 serious · 5 ICH · 2 fatal. Mean age: 75.8 yrs.',
    POP_NON: '12 cases · 5 serious · 1 ICH · 0 fatal. Mean age: 50.7 yrs.',
    AE_MAJOR: 'n=18 total (14 elderly, 4 non-elderly). PRR 2.41 in elderly.',
    AE_GI: 'n=11 total (7 elderly, 4 non-elderly). SOC: Gastrointestinal disorders.',
    AE_ICH: 'n=6 total (5 elderly, 1 non-elderly). Highest severity. 2 fatal.',
    AE_MINOR: 'n=6 total (2 elderly, 4 non-elderly). Non-serious majority.',
    LIT_1: 'ARISTOTLE sub-analysis. RCT. N=18,201. HR 1.84 (p<0.001). Supports signal.',
    LIT_2: 'SENIORS cohort. Retrospective. N=12,847. ROR 2.14. Supports signal.',
    LIT_3: 'Nordic Registry. N=31,204. ICH 3.1× in ≥75. Supports signal.',
    LIT_4: 'AMPLIFY Extension. RCT. N=8,399. HR 1.22 (p=0.12). Contradicts signal.',
    LIT_5: 'Medicare cohort. N=49,806. GI HR 1.31 (p=0.04). Partial support.',
    SIGNAL: 'Signal ID: SIG-2024-ELIQUIS-001. PRR 2.41. Status: Under Assessment.',
  }

  return (
    <div
      className="absolute z-50 pointer-events-none"
      style={{ left: node.x + node.r + 10, top: node.y - 30 }}
    >
      <div
        className="rounded-lg shadow-xl p-3 text-xs max-w-[220px] border"
        style={{
          background: style.fill,
          borderColor: style.stroke,
          color: '#fff',
        }}
      >
        <div className="font-bold mb-1">{node.label} {node.sublabel && `· ${node.sublabel}`}</div>
        <div className="opacity-90 leading-relaxed">{descriptions[node.id] || ''}</div>
      </div>
    </div>
  )
}

const COLUMN_LABELS = [
  { x: 110, label: 'Drug' },
  { x: 285, label: 'Indication' },
  { x: 470, label: 'Population' },
  { x: 660, label: 'Adverse Event' },
  { x: 860, label: 'Evidence' },
  { x: 1065, label: 'Signal' },
]

export default function SignalGraph({ activeNodes = [], demoStep = 1 }) {
  const [hoveredNode, setHoveredNode] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)

  const isActive = useCallback((nodeId) => {
    if (activeNodes.length === 0) return true
    return activeNodes.includes(nodeId)
  }, [activeNodes])

  const isDimmed = useCallback((nodeId) => {
    if (activeNodes.length === 0) return false
    return !activeNodes.includes(nodeId)
  }, [activeNodes])

  const isEdgeDimmed = useCallback((edge) => {
    if (activeNodes.length === 0) return false
    return !activeNodes.includes(edge.from) && !activeNodes.includes(edge.to)
  }, [activeNodes])

  const displayNode = hoveredNode || selectedNode

  const arrowColors = [...new Set(graphEdges.map(e => getEdgeStyle(e.label).stroke))]

  return (
    <div className="relative w-full">
      <div className="relative overflow-x-auto rounded-xl border border-slate-200 shadow-sm graph-bg bg-white">
        <svg
          viewBox="0 0 1200 540"
          className="w-full"
          style={{ minWidth: 800, height: 'auto' }}
        >
          <defs>
            {arrowColors.map(color => (
              <marker
                key={color}
                id={`arrow-${color.replace('#', '')}`}
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L0,6 L8,3 z" fill={color} opacity={0.85} />
              </marker>
            ))}
          </defs>

          {COLUMN_LABELS.map(col => (
            <g key={col.x}>
              <line x1={col.x} y1={18} x2={col.x} y2={530} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,6" opacity={0.5} />
              <text x={col.x} y={16} textAnchor="middle" fontSize={9} fill="#94a3b8" fontWeight="600" letterSpacing="0.08em" style={{ textTransform: 'uppercase' }}>
                {col.label.toUpperCase()}
              </text>
            </g>
          ))}

          {graphEdges.map((edge, i) => (
            <EdgeArrow key={i} edge={edge} dimmed={isEdgeDimmed(edge)} />
          ))}

          {graphNodes.map(node => (
            <GraphNode
              key={node.id}
              node={node}
              isActive={isActive(node.id)}
              isDimmed={isDimmed(node.id)}
              onHover={setHoveredNode}
              onLeave={() => setHoveredNode(null)}
              onClick={setSelectedNode}
            />
          ))}
        </svg>

        {displayNode && (
          <div className="absolute inset-0 pointer-events-none">
            <Tooltip node={displayNode} />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 px-1">
        {[
          { type: 'drug', label: 'Drug' },
          { type: 'indication', label: 'Indication' },
          { type: 'population_active', label: 'Population (Elderly)' },
          { type: 'ae_high', label: 'High-severity AE' },
          { type: 'ae_mid', label: 'Mid-severity AE' },
          { type: 'evidence_support', label: 'Supporting Evidence' },
          { type: 'evidence_contra', label: 'Contradicting Evidence' },
          { type: 'evidence_partial', label: 'Partial Evidence' },
          { type: 'signal', label: 'Signal' },
        ].map(item => {
          const s = NODE_STYLES[item.type]
          return (
            <div key={item.type} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.fill }} />
              <span className="text-xs text-slate-500">{item.label}</span>
            </div>
          )
        })}
        <div className="flex items-center gap-1.5">
          <svg width="18" height="8"><line x1="0" y1="4" x2="18" y2="4" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4,3" /></svg>
          <span className="text-xs text-slate-500">Contradicting relationship</span>
        </div>
      </div>
    </div>
  )
}
