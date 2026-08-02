export type LanguageCode = 'English' | 'Hindi' | 'Gujarati' | 'French' | 'Marathi';

export interface Translations {
  appName: string;
  tagline: string;
  home: string;
  commandCenter: string;
  patients: string;
  ocrScanner: string;
  reports: string;
  alerts: string;
  dailyTip: string;
  signIn: string;
  patient: string;
  worker: string;
  
  // Subtabs & Navigation
  vitalsHistory: string;
  medications: string;
  patientData: string;
  
  // Search & Actions
  searchReports: string;
  uploadReport: string;
  
  // Symptom Checker
  symptomChecker: string;
  clearAll: string;
  typeSymptomPlaceholder: string;
  selected: string;
  quickSelect: string;
  checkSymptoms: string;
  runAiAssessment: string;
  
  // Metric Cards
  aiTriageAssessment: string;
  calculatedRiskScore: string;
  activeMedicalAlerts: string;
  conditionsScreened: string;
  pendingLabResults: string;
  runNewAssessment: string;
  viewAlerts: string;
  screeningHistory: string;
  pendingLabs: string;

  // Patient Profile & Vitals
  patientProfile: string;
  ayushmanId: string;
  ageGender: string;
  bloodGroup: string;
  heartRate: string;
  bloodPressure: string;
  oxygenSat: string;
  temp: string;
  bloodSugar: string;
  bmi: string;
  overallRiskLevel: string;
  lifestyleRecommendations: string;
  recentLabReports: string;
  activeMedications: string;
  addVital: string;
  addMedication: string;
  
  // Risk Levels
  all: string;
  addPatient: string;
  lowRisk: string;
  moderateRisk: string;
  highRisk: string;

  // Language Menu Title & Daily Tip
  selectLanguage: string;
  dailyHealthTip: string;
  personalizedGuidance: string;
  gotIt: string;
  newTip: string;

  // Table Headers & Actions
  reportNameTable: string;
  dateTable: string;
  typeTable: string;
  statusTable: string;
  physicianTable: string;
  actionTable: string;
  viewBtn: string;
  noReportsFound: string;

  // Landing Page & Patients Table Translation Keys
  cdssTagline: string;
  heroTitlePrefix: string;
  heroTitleSub: string;
  heroDesc: string;
  launchWorkerCmd: string;
  accessPatientPortal: string;
  nabhCompliant: string;
  hipaaEncrypted: string;
  liveAssessmentTitle: string;
  activeTriage: string;
  autoReferralTitle: string;
  targetDiseaseHeader: string;
  targetDiseaseSub: string;
  clinicalModuleLabel: string;
  evaluatedMarkers: string;
  builtForExcellence: string;
  coreFeaturesHeader: string;
  patientProfileTable: string;
  vitalsBmiTable: string;
  primaryRiskFlagTable: string;
  riskScoreTable: string;
  actionsTable: string;
  cdssReportBtn: string;
  inspectBtn: string;

  // Metric Cards Status Labels
  riskLabel: string;
  activeLabel: string;
  doneLabel: string;
  lastLabel: string;
  todayLabel: string;
  resultsLabel: string;

  // OCR Scanner Modal
  ocrScannerTitle: string;
  ocrScannerSub: string;
  dragDropReport: string;
  supportsReportTypes: string;
  browseLocalFiles: string;
  processingOcr: string;
  ocrScanningDesc: string;
  extractedParamsTitle: string;
  parameterHeader: string;
  valueHeader: string;
  unitHeader: string;
  refRangeHeader: string;
  statusHeader: string;
  highFlag: string;
  normalFlag: string;
  scanAnotherFile: string;
  saveToProfile: string;
  verifiedTag: string;

  // Report Detail Modal
  physicianLabel: string;
  statusLabel: string;
  categoryLabel: string;
  clinicalFindingsTitle: string;
  biomarkerTitle: string;
  observedValueHeader: string;
  refIntervalHeader: string;
  doctorRecTitle: string;
  aiMedicalSummarizer: string;
  genPlainEnglishSummary: string;
  analyzingBtn: string;
  downloadPdfReport: string;
  closeBtn: string;

