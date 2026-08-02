// Patient Service for SUSHRUTA with Offline Local Storage Persistence
import { PatientProfile } from '../types';

const STORAGE_KEY_PATIENTS = 'sushruta_patients_directory';

const DEFAULT_PATIENTS: PatientProfile[] = [
  {
    id: 'P-10482',
    name: 'Rajesh Kumar',
    age: 52,
    gender: 'Male',
    phone: '+91 98765 43210',
    bloodGroup: 'B+',
    bmi: 27.4,
    address: 'Sector 14, Urban PHC Ward 3, New Delhi',
    medicalHistory: ['Hypertension (3 yrs)', 'Mild Dyslipidemia'],
    allergies: ['Penicillin', 'Sulfa drugs'],
    currentMedications: ['Amlodipine 5mg QD', 'Atorvastatin 10mg HS'],
    riskScore: 68,
    primaryRiskCategory: 'Hypertension & CVD',
  },
  {
    id: 'P-10483',
    name: 'Sunita Devi',
    age: 46,
    gender: 'Female',
    phone: '+91 98123 76543',
    bloodGroup: 'O+',
    bmi: 29.1,
    address: 'Ganga Vihar, Rural Health Sub-center',
    medicalHistory: ['Type 2 Diabetes (5 yrs)'],
    allergies: ['None'],
    currentMedications: ['Metformin 500mg BID'],
    riskScore: 74,
    primaryRiskCategory: 'Diabetes & CKD',
  },
  {
    id: 'P-10484',
    name: 'Anil Mehta',
    age: 61,
    gender: 'Male',
    phone: '+91 97654 32109',
    bloodGroup: 'A+',
    bmi: 24.8,
    address: 'Bapuji Nagar, Block B',
    medicalHistory: ['Coronary Artery Disease (Stent 2022)'],
    allergies: ['Aspirin (Mild Gastritis)'],
    currentMedications: ['Clopidogrel 75mg', 'Metoprolol 25mg'],
    riskScore: 82,
    primaryRiskCategory: 'Cardiovascular & Stroke',
  },
];

export const patientService = {
  async getPatients(): Promise<PatientProfile[]> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PATIENTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse offline patient storage', e);
    }
    // Save initial default patients
    try {
      localStorage.setItem(STORAGE_KEY_PATIENTS, JSON.stringify(DEFAULT_PATIENTS));
    } catch (e) {
      console.warn('Failed to save default patients to localStorage', e);
    }
    return DEFAULT_PATIENTS;
  },

  async addPatient(patientData: Partial<PatientProfile>): Promise<PatientProfile> {
    const existing = await this.getPatients();
    const newPatient: PatientProfile = {
      id: `P-${Math.floor(10000 + Math.random() * 90000)}`,
      name: patientData.name || 'New Patient',
      age: Number(patientData.age) || 40,
      gender: patientData.gender || 'Male',
      phone: patientData.phone || '+91 90000 00000',
      bloodGroup: patientData.bloodGroup || 'O+',
      bmi: Number(patientData.bmi) || 24.0,
      address: patientData.address || 'Local Ward',
      medicalHistory: patientData.medicalHistory || ['Initial Registration'],
      allergies: patientData.allergies || ['None Reported'],
      currentMedications: patientData.currentMedications || [],
      riskScore: patientData.riskScore || 25,
      primaryRiskCategory: patientData.primaryRiskCategory || 'Low Risk',
      registeredDate: patientData.registeredDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };

    const updated = [newPatient, ...existing];
    try {
      localStorage.setItem(STORAGE_KEY_PATIENTS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to persist new patient to localStorage', e);
    }

    return newPatient;
  },

  async updatePatient(patient: PatientProfile): Promise<PatientProfile> {
    const existing = await this.getPatients();
    const updated = existing.map((p) => (p.id === patient.id ? patient : p));
    try {
      localStorage.setItem(STORAGE_KEY_PATIENTS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to update patient in localStorage', e);
    }
    return patient;
  },
};

