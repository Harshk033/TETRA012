import { UserProfile, UserRole } from '../types';

export interface UserAuthResponse {
  success: boolean;
  token?: string;
  user?: UserProfile;
  error?: string;
}

const STORAGE_KEY_USER = 'sushruta_active_user';
const STORAGE_KEY_TOKEN = 'sushruta_jwt_token';
const STORAGE_KEY_LAST_ACCOUNT = 'sushruta_last_account';
const STORAGE_KEY_SAVED_ACCOUNTS = 'sushruta_saved_accounts';

// Default mock profiles for instant login
export const DEMO_WORKER_PROFILE: UserProfile = {
  id: 'W-9082',
  name: 'Dr. Aditi Sharma',
  email: 'dr.aditi@sushruta.org',
  role: 'worker',
  facility: 'AIIMS Community Health Center, Rural Wing',
  specialization: 'Senior Community Health Physician',
  phone: '+91 98765 43210',
  registeredDate: '12 Jan 2024',
  doctorRegistrationNo: 'MCI-88201',
};

export const DEMO_PATIENT_PROFILE: UserProfile = {
  id: 'P-10482',
  name: 'Rajesh Kumar',
  email: 'rajesh.k@healthmail.in',
  role: 'patient',
  facility: 'District Hospital OPD',
  phone: '+91 98123 99881',
  registeredDate: '05 Mar 2025',
  age: 52,
  gender: 'Male',
  bloodGroup: 'O+',
  bmi: 27.4,
  emergencyContactPhone: '+91 98123 99800',
  medicalHistory: ['Type-2 Diabetes Mellitus', 'Stage-1 Hypertension', 'Mild Dyslipidemia'],
  allergies: ['Penicillin', 'Sulfa drugs'],
};

