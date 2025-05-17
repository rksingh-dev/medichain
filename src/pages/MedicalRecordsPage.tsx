import React from 'react';
import { FileText, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockMedicalRecords, mockPatients } from '../data/mockData';
import Layout from '../components/layout/Layout';

const MedicalRecordsPage: React.FC = () => {
  // Get all records sorted by date
  const sortedRecords = [...mockMedicalRecords].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Medical Records</h1>
          <p className="text-gray-600">View and manage patient medical records</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search records..."
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm py-2 border"
            />
          </div>
          
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <FileText size={16} className="mr-2" />
            Add Record
          </button>
        </div>
      </div>
      
      {/* Filter bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap justify-between">
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
            All Records
          </button>
          <button className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">
            Cardiology
          </button>
          <button className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">
            Radiology
          </button>
          <button className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">
            General
          </button>
          <button className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">
            Lab
          </button>
        </div>
        
        <button className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-700 hover:text-gray-900">
          <Filter size={14} className="mr-1" />
          More Filters
        </button>
      </div>
      
      {/* Records Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Record
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedRecords.map(record => {
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
                            <Link 
                              to={`/patients/${patient?.id}`}
                              className="hover:text-cyan-600"
                            >
                              {patient?.name}
                            </Link>
                          </div>
                          <div className="text-sm text-gray-500">
                            {patient?.age} years, {patient?.gender}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {record.title}
                      </div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {record.description}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.doctor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/medical-records/${record.id}`}
                        className="text-cyan-600 hover:text-cyan-900 mr-4"
                      >
                        View
                      </Link>
                      <button className="text-gray-600 hover:text-gray-900">
                        Edit
                      </button>
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

export default MedicalRecordsPage;