import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Compass, User } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around py-3">
          <Link
            to="/"
            className={`flex flex-col items-center space-y-1 ${
              isActive('/') ? 'text-innerbhakti-orange' : 'text-gray-600'
            }`}
          >
            <BookOpen className="h-6 w-6" />
            <span className="text-xs">Guide</span>
          </Link>
          
          <Link
            to="/explore"
            className={`flex flex-col items-center space-y-1 ${
              isActive('/explore') ? 'text-innerbhakti-orange' : 'text-gray-600'
            }`}
          >
            <Compass className="h-6 w-6" />
            <span className="text-xs">Explore</span>
          </Link>
          
          <Link
            to="/profile"
            className={`flex flex-col items-center space-y-1 ${
              isActive('/profile') ? 'text-innerbhakti-orange' : 'text-gray-600'
            }`}
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Me</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;