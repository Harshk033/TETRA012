import React from 'react';
import { AlertTriangle, Microscope, TestTube, ChevronRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { TRANSLATIONS, LanguageCode } from '../utils/translations';

interface MetricCardsProps {
  riskScore: number;
  riskLevel: string;
  activeAlertsCount: number;
  conditionsScreenedCount: number;
  lastScreenedDate: string;
  pendingTestsCount: number;
  onRunAssessment: () => void;
  onOpenAlerts: () => void;
  onOpenScreeningModal: () => void;
  onOpenPendingLabsModal: () => void;
  language: LanguageCode;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  riskScore,
  riskLevel,
  activeAlertsCount,
  conditionsScreenedCount,
  lastScreenedDate,
  pendingTestsCount,
  onRunAssessment,
  onOpenAlerts,
  onOpenScreeningModal,
  onOpenPendingLabsModal,
  language,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  // SVG Ring calculation for Risk Score
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (riskScore / 100) * circumference;

  const getRiskColor = (score: number) => {
    if (score > 70) return 'stroke-rose-600 text-rose-600';
    if (score > 35) return 'stroke-amber-500 text-amber-600';
    return 'stroke-teal-600 text-teal-600 dark:stroke-teal-400 dark:text-teal-300';
  };

  const translatedRiskLevel =
    riskLevel === 'High'
      ? t.highRisk
      : riskLevel === 'Moderate'
      ? t.moderateRisk
      : t.lowRisk;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {/* CARD 1: OVERALL RISK SCORE */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
        <span className="text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">
          {t.calculatedRiskScore}
        </span>

        <div className="flex flex-col items-center my-2">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Background ring */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r={radius}
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Progress ring */}
              <circle
                cx="56"
                cy="56"
                r={radius}
                className={`transition-all duration-1000 ease-out ${getRiskColor(riskScore)}`}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                {riskScore}%
              </span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                {t.riskLabel}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {translatedRiskLevel}
          </h4>
          <button
            id="run-assessment-link"
            onClick={onRunAssessment}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 mt-0.5"
          >
            {t.runNewAssessment}
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* CARD 2: CRITICAL ALERT */}
      <div
        id="card-critical-alert"
        onClick={onOpenAlerts}
        className="bg-slate-900 dark:bg-slate-800 text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between cursor-pointer hover:bg-slate-800 transition-all"
      >
        <div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-4">
            <AlertTriangle className="w-5 h-5 fill-amber-400/30" />
          </div>
          <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
            {t.activeMedicalAlerts}
          </span>
          <div className="text-3xl font-black mt-1">
            {activeAlertsCount} {t.activeLabel}
          </div>
        </div>

        <div className="text-xs font-medium text-slate-300 mt-4 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          {t.viewAlerts}
        </div>
      </div>

      {/* CARD 3: CONDITION SCREENED */}
      <div
        id="card-condition-screened"
        onClick={onOpenScreeningModal}
        className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition-all"
      >
        <div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
            <Microscope className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">
            {t.conditionsScreened}
          </span>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            {conditionsScreenedCount} {t.doneLabel}
          </div>
        </div>

        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-4">
          {t.lastLabel}: {lastScreenedDate === 'Today' ? t.todayLabel : lastScreenedDate}
        </div>
      </div>

      {/* CARD 4: TEST PENDING */}
      <div
        id="card-test-pending"
        onClick={onOpenPendingLabsModal}
        className="bg-teal-700 dark:bg-teal-800 text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between cursor-pointer hover:bg-teal-800 transition-all"
      >
        <div>
          <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center mb-4">
            <TestTube className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-extrabold tracking-widest text-teal-100 uppercase">
            {t.pendingLabResults}
          </span>
          <div className="text-3xl font-black mt-1">
            {pendingTestsCount} {t.resultsLabel}
          </div>
        </div>

        <div className="text-xs font-medium text-teal-100 mt-4 flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
          {t.pendingLabs}
        </div>
      </div>
    </div>
  );
};
