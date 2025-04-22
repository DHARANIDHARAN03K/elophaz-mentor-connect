
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'student' | 'mentor'>('student');
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('signup');

  // Open AuthModal in correct mode (student/mentor) and tab (signup/login)
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
          <a href="#features" className="text-gray-600 hover:text-elophaz-primary transition-colors">Features</a>
          <a href="#mentors" className="text-gray-600 hover:text-elophaz-primary transition-colors">Mentors</a>
          <a href="#faq" className="text-gray-600 hover:text-elophaz-primary transition-colors">FAQ</a>
          
          <div className="flex items-center gap-3">
            <Button 
              className="bg-elophaz-primary hover:bg-elophaz-primary/90"
              onClick={() => openAuthModal('mentor', 'signup')}
            >
              Become a Mentor
            </Button>
            <Button
              variant="outline"
              className="border-elophaz-primary text-elophaz-primary hover:bg-elophaz-primary/10"
              onClick={() => openAuthModal('student', 'signup')}
            >
              Sign Up
            </Button>
            <Button
              variant="ghost"
              className="text-elophaz-primary"
              onClick={() => openAuthModal('student', 'login')}
            >
              Log In
            </Button>
          </div>
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white z-40 shadow-md animate-fade-in py-4 px-6">
          <div className="flex flex-col gap-4">
            <a 
              href="#features" 
              className="text-gray-600 hover:text-elophaz-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#mentors" 
              className="text-gray-600 hover:text-elophaz-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Mentors
            </a>
            <a 
              href="#faq" 
              className="text-gray-600 hover:text-elophaz-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            
            <div className="flex flex-col gap-3 pt-2">
              <Button 
                className="bg-elophaz-primary hover:bg-elophaz-primary/90 w-full"
                onClick={() => openAuthModal('mentor', 'signup')}
              >
                Become a Mentor
              </Button>
              <Button
                variant="outline"
                className="border-elophaz-primary text-elophaz-primary hover:bg-elophaz-primary/10 w-full"
                onClick={() => openAuthModal('student', 'signup')}
              >
                Sign Up
              </Button>
              <Button
                variant="ghost"
                className="text-elophaz-primary w-full"
                onClick={() => openAuthModal('student', 'login')}
              >
                Log In
              </Button>
            </div>
          </div>
        </div>
      )}

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
