import React from 'react';
import { X, Sparkles, AlertCircle, ShieldCheck, Stethoscope, ChevronRight } from 'lucide-react';
import { AssessmentResult } from '../types';

interface AssessmentModalProps {
  assessment: AssessmentResult | null;
  loading: boolean;
  onClose: () => void;
  symptomsAnalyzed: string[];
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  assessment,
  loading,
  onClose,
  symptomsAnalyzed,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full border border-indigo-100 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#31276a] via-indigo-900 to-purple-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5 fill-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold">Clinical Assessment Result</h2>
              <p className="text-xs text-indigo-200">AI Powered Diagnostic Triage</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
              <p className="text-sm font-bold text-[#31276a] dark:text-purple-300">
                Evaluating clinical symptoms with Shushruta AI...
              </p>
            </div>
          ) : assessment ? (
            <>
              {/* Analyzed symptoms badge */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  Analyzed Symptoms
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {symptomsAnalyzed.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-slate-800 text-indigo-900 dark:text-purple-300 text-xs font-bold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Risk Gauge Header */}
              <div className="p-5 rounded-2xl bg-indigo-50/80 dark:bg-slate-800/80 border border-indigo-200/80 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                    Calculated Risk
                  </span>
                  <div className="text-2xl font-black text-[#31276a] dark:text-purple-200 mt-0.5">
                    {assessment.riskScore}% Risk ({assessment.riskLevel})
                  </div>
                  <span className="text-xs text-slate-500 font-semibold block mt-1">
                    Recommended Care: <strong className="text-indigo-600 dark:text-purple-300">{assessment.urgency}</strong>
                  </span>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-[#31276a] text-amber-300 flex items-center justify-center font-black text-xl shadow-md">
                  {assessment.riskScore}%
                </div>
              </div>

              {/* Clinical Summary */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                  Diagnostic Insight
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 leading-relaxed">
                  {assessment.summary}
                </p>
              </div>

              {/* Actionable Recommendations */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                  Actionable Care Steps
                </h4>
                <ul className="space-y-2">
                  {assessment.recommendations.map((rec, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-xs text-emerald-950 dark:text-emerald-200 font-medium"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Specialist */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Stethoscope className="w-5 h-5 text-amber-600" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Consult Specialist</span>
                    <span className="text-sm font-extrabold text-amber-950 dark:text-amber-200">
                      {assessment.recommendedSpecialist}
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 text-xs font-bold">
                  Recommended Specialist
                </span>
              </div>
            </>
          ) : null}
        </div>

        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#31276a] text-white text-xs font-bold hover:bg-[#251d52] transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
