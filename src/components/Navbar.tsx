
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

// Import refactored components
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import LanguageToggle from './navbar/LanguageToggle';

export const Navbar: React.FC = () => {
  const { profile } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center px-6">
            <span className="text-xl font-bold text-primary">CISM.KZ</span>
          </Link>

          {/* Desktop navigation */}
          <DesktopNav />

          {/* Right menu section (language, auth) */}
          <div className="flex items-center">
            <LanguageToggle />

            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-4 text-gray-600"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onItemClick={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
};
