export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole; // 'worker' | 'patient'
  facility?: string;
  specialization?: string;
  phone?: string;
  registeredDate?: string;
  age?: number;
  gender?: string;
  bloodGroup?: string;
  bmi?: number;
  emergencyContactPhone?: string;
  medicalHistory?: string[];
  allergies?: string[];
  doctorRegistrationNo?: string;
  avatarUrl?: string;
}

export type UserRole = 'patient' | 'worker';

export type ReportType = 'Lab' | 'Imaging' | 'Cardiac' | 'Genomic' | 'Pathology' | 'Blood Test' | 'Renal Function';

export type ReportStatus = 'Normal' | 'Clear' | 'Review' | 'Pending' | 'Abnormal';

export interface MedicalReport {
  id: string;
  name: string;
  code: string;
  date: string;
  type: ReportType;
  status: ReportStatus;
  physician: string;
  iconType: 'blood' | 'lungs' | 'heart' | 'tube' | 'brain';
  summary?: string;
  findings?: string;
  keyMetrics?: { name: string; value: string; unit?: string; reference?: string; status: 'normal' | 'borderline' | 'high' | 'attention' | 'warning' }[];
  metrics?: { label: string; value: string; refRange: string; status: 'normal' | 'attention' | 'warning' }[];
  doctorNotes?: string;
  downloadUrl?: string;
  fileUrl?: string;
}

export interface VitalRecord {
  date: string;
  time: string;
  heartRate: number; // bpm
  sysBP: number;     // mmHg
  diaBP: number;     // mmHg
  spO2: number;      // %
  temperature: number; // °F
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timeOfDay: string[];
  prescribedBy: string;
  remainingPills: number;
  totalPills: number;
  refillDueDate: string;
  status: 'Active' | 'Completed' | 'Paused';
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone?: string;
  bloodGroup: string;
  idNumber?: string;
  bmi?: number;
  address?: string;
  registeredDate?: string;
  medicalHistory?: string[];
  allergies: string[];
  currentMedications?: string[];
  riskScore?: number;
  primaryRiskCategory?: string;
  emergencyContact?: {
    name: string;
    relation: string;
    phone: string;
  };
  primaryDoctor?: string;
}

export interface AssessmentResult {
  riskScore: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  summary: string;
  recommendations: string[];
  recommendedSpecialist: string;
  urgency: 'Routine' | 'Prompt Care' | 'Immediate Attention' | 'Priority';
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  image?: string;
  symptomsAnalyzed?: string[];
}

export interface DailyTip {
  title: string;
  tip: string;
  category: string;
}
