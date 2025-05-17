import React, { useState } from 'react';
import { MedicalRecord } from '../../types';

interface MedicalImageCardProps {
  record: MedicalRecord;
  image: {
    type: 'ecg' | 'mri' | 'xray';
    url: string;
    description: string;
  };
}

const MedicalImageCard: React.FC<MedicalImageCardProps> = ({ record, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const getImageTypeLabel = (type: string) => {
    switch (type) {
      case 'ecg':
        return 'ECG';
      case 'mri':
        return 'MRI';
      case 'xray':
        return 'X-Ray';
      default:
        return type;
    }
  };

  const getImageTypeColor = (type: string) => {
    switch (type) {
      case 'ecg':
        return 'bg-red-100 text-red-800';
      case 'mri':
        return 'bg-blue-100 text-blue-800';
      case 'xray':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative">
          <img 
            src={image.url} 
            alt={`${getImageTypeLabel(image.type)} for ${record.title}`} 
            className="w-full h-48 object-cover"
          />
          <span className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full ${getImageTypeColor(image.type)}`}>
            {getImageTypeLabel(image.type)}
          </span>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-800 truncate">{record.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{record.date}</p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{image.description}</p>
        </div>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-800">{record.title}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <img 
                src={image.url} 
                alt={`${getImageTypeLabel(image.type)} for ${record.title}`} 
                className="w-full max-h-[60vh] object-contain"
              />
              
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getImageTypeColor(image.type)} mr-2`}>
                    {getImageTypeLabel(image.type)}
                  </span>
                  <span className="text-sm text-gray-500">{record.date}</span>
                </div>
                
                <h4 className="font-medium text-gray-800 mb-2">Description</h4>
                <p className="text-gray-600">{image.description}</p>
                
                <div className="mt-4 bg-gray-50 p-3 rounded">
                  <h4 className="font-medium text-gray-800 mb-2">Additional Notes</h4>
                  <p className="text-gray-600">{record.notes}</p>
                </div>
                
                <div className="mt-4 text-sm text-gray-500">
                  <p>Doctor: {record.doctor}</p>
                  <p>Record ID: {record.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MedicalImageCard;