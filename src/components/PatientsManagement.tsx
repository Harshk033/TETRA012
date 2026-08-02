import React, { useState } from 'react';
import { Search, Plus, User, Stethoscope, ChevronRight, FileText, AlertTriangle, ShieldCheck, HeartPulse, Edit3 } from 'lucide-react';
import { PatientProfile } from '../types';
import { LanguageCode, TRANSLATIONS } from '../utils/translations';

interface PatientsManagementProps {
  patients: PatientProfile[];
  onSelectPatient: (patient: PatientProfile) => void;
  onAddPatientClick: () => void;
  onEditPatientClick?: (patient: PatientProfile) => void;
  onViewSummaryClick: (patient: PatientProfile) => void;
  language: LanguageCode;
}

export const PatientsManagement: React.FC<PatientsManagementProps> = ({
  patients,
  onSelectPatient,
  onAddPatientClick,
  onEditPatientClick,
  onViewSummaryClick,
  language,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('All');

  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm);

    const matchesRisk =
      riskFilter === 'All' ||
      (riskFilter === 'High' && p.riskScore >= 70) ||
      (riskFilter === 'Moderate' && p.riskScore >= 35 && p.riskScore < 70) ||
      (riskFilter === 'Low' && p.riskScore < 35);

    return matchesSearch && matchesRisk;
  });

  const counts = {
    All: patients.length,
    High: patients.filter((p) => p.riskScore >= 70).length,
    Moderate: patients.filter((p) => p.riskScore >= 35 && p.riskScore < 70).length,
    Low: patients.filter((p) => p.riskScore < 35).length,
  };

  return (
    <div className="bg-white dark:bg-[#2F2E68] rounded-3xl p-6 border border-[#E8E4F8] dark:border-[#7A63D9]/30 shadow-sm transition-colors duration-300">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5 text-[#6E59CF] dark:text-[#A379F8]" />
            {t.patients}
          </h2>
          <p className="text-xs text-slate-500 dark:text-[#DADAF4] font-medium mt-0.5">
            {t.tagline}
          </p>
        </div>

        <button
          onClick={onAddPatientClick}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6E59CF] hover:bg-[#5E4EB4] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {t.addPatient || 'Add Patient'}
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by patient name, ID, phone, or condition..."
            className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6E59CF]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 bg-slate-100 dark:bg-[#1D2048] p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
          {['All', 'High', 'Moderate', 'Low'].map((level) => {
            const label = level === 'All' ? (t.all || 'All Patients') : level === 'High' ? t.highRisk : level === 'Moderate' ? t.moderateRisk : t.lowRisk;
            const count = counts[level as keyof typeof counts];
            return (
              <button
                key={level}
                onClick={() => setRiskFilter(level)}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  riskFilter === level
                    ? 'bg-[#6E59CF] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{label}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-black ${
                  riskFilter === level
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Patient Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-3">
              <th className="pb-2 pl-4">{t.patientProfileTable}</th>
              <th className="pb-2">{t.vitalsBmiTable}</th>
              <th className="pb-2">{t.primaryRiskFlagTable}</th>
              <th className="pb-2">{t.riskScoreTable}</th>
              <th className="pb-2 text-right pr-4">{t.actionsTable}</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((pt) => {
              const isHighRisk = pt.riskScore >= 70;
              const isModRisk = pt.riskScore >= 35 && pt.riskScore < 70;

              return (
                <tr
                  key={pt.id}
                  className="bg-slate-50 dark:bg-[#1D2048] hover:bg-indigo-50/50 dark:hover:bg-slate-800/80 rounded-2xl transition-all"
                >
                  {/* Profile */}
                  <td className="py-4 pl-4 rounded-l-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#6E59CF]/10 text-[#6E59CF] dark:text-[#A379F8] flex items-center justify-center font-black text-sm">
                        {pt.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white block">
                          {pt.name}
                        </span>
                        <span className="text-[11px] font-mono font-semibold text-slate-400">
                          {pt.id} • {pt.age} yrs • {pt.gender}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Vitals */}
                  <td className="py-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <div>BMI: <span className="font-bold">{pt.bmi}</span> kg/m²</div>
                    <div className="text-[11px] text-slate-400">{t.bloodGroup}: {pt.bloodGroup}</div>
                  </td>

                  {/* Risk Flag */}
                  <td className="py-4 text-xs">
                    <span className="px-3 py-1 rounded-md bg-white dark:bg-[#2F2E68] border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">
                      {pt.primaryRiskCategory}
                    </span>
                  </td>

                  {/* Risk Score */}
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-black ${
                        isHighRisk
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : isModRisk
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {pt.riskScore}% {isHighRisk ? t.highRisk : isModRisk ? t.moderateRisk : t.lowRisk}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 pr-4 text-right rounded-r-2xl">
                    <div className="flex items-center justify-end gap-2">
                      {onEditPatientClick && (
                        <button
                          onClick={() => onEditPatientClick(pt)}
                          className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold transition-all flex items-center gap-1 border border-amber-500/20 cursor-pointer"
                          title="Edit Patient Record"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      )}

                      <button
                        onClick={() => onViewSummaryClick(pt)}
                        className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        {t.cdssReportBtn}
                      </button>

                      <button
                        onClick={() => onSelectPatient(pt)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#6E59CF] hover:bg-[#5E4EB4] text-white text-xs font-bold transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                      >
                        {t.inspectBtn}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
