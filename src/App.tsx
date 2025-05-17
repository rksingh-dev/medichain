import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import PatientDetailPage from './pages/PatientDetailPage';
import MedicalRecordsPage from './pages/MedicalRecordsPage';
import ImagingPage from './pages/ImagingPage';
import AIAssistantPage from './pages/AIAssistantPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients/:id" element={<PatientDetailPage />} />
          <Route path="/medical-records" element={<MedicalRecordsPage />} />
          <Route path="/imaging" element={<ImagingPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;