import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-cyan-700 to-teal-600 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-4 p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl md:text-2xl font-bold">MediRecord Pro</h1>
        </div>
        
        {user && (
          <div className="flex items-center">
            <div className="hidden md:flex mr-4 items-center">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-8 h-8 rounded-full object-cover mr-2"
              />
              <span className="font-medium">{user.name}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center"
              aria-label="Logout"
            >
              <LogOut size={20} />
              <span className="ml-1 hidden md:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;