import { useState } from 'react'
import {
  Database, Network, TrendingUp, Shield, CheckCircle,
  ArrowRight, Server, Zap, GitBranch,
  FileText, ChevronDown, ChevronUp, Activity, Layers, Users
} from 'lucide-react'

const PORTFOLIO = [
  {
    id: 'ELIQUIS',
    name: 'Eliquis',
    generic: 'Apixaban',
    class: 'Factor Xa Inhibitor',
    category: 'Oral Anticoagulant',
    status: 'active',
    statusLabel: 'Active Signal',
    signalId: 'SIG-2024-ELIQUIS-001',
    signalName: 'Increased bleeding risk in elderly (≥65)',
    anchorAE: 'Major Haemorrhage',
    indications: ['Atrial Fibrillation', 'VTE Treatment', 'DVT Prevention'],
    stats: { cases: 40, evidence: 5, signals: 1, indications: 3, aeNodes: 4 },
    prr: 2.41,
    priority: 'High',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    accent: '#2563eb',
    statusBg: 'bg-amber-100 text-amber-800',
    classBg: 'bg-blue-100 text-blue-800',
  },
  {
    id: 'BREYANZI',
    name: 'Breyanzi',
    generic: 'lisocabtagene maraleucel',
    class: 'CAR-T Cell Therapy',
    category: 'CD19-directed',
    status: 'active',
    statusLabel: 'Active Signal',
    signalId: 'SIG-2024-BREYANZI-001',
    signalName: 'CRS/ICANS risk in r/r Large B-Cell Lymphoma',
    anchorAE: 'Cytokine Release Syndrome',
    indications: ['Large B-Cell Lymphoma'],
    stats: { cases: 6, evidence: 2, signals: 1, indications: 1, aeNodes: 3 },
    prr: 3.12,
    priority: 'High',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    accent: '#7c3aed',
    statusBg: 'bg-amber-100 text-amber-800',
    classBg: 'bg-violet-100 text-violet-800',
  },
  {
    id: 'ABECMA',
    name: 'Abecma',
    generic: 'idecabtagene vicleucel',
    class: 'CAR-T Cell Therapy',
    category: 'BCMA-directed',
    status: 'active',
    statusLabel: 'Active Signal',
    signalId: 'SIG-2024-ABECMA-001',
    signalName: 'CRS/ICANS + infection risk in r/r Multiple Myeloma',
    anchorAE: 'Cytokine Release Syndrome',
    indications: ['Multiple Myeloma'],
    stats: { cases: 6, evidence: 2, signals: 1, indications: 1, aeNodes: 3 },
    prr: 2.87,
    priority: 'High',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    accent: '#e11d48',
    statusBg: 'bg-amber-100 text-amber-800',
    classBg: 'bg-rose-100 text-rose-800',
  },
]

const PIPELINE_STAGES = [
  {
    id: 'sources',
    label: 'Data Sources',
    icon: FileText,
    colorClass: 'bg-blue-500',
    lightBg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    items: ['ICSR — Physician', 'ICSR — Hospital', 'ICSR — Patient', 'Literature / RWE'],
  },
  {
    id: 'code',
    label: 'Ingest & Code',
    icon: Server,
    colorClass: 'bg-purple-500',
    lightBg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    items: ['MedDRA PT Coding', 'Seriousness Classification', 'Population Tagging', 'Drug–AE Linking'],
  },
  {
    id: 'graph',
    label: 'Neo4j Graph',
    icon: Network,
    colorClass: 'bg-teal-500',
    lightBg: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-700',
    items: ['Node Creation', 'Relationship Mapping', 'Cross-drug Indexing', 'Evidence Linking'],
  },
  {
    id: 'detect',
    label: 'Signal Detection',
    icon: TrendingUp,
    colorClass: 'bg-amber-500',
    lightBg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    items: ['PRR / ROR Scoring', 'EB-MGPS Calculation', 'Population Stratification', 'Disproportionality'],
  },
  {
    id: 'assess',
    label: 'Signal Assessment',
    icon: Shield,
    colorClass: 'bg-red-500',
    lightBg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    items: ['Clinical Contextualization', 'Evidence Review', 'Traceability Chain', 'Regulatory Action'],
  },
]

const NEO4J_NODES = [
  { label: 'Drug', count: 3, color: '#2563eb', desc: 'Pharmaceutical compound', pct: 100 },
  { label: 'Case (ICSR)', count: 52, color: '#7c3aed', desc: 'Individual case safety report', pct: 100 },
  { label: 'AdverseEvent', count: 8, color: '#dc2626', desc: 'MedDRA-coded adverse event', pct: 100 },
  { label: 'Indication', count: 5, color: '#0891b2', desc: 'Approved therapeutic indication', pct: 100 },
  { label: 'Population', count: 4, color: '#6d28d9', desc: 'Patient sub-group', pct: 100 },
  { label: 'Evidence', count: 9, color: '#059669', desc: 'Published study / registry', pct: 100 },
  { label: 'Signal', count: 3, color: '#b45309', desc: 'PV signal under assessment', pct: 100 },
]