export const authService = {
  getCurrentUser(): UserProfile | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse active user session', e);
    }
    return null;
  },

  getSavedAccounts(): UserProfile[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SAVED_ACCOUNTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved accounts list', e);
    }
    // Default fallback to DEMO accounts if no accounts saved yet, and store them
    const initialAccounts = [DEMO_WORKER_PROFILE, DEMO_PATIENT_PROFILE];
    try {
      localStorage.setItem(STORAGE_KEY_SAVED_ACCOUNTS, JSON.stringify(initialAccounts));
    } catch (e) {
      console.warn('Failed to save initial demo accounts', e);
    }
    return initialAccounts;
  },

  removeSavedAccount(accountId: string): UserProfile[] {
    try {
      const current = this.getSavedAccounts();
      const accounts = current.filter(acc => acc.id !== accountId);
      localStorage.setItem(STORAGE_KEY_SAVED_ACCOUNTS, JSON.stringify(accounts));
      if (accounts.length > 0) {
        localStorage.setItem(STORAGE_KEY_LAST_ACCOUNT, JSON.stringify(accounts[0]));
      } else {
        localStorage.removeItem(STORAGE_KEY_LAST_ACCOUNT);
      }
      return accounts;
    } catch (e) {
      console.warn('Failed to remove saved account', e);
      return [];
    }
  },

  clearAllSavedAccounts(): void {
    try {
      localStorage.removeItem(STORAGE_KEY_SAVED_ACCOUNTS);
      localStorage.removeItem(STORAGE_KEY_LAST_ACCOUNT);
    } catch (e) {
      console.warn('Failed to clear saved accounts', e);
    }
  },

  getLastAccount(): UserProfile | null {
    const saved = this.getSavedAccounts();
    return saved.length > 0 ? saved[0] : null;
  },

  clearLastAccount(): void {
    this.clearAllSavedAccounts();
  },

  setCurrentUser(user: UserProfile, token: string = 'jwt_token_sushruta_active') {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEY_TOKEN, token);
      localStorage.setItem(STORAGE_KEY_LAST_ACCOUNT, JSON.stringify(user));

      // Save to saved accounts list (preserve all previous accounts, deduplicate by ID or email)
      const currentList = this.getSavedAccounts();
      const existingFiltered = currentList.filter(
        (a) => a.id.toLowerCase() !== user.id.toLowerCase() && 
               (!user.email || !a.email || a.email.toLowerCase() !== user.email.toLowerCase())
      );
      const updated = [user, ...existingFiltered];
      localStorage.setItem(STORAGE_KEY_SAVED_ACCOUNTS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save user session', e);
    }
  },

  async workerLogin(username: string, pass: string): Promise<UserAuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const cleanUsername = username.trim();
    if (cleanUsername.length > 0) {
      let user: UserProfile;

      // If logging in as demo worker or Aditi's email
      if (
        cleanUsername.toLowerCase() === DEMO_WORKER_PROFILE.email.toLowerCase() ||
        cleanUsername === DEMO_WORKER_PROFILE.id ||
        cleanUsername.toLowerCase().includes('aditi')
      ) {
        user = DEMO_WORKER_PROFILE;
      } else {
        // Generate a unique worker profile for this new worker username
        const uniqueId = cleanUsername.startsWith('W-') 
          ? cleanUsername 
          : `W-${Math.floor(1000 + Math.abs(cleanUsername.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) * 17) % 9000 + 1000}`;
        
        const extractedName = cleanUsername.includes('@') 
          ? cleanUsername.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
          : cleanUsername;

        user = {
          ...DEMO_WORKER_PROFILE,
          id: uniqueId,
          name: extractedName.toLowerCase().startsWith('dr') ? extractedName : `Dr. ${extractedName}`,
          email: cleanUsername.includes('@') ? cleanUsername : `${cleanUsername.toLowerCase()}@sushruta.org`,
        };
      }

      this.setCurrentUser(user, `token_worker_${user.id}`);
      return {
        success: true,
        token: `token_worker_${user.id}`,
        user,
      };
    }
    return { success: false, error: 'Invalid Worker Email or ID' };
  },

  async patientLogin(patientId: string, pass: string): Promise<UserAuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const cleanPatientId = patientId.trim();
    if (cleanPatientId.length > 0) {
      let user: UserProfile;

      // If logging in as demo patient or Rajesh
      if (
        cleanPatientId.toLowerCase() === DEMO_PATIENT_PROFILE.id.toLowerCase() ||
        cleanPatientId.toLowerCase() === DEMO_PATIENT_PROFILE.email?.toLowerCase() ||
        cleanPatientId.toLowerCase().includes('rajesh')
      ) {
        user = DEMO_PATIENT_PROFILE;
      } else {
        // Generate a unique patient profile for this new patient ID
        const uniqueId = cleanPatientId.startsWith('P-') ? cleanPatientId : `P-${cleanPatientId}`;
        const extractedName = cleanPatientId.includes('@') 
          ? cleanPatientId.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
          : `Patient ${cleanPatientId}`;

        user = {
          ...DEMO_PATIENT_PROFILE,
          id: uniqueId,
          name: extractedName,
          email: cleanPatientId.includes('@') ? cleanPatientId : `${cleanPatientId.toLowerCase()}@patientmail.in`,
        };
      }

      this.setCurrentUser(user, `token_patient_${user.id}`);
      return {
        success: true,
        token: `token_patient_${user.id}`,
        user,
      };
    }
    return { success: false, error: 'Invalid Patient ID or Password' };
  },

  async signup(data: {
    role: UserRole;
    name: string;
    emailOrId: string;
    password?: string;
    facility?: string;
    specialization?: string;
    age?: number;
    gender?: string;
    bloodGroup?: string;
    phone?: string;
    emergencyContactPhone?: string;
  }): Promise<UserAuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!data.name.trim() || !data.emailOrId.trim()) {
      return { success: false, error: 'Name and Email/ID are required.' };
    }

    const newId = data.role === 'worker' ? `W-${Math.floor(1000 + Math.random() * 9000)}` : `P-${Math.floor(10000 + Math.random() * 90000)}`;

    const newUser: UserProfile = {
      id: newId,
      name: data.name,
      email: data.emailOrId.includes('@') ? data.emailOrId : `${data.name.toLowerCase().replace(/\s+/g, '')}@sushruta.org`,
      role: data.role,
      facility: data.facility || 'Primary Health Center',
      specialization: data.role === 'worker' ? (data.specialization || 'Community Physician') : undefined,
      phone: data.phone || '+91 99000 12345',
      registeredDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      age: data.age || 45,
      gender: data.gender || 'Male',
      bloodGroup: data.bloodGroup || 'B+',
      bmi: 24.5,
      emergencyContactPhone: data.emergencyContactPhone || '+91 98000 00000',
      medicalHistory: data.role === 'patient' ? ['Routine Health Screened'] : undefined,
      allergies: data.role === 'patient' ? ['None Reported'] : undefined,
      doctorRegistrationNo: data.role === 'worker' ? `MCI-${Math.floor(10000 + Math.random() * 90000)}` : undefined,
    };

    this.setCurrentUser(newUser, `token_${newUser.id}`);
    return {
      success: true,
      token: `token_${newUser.id}`,
      user: newUser,
    };
  },

  updateProfile(updatedFields: Partial<UserProfile>): UserProfile | null {
    const current = this.getCurrentUser();
    if (!current) return null;

    const merged = { ...current, ...updatedFields };
    this.setCurrentUser(merged);
    return merged;
  },

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  },
};
