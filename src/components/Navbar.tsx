
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';
import DashboardMenu from './DashboardMenu';
import NavbarLinks from './NavbarLinks';
import AuthButtons from './AuthButtons';
import MobileMenu from './MobileMenu';
import { useLocation } from 'react-router-dom';

// Simulate getting user and role from localStorage.
// Replace with your actual Supabase logic when ready.
const getCurrentUser = () => {
  return window.localStorage.getItem("userRole"); // 'student' | 'mentor' | null
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'student' | 'mentor'>('student');
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('signup');
  // Add state to track user role
  const [userRole, setUserRole] = useState<"student" | "mentor" | null>(null);

  // Update userRole immediately on component mount and when localStorage changes
  useEffect(() => {
    const checkUserRole = () => {
      const currentRole = getCurrentUser();
      setUserRole(currentRole as "student" | "mentor" | null);
    };

    // Check on mount and when component re-renders
    checkUserRole();

    // Listen for storage events (when localStorage changes in other tabs)
    window.addEventListener('storage', checkUserRole);
    
    // Custom event for when we update localStorage ourselves
    window.addEventListener('userRoleChanged', checkUserRole);
    
    return () => {
      window.removeEventListener('storage', checkUserRole);
      window.removeEventListener('userRoleChanged', checkUserRole);
    };
  }, []);

  // Force a role check on every route change
  useEffect(() => {
    const currentRole = getCurrentUser();
    setUserRole(currentRole as "student" | "mentor" | null);
  }, [location.pathname]);

  // Logout handler 
  const handleLogout = () => {
    // Remove user info
    window.localStorage.removeItem("userRole");
    
    // Trigger a re-render by updating the state
    setUserRole(null);
    
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('userRoleChanged'));
    
    window.location.href = "/";
  };

  // Open AuthModal in correct mode and tab
  const openAuthModal = (
    mode: 'student' | 'mentor',
    tab: 'signup' | 'login' = 'signup'
  ) => {
    setAuthMode(mode);
    setAuthTab(tab);
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full py-4 px-4 md:px-10 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-elophaz-primary flex items-center gap-2">
            <span className="text-elophaz-secondary">Elophaz</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavbarLinks userRole={userRole} handleLogout={handleLogout} />

          {!userRole && <AuthButtons openAuthModal={openAuthModal} />}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <X className="h-6 w-6 text-elophaz-primary" />
          ) : (
            <Menu className="h-6 w-6 text-elophaz-primary" />
          )}
        </button>
      </nav>

      <MobileMenu
        userRole={userRole}
        handleLogout={handleLogout}
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        openAuthModal={openAuthModal}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        mode={authMode} 
        tabDefault={authTab}
      />
    </>
  );
};

export default Navbar;
