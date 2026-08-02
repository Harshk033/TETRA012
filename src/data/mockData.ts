import { MedicalReport, VitalRecord, Medication, PatientProfile } from '../types';

export const INITIAL_REPORTS: MedicalReport[] = [
  {
    id: '1',
    name: 'Full Blood Count',
    code: 'RPT-001',
    date: 'Jul 28, 2026',
    type: 'Lab',
    status: 'Normal',
    physician: 'Dr. Aditi Sharma',
    iconType: 'blood',
    summary: 'All CBC parameters including RBC count, WBC count, and Platelets fall squarely within optimal reference ranges.',
    keyMetrics: [
      { name: 'Hemoglobin', value: '14.2 g/dL', reference: '13.5 - 17.5 g/dL', status: 'normal' },
      { name: 'White Blood Cells (WBC)', value: '6.8 x10^3 / µL', reference: '4.5 - 11.0 x10^3', status: 'normal' },
      { name: 'Platelets', value: '250 x10^3 / µL', reference: '150 - 450 x10^3', status: 'normal' },
      { name: 'Hematocrit', value: '42.5%', reference: '38.8 - 50.0%', status: 'normal' }
    ],
    doctorNotes: 'Patient exhibits strong immune markers. No sign of anemia or systemic inflammation.'
  },
  {
    id: '2',
    name: 'Chest X-Ray',
    code: 'RPT-002',
    date: 'Jul 15, 2026',
    type: 'Imaging',
    status: 'Clear',
    physician: 'Dr. James Osei',
    iconType: 'lungs',
    summary: 'PA and Lateral view chest radiographs demonstrate clear lung parenchyma without focal consolidation, pleural effusion, or pneumothorax.',
    keyMetrics: [
      { name: 'Lung Inflation', value: 'Complete & Symmetric', reference: 'Symmetric', status: 'normal' },
      { name: 'Cardiothoracic Ratio', value: '0.44', reference: '< 0.50', status: 'normal' },
      { name: 'Pleural Spaces', value: 'Clear', reference: 'Clear', status: 'normal' }
    ],
    doctorNotes: 'Normal thoracic baseline. No occupational or environmental pulmonary infiltrates.'
  },
  {
    id: '3',
    name: 'ECG Report',
    code: 'RPT-003',
    date: 'Jul 10, 2026',
    type: 'Cardiac',
    status: 'Normal',
    physician: 'Dr. Priya Nair',
    iconType: 'heart',
    summary: '12-lead ECG shows Normal Sinus Rhythm at 72 bpm. PR interval 156ms, QRS duration 88ms, QTc 412ms. No ST-segment elevation or T-wave inversion.',
    keyMetrics: [
      { name: 'Heart Rate', value: '72 bpm', reference: '60 - 100 bpm', status: 'normal' },
      { name: 'PR Interval', value: '156 ms', reference: '120 - 200 ms', status: 'normal' },
      { name: 'QRS Duration', value: '88 ms', reference: '80 - 120 ms', status: 'normal' }
    ],
    doctorNotes: 'Cardiac electrical activity is perfectly regular. Low risk for ischemic heart disease.'
  },
  {
    id: '4',
    name: 'Lipid Panel',
    code: 'RPT-004',
    date: 'Jun 30, 2026',
    type: 'Lab',
    status: 'Review',
    physician: 'Dr. Aditi Sharma',
    iconType: 'tube',
    summary: 'Borderline elevated total cholesterol and slightly elevated LDL levels. HDL and Triglycerides remain within target thresholds.',
    keyMetrics: [
      { name: 'Total Cholesterol', value: '215 mg/dL', reference: '< 200 mg/dL', status: 'attention' },
      { name: 'LDL Cholesterol', value: '138 mg/dL', reference: '< 100 mg/dL', status: 'attention' },
      { name: 'HDL Cholesterol', value: '54 mg/dL', reference: '> 40 mg/dL', status: 'normal' },
      { name: 'Triglycerides', value: '142 mg/dL', reference: '< 150 mg/dL', status: 'normal' }
    ],
    doctorNotes: 'Recommend dietary modification low in saturated fats and 30 mins moderate daily exercise. Re-test lipid panel in 60 days.'
  },
  {
    id: '5',
    name: 'MRI Brain Scan',
    code: 'RPT-005',
    date: 'Jun 18, 2026',
    type: 'Imaging',
    status: 'Clear',
    physician: 'Dr. Kwame Mensah',
    iconType: 'brain',
    summary: 'High-resolution T1, T2, and FLAIR axial brain MRI shows normal ventricular size, clear sulci, and no evidence of acute infarction or mass effect.',
    keyMetrics: [
      { name: 'Brain Volume', value: 'Preserved', reference: 'Normal for Age', status: 'normal' },
      { name: 'Vascular Structure', value: 'Intact', reference: 'No Aneurysm', status: 'normal' },
      { name: 'White Matter', value: 'Unremarkable', reference: 'Unremarkable', status: 'normal' }
    ],
    doctorNotes: 'Neuro-imaging completely rules out central structural causes for intermittent headaches.'
  }
];

