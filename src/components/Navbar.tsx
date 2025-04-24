import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';
import DashboardMenu from './DashboardMenu';
import NavbarLinks from './NavbarLinks';
import AuthButtons from './AuthButtons';
import MobileMenu from './MobileMenu';
import { useLocation } from 'react-router-dom';

const getCurrentUser = () => {
  return window.localStorage.getItem("userRole"); // 'student' | 'mentor' | null
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'student' | 'mentor'>('student');
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('signup');
  const [userRole, setUserRole] = useState<"student" | "mentor" | null>(null);

  useEffect(() => {
    const checkUserRole = () => {
      const currentRole = getCurrentUser();
      setUserRole(currentRole as "student" | "mentor" | null);
    };

    checkUserRole();
    window.addEventListener('storage', checkUserRole);
    window.addEventListener('userRoleChanged', checkUserRole);
    
    return () => {
      window.removeEventListener('storage', checkUserRole);
      window.removeEventListener('userRoleChanged', checkUserRole);
    };
  }, []);

  useEffect(() => {
    const currentRole = getCurrentUser();
    setUserRole(currentRole as "student" | "mentor" | null);
  }, [location.pathname]);

  const handleLogout = () => {
    window.localStorage.removeItem("userRole");
    setUserRole(null);
    window.dispatchEvent(new CustomEvent('userRoleChanged'));
    window.location.href = "/";
  };

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

        <div className="hidden md:flex items-center gap-6">
          <NavbarLinks userRole={userRole} handleLogout={handleLogout} />

          {!userRole && <AuthButtons openAuthModal={openAuthModal} />}
        </div>

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
