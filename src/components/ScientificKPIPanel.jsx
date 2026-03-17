import { Clock, Database, Link2, Eye, Lightbulb } from 'lucide-react'

const ScientificKPIPanel = () => {
  return (
    <div className="card bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Scientific Intelligence Impact</h3>
        <p className="text-sm text-slate-600">
          Measuring how AI supports Medical Affairs teams in evidence synthesis and hypothesis generation
        </p>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-6 h-6 text-slate-600" />
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">↓ 78%</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">2.5 hrs</div>
          <div className="text-xs text-slate-600 uppercase tracking-wide font-semibold">Time to Scientific Insight</div>
          <div className="text-xs text-slate-500 mt-2">vs. 11.5 hrs manual synthesis</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <Database className="w-6 h-6 text-slate-600" />
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded">Sources</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">12</div>
          <div className="text-xs text-slate-600 uppercase tracking-wide font-semibold">Evidence Coverage</div>
          <div className="text-xs text-slate-500 mt-2">Databases synthesized</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <Link2 className="w-6 h-6 text-slate-600" />
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded">Verified</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">100%</div>
          <div className="text-xs text-slate-600 uppercase tracking-wide font-semibold">Traceability</div>
          <div className="text-xs text-slate-500 mt-2">Linked to source data</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <Eye className="w-6 h-6 text-slate-600" />
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded">Explainable</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">95%</div>
          <div className="text-xs text-slate-600 uppercase tracking-wide font-semibold">Model Transparency</div>
          <div className="text-xs text-slate-500 mt-2">With confidence intervals</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <Lightbulb className="w-6 h-6 text-slate-600" />
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Active</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">47</div>
          <div className="text-xs text-slate-600 uppercase tracking-wide font-semibold">Hypotheses Generated</div>
          <div className="text-xs text-slate-500 mt-2">For further investigation</div>
        </div>
      </div>

      <div className="mt-6 bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-start space-x-4">
          <div className="bg-slate-100 p-3 rounded-lg">
            <Lightbulb className="w-5 h-5 text-slate-700" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-900 mb-2">Value Proposition</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              This platform serves as a <strong>Scientific Intelligence Layer</strong> that helps Medical Affairs teams move from fragmented scientific data to structured insight. 
              By synthesizing evidence from multiple public databases and applying probabilistic modeling, the system accelerates hypothesis generation while maintaining full traceability to source data. 
              <strong className="text-slate-900"> This augments clinical expertise and scientific reasoning, not replaces it.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScientificKPIPanel
