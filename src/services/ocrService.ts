// Placeholder OCR Scanner Service for SUSHRUTA
// Will process uploaded image/PDF lab documents via Tesseract OCR / Google Vision API

export interface ExtractedReportData {
  fileName: string;
  patientName: string;
  extractedDate: string;
  labName: string;
  parameters: {
    parameter: string;
    value: string;
    unit: string;
    referenceRange: string;
    isAbnormal: boolean;
  }[];
  confidenceScore: number;
}

export const ocrService = {
  async processLabReport(file: File): Promise<ExtractedReportData> {
    await new Promise((res) => setTimeout(res, 1200));

    return {
      fileName: file.name,
      patientName: 'Rajesh Kumar (P-10482)',
      extractedDate: new Date().toISOString().split('T')[0],
      labName: 'Central Clinical Diagnostics Lab',
      confidenceScore: 96.4,
      parameters: [
        { parameter: 'Fasting Blood Sugar', value: '142', unit: 'mg/dL', referenceRange: '70 - 99', isAbnormal: true },
        { parameter: 'HbA1c', value: '7.8', unit: '%', referenceRange: '4.0 - 5.6', isAbnormal: true },
        { parameter: 'Serum Creatinine', value: '1.1', unit: 'mg/dL', referenceRange: '0.7 - 1.3', isAbnormal: false },
        { parameter: 'Total Cholesterol', value: '215', unit: 'mg/dL', referenceRange: '< 200', isAbnormal: true },
        { parameter: 'Systolic Blood Pressure', value: '138', unit: 'mmHg', referenceRange: '< 120', isAbnormal: true },
      ],
    };
  },
};
