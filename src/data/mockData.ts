import { Patient, MedicalRecord, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'dr.smith',
    name: 'Dr. John Smith',
    role: 'doctor',
    specialty: 'Cardiology',
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    username: 'dr.johnson',
    name: 'Dr. Sarah Johnson',
    role: 'doctor',
    specialty: 'Radiology',
    avatar: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Rajesh Patel',
    age: 45,
    gender: 'male',
    bloodType: 'B+',
    contactNumber: '(+91) 98765-43210',
    emergencyContact: '(+91) 98765-43211',
    address: '42, Shanti Nagar, Mumbai, Maharashtra',
    lastVisit: '2024-03-15',
    diagnosis: 'Hypertension, Type 2 Diabetes',
    avatar: 'https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    age: 32,
    gender: 'female',
    bloodType: 'O+',
    contactNumber: '(+91) 98765-43212',
    emergencyContact: '(+91) 98765-43213',
    address: '15, Green Park, New Delhi, Delhi',
    lastVisit: '2024-03-20',
    diagnosis: 'Asthma, Seasonal Allergies',
    avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    name: 'Arun Krishnan',
    age: 58,
    gender: 'male',
    bloodType: 'A+',
    contactNumber: '(+91) 98765-43214',
    emergencyContact: '(+91) 98765-43215',
    address: '7, Gandhi Road, Bangalore, Karnataka',
    lastVisit: '2024-03-10',
    diagnosis: 'Coronary Artery Disease, Arthritis',
    avatar: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    patientId: '1',
    date: '2024-03-15',
    type: 'cardiology',
    title: 'Routine Cardiac Checkup',
    description: 'Routine cardiac assessment and ECG',
    doctor: 'Dr. John Smith',
    vitals: {
      bloodPressure: '130/85',
      heartRate: 75,
      temperature: '98.6°F',
      respiratoryRate: 16,
      oxygenSaturation: 98
    },
    images: [
      {
        type: 'ecg',
        url: 'https://images.pexels.com/photos/6098043/pexels-photo-6098043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        description: 'ECG showing normal sinus rhythm with occasional PVCs'
      }
    ],
    medications: [
      {
        name: 'Telmisartan',
        dosage: '40mg',
        frequency: 'Once daily',
        duration: 'Ongoing'
      },
      {
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: 'Ongoing'
      }
    ],
    notes: 'Patient reports feeling well. Blood pressure slightly elevated but improved from previous visit.'
  },
  {
    id: '2',
    patientId: '1',
    date: '2024-01-20',
    type: 'radiology',
    title: 'Chest X-ray',
    description: 'Routine chest X-ray to monitor heart enlargement',
    doctor: 'Dr. Sarah Johnson',
    vitals: {
      bloodPressure: '135/88',
      heartRate: 78,
      temperature: '98.4°F',
      respiratoryRate: 17,
      oxygenSaturation: 97
    },
    images: [
      {
        type: 'xray',
        url: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        description: 'Chest X-ray showing mild cardiomegaly, no active pulmonary disease'
      }
    ],
    notes: 'Minor progression of cardiomegaly compared to previous X-rays. Continue current medications and monitor.'
  },
  {
    id: '3',
    patientId: '2',
    date: '2024-03-20',
    type: 'general',
    title: 'Annual Physical',
    description: 'Comprehensive annual exam',
    doctor: 'Dr. John Smith',
    vitals: {
      bloodPressure: '118/75',
      heartRate: 68,
      temperature: '98.2°F',
      respiratoryRate: 14,
      oxygenSaturation: 99
    },
    medications: [
      {
        name: 'Salbutamol',
        dosage: '100mcg',
        frequency: 'As needed',
        duration: 'Ongoing'
      },
      {
        name: 'Montelukast',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: 'Ongoing'
      }
    ],
    notes: 'All vitals within normal limits. Patient reports occasional wheezing but overall good control with current medication.'
  },
  {
    id: '4',
    patientId: '2',
    date: '2023-11-15',
    type: 'radiology',
    title: 'Brain MRI',
    description: 'MRI to evaluate recurring headaches',
    doctor: 'Dr. Sarah Johnson',
    images: [
      {
        type: 'mri',
        url: 'https://images.pexels.com/photos/4226219/pexels-photo-4226219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        description: 'Brain MRI showing no abnormalities or structural lesions'
      }
    ],
    notes: 'No concerning findings. Headaches likely tension-type. Recommend stress management and yoga.'
  },
  {
    id: '5',
    patientId: '3',
    date: '2024-03-10',
    type: 'cardiology',
    title: 'Post-angioplasty Assessment',
    description: 'Follow-up after coronary stent placement',
    doctor: 'Dr. John Smith',
    vitals: {
      bloodPressure: '125/78',
      heartRate: 70,
      temperature: '98.0°F',
      respiratoryRate: 15,
      oxygenSaturation: 96
    },
    images: [
      {
        type: 'ecg',
        url: 'https://images.pexels.com/photos/6098034/pexels-photo-6098034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        description: 'Post-procedure ECG showing normal sinus rhythm'
      }
    ],
    medications: [
      {
        name: 'Aspirin',
        dosage: '75mg',
        frequency: 'Once daily',
        duration: 'Ongoing'
      },
      {
        name: 'Clopidogrel',
        dosage: '75mg',
        frequency: 'Once daily',
        duration: '12 months'
      },
      {
        name: 'Atorvastatin',
        dosage: '40mg',
        frequency: 'Once daily at bedtime',
        duration: 'Ongoing'
      }
    ],
    notes: 'Patient recovering well from procedure. Reports improved exercise tolerance and no angina. Continue current management.'
  },
  {
    id: '6',
    patientId: '3',
    date: '2024-02-05',
    type: 'radiology',
    title: 'Knee X-ray',
    description: 'X-ray to evaluate right knee pain',
    doctor: 'Dr. Sarah Johnson',
    images: [
      {
        type: 'xray',
        url: 'https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        description: 'Right knee X-ray showing moderate degenerative joint disease'
      }
    ],
    notes: 'Moderate osteoarthritis of the right knee. Recommend physiotherapy, weight management, and Ayurvedic supplements as discussed.'
  }
];

// Demo credentials
export const demoCredentials = {
  username: 'dr.smith',
  password: 'password123'
};