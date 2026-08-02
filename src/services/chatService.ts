// AI Clinical Assistant Chat Service for SUSHRUTA
export const chatService = {
  async sendMessage(message: string, context?: string): Promise<string> {
    await new Promise((res) => setTimeout(res, 400));

    const query = message.toLowerCase();

    // Emergency Protocol Check
    if (/chest pain|shortness of breath|severe bleeding|sudden numbness|self-harm|cannot breathe/i.test(query)) {
      return "It sounds like you may be experiencing a medical emergency. Please call 911 / 112 (or your local emergency number) or go to the nearest emergency room immediately.";
    }

    const disclaimer = "\n\n(Please note that I am an AI assistant and cannot provide medical advice. You should always consult with a licensed healthcare provider for a proper diagnosis.)";

    if (query.includes('diabetes') || query.includes('sugar') || query.includes('hba1c')) {
      return `For diabetes risk management, an HbA1c > 6.5% or Fasting Blood Sugar > 126 mg/dL may indicate elevated blood glucose. Standard clinical protocols suggest dietary modification, daily physical activity, and consulting your doctor for appropriate evaluation.` + disclaimer;
    }
    if (query.includes('bp') || query.includes('hypertension') || query.includes('blood pressure')) {
      return `A Systolic BP >= 140 mmHg or Diastolic >= 90 mmHg requires regular clinical monitoring. Lifestyle guidelines recommend reducing dietary sodium (<2g/day) and evaluating vitals with your physician.` + disclaimer;
    }

    return `I am here to assist with health navigation and clinical information. Please maintain regular vital logs and consult your healthcare provider for diagnostic assessments.` + disclaimer;
  },
};