const NEO4J_RELS = [
  { type: 'SUSPECTS', from: 'Case', to: 'Drug', desc: 'Drug suspected in adverse event' },
  { type: 'REPORTS_EVENT', from: 'Case', to: 'AdverseEvent', desc: 'Event type reported in case' },
  { type: 'BELONGS_TO', from: 'Case', to: 'Population', desc: 'Patient sub-group assignment' },
  { type: 'INDICATED_FOR', from: 'Drug', to: 'Indication', desc: 'Approved therapeutic use' },
  { type: 'PRESCRIBED_TO', from: 'Indication', to: 'Population', desc: 'Indication-to-population link' },
  { type: 'EVALUATES', from: 'Evidence', to: 'AdverseEvent', desc: 'Study evaluates this AE' },
  { type: 'CONSTITUTES', from: 'Evidence', to: 'Signal', desc: 'Study supports the signal' },
  { type: 'CHALLENGES', from: 'Evidence', to: 'Signal', desc: 'Study contradicts the signal' },
  { type: 'PARTIALLY_SUPPORTS', from: 'Evidence', to: 'Signal', desc: 'Partial support for signal' },
  { type: 'CONCERNS', from: 'Signal', to: 'Drug', desc: 'Signal linked to drug' },
  { type: 'FOCUSES_ON', from: 'Signal', to: 'Population', desc: 'Signal population scope' },
]

const NODE_TYPE_COLORS = {
  Drug: 'bg-blue-100 text-blue-800',
  Indication: 'bg-cyan-100 text-cyan-800',
  AdverseEvent: 'bg-red-100 text-red-800',
  Population: 'bg-violet-100 text-violet-800',
  Signal: 'bg-amber-100 text-amber-800',
}

const DRUG_DETAILS = {
  BREYANZI: {
    drug: PORTFOLIO[1],
    graphNodes: [
      { type: 'Drug', id: 'BREYANZI', detail: 'lisocabtagene maraleucel · CAR-T · CD19-directed · 2021' },
      { type: 'Indication', id: 'LBCL', detail: 'Large B-Cell Lymphoma — r/r after ≥2 prior therapies' },
      { type: 'AdverseEvent', id: 'AE_CRS', detail: 'Cytokine Release Syndrome · PT10063110 · Immune system disorders' },
      { type: 'AdverseEvent', id: 'AE_ICANS', detail: 'Neurotoxicity (ICANS) · PT10083834 · Nervous system disorders' },
      { type: 'AdverseEvent', id: 'AE_CYTOPENIA', detail: 'Prolonged Cytopenias · PT10038742 · Blood disorders (shared with Abecma)' },
      { type: 'Population', id: 'POP_RRBC', detail: 'Relapsed/Refractory B-cell Lymphoma · mixed age group' },
      { type: 'Signal', id: 'SIG-2024-BREYANZI-001', detail: 'PRR 3.12 · Under Assessment · High Priority' },
    ],
    cases: [
      { id: 'ICSR-B-001', age: 58, gender: 'F', event: 'CRS Grade 3', severity: 'serious', outcome: 'recovered', country: 'USA', seriousness: 'Hospitalization' },
      { id: 'ICSR-B-002', age: 72, gender: 'M', event: 'ICANS Grade 2', severity: 'serious', outcome: 'recovered', country: 'Germany', seriousness: 'Hospitalization' },
      { id: 'ICSR-B-003', age: 65, gender: 'F', event: 'CRS Grade 4', severity: 'serious', outcome: 'recovering', country: 'UK', seriousness: 'Life-threatening' },
      { id: 'ICSR-B-004', age: 45, gender: 'M', event: 'Prolonged Cytopenia', severity: 'non-serious', outcome: 'recovered', country: 'USA', seriousness: 'Medically significant' },
      { id: 'ICSR-B-005', age: 67, gender: 'F', event: 'CRS Grade 2', severity: 'non-serious', outcome: 'recovered', country: 'France', seriousness: 'Non-serious' },
      { id: 'ICSR-B-006', age: 78, gender: 'M', event: 'ICANS Gr.3 + CRS Gr.3', severity: 'serious', outcome: 'recovering', country: 'Germany', seriousness: 'Life-threatening' },
    ],
    evidence: [
      { id: 'EVD-B-001', title: 'TRANSCEND NHL 001 — CRS/ICANS Safety Analysis', journal: 'The Lancet', year: 2021, n: 256, metric: 'CRS any grade: 42% · Grade ≥3: 4% · ICANS any: 28%' },
      { id: 'EVD-B-002', title: 'Breyanzi REMS — Post-marketing Safety Update', journal: 'FDA Safety Database', year: 2023, n: 847, metric: 'Grade ≥3 CRS: 3.1% · ICANS Grade ≥3: 8.7% post-market' },
    ],
  },
  ABECMA: {
    drug: PORTFOLIO[2],
    graphNodes: [
      { type: 'Drug', id: 'ABECMA', detail: 'idecabtagene vicleucel · CAR-T · BCMA-directed · 2021' },
      { type: 'Indication', id: 'MM', detail: 'Multiple Myeloma — r/r after ≥4 prior therapies' },
      { type: 'AdverseEvent', id: 'AE_CRS', detail: 'Cytokine Release Syndrome · shared node with Breyanzi · PT10063110' },
      { type: 'AdverseEvent', id: 'AE_ICANS', detail: 'Neurotoxicity (ICANS) · shared node with Breyanzi · PT10083834' },
      { type: 'AdverseEvent', id: 'AE_INFECTION', detail: 'Serious Infection · PT10021881 · Infections and infestations' },
      { type: 'Population', id: 'POP_RRMM', detail: 'Relapsed/Refractory Multiple Myeloma · mixed age group' },
      { type: 'Signal', id: 'SIG-2024-ABECMA-001', detail: 'PRR 2.87 · Under Assessment · High Priority' },
    ],
    cases: [
      { id: 'ICSR-A-001', age: 62, gender: 'F', event: 'CRS Grade 3', severity: 'serious', outcome: 'recovered', country: 'USA', seriousness: 'Hospitalization' },
      { id: 'ICSR-A-002', age: 70, gender: 'M', event: 'ICANS Grade 3', severity: 'serious', outcome: 'not recovered', country: 'UK', seriousness: 'Life-threatening' },
      { id: 'ICSR-A-003', age: 55, gender: 'F', event: 'Prolonged Cytopenia', severity: 'serious', outcome: 'recovering', country: 'USA', seriousness: 'Hospitalization' },
      { id: 'ICSR-A-004', age: 68, gender: 'M', event: 'CRS Grade 2', severity: 'non-serious', outcome: 'recovered', country: 'Germany', seriousness: 'Medically significant' },
      { id: 'ICSR-A-005', age: 74, gender: 'F', event: 'ICANS Grade 2', severity: 'non-serious', outcome: 'recovered', country: 'France', seriousness: 'Non-serious' },
      { id: 'ICSR-A-006', age: 61, gender: 'M', event: 'CRS Gr.4 + Sepsis', severity: 'serious', outcome: 'fatal', country: 'USA', seriousness: 'Death' },
    ],
    evidence: [
      { id: 'EVD-A-001', title: 'KarMMa Trial — CRS Grade 3+ Sub-analysis', journal: 'New England Journal of Medicine', year: 2021, n: 128, metric: 'CRS any grade: 84% · Grade ≥3: 5% · ICANS Grade ≥3: 3%' },
      { id: 'EVD-A-002', title: 'Abecma REMS — Post-marketing Safety Review', journal: 'FDA Safety Database', year: 2023, n: 512, metric: 'Grade ≥3 CRS: 4.7% · Serious infections at 1yr: 22%' },
    ],
  },
}

