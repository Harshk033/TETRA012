// Placeholder AI Prediction Engine Service for SUSHRUTA
// Connects to Python FastAPI / TensorFlow / PyTorch Disease Classifier API

export interface DiseaseRiskPrediction {
  disease: 'Diabetes' | 'Hypertension' | 'Chronic Kidney Disease' | 'Cardiovascular Disease' | 'Stroke';
  riskScore: number; // 0-100
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  contributingFactors: string[];
  missingInvestigations: string[];
  referralRecommendation: string;
}

export const predictionService = {
  async predictDiseaseRisks(inputData: {
    symptoms: string[];
    vitals?: { sysBP?: number; diaBP?: number; glucose?: number; bmi?: number };
    demographics?: { age?: number; gender?: string };
  }): Promise<DiseaseRiskPrediction[]> {
    await new Promise((res) => setTimeout(res, 800));

    const sym = inputData.symptoms || [];
    const hasChestPain = sym.some((s) => /chest pain|shortness of breath|heart/i.test(s));
    const hasHighGlucose = (inputData.vitals?.glucose || 0) > 130 || sym.some((s) => /thirst|frequent urination/i.test(s));

    return [
      {
        disease: 'Diabetes',
        riskScore: hasHighGlucose ? 78 : 32,
        riskLevel: hasHighGlucose ? 'High' : 'Low',
        contributingFactors: ['Elevated Fasting Glucose', 'BMI > 27', 'Family History of T2D'],
        missingInvestigations: ['HbA1c Confirmation', 'Urine Microalbumin'],
        referralRecommendation: 'Refer to Endocrinology OPD within 7 days',
      },
      {
        disease: 'Hypertension',
        riskScore: 64,
        riskLevel: 'Moderate',
        contributingFactors: ['Systolic BP 138 mmHg', 'High Sodium Diet Intake'],
        missingInvestigations: ['24-hour Ambulatory BP Monitoring', 'Fundoscopy'],
        referralRecommendation: 'Primary Health Center Physician Consultation',
      },
      {
        disease: 'Cardiovascular Disease',
        riskScore: hasChestPain ? 85 : 42,
        riskLevel: hasChestPain ? 'Critical' : 'Moderate',
        contributingFactors: ['Atherosclerotic Risk Factor', 'Elevated LDL', 'Mild Angina Symptoms'],
        missingInvestigations: ['12-Lead ECG', 'Echocardiogram'],
        referralRecommendation: hasChestPain ? 'URGENT Referral to Cardiology Emergency' : 'Cardiology OPD Routine',
      },
      {
        disease: 'Chronic Kidney Disease',
        riskScore: 24,
        riskLevel: 'Low',
        contributingFactors: ['Borderline eGFR (82 mL/min)', 'Long-term NSAID usage'],
        missingInvestigations: ['Serum Electrolytes', 'Renal Ultrasound'],
        referralRecommendation: 'Routine Hydration Monitoring at Sub-center',
      },
      {
        disease: 'Stroke',
        riskScore: 38,
        riskLevel: 'Moderate',
        contributingFactors: ['Uncontrolled Systolic BP fluctuations', 'Age > 50'],
        missingInvestigations: ['Carotid Doppler Scan'],
        referralRecommendation: 'Neurology Consultation if Transient Weakness occurs',
      },
    ];
  },
};