export const INITIAL_VITALS: VitalRecord[] = [
  { date: 'Jul 26', time: '08:00 AM', heartRate: 68, sysBP: 118, diaBP: 78, spO2: 99, temperature: 98.4 },
  { date: 'Jul 27', time: '08:00 AM', heartRate: 72, sysBP: 120, diaBP: 80, spO2: 98, temperature: 98.6 },
  { date: 'Jul 28', time: '08:00 AM', heartRate: 70, sysBP: 119, diaBP: 79, spO2: 98, temperature: 98.5 },
  { date: 'Jul 29', time: '08:00 AM', heartRate: 74, sysBP: 122, diaBP: 81, spO2: 97, temperature: 98.7 },
  { date: 'Jul 30', time: '08:00 AM', heartRate: 71, sysBP: 121, diaBP: 80, spO2: 99, temperature: 98.6 },
  { date: 'Jul 31', time: '08:00 AM', heartRate: 69, sysBP: 118, diaBP: 77, spO2: 98, temperature: 98.4 },
  { date: 'Aug 01', time: '08:00 AM', heartRate: 72, sysBP: 120, diaBP: 80, spO2: 98, temperature: 98.6 },
];

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: 'm1',
    name: 'Atorvastatin',
    dosage: '10 mg',
    frequency: 'Once Daily',
    timeOfDay: ['09:00 PM'],
    prescribedBy: 'Dr. Aditi Sharma',
    remainingPills: 22,
    totalPills: 30,
    refillDueDate: 'Aug 22, 2026',
    status: 'Active'
  },
  {
    id: 'm2',
    name: 'Multivitamin Complex',
    dosage: '1 Tablet',
    frequency: 'Once Daily',
    timeOfDay: ['08:00 AM'],
    prescribedBy: 'Dr. Priya Nair',
    remainingPills: 14,
    totalPills: 60,
    refillDueDate: 'Aug 14, 2026',
    status: 'Active'
  },
  {
    id: 'm3',
    name: 'Omega-3 Fish Oil',
    dosage: '1000 mg',
    frequency: 'Twice Daily',
    timeOfDay: ['08:00 AM', '08:00 PM'],
    prescribedBy: 'Dr. Aditi Sharma',
    remainingPills: 40,
    totalPills: 90,
    refillDueDate: 'Sep 10, 2026',
    status: 'Active'
  }
];

export const PATIENT_PROFILE: PatientProfile = {
  id: 'P-10482',
  name: 'Aarav Sharma',
  age: 38,
  gender: 'Male',
  phone: '+91 98765 43210',
  bloodGroup: 'O Positive (O+)',
  idNumber: 'SH-2026-8839',
  bmi: 27.4,
  address: 'Sector 14, Urban PHC Ward 3, New Delhi',
  medicalHistory: ['Hypertension (3 yrs)', 'Mild Dyslipidemia'],
  allergies: ['Penicillin', 'Peanuts (Mild)'],
  currentMedications: ['Atorvastatin 10mg', 'Multivitamin'],
  riskScore: 68,
  primaryRiskCategory: 'Hypertension & CVD',
  emergencyContact: {
    name: 'Meera Sharma',
    relation: 'Spouse',
    phone: '+91 98765 00000'
  },
  primaryDoctor: 'Dr. Aditi Sharma (Chief Community Physician)'
};
