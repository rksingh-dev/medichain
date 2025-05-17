import React from 'react';
import { Search, UserPlus } from 'lucide-react';
import { mockPatients } from '../data/mockData';
import PatientCard from '../components/dashboard/PatientCard';
import Layout from '../components/layout/Layout';

const PatientsPage: React.FC = () => {
  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
          <p className="text-gray-600">Manage and view your patient records</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm py-2 border"
            />
          </div>
          
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <UserPlus size={16} className="mr-2" />
            Add Patient
          </button>
        </div>
      </div>
      
      {/* Filter bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-2">
        <button className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
          All Patients
        </button>
        <button className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">
          Recent
        </button>
        <button className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">
          Critical
        </button>
        <button className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">
          Scheduled
        </button>
      </div>
      
      {/* Patients Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockPatients.map(patient => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </Layout>
  );
};

export default PatientsPage;