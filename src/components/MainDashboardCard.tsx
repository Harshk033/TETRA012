import React from 'react';
import { FileText, Activity, Pill, User } from 'lucide-react';
import { ReportsTable } from './ReportsTable';
import { VitalsHistory } from './VitalsHistory';
import { MedicationsTracker } from './MedicationsTracker';
import { PatientData } from './PatientData';
import { MedicalReport, VitalRecord, Medication, PatientProfile, UserRole } from '../types';
import { TRANSLATIONS, LanguageCode } from '../utils/translations';

interface MainDashboardCardProps {
  subTab: string;
  setSubTab: (tab: string) => void;
  reports: MedicalReport[];
  vitals: VitalRecord[];
  medications: Medication[];
  patient: PatientProfile;
  userRole: UserRole;
  onViewReport: (report: MedicalReport) => void;
  onEditReport?: (report: MedicalReport) => void;
  onAddReport: () => void;
  onAddVital: (vital: VitalRecord) => void;
  onLogMedication: (id: string) => void;
  onAddMedication: (med: Medication) => void;
  onEditPatient?: (patient: PatientProfile) => void;
  language: LanguageCode;
}

export const MainDashboardCard: React.FC<MainDashboardCardProps> = ({
  subTab,
  setSubTab,
  reports,
  vitals,
  medications,
  patient,
  userRole,
  onViewReport,
  onEditReport,
  onAddReport,
  onAddVital,
  onLogMedication,
  onAddMedication,
  onEditPatient,
  language,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      {/* Sub-tabs header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            id="subtab-reports"
            onClick={() => setSubTab('Reports')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-200 ${
              subTab === 'Reports'
                ? 'bg-slate-900 dark:bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            {t.reports}
          </button>

          <button
            id="subtab-vitals"
            onClick={() => setSubTab('Vitals History')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-200 ${
              subTab === 'Vitals History'
                ? 'bg-slate-900 dark:bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Activity className="w-4 h-4 text-teal-500" />
            {t.vitalsHistory}
          </button>

          <button
            id="subtab-medications"
            onClick={() => setSubTab('Medications')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-200 ${
              subTab === 'Medications'
                ? 'bg-slate-900 dark:bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Pill className="w-4 h-4 text-rose-500" />
            {t.medications}
          </button>

          <button
            id="subtab-patient-data"
            onClick={() => setSubTab('Patient Data')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-200 ${
              subTab === 'Patient Data'
                ? 'bg-slate-900 dark:bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <User className="w-4 h-4 text-sky-500" />
            {t.patientData}
          </button>
        </div>
      </div>

      {/* Dynamic Content Panel based on SubTab */}
      <div className="transition-all duration-300">
        {subTab === 'Reports' && (
          <ReportsTable
            reports={reports}
            subTab={subTab}
            setSubTab={setSubTab}
            onViewReport={onViewReport}
            onEditReport={onEditReport}
            userRole={userRole}
            onAddReport={onAddReport}
            hideHeader={true}
            language={language}
          />
        )}

        {subTab === 'Vitals History' && (
          <VitalsHistory vitals={vitals} onAddVital={onAddVital} />
        )}

        {subTab === 'Medications' && (
          <MedicationsTracker
            medications={medications}
            onLogMedication={onLogMedication}
            onAddMedication={onAddMedication}
          />
        )}

        {subTab === 'Patient Data' && (
          <PatientData patient={patient} onEditPatient={onEditPatient} language={language} />
        )}
      </div>
    </div>
  );
};
