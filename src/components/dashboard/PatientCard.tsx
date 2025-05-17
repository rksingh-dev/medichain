import React from 'react';
import { User, Calendar, Phone } from 'lucide-react';
import { Patient } from '../../types';
import { Link } from 'react-router-dom';

interface PatientCardProps {
  patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <Link 
      to={`/patients/${patient.id}`}
      className="block group"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:translate-y-[-4px]">
        <div className="relative h-24 bg-gradient-to-r from-cyan-600 to-teal-500">
          <div className="absolute -bottom-10 left-4">
            <img 
              src={patient.avatar} 
              alt={patient.name} 
              className="w-20 h-20 rounded-full border-4 border-white object-cover shadow"
            />
          </div>
        </div>
        
        <div className="pt-12 pb-4 px-4">
          <h3 className="text-lg font-semibold text-gray-800">{patient.name}</h3>
          
          <div className="mt-2 text-sm text-gray-500 space-y-1">
            <p className="flex items-center">
              <User size={14} className="mr-2" />
              {patient.age} years, {patient.gender}
            </p>
            <p className="flex items-center">
              <Calendar size={14} className="mr-2" />
              Last visit: {patient.lastVisit}
            </p>
            <p className="flex items-center">
              <Phone size={14} className="mr-2" />
              {patient.contactNumber}
            </p>
          </div>
          
          <div className="mt-3 border-t border-gray-100 pt-3">
            <p className="text-xs font-medium text-gray-700">Diagnosis:</p>
            <p className="text-sm text-gray-600 line-clamp-1">{patient.diagnosis}</p>
          </div>
          
          <div className="mt-3 flex justify-end">
            <span className="inline-flex items-center rounded-full bg-cyan-50 px-2 py-1 text-xs font-medium text-cyan-700">
              Blood Type: {patient.bloodType}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PatientCard;