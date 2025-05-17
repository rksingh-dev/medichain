import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Activity, 
  FileText, 
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { mockPatients, mockMedicalRecords } from '../data/mockData';
import Layout from '../components/layout/Layout';
import PatientVitals from '../components/medical/PatientVitals';
import VitalsChart from '../components/medical/VitalsChart';

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const patient = mockPatients.find(p => p.id === id);
  
  if (!patient) {
    return (
      <Layout>
        <div className="text-center py-12">
          <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Patient Not Found</h2>
          <p className="text-gray-600 mb-6">The patient you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/patients" 
            className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Patients
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Get records for this patient
  const patientRecords = mockMedicalRecords.filter(r => r.patientId === id);
  
  // Get the most recent record with vitals
  const latestRecordWithVitals = patientRecords
    .filter(r => r.vitals)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  
  return (
    <Layout>
      <div className="mb-6 flex items-center">
        <Link 
          to="/patients" 
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Back to patients"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Details</h1>
          <p className="text-gray-600">Viewing medical information for {patient.name}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Patient Info Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden lg:col-span-1">
          <div className="h-32 bg-gradient-to-r from-cyan-500 to-teal-500"></div>
          <div className="relative px-6 pb-6">
            <div className="absolute -top-12 flex justify-center items-center">
              <img 
                src={patient.avatar} 
                alt={patient.name} 
                className="w-24 h-24 rounded-full border-4 border-white object-cover shadow"
              />
            </div>
            
            <div className="pt-16">
              <h2 className="text-xl font-semibold text-gray-800">{patient.name}</h2>
              <p className="text-sm text-gray-500">ID: {patient.id}</p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-start">
                  <User size={18} className="text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Personal Info</p>
                    <p className="text-sm text-gray-700">
                      {patient.age} years old, {patient.gender}
                    </p>
                    <p className="text-sm text-gray-700">
                      Blood Type: {patient.bloodType}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone size={18} className="text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Contact</p>
                    <p className="text-sm text-gray-700">{patient.contactNumber}</p>
                    <p className="text-sm text-gray-700">
                      Emergency: {patient.emergencyContact}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Address</p>
                    <p className="text-sm text-gray-700">{patient.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar size={18} className="text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Last Visit</p>
                    <p className="text-sm text-gray-700">{patient.lastVisit}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Activity size={18} className="text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Diagnosis</p>
                    <p className="text-sm text-gray-700">{patient.diagnosis}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vitals and Charts */}
        <div className="lg:col-span-2 space-y-6">
          {latestRecordWithVitals && (
            <>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Current Vitals
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    (as of {latestRecordWithVitals.date})
                  </span>
                </h3>
                <PatientVitals record={latestRecordWithVitals} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <VitalsChart patientId={id} type="heartRate" />
                <VitalsChart patientId={id} type="bloodPressure" />
              </div>
            </>
          )}
          
          {/* Recent Medical Records */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Recent Medical Records</h3>
              <Link 
                to={`/medical-records?patient=${id}`}
                className="text-sm font-medium text-cyan-600 hover:text-cyan-800 transition-colors"
              >
                View all records
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {patientRecords.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {patientRecords.slice(0, 5).map(record => (
                    <Link 
                      key={record.id}
                      to={`/medical-records/${record.id}`}
                      className="block hover:bg-gray-50 transition-colors p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className={`p-2 rounded-full mr-3 
                            ${record.type === 'cardiology' ? 'bg-red-100' : ''}
                            ${record.type === 'radiology' ? 'bg-blue-100' : ''}
                            ${record.type === 'general' ? 'bg-green-100' : ''}
                            ${record.type === 'lab' ? 'bg-yellow-100' : ''}
                          `}>
                            <FileText size={16} className={`
                              ${record.type === 'cardiology' ? 'text-red-600' : ''}
                              ${record.type === 'radiology' ? 'text-blue-600' : ''}
                              ${record.type === 'general' ? 'text-green-600' : ''}
                              ${record.type === 'lab' ? 'text-yellow-600' : ''}
                            `} />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{record.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">{record.description}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{record.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No medical records found for this patient.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDetailPage;