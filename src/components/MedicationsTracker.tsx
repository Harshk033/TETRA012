import React, { useState } from 'react';
import { Medication } from '../types';
import { Pill, Check, Clock, RotateCw, Plus } from 'lucide-react';

interface MedicationsTrackerProps {
  medications: Medication[];
  onLogMedication: (id: string) => void;
  onAddMedication: (med: Medication) => void;
}

export const MedicationsTracker: React.FC<MedicationsTrackerProps> = ({
  medications,
  onLogMedication,
  onAddMedication,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Once Daily');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dosage) return;
    onAddMedication({
      id: Date.now().toString(),
      name,
      dosage,
      frequency,
      timeOfDay: ['08:00 AM'],
      prescribedBy: 'Dr. Aditi Sharma',
      remainingPills: 30,
      totalPills: 30,
      refillDueDate: 'Sep 01, 2026',
      status: 'Active'
    });
    setName('');
    setDosage('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-indigo-100/80 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Pill className="w-5 h-5 text-rose-500" />
            Active Prescription & Dosage Schedule
          </h3>
          <p className="text-xs text-slate-400">Track daily pills, refill dates, and doctor instructions</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#31276a] hover:bg-[#251d52] text-white text-xs font-bold shadow-md transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Prescription
        </button>
      </div>

      {showAddModal && (
        <form onSubmit={handleAddSubmit} className="p-4 mb-6 rounded-2xl bg-indigo-50/80 dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input type="text" placeholder="Medication Name" value={name} onChange={e=>setName(e.target.value)} className="p-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700" />
          <input type="text" placeholder="Dosage (e.g. 10mg)" value={dosage} onChange={e=>setDosage(e.target.value)} className="p-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700" />
          <select value={frequency} onChange={e=>setFrequency(e.target.value)} className="p-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
            <option>Once Daily</option>
            <option>Twice Daily</option>
            <option>As Needed</option>
          </select>
          <button type="submit" className="py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold">Add Prescription</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {medications.map((med) => (
          <div key={med.id} className="p-5 rounded-2xl bg-indigo-50/40 dark:bg-slate-800/60 border border-indigo-100/80 dark:border-slate-700 flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                  {med.status}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">Refill: {med.refillDueDate}</span>
              </div>

              <h4 className="text-base font-extrabold text-slate-800 dark:text-slate-100">{med.name}</h4>
              <p className="text-xs font-semibold text-indigo-600 dark:text-purple-300">{med.dosage} • {med.frequency}</p>
              <p className="text-[11px] text-slate-400 mt-1">Prescribed by {med.prescribedBy}</p>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                <div className="flex justify-between text-xs text-slate-500 mb-1 font-semibold">
                  <span>Pill Supply</span>
                  <span>{med.remainingPills} / {med.totalPills} left</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 dark:bg-purple-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(med.remainingPills / med.totalPills) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => onLogMedication(med.id)}
              className="mt-5 w-full py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-800 text-indigo-900 dark:text-purple-200 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              Log Taken Today
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
