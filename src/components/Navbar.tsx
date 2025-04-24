import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import DashboardMenu from './DashboardMenu';
import NavbarLinks from './NavbarLinks';
import AuthButtons from './AuthButtons';
import MobileMenu from './MobileMenu';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'student' | 'mentor'>('student');
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('signup');
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      window.location.href = "/";
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
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

  const userRole = user?.customClaims?.role || localStorage.getItem("userRole");

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
          {!user && <AuthButtons openAuthModal={openAuthModal} />}
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
