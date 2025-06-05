
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigation('/')}
          >
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold  bg-clip-text text-black">
                🌱 Ecopoint
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, {user.username}
                </span>
                <div className="bg-green-100 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-green-800">
                    {user.points} pts
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => handleNavigation('/dashboard')}
                  className={location.pathname === '/dashboard' ? 'bg-green-50' : ''}
                >
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => handleNavigation('/login')}
                >
                  Login
                </Button>
                <Button 
                  onClick={() => handleNavigation('/register')}
                  className="eco-gradient text-white"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