  // Login Modal
  sushrutaPortalTitle: string;
  cdssSignInSub: string;
  healthWorkerTab: string;
  patientTab: string;
  workerEmailLabel: string;
  patientHospitalIdLabel: string;
  passwordLabel: string;
  rememberCredentials: string;
  forgotPassword: string;
  signInToWorkerPortal: string;
  signInToPatientPortal: string;
  authenticating: string;
  demoAuthNotice: string;
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  English: {
    appName: 'SUSHRUTA',
    tagline: 'Clinical Care & AI Diagnostics',
    home: 'Home',
    commandCenter: 'Command Center',
    patients: 'Patients',
    ocrScanner: 'OCR Scanner',
    reports: 'Reports',
    alerts: 'Alerts',
    dailyTip: 'Daily Tip',
    signIn: 'Sign In',
    patient: 'Patient',
    worker: 'Worker',
    vitalsHistory: 'Vitals History',
    medications: 'Medications',
    patientData: 'Patient Data',
    searchReports: 'Search reports...',
    uploadReport: 'Upload Report',
    symptomChecker: 'SYMPTOM CHECKER',
    clearAll: 'Clear All',
    typeSymptomPlaceholder: 'Type symptom (e.g. Fever)...',
    selected: 'Selected',
    quickSelect: 'QUICK SELECT',
    checkSymptoms: 'Check Symptoms',
    runAiAssessment: 'Run AI Assessment',
    aiTriageAssessment: 'AI Triage Assessment',
    calculatedRiskScore: 'Calculated Risk Score',
    activeMedicalAlerts: 'Active Medical Alerts',
    conditionsScreened: 'Conditions Screened',
    pendingLabResults: 'Pending Lab Results',
    runNewAssessment: 'Run New Assessment',
    viewAlerts: 'View Alerts',
    screeningHistory: 'Screening History',
    pendingLabs: 'Pending Labs',
    patientProfile: 'Patient Profile',
    ayushmanId: 'Ayushman Bharat ID',
    ageGender: 'Age & Gender',
    bloodGroup: 'Blood Group',
    heartRate: 'Heart Rate',
    bloodPressure: 'Blood Pressure',
    oxygenSat: 'SpO2 Oxygen',
    temp: 'Temperature',
    bloodSugar: 'Blood Sugar',
    bmi: 'BMI Index',
    overallRiskLevel: 'Overall Risk Level',
    lifestyleRecommendations: 'Lifestyle & Clinical Recommendations',
    recentLabReports: 'Recent Lab Reports',
    activeMedications: 'Active Medications',
    addVital: 'Add Vital Reading',
    addMedication: 'Add Medication',
    all: 'All Patients',
    addPatient: 'Add Patient',
    lowRisk: 'Low Risk',
    moderateRisk: 'Moderate Risk',
    highRisk: 'High Risk',
    selectLanguage: 'Select Language',
    dailyHealthTip: 'Daily Health Tip',
    personalizedGuidance: 'Personalized Wellness Guidance',
    gotIt: 'Got It',
    newTip: 'New Tip',
    reportNameTable: 'REPORT NAME',
    dateTable: 'DATE',
    typeTable: 'TYPE',
    statusTable: 'STATUS',
    physicianTable: 'PHYSICIAN',
    actionTable: 'ACTION',
    viewBtn: 'View',
    noReportsFound: 'No matching clinical reports found.',
    cdssTagline: 'AI Clinical Decision Support System (CDSS)',
    heroTitlePrefix: 'SUSHRUTA',
    heroTitleSub: 'Early Risk Prediction & Clinical Referral',
    heroDesc: 'An AI-powered clinical intelligence platform designed for healthcare workers, community health centers, and patients to detect lifestyle disease risks early and streamline OPD specialist referrals.',
    launchWorkerCmd: 'Launch Worker Command Center',
    accessPatientPortal: 'Access Patient Portal',
    nabhCompliant: 'NABH Standard Compliant',
    hipaaEncrypted: 'HIPAA Encrypted Patient Records',
    liveAssessmentTitle: 'Live AI CDSS Assessment',
    activeTriage: 'ACTIVE TRIAGE',
    autoReferralTitle: 'Automated Referral Directive',
    targetDiseaseHeader: 'Target Lifestyle Disease Predictions',
    targetDiseaseSub: 'SUSHRUTA standardizes early risk prediction across 5 major chronic conditions using multi-modal clinical inputs.',
    clinicalModuleLabel: 'Clinical Module',
    evaluatedMarkers: 'Evaluated Clinical Markers',
    builtForExcellence: 'Built for Clinical Excellence',
    coreFeaturesHeader: 'Core Modules & Features',
    patientProfileTable: 'Patient Profile',
    vitalsBmiTable: 'Vitals & BMI',
    primaryRiskFlagTable: 'Primary Risk Flag',
    riskScoreTable: 'Risk Score',
    actionsTable: 'Actions',
    cdssReportBtn: 'CDSS Report',
    inspectBtn: 'Inspect',
    riskLabel: 'RISK',
    activeLabel: 'Active',
    doneLabel: 'Done',
    lastLabel: 'Last',
    todayLabel: 'Today',
    resultsLabel: 'Results',
    ocrScannerTitle: 'OCR LAB REPORT SCANNER',
    ocrScannerSub: 'Extract Clinical Parameters from Image or PDF Reports',
    dragDropReport: 'Drag & Drop Medical Report (PNG, JPG, PDF)',
    supportsReportTypes: 'Supports Blood Sugar Panels, Lipid Profiles, Kidney/Renal Reports',
    browseLocalFiles: 'Browse Local Files',
    processingOcr: 'Processing OCR & Vision AI Extraction',
    ocrScanningDesc: 'Scanning document lines, isolating numerical values, units, and clinical reference ranges...',
    extractedParamsTitle: 'Extracted Clinical Parameters (Click to Edit)',
    parameterHeader: 'Parameter',
    valueHeader: 'Value',
    unitHeader: 'Unit',
    refRangeHeader: 'Ref Range',
    statusHeader: 'Status',
    highFlag: 'HIGH FLAG',
    normalFlag: 'NORMAL',
    scanAnotherFile: 'Scan Another File',
    saveToProfile: 'Save to Patient Profile',
    verifiedTag: 'Verified',
    physicianLabel: 'Physician',
    statusLabel: 'Status',
    categoryLabel: 'Report Category',
    clinicalFindingsTitle: 'Clinical Findings',
    biomarkerTitle: 'Biomarker Measurements',
    observedValueHeader: 'Observed Value',
    refIntervalHeader: 'Reference Interval',
    doctorRecTitle: "Doctor's Recommendation",
    aiMedicalSummarizer: 'AI Medical Summarizer',
    genPlainEnglishSummary: 'Generate Plain-English Summary',
    analyzingBtn: 'Analyzing...',
    downloadPdfReport: 'Download PDF Report',
    closeBtn: 'Close',
    sushrutaPortalTitle: 'SUSHRUTA PORTAL',
    cdssSignInSub: 'Clinical Decision Support Sign In',
    healthWorkerTab: 'Health Worker',
    patientTab: 'Patient',
    workerEmailLabel: 'WORKER EMAIL / ID',
    patientHospitalIdLabel: 'PATIENT HOSPITAL ID',
    passwordLabel: 'PASSWORD',
    rememberCredentials: 'Remember credentials',
    forgotPassword: 'Forgot Password?',
    signInToWorkerPortal: 'SIGN IN TO WORKER PORTAL',
    signInToPatientPortal: 'SIGN IN TO PATIENT PORTAL',
    authenticating: 'Authenticating...',
    demoAuthNotice: 'Demo Authentication Enabled • Backends Ready',
  },
  Hindi: {
    appName: 'सुश्रुत',
    tagline: 'नैदानिक ​​देखभाल और एआई निदान',
    home: 'मुख्य पृष्ठ',
    commandCenter: 'कमांड सेंटर',
    patients: 'मरीज़',
    ocrScanner: 'ओसीआर स्कैनर',
    reports: 'रिपोर्ट',
    alerts: 'अलर्ट',
    dailyTip: 'दैनिक सुझाव',
    signIn: 'साइन इन',
    patient: 'मरीज़',
    worker: 'स्वास्थ्यकर्मी',
    vitalsHistory: 'वाइटल्स इतिहास',
    medications: 'दवाएं',
    patientData: 'मरीज़ विवरण',
    searchReports: 'रिपोर्ट खोजें...',
    uploadReport: 'रिपोर्ट अपलोड करें',
    symptomChecker: 'लक्षण जांचकर्ता',
    clearAll: 'सभी हटाएं',
    typeSymptomPlaceholder: 'लक्षण लिखें (जैसे बुखार)...',
    selected: 'चयनित',
    quickSelect: 'त्वरित चयन',
    checkSymptoms: 'लक्षण जांचें',
    runAiAssessment: 'एआई मूल्यांकन करें',
    aiTriageAssessment: 'एआई ट्राइएज मूल्यांकन',
    calculatedRiskScore: 'जोखिम स्कोर',
    activeMedicalAlerts: 'सक्रिय स्वास्थ्य अलर्ट',
    conditionsScreened: 'जांची गई स्थितियां',
    pendingLabResults: 'लंबित लैब परिणाम',
    runNewAssessment: 'नया मूल्यांकन करें',
    viewAlerts: 'अलर्ट देखें',
    screeningHistory: 'स्क्रीनिंग इतिहास',
    pendingLabs: 'लंबित लैब',
    patientProfile: 'मरीज़ प्रोफ़ाइल',
    ayushmanId: 'आयुष्मान भारत आईडी',
    ageGender: 'उम्र और लिंग',
    bloodGroup: 'रक्त समूह',
    heartRate: 'हृदय गति',
    bloodPressure: 'रक्तचाप',
    oxygenSat: 'ऑक्सीजन स्तर',
    temp: 'शरीर तापमान',
    bloodSugar: 'रक्त शर्करा',
    bmi: 'बीएमआई सूचकांक',
    overallRiskLevel: 'कुल जोखिम स्तर',
    lifestyleRecommendations: 'जीवनशैली और नैदानिक ​​सिफारिशें',
    recentLabReports: 'हाल की लैब रिपोर्ट',
    activeMedications: 'चालू दवाएं',
    addVital: 'वाइटल्स जोड़ें',
    addMedication: 'दवा जोड़ें',
    all: 'सभी मरीज',
    addPatient: 'नया मरीज जोड़ें',
    lowRisk: 'कम जोखिम',
    moderateRisk: 'मध्यम जोखिम',
    highRisk: 'उच्च जोखिम',
    selectLanguage: 'भाषा चुनें',
    dailyHealthTip: 'दैनिक स्वास्थ्य सुझाव',
    personalizedGuidance: 'व्यक्तिगत स्वास्थ्य मार्गदर्शन',
    gotIt: 'समझ गया',
    newTip: 'नया सुझाव',
    reportNameTable: 'रिपोर्ट का नाम',
    dateTable: 'तारीख',
    typeTable: 'प्रकार',
    statusTable: 'स्थिति',
    physicianTable: 'चिकित्सक',
    actionTable: 'कार्रवाई',
    viewBtn: 'देखें',
    noReportsFound: 'कोई मेल खाती क्लिनिकल रिपोर्ट नहीं मिली।',
    cdssTagline: 'एआई क्लिनिकल निर्णय सहायता प्रणाली (CDSS)',
    heroTitlePrefix: 'सुश्रुत',
    heroTitleSub: 'प्रारंभिक जोखिम पूर्वानुमान और नैदानिक संदर्भ',
    heroDesc: 'स्वास्थ्य कार्यकर्ताओं, सामुदायिक स्वास्थ्य केंद्रों और रोगियों के लिए जीवनशैली बीमारियों के जोखिमों का शीघ्र पता लगाने और ओपीडी विशेषज्ञ संदर्भों को सुगम बनाने के लिए निर्मित एआई-संचालित मंच।',
    launchWorkerCmd: 'कार्यकर्ता कमांड सेंटर शुरू करें',
    accessPatientPortal: 'मरीज़ पोर्टल खोलें',
    nabhCompliant: 'एनएबीएच मानक अनुपालित',
    hipaaEncrypted: 'हिपा (HIPAA) एन्क्रिप्टेड मरीज़ रिकॉर्ड',
    liveAssessmentTitle: 'लाइव एआई सीडीएसएस मूल्यांकन',
    activeTriage: 'सक्रिय ट्राइएज',
    autoReferralTitle: 'स्वचालित रिफ़रल निर्देश',
    targetDiseaseHeader: 'लक्ष्य जीवनशैली बीमारी पूर्वानुमान',
    targetDiseaseSub: 'सुश्रुत ५ प्रमुख पुरानी बीमारियों में प्रारंभिक जोखिम मूल्यांकन को मानकीकृत करता है।',
    clinicalModuleLabel: 'नैदानिक मॉड्यूल',
    evaluatedMarkers: 'मूल्यांकन किए गए नैदानिक संकेतक',
    builtForExcellence: 'नैदानिक उत्कृष्टता के लिए निर्मित',
    coreFeaturesHeader: 'मुख्य मॉड्यूल और विशेषताएं',
    patientProfileTable: 'मरीज़ प्रोफाइल',
    vitalsBmiTable: 'वाइटल्स और बीएमआई',
    primaryRiskFlagTable: 'प्राथमिक जोखिम संकेत',
    riskScoreTable: 'जोखिम स्कोर',
    actionsTable: 'कार्रवाई',
    cdssReportBtn: 'सीडीएसएस रिपोर्ट',
    inspectBtn: 'जांचें',
    riskLabel: 'जोखिम',
    activeLabel: 'सक्रिय',
    doneLabel: 'पूर्ण',
    lastLabel: 'अंतिम',
    todayLabel: 'आज',
    resultsLabel: 'परिणाम',
    ocrScannerTitle: 'ओसीआर लैब रिपोर्ट स्कैनर',
    ocrScannerSub: 'इमेज या पीडीएफ रिपोर्ट से क्लिनिकल पैरामीटर निकालें',
    dragDropReport: 'मेडिकल रिपोर्ट ड्रैग एंड ड्रॉप करें (PNG, JPG, PDF)',
    supportsReportTypes: 'ब्लड शुगर, लिपिड प्रोफाइल, किडनी/रिनल रिपोर्ट समर्थित',
    browseLocalFiles: 'स्थानीय फ़ाइलें ब्राउज़ करें',
    processingOcr: 'ओसीआर और विज़न एआई एक्सट्रैक्शन संसाधित हो रहा है',
    ocrScanningDesc: 'दस्तावेज़ पंक्तियों को स्कैन करना, संख्यात्मक मान, इकाइयाँ और संदर्भ श्रेणियों को अलग करना...',
    extractedParamsTitle: 'निकारे गए क्लिनिकल पैरामीटर (संपादित करने के लिए क्लिक करें)',
    parameterHeader: 'पैरामीटर',
    valueHeader: 'मान',
    unitHeader: 'इकाई',
    refRangeHeader: 'संदर्भ सीमा',
    statusHeader: 'स्थिति',
    highFlag: 'उच्च संकेत',
    normalFlag: 'सामान्य',
    scanAnotherFile: 'दूसरी फ़ाइल स्कैन करें',
    saveToProfile: 'मरीज़ प्रोफ़ाइल में सहेजें',
    verifiedTag: 'सत्यापित',
    physicianLabel: 'चिकित्सक',
    statusLabel: 'स्थिति',
    categoryLabel: 'रिपोर्ट श्रेणी',
    clinicalFindingsTitle: 'क्लिनिकल निष्कर्ष',
    biomarkerTitle: 'बायोमार्कर मापन',
    observedValueHeader: 'देखा गया मान',
    refIntervalHeader: 'संदर्भ अंतराल',
    doctorRecTitle: 'डॉक्टर की सिफारिश',
    aiMedicalSummarizer: 'एआई मेडिकल सारांशकर्ता',
    genPlainEnglishSummary: 'सरल भाषा में सारांश उत्पन्न करें',
    analyzingBtn: 'विश्लेषण हो रहा है...',
    downloadPdfReport: 'पीडीएफ रिपोर्ट डाउनलोड करें',
    closeBtn: 'बंद करें',
    sushrutaPortalTitle: 'सुश्रुत पोर्टल',
    cdssSignInSub: 'क्लिनिकल निर्णय सहायता साइन इन',
    healthWorkerTab: 'स्वास्थ्य कार्यकर्ता',
    patientTab: 'मरीज़',
    workerEmailLabel: 'कार्यकर्ता ईमेल / आईडी',
    patientHospitalIdLabel: 'मरीज़ अस्पताल आईडी',
    passwordLabel: 'पासवर्ड',
    rememberCredentials: 'क्रेडेंशियल याद रखें',
    forgotPassword: 'पासवर्ड भूल गए?',
    signInToWorkerPortal: 'कार्यकर्ता पोर्टल में साइन इन करें',
    signInToPatientPortal: 'मरीज़ पोर्टल में साइन इन करें',
    authenticating: 'प्रमाणित हो रहा है...',
    demoAuthNotice: 'डेमो प्रमाणीकरण सक्षम • बैकएंड तैयार',
  },
  Gujarati: {
    appName: 'સુશ્રુત',
    tagline: 'ક્લિનિકલ સંભાળ અને AI નિદાન',
    home: 'મુખ્ય પૃષ્ઠ',
    commandCenter: 'કમાન્ડ સેન્ટર',
    patients: 'દર્દીઓ',
    ocrScanner: 'OCR સ્કેનર',
    reports: 'રિપોર્ટ્સ',
    alerts: 'એલર્ટ્સ',
    dailyTip: 'દૈનિક ટીપ',
    signIn: 'સાઇન ઇન',
    patient: 'દર્દી',
    worker: 'હેલ્થ વર્કર',
    vitalsHistory: 'વાઇટલ્સ ઇતિહાસ',
    medications: 'દવાઓ',
    patientData: 'દર્દી વિગત',
    searchReports: 'રિપોર્ટ્સ શોધો...',
    uploadReport: 'રિપોર્ટ અપલોડ કરો',
    symptomChecker: 'લક્ષણ તપાસકર્તા',
    clearAll: 'બધું ભૂંસી નાખો',
    typeSymptomPlaceholder: 'લક્ષણ લખો (દા.ત. તાવ)...',
    selected: 'પસંદ કરેલ',
    quickSelect: 'ઝડપી પસંદગી',
    checkSymptoms: 'લક્ષણો તપાસો',
    runAiAssessment: 'AI મૂલ્યાંકન કરો',
    aiTriageAssessment: 'AI ટ્રાયએજ મૂલ્યાંકન',
    calculatedRiskScore: 'જોખમ સ્કોર',
    activeMedicalAlerts: 'સક્રિય તબીબી સૂચનાઓ',
    conditionsScreened: 'તપાસેલ સ્થિતિઓ',
    pendingLabResults: 'પેન્ડિંગ લેબ પરિણામો',
    runNewAssessment: 'નવું મૂલ્યાંકન શરૂ કરો',
    viewAlerts: 'એલર્ટ જુઓ',
    screeningHistory: 'સ્ક્રીનિંગ ઇતિહાસ',
    pendingLabs: 'પેન્ડિંગ લેબ્સ',
    patientProfile: 'દર્દી પ્રોફાઇલ',
    ayushmanId: 'આયુષ્યમાન ભારત ID',
    ageGender: 'ઉંમર અને લિંગ',
    bloodGroup: 'બ્લડ ગ્રુપ',
    heartRate: 'હૃદયના ધબકારા',
    bloodPressure: 'બ્લડ પ્રેશર',
    oxygenSat: 'ઓક્સિજન સ્તર',
    temp: 'શરીરનું તાપમાન',
    bloodSugar: 'બ્લડ શુગર',
    bmi: 'BMI ઇન્ડેક્સ',
    overallRiskLevel: 'કુલ જોખમ સ્તર',
    lifestyleRecommendations: 'જીવનશૈલી અને તબીબી સૂચનો',
    recentLabReports: 'તાજેતરના લેબ રિપોર્ટ્સ',
    activeMedications: 'ચાલુ દવાઓ',
    addVital: 'વાઇટલ ઉમેરો',
    addMedication: 'દવા ઉમેરો',
    all: 'બધા દર્દીઓ',
    addPatient: 'નવો દર્દી ઉમેરો',
    lowRisk: 'ઓછું જોખમ',
    moderateRisk: 'મધ્યમ જોખમ',
    highRisk: 'ઉચ્ચ જોખમ',
    selectLanguage: 'ભાષા પસંદ કરો',
    dailyHealthTip: 'દૈનિક સ્વાસ્થ્ય ટીપ',
    personalizedGuidance: 'વ્યક્તિગત આરોગ્ય માર્ગદર્શન',
    gotIt: 'સમજાઈ ગયું',
    newTip: 'નવી ટીપ',
    reportNameTable: 'રિપોર્ટનું નામ',
    dateTable: 'તારીખ',
    typeTable: 'પ્રકાર',
    statusTable: 'સ્થિતિ',
    physicianTable: 'તબીબ',
    actionTable: 'ક્રિયા',
    viewBtn: 'જુઓ',
    noReportsFound: 'કોઈ મેળ ખાતા ક્લિનિકલ રિપોર્ટ્સ મળ્યા નથી.',
    cdssTagline: 'AI ક્લિનિકલ નિર્ણય સપોર્ટ સિસ્ટમ (CDSS)',
    heroTitlePrefix: 'સુશ્રુત',
    heroTitleSub: 'પ્રારંભિક જોખમ આગાહી અને ક્લિનિકલ રેફરલ',
    heroDesc: 'આરોગ્ય કાર્યકરો, સમુદાય આરોગ્ય કેન્દ્રો અને દર્દીઓ માટે જીવનશૈલી રોગોનું વહેલું નિદાન કરવા અને OPD નિષ્ણાત રેફરલ્સ સુવ્યવસ્થિત કરવા માટે AI-સંચાલિત પ્લેટફોર્મ.',
    launchWorkerCmd: 'વર્કર કમાન્ડ સેન્ટર શરૂ કરો',
    accessPatientPortal: 'પેશન્ટ પોર્ટલ ખોલો',
    nabhCompliant: 'NABH ધોરણો મુજબ',
    hipaaEncrypted: 'HIPAA એન્ક્રિપ્ટેડ દર્દી રેકોર્ડ્સ',
    liveAssessmentTitle: 'લાઈવ AI CDSS મૂલ્યાંકન',
    activeTriage: 'સક્રિય ટ્રાયજ',
    autoReferralTitle: 'સ્વચાલિત રેફરલ સૂચના',
    targetDiseaseHeader: 'મુખ્ય જીવનશૈલી રોગની આગાહીઓ',
    targetDiseaseSub: 'સુશ્રુત 5 મુખ્ય દીર્ઘકાલીન પરિસ્થિતિઓમાં જોખમની આગાહીને માનકીકૃત કરે છે.',
    clinicalModuleLabel: 'ક્લિનિકલ મોડ્યુલ',
    evaluatedMarkers: 'મૂલ્યાંકન કરેલ ક્લિનિકલ માર્કર્સ',
    builtForExcellence: 'ક્લિનિકલ ઉત્કૃષ્ટતા માટે નિર્મિત',
    coreFeaturesHeader: 'મુખ્ય મોડ્યુલ્સ અને સુવિધાઓ',
    patientProfileTable: 'દર્દી પ્રોફાઇલ',
    vitalsBmiTable: 'વાઇટલ્સ અને BMI',
    primaryRiskFlagTable: 'પ્રાથમિક જોખમ ફ્લેગ',
    riskScoreTable: 'જોખમ સ્કોર',
    actionsTable: 'ક્રિયાઓ',
    cdssReportBtn: 'CDSS રિપોર્ટ',
    inspectBtn: 'તપાસો',
    riskLabel: 'જોખમ',
    activeLabel: 'સક્રિય',
    doneLabel: 'પૂર્ણ',
    lastLabel: 'છેલ્લું',
    todayLabel: 'આજે',
    resultsLabel: 'પરિણામો',
    ocrScannerTitle: 'OCR લેબ રિપોર્ટ સ્કેનર',
    ocrScannerSub: 'ઇમેજ અથવા PDF રિપોર્ટ્સમાંથી ક્લિનિકલ પેરામીટર્સ મેળવો',
    dragDropReport: 'મેડિકલ રિપોર્ટ ડ્રેગ અને ડ્રોપ કરો (PNG, JPG, PDF)',
    supportsReportTypes: 'બ્લડ શુગર, લિપિડ પ્રોફાઇલ, કિડની રિપોર્ટ્સ સપોર્ટેડ',
    browseLocalFiles: 'સ્થાનિક ફાઇલો બ્રાઉઝ કરો',
    processingOcr: 'OCR અને વિઝન AI પ્રોસેસિંગ ચાલુ છે',
    ocrScanningDesc: 'દસ્તાવેજની લાઈનો સ્કેન કરી મૂલ્યો અને સંદર્ભ રેન્જ અલગ કરી રહ્યા છીએ...',
    extractedParamsTitle: 'મેળવેલ ક્લિનિકલ પેરામીટર્સ (એડિટ કરવા ક્લિક કરો)',
    parameterHeader: 'પેરામીટર',
    valueHeader: 'મૂલ્ય',
    unitHeader: 'એકમ',
    refRangeHeader: 'સંદર્ભ રેન્જ',
    statusHeader: 'સ્થિતિ',
    highFlag: 'ઉચ્ચ ફ્લેગ',
    normalFlag: 'સામાન્ય',
    scanAnotherFile: 'બીજી ફાઇલ સ્કેન કરો',
    saveToProfile: 'દર્દી પ્રોફાઇલમાં સાચવો',
    verifiedTag: 'ચકાસાયેલ',
    physicianLabel: 'તબીબ',
    statusLabel: 'સ્થિતિ',
    categoryLabel: 'રિપોર્ટ કેટેગરી',
    clinicalFindingsTitle: 'ક્લિનિકલ તારણો',
    biomarkerTitle: 'બાયોમાર્કર માપન',
    observedValueHeader: 'નિરીક્ષણ કરેલ મૂલ્ય',
    refIntervalHeader: 'સંદર્ભ અંતરાલ',
    doctorRecTitle: 'ડોક્ટરની ભલામણ',
    aiMedicalSummarizer: 'AI મેડિકલ સારાંશકર્તા',
    genPlainEnglishSummary: 'સરળ ભાષામાં સારાંશ બનાવો',
    analyzingBtn: 'વિશ્લેષણ ચાલુ છે...',
    downloadPdfReport: 'PDF રિપોર્ટ ડાઉનલોડ કરો',
    closeBtn: 'બંધ કરો',
    sushrutaPortalTitle: 'સુશ્રુત પોર્ટલ',
    cdssSignInSub: 'ક્લિનિકલ ડિસિસન સપોર્ટ સાઇન ઇન',
    healthWorkerTab: 'હેલ્થ વર્કર',
    patientTab: 'દર્દી',
    workerEmailLabel: 'વર્કર ઇમેઇલ / ID',
    patientHospitalIdLabel: 'દર્દી હોસ્પિટલ ID',
    passwordLabel: 'પાસવર્ડ',
    rememberCredentials: 'માહિતી યાદ રાખો',
    forgotPassword: 'પાસવર્ડ ભૂલી ગયા?',
    signInToWorkerPortal: 'વર્કર પોર્ટલમાં સાઇન ઇન કરો',
    signInToPatientPortal: 'દર્દી પોર્ટલમાં સાઇન ઇન કરો',
    authenticating: 'સમાધાન ચકાસી રહ્યા છીએ...',
    demoAuthNotice: 'ડેમો ઓથેન્ટિકેશન સક્રિય • બેકએન્ડ તૈયાર',
  },
  French: {
    appName: 'SUSHRUTA',
    tagline: 'Soins Cliniques & Diagnostic IA',
    home: 'Accueil',
    commandCenter: 'Centre de Contrôle',
    patients: 'Patients',
    ocrScanner: 'Scanner OCR',
    reports: 'Rapports',
    alerts: 'Alertes',
    dailyTip: 'Conseil du jour',
    signIn: 'Connexion',
    patient: 'Patient',
    worker: 'Soignant',
    vitalsHistory: 'Constantes vitales',
    medications: 'Médicaments',
    patientData: 'Dossier patient',
    searchReports: 'Rechercher des rapports...',
    uploadReport: 'Ajouter un rapport',
    symptomChecker: 'ÉVALUATEUR DE SYMPTÔMES',
    clearAll: 'Tout effacer',
    typeSymptomPlaceholder: 'Saisir un symptôme (ex. Fièvre)...',
    selected: 'Sélectionnés',
    quickSelect: 'SÉLECTION RAPIDE',
    checkSymptoms: 'Vérifier les symptômes',
    runAiAssessment: 'Évaluation par IA',
    aiTriageAssessment: 'Évaluation de triage IA',
    calculatedRiskScore: 'Score de risque',
    activeMedicalAlerts: 'Alertes médicales actives',
    conditionsScreened: 'Examens réalisés',
    pendingLabResults: 'Analyses en attente',
    runNewAssessment: 'Nouvelle évaluation',
    viewAlerts: 'Voir les alertes',
    screeningHistory: 'Historique d\'examens',
    pendingLabs: 'Analyses en cours',
    patientProfile: 'Profil du Patient',
    ayushmanId: 'ID Ayushman Bharat',
    ageGender: 'Âge & Genre',
    bloodGroup: 'Groupe Sanguin',
    heartRate: 'Rythme Cardiaque',
    bloodPressure: 'Pression Artérielle',
    oxygenSat: 'Saturation SpO2',
    temp: 'Température',
    bloodSugar: 'Glycémie',
    bmi: 'Indice IMC',
    overallRiskLevel: 'Niveau de Risque Global',
    lifestyleRecommendations: 'Recommandations Cliniques & Hygiène de Vie',
    recentLabReports: 'Rapports d\'Analyses Récents',
    activeMedications: 'Traitements en Cours',
    addVital: 'Saisir une constante',
    addMedication: 'Ajouter un traitement',
    all: 'Tous les Patients',
    addPatient: 'Nouveau Patient',
    lowRisk: 'Risque Faible',
    moderateRisk: 'Risque Modéré',
    highRisk: 'Risque Élevé',
    selectLanguage: 'Choisir la langue',
    dailyHealthTip: 'Conseil de Santé Quotidien',
    personalizedGuidance: 'Conseils de Bien-être Personnalisés',
    gotIt: 'Compris',
    newTip: 'Nouveau Conseil',
    reportNameTable: 'NOM DU RAPPORT',
    dateTable: 'DATE',
    typeTable: 'TYPE',
    statusTable: 'STATUT',
    physicianTable: 'MÉDECIN',
    actionTable: 'ACTION',
    viewBtn: 'Voir',
    noReportsFound: 'Aucun rapport clinique correspondant trouvé.',
    cdssTagline: 'Système d\'Aide à la Décision Clinique IA (CDSS)',
    heroTitlePrefix: 'SUSHRUTA',
    heroTitleSub: 'Prédiction Précoce des Risques & Orientation',
    heroDesc: 'Une plateforme d\'intelligence clinique propulsée par l\'IA pour détecter les risques de maladies chroniques et optimiser les consultations spécialisées.',
    launchWorkerCmd: 'Ouvrir le Centre de Commande',
    accessPatientPortal: 'Accéder au Portail Patient',
    nabhCompliant: 'Conforme aux Normes NABH',
    hipaaEncrypted: 'Dossiers Patients Chiffrés HIPAA',
    liveAssessmentTitle: 'Évaluation IA CDSS en Direct',
    activeTriage: 'TRIAGE ACTIF',
    autoReferralTitle: 'Directive de Référence Automatisée',
    targetDiseaseHeader: 'Prédiction des Maladies Chroniques',
    targetDiseaseSub: 'SUSHRUTA standardise l\'évaluation précoce des risques pour 5 pathologies chroniques majeures.',
    clinicalModuleLabel: 'Module Clinique',
    evaluatedMarkers: 'Marqueurs Cliniques Évalués',
    builtForExcellence: 'Conçu pour l\'Excellence Clinique',
    coreFeaturesHeader: 'Modules & Fonctionnalités Clés',
    patientProfileTable: 'Profil Patient',
    vitalsBmiTable: 'Signes Vitaux & IMC',
    primaryRiskFlagTable: 'Indicateur de Risque',
    riskScoreTable: 'Score de Risque',
    actionsTable: 'Actions',
    cdssReportBtn: 'Rapport CDSS',
    inspectBtn: 'Inspecter',
    riskLabel: 'RISQUE',
    activeLabel: 'Actif(s)',
    doneLabel: 'Terminé',
    lastLabel: 'Dernier',
    todayLabel: 'Aujourd\'hui',
    resultsLabel: 'Résultats',
    ocrScannerTitle: 'SCANNER DE RAPPORT OCR',
    ocrScannerSub: 'Extraire les paramètres cliniques d\'images ou PDF',
    dragDropReport: 'Glisser-déposer le rapport médical (PNG, JPG, PDF)',
    supportsReportTypes: 'Gère bilans glycémiques, profils lipidiques, rapports rénaux',
    browseLocalFiles: 'Parcourir les fichiers locaux',
    processingOcr: 'Traitement de l\'extraction OCR & Vision IA',
    ocrScanningDesc: 'Analyse des lignes, isolation des valeurs, unités et intervalles de référence...',
    extractedParamsTitle: 'Paramètres cliniques extraits (cliquez pour modifier)',
    parameterHeader: 'Paramètre',
    valueHeader: 'Valeur',
    unitHeader: 'Unité',
    refRangeHeader: 'Intervalle réf.',
    statusHeader: 'Statut',
    highFlag: 'ANORMAL HAUT',
    normalFlag: 'NORMAL',
    scanAnotherFile: 'Scanner un autre fichier',
    saveToProfile: 'Enregistrer dans le dossier patient',
    verifiedTag: 'Vérifié',
    physicianLabel: 'Médecin',
    statusLabel: 'Statut',
    categoryLabel: 'Catégorie du rapport',
    clinicalFindingsTitle: 'Observations cliniques',
    biomarkerTitle: 'Mesures de biomarqueurs',
    observedValueHeader: 'Valeur observée',
    refIntervalHeader: 'Intervalle de référence',
    doctorRecTitle: 'Recommandation du médecin',
    aiMedicalSummarizer: 'Générateur de résumé médical IA',
    genPlainEnglishSummary: 'Générer un résumé clair',
    analyzingBtn: 'Analyse en cours...',
    downloadPdfReport: 'Télécharger le rapport PDF',
    closeBtn: 'Fermer',
    sushrutaPortalTitle: 'PORTAIL SUSHRUTA',
    cdssSignInSub: 'Connexion Aide à la Décision Clinique',
    healthWorkerTab: 'Soignant',
    patientTab: 'Patient',
    workerEmailLabel: 'EMAIL / ID SOIGNANT',
    patientHospitalIdLabel: 'IDENTIFIANT PATIENT',
    passwordLabel: 'MOT DE PASSE',
    rememberCredentials: 'Mémoriser mes identifiants',
    forgotPassword: 'Mot de passe oublié ?',
    signInToWorkerPortal: 'SE CONNECTER AU PORTAIL SOIGNANT',
    signInToPatientPortal: 'SE CONNECTER AU PORTAIL PATIENT',
    authenticating: 'Authentification en cours...',
    demoAuthNotice: 'Authentification démo activée • Serveurs prêts',
  },
  Marathi: {
    appName: 'सुश्रुत',
    tagline: 'क्लिनिकल काळजी आणि AI निदान',
    home: 'मुख्य पृष्ठ',
    commandCenter: 'कमांड सेंटर',
    patients: 'रुग्ण',
    ocrScanner: 'OCR स्कॅनर',
    reports: 'अहवाल',
    alerts: 'अलर्ट्स',
    dailyTip: 'दैनिक टीप',
    signIn: 'साइन इन',
    patient: 'रुग्ण',
    worker: 'आरोग्यसेवक',
    vitalsHistory: 'व्हाइटल्स इतिहास',
    medications: 'औषधे',
    patientData: 'रुग्णाची माहिती',
    searchReports: 'अहवाल शोधा...',
    uploadReport: 'अहवाल अपलोड करा',
    symptomChecker: 'लक्षण तपासक',
    clearAll: 'सर्व हटवा',
    typeSymptomPlaceholder: 'लक्षण लिहा (उदा. ताप)...',
    selected: 'निवडलेले',
    quickSelect: 'जलद निवड',
    checkSymptoms: 'लक्षणे तपासा',
    runAiAssessment: 'AI मूल्यमापन करा',
    aiTriageAssessment: 'AI ट्रायज मूल्यमापन',
    calculatedRiskScore: 'धोका स्कोअर',
    activeMedicalAlerts: 'सक्रिय वैद्यकीय इशारे',
    conditionsScreened: 'तपासलेल्या स्थिती',
    pendingLabResults: 'प्रलंबित प्रयोगशाळा निकाल',
    runNewAssessment: 'नवीन मूल्यमापन करा',
    viewAlerts: 'अलर्ट पहा',
    screeningHistory: 'स्क्रीनिंग इतिहास',
    pendingLabs: 'प्रलंबित प्रयोगशाळा',
    patientProfile: 'रुग्ण प्रोफाईल',
    ayushmanId: 'आयुष्मान भारत आयडी',
    ageGender: 'वय आणि लिंग',
    bloodGroup: 'रक्तगट',
    heartRate: 'हृदयाचे ठोके',
    bloodPressure: 'रक्तदाब',
    oxygenSat: 'ऑक्सिजन पातळी',
    temp: 'शरीराचे तापमान',
    bloodSugar: 'रक्त शर्करा',
    bmi: 'बीएमआय इंडेक्स',
    overallRiskLevel: 'एकूण धोका पातळी',
    lifestyleRecommendations: 'जीवनशैली आणि वैद्यकीय शिफारसी',
    recentLabReports: 'अलीकडील प्रयोगशाळा अहवाल',
    activeMedications: 'चालू औषधे',
    addVital: 'व्हाइटल्स जोडा',
    addMedication: 'औषध जोडा',
    all: 'सर्व रुग्ण',
    addPatient: 'नवीन रुग्ण जोडा',
    lowRisk: 'कमी धोका',
    moderateRisk: 'मध्यम धोका',
    highRisk: 'उच्च धोका',
    selectLanguage: 'भाषा निवडा',
    dailyHealthTip: 'दैनिक आरोग्य टीप',
    personalizedGuidance: 'वैयक्तिक आरोग्य मार्गदर्शन',
    gotIt: 'समजले',
    newTip: 'नवीन टीप',
    reportNameTable: 'अहवालाचे नाव',
    dateTable: 'तारीख',
    typeTable: 'प्रकार',
    statusTable: 'स्थिती',
    physicianTable: 'डॉक्टर',
    actionTable: 'कृती',
    viewBtn: 'पहा',
    noReportsFound: 'कोणताही जुळणारा अहवाल आढळला नाही.',
    cdssTagline: 'एआय वैद्यकीय निर्णय सहाय्य प्रणाली (CDSS)',
    heroTitlePrefix: 'सुश्रुत',
    heroTitleSub: 'प्रारंभिक धोका अंदाज आणि वैद्यकीय संदर्भ',
    heroDesc: 'आरोग्य कर्मचारी, समुदाय आरोग्य केंद्रे आणि रुग्णांसाठी जीवनशैली आजारांच्या धोक्यांचा लवकर शोध घेण्यासाठी आणि ओपीडी तज्ञ संदर्भांना सुलभ करण्यासाठी एआय-संचालित प्लॅटफॉर्म.',
    launchWorkerCmd: 'कर्मचारी कमांड सेंटर सुरू करा',
    accessPatientPortal: 'रुग्ण पोर्टल उघडा',
    nabhCompliant: 'NABH मानकांशी सुसंगत',
    hipaaEncrypted: 'HIPAA एनक्रिप्टेड रुग्ण नोंदी',
    liveAssessmentTitle: 'थेट एआय सीडीएसएस मूल्यमापन',
    activeTriage: 'सक्रिय ट्रायज',
    autoReferralTitle: 'स्वयंचलित संदर्भ निर्देश',
    targetDiseaseHeader: 'मुख्य जीवनशैली आजार अंदाज',
    targetDiseaseSub: 'सुश्रुत ५ प्रमुख जुनाट आजारांमधील धोक्याचा अंदाज प्रमाणीकृत करतो.',
    clinicalModuleLabel: 'वैद्यकीय मॉड्युल',
    evaluatedMarkers: 'तपासलेले वैद्यकीय निर्देशक',
    builtForExcellence: 'वैद्यकीय उत्कृष्टतेसाठी निर्मित',
    coreFeaturesHeader: 'मुख्य मॉड्युल्स आणि वैशिष्ट्ये',
    patientProfileTable: 'रुग्ण प्रोफाईल',
    vitalsBmiTable: 'व्हाइटल्स आणि बीएमआय',
    primaryRiskFlagTable: 'प्राथमिक धोका फ्लॅग',
    riskScoreTable: 'धोका स्कोअर',
    actionsTable: 'कृती',
    cdssReportBtn: 'सीडीएसएस अहवाल',
    inspectBtn: 'पहा',
    riskLabel: 'धोका',
    activeLabel: 'सक्रिय',
    doneLabel: 'पूर्ण',
    lastLabel: 'शेवटचे',
    todayLabel: 'आज',
    resultsLabel: 'निकाल',
    ocrScannerTitle: 'ओसीआर लॅब रिपोर्ट स्कॅनर',
    ocrScannerSub: 'इमेज किंवा पीडीएफ रिपोर्टमधून वैद्यकीय निर्देशक काढा',
    dragDropReport: 'मेडिकल रिपोर्ट ड्रॅग आणि ड्रॉप करा (PNG, JPG, PDF)',
    supportsReportTypes: 'ब्लड शुगर, लिपिड प्रोफाइल, किडनी रिपोर्ट समर्थित',
    browseLocalFiles: 'स्थानिक फाइल्स ब्राउझ करा',
    processingOcr: 'ओसीआर आणि व्हिजन एआय प्रोसेसिंग चालू आहे',
    ocrScanningDesc: 'दस्तऐवज ओळी स्कॅन करून मूल्ये आणि संदर्भ मर्यादा वेगळ्या करत आहोत...',
    extractedParamsTitle: 'काढलेले वैद्यकीय निर्देशक (संपादित करण्यासाठी क्लिक करा)',
    parameterHeader: 'पैरामीटर',
    valueHeader: 'मूल्य',
    unitHeader: 'एकक',
    refRangeHeader: 'संदर्भ मर्यादा',
    statusHeader: 'स्थिती',
    highFlag: 'उच्च धोका',
    normalFlag: 'सामान्य',
    scanAnotherFile: 'दुसरी फाइल स्कॅन करा',
    saveToProfile: 'रुग्ण प्रोफाईलमध्ये जतन करा',
    verifiedTag: 'सत्यापित',
    physicianLabel: 'डॉक्टर',
    statusLabel: 'स्थिती',
    categoryLabel: 'अहवाल वर्गवारी',
    clinicalFindingsTitle: 'वैद्यकीय निष्कर्ष',
    biomarkerTitle: 'बायोमार्कर मोजमाप',
    observedValueHeader: 'आढळलेले मूल्य',
    refIntervalHeader: 'संदर्भ अंतर',
    doctorRecTitle: 'डॉक्टरांचा सल्ला',
    aiMedicalSummarizer: 'एआय मेडिकल सारांश',
    genPlainEnglishSummary: 'सोप्या भाषेत सारांश तयार करा',
    analyzingBtn: 'विश्लेषण चालू आहे...',
    downloadPdfReport: 'पीडीएफ अहवाल डाउनलोड करा',
    closeBtn: 'बंद करा',
    sushrutaPortalTitle: 'सुश्रुत पोर्टल',
    cdssSignInSub: 'वैद्यकीय निर्णय सहाय्य साइन इन',
    healthWorkerTab: 'आरोग्यसेवक',
    patientTab: 'रुग्ण',
    workerEmailLabel: 'कर्मचारी ईमेल / आयडी',
    patientHospitalIdLabel: 'रुग्ण रुग्णालय आयडी',
    passwordLabel: 'पासवर्ड',
    rememberCredentials: 'माहिती लक्षात ठेवा',
    forgotPassword: 'पासवर्ड विसरलात?',
    signInToWorkerPortal: 'कर्मचारी पोर्टलवर साइन इन करा',
    signInToPatientPortal: 'रुग्ण पोर्टलवर साइन इन करा',
    authenticating: 'प्रमाणीकरण होत आहे...',
    demoAuthNotice: 'डेमो प्रमाणीकरण सक्षम • बॅकएंड तयार',
  },
};
