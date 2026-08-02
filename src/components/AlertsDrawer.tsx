import React from 'react';
import { X, ShieldCheck, AlertTriangle, Bell, Clock, CheckCircle } from 'lucide-react';

interface AlertsDrawerProps {
  onClose: () => void;
}

export const AlertsDrawer: React.FC<AlertsDrawerProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md h-full shadow-2xl border-l border-indigo-100 dark:border-slate-800 flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500 fill-amber-400" />
              <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                Alerts & Triage Notifications
              </h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Status summary */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h4 className="text-xs font-extrabold text-emerald-900 dark:text-emerald-200">System Status: All Clear</h4>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-300">0 critical medical alerts active for patient Aarav Sharma.</p>
              </div>
            </div>

            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest pt-2">Recent Notifications</h3>

            <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-slate-800/60 border border-indigo-100/80 dark:border-slate-700 flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Full Blood Count Published</span>
                <span className="text-[10px] text-slate-400">Dr. Aditi Sharma • Jul 28, 2026</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-slate-800/60 border border-indigo-100/80 dark:border-slate-700 flex items-start gap-3">
              <Clock className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Lipid Panel Follow-up Scheduled</span>
                <span className="text-[10px] text-slate-400">Due in 60 days</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-[#31276a] text-white text-xs font-bold hover:bg-[#251d52]"
        >
          Close Drawer
        </button>
      </div>
    </div>
  );
};
