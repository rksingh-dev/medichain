export interface User {
  id: string;
  username: string;
  name: string;
  role: 'doctor';
  specialty: string;
  avatar: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodType: string;
  contactNumber: string;
  emergencyContact: string;
  address: string;
  lastVisit: string;
  diagnosis: string;
  avatar: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  type: 'general' | 'cardiology' | 'radiology' | 'lab';
  title: string;
  description: string;
  doctor: string;
  vitals?: {
    bloodPressure: string;
    heartRate: number;
    temperature: string;
    respiratoryRate: number;
    oxygenSaturation: number;
  };
  images?: {
    type: 'ecg' | 'mri' | 'xray';
    url: string;
    description: string;
  }[];
  medications?: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  notes?: string;
}

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}