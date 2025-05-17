import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Activity, 
  FileText, 
  Home, 
  Image, 
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (!user) return null;

  return (
    <aside 
      className={`
        fixed top-14 left-0 bottom-0 z-40 transition-all duration-300 ease-in-out
        w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-lg
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 ${!isOpen && 'md:w-16'}
      `}
    >
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className={`flex items-center ${!isOpen && 'md:justify-center'}`}>
            <div className="flex-shrink-0">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className={`ml-3 ${!isOpen && 'md:hidden'}`}>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-300">{user.specialty}</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-5 flex-1">
          <ul className="space-y-1 px-2">
            <li>
              <Link
                to="/dashboard"
                className={`
                  flex items-center px-4 py-3 text-sm rounded-lg transition-colors
                  ${isActive('/dashboard') 
                    ? 'bg-cyan-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'}
                `}
              >
                <Home size={20} />
                <span className={`ml-3 ${!isOpen && 'md:hidden'}`}>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/patients"
                className={`
                  flex items-center px-4 py-3 text-sm rounded-lg transition-colors
                  ${isActive('/patients') 
                    ? 'bg-cyan-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'}
                `}
              >
                <Users size={20} />
                <span className={`ml-3 ${!isOpen && 'md:hidden'}`}>Patients</span>
              </Link>
            </li>
            <li>
              <Link
                to="/medical-records"
                className={`
                  flex items-center px-4 py-3 text-sm rounded-lg transition-colors
                  ${isActive('/medical-records') 
                    ? 'bg-cyan-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'}
                `}
              >
                <FileText size={20} />
                <span className={`ml-3 ${!isOpen && 'md:hidden'}`}>Medical Records</span>
              </Link>
            </li>
      
            <li>
              <Link
                to="/imaging"
                className={`
                  flex items-center px-4 py-3 text-sm rounded-lg transition-colors
                  ${isActive('/imaging') 
                    ? 'bg-cyan-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'}
                `}
              >
                <Image size={20} />
                <span className={`ml-3 ${!isOpen && 'md:hidden'}`}>Imaging</span>
              </Link>
            </li>
            <li>
              <Link
                to="/ai-assistant"
                className={`
                  flex items-center px-4 py-3 text-sm rounded-lg transition-colors
                  ${isActive('/ai-assistant') 
                    ? 'bg-cyan-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'}
                `}
              >
                <MessageSquare size={20} />
                <span className={`ml-3 ${!isOpen && 'md:hidden'}`}>AI Assistant</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 text-xs text-gray-400 mt-auto">
          <p className={!isOpen ? 'md:hidden' : ''}>© 2025 MediRecord Pro</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;