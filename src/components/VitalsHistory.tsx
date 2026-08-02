import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { VitalRecord } from '../types';
import { Heart, Activity, Wind, Thermometer, Plus, Check } from 'lucide-react';

interface VitalsHistoryProps {
  vitals: VitalRecord[];
  onAddVital: (vital: VitalRecord) => void;
}

export const VitalsHistory: React.FC<VitalsHistoryProps> = ({ vitals, onAddVital }) => {
  const [metric, setMetric] = useState<'heartRate' | 'sysBP' | 'spO2' | 'temperature'>('heartRate');
  const [showAddForm, setShowAddForm] = useState(false);

  // New vital state (stored as string to avoid forcing 0 when backspacing)
  const [newHR, setNewHR] = useState<string>('72');
  const [newSys, setNewSys] = useState<string>('120');
  const [newDia, setNewDia] = useState<string>('80');
  const [newSpO2, setNewSpO2] = useState<string>('98');
  const [newTemp, setNewTemp] = useState<string>('98.6');

  const sanitizeInput = (val: string): string => {
    if (val === '') return '';
    // Prevent negative values
    if (val.startsWith('-') || Number(val) < 0) {
      return '0';
    }
    // Strip leading zeros if not decimal "0."
    if (val.length > 1 && val.startsWith('0') && !val.startsWith('0.')) {
      const stripped = val.replace(/^0+/, '');
      return stripped === '' ? '0' : stripped;
    }
    return val;
  };

  const latest = vitals[vitals.length - 1] || vitals[0];

  const handleSaveVital = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    const timeStr = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    onAddVital({
      date: dateStr,
      time: timeStr,
      heartRate: Math.max(0, Number(newHR) || 72),
      sysBP: Math.max(0, Number(newSys) || 120),
      diaBP: Math.max(0, Number(newDia) || 80),
      spO2: Math.max(0, Number(newSpO2) || 98),
      temperature: Math.max(0, Number(newTemp) || 98.6)
    });
    setNewHR('72');
    setNewSys('120');
    setNewDia('80');
    setNewSpO2('98');
    setNewTemp('98.6');
    setShowAddForm(false);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-indigo-100/80 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      {/* Vitals Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {/* Heart Rate Card */}
        <button
          onClick={() => setMetric('heartRate')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            metric === 'heartRate'
              ? 'bg-rose-50/80 border-rose-300 dark:bg-rose-950/40 dark:border-rose-800 ring-2 ring-rose-400/40'
              : 'bg-indigo-50/30 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Heart Rate</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {latest?.heartRate} <span className="text-xs font-semibold text-slate-400">bpm</span>
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Normal Rhythm</span>
        </button>

        {/* Blood Pressure Card */}
        <button
          onClick={() => setMetric('sysBP')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            metric === 'sysBP'
              ? 'bg-indigo-50/80 border-indigo-300 dark:bg-indigo-950/40 dark:border-indigo-800 ring-2 ring-indigo-400/40'
              : 'bg-indigo-50/30 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Blood Pressure</span>
            <Activity className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {latest?.sysBP}/{latest?.diaBP} <span className="text-xs font-semibold text-slate-400">mmHg</span>
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Optimal Range</span>
        </button>

        {/* Oxygen Saturation Card */}
        <button
          onClick={() => setMetric('spO2')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            metric === 'spO2'
              ? 'bg-sky-50/80 border-sky-300 dark:bg-sky-950/40 dark:border-sky-800 ring-2 ring-sky-400/40'
              : 'bg-indigo-50/30 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Oxygen (SpO2)</span>
            <Wind className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {latest?.spO2} <span className="text-xs font-semibold text-slate-400">%</span>
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Excellent</span>
        </button>

        {/* Temperature Card */}
        <button
          onClick={() => setMetric('temperature')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            metric === 'temperature'
              ? 'bg-amber-50/80 border-amber-300 dark:bg-amber-950/40 dark:border-amber-800 ring-2 ring-amber-400/40'
              : 'bg-indigo-50/30 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Body Temp</span>
            <Thermometer className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {latest?.temperature} <span className="text-xs font-semibold text-slate-400">°F</span>
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Afebrile</span>
        </button>
      </div>

      {/* Chart Section */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
            {metric === 'heartRate' && 'Heart Rate Trend (BPM)'}
            {metric === 'sysBP' && 'Systolic Blood Pressure Trend (mmHg)'}
            {metric === 'spO2' && 'Oxygen Saturation Trend (%)'}
            {metric === 'temperature' && 'Body Temperature Trend (°F)'}
          </h3>
          <p className="text-xs text-slate-400">Past 7 daily morning logs</p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#31276a] hover:bg-[#251d52] text-white text-xs font-bold shadow-md transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          Log Vitals
        </button>
      </div>

      {/* Add Vitals Log Modal / Form */}
      {showAddForm && (
        <form onSubmit={handleSaveVital} className="p-4 mb-6 rounded-2xl bg-indigo-50/80 dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 grid grid-cols-2 sm:grid-cols-6 gap-3 animate-in fade-in slide-in-from-top-2">
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Heart Rate (BPM)</label>
            <input
              type="number"
              min="0"
              placeholder="72"
              value={newHR}
              onChange={e => setNewHR(sanitizeInput(e.target.value))}
              className="w-full p-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#A695F9] outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Systolic BP (mmHg)</label>
            <input
              type="number"
              min="0"
              placeholder="120"
              value={newSys}
              onChange={e => setNewSys(sanitizeInput(e.target.value))}
              className="w-full p-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#A695F9] outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Diastolic BP (mmHg)</label>
            <input
              type="number"
              min="0"
              placeholder="80"
              value={newDia}
              onChange={e => setNewDia(sanitizeInput(e.target.value))}
              className="w-full p-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#A695F9] outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">SpO2 (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="98"
              value={newSpO2}
              onChange={e => setNewSpO2(sanitizeInput(e.target.value))}
              className="w-full p-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#A695F9] outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Body Temp (°F)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder="98.6"
              value={newTemp}
              onChange={e => setNewTemp(sanitizeInput(e.target.value))}
              className="w-full p-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#A695F9] outline-none"
            />
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-end">
            <button type="submit" className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95">
              <Check className="w-3.5 h-3.5" /> Save
            </button>
          </div>
        </form>
      )}

      {/* Recharts Area Chart */}
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={vitals} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="vitalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                borderRadius: '12px',
                border: 'none',
                color: '#fff',
                fontSize: '12px'
              }}
            />
            <Area type="monotone" dataKey={metric} stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#vitalGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
