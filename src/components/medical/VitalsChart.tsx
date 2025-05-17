import React, { useEffect, useRef } from 'react';

interface VitalsChartProps {
  patientId: string;
  type: 'heartRate' | 'bloodPressure' | 'temperature' | 'respiratoryRate';
}

// Mock data for demo
const generateMockChartData = (type: string) => {
  let data = [];
  const now = new Date();
  
  switch (type) {
    case 'heartRate':
      for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        // Generate heart rate between 60 and 85
        data.push({
          date: date.toISOString().split('T')[0],
          value: Math.floor(Math.random() * 25) + 60
        });
      }
      break;
    case 'bloodPressure':
      for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        // Generate systolic between 110 and 140, diastolic between 70 and 90
        const systolic = Math.floor(Math.random() * 30) + 110;
        const diastolic = Math.floor(Math.random() * 20) + 70;
        data.push({
          date: date.toISOString().split('T')[0],
          systolic,
          diastolic
        });
      }
      break;
    case 'temperature':
      for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        // Generate temperature between 97.5 and 99.0
        data.push({
          date: date.toISOString().split('T')[0],
          value: (Math.random() * 1.5 + 97.5).toFixed(1)
        });
      }
      break;
    case 'respiratoryRate':
      for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        // Generate respiratory rate between 12 and 20
        data.push({
          date: date.toISOString().split('T')[0],
          value: Math.floor(Math.random() * 8) + 12
        });
      }
      break;
    default:
      break;
  }
  
  return data;
};

const VitalsChart: React.FC<VitalsChartProps> = ({ patientId, type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Get appropriate title based on type
  const getChartTitle = () => {
    switch (type) {
      case 'heartRate':
        return 'Heart Rate (BPM)';
      case 'bloodPressure':
        return 'Blood Pressure (mmHg)';
      case 'temperature':
        return 'Temperature (°F)';
      case 'respiratoryRate':
        return 'Respiratory Rate (breaths/min)';
      default:
        return '';
    }
  };
  
  // Get appropriate color based on type
  const getChartColor = () => {
    switch (type) {
      case 'heartRate':
        return 'rgb(239, 68, 68)';
      case 'bloodPressure':
        return 'rgb(59, 130, 246)';
      case 'temperature':
        return 'rgb(249, 115, 22)';
      case 'respiratoryRate':
        return 'rgb(16, 185, 129)';
      default:
        return 'rgb(107, 114, 128)';
    }
  };
  
  // Generate mock ECG data for heart rate
  const generateECGData = () => {
    const data = [];
    // This generates a simplified ECG-like pattern
    for (let i = 0; i < 200; i++) {
      let value = 0;
      // Create a basic PQRST wave pattern
      if (i % 40 === 0) value = 5; // P wave
      else if (i % 40 === 5) value = -2; // Q
      else if (i % 40 === 7) value = 30; // R
      else if (i % 40 === 9) value = -5; // S
      else if (i % 40 === 15) value = 7; // T
      else value = Math.random() * 2 - 1; // Baseline with noise
      
      data.push(value);
    }
    return data;
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw based on chart type
    if (type === 'heartRate' && patientId === '1') {
      // Draw ECG for patient 1
      const ecgData = generateECGData();
      const height = canvas.height;
      const width = canvas.width;
      
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
      ctx.lineWidth = 2;
      
      // Plot the ECG data
      for (let i = 0; i < ecgData.length; i++) {
        const x = (i / ecgData.length) * width;
        // Center the signal vertically and scale it
        const y = height / 2 - (ecgData[i] * height / 80);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      // Add grid lines
      ctx.strokeStyle = 'rgba(229, 231, 235, 0.5)';
      ctx.lineWidth = 0.5;
      
      // Vertical grid lines
      for (let i = 0; i < width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      
      // Horizontal grid lines
      for (let i = 0; i < height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }
    } else {
      // Draw regular vitals chart
      const data = generateMockChartData(type);
      const height = canvas.height;
      const width = canvas.width;
      
      // Draw grid
      ctx.strokeStyle = 'rgba(229, 231, 235, 0.3)';
      ctx.lineWidth = 0.5;
      
      // Vertical grid lines
      for (let i = 0; i < width; i += width / 10) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      
      // Horizontal grid lines
      for (let i = 0; i < height; i += height / 5) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }
      
      if (type === 'bloodPressure') {
        // Draw systolic (top line)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
        ctx.lineWidth = 2;
        
        data.forEach((item, index) => {
          const x = (index / (data.length - 1)) * width;
          // Scale systolic value (110-140) to canvas height
          const y = height - ((item.systolic - 100) / 50) * height;
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.stroke();
        
        // Draw diastolic (bottom line)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(147, 197, 253, 0.8)';
        ctx.lineWidth = 2;
        
        data.forEach((item, index) => {
          const x = (index / (data.length - 1)) * width;
          // Scale diastolic value (70-90) to canvas height
          const y = height - ((item.diastolic - 60) / 40) * height;
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.stroke();
      } else {
        // Draw single line chart
        ctx.beginPath();
        ctx.strokeStyle = getChartColor();
        ctx.lineWidth = 2;
        
        // Find min and max values to scale properly
        const values = data.map(item => Number(item.value));
        const min = Math.min(...values) * 0.9;
        const max = Math.max(...values) * 1.1;
        
        data.forEach((item, index) => {
          const x = (index / (data.length - 1)) * width;
          // Scale value to canvas height
          const y = height - ((Number(item.value) - min) / (max - min)) * height;
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.stroke();
      }
    }
  }, [patientId, type]);
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-gray-700 font-medium mb-2">{getChartTitle()}</h3>
      <div className="relative w-full h-48 mt-2">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
          width={600}
          height={240}
        ></canvas>
      </div>
    </div>
  );
};

export default VitalsChart;