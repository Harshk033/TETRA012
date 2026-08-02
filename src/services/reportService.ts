// Placeholder Report Service for SUSHRUTA
import { MedicalReport } from '../types';

export const reportService = {
  async getReports(patientId?: string): Promise<MedicalReport[]> {
    await new Promise((res) => setTimeout(res, 300));
    return [
      {
        id: 'rep-001',
        name: 'HbA1c & Fasting Glucose Panel',
        code: 'LAB-GLU-8021',
        date: '2026-07-28',
        type: 'Blood Test',
        status: 'Review',
        physician: 'Dr. Aditi Sharma',
        summary: 'Fasting Plasma Glucose: 142 mg/dL (Elevated). HbA1c: 7.8% (Indicates Suboptimal Glycemic Control). Patient requires dietary counseling and medication review.',
        keyMetrics: [
          { name: 'HbA1c', value: '7.8', unit: '%', reference: '4.0 - 5.6', status: 'high' },
          { name: 'Fasting Glucose', value: '142', unit: 'mg/dL', reference: '70 - 99', status: 'high' },
          { name: 'Post-Prandial Glucose', value: '210', unit: 'mg/dL', reference: '< 140', status: 'high' },
        ],
        downloadUrl: '#',
        iconType: 'blood',
      },
      {
        id: 'rep-002',
        name: 'Lipid Profile & Cardio Risk',
        code: 'LAB-LIP-4091',
        date: '2026-07-15',
        type: 'Blood Test',
        status: 'Normal',
        physician: 'Dr. Rajesh Patel',
        summary: 'Total Cholesterol: 185 mg/dL, HDL: 48 mg/dL, LDL: 110 mg/dL, Triglycerides: 135 mg/dL. Cardiovascular lipid profile within manageable target limits.',
        keyMetrics: [
          { name: 'Total Cholesterol', value: '185', unit: 'mg/dL', reference: '< 200', status: 'normal' },
          { name: 'HDL Cholesterol', value: '48', unit: 'mg/dL', reference: '> 40', status: 'normal' },
          { name: 'LDL Cholesterol', value: '110', unit: 'mg/dL', reference: '< 100', status: 'borderline' },
        ],
        downloadUrl: '#',
        iconType: 'heart',
      },
      {
        id: 'rep-003',
        name: 'Serum Creatinine & eGFR (CKD Screening)',
        code: 'LAB-REN-1102',
        date: '2026-06-30',
        type: 'Renal Function',
        status: 'Clear',
        physician: 'Dr. Meera Nambiar',
        summary: 'Serum Creatinine: 1.1 mg/dL. eGFR: 82 mL/min/1.73m2. Renal filtration capacity is stable with early preventive hydration advisory.',
        keyMetrics: [
          { name: 'Serum Creatinine', value: '1.1', unit: 'mg/dL', reference: '0.7 - 1.3', status: 'normal' },
          { name: 'eGFR', value: '82', unit: 'mL/min', reference: '> 90', status: 'borderline' },
          { name: 'Blood Urea Nitrogen', value: '16', unit: 'mg/dL', reference: '7 - 20', status: 'normal' },
        ],
        downloadUrl: '#',
        iconType: 'tube',
      },
    ];
  },
};
