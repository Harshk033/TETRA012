import React from 'react';
import { X, Printer, Download, HeartPulse, Brain, AlertTriangle, ShieldCheck, CheckCircle2, Stethoscope, Sparkles } from 'lucide-react';
import { PatientProfile } from '../types';
import { generatePatientSummaryPDF } from '../utils/pdfGenerator';

interface ClinicalSummaryModalProps {
  patient: PatientProfile;
  onClose: () => void;
}

export const ClinicalSummaryModal: React.FC<ClinicalSummaryModalProps> = ({
  patient,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#2F2E68] rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-[#E8E4F8] dark:border-[#7A63D9]/40 shadow-2xl relative max-h-[92vh] overflow-y-auto no-scrollbar print:max-h-none print:shadow-none print:border-none">
        {/* Top Header Actions */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#6E59CF]/10 text-[#6E59CF] dark:text-[#A379F8] text-xs font-black uppercase tracking-wider">
              CDSS REPORT #SUS-2026-8809
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => generatePatientSummaryPDF(patient)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#6E59CF] text-white text-xs font-bold hover:bg-[#5E4EB4] transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CLINICAL SUMMARY DOCUMENT */}
        <div id="printable-clinical-summary" className="space-y-6">
          {/* Document Header */}
          <div className="flex items-start justify-between border-b-2 border-[#6E59CF] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <HeartPulse className="w-6 h-6 text-[#6E59CF]" />
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                  SUSHRUTA HEALTH AI
                </h1>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-300 font-medium mt-0.5">
                Clinical Decision Support System (CDSS) • Early Risk Assessment
              </p>
            </div>

            <div className="text-right text-xs text-slate-500 dark:text-slate-300 font-medium">
              <div>Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              <div>Center: Urban PHC Ward 3</div>
              <div className="text-emerald-600 font-bold">Status: Verified</div>
            </div>
          </div>

          {/* Patient Profile Snapshot */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FDFBFF] dark:bg-[#1D2048] p-4 rounded-2xl border border-[#E8E4F8] dark:border-slate-800 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Patient Name</span>
              <span className="font-extrabold text-slate-900 dark:text-white text-sm">{patient.name}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Age / Gender</span>
              <span className="font-extrabold text-slate-900 dark:text-white text-sm">{patient.age} yrs • {patient.gender}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Hospital ID</span>
              <span className="font-mono-num font-bold text-slate-900 dark:text-white text-sm">{patient.id}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">BMI & Blood Group</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">{patient.bmi} kg/m² • {patient.bloodGroup}</span>
            </div>
          </div>

          {/* Disease Risk Score Cards */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-[#6E59CF]" />
              Multi-Disease Risk Prediction Matrix
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 block">Type-2 Diabetes</span>
                <span className="text-xl font-black text-amber-600">78% High Risk</span>
                <span className="text-[10px] text-slate-500 block mt-1">HbA1c 7.8% • Fasting Glucose 142 mg/dL</span>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <span className="text-[10px] uppercase font-bold text-rose-800 dark:text-rose-300 block">Hypertension</span>
                <span className="text-xl font-black text-rose-600">64% Moderate</span>
                <span className="text-[10px] text-slate-500 block mt-1">Systolic BP 138 mmHg</span>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 block">Cardiovascular</span>
                <span className="text-xl font-black text-emerald-600">22% Low Risk</span>
                <span className="text-[10px] text-slate-500 block mt-1">LDL 110 mg/dL • Normal Lipid Profile</span>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 block">Chronic Kidney (CKD)</span>
                <span className="text-xl font-black text-emerald-600">18% Clear</span>
                <span className="text-[10px] text-slate-500 block mt-1">Serum Creatinine 1.1 • eGFR 82</span>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <span className="text-[10px] uppercase font-bold text-indigo-800 dark:text-indigo-300 block">Stroke Risk</span>
                <span className="text-xl font-black text-indigo-600">35% Moderate</span>
                <span className="text-[10px] text-slate-500 block mt-1">Hypertensive Vascular Strain</span>
              </div>
            </div>
          </div>

          {/* Clinical Findings & Contributing Factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#1D2048] border border-slate-200 dark:border-slate-800 text-xs">
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider text-[#6E59CF] mb-2">
                Contributing Clinical Factors
              </h4>
              <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
                <li>Persistent Fasting Glucose elevation above 126 mg/dL target.</li>
                <li>Systolic BP readings exceeding 135 mmHg on 3 consecutive visits.</li>
                <li>Sedentary occupational lifestyle with low daily aerobic activity.</li>
                <li>Maternal history of Type-2 Diabetes and hypertension.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#1D2048] border border-slate-200 dark:border-slate-800 text-xs">
              <h4 className="font-extrabold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider text-amber-600 mb-2">
                Missing / Recommended Investigations
              </h4>
              <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
                <li>Urine Microalbumin / Creatinine Ratio (UACR).</li>
                <li>Fundoscopy for early diabetic retinopathy screening.</li>
                <li>12-Lead ECG to rule out left ventricular hypertrophy.</li>
                <li>Serum Electrolytes & Lipid re-check in 30 days.</li>
              </ul>
            </div>
          </div>

          {/* Specialist Referral & Doctor Sign-off */}
          <div className="p-4 rounded-2xl bg-[#6E59CF]/10 dark:bg-[#5E4EB4]/40 border border-[#B595FF]/30 flex items-start gap-4 text-xs">
            <Stethoscope className="w-6 h-6 text-[#6E59CF] shrink-0 mt-1" />
            <div className="space-y-1 w-full">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#3D2E66] dark:text-white text-sm">
                  Recommended Action: Endocrinology OPD Referral
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px]">
                  PRIORITY 7 DAYS
                </span>
              </div>
              <p className="text-slate-600 dark:text-[#DADAF4]">
                Patient requires specialist consultation for glycemic regimen adjustments, dietary counseling, and microalbuminuria baseline tests.
              </p>
              <div className="pt-3 border-t border-[#B595FF]/20 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                <span>Health Worker: Dr. Aditi Sharma (Community Health Officer)</span>
                <span>Digitally Signed via SUSHRUTA CDSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
