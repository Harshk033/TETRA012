import React, { useState } from 'react';
import {
  HeartPulse,
  ShieldCheck,
  Brain,
  Activity,
  Microscope,
  FileText,
  UserCheck,
  ChevronRight,
  Sparkles,
  Lock,
  ArrowRight,
  Stethoscope,
  Globe,
  Award,
  CheckCircle2,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/translations';
import { UserRole } from '../types';

interface LandingPageProps {
  language: LanguageCode;
  onNavigateToPortal: (role: UserRole) => void;
  onOpenLoginModal: (role: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  language,
  onNavigateToPortal,
  onOpenLoginModal,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['English'];
  const [activeDiseaseTab, setActiveDiseaseTab] = useState<'Diabetes' | 'Hypertension' | 'CKD' | 'CVD' | 'Stroke'>('Diabetes');

  const DISEASE_INFO_MAP: Record<LanguageCode, Record<string, { title: string; description: string; markers: string[] }>> = {
    English: {
      Diabetes: {
        title: 'Type-2 Diabetes Early Detection',
        description: 'Predicts microvascular and macrovascular diabetic risk using HbA1c, fasting plasma glucose, BMI, and family predispositions.',
        markers: ['HbA1c > 6.5%', 'Fasting Glucose > 126 mg/dL', 'BMI > 25.0', 'Polydipsia & Polyuria'],
      },
      Hypertension: {
        title: 'Essential Hypertension Risk Classifier',
        description: 'Monitors early stage stage-1 & stage-2 blood pressure trends, vascular stiffness indicators, and sodium balance factors.',
        markers: ['Systolic BP > 130 mmHg', 'Diastolic BP > 80 mmHg', 'Resting Pulse Variability', 'Sodium Sensitivity'],
      },
      CKD: {
        title: 'Chronic Kidney Disease (CKD) Screening',
        description: 'Evaluates early renal filtration decline through Serum Creatinine, eGFR velocity, and urine microalbumin ratios.',
        markers: ['eGFR < 60 mL/min', 'Serum Creatinine > 1.2 mg/dL', 'Urine Albumin/Creatinine Ratio', 'Long-term NSAID usage'],
      },
      CVD: {
        title: 'Cardiovascular Disease & Atherosclerosis Risk',
        description: 'Calculates 10-year Framingham & ASCVD risk scores using ApoB/HDL ratios, arterial stiffness, and physical exertion limits.',
        markers: ['LDL-C > 130 mg/dL', 'Triglycerides > 150 mg/dL', 'High-sensitivity CRP (hs-CRP)', 'Exertional Angina'],
      },
      Stroke: {
        title: 'Ischemic & Hemorrhagic Stroke Early Warning',
        description: 'Analyses transient ischemic attack (TIA) signals, carotid velocity flags, and chronic hypertensive stress markers.',
        markers: ['Fluctuating Systolic BP', 'Transient Numbness / Weakness', 'Carotid Bruit Flags', 'Atrial Fibrillation'],
      },
    },
    Hindi: {
      Diabetes: {
        title: 'टाइप-2 मधुमेह प्रारंभिक पहचान',
        description: 'HbA1c, फास्टिंग प्लाज्मा ग्लूकोज, बीएमआई और पारिवारिक इतिहास का उपयोग करके मधुमेह जोखिम की भविष्यवाणी करता है।',
        markers: ['HbA1c > 6.5%', 'फास्टिंग ग्लूकोज > 126 mg/dL', 'बीएमआई > 25.0', 'बार-बार प्यास और पेशाब'],
      },
      Hypertension: {
        title: 'उच्च रक्तचाप जोखिम वर्गीकरण',
        description: 'प्रारंभिक रक्तचाप के रुझान, संवहनी कठोरता संकेतकों और सोडियम संतुलन कारकों की निगरानी करता है।',
        markers: ['सिस्टोलिक बीपी > 130 mmHg', 'डायस्टोलिक बीपी > 80 mmHg', 'पल्स दर में उतार-चढ़ाव', 'सोडियम संवेदनशीलता'],
      },
      CKD: {
        title: 'क्रॉनिक किडनी डिजीज (CKD) स्क्रीनिंग',
        description: 'सीरम क्रिएटिनिन, eGFR और मूत्र माइक्रोएल्ब्यूमिन अनुपात के माध्यम से गुर्दे की कार्यक्षमता का मूल्यांकन करता है।',
        markers: ['eGFR < 60 mL/min', 'सीरम क्रिएटिनिन > 1.2 mg/dL', 'मूत्र एल्ब्यूमिन/क्रिएटिनिन अनुपात', 'लंबे समय से दर्दनिवारक दवा का उपयोग'],
      },
      CVD: {
        title: 'हृदय रोग एवं एथेरोस्क्लेरोसिस जोखिम',
        description: 'ApoB/HDL अनुपात, धमनी कठोरता और शारीरिक परिश्रम सीमाओं का उपयोग करके 10-वर्षीय हृदय जोखिम की गणना करता है।',
        markers: ['LDL-C > 130 mg/dL', 'ट्राइग्लिसराइड्स > 150 mg/dL', 'हाई-सेंसिटिविटी सीआरपी (hs-CRP)', 'छाती में खिंचाव व दर्द'],
      },
      Stroke: {
        title: 'स्ट्रोक (लकवा) प्रारंभिक चेतावनी',
        description: 'क्षणिक इस्केमिक हमले (टीआईए) संकेतों, कैरोटिड धमनी वेग और क्रॉनिक उच्च रक्तचाप तनाव मार्करों का विश्लेषण करता है।',
        markers: ['अस्थिर सिस्टोलिक बीपी', 'अस्थायी सुन्नता / कमजोरी', 'कैरोटिड धमनी ध्वनियां', 'एट्रियल फिब्रिलेशन'],
      },
    },
    Gujarati: {
      Diabetes: {
        title: 'ટાઇપ-2 ડાયાબિટીસ પ્રારંભિક નિદાન',
        description: 'HbA1c, ફાસ્ટિંગ ગ્લુકોઝ, BMI અને પારિવારિક ઈતિહાસનો ઉપયોગ કરીને ડાયાબિટીસના જોખમની આગાહી કરે છે.',
        markers: ['HbA1c > 6.5%', 'ફાસ્ટિંગ ગ્લુકોઝ > 126 mg/dL', 'BMI > 25.0', 'વધુ પડતી તરસ અને પેશાબ'],
      },
      Hypertension: {
        title: 'હાઈ બ્લડ પ્રેશર જોખમ વર્ગીકરણ',
        description: 'બ્લડ પ્રેશરના વલણો, રક્તવાહિનીઓની સ્થિતિસ્થાપકતા અને સોડિયમ સંતુલન પરિબળોનું નિરીક્ષણ કરે છે.',
        markers: ['સિસ્ટોલિક BP > 130 mmHg', 'ડાયાસ્ટોલિક BP > 80 mmHg', 'પલ્સ દરની પરિવર્તનશીલતા', 'સોડિયમ સંવેદનશીલતા'],
      },
      CKD: {
        title: 'ક્રોનિક કિડની ડિસીઝ (CKD) સ્ક્રીનીંગ',
        description: 'સીરમ ક્રિએટિનાઇન, eGFR અને પેશાબ માઇક્રોઆલ્બ્યુમિન રેશિયો દ્વારા કિડની કાર્યક્ષમતાનું મૂલ્યાંકન કરે છે.',
        markers: ['eGFR < 60 mL/min', 'સીરમ ક્રિએટિનાઇન > 1.2 mg/dL', 'યુરીન આલ્બ્યુમિન/ક્રિએટિનાઇન ગુણોત્તર', 'દવાઓનો લાંબા ગાળાનો ઉપયોગ'],
      },
      CVD: {
        title: 'હૃદય રોગ અને એથરોસ્ક્લેરોસિસ જોખમ',
        description: 'ApoB/HDL ગુણોત્તર અને ધમની શિથિલતાના આધારે 10-વર્ષના હૃદય રોગના જોખમ સ્કોરની ગણતરી કરે છે.',
        markers: ['LDL-C > 130 mg/dL', 'ટ્રાઇગ્લિસરાઇડ્સ > 150 mg/dL', 'હાઇ-સેન્સિટિવિટી CRP', 'છાતીમાં અસ્વસ્થતા'],
      },
      Stroke: {
        title: 'સ્ટ્રોક લકવા પ્રારંભિક ચેતવણી',
        description: 'અસ્થાયી ઇસ્કેમિક એટેક (TIA) સંકેતો અને ક્રોનિક બ્લડ પ્રેશર તાણ માર્કર્સનું વિશ્લેષણ કરે છે.',
        markers: ['અસ્થિર સિસ્ટોલિક BP', 'અસ્થાયી બહેરાશ / નબળાઈ', 'કેરોટિડ ધમની ચિહ્નો', 'એટ્રિયલ ફિબ્રિલેશન'],
      },
    },
    French: {
      Diabetes: {
        title: 'Détection Précoce du Diabète de Type 2',
        description: 'Prédit le risque diabétique microvasculaire et macrovasculaire à l\'aide de l\'HbA1c, glycémie à jeun, IMC et antécédents.',
        markers: ['HbA1c > 6.5%', 'Glycémie à jeun > 126 mg/dL', 'IMC > 25.0', 'Polydipsie & Polyurie'],
      },
      Hypertension: {
        title: 'Classificateur de Risque d\'Hypertension',
        description: 'Surveille la tension artérielle, la rigidité vasculaire et les facteurs d\'équilibre en sodium.',
        markers: ['TA Systolique > 130 mmHg', 'TA Diastolique > 80 mmHg', 'Variabilité du pouls', 'Sensibilité au sodium'],
      },
      CKD: {
        title: 'Dépistage de la Maladie Rénale Chronique',
        description: 'Évalue le déclin de la filtration rénale via la créatinine sérique, l\'eGFR et le rapport microalbumine urinaire.',
        markers: ['eGFR < 60 mL/min', 'Créatinine sérique > 1.2 mg/dL', 'Rapport Albumine/Créatinine', 'Prise prolongée d\'AINS'],
      },
      CVD: {
        title: 'Risque Cardiovasculaire & Athérosclérose',
        description: 'Calcule les scores de risque à 10 ans selon le rapport ApoB/HDL et la rigidité artérielle.',
        markers: ['LDL-C > 130 mg/dL', 'Triglycérides > 150 mg/dL', 'CRP ultra-sensible (hs-CRP)', 'Angor d\'effort'],
      },
      Stroke: {
        title: 'Alerte Précoce de l\'Accident Vasculaire Cérébral',
        description: 'Analyse les signaux d\'accident ischémique transitoire (AIT) et les marqueurs de stress hypertensif.',
        markers: ['TA Systolique fluctuante', 'Engourdissement / Faiblesse', 'Bruits carotidiens', 'Fibrillation auriculaire'],
      },
    },
    Marathi: {
      Diabetes: {
        title: 'टाइप-२ मधुमेह लवकर ओळख',
        description: 'HbA1c, उपाशी पोटी रक्तातील साखरेचे प्रमाण, BMI आणि कौटुंबिक इतिहासाचा वापर करून मधुमेहाच्या धोक्याचा अंदाज लावते.',
        markers: ['HbA1c > 6.5%', 'उपाशी पोटी साखरेचे प्रमाण > 126 mg/dL', 'BMI > 25.0', 'वारंवार तहान आणि लघवी'],
      },
      Hypertension: {
        title: 'उच्च रक्तदाब धोका वर्गीकरण',
        description: 'रक्तदाबाचा कल, रक्तवाहिन्यांचा कडकपणा आणि सोडीयम संतुलनाचा अभ्यास करते.',
        markers: ['सिस्टोलिक बीपी > 130 mmHg', 'डायस्टोलिक बीपी > 80 mmHg', 'नाडीच्या ठोक्यांमधील फरक', 'सोडियम संवेदनशीलत'],
      },
      CKD: {
        title: 'क्रॉनिक किडनी डिसीज (CKD) तपासणी',
        description: 'सीरम क्रिएटनाइन, eGFR आणि लघवीतील मायक्रोअल्ब्युमिन प्रमाणावरून मूत्रपिंडाच्या कार्यक्षमतेचे मूल्यमापन करते.',
        markers: ['eGFR < 60 mL/min', 'सीरम क्रिएटनाइन > 1.2 mg/dL', 'लघवीतील अल्ब्युमिन/क्रिएटनाइन प्रमाण', 'दीर्घकाळ वेदनाशामक औषधांचा वापर'],
      },
      CVD: {
        title: 'हृदयविकार आणि अथेरोस्क्लेरोसिस धोका',
        description: 'ApoB/HDL प्रमाण आणि धमन्यांच्या कडकपणावरून १० वर्षांच्या हृदयविकाराच्या धोक्याची गणना करते.',
        markers: ['LDL-C > 130 mg/dL', 'ट्रायग्लिसराइड्स > 150 mg/dL', 'हाय-सेंसिटिव्हिटी CRP', 'छातीत त्रास व वेदना'],
      },
      Stroke: {
        title: 'स्ट्रोक (पक्षाघात) पूर्वसूचना',
        description: 'क्षणिक इस्केमिक अटॅक (TIA) चे संकेत आणि उच्च रक्तदाबाच्या लक्षणांचे विश्लेषण करते.',
        markers: ['अस्थिर सिस्टोलिक बीपी', 'क्षणिक सुन्नपणा / कमकुवतपणा', 'कॅरोटिड धमनी ध्वनी', 'एट्रिअल फिब्रिलेशन'],
      },
    },
  };

  const currentDiseaseInfo = (DISEASE_INFO_MAP[language] || DISEASE_INFO_MAP['English'])[activeDiseaseTab];

  const CORE_FEATURES_MAP: Record<LanguageCode, Array<{ title: string; desc: string }>> = {
    English: [
      { title: 'Multi-Disease Risk Classifier', desc: 'Processes demographics, symptoms, vitals, and family history to calculate quantitative risk percentages for top 5 non-communicable diseases.' },
      { title: 'OCR Lab Report Extractor', desc: 'Upload scanned lab reports or mobile photos. Extract parameters like HbA1c, Creatinine, and Lipid numbers into editable structured data.' },
      { title: 'Automated Clinical Summary', desc: 'Generates structured doctor-ready referral reports detailing contributing factors, missing investigations, and lifestyle advice.' },
      { title: '5-Language Multilingual Triage', desc: 'Full translation support for English, Hindi, Gujarati, French, and Marathi to empower primary health workers in diverse regions.' },
      { title: 'OPD Specialist Referral', desc: 'Connects high-risk patients with district hospital specialty OPD scheduling (Endocrinology, Cardiology, Nephrology).' },
      { title: 'Backend-Ready Architecture', desc: 'Built with modular service placeholders ready to plug into Node.js, Python FastAPI AI models, SQLite/PostgreSQL, and Google Cloud endpoints.' },
    ],
    Hindi: [
      { title: 'बहु-रोग जोखिम वर्गीकरण', desc: 'शीर्ष 5 गैर-संचारी रोगों के लिए मात्रात्मक जोखिम प्रतिशत की गणना करने हेतु जनसांख्यिकी, लक्षण, वाइटल्स और पारिवारिक इतिहास का विश्लेषण करता है।' },
      { title: 'ओसीआर लैब रिपोर्ट एक्सट्रैक्टर', desc: 'स्कैन की गई लैब रिपोर्ट या फोटो अपलोड करें। HbA1c, क्रिएटिनिन और लिपिड मानों को संपादन योग्य डेटा में बदलें।' },
      { title: 'स्वचालित नैदानिक सारांश', desc: 'योगदान देने वाले कारकों, गायब जांचों और जीवनशैली सलाह का विवरण देने वाली डॉक्टर-तैयार संदर्भ रिपोर्ट बनाता है।' },
      { title: '5-भाषा बहुभाषी ट्राइएज', desc: 'विभिन्न क्षेत्रों में प्राथमिक स्वास्थ्य कार्यकर्ताओं को सशक्त बनाने के लिए अंग्रेजी, हिंदी, गुजराती, फ्रेंच और मराठी में पूर्ण अनुवाद समर्थन।' },
      { title: 'ओपीडी विशेषज्ञ रिफ़रल', desc: 'उच्च जोखिम वाले मरीजों को जिला अस्पताल की विशेषज्ञ ओपीडी सेवाओं (एंडोक्रिनोलॉजी, कार्डियोलॉजी, नेफ्रोलॉजी) से जोड़ता है।' },
      { title: 'बैकएंड-तैयार वास्तुकला', desc: 'Node.js, पायथन FastAPI AI मॉडल, SQLite/PostgreSQL, और गूगल क्लाउड एंडपॉइंट्स से जुड़ने के लिए तैयार मॉड्युलर सेवाएं।' },
    ],
    Gujarati: [
      { title: 'બહુ-રોગ જોખમ વર્ગીકરણ', desc: 'મુખ્ય 5 દીર્ઘકાલીન રોગો માટે જોખમ ટકાવારી ગણવા માટે દર્દીના વિગતો, લક્ષણો, વાઇટલ્સ અને કૌટુંબિક ઇતિહાસની પ્રક્રિયા કરે છે.' },
      { title: 'OCR લેબ રિપોર્ટ એક્સટ્રેક્ટર', desc: 'સ્કેન કરેલા લેબ રિપોર્ટ્સ અથવા ફોટા અપલોડ કરો. HbA1c, ક્રિએટિનાઇન અને લિપિડ નંબરોને એડિટ કરી શકાય તેવા ડેટામાં મેળવો.' },
      { title: 'સ્વચાલિત ક્લિનિકલ સારાંશ', desc: 'મુખ્ય પરિબળો, ખૂટતી તપાસો અને જીવનશૈલી સલાહની વિગતો આપતો ડોક્ટર-રેડી રેફરલ રિપોર્ટ જનરેટ કરે છે.' },
      { title: '5-ભાષા મલ્ટિલિંગ્યુઅલ ટ્રાયજ', desc: 'વિવિધ પ્રદેશોમાં પ્રાથમિક આરોગ્ય કાર્યકરોને સક્ષમ કરવા માટે અંગ્રેજી, હિન્દી, ગુજરાતી, ફ્રેન્ચ અને મરાઠીમાં સંપૂર્ણ અનુવાદ.' },
      { title: 'OPD નિષ્ણાત રેફરલ', desc: 'ઉચ્ચ જોખમ ધરાવતા દર્દીઓને જિલ્લા હોસ્પિટલની વિશેષ OPD સેવાઓ (એન્ડોક્રિનોલોજી, કાર્ડિયોલોજી, નેફ્રોલોજી) સાથે જોડે છે.' },
      { title: 'બેકએન્ડ-રેડી આર્કિટેક્ચર', desc: 'Node.js, Python FastAPI AI મોડલ્સ, SQLite/PostgreSQL અને Google Cloud સાથે પ્લગ કરવા માટે તૈયાર રચેલું મોડ્યુલર બેકએન્ડ.' },
    ],
    French: [
      { title: 'Classificateur de Risque Multi-Pathologies', desc: 'Traite la démographie, les symptômes et constantes pour calculer les pourcentages de risque des 5 principales maladies chroniques.' },
      { title: 'Extracteur OCR de Rapports', desc: 'Téléchargez des rapports numérisés ou des photos. Extrayez l\'HbA1c, la créatinine et le bilan lipidique en données structurées.' },
      { title: 'Résumé Clinique Automatisé', desc: 'Génère un rapport d\'orientation structuré prêt pour les médecins avec conseils de santé et examens manquants.' },
      { title: 'Triage Multilingue 5 Langues', desc: 'Traduction complète en anglais, hindi, gujarati, français et marathi pour soutenir les soignants dans toutes les régions.' },
      { title: 'Orientation Spécialisée OPD', desc: 'Oriente les patients à haut risque vers les consultations spécialisées (Endocrinologie, Cardiologie, Néphrologie).' },
      { title: 'Architecture Prête pour le Backend', desc: 'Conçu avec des modules prêts à être connectés à Node.js, Python FastAPI, PostgreSQL et Google Cloud.' },
    ],
    Marathi: [
      { title: 'बहु-आजार धोका वर्गीकरण', desc: '५ प्रमुख आजारांसाठी धोक्याच्या टक्केवारीची गणना करण्यासाठी लोकसंख्याशास्त्र, लक्षणे आणि कौटुंबिक इतिहासाचा वापर करते.' },
      { title: 'OCR प्रयोगशाळा अहवाल एक्सट्रॅक्टर', desc: 'स्कॅन केलेले अहवाल किंवा फोटो अपलोड करा. HbA1c, क्रिएटनाइन आणि लिपिडचे आकडे एडिट करता येणाऱ्या डेटामध्ये बदला.' },
      { title: 'स्वयंचलित वैद्यकीय सारांश', desc: 'वैद्यकीय संदर्भासाठी डॉक्टर-तयार अहवाल तयार करतो ज्यामध्ये जीवनशैली सल्ला आणि आवश्यक तपासण्यांची माहिती असते.' },
      { title: '५-भाषा बहुभाषिक ट्रायज', desc: 'विविध भागातील आरोग्यसेवकांना सक्षम करण्यासाठी इंग्रजी, हिंदी, गुजराती, फ्रेंच आणि मराठी भाषेत संपूर्ण भाषांतर.' },
      { title: 'OPD तज्ञ संदर्भ', desc: 'उच्च धोक्याच्या रुग्णांना जिल्हा रुग्णालयातील विशेष OPD सेवांशी (एंडोक्रिनोलॉजी, कार्डियोलॉजी, नेफ्रोलॉजी) जोडतो.' },
      { title: 'बॅकएंड-तयार रचना', desc: 'Node.js, पायथन FastAPI AI मॉडेल्स, SQLite/PostgreSQL आणि गूगल क्लाउडशी जोडण्यासाठी तयार मॉड्युलर सेवा.' },
    ],
  };

  const coreFeaturesList = CORE_FEATURES_MAP[language] || CORE_FEATURES_MAP['English'];

  return (
    <div className="w-full min-h-screen bg-[#F4EEFF] dark:bg-[#171233] text-[#1A1525] dark:text-[#F4EEFF] transition-colors duration-300">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Text */}
          <div className="lg:w-1/2 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6DDF2] dark:bg-[#241A4B] border border-[#CFC2FF] text-[#3F3375] dark:text-[#CFC2FF] text-xs font-bold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#A695F9]" />
              <span>{t.cdssTagline}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-[#1A1525] dark:text-white mb-6">
              {t.heroTitlePrefix} <br />
              <span className="text-[#A695F9] dark:text-[#CFC2FF]">
                {t.heroTitleSub}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#1A1525]/80 dark:text-[#E6DDF2] font-normal leading-relaxed mb-8 max-w-xl">
              {t.heroDesc}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                id="hero-worker-portal-btn"
                onClick={() => onNavigateToPortal('worker')}
                className="px-6 py-3.5 rounded-2xl bg-[#A695F9] hover:bg-[#8D79F7] active:bg-[#7861F5] text-white font-extrabold text-sm shadow-lg shadow-[#A695F9]/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 border border-[#CFC2FF]"
              >
                <Stethoscope className="w-5 h-5 text-white" />
                {t.launchWorkerCmd}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-patient-portal-btn"
                onClick={() => onNavigateToPortal('patient')}
                className="px-6 py-3.5 rounded-2xl bg-[#E6DDF2] dark:bg-[#241A4B] border border-[#CFC2FF] dark:border-[#3F3375] hover:bg-[#D8CBEC] dark:hover:bg-[#2F225E] text-[#1A1525] dark:text-white font-bold text-sm shadow-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <UserCheck className="w-5 h-5 text-[#A695F9]" />
                {t.accessPatientPortal}
              </button>
            </div>

            {/* Accreditation Badge */}
            <div className="mt-10 pt-6 border-t border-[#CFC2FF] dark:border-[#3F3375] flex items-center gap-6 text-xs text-[#1A1525]/70 dark:text-[#E6DDF2]/80 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t.nabhCompliant}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A695F9]" />
                <span>{t.hipaaEncrypted}</span>
              </div>
            </div>
          </div>

          {/* Right Hero Illustration / Visual Card */}
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-3xl bg-gradient-to-tr from-[#A695F9]/30 via-[#CFC2FF]/20 to-[#E6DDF2] p-1.5 shadow-xl border border-[#CFC2FF]">
              <div className="bg-[#E6DDF2] dark:bg-[#241A4B] rounded-[22px] p-6 sm:p-8 border border-[#CFC2FF] dark:border-[#3F3375]">
                {/* Visual Simulation Card */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#CFC2FF] dark:border-[#3F3375]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#A695F9] text-white flex items-center justify-center shadow-md">
                      <HeartPulse className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-extrabold text-sm text-[#1A1525] dark:text-white block">
                        {t.liveAssessmentTitle}
                      </span>
                      <span className="text-xs text-[#1A1525]/60 dark:text-[#CFC2FF] font-mono">
                        Model Version: SUSHRUTA-v2.4
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#A695F9]/20 text-[#1A1525] dark:text-[#F4EEFF] text-xs font-bold border border-[#A695F9]/40 animate-pulse">
                    {t.activeTriage}
                  </span>
                </div>

                {/* Simulated Risk Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-[#F4EEFF] dark:bg-[#171233] p-3.5 rounded-xl border border-[#CFC2FF] dark:border-[#3F3375]">
                    <span className="text-[10px] uppercase font-extrabold text-[#1A1525]/60 dark:text-[#CFC2FF] block">Type-2 Diabetes</span>
                    <span className="text-lg font-black text-amber-700 dark:text-amber-400">78% {t.highRisk}</span>
                    <span className="text-[10px] text-[#1A1525]/70 dark:text-[#E6DDF2] block mt-1">HbA1c 7.8% • Fasting 142</span>
                  </div>
                  <div className="bg-[#F4EEFF] dark:bg-[#171233] p-3.5 rounded-xl border border-[#CFC2FF] dark:border-[#3F3375]">
                    <span className="text-[10px] uppercase font-extrabold text-[#1A1525]/60 dark:text-[#CFC2FF] block">Hypertension</span>
                    <span className="text-lg font-black text-rose-700 dark:text-rose-400">64% {t.moderateRisk}</span>
                    <span className="text-[10px] text-[#1A1525]/70 dark:text-[#E6DDF2] block mt-1">BP 138/88 mmHg</span>
                  </div>
                  <div className="bg-[#F4EEFF] dark:bg-[#171233] p-3.5 rounded-xl border border-[#CFC2FF] dark:border-[#3F3375]">
                    <span className="text-[10px] uppercase font-extrabold text-[#1A1525]/60 dark:text-[#CFC2FF] block">Cardiovascular</span>
                    <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">22% {t.lowRisk}</span>
                    <span className="text-[10px] text-[#1A1525]/70 dark:text-[#E6DDF2] block mt-1">LDL 110 mg/dL</span>
                  </div>
                  <div className="bg-[#F4EEFF] dark:bg-[#171233] p-3.5 rounded-xl border border-[#CFC2FF] dark:border-[#3F3375]">
                    <span className="text-[10px] uppercase font-extrabold text-[#1A1525]/60 dark:text-[#CFC2FF] block">Chronic Kidney</span>
                    <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">18% Clear</span>
                    <span className="text-[10px] text-[#1A1525]/70 dark:text-[#E6DDF2] block mt-1">eGFR 82 mL/min</span>
                  </div>
                </div>

                {/* AI Recommendation Banner */}
                <div className="p-4 rounded-xl bg-[#F4EEFF] dark:bg-[#171233] border border-[#A695F9] flex items-start gap-3 shadow-sm">
                  <Brain className="w-5 h-5 text-[#A695F9] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#1A1525] dark:text-white block">
                      {t.autoReferralTitle}
                    </span>
                    <p className="text-xs text-[#1A1525]/80 dark:text-[#E6DDF2] mt-0.5">
                      Schedule Endocrinology OPD review within 7 days. Request Urine Microalbumin test.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISEASE PREDICTION MATRIX TABS */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#CFC2FF] dark:border-[#3F3375]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A1525] dark:text-white mb-3">
            {t.targetDiseaseHeader}
          </h2>
          <p className="text-sm text-[#1A1525]/80 dark:text-[#E6DDF2]">
            {t.targetDiseaseSub}
          </p>
        </div>

        {/* Disease Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {(['Diabetes', 'Hypertension', 'CKD', 'CVD', 'Stroke'] as const).map((key) => {
            const isSelected = activeDiseaseTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveDiseaseTab(key)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                  isSelected
                    ? 'bg-[#A695F9] text-white border-[#A695F9] shadow-md scale-105'
                    : 'bg-[#E6DDF2] dark:bg-[#241A4B] text-[#1A1525] dark:text-[#E6DDF2] border-[#CFC2FF] dark:border-[#3F3375] hover:bg-[#D8CBEC]'
                }`}
              >
                {key}
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="bg-[#E6DDF2] dark:bg-[#241A4B] rounded-2xl p-6 sm:p-8 border border-[#CFC2FF] dark:border-[#3F3375] shadow-md max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="md:w-3/5">
              <span className="text-xs font-extrabold text-[#A695F9] dark:text-[#CFC2FF] uppercase tracking-wider block mb-1">
                {t.clinicalModuleLabel}
              </span>
              <h3 className="text-xl font-bold text-[#1A1525] dark:text-white mb-3">
                {currentDiseaseInfo.title}
              </h3>
              <p className="text-sm text-[#1A1525]/80 dark:text-[#E6DDF2] leading-relaxed mb-6">
                {currentDiseaseInfo.description}
              </p>

              <button
                onClick={() => onNavigateToPortal('worker')}
                className="px-4 py-2.5 rounded-xl bg-[#A695F9] hover:bg-[#8D79F7] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm border border-[#CFC2FF]"
              >
                <span>Run {activeDiseaseTab} Assessment</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="md:w-2/5 w-full bg-[#F4EEFF] dark:bg-[#171233] p-5 rounded-xl border border-[#CFC2FF] dark:border-[#3F3375]">
              <span className="text-[10px] font-extrabold uppercase text-[#1A1525]/60 dark:text-[#CFC2FF] tracking-wider block mb-3">
                {t.evaluatedMarkers}
              </span>
              <div className="flex flex-col gap-2">
                {currentDiseaseInfo.markers.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#1A1525] dark:text-[#F4EEFF]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#CFC2FF] dark:border-[#3F3375]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-[#A695F9] dark:text-[#CFC2FF] uppercase tracking-widest block mb-2">
            {t.builtForExcellence}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A1525] dark:text-white">
            {t.coreFeaturesHeader}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeaturesList.map((feat, idx) => {
            const icons = [
              <Brain className="w-6 h-6 text-[#A695F9]" />,
              <FileText className="w-6 h-6 text-[#A695F9]" />,
              <ShieldCheck className="w-6 h-6 text-[#A695F9]" />,
              <Globe className="w-6 h-6 text-[#A695F9]" />,
              <Stethoscope className="w-6 h-6 text-[#A695F9]" />,
              <Zap className="w-6 h-6 text-[#A695F9]" />,
            ];

            return (
              <div key={idx} className="bg-[#E6DDF2] dark:bg-[#241A4B] p-6 rounded-2xl border border-[#CFC2FF] dark:border-[#3F3375] shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#F4EEFF] dark:bg-[#171233] border border-[#CFC2FF] dark:border-[#3F3375] flex items-center justify-center mb-4">
                  {icons[idx]}
                </div>
                <h3 className="text-lg font-bold text-[#1A1525] dark:text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#1A1525]/80 dark:text-[#E6DDF2] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#E6DDF2] dark:bg-[#171233] border-t border-[#CFC2FF] dark:border-[#3F3375] py-12 px-4 sm:px-8 text-xs text-[#1A1525]/70 dark:text-[#E6DDF2]/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#A695F9] text-white flex items-center justify-center font-black">
              S
            </div>
            <div>
              <span className="font-extrabold text-sm text-[#1A1525] dark:text-white block">
                {t.appName} Health AI
              </span>
              <span className="text-[10px] text-[#1A1525]/60 dark:text-[#CFC2FF]">
                © 2026 Clinical Decision Support System. NABH & HIPAA Compliant.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <button onClick={() => onOpenLoginModal('worker')} className="hover:text-[#A695F9]">
              {t.worker} {t.signIn}
            </button>
            <button onClick={() => onOpenLoginModal('patient')} className="hover:text-[#A695F9]">
              {t.patient} {t.signIn}
            </button>
            <button onClick={() => onNavigateToPortal('worker')} className="hover:text-[#A695F9]">
              {t.commandCenter}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
