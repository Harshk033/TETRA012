import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { PatientsManagement } from './components/PatientsManagement';
import { MainDashboardCard } from './components/MainDashboardCard';
import { MetricCards } from './components/MetricCards';
import { SymptomChecker } from './components/SymptomChecker';
import { ReportDetailModal } from './components/ReportDetailModal';
import { AssessmentModal } from './components/AssessmentModal';
import { DailyTipModal } from './components/DailyTipModal';
import { AlertsDrawer } from './components/AlertsDrawer';
import { UploadReportModal } from './components/UploadReportModal';
import { SettingsModal } from './components/SettingsModal';
import { LoginModal } from './components/LoginModal';
import { UserProfileModal } from './components/UserProfileModal';
import { OCRScannerModal } from './components/OCRScannerModal';
import { ClinicalSummaryModal } from './components/ClinicalSummaryModal';
import { AddPatientModal } from './components/AddPatientModal';
import { EditPatientModal } from './components/EditPatientModal';
import { EditReportModal } from './components/EditReportModal';
import { ReportsTable } from './components/ReportsTable';
import { ShushrutaAIChat } from './components/ShushrutaAIChat';

import {
  INITIAL_REPORTS,
  INITIAL_VITALS,
  INITIAL_MEDICATIONS,
  PATIENT_PROFILE,
} from './data/mockData';

import {
  MedicalReport,
  VitalRecord,
  Medication,
  UserRole,
  AssessmentResult,
  PatientProfile,
  UserProfile,
} from './types';

import { LanguageCode } from './utils/translations';
import { patientService } from './services/patientService';
import { authService } from './services/authService';

