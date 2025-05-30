
import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  isMobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ 
  to, 
  children, 
  onClick,
  isMobile = false 
}) => {
  // Unified styling for all navigation links
  const navLinkClass = 
    "px-6 py-4 text-base font-medium transition-colors hover:bg-gray-100";
  
  const activeClass = "text-primary border-b-2 border-primary";

  // Mobile navigation styling
  const mobileNavLinkClass = 
    "block w-full px-6 py-4 text-base font-medium border-b border-gray-100 hover:bg-gray-50 transition-colors";

  const mobileActiveClass = "bg-gray-50 text-primary";

  return (
    <RouterNavLink 
      to={to} 
      className={({ isActive }) => 
        isMobile 
          ? `${mobileNavLinkClass} ${isActive ? mobileActiveClass : ''}`
          : `${navLinkClass} ${isActive ? activeClass : ''}`
      }
      onClick={onClick}
    >
      {children}
    </RouterNavLink>
  );
};

export default NavLink;
