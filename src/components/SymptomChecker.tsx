import React, { useState } from 'react';
import { Plus, X, Stethoscope, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS, LanguageCode } from '../utils/translations';

interface SymptomCheckerProps {
  onCheckSymptoms: (symptoms: string[]) => void;
  onRunFullAssessment: (symptoms: string[]) => void;
  selectedSymptoms: string[];
  setSelectedSymptoms: React.Dispatch<React.SetStateAction<string[]>>;
  language: LanguageCode;
}

const QUICK_SYMPTOMS_MAP: Record<LanguageCode, Record<string, string>> = {
  English: {
    'Headache': 'Headache',
    'Fatigue': 'Fatigue',
    'Nausea': 'Nausea',
    'Chest Pain': 'Chest Pain',
    'Fever': 'Fever',
    'Cough': 'Cough',
    'Dizziness': 'Dizziness',
  },
  Hindi: {
    'Headache': 'सिरदर्द',
    'Fatigue': 'थकान',
    'Nausea': 'जी मिचलाना',
    'Chest Pain': 'छाती में दर्द',
    'Fever': 'बुखार',
    'Cough': 'खांसी',
    'Dizziness': 'चक्कर आना',
  },
  Gujarati: {
    'Headache': 'માથાનો દુખાવો',
    'Fatigue': 'થાક',
    'Nausea': 'ઉબકા',
    'Chest Pain': 'છાતીમાં દુખાવો',
    'Fever': 'તાવ',
    'Cough': 'ઉધરસ',
    'Dizziness': 'ચક્કર આવવા',
  },
  French: {
    'Headache': 'Maux de tête',
    'Fatigue': 'Fatigue',
    'Nausea': 'Nausée',
    'Chest Pain': 'Douleur thoracique',
    'Fever': 'Fièvre',
    'Cough': 'Toux',
    'Dizziness': 'Vertiges',
  },
  Marathi: {
    'Headache': 'डोकेदुखी',
    'Fatigue': 'थकवा',
    'Nausea': 'मळमळ',
    'Chest Pain': 'छातीत दुखणे',
    'Fever': 'ताप',
    'Cough': 'खोकला',
    'Dizziness': 'चक्कर येणे',
  },
};

const QUICK_SYMPTOMS = [
  'Headache',
  'Fatigue',
  'Nausea',
  'Chest Pain',
  'Fever',
  'Cough',
  'Dizziness',
];

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({
  onCheckSymptoms,
  onRunFullAssessment,
  selectedSymptoms,
  setSelectedSymptoms,
  language,
}) => {
  const [customSymptomInput, setCustomSymptomInput] = useState('');
  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const addCustomSymptom = () => {
    const trimmed = customSymptomInput.trim();
    if (trimmed && !selectedSymptoms.includes(trimmed)) {
      setSelectedSymptoms([...selectedSymptoms, trimmed]);
      setCustomSymptomInput('');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full transition-colors duration-300">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">
            {t.symptomChecker}
          </span>
          {selectedSymptoms.length > 0 && (
            <button
              onClick={() => setSelectedSymptoms([])}
              className="text-xs text-rose-500 hover:underline font-bold"
            >
              {t.clearAll}
            </button>
          )}
        </div>

        {/* Input Field with + Button */}
        <div className="relative flex items-center mb-5">
          <input
            id="symptom-input-field"
            type="text"
            placeholder={t.typeSymptomPlaceholder}
            value={customSymptomInput}
            onChange={(e) => setCustomSymptomInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustomSymptom()}
            className="w-full py-3 pl-4 pr-12 text-sm font-medium rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            id="add-custom-symptom-btn"
            onClick={addCustomSymptom}
            className="absolute right-1.5 w-9 h-9 rounded-lg bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Symptoms Pills */}
        {selectedSymptoms.length > 0 && (
          <div className="mb-4">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
              {t.selected} ({selectedSymptoms.length})
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1 no-scrollbar">
              {selectedSymptoms.map((sym) => {
                const translatedSym = QUICK_SYMPTOMS_MAP[language]?.[sym] || sym;
                return (
                  <span
                    key={sym}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900 dark:bg-teal-700 text-white text-xs font-bold shadow-2xs animate-fade-in"
                  >
                    {translatedSym}
                    <button
                      onClick={() => toggleSymptom(sym)}
                      className="hover:text-rose-300 ml-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* QUICK SELECT Label & Pills */}
        <div>
          <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-widest block mb-3">
            {t.quickSelect}
          </span>
          <div className="flex flex-wrap gap-2">
            {QUICK_SYMPTOMS.map((symptom) => {
              const isSelected = selectedSymptoms.includes(symptom);
              const translatedLabel = QUICK_SYMPTOMS_MAP[language]?.[symptom] || symptom;
              return (
                <button
                  key={symptom}
                  id={`symptom-tag-${symptom.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => toggleSymptom(symptom)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                    isSelected
                      ? 'bg-teal-700 text-white shadow-sm scale-105'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1 text-emerald-300" />}
                  {translatedLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          id="check-symptoms-btn"
          onClick={() => {
            const localized = selectedSymptoms.map(
              (s) => QUICK_SYMPTOMS_MAP[language]?.[s] || s
            );
            onCheckSymptoms(localized);
          }}
          className="w-full py-3 px-4 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900 text-teal-800 dark:text-teal-300 font-extrabold text-xs uppercase tracking-wider transition-all shadow-2xs flex items-center justify-center gap-2 border border-teal-200 dark:border-teal-800"
        >
          <Activity className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          {t.checkSymptoms}
        </button>

        <button
          id="run-assessment-btn"
          onClick={() => {
            const localized = selectedSymptoms.map(
              (s) => QUICK_SYMPTOMS_MAP[language]?.[s] || s
            );
            onRunFullAssessment(localized);
          }}
          className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <Stethoscope className="w-4 h-4" />
          {t.runAiAssessment}
        </button>
      </div>
    </div>
  );
};
