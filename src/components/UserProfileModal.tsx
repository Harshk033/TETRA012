import React, { useState, useEffect } from 'react';
import { X, User, Stethoscope, Building, Phone, Mail, Calendar, ShieldCheck, Save, LogOut, MessageSquare, Trash2, CheckCircle2, Settings, HeartPulse, Clock } from 'lucide-react';
import { UserProfile, ChatMessage } from '../types';
import { authService } from '../services/authService';
import { TRANSLATIONS, LanguageCode } from '../utils/translations';

interface UserProfileModalProps {
  user: UserProfile;
  onClose: () => void;
  onLogout: () => void;
  onUpdateUser: (updatedUser: UserProfile) => void;
  language?: LanguageCode;
  isDarkMode?: boolean;
  setIsDarkMode?: (val: boolean) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  user,
  onClose,
  onLogout,
  onUpdateUser,
  language = 'English',
  isDarkMode = false,
  setIsDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'chatHistory' | 'preferences'>('profile');

  // Profile Edit State
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');
  const [facility, setFacility] = useState(user.facility || '');
  const [specialization, setSpecialization] = useState(user.specialization || '');
  const [ageStr, setAgeStr] = useState<string>(String(user.age || 45));
  const [gender, setGender] = useState(user.gender || 'Male');
  const [bloodGroup, setBloodGroup] = useState(user.bloodGroup || 'O+');
  const [emergencyPhone, setEmergencyPhone] = useState(user.emergencyContactPhone || '');
  const [isSavedToast, setIsSavedToast] = useState(false);
  const [isClearedToast, setIsClearedToast] = useState(false);

  // Chat History State
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  // Load saved chat history
  useEffect(() => {
    try {
      const storageKey = `sushruta_chat_history_${user.id}`;
      const storedChats = localStorage.getItem(storageKey) || localStorage.getItem('sushruta_chat_history');
      if (storedChats) {
        setChatHistory(JSON.parse(storedChats));
      }
    } catch (e) {
      console.warn('Failed to load chat history', e);
    }
  }, [user.id]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = authService.updateProfile({
      name,
      email,
      phone,
      facility,
      specialization: user.role === 'worker' ? specialization : undefined,
      age: user.role === 'patient' ? (parseInt(ageStr, 10) || 30) : undefined,
      gender: user.role === 'patient' ? gender : undefined,
      bloodGroup: user.role === 'patient' ? bloodGroup : undefined,
      emergencyContactPhone: user.role === 'patient' ? emergencyPhone : undefined,
    });

    if (updated) {
      onUpdateUser(updated);
      setIsSavedToast(true);
      setTimeout(() => setIsSavedToast(false), 3000);
    }
  };

