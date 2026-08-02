import React, { useState, useEffect } from 'react';
import { X, Lightbulb, RefreshCw } from 'lucide-react';
import { DailyTip } from '../types';
import { TRANSLATIONS, LanguageCode } from '../utils/translations';

interface DailyTipModalProps {
  onClose: () => void;
  language?: LanguageCode;
}

export const DailyTipModal: React.FC<DailyTipModalProps> = ({ onClose, language = 'English' }) => {
  const [tipData, setTipData] = useState<DailyTip | null>(null);
  const [loading, setLoading] = useState(true);

  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  const fetchTip = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/daily-tip');
      const data = await res.json();
      setTipData(data);
    } catch (e) {
      setTipData({
        title: 'Hydration & Circadian Health',
        tip: 'Drinking a glass of lukewarm water upon waking boosts metabolic rate and supports lymphatic circulation after overnight sleep.',
        category: 'Wellness & Preventative Care',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTip();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full border border-amber-200/60 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-amber-100 fill-amber-100" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm">{t.dailyHealthTip}</h3>
              <p className="text-[10px] text-amber-100">{t.personalizedGuidance}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          {loading ? (
            <div className="py-6 flex flex-col items-center justify-center text-slate-400">
              <RefreshCw className="w-5 h-5 animate-spin text-amber-500 mb-2" />
              <p className="text-xs font-medium">Fetching today's tip...</p>
            </div>
          ) : tipData ? (
            <div className="space-y-3">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
                {tipData.category}
              </span>
              <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
                {tipData.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-amber-50/60 dark:bg-slate-800/60 p-3.5 rounded-xl border border-amber-100/80 dark:border-slate-700">
                "{tipData.tip}"
              </p>
            </div>
          ) : null}
        </div>

        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <button
            onClick={fetchTip}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {t.newTip}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold shadow-sm"
          >
            {t.gotIt}
          </button>
        </div>
      </div>
    </div>
  );
};
