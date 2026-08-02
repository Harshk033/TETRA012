import React, { useState } from 'react';
import { 
  FileText, Activity, Pill, User, Droplet, Heart, TestTube, Brain, Scan, 
  Search, Plus, Edit3 
} from 'lucide-react';
import { MedicalReport, UserRole } from '../types';
import { TRANSLATIONS, LanguageCode } from '../utils/translations';

interface ReportsTableProps {
  reports: MedicalReport[];
  subTab: string;
  setSubTab: (tab: string) => void;
  onViewReport: (report: MedicalReport) => void;
  onEditReport?: (report: MedicalReport) => void;
  userRole: UserRole;
  onAddReport: () => void;
  hideHeader?: boolean;
  language?: LanguageCode;
}

export const ReportsTable: React.FC<ReportsTableProps> = ({
  reports,
  subTab,
  setSubTab,
  onViewReport,
  onEditReport,
  userRole,
  onAddReport,
  hideHeader = false,
  language = 'English',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter] = useState<string>('All');

  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  const REPORT_NAME_MAP: Record<LanguageCode, Record<string, string>> = {
    English: {
      'Full Blood Count': 'Full Blood Count',
      'Chest X-Ray': 'Chest X-Ray',
      'ECG Report': 'ECG Report',
      'Lipid Panel': 'Lipid Panel',
      'MRI Brain Scan': 'MRI Brain Scan',
    },
    Hindi: {
      'Full Blood Count': 'संपूर्ण रक्त जांच (CBC)',
      'Chest X-Ray': 'छाती का एक्स-रे',
      'ECG Report': 'ईसीजी रिपोर्ट',
      'Lipid Panel': 'लिपिड प्रोफाइल जांच',
      'MRI Brain Scan': 'एमआरआई मस्तिष्क स्कैन',
    },
    Gujarati: {
      'Full Blood Count': 'સંપૂર્ણ બ્લડ કાઉન્ટ (CBC)',
      'Chest X-Ray': 'છાતીનો એક્સ-રે',
      'ECG Report': 'ECG રિપોર્ટ',
      'Lipid Panel': 'લિપિડ પ્રોફાઇલ પેનલ',
      'MRI Brain Scan': 'MRI બ્રેઈન સ્કેન',
    },
    French: {
      'Full Blood Count': 'NFS (Formule Sanguine)',
      'Chest X-Ray': 'Radiographie Thoracique',
      'ECG Report': 'Rapport ECG',
      'Lipid Panel': 'Bilan Lipidique',
      'MRI Brain Scan': 'IRM Cérébrale',
    },
    Marathi: {
      'Full Blood Count': 'संपूर्ण रक्त तपासणी (CBC)',
      'Chest X-Ray': 'छातीचा एक्स-रे',
      'ECG Report': 'ईसीजी अहवाल',
      'Lipid Panel': 'लिपिड प्रोफाईल तपासणी',
      'MRI Brain Scan': 'एमआरआय मेंदू स्कॅन',
    },
  };

  const REPORT_TYPE_MAP: Record<LanguageCode, Record<string, string>> = {
    English: { Lab: 'Lab', Imaging: 'Imaging', Cardiac: 'Cardiac' },
    Hindi: { Lab: 'लैब', Imaging: 'इमेजिंग', Cardiac: 'कार्डियक' },
    Gujarati: { Lab: 'લેબ', Imaging: 'ઇમેજિંગ', Cardiac: 'કાર્ડિયક' },
    French: { Lab: 'Laboratoire', Imaging: 'Imagerie', Cardiac: 'Cardiaque' },
    Marathi: { Lab: 'लॅब', Imaging: 'इमेजिंग', Cardiac: 'कार्डियाक' },
  };

  const REPORT_STATUS_MAP: Record<LanguageCode, Record<string, string>> = {
    English: { Normal: 'Normal', Clear: 'Clear', Review: 'Review', Critical: 'Critical' },
    Hindi: { Normal: 'सामान्य', Clear: 'स्पष्ट', Review: 'समीक्षा', Critical: 'गंभीर' },
    Gujarati: { Normal: 'સામાન્ય', Clear: 'સ્પષ્ટ', Review: 'સમીક્ષા', Critical: 'ગંભીર' },
    French: { Normal: 'Normal', Clear: 'Clair', Review: 'Révision', Critical: 'Critique' },
    Marathi: { Normal: 'सामान्य', Clear: 'स्पष्ट', Review: 'तपासणी', Critical: 'गंभीर' },
  };

  const getReportIcon = (type: MedicalReport['iconType']) => {
    switch (type) {
      case 'blood':
        return <Droplet className="w-4 h-4 text-rose-500" />;
      case 'lungs':
        return <Scan className="w-4 h-4 text-teal-600 dark:text-teal-400" />;
      case 'heart':
        return <Heart className="w-4 h-4 text-rose-600" />;
      case 'tube':
        return <TestTube className="w-4 h-4 text-emerald-500" />;
      case 'brain':
        return <Brain className="w-4 h-4 text-sky-500" />;
      default:
        return <FileText className="w-4 h-4 text-teal-600" />;
    }
  };

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.physician.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || r.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div>
      {/* Search & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        {!hideHeader && (
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all ${
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all ${
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all ${
                subTab === 'Patient Data'
                  ? 'bg-slate-900 dark:bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <User className="w-4 h-4 text-sky-500" />
              {t.patientData}
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t.searchReports}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 text-xs font-medium rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            id="add-report-btn"
            onClick={onAddReport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.uploadReport || '+ Add New Report'}</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[11px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-widest px-3">
              <th className="pb-2 pl-4">{t.reportNameTable}</th>
              <th className="pb-2">{t.dateTable}</th>
              <th className="pb-2">{t.typeTable}</th>
              <th className="pb-2">{t.statusTable}</th>
              <th className="pb-2">{t.physicianTable}</th>
              <th className="pb-2 text-right pr-4">{t.actionTable}</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-400 text-sm font-medium">
                  {t.noReportsFound}
                </td>
              </tr>
            ) : (
              filteredReports.map((report) => {
                const translatedName = REPORT_NAME_MAP[language]?.[report.name] || report.name;
                const translatedType = REPORT_TYPE_MAP[language]?.[report.type] || report.type;
                const translatedStatus = REPORT_STATUS_MAP[language]?.[report.status] || report.status;

                return (
                  <tr
                    key={report.id}
                    className="group bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-150"
                  >
                    {/* Name + Icon */}
                    <td className="py-3.5 pl-4 rounded-l-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-2xs">
                          {getReportIcon(report.iconType)}
                        </div>
                        <div>
                          <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100 block">
                            {translatedName}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400">
                            {report.code}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {report.date}
                    </td>

                    {/* Type Badge */}
                    <td className="py-3.5">
                      <span className="px-3 py-1 rounded-md bg-slate-200/80 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold">
                        {translatedType}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5">
                      <span
                        className={`px-3 py-1 rounded-md text-xs font-bold ${
                          report.status === 'Normal' || report.status === 'Clear'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                            : report.status === 'Review'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                        }`}
                      >
                        {translatedStatus}
                      </span>
                    </td>

                    {/* Physician */}
                    <td className="py-3.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {report.physician}
                    </td>

                    {/* Action Buttons: Edit + View */}
                    <td className="py-3.5 pr-4 text-right rounded-r-xl">
                      <div className="flex items-center justify-end gap-2">
                        {onEditReport && (
                          <button
                            id={`edit-report-${report.id}`}
                            onClick={() => onEditReport(report)}
                            className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/20 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer hover:scale-105 active:scale-95"
                            title="Edit Report"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                        )}
                        <button
                          id={`view-report-${report.id}`}
                          onClick={() => onViewReport(report)}
                          className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white text-xs font-bold shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          {t.viewBtn}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