const QUERY_CATALOGUE = [
  {
    id: 'signal-graph',
    uiTab: 'Signal Graph',
    badgeCls: 'text-blue-700 bg-blue-50',
    borderCls: 'border-blue-200',
    title: 'Full Drug Subgraph — Knowledge Graph Render',
    desc: 'Powers the Signal Graph tab — loads every connected node and edge for the drug to render the animated SVG knowledge graph.',
    query: `MATCH (d:Drug {id: $drugId})
OPTIONAL MATCH (d)-[:INDICATED_FOR]->(i:Indication)
OPTIONAL MATCH (i)-[:PRESCRIBED_TO]->(p:Population)
OPTIONAL MATCH (s:Signal)-[:CONCERNS]->(d)
OPTIONAL MATCH (s)-[:FOCUSES_ON]->(sp:Population)
OPTIONAL MATCH (c:Case)-[:SUSPECTS]->(d)
OPTIONAL MATCH (c)-[:REPORTS_EVENT]->(ae:AdverseEvent)
OPTIONAL MATCH (c)-[:BELONGS_TO]->(cp:Population)
RETURN d, i, p, s, sp,
       collect(DISTINCT ae) AS aes,
       count(DISTINCT c)    AS caseCount`,
  },
  {
    id: 'case-explorer',
    uiTab: 'Case Analysis',
    badgeCls: 'text-violet-700 bg-violet-50',
    borderCls: 'border-violet-200',
    title: 'ICSR Rows — Case Explorer Table',
    desc: 'Powers the Case Analysis tab — returns one row per ICSR with AE, severity, outcome, and population for the filter and sort table.',
    query: `MATCH (c:Case)-[:SUSPECTS]->(d:Drug {id: $drugId})
MATCH (c)-[:REPORTS_EVENT]->(ae:AdverseEvent)
MATCH (c)-[:BELONGS_TO]->(p:Population)
RETURN c.id       AS caseId,
       c.age      AS age,
       c.gender   AS gender,
       c.country  AS country,
       c.severity AS severity,
       c.outcome  AS outcome,
       c.seriousnessCategory AS seriousness,
       ae.label   AS adverseEvent,
       ae.soc     AS systemOrganClass,
       p.label    AS population
ORDER BY c.dateReported DESC`,
  },
  {
    id: 'evidence',
    uiTab: 'Evidence Review',
    badgeCls: 'text-emerald-700 bg-emerald-50',
    borderCls: 'border-emerald-200',
    title: 'Evidence + Stance — Evidence Panel Cards',
    desc: 'Powers the Evidence Review tab — fetches evidence with stance classification, quality score, and linked AEs to render supporting / challenging split.',
    query: `MATCH (s:Signal)-[:CONCERNS]->(d:Drug {id: $drugId})
MATCH (e:Evidence)-[r:CONSTITUTES|CHALLENGES|PARTIALLY_SUPPORTS]->(s)
MATCH (e)-[:EVALUATES]->(ae:AdverseEvent)
RETURN e.id           AS evidenceId,
       e.title        AS title,
       e.journal      AS journal,
       e.year         AS year,
       e.stance       AS stance,
       e.qualityScore AS qualityScore,
       e.sampleSize   AS sampleSize,
       e.keyMetric    AS keyMetric,
       type(r)        AS signalRelationship,
       collect(ae.label) AS linkedAEs
ORDER BY e.qualityScore DESC`,
  },
  {
    id: 'signal-assessment',
    uiTab: 'Signal Assessment',
    badgeCls: 'text-amber-700 bg-amber-50',
    borderCls: 'border-amber-200',
    title: 'PRR Disproportionality — Signal Assessment Metrics',
    desc: 'Powers the Signal Assessment tab — builds the 2×2 contingency table and computes PRR from ICSR case relationships in the graph.',
    query: `// Cell a: cases with this drug AND this AE
MATCH (c:Case)-[:SUSPECTS]->(d:Drug {id: $drugId})
MATCH (c)-[:REPORTS_EVENT]->(ae:AdverseEvent {id: $aeId})
WITH count(c) AS a

// Cell b: cases with this drug, NOT this AE
MATCH (c2:Case)-[:SUSPECTS]->(d2:Drug {id: $drugId})
WHERE NOT (c2)-[:REPORTS_EVENT]->(:AdverseEvent {id: $aeId})
WITH a, count(c2) AS b

// Cell c: this AE, different drug
MATCH (c3:Case)-[:REPORTS_EVENT]->(ae3:AdverseEvent {id: $aeId})
WHERE NOT (c3)-[:SUSPECTS]->(:Drug {id: $drugId})
WITH a, b, count(c3) AS c

// Cell d: all remaining cases
MATCH (c4:Case)
WITH a, b, c, count(c4) - a - b - c AS d

RETURN a, b, c, d,
  round(toFloat(a*(c+d)) / ((a+b)*c) * 100) / 100 AS PRR`,
  },
  {
    id: 'portfolio',
    uiTab: 'Portfolio Overview',
    badgeCls: 'text-slate-700 bg-slate-100',
    borderCls: 'border-slate-300',
    title: 'Cross-Drug Portfolio Summary',
    desc: 'Powers the Portfolio drug cards — returns aggregated case, evidence, and signal stats for every drug in a single traversal.',
    query: `MATCH (d:Drug)
OPTIONAL MATCH (s:Signal)-[:CONCERNS]->(d)
OPTIONAL MATCH (c:Case)-[:SUSPECTS]->(d)
OPTIONAL MATCH (e:Evidence)-[:CONSTITUTES]->(s)
OPTIONAL MATCH (d)-[:INDICATED_FOR]->(i:Indication)
RETURN d.id                AS drugId,
       d.name              AS name,
       d.class             AS class,
       s.id                AS signalId,
       s.prr               AS prr,
       s.status            AS signalStatus,
       count(DISTINCT c)   AS totalCases,
       count(DISTINCT e)   AS evidenceCount,
       count(DISTINCT i)   AS indications
ORDER BY totalCases DESC`,
  },
  {
    id: 'car-t',
    uiTab: 'CAR-T Cross-Drug',
    badgeCls: 'text-rose-700 bg-rose-50',
    borderCls: 'border-rose-200',
    title: 'Shared AE Nodes — CRS/ICANS Cross-Drug Link',
    desc: 'AE_CRS and AE_ICANS are the same Neo4j nodes for both Breyanzi and Abecma — same elementId, reused via MERGE. This query proves the cross-drug link.',
    query: `// Reports by shared AE node across both CAR-T drugs
MATCH (ae:AdverseEvent)
WHERE ae.id IN ['AE_CRS', 'AE_ICANS']
MATCH (c:Case)-[:REPORTS_EVENT]->(ae)
MATCH (c)-[:SUSPECTS]->(d:Drug)
WHERE d.id IN ['BREYANZI', 'ABECMA']
RETURN ae.id      AS sharedNodeId,
       ae.label   AS adverseEvent,
       d.name     AS drug,
       count(c)   AS reportedCases
ORDER BY ae.id, d.name

// Verify same Neo4j node (elementId identical)
MATCH (b:Drug {id:'BREYANZI'})<-[:SUSPECTS]-(c1:Case)
      -[:REPORTS_EVENT]->(ae:AdverseEvent {id:'AE_CRS'})
MATCH (a:Drug {id:'ABECMA'})<-[:SUSPECTS]-(c2:Case)
      -[:REPORTS_EVENT]->(ae)
RETURN elementId(ae)        AS sameNeo4jNodeId,
       ae.label             AS label,
       count(DISTINCT c1)   AS breyanziCases,
       count(DISTINCT c2)   AS abecmaCases`,
  },
]

const MINI_GRAPH_NODES = {
  BREYANZI: [
    { id: 'drug',   x: 265, y: 155, r: 30, fill: '#7c3aed', label: 'Breyanzi',      sub: 'Drug' },
    { id: 'signal', x: 420, y: 65,  r: 23, fill: '#b45309', label: 'SIG-BREYANZI',  sub: 'Signal' },
    { id: 'ind',    x: 105, y: 65,  r: 21, fill: '#0891b2', label: 'LBCL',          sub: 'Indication' },
    { id: 'pop',    x: 55,  y: 220, r: 20, fill: '#6d28d9', label: 'POP_RRBC',      sub: 'Population' },
    { id: 'cases',  x: 455, y: 200, r: 22, fill: '#5b21b6', label: '6 ICSRs',       sub: 'Case' },
    { id: 'crs',    x: 345, y: 300, r: 20, fill: '#dc2626', label: 'AE_CRS',        sub: 'AdverseEvent' },
    { id: 'icans',  x: 185, y: 300, r: 20, fill: '#dc2626', label: 'AE_ICANS',      sub: 'AdverseEvent' },
    { id: 'evd',    x: 478, y: 315, r: 19, fill: '#059669', label: '2 Evidence',    sub: 'Evidence' },
  ],
  ABECMA: [
    { id: 'drug',      x: 265, y: 155, r: 30, fill: '#e11d48', label: 'Abecma',        sub: 'Drug' },
    { id: 'signal',    x: 420, y: 65,  r: 23, fill: '#b45309', label: 'SIG-ABECMA',    sub: 'Signal' },
    { id: 'ind',       x: 105, y: 65,  r: 21, fill: '#0891b2', label: 'MM',             sub: 'Indication' },
    { id: 'pop',       x: 55,  y: 220, r: 20, fill: '#6d28d9', label: 'POP_RRMM',       sub: 'Population' },
    { id: 'cases',     x: 455, y: 200, r: 22, fill: '#5b21b6', label: '6 ICSRs',        sub: 'Case' },
    { id: 'crs',       x: 315, y: 300, r: 20, fill: '#dc2626', label: 'AE_CRS',         sub: '⟳ shared' },
    { id: 'icans',     x: 165, y: 300, r: 20, fill: '#dc2626', label: 'AE_ICANS',       sub: '⟳ shared' },
    { id: 'infection', x: 55,  y: 320, r: 18, fill: '#ea580c', label: 'AE_INFECTION',   sub: 'AdverseEvent' },
    { id: 'evd',       x: 478, y: 315, r: 19, fill: '#059669', label: '2 Evidence',     sub: 'Evidence' },
  ],
}