  const handleClearChatHistory = () => {
    try {
      localStorage.removeItem(`sushruta_chat_history_${user.id}`);
      localStorage.removeItem('sushruta_chat_history');
    } catch (e) {
      console.warn('Failed to clear chat history from localStorage', e);
    }
    setChatHistory([]);
    setIsClearedToast(true);
    setTimeout(() => setIsClearedToast(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-[#2F2E68] rounded-3xl max-w-2xl w-full border border-[#E8E4F8] dark:border-[#7A63D9]/40 shadow-2xl relative my-8 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="p-6 bg-gradient-to-r from-[#31276a] to-indigo-900 text-white relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-white/20 text-white flex items-center justify-center text-2xl font-black shadow-lg shrink-0">
              {user.role === 'worker' ? <Stethoscope className="w-8 h-8 text-emerald-300" /> : <User className="w-8 h-8 text-sky-300" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">{user.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-400/30">
                  {user.role === 'worker' ? 'Health Worker' : 'Patient'}
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5 font-medium">
                ID: {user.id} {user.facility ? `• ${user.facility}` : ''}
              </p>
              <p className="text-[10px] text-indigo-300 mt-0.5">
                Registered: {user.registeredDate || 'Active Session'}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-[#6E59CF] text-[#6E59CF] dark:text-[#A379F8]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            Profile Details
          </button>

          <button
            onClick={() => setActiveTab('chatHistory')}
            className={`pb-3 px-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'chatHistory'
                ? 'border-[#6E59CF] text-[#6E59CF] dark:text-[#A379F8]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            AI Chat History
            {chatHistory.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#6E59CF] text-white text-[10px]">
                {chatHistory.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`pb-3 px-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'preferences'
                ? 'border-[#6E59CF] text-[#6E59CF] dark:text-[#A379F8]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            Account & System
          </button>
        </div>

        {/* Modal Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSavedToast && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profile details saved successfully!</span>
            </div>
          )}

          {activeTab === 'profile' ? (
            /* --- TAB 1: PROFILE DETAILS & EDIT --- */
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase text-slate-400 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase text-slate-400 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase text-slate-400 dark:text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase text-slate-400 dark:text-slate-300 mb-1">
                    Health Center / Facility
                  </label>
                  <input
                    type="text"
                    value={facility}
                    onChange={(e) => setFacility(e.target.value)}
                    placeholder="District Hospital Center"
                    className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                {user.role === 'worker' ? (
                  <>
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase text-slate-400 dark:text-slate-300 mb-1">
                        Clinical Specialization
                      </label>
                      <input
                        type="text"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase text-slate-400 dark:text-slate-300 mb-1">
                        Doctor Registration No.
                      </label>
                      <input
                        type="text"
                        disabled
                        value={user.doctorRegistrationNo || 'MCI-88201'}
                        className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase text-slate-400 dark:text-slate-300 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={ageStr}
                        onChange={(e) => setAgeStr(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase text-slate-400 dark:text-slate-300 mb-1">
                        Blood Group
                      </label>
                      <input
                        type="text"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-extrabold uppercase text-slate-400 dark:text-slate-300 mb-1">
                        Emergency Contact Phone
                      </label>
                      <input
                        type="text"
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#6E59CF] hover:bg-[#5E4EB4] text-white text-xs font-extrabold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save Profile Changes
                </button>
              </div>
            </form>
          ) : activeTab === 'chatHistory' ? (
            /* --- TAB 2: CHAT HISTORY --- */
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  Previous AI Assistant Interactions ({chatHistory.length})
                </h3>
                {chatHistory.length > 0 && (
                  <button
                    onClick={handleClearChatHistory}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 text-xs font-bold hover:bg-rose-100 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear Chat History
                  </button>
                )}
              </div>

              {isClearedToast && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 text-xs font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Chat history cleared successfully!</span>
                </div>
              )}

              {chatHistory.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-xs font-bold">No previous chat history found.</p>
                  <p className="text-[11px] mt-1">Start a conversation using the floating Shushruta AI widget below!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  {chatHistory.map((m, idx) => (
                    <div
                      key={m.id || idx}
                      className={`p-3 rounded-2xl border text-xs ${
                        m.sender === 'user'
                          ? 'bg-slate-50 dark:bg-[#1D2048] border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100'
                          : 'bg-indigo-50/70 dark:bg-slate-800/80 border-indigo-100 dark:border-slate-700 text-indigo-950 dark:text-purple-200'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1 text-[10px] font-extrabold uppercase">
                        <span className={m.sender === 'user' ? 'text-slate-500' : 'text-[#6E59CF]'}>
                          {m.sender === 'user' ? 'You' : 'Shushruta AI Assistant'}
                        </span>
                        <span className="text-slate-400 font-normal">{m.timestamp}</span>
                      </div>
                      {m.image && (
                        <div className="mb-2">
                          <img src={m.image} alt="Attachment" className="max-h-28 rounded-lg border border-indigo-200 object-cover" />
                        </div>
                      )}
                      <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* --- TAB 3: ACCOUNT & PREFERENCES --- */
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="font-extrabold uppercase text-slate-700 dark:text-slate-200">
                  Application Theme
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Toggle Dark / Light Visual Mode</span>
                  <button
                    onClick={() => setIsDarkMode && setIsDarkMode(!isDarkMode)}
                    className="px-4 py-2 rounded-xl bg-[#6E59CF] text-white font-bold text-xs"
                  >
                    {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="font-extrabold uppercase text-slate-700 dark:text-slate-200">
                  Data Persistence & Storage
                </h4>
                <p className="text-slate-500 leading-relaxed">
                  Your profile state, offline diagnostic reports, and AI chat logs are stored securely in your local browser sandbox.
                </p>
                <div className="text-[11px] font-mono text-indigo-600 dark:text-purple-300 bg-indigo-50 dark:bg-slate-800 p-2.5 rounded-xl border border-indigo-100">
                  Active User ID: {user.id} | Session Token: JWT_ACTIVE_SUSHRUTA_2026
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Logout Button */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Encrypted Session</span>
          </div>

          <button
            type="button"
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-extrabold flex items-center gap-2 transition-all shadow-sm cursor-pointer active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            Log Out & Exit
          </button>
        </div>
      </div>
    </div>
  );
};
