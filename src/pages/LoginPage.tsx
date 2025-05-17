import React from 'react';
import { Activity } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-teal-100">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Left side - Branding */}
          <div className="bg-gradient-to-br from-cyan-600 to-teal-700 p-8 text-white hidden md:flex md:flex-col md:justify-between">
            <div>
              <div className="flex items-center mb-6">
                <Activity size={32} className="mr-2" />
                <h1 className="text-2xl font-bold">MediRecord Pro</h1>
              </div>
              <h2 className="text-3xl font-bold mb-6">Welcome back, Doctor</h2>
              <p className="text-cyan-100 mb-8">
                Access your patient records, medical imaging, and AI assistance tools in one secure platform.
              </p>
            </div>
            
            <div className="mt-auto space-y-6">
              <div className="border-t border-cyan-400 pt-6">
                <h3 className="font-medium mb-2">Secure Access</h3>
                <p className="text-sm text-cyan-100">
                  All your patient data is encrypted and securely stored in compliance with healthcare regulations.
                </p>
              </div>
              
              <div>
                <p className="text-xs text-cyan-200">© 2025 MediRecord Pro. All rights reserved.</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Login Form */}
          <div className="p-4 sm:p-8 flex items-center justify-center">
            <div className="md:hidden flex items-center justify-center mb-6">
              <Activity size={32} className="mr-2 text-cyan-600" />
              <h1 className="text-2xl font-bold text-gray-800">MediRecord Pro</h1>
            </div>
            
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;