const MINI_GRAPH_EDGES = {
  BREYANZI: [
    { from: 'drug',   to: 'ind',    label: 'INDICATED_FOR' },
    { from: 'signal', to: 'drug',   label: 'CONCERNS' },
    { from: 'ind',    to: 'pop',    label: 'PRESCRIBED_TO' },
    { from: 'cases',  to: 'drug',   label: 'SUSPECTS' },
    { from: 'cases',  to: 'crs',    label: 'REPORTS_EVENT' },
    { from: 'cases',  to: 'pop',    label: 'BELONGS_TO' },
    { from: 'evd',    to: 'crs',    label: 'EVALUATES' },
    { from: 'evd',    to: 'signal', label: 'CONSTITUTES' },
    { from: 'signal', to: 'pop',    label: 'FOCUSES_ON' },
  ],
  ABECMA: [
    { from: 'drug',      to: 'ind',       label: 'INDICATED_FOR' },
    { from: 'signal',    to: 'drug',      label: 'CONCERNS' },
    { from: 'ind',       to: 'pop',       label: 'PRESCRIBED_TO' },
    { from: 'cases',     to: 'drug',      label: 'SUSPECTS' },
    { from: 'cases',     to: 'crs',       label: 'REPORTS_EVENT' },
    { from: 'cases',     to: 'pop',       label: 'BELONGS_TO' },
    { from: 'cases',     to: 'infection', label: 'REPORTS_EVENT' },
    { from: 'evd',       to: 'crs',       label: 'EVALUATES' },
    { from: 'evd',       to: 'infection', label: 'EVALUATES' },
    { from: 'evd',       to: 'signal',    label: 'CONSTITUTES' },
    { from: 'signal',    to: 'pop',       label: 'FOCUSES_ON' },
  ],
}

function DrugCard({ drug }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`rounded-xl border ${drug.border} ${drug.bg} overflow-hidden cursor-pointer hover:shadow-md transition-all`}
      onClick={() => setOpen(o => !o)}
    >
      <div className="px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${drug.statusBg}`}>{drug.statusLabel}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${drug.classBg}`}>{drug.class}</span>
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-base font-black text-slate-900">{drug.name}</span>
              <span className="text-xs text-slate-500 italic">{drug.generic}</span>
            </div>
            {drug.signalName && (
              <p className="text-xs text-slate-600 mt-1 leading-snug">{drug.signalName}</p>
            )}
          </div>
          <div className="flex-shrink-0 mt-1">
            {open ? <ChevronUp size={15} className="text-slate-400" /> : <ChevronDown size={15} className="text-slate-400" />}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { label: 'ICSRs', value: drug.stats.cases },
            { label: 'Evidence', value: drug.stats.evidence },
            { label: 'Signals', value: drug.stats.signals },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-lg px-2 py-1.5 text-center border border-white/60">
              <div className="text-lg font-bold" style={{ color: drug.accent }}>{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-white/50 bg-white/40 space-y-2">
          <div className="text-xs">
            <span className="text-slate-400 font-semibold uppercase tracking-wide">Indications · </span>
            {drug.indications.map(i => (
              <span key={i} className="mr-1 text-slate-700">{i}</span>
            ))}
          </div>
          {drug.prr && (
            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400 font-semibold">PRR</span>
              <span className="font-bold font-mono" style={{ color: drug.accent }}>{drug.prr}</span>
              <span className="text-slate-400 font-semibold">Anchor AE</span>
              <span className="text-slate-700">{drug.anchorAE}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle size={11} className="text-emerald-600" />
            <span className="text-emerald-700 font-semibold">In Neo4j</span>
          </div>
          {drug.signalId && (
            <div className="font-mono text-xs text-slate-400">{drug.signalId}</div>
          )}
        </div>
      )}
    </div>
  )
}

function PipelineStage({ stage, isLast }) {
  const Icon = stage.icon
  return (
    <div className="flex items-stretch gap-0 min-w-[140px]">
      <div className={`flex-1 rounded-xl border ${stage.border} ${stage.lightBg} p-3`}>
        <div className="flex items-center gap-2 mb-2">
          <div className={`${stage.colorClass} p-1.5 rounded-lg flex-shrink-0`}>
            <Icon size={12} className="text-white" />
          </div>
          <span className={`text-xs font-bold uppercase tracking-wide ${stage.text}`}>{stage.label}</span>
        </div>
        <ul className="space-y-1">
          {stage.items.map(item => (
            <li key={item} className={`text-xs ${stage.text} flex items-center gap-1.5`}>
              <span className={`w-1 h-1 rounded-full ${stage.colorClass} flex-shrink-0`} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      {!isLast && (
        <div className="flex items-center px-1 flex-shrink-0">
          <ArrowRight size={14} className="text-slate-300" />
        </div>
      )}
    </div>
  )
}

function MiniGraph({ drugId }) {
  const nodes = MINI_GRAPH_NODES[drugId] || []
  const edges = MINI_GRAPH_EDGES[drugId] || []
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

  function edgePts(fromId, toId) {
    const f = nodeMap[fromId]
    const t = nodeMap[toId]
    if (!f || !t) return null
    const dx = t.x - f.x
    const dy = t.y - f.y
    const dist = Math.sqrt(dx * dx + dy * dy) || 1
    const nx = dx / dist
    const ny = dy / dist
    return {
      x1: f.x + nx * (f.r + 2), y1: f.y + ny * (f.r + 2),
      x2: t.x - nx * (t.r + 8), y2: t.y - ny * (t.r + 8),
      mx: (f.x + t.x) / 2,      my: (f.y + t.y) / 2,
    }
  }

  return (
    <svg viewBox="0 0 530 360" className="w-full h-auto select-none" style={{ maxHeight: 340 }}>
      <defs>
        <marker id={`arr-${drugId}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
        </marker>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="530" height="360" fill="#0f172a" rx="12" />

      {/* Edges */}
      {edges.map((e, i) => {
        const p = edgePts(e.from, e.to)
        if (!p) return null
        return (
          <g key={i}>
            <line x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
              stroke="#334155" strokeWidth="1.5"
              markerEnd={`url(#arr-${drugId})`} />
            <text x={p.mx} y={p.my - 5} textAnchor="middle"
              fontSize="6.5" fill="#64748b" fontFamily="monospace">
              {e.label}
            </text>
          </g>
        )
      })}

      {/* Nodes */}
      {nodes.map(n => (
        <g key={n.id}>
          {n.sub === '⟳ shared' && (
            <circle cx={n.x} cy={n.y} r={n.r + 5}
              fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.8" />
          )}
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.fill} opacity="0.92" />
          <text x={n.x} y={n.y - 3} textAnchor="middle"
            fontSize="7.5" fill="white" fontWeight="bold" fontFamily="ui-sans-serif,system-ui,sans-serif">
            {n.label}
          </text>
          <text x={n.x} y={n.y + 9} textAnchor="middle"
            fontSize="6.5" fill="rgba(255,255,255,0.65)" fontFamily="ui-sans-serif,system-ui,sans-serif">
            {n.sub}
          </text>
        </g>
      ))}

      {/* Legend */}
      {drugId === 'ABECMA' && (
        <g>
          <circle cx="20" cy="345" r="4" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 1.5" />
          <text x="28" y="349" fontSize="7" fill="#94a3b8" fontFamily="monospace">= shared node (MERGE — same Neo4j elementId as Breyanzi)</text>
        </g>
      )}
    </svg>
  )
}

