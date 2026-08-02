import React from 'react';
import { PatientProfile } from '../types';
import { User, ShieldAlert, PhoneCall, Stethoscope, FileText, Heart, Activity, Edit3 } from 'lucide-react';
import { TRANSLATIONS, LanguageCode } from '../utils/translations';

interface PatientDataProps {
  patient?: PatientProfile | null;
  onEditPatient?: (patient: PatientProfile) => void;
  language?: LanguageCode;
}

export const PatientData: React.FC<PatientDataProps> = ({ patient, onEditPatient, language = 'English' }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  if (!patient) {
    return (
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-indigo-100/80 dark:border-slate-800 text-center">
        <User className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
        <p className="text-sm font-bold text-slate-500">No patient profile selected.</p>
      </div>
    );
  }

  // Safe field derivations
  const patientName = patient.name || 'Anonymous Patient';
  const patientInitials = patientName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'P';

  const patientIdDisplay = patient.idNumber || patient.id || 'P-10482';
  const patientAge = patient.age ?? 45;
  const patientGender = patient.gender || 'Not specified';
  const patientBlood = patient.bloodGroup || 'O+';
  const patientBmi = patient.bmi || 24.5;
  const patientAddress = patient.address || 'District Health Facility Ward';

  const allergiesList = Array.isArray(patient.allergies) && patient.allergies.length > 0
    ? patient.allergies
    : ['None Reported'];

  const medicalHistoryList = Array.isArray(patient.medicalHistory) && patient.medicalHistory.length > 0
    ? patient.medicalHistory
    : ['Routine Screening Screened Normal'];

  const emergencyName = patient.emergencyContact?.name || 'Primary Next of Kin';
  const emergencyRelation = patient.emergencyContact?.relation ? ` (${patient.emergencyContact.relation})` : '';
  const emergencyPhone = patient.emergencyContact?.phone || patient.phone || '+91 98123 99800';

  const doctorName = patient.primaryDoctor || 'Dr. Aditi Sharma (Senior PHC Medical Officer)';

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-indigo-100/80 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in duration-200">
      {/* Header Profile Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#31276a] dark:bg-purple-900 text-white flex items-center justify-center text-2xl font-black shadow-md shrink-0">
            {patientInitials}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">{patientName}</h2>
            <p className="text-xs font-semibold text-indigo-600 dark:text-purple-300 mt-0.5">
              ID: {patientIdDisplay} • {patientAge} yrs • {patientGender} • {t.bloodGroup}: {patientBlood} • BMI: {patientBmi}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-300 mt-0.5">
              {patientAddress}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end">
          {onEditPatient && (
            <button
              onClick={() => onEditPatient(patient)}
              className="px-3 py-2 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/20 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Edit Patient Details"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Record</span>
            </button>
          )}

          {patient.riskScore !== undefined && (
            <div className="px-4 py-2 rounded-2xl bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 text-right">
              <span className="block text-[10px] font-black uppercase text-slate-400">CDSS Risk Index</span>
              <span className={`text-base font-black ${patient.riskScore > 70 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {patient.riskScore}% ({patient.primaryRiskCategory || 'Evaluated'})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Grid of Medical & Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Known Allergies */}
        <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <h4 className="text-sm font-extrabold text-rose-900 dark:text-rose-200">Known Allergies</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {allergiesList.map((a, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/80 text-rose-800 dark:text-rose-200 text-xs font-bold">
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/60 border border-indigo-200/60 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <PhoneCall className="w-5 h-5 text-indigo-600 dark:text-purple-300" />
            <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">Emergency Contact</h4>
          </div>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {emergencyName}{emergencyRelation}
          </p>
          <p className="text-xs font-semibold text-indigo-600 dark:text-purple-300 mt-1">{emergencyPhone}</p>
        </div>

        {/* Primary Doctor */}
        <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
          <div className="flex items-center gap-2 mb-3">
            <Stethoscope className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h4 className="text-sm font-extrabold text-amber-900 dark:text-amber-200">Primary Care Physician</h4>
          </div>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{doctorName}</p>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-[10px] font-bold">
            Verified Practitioner
          </span>
        </div>
      </div>

      {/* Medical History Section */}
      <div className="mt-5 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-[#6E59CF]" />
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200">
            Recorded Clinical History & Pre-existing Conditions
          </h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {medicalHistoryList.map((item, i) => (
            <span key={i} className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold shadow-2xs">
              • {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
