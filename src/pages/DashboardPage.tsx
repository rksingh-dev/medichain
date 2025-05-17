import React from 'react';
import { Users, Activity, FileText, Image, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockPatients, mockMedicalRecords } from '../data/mockData';
import PatientCard from '../components/dashboard/PatientCard';
import StatsCard from '../components/dashboard/StatsCard';
import Layout from '../components/layout/Layout';

const DashboardPage: React.FC = () => {
  // Calculate dashboard statistics
  const stats = {
    totalPatients: mockPatients.length,
    recentRecords: mockMedicalRecords.filter(r => {
      const recordDate = new Date(r.date);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return recordDate >= oneWeekAgo;
    }).length,
    pendingReviews: 2, // Mock value
    scheduledAppointments: 5 // Mock value
  };

  // Get recent records for display
  const recentRecords = [...mockMedicalRecords]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back to your medical dashboard</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Total Patients" 
          value={stats.totalPatients} 
          icon={Users}
          color="blue" 
        />
        <StatsCard 
          title="Recent Records" 
          value={stats.recentRecords} 
          icon={FileText}
          color="green"
          change={{ value: 12, type: 'increase' }}
        />
        <StatsCard 
          title="Pending Reviews" 
          value={stats.pendingReviews} 
          icon={Activity}
          color="orange"
        />
        <StatsCard 
          title="Appointments" 
          value={stats.scheduledAppointments} 
          icon={Calendar}
          color="purple"
        />
      </div>
      
      {/* Recent Patients */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Patients</h2>
          <Link 
            to="/patients" 
            className="text-sm font-medium text-cyan-600 hover:text-cyan-800 transition-colors"
          >
            View all patients
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPatients.map(patient => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </div>
      
      {/* Recent Medical Records */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Records</h2>
          <Link 
            to="/medical-records" 
            className="text-sm font-medium text-cyan-600 hover:text-cyan-800 transition-colors"
          >
            View all records
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentRecords.map(record => {
                const patient = mockPatients.find(p => p.id === record.patientId);
                return (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full object-cover" 
                            src={patient?.avatar} 
                            alt={patient?.name} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {patient?.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${record.type === 'cardiology' ? 'bg-red-100 text-red-800' : ''}
                        ${record.type === 'radiology' ? 'bg-blue-100 text-blue-800' : ''}
                        ${record.type === 'general' ? 'bg-green-100 text-green-800' : ''}
                        ${record.type === 'lab' ? 'bg-yellow-100 text-yellow-800' : ''}
                      `}>
                        {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {record.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.doctor}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;