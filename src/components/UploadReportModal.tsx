import React, { useState } from 'react';
import { X, Upload, FileText, Check } from 'lucide-react';
import { MedicalReport, ReportType, ReportStatus } from '../types';

interface UploadReportModalProps {
  onClose: () => void;
  onAddReport: (report: MedicalReport) => void;
}

export const UploadReportModal: React.FC<UploadReportModalProps> = ({ onClose, onAddReport }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<ReportType>('Lab');
  const [status, setStatus] = useState<ReportStatus>('Normal');
  const [physician, setPhysician] = useState('Dr. Aditi Sharma');
  const [findings, setFindings] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const iconType = type === 'Lab' ? 'tube' : type === 'Imaging' ? 'lungs' : 'blood';
    const newReport: MedicalReport = {
      id: Date.now().toString(),
      name,
      code: `RPT-00${Math.floor(Math.random() * 90) + 10}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      type,
      status,
      physician,
      iconType,
      findings: findings || 'Uploaded diagnostic record pending full physician review.',
      metrics: [
        { label: 'Primary Marker', value: 'Normal', refRange: 'Standard', status: 'normal' }
      ]
    };

    onAddReport(newReport);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full border border-indigo-100 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="px-6 py-5 bg-[#31276a] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Upload className="w-5 h-5 text-amber-300" />
            <h3 className="font-extrabold text-base">Upload Patient Report (Worker Mode)</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-500 uppercase block mb-1">Report Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Metabolic Panel, Thyroid Function"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-indigo-50/50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-500 uppercase block mb-1">Category Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ReportType)}
                className="w-full p-2.5 rounded-xl bg-indigo-50/50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700"
              >
                <option value="Lab">Lab</option>
                <option value="Imaging">Imaging</option>
                <option value="Cardiac">Cardiac</option>
                <option value="Genomic">Genomic</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-500 uppercase block mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ReportStatus)}
                className="w-full p-2.5 rounded-xl bg-indigo-50/50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700"
              >
                <option value="Normal">Normal</option>
                <option value="Clear">Clear</option>
                <option value="Review">Review</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-500 uppercase block mb-1">Attending Physician</label>
            <input
              type="text"
              value={physician}
              onChange={(e) => setPhysician(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-indigo-50/50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="font-bold text-slate-500 uppercase block mb-1">Clinical Findings Summary</label>
            <textarea
              rows={3}
              placeholder="Enter diagnostic summary or notes..."
              value={findings}
              onChange={(e) => setFindings(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-indigo-50/50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#31276a] text-white font-bold hover:bg-[#251d52]"
            >
              Save Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