function NodeTypeBadge({ type }) {
  const cls = NODE_TYPE_COLORS[type] || 'bg-slate-100 text-slate-700'
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${cls}`}>{type}</span>
}

export default function PortfolioPipeline() {
  const [selectedDrug, setSelectedDrug] = useState('BREYANZI')
  const [graphDrug, setGraphDrug] = useState('BREYANZI')
  const detail = DRUG_DETAILS[selectedDrug]

  return (
    <div className="space-y-8">

      {/* Section 1: Drug Portfolio */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-slate-800 p-1.5 rounded-lg">
            <Layers size={14} className="text-white" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">BMS Drug Portfolio</h3>
          <span className="text-xs text-slate-400 ml-1">3 drugs · all signals under assessment · click to expand</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PORTFOLIO.map(drug => <DrugCard key={drug.id} drug={drug} />)}
        </div>
      </div>

      {/* Section 2: PV Data Pipeline */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-slate-800 p-1.5 rounded-lg">
            <GitBranch size={14} className="text-white" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">PV Data Pipeline</h3>
          <span className="text-xs text-slate-400">How an ICSR becomes a signal — same flow for all 3 drugs</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-stretch gap-0 overflow-x-auto pb-2">
            {PIPELINE_STAGES.map((stage, i) => (
              <PipelineStage key={stage.id} stage={stage} isLast={i === PIPELINE_STAGES.length - 1} />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            {[
              { label: 'Total Graph Nodes', value: '84', sub: 'across 7 node types', color: '#2563eb' },
              { label: 'Total Relationships', value: '197', sub: 'across 11 rel. types', color: '#7c3aed' },
              { label: 'Drugs in Graph', value: '3', sub: 'Eliquis · Breyanzi · Abecma', color: '#0891b2' },
              { label: 'Active Signals', value: '3', sub: 'all under assessment', color: '#b45309' },
            ].map(m => (
              <div key={m.label} className="bg-slate-50 rounded-lg px-3 py-2.5">
                <div className="text-xs text-slate-400 font-semibold mb-0.5">{m.label}</div>
                <div className="text-xl font-bold" style={{ color: m.color }}>{m.value}</div>
                <div className="text-xs text-slate-400">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Neo4j Graph Schema */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-slate-800 p-1.5 rounded-lg">
            <Database size={14} className="text-white" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Neo4j Graph Schema</h3>
          <span className="text-xs font-mono text-slate-400"></span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Activity size={11} /> Node Inventory — live counts
            </div>
            <div className="space-y-2">
              {NEO4J_NODES.map(node => (
                <div key={node.label} className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: node.color }} />
                  <span className="text-xs font-semibold text-slate-700 w-28 flex-shrink-0">{node.label}</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '100%', background: node.color + '88' }} />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-800 w-6 text-right flex-shrink-0">{node.count}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-700">
              <CheckCircle size={11} className="text-emerald-600" />
              <span className="font-semibold">84 total nodes · all live in Neo4j</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Zap size={11} /> Relationship Types — 197 total
            </div>
            <div className="space-y-1.5">
              {NEO4J_RELS.map(rel => (
                <div key={rel.type} className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded text-xs w-40 flex-shrink-0 truncate">{rel.type}</span>
                  <NodeTypeBadge type={rel.from} />
                  <ArrowRight size={10} className="text-slate-300 flex-shrink-0" />
                  <NodeTypeBadge type={rel.to} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: CAR-T Drug Detail */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-slate-800 p-1.5 rounded-lg">
            <Shield size={14} className="text-white" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">CAR-T Drug Detail</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Breyanzi and Abecma demonstrate how the same graph model handles structurally distinct drug classes.
          Both share CRS/ICANS adverse event nodes — showing cross-drug AE reuse — while keeping separate signals, indications, and populations.
        </p>

        <div className="flex gap-2 mb-4">
          {['BREYANZI', 'ABECMA'].map(id => {
            const d = PORTFOLIO.find(p => p.id === id)
            return (
              <button
                key={id}
                onClick={() => setSelectedDrug(id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                  selectedDrug === id
                    ? id === 'BREYANZI'
                      ? 'bg-violet-900 text-white border-violet-900 shadow-sm'
                      : 'bg-rose-700 text-white border-rose-700 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${id === 'BREYANZI' ? 'bg-violet-400' : 'bg-rose-400'}`} />
                {d.name}
                <span className={`text-xs font-normal ${selectedDrug === id ? 'opacity-70' : 'text-slate-400'}`}>{d.category}</span>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Graph Nodes for this drug */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Network size={11} /> Graph Nodes in Neo4j
            </div>
            <div className="space-y-2">
              {detail.graphNodes.map(node => (
                <div key={node.id} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                  <div className="flex items-center gap-2 mb-0.5">
                    <NodeTypeBadge type={node.type} />
                    <span className="text-xs font-mono font-bold text-slate-700">{node.id}</span>
                    <CheckCircle size={10} className="text-emerald-500 ml-auto flex-shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">{node.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ICSRs + Evidence */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Users size={11} /> ICSRs in Neo4j — {detail.cases.length} Cases
              </div>
              <div className="space-y-1.5">
                {detail.cases.map(c => (
                  <div key={c.id} className="flex items-center gap-2 text-xs border border-slate-100 rounded-lg px-3 py-2 bg-slate-50">
                    <span className="font-mono text-slate-400 w-20 flex-shrink-0">{c.id}</span>
                    <span className="text-slate-600 flex-1 truncate">{c.event}</span>
                    <span className={`flex-shrink-0 px-1.5 py-0.5 rounded font-semibold ${
                      c.severity === 'serious' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                    }`}>{c.severity}</span>
                    <span className={`flex-shrink-0 text-slate-400 ${
                      c.outcome === 'fatal' ? 'font-bold text-red-700' : ''
                    }`}>{c.outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <FileText size={11} /> Supporting Evidence
              </div>
              {detail.evidence.map(e => (
                <div key={e.id} className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2 mb-2">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-xs font-mono text-emerald-700">{e.id}</span>
                    <span className="text-xs text-slate-400">{e.journal} · {e.year}</span>
                    <span className="ml-auto text-xs text-slate-400">N={e.n.toLocaleString()}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-700">{e.title}</div>
                  <div className="text-xs text-emerald-700 font-mono mt-0.5 leading-relaxed">{e.metric}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Graph DB Demo */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-slate-800 p-1.5 rounded-lg">
            <Network size={14} className="text-white" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Graph DB Demo — How Data Is Stored</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Every entity is a labelled node; every relationship is a typed directed edge.
          Select a drug to see its actual Neo4j subgraph — all nodes and edges are live in the database right now.
        </p>

        <div className="flex gap-2 mb-4">
          {['BREYANZI', 'ABECMA'].map(id => (
            <button key={id}
              onClick={() => setGraphDrug(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                graphDrug === id
                  ? id === 'BREYANZI' ? 'bg-violet-900 text-white border-violet-900' : 'bg-rose-700 text-white border-rose-700'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}>
              <span className={`w-2 h-2 rounded-full ${id === 'BREYANZI' ? 'bg-violet-400' : 'bg-rose-400'}`} />
              {id === 'BREYANZI' ? 'Breyanzi' : 'Abecma'}
              <span className={`text-xs font-normal ${graphDrug === id ? 'opacity-70' : 'text-slate-400'}`}>
                {id === 'BREYANZI' ? '8 nodes · 9 edges' : '9 nodes · 11 edges'}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3 bg-slate-900 rounded-xl border border-slate-700 overflow-hidden p-2">
            <MiniGraph drugId={graphDrug} />
          </div>

          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Node Colour Key</div>
            <div className="space-y-2">
              {[
                { color: graphDrug === 'BREYANZI' ? '#7c3aed' : '#e11d48', label: 'Drug', desc: graphDrug === 'BREYANZI' ? 'Breyanzi' : 'Abecma' },
                { color: '#b45309', label: 'Signal', desc: graphDrug === 'BREYANZI' ? 'SIG-2024-BREYANZI-001' : 'SIG-2024-ABECMA-001' },
                { color: '#0891b2', label: 'Indication', desc: graphDrug === 'BREYANZI' ? 'LBCL' : 'Multiple Myeloma' },
                { color: '#6d28d9', label: 'Population', desc: graphDrug === 'BREYANZI' ? 'POP_RRBC' : 'POP_RRMM' },
                { color: '#5b21b6', label: 'Case', desc: '6 ICSRs (SUSPECTS → Drug)' },
                { color: '#dc2626', label: 'AdverseEvent', desc: 'AE_CRS · AE_ICANS (shared via MERGE)' },
                ...(graphDrug === 'ABECMA' ? [{ color: '#ea580c', label: 'AdverseEvent', desc: 'AE_INFECTION (Abecma-specific)' }] : []),
                { color: '#059669', label: 'Evidence', desc: '2 studies (TRANSCEND / KarMMa)' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="font-semibold text-slate-700 w-20 flex-shrink-0">{item.label}</span>
                  <span className="text-slate-400 truncate">{item.desc}</span>
                </div>
              ))}
            </div>
            {graphDrug === 'ABECMA' && (
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Shared Nodes</div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-mono text-amber-600 font-bold">AE_CRS</span> and{' '}
                  <span className="font-mono text-amber-600 font-bold">AE_ICANS</span> are the{' '}
                  <span className="font-semibold">same Neo4j nodes</span> for both drugs —
                  injected via <span className="font-mono text-teal-600">MERGE</span> so they share one elementId.
                  Dashed gold ring marks shared nodes.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
