import React, { useState } from 'react';
import { X, User, Phone, Activity, Heart, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { PatientProfile } from '../types';
import { LanguageCode, TRANSLATIONS } from '../utils/translations';

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patientData: Omit<PatientProfile, 'id'>) => void;
  language: LanguageCode;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({
  isOpen,
  onClose,
  onSave,
  language,
}) => {
  const [name, setName] = useState('');
  const [ageStr, setAgeStr] = useState<string>('42');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [phone, setPhone] = useState('+91 98765 ');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [heightStr, setHeightStr] = useState<string>('168');
  const [weightStr, setWeightStr] = useState<string>('72');
  const [primaryRiskCategory, setPrimaryRiskCategory] = useState('Hypertension & CVD');
  const [riskScore, setRiskScore] = useState<number>(45);

  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  if (!isOpen) return null;

  // Calculate BMI dynamically
  const heightCm = parseFloat(heightStr) || 168;
  const weightKg = parseFloat(weightStr) || 72;
  const heightM = heightCm / 100;
  const computedBmi = heightM > 0 ? parseFloat((weightKg / (heightM * heightM)).toFixed(1)) : 22.0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      age: parseInt(ageStr, 10) || 30,
      gender,
      phone: phone.trim() || '+91 98765 00000',
      bloodGroup,
      bmi: computedBmi,
      primaryRiskCategory,
      riskScore,
      registeredDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      medicalHistory: ['Initial Intake Complete', primaryRiskCategory],
      allergies: ['None Reported'],
    });

    // Reset fields
    setName('');
    setAgeStr('42');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1D2048] rounded-3xl shadow-2xl border border-indigo-100 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#6E59CF] to-[#5E4EB4] text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Add New Patient Record</h3>
              <p className="text-[11px] text-indigo-100 font-medium">SUSHRUTA Directory Registration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Kavya Sharma"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6E59CF]"
            />
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Age (Years)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={ageStr}
                onChange={(e) => setAgeStr(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6E59CF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'Male' | 'Female' | 'Other')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6E59CF]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Phone & Blood Group */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6E59CF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6E59CF]"
              >
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Height, Weight & Calculated BMI */}
          <div className="p-3 bg-indigo-50/60 dark:bg-slate-800/60 rounded-2xl border border-indigo-100 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#6E59CF]" />
                Physical Vitals & Calculated BMI
              </span>
              <span className="text-xs font-black text-[#6E59CF] bg-white dark:bg-slate-900 px-2.5 py-0.5 rounded-lg border border-indigo-100 dark:border-slate-800">
                BMI: {computedBmi} kg/m²
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="50"
                  max="250"
                  value={heightStr}
                  onChange={(e) => setHeightStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="10"
                  max="300"
                  value={weightStr}
                  onChange={(e) => setWeightStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Primary Risk Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Primary Medical Risk Category
            </label>
            <select
              value={primaryRiskCategory}
              onChange={(e) => setPrimaryRiskCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6E59CF]"
            >
              <option value="Hypertension & CVD">Hypertension & CVD</option>
              <option value="Diabetes & CKD">Diabetes & CKD</option>
              <option value="Cardiovascular & Stroke">Cardiovascular & Stroke</option>
              <option value="Respiratory & Asthma">Respiratory & Asthma</option>
              <option value="General Metabolic Risk">General Metabolic Risk</option>
            </select>
          </div>

          {/* Initial Risk Score */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Initial Risk Assessment Score: <span className="text-[#6E59CF] font-black">{riskScore}%</span>
              </label>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                riskScore >= 70 ? 'bg-rose-100 text-rose-800' : riskScore >= 35 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {riskScore >= 70 ? 'High Risk' : riskScore >= 35 ? 'Moderate Risk' : 'Low Risk'}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              step="5"
              value={riskScore}
              onChange={(e) => setRiskScore(parseInt(e.target.value, 10))}
              className="w-full accent-[#6E59CF] cursor-pointer"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#6E59CF] hover:bg-[#5E4EB4] text-white text-xs font-black transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Save Patient Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