export default function App() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<string>('Home'); // 'Home' | 'Dashboard' | 'Patients' | 'Reports'
  const [subTab, setSubTab] = useState<string>('Reports');
  const [userRole, setUserRole] = useState<UserRole>('worker');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<LanguageCode>('English');

  // Patients & Records Data
  const [patientsList, setPatientsList] = useState<PatientProfile[]>([PATIENT_PROFILE]);
  const [selectedPatient, setSelectedPatient] = useState<PatientProfile>(PATIENT_PROFILE);
  const [reports, setReports] = useState<MedicalReport[]>(INITIAL_REPORTS);
  const [vitals, setVitals] = useState<VitalRecord[]>(INITIAL_VITALS);
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  // Risk Score State
  const [riskScore, setRiskScore] = useState<number>(68);
  const [riskLevel, setRiskLevel] = useState<string>('Moderate');

  // Modals & Overlays
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [loadingAssessment, setLoadingAssessment] = useState<boolean>(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState<boolean>(false);
  const [showDailyTip, setShowDailyTip] = useState<boolean>(false);
  const [showAlertsDrawer, setShowAlertsDrawer] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showOCRModal, setShowOCRModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState<boolean>(false);
  const [showEditPatientModal, setShowEditPatientModal] = useState<boolean>(false);
  const [editingPatient, setEditingPatient] = useState<PatientProfile | null>(null);
  const [showEditReportModal, setShowEditReportModal] = useState<boolean>(false);
  const [editingReport, setEditingReport] = useState<MedicalReport | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => authService.getCurrentUser());
  const [loginRole, setLoginRole] = useState<UserRole>('worker');
  const [summaryPatientModal, setSummaryPatientModal] = useState<PatientProfile | null>(null);

  // Mandatory Authentication Check on App Load
  useEffect(() => {
    const activeUser = authService.getCurrentUser();
    if (!activeUser) {
      setShowLoginModal(true);
    } else {
      setCurrentUser(activeUser);
      setUserRole(activeUser.role);
    }
  }, []);

  // Sync selected patient with currentUser when logged in as patient
  useEffect(() => {
    if (currentUser && currentUser.role === 'patient') {
      const activePatient: PatientProfile = {
        id: currentUser.id,
        name: currentUser.name,
        age: currentUser.age || 38,
        gender: currentUser.gender || 'Female',
        phone: currentUser.phone || '+91 99000 12345',
        bloodGroup: currentUser.bloodGroup || 'B+',
        bmi: currentUser.bmi || 23.8,
        medicalHistory: currentUser.medicalHistory || ['Routine Health Screened'],
        allergies: currentUser.allergies || ['None Reported'],
      };
      setSelectedPatient(activePatient);
    }
  }, [currentUser]);

  // Load initial patients from service
  useEffect(() => {
    patientService.getPatients().then((data) => {
      if (data && data.length > 0) {
        setPatientsList(data);
        setSelectedPatient(data[0]);
      }
    });
  }, []);

  // Dark Mode class toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Ensure patients cannot remain on Patients directory tab
  useEffect(() => {
    if (userRole === 'patient' && activeTab === 'Patients') {
      setActiveTab('Dashboard');
    }
  }, [userRole, activeTab]);

  // Handle Quick Symptoms Analysis
  const handleCheckSymptoms = (symptoms: string[]) => {
    if (symptoms.length === 0) {
      alert('Please select or enter at least one symptom.');
      return;
    }
    const isHigh = symptoms.some((s) => /chest pain|shortness of breath|severe/i.test(s));
    const calculatedScore = isHigh ? 82 : Math.min(30 + symptoms.length * 9, 68);
    setRiskScore(calculatedScore);
    setRiskLevel(calculatedScore > 70 ? 'High' : calculatedScore > 35 ? 'Moderate' : 'Low');

    alert(`Symptom Check Complete:\nSelected: ${symptoms.join(', ')}\nEvaluated Risk Score: ${calculatedScore}% (${calculatedScore > 70 ? 'High Risk' : 'Moderate Risk'})`);
  };

  // Handle Full Clinical Assessment
  const handleRunFullAssessment = async (symptoms: string[]) => {
    const symList = symptoms.length > 0 ? symptoms : ['Frequent Urination', 'Unexplained Weight Loss', 'Blurry Vision'];
    setShowAssessmentModal(true);
    setLoadingAssessment(true);

    try {
      const res = await fetch('/api/ai/symptom-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: symList }),
      });

      const data = await res.json();
      setAssessmentResult({
        riskScore: data.riskScore || 78,
        riskLevel: data.riskLevel || 'High',
        summary: data.summary || 'Clinical parameters and symptoms indicate elevated risk for Type-2 Diabetes and Mild Essential Hypertension.',
        recommendations: data.recommendations || [
          'Order Fasting Blood Glucose & HbA1c lab panel.',
          'Schedule Endocrinology OPD referral within 7 days.',
          'Initiate low-glycemic dietary protocol and daily 30-min walk.',
        ],
        recommendedSpecialist: data.recommendedSpecialist || 'Endocrinologist',
        urgency: data.urgency || 'Priority',
        timestamp: new Date().toLocaleTimeString(),
      });

      if (data.riskScore) {
        setRiskScore(data.riskScore);
        setRiskLevel(data.riskLevel || 'High');
      }
    } catch (e) {
      setAssessmentResult({
        riskScore: 78,
        riskLevel: 'High',
        summary: 'SUSHRUTA AI CDSS: Multi-organ risk triage detected elevated Type-2 Diabetes score (78%) and Stage-1 Hypertension (64%).',
        recommendations: [
          'Order HbA1c & Fasting Plasma Glucose confirmation test.',
          'Schedule District Hospital Endocrinology OPD consultation.',
          'Advise dietary sodium restriction (<2g/day) and glycemic monitoring.',
        ],
        recommendedSpecialist: 'Endocrinologist',
        urgency: 'Priority',
        timestamp: new Date().toLocaleTimeString(),
      });
    } finally {
      setLoadingAssessment(false);
    }
  };

  // Add new patient handler
  const handleAddPatient = () => {
    setShowAddPatientModal(true);
  };

  const handleSaveNewPatient = async (patientData: Omit<PatientProfile, 'id'>) => {
    const newPt = await patientService.addPatient(patientData);
    setPatientsList([newPt, ...patientsList]);
    setSelectedPatient(newPt);
    setShowAddPatientModal(false);
  };

  // Edit patient handler
  const handleOpenEditPatient = (patient: PatientProfile) => {
    setEditingPatient(patient);
    setShowEditPatientModal(true);
  };

  const handleSaveEditedPatient = async (updatedPatient: PatientProfile) => {
    const updated = await patientService.updatePatient(updatedPatient);
    setPatientsList((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedPatient && selectedPatient.id === updated.id) {
      setSelectedPatient(updated);
    }
    setShowEditPatientModal(false);
    setEditingPatient(null);
  };

  // Edit report handlers
  const handleOpenEditReport = (report: MedicalReport) => {
    setEditingReport(report);
    setShowEditReportModal(true);
  };

  const handleSaveEditedReport = (updatedReport: MedicalReport) => {
    setReports((prev) => prev.map((r) => (r.id === updatedReport.id ? updatedReport : r)));
    if (selectedReport && selectedReport.id === updatedReport.id) {
      setSelectedReport(updatedReport);
    }
    setShowEditReportModal(false);
    setEditingReport(null);
  };

  const handleOpenLogin = (role: UserRole) => {
    setLoginRole(role);
    setShowLoginModal(true);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setUserRole(user.role);
    setShowLoginModal(false);
    setActiveTab('Dashboard');
  };

  const handleLogout = async () => {
    await authService.logout();
    setCurrentUser(null);
    setShowProfileModal(false);
    setShowLoginModal(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBFF] dark:bg-[#1D2048] text-[#3D2E66] dark:text-white flex flex-col font-sans transition-colors duration-300">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={(r) => {
          setUserRole(r);
          if (currentUser) {
            const updated = authService.updateProfile({ role: r });
            if (updated) setCurrentUser(updated);
          }
        }}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenAlerts={() => setShowAlertsDrawer(true)}
        onOpenSettings={() => setShowSettingsModal(true)}
        onOpenOCRScanner={() => setShowOCRModal(true)}
        onOpenLoginModal={handleOpenLogin}
        onOpenProfileModal={() => setShowProfileModal(true)}
        currentUser={currentUser}
        unreadAlertsCount={3}
        language={language}
        setLanguage={setLanguage}
      />

      {/* RENDER CURRENT VIEW */}
      {activeTab === 'Home' ? (
        <LandingPage
          language={language}
          onNavigateToPortal={(role) => {
            setUserRole(role);
            setActiveTab('Dashboard');
          }}
          onOpenLoginModal={handleOpenLogin}
        />
      ) : activeTab === 'Patients' ? (
        <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
          <PatientsManagement
            patients={patientsList}
            onSelectPatient={(pt) => {
              setSelectedPatient(pt);
              setActiveTab('Dashboard');
            }}
            onAddPatientClick={handleAddPatient}
            onEditPatientClick={handleOpenEditPatient}
            onViewSummaryClick={(pt) => setSummaryPatientModal(pt)}
            language={language}
          />
        </main>
      ) : activeTab === 'Reports' ? (
        <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <ReportsTable
              reports={reports}
              subTab={subTab}
              setSubTab={setSubTab}
              onViewReport={(r) => setSelectedReport(r)}
              onEditReport={handleOpenEditReport}
              userRole={userRole}
              onAddReport={() => setShowUploadModal(true)}
              language={language}
            />
          </div>
        </main>
      ) : (
        /* DASHBOARD / COMMAND CENTER VIEW */
        <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT AREA: Patient Record & Cards */}
            <div className="lg:col-span-8 xl:col-span-8 flex flex-col gap-6">
              <MainDashboardCard
                subTab={subTab}
                setSubTab={setSubTab}
                reports={reports}
                vitals={vitals}
                medications={medications}
                patient={selectedPatient}
                userRole={userRole}
                onViewReport={(r) => setSelectedReport(r)}
                onEditReport={handleOpenEditReport}
                onAddReport={() => setShowUploadModal(true)}
                onAddVital={(v) => setVitals([v, ...vitals])}
                onLogMedication={(id) => {
                  setMedications(medications.map(m => m.id === id ? { ...m, remainingPills: Math.max(0, m.remainingPills - 1) } : m));
                  alert('Medication intake logged.');
                }}
                onAddMedication={(m) => setMedications([m, ...medications])}
                onEditPatient={handleOpenEditPatient}
                language={language}
              />

              {/* Metric Cards Row */}
              <MetricCards
                riskScore={riskScore}
                riskLevel={riskLevel}
                activeAlertsCount={3}
                conditionsScreenedCount={5}
                lastScreenedDate="Today"
                pendingTestsCount={2}
                onRunAssessment={() => handleRunFullAssessment(selectedSymptoms)}
                onOpenAlerts={() => setShowAlertsDrawer(true)}
                onOpenScreeningModal={() => setSummaryPatientModal(selectedPatient)}
                onOpenPendingLabsModal={() => setShowOCRModal(true)}
                language={language}
              />
            </div>

            {/* RIGHT AREA: Symptom Checker AI Panel */}
            <div className="lg:col-span-4 xl:col-span-4 h-full min-h-[580px]">
              <SymptomChecker
                onCheckSymptoms={handleCheckSymptoms}
                onRunFullAssessment={handleRunFullAssessment}
                selectedSymptoms={selectedSymptoms}
                setSelectedSymptoms={setSelectedSymptoms}
                language={language}
              />
            </div>
          </div>
        </main>
      )}

      {/* Floating AI Chat Assistant */}
      <ShushrutaAIChat language={language} />

      {/* Modals & Overlays */}
      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          language={language}
        />
      )}

      {showAssessmentModal && (
        <AssessmentModal
          assessment={assessmentResult}
          loading={loadingAssessment}
          onClose={() => setShowAssessmentModal(false)}
          symptomsAnalyzed={selectedSymptoms.length > 0 ? selectedSymptoms : ['Frequent Urination', 'Blurry Vision']}
        />
      )}

      {showAlertsDrawer && <AlertsDrawer onClose={() => setShowAlertsDrawer(false)} />}

      {showUploadModal && (
        <UploadReportModal
          onClose={() => setShowUploadModal(false)}
          onAddReport={(nr) => setReports([nr, ...reports])}
        />
      )}

      {showSettingsModal && (
        <SettingsModal
          onClose={() => setShowSettingsModal(false)}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      )}

      {showOCRModal && (
        <OCRScannerModal
          language={language}
          onClose={() => setShowOCRModal(false)}
          onSaveReportData={(extracted) => {
            const newRep: MedicalReport = {
              id: `rep-${Date.now()}`,
              name: `OCR Extracted - ${extracted.labName}`,
              code: 'LAB-OCR-2026',
              date: extracted.extractedDate,
              type: 'Blood Test',
              status: 'Review',
              physician: 'Dr. Aditi Sharma',
              summary: 'OCR extracted report containing Fasting Blood Glucose & Lipid markers.',
              keyMetrics: extracted.parameters.map(p => ({
                name: p.parameter,
                value: p.value,
                unit: p.unit,
                reference: p.referenceRange,
                status: p.isAbnormal ? 'high' : 'normal',
              })),
              downloadUrl: '#',
              iconType: 'blood',
            };
            setReports([newRep, ...reports]);
          }}
        />
      )}

      {showLoginModal && (
        <LoginModal
          language={language}
          initialRole={loginRole}
          isMandatory={!currentUser}
          onClose={() => {
            if (currentUser) {
              setShowLoginModal(false);
            } else {
              alert('Please sign in or create an account to access Sushruta CDSS AI.');
            }
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {showProfileModal && currentUser && (
        <UserProfileModal
          user={currentUser}
          onClose={() => setShowProfileModal(false)}
          onLogout={handleLogout}
          onUpdateUser={(updated) => setCurrentUser(updated)}
          language={language}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      )}

      {summaryPatientModal && (
        <ClinicalSummaryModal
          patient={summaryPatientModal}
          onClose={() => setSummaryPatientModal(null)}
        />
      )}

      {showAddPatientModal && (
        <AddPatientModal
          isOpen={showAddPatientModal}
          onClose={() => setShowAddPatientModal(false)}
          onSave={handleSaveNewPatient}
          language={language}
        />
      )}

      {showEditPatientModal && editingPatient && (
        <EditPatientModal
          isOpen={showEditPatientModal}
          patient={editingPatient}
          onClose={() => {
            setShowEditPatientModal(false);
            setEditingPatient(null);
          }}
          onSave={handleSaveEditedPatient}
          language={language}
        />
      )}
    </div>
  );
}
