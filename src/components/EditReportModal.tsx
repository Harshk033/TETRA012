import React, { useState, useEffect } from 'react';
import { X, Edit3, FileText, Check, Activity } from 'lucide-react';
import { MedicalReport, ReportType, ReportStatus } from '../types';
import { LanguageCode, TRANSLATIONS } from '../utils/translations';

interface EditReportModalProps {
  isOpen: boolean;
  report: MedicalReport | null;
  onClose: () => void;
  onSave: (updatedReport: MedicalReport) => void;
  language?: LanguageCode;
}

export const EditReportModal: React.FC<EditReportModalProps> = ({
  isOpen,
  report,
  onClose,
  onSave,
  language = 'English',
}) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<ReportType>('Lab');
  const [status, setStatus] = useState<ReportStatus>('Normal');
  const [physician, setPhysician] = useState('');
  const [iconType, setIconType] = useState<'blood' | 'lungs' | 'heart' | 'tube' | 'brain'>('tube');
  const [summary, setSummary] = useState('');
  const [findings, setFindings] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');

  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  useEffect(() => {
    if (report) {
      setName(report.name || '');
      setCode(report.code || '');
      setDate(report.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
      setType(report.type || 'Lab');
      setStatus(report.status || 'Normal');
      setPhysician(report.physician || 'Dr. Aditi Sharma');
      setIconType(report.iconType || 'tube');
      setSummary(report.summary || '');
      setFindings(report.findings || '');
      setDoctorNotes(report.doctorNotes || '');
    }
  }, [report]);

  if (!isOpen || !report) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updated: MedicalReport = {
      ...report,
      name: name.trim(),
      code: code.trim() || report.code,
      date: date.trim() || report.date,
      type,
      status,
      physician: physician.trim() || report.physician,
      iconType,
      summary: summary.trim() || undefined,
      findings: findings.trim() || undefined,
      doctorNotes: doctorNotes.trim() || undefined,
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#1D2048] rounded-3xl shadow-2xl border border-indigo-100 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
              <Edit3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Edit Diagnostic Report</h3>
              <p className="text-[11px] text-teal-100 font-medium">Update medical report details for ID: {report.code || report.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          {/* Report Name & Code */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Report Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Full Blood Count, Lipid Panel"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Report Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="RPT-102"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Category Type & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Category Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ReportType)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Lab">Lab</option>
                <option value="Imaging">Imaging</option>
                <option value="Cardiac">Cardiac</option>
                <option value="Genomic">Genomic</option>
                <option value="Pathology">Pathology</option>
                <option value="Blood Test">Blood Test</option>
                <option value="Renal Function">Renal Function</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Clinical Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ReportStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Normal">Normal</option>
                <option value="Clear">Clear</option>
                <option value="Review">Review</option>
                <option value="Pending">Pending</option>
                <option value="Abnormal">Abnormal</option>
              </select>
            </div>
          </div>

          {/* Date, Attending Physician, Icon Type */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Report Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Oct 24, 2024"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Attending Physician
              </label>
              <input
                type="text"
                value={physician}
                onChange={(e) => setPhysician(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Icon Symbol
              </label>
              <select
                value={iconType}
                onChange={(e) => setIconType(e.target.value as 'blood' | 'lungs' | 'heart' | 'tube' | 'brain')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="tube">Test Tube</option>
                <option value="blood">Blood Droplet</option>
                <option value="heart">Heart</option>
                <option value="lungs">Lungs / Scan</option>
                <option value="brain">Brain / Neuro</option>
              </select>
            </div>
          </div>

          {/* Clinical Findings */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Clinical Findings & Diagnostic Summary
            </label>
            <textarea
              rows={3}
              value={findings}
              onChange={(e) => setFindings(e.target.value)}
              placeholder="Detailed lab analysis findings..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Doctor Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Doctor Recommendations & Care Plan Notes
            </label>
            <textarea
              rows={2}
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              placeholder="e.g. Schedule follow-up lipid profile in 12 weeks..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-black transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Save Report Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
