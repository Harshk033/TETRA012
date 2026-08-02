import React from 'react';
import { X, Settings, Shield, Bell, Moon } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, isDarkMode, setIsDarkMode }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border border-indigo-100 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="px-6 py-5 bg-[#31276a] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-indigo-200" />
            <h3 className="font-extrabold text-base">Dashboard Settings</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-slate-800">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-100 block">Dark Mode</span>
              <span className="text-[10px] text-slate-400">Toggle dark luxury theme</span>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-11 h-6 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-slate-800">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-100 block">Push Notifications</span>
              <span className="text-[10px] text-slate-400">Alerts for pending lab results</span>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#31276a]" />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-slate-800">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-100 block">Units Preference</span>
              <span className="text-[10px] text-slate-400">Temperature & Pressure scale</span>
            </div>
            <span className="font-bold text-indigo-600 dark:text-purple-300">Imperial (°F)</span>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 text-right">
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-[#31276a] text-white font-bold">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
