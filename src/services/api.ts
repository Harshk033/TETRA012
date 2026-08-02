// src/services/api.ts

// 1. Health Check
export async function checkHealth() {
  const res = await fetch('/api/health');
  return res.json();
}

// 2. Chat with Shushruta AI
export async function sendChatMessage(message: string, history: any[] = [], image?: string) {
  const res = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, image, language: 'English' }),
  });
  return res.json();
}

// 3. Symptom Checker
export async function analyzeSymptoms(symptoms: string[], notes: string = '') {
  const res = await fetch('/api/ai/symptom-check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symptoms, notes }),
  });
  return res.json();
}

// 4. Get Daily Wellness Tip
export async function getDailyTip() {
  const res = await fetch('/api/ai/daily-tip');
  return res.json();
}