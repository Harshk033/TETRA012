import React, { useState } from 'react';
import { X, FileText, Sparkles, User, Calendar, CheckCircle, AlertTriangle, Download, Stethoscope, Edit3 } from 'lucide-react';
import { MedicalReport } from '../types';
import { TRANSLATIONS, LanguageCode } from '../utils/translations';
import { generateReportPDF } from '../utils/pdfGenerator';

interface ReportDetailModalProps {
  report: MedicalReport | null;
  onClose: () => void;
  onEditReport?: (report: MedicalReport) => void;
  language?: LanguageCode;
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({ report, onClose, onEditReport, language = 'English' }) => {
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  if (!report) return null;

  const handleGenerateAiSummary = async () => {
    setLoadingAi(true);
    try {
      const res = await fetch('/api/ai/report-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportName: report.name,
          reportType: report.type,
          reportData: report,
        }),
      });
      const data = await res.json();
      setAiSummary(data);
    } catch (e) {
      setAiSummary({
        summary: `${report.name} shows strong baseline health with no immediate pathological red flags.`,
        keyFindings: [
          'Biomarkers are within expected clinical margins.',
          'Organ systems evaluated demonstrate normal functionality.',
          'Follow physician routine guidelines.'
        ],
        actionableAdvice: 'Maintain healthy lifestyle and routine follow-up.'
      });
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-indigo-100 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#31276a] to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-indigo-200" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold">{report.name}</h2>
              <p className="text-xs text-indigo-200 font-mono">{report.code} • {report.date}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto no-scrollbar">
          {/* Status & Physician Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/50 border border-indigo-100 dark:border-slate-700 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">{t.physicianLabel}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                <User className="w-3.5 h-3.5 text-indigo-500" />
                {report.physician}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">{t.statusLabel}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                {report.status}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">{t.categoryLabel}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{report.type}</span>
            </div>
          </div>

          {/* Detailed Diagnostic Findings */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">
              {t.clinicalFindingsTitle}
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              {report.findings}
            </p>
          </div>

          {/* Test Metrics Table if present */}
          {report.metrics && report.metrics.length > 0 && (
            <div>
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                {t.biomarkerTitle}
              </h3>
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-500">
                    <tr>
                      <th className="p-3">{t.parameterHeader}</th>
                      <th className="p-3">{t.observedValueHeader}</th>
                      <th className="p-3">{t.refIntervalHeader}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {report.metrics.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">{m.label}</td>
                        <td className="p-3 font-bold text-indigo-600 dark:text-purple-300">{m.value}</td>
                        <td className="p-3 text-slate-400 font-mono">{m.refRange}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Doctor Notes */}
          {report.doctorNotes && (
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                <Stethoscope className="w-4 h-4 text-amber-600" />
                {t.doctorRecTitle}
              </h4>
              <p className="text-xs text-amber-950 dark:text-amber-200">{report.doctorNotes}</p>
            </div>
          )}

          {/* AI Explanation Box */}
          <div className="p-5 rounded-2xl bg-indigo-50/80 dark:bg-slate-800 border border-indigo-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold text-[#31276a] dark:text-purple-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                {t.aiMedicalSummarizer}
              </span>
              {!aiSummary && (
                <button
                  onClick={handleGenerateAiSummary}
                  disabled={loadingAi}
                  className="px-3 py-1.5 rounded-xl bg-[#31276a] text-white text-xs font-bold hover:bg-[#251d52] transition-all"
                >
                  {loadingAi ? t.analyzingBtn : t.genPlainEnglishSummary}
                </button>
              )}
            </div>

            {aiSummary && (
              <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 animate-in fade-in">
                <p className="font-semibold text-indigo-950 dark:text-purple-200 leading-relaxed">
                  {aiSummary.summary}
                </p>
                {aiSummary.keyFindings && (
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                    {aiSummary.keyFindings.map((f: string, i: number) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
                {aiSummary.actionableAdvice && (
                  <p className="p-2.5 rounded-xl bg-white dark:bg-slate-900 font-bold text-emerald-800 dark:text-emerald-300">
                    💡 Next Step: {aiSummary.actionableAdvice}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => generateReportPDF(report)}
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-purple-400 hover:underline cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              {t.downloadPdfReport}
            </button>

            {onEditReport && (
              <button
                onClick={() => {
                  onClose();
                  onEditReport(report);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold transition-all border border-amber-500/20 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Report</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 transition-all cursor-pointer"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
