import React from 'react';
import { Heart, Thermometer, Activity, BarChart2 } from 'lucide-react';
import { MedicalRecord } from '../../types';

interface PatientVitalsProps {
  record: MedicalRecord;
}

const PatientVitals: React.FC<PatientVitalsProps> = ({ record }) => {
  if (!record.vitals) return null;
  
  const { bloodPressure, heartRate, temperature, respiratoryRate, oxygenSaturation } = record.vitals;
  
  // Function to determine status color based on values
  const getHeartRateColor = (rate: number) => {
    if (rate < 60) return 'text-blue-600';
    if (rate > 100) return 'text-red-600';
    return 'text-green-600';
  };
  
  const getBloodPressureColor = (bp: string) => {
    const systolic = parseInt(bp.split('/')[0], 10);
    if (systolic < 90) return 'text-blue-600';
    if (systolic >= 140) return 'text-red-600';
    return 'text-green-600';
  };
  
  const getTemperatureColor = (temp: string) => {
    const value = parseFloat(temp.replace('°F', ''));
    if (value < 97.0) return 'text-blue-600';
    if (value > 99.5) return 'text-red-600';
    return 'text-green-600';
  };
  
  const getRespiratoryRateColor = (rate: number) => {
    if (rate < 12) return 'text-blue-600';
    if (rate > 20) return 'text-red-600';
    return 'text-green-600';
  };
  
  const getOxygenSaturationColor = (level: number) => {
    if (level < 95) return 'text-red-600';
    if (level < 97) return 'text-yellow-600';
    return 'text-green-600';
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105">
        <div className="p-3 rounded-full bg-red-100 mb-2">
          <Heart className="h-7 w-7 text-red-500" />
        </div>
        <span className={`text-3xl font-extrabold mb-1 ${getHeartRateColor(heartRate)}`}>{heartRate}</span>
        <h3 className="text-base font-semibold text-gray-700 mb-1 text-center">Heart Rate</h3>
        <p className="text-xs text-gray-500 text-center">Beats per minute</p>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105">
        <div className="p-3 rounded-full bg-blue-100 mb-2">
          <Activity className="h-7 w-7 text-blue-500" />
        </div>
        <span className={`text-3xl font-extrabold mb-1 ${getBloodPressureColor(bloodPressure)}`}>{bloodPressure}</span>
        <h3 className="text-base font-semibold text-gray-700 mb-1 text-center">Blood Pressure</h3>
        <p className="text-xs text-gray-500 text-center">Systolic/Diastolic mmHg</p>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105">
        <div className="p-3 rounded-full bg-orange-100 mb-2">
          <Thermometer className="h-7 w-7 text-orange-500" />
        </div>
        <span className={`text-3xl font-extrabold mb-1 ${getTemperatureColor(temperature)}`}>{temperature}</span>
        <h3 className="text-base font-semibold text-gray-700 mb-1 text-center">Temperature</h3>
        <p className="text-xs text-gray-500 text-center">Degrees Fahrenheit</p>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105">
        <div className="p-3 rounded-full bg-green-100 mb-2">
          <Activity className="h-7 w-7 text-green-500" />
        </div>
        <span className={`text-3xl font-extrabold mb-1 ${getRespiratoryRateColor(respiratoryRate)}`}>{respiratoryRate}</span>
        <h3 className="text-base font-semibold text-gray-700 mb-1 text-center">Respiratory Rate</h3>
        <p className="text-xs text-gray-500 text-center">Breaths per minute</p>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105">
        <div className="p-3 rounded-full bg-purple-100 mb-2">
          <BarChart2 className="h-7 w-7 text-purple-500" />
        </div>
        <span className={`text-3xl font-extrabold mb-1 ${getOxygenSaturationColor(oxygenSaturation)}`}>{oxygenSaturation}%</span>
        <h3 className="text-base font-semibold text-gray-700 mb-1 text-center">Oxygen Saturation</h3>
        <p className="text-xs text-gray-500 text-center">SpO₂ Percentage</p>
      </div>
    </div>
  );
};

export default PatientVitals;