import React, { useState } from 'react';
import { X, Lock, User, KeyRound, Stethoscope, HeartPulse, CheckCircle2, UserPlus, Building, Phone, Calendar, ShieldCheck, Sparkles, Eye, EyeOff, Trash2, ArrowLeft } from 'lucide-react';
import { UserRole, UserProfile } from '../types';
import { authService, DEMO_WORKER_PROFILE, DEMO_PATIENT_PROFILE } from '../services/authService';
import { TRANSLATIONS, LanguageCode } from '../utils/translations';

interface LoginModalProps {
  initialRole?: UserRole;
  isMandatory?: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  language?: LanguageCode;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  initialRole = 'worker',
  isMandatory = false,
  onClose,
  onLoginSuccess,
  language = 'English',
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<UserRole>(initialRole);
  const [savedAccounts, setSavedAccounts] = useState<UserProfile[]>(() => authService.getSavedAccounts());
  const [showDifferentAccount, setShowDifferentAccount] = useState<boolean>(false);

  // Login Form State
  const [username, setUsername] = useState<string>(role === 'worker' ? 'dr.aditi@sushruta.org' : 'P-10482');
  const [password, setPassword] = useState<string>('password123');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Signup Form State
  const [fullName, setFullName] = useState<string>('');
  const [signupEmail, setSignupEmail] = useState<string>('');
  const [signupPassword, setSignupPassword] = useState<string>('');
  const [facility, setFacility] = useState<string>('');
  const [specialization, setSpecialization] = useState<string>('Community Health Physician');
  const [ageStr, setAgeStr] = useState<string>('42');
  const [gender, setGender] = useState<string>('Male');
  const [bloodGroup, setBloodGroup] = useState<string>('B+');
  const [phone, setPhone] = useState<string>('');
  const [emergencyPhone, setEmergencyPhone] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (authMode === 'login') {
      setUsername(newRole === 'worker' ? 'dr.aditi@sushruta.org' : 'P-10482');
    }
  };

  const fillDemoWorker = () => {
    setAuthMode('login');
    setRole('worker');
    setUsername('dr.aditi@sushruta.org');
    setPassword('password123');
  };

  const fillDemoPatient = () => {
    setAuthMode('login');
    setRole('patient');
    setUsername('P-10482');
    setPassword('password123');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      if (authMode === 'login') {
        if (role === 'worker') {
          const res = await authService.workerLogin(username, password);
          if (res.success && res.user) {
            onLoginSuccess(res.user);
          } else {
            setErrorMsg(res.error || 'Authentication failed');
          }
        } else {
          const res = await authService.patientLogin(username, password);
          if (res.success && res.user) {
            onLoginSuccess(res.user);
          } else {
            setErrorMsg(res.error || 'Authentication failed');
          }
        }
      } else {
        // Sign Up Mode
        const res = await authService.signup({
          role,
          name: fullName || (role === 'worker' ? 'Dr. New Specialist' : 'New Patient'),
          emailOrId: signupEmail || (role === 'worker' ? 'doctor@sushruta.org' : 'P-NEW123'),
          password: signupPassword,
          facility,
          specialization,
          age: parseInt(ageStr, 10) || 30,
          gender,
          bloodGroup,
          phone,
          emergencyContactPhone: emergencyPhone,
        });

        if (res.success && res.user) {
          onLoginSuccess(res.user);
        } else {
          setErrorMsg(res.error || 'Signup failed. Please check inputs.');
        }
      }
    } catch (err) {
      setErrorMsg('Network error connecting to auth service');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-[#2F2E68] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#E8E4F8] dark:border-[#7A63D9]/40 shadow-2xl relative my-8">
        
        {/* Close Button (only allowed if not mandatory) */}
        {!isMandatory && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Branding Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#6E59CF] text-white flex items-center justify-center shadow-md shadow-[#6E59CF]/30">
            <HeartPulse className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              {t.appName} CDSS AI
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-300 font-semibold">
              {authMode === 'login' ? 'Sign in to access clinical decision portal' : 'Create your verified CDSS AI account'}
            </p>
          </div>
        </div>

        {/* Mandatory Notice Banner */}
        {isMandatory && (
          <div className="mb-4 p-3 rounded-2xl bg-indigo-50/90 dark:bg-slate-800/90 border border-indigo-100 dark:border-slate-700 text-indigo-900 dark:text-purple-200 text-xs font-semibold flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#6E59CF] shrink-0" />
            <span>Welcome! Please log in or create an account to get started.</span>
          </div>
        )}

        {/* Auth Mode Tabs (Sign In vs Create Account) */}
        <div className="flex rounded-2xl bg-slate-100 dark:bg-[#1D2048] p-1 mb-5 border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 ${
              authMode === 'login'
                ? 'bg-white dark:bg-[#6E59CF] text-[#6E59CF] dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Sign In
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 ${
              authMode === 'signup'
                ? 'bg-white dark:bg-[#6E59CF] text-[#6E59CF] dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            Create Account
          </button>
        </div>

        {/* Role Switcher (Health Worker vs Patient) */}
        <div className="mb-5">
          <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-300 mb-1.5">
            Select User Category
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleRoleChange('worker')}
              className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                role === 'worker'
                  ? 'border-[#6E59CF] bg-indigo-50/80 dark:bg-[#1D2048] text-[#6E59CF] dark:text-purple-300 font-extrabold shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              <div className={`p-2 rounded-xl ${role === 'worker' ? 'bg-[#6E59CF] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                <Stethoscope className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs leading-tight">Health Worker</span>
                <span className="block text-[10px] text-slate-400 font-medium">Doctor / ASHA / Nurse</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('patient')}
              className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                role === 'patient'
                  ? 'border-[#6E59CF] bg-indigo-50/80 dark:bg-[#1D2048] text-[#6E59CF] dark:text-purple-300 font-extrabold shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              <div className={`p-2 rounded-xl ${role === 'patient' ? 'bg-[#6E59CF] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs leading-tight">Patient</span>
                <span className="block text-[10px] text-slate-400 font-medium">Self or Family Care</span>
              </div>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-800">
              {errorMsg}
            </div>
          )}

          {authMode === 'login' ? (
            /* --- LOGIN FIELDS --- */
            <>
              {savedAccounts.length > 0 && !showDifferentAccount ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#6E59CF] dark:text-[#CFC2FF] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Saved Accounts
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{savedAccounts.length} remembered</span>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                    {savedAccounts.map((account) => (
                      <div
                        key={account.id}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700/80 hover:border-[#6E59CF] dark:hover:border-[#6E59CF] transition-all flex items-center justify-between gap-2.5 group"
                      >
                        <div
                          onClick={() => {
                            setIsLoading(true);
                            authService.setCurrentUser(account);
                            onLoginSuccess(account);
                          }}
                          className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                        >
                          <div className={`w-9 h-9 rounded-xl text-white font-black flex items-center justify-center text-xs shadow-xs shrink-0 ${
                            account.role === 'worker' ? 'bg-[#6E59CF]' : 'bg-teal-600'
                          }`}>
                            {account.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-xs font-black text-slate-900 dark:text-white truncate group-hover:text-[#6E59CF] dark:group-hover:text-[#CFC2FF] transition-colors">
                                {account.name}
                              </h4>
                              <span className={`text-[9px] px-1.5 py-0.2 rounded-md font-extrabold ${
                                account.role === 'worker'
                                  ? 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300'
                                  : 'bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300'
                              }`}>
                                {account.role === 'worker' ? 'Worker' : 'Patient'}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-semibold">
                              {account.email || account.id} {account.facility ? `• ${account.facility}` : ''}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setIsLoading(true);
                              authService.setCurrentUser(account);
                              onLoginSuccess(account);
                            }}
                            className="px-2.5 py-1.5 rounded-xl bg-[#6E59CF] hover:bg-[#5E4EB4] text-white text-[11px] font-bold shadow-xs cursor-pointer transition-transform active:scale-95"
                          >
                            Sign In
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const updated = authService.removeSavedAccount(account.id);
                              setSavedAccounts(updated);
                              if (updated.length === 0) {
                                setShowDifferentAccount(true);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                            title="Forget this account"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signup');
                        setErrorMsg(null);
                      }}
                      className="w-full py-2.5 px-3 rounded-2xl bg-indigo-50 dark:bg-slate-800/80 hover:bg-indigo-100 dark:hover:bg-slate-700 text-[#6E59CF] dark:text-[#CFC2FF] text-xs font-extrabold transition-all cursor-pointer text-center"
                    >
                      + Create New Account
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {savedAccounts.length > 0 && (
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Sign in with credentials:</span>
                      <button
                        type="button"
                        onClick={() => setShowDifferentAccount(false)}
                        className="text-[11px] font-extrabold text-[#6E59CF] dark:text-[#CFC2FF] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3 h-3" /> Back to saved accounts
                      </button>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 mb-1">
                      {role === 'worker' ? 'Doctor / Worker Email' : 'Patient Hospital ID / Phone'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={role === 'worker' ? 'dr.aditi@sushruta.org' : 'e.g. P-10482'}
                        className="w-full pl-10 pr-4 py-3 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6E59CF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-3 text-sm font-medium rounded-2xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6E59CF]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer transition-colors"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <Eye className="w-4 h-4 text-[#6E59CF]" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            /* --- SIGN UP FIELDS --- */
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={role === 'worker' ? 'Dr. Priya Mehta' : 'Aarav Sharma'}
                  className="w-full px-4 py-2.5 text-xs font-medium rounded-2xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6E59CF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 mb-1">
                  {role === 'worker' ? 'Email Address' : 'Hospital ID / Email'}
                </label>
                <input
                  type="text"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder={role === 'worker' ? 'priya@sushruta.org' : 'P-99081'}
                  className="w-full px-4 py-2.5 text-xs font-medium rounded-2xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6E59CF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 mb-1">
                  Set Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create strong password"
                    className="w-full pl-10 pr-10 py-2.5 text-xs font-medium rounded-2xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6E59CF]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer transition-colors"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <Eye className="w-4 h-4 text-[#6E59CF]" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Role-Specific Fields */}
              {role === 'worker' ? (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 mb-1">
                      Facility / Health Center
                    </label>
                    <input
                      type="text"
                      value={facility}
                      onChange={(e) => setFacility(e.target.value)}
                      placeholder="District Hospital"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 mb-1">
                      Specialization
                    </label>
                    <input
                      type="text"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      placeholder="Physician / ASHA"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={ageStr}
                      onChange={(e) => setAgeStr(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 mb-1">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-2 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 mb-1">
                      Blood Group
                    </label>
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="w-full px-2 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#1D2048] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="O+">O+</option>
                      <option value="AB+">AB+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-[#6E59CF] hover:bg-[#5E4EB4] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>
                  {authMode === 'login'
                    ? role === 'worker' ? 'Sign In to Health Worker Portal' : 'Sign In to Patient Portal'
                    : 'Create Verified Account'}
                </span>
              </>
            )}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Encrypted Session & Patient Data Persistence Enabled</span>
        </div>
      </div>
    </div>
  );
};
