import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileText,
  Bell,
  Globe,
  Lightbulb,
  Moon,
  Sun,
  ChevronDown,
  Check,
  Home,
  Users,
  ScanLine,
  UserCheck,
  X,
  RefreshCw,
  Wifi,
  WifiOff
} from 'lucide-react';
import { UserRole, DailyTip, UserProfile } from '../types';
import { TRANSLATIONS, LanguageCode } from '../utils/translations';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenAlerts: () => void;
  onOpenOCRScanner: () => void;
  onOpenLoginModal: (role: UserRole) => void;
  onOpenProfileModal: () => void;
  currentUser: UserProfile | null;
  unreadAlertsCount: number;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

const LANGUAGES: { code: LanguageCode; name: string; native: string; flag: string }[] = [
  { code: 'English', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'Hindi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'Gujarati', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'French', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'Marathi', name: 'Marathi', native: 'મરાઠી', flag: '🇮🇳' },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  isDarkMode,
  setIsDarkMode,
  onOpenAlerts,
  onOpenOCRScanner,
  onOpenLoginModal,
  onOpenProfileModal,
  currentUser,
  unreadAlertsCount,
  language,
  setLanguage,
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState<boolean>(false);
  const [isDailyTipOpen, setIsDailyTipOpen] = useState<boolean>(false);
  const [tipData, setTipData] = useState<DailyTip | null>(null);
  const [tipLoading, setTipLoading] = useState<boolean>(false);
  const [langToast, setLangToast] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(() => typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];

  const fetchDailyTip = async () => {
    setTipLoading(true);
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
      setTipLoading(false);
    }
  };

  useEffect(() => {
    if (isDailyTipOpen && !tipData) {
      fetchDailyTip();
    }
  }, [isDailyTipOpen]);

  const handleSelectLanguage = (langObj: typeof LANGUAGES[0]) => {
    setLanguage(langObj.code);
    setIsLangMenuOpen(false);
    setLangToast(`Language: ${langObj.name} (${langObj.native})`);
    setTimeout(() => setLangToast(null), 2500);
  };

  return (
    <div className="w-full flex flex-col font-sans transition-colors duration-300 sticky top-0 z-40">
      {/* Main Top Navigation Header Bar */}
      <header className="w-full px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4 bg-white dark:bg-[#2F2E68] border-b border-[#E8E4F8] dark:border-[#7A63D9]/30 transition-colors duration-300 shadow-sm relative z-40">
        {/* Brand Logo & Title */}
        <div
          onClick={() => setActiveTab('Home')}
          className="flex items-center gap-2.5 shrink-0 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#6E59CF] text-white flex items-center justify-center shadow-md shadow-[#6E59CF]/30 group-hover:scale-105 transition-transform">
            <span className="font-black text-sm">श</span>
          </div>
          <div className="hidden min-[380px]:block">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black tracking-wide text-[#3D2E66] dark:text-white whitespace-nowrap">
                {t.appName}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#6E59CF]/10 dark:bg-[#5E4EB4]/60 text-[#6E59CF] dark:text-[#A379F8] text-[9px] font-black uppercase tracking-wider whitespace-nowrap">
                CDSS AI
              </span>
            </div>
            <span className="block text-[9px] font-bold text-slate-400 dark:text-[#DADAF4] uppercase whitespace-nowrap">
              {t.tagline}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 no-scrollbar shrink min-w-0">
          <button
            id="nav-home-btn"
            onClick={() => setActiveTab('Home')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'Home'
                ? 'bg-[#6E59CF] text-white shadow-sm'
                : 'text-slate-600 dark:text-[#DADAF4] hover:bg-slate-100 dark:hover:bg-[#1D2048]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            {t.home}
          </button>

          <button
            id="nav-dashboard-btn"
            onClick={() => setActiveTab('Dashboard')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'Dashboard'
                ? 'bg-[#6E59CF] text-white shadow-sm'
                : 'text-slate-600 dark:text-[#DADAF4] hover:bg-slate-100 dark:hover:bg-[#1D2048]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            {t.commandCenter}
          </button>

          {userRole === 'worker' && (
            <button
              id="nav-patients-btn"
              onClick={() => setActiveTab('Patients')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'Patients'
                  ? 'bg-[#6E59CF] text-white shadow-sm'
                  : 'text-slate-600 dark:text-[#DADAF4] hover:bg-slate-100 dark:hover:bg-[#1D2048]'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-sky-500" />
              {t.patients}
            </button>
          )}

          <button
            id="nav-ocr-btn"
            onClick={onOpenOCRScanner}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-all whitespace-nowrap shrink-0"
          >
            <ScanLine className="w-3.5 h-3.5 text-amber-500" />
            {t.ocrScanner}
          </button>

          <button
            id="nav-reports-btn"
            onClick={() => setActiveTab('Reports')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'Reports'
                ? 'bg-[#6E59CF] text-white shadow-sm'
                : 'text-slate-600 dark:text-[#DADAF4] hover:bg-slate-100 dark:hover:bg-[#1D2048]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            {t.reports}
          </button>

          <button
            id="nav-alerts-btn"
            onClick={onOpenAlerts}
            className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-[#DADAF4] hover:bg-slate-100 dark:hover:bg-[#1D2048] transition-all whitespace-nowrap shrink-0"
          >
            <Bell className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
            {t.alerts}
            {unreadAlertsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>
        </nav>

        {/* Right Controls Area: Language, Daily Tip, Theme, Role, Login */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Offline/Online Network Indicator Badge */}
          <div
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider border transition-all ${
              isOnline
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
            }`}
            title={isOnline ? 'Online - Cloud Sync Enabled' : 'Offline Mode Active - Local Storage Persistence Enabled'}
          >
            {isOnline ? (
              <Wifi className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
            )}
            <span>{isOnline ? 'Online' : 'Offline Mode'}</span>
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              id="nav-language-btn"
              onClick={() => {
                setIsLangMenuOpen(!isLangMenuOpen);
                setIsDailyTipOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-[#1D2048] border border-indigo-200/80 dark:border-slate-700 text-xs font-black text-indigo-900 dark:text-white hover:bg-indigo-100 transition-all shadow-xs whitespace-nowrap shrink-0"
            >
              <Globe className="w-3.5 h-3.5 text-[#6E59CF] dark:text-[#A379F8]" />
              <span>{language}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-indigo-100 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3.5 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  {t.selectLanguage}
                </div>
                {LANGUAGES.map((lang) => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleSelectLanguage(lang)}
                      className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors ${
                        isSelected ? 'font-black text-[#6E59CF] dark:text-[#A379F8] bg-indigo-50/90 dark:bg-slate-800/90' : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{lang.flag}</span>
                        <div>
                          <span className="block font-bold leading-tight">{lang.name}</span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-400 block">{lang.native}</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#6E59CF] dark:text-[#A379F8]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Daily Tip Popover Button (Anchored Little Box) */}
          <div className="relative">
            <button
              id="nav-daily-tip-btn"
              onClick={() => {
                setIsDailyTipOpen(!isDailyTipOpen);
                setIsLangMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-900 dark:text-amber-300 hover:bg-amber-100 transition-all shadow-xs"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>{t.dailyTip}</span>
            </button>

            {/* Non-fullscreen Popover Box */}
            {isDailyTipOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-amber-200/80 dark:border-slate-800 p-0 z-50 animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
                <div className="px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-white/20">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-100 fill-amber-100" />
                    </div>
                    <div>
                      <h3 className="font-black text-xs leading-none">{t.dailyHealthTip}</h3>
                      <p className="text-[9px] text-amber-100 font-medium">{t.personalizedGuidance}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsDailyTipOpen(false)}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-white transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4">
                  {tipLoading ? (
                    <div className="py-4 flex items-center justify-center gap-2 text-slate-400 text-xs">
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                      Loading tip...
                    </div>
                  ) : tipData ? (
                    <div className="space-y-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider">
                        {tipData.category}
                      </span>
                      <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">
                        {tipData.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-amber-50/60 dark:bg-slate-800/60 p-3 rounded-xl border border-amber-100/80 dark:border-slate-700">
                        "{tipData.tip}"
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <button
                    onClick={fetchDailyTip}
                    className="flex items-center gap-1.5 text-xs font-extrabold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {t.newTip}
                  </button>
                  <button
                    onClick={() => setIsDailyTipOpen(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold shadow-sm transition-all"
                  >
                    {t.gotIt}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            id="dark-mode-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-xl bg-slate-100 dark:bg-[#1D2048] text-slate-700 dark:text-amber-300 hover:scale-105 active:scale-95 transition-all border border-[#E8E4F8] dark:border-slate-700"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Worker / Patient Switcher */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#1D2048] border border-[#E8E4F8] dark:border-slate-700 text-xs font-bold">
            <span className={userRole === 'patient' ? 'text-[#6E59CF] dark:text-[#A379F8] font-black' : 'text-slate-400'}>
              {t.patient}
            </span>
            <button
              id="role-toggle-switch"
              onClick={() => setUserRole(userRole === 'patient' ? 'worker' : 'patient')}
              className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 ${
                userRole === 'worker' ? 'bg-[#6E59CF]' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  userRole === 'worker' ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={userRole === 'worker' ? 'text-[#6E59CF] dark:text-[#A379F8] font-black' : 'text-slate-400'}>
              {t.worker}
            </span>
          </div>

          {/* Profile / Login Button */}
          {currentUser ? (
            <button
              onClick={onOpenProfileModal}
              className="px-3 py-1.5 rounded-xl bg-[#6E59CF] hover:bg-[#5E4EB4] text-white text-xs font-extrabold transition-all shadow-sm flex items-center gap-1.5 border border-indigo-300/30 cursor-pointer"
              title="Open User Profile & Settings"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-black text-[10px]">
                {currentUser.name.charAt(0)}
              </div>
              <span className="hidden sm:inline truncate max-w-[110px]">{currentUser.name}</span>
              <span className="text-[10px] opacity-80 bg-white/10 px-1.5 py-0.5 rounded-md hidden lg:inline">Profile</span>
            </button>
          ) : (
            <button
              onClick={() => onOpenLoginModal(userRole)}
              className="px-3 py-1.5 rounded-xl bg-[#6E59CF] hover:bg-[#5E4EB4] text-white text-xs font-extrabold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.signIn}</span>
            </button>
          )}
        </div>
      </header>

      {/* Language toast confirmation */}
      {langToast && (
        <div className="bg-[#6E59CF] text-white text-xs py-1 px-4 text-center font-bold flex items-center justify-center gap-2 animate-in slide-in-from-top-2 duration-200">
          <Globe className="w-3 h-3 text-amber-300" />
          <span>{langToast}</span>
        </div>
      )}
    </div>
  );
};
