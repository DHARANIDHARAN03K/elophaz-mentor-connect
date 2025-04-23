
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';
import DashboardMenu from './DashboardMenu';

// Simulate getting user and role from props, context, or Supabase.
// Replace with your actual Supabase logic.
const getCurrentUser = () => {
  // Example: adapt this for Supabase
  // return { role: 'student', email: 'student@email.com' } or null
  // Replace this logic with supabase.auth.getUser() and your roles logic
  return window.localStorage.getItem("userRole") // 'student' | 'mentor' | null
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'student' | 'mentor'>('student');
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('signup');

  // Simulated user auth and role (replace this with your actual logic)
  const userRole = getCurrentUser() as "student" | "mentor" | null;

  // Logout handler (replace with your real logic, e.g., Supabase signOut)
  const handleLogout = () => {
    // Remove user info (adapt this to your auth)
    window.localStorage.removeItem("userRole");
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

  // Navigation links for role
  const studentLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "#features" },
    { label: "Mentors", href: "#mentors" },
    { label: "FAQ", href: "#faq" },
    { label: "Dashboard", href: "/student/dashboard" },
    { label: "Logout", action: handleLogout },
  ];
  const mentorLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
    { label: "Dashboard", href: "/mentor/dashboard" },
    { label: "Logout", action: handleLogout },
  ];

  // Hide Dashboard/Logout nav links when using DashboardMenu (desktop)
  const desktopStudentLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "#features" },
    { label: "Mentors", href: "#mentors" },
    { label: "FAQ", href: "#faq" },
  ];
  const desktopMentorLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ];

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
          {/* Show correct links based on role */}
          {(userRole === "student"
            ? desktopStudentLinks
            : userRole === "mentor"
            ? desktopMentorLinks
            : desktopStudentLinks
          ).map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-600 hover:text-elophaz-primary transition-colors"
            >
              {link.label}
            </a>
          ))}

          {userRole && (
            <DashboardMenu role={userRole} onLogout={handleLogout} />
          )}

          {!userRole && (
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
          )}
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
            {/* Show ALL links in mobile, including Dashboard/Logout */}
            {(userRole === "student"
              ? studentLinks
              : userRole === "mentor"
              ? mentorLinks
              : desktopStudentLinks
            ).map((link) => (
              link.action ? (
                <button
                  key={link.label}
                  onClick={() => {
                    link.action && link.action();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-600 hover:text-elophaz-primary transition-colors py-2 text-left"
                >
                  {link.label}
                </button>
              ) : (
                <a 
                  key={link.label}
                  href={link.href}
                  className="text-gray-600 hover:text-elophaz-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              )
            ))}

            {userRole && (
              <div className="flex flex-col gap-3 pt-2">
                <DashboardMenu role={userRole} onLogout={handleLogout} />
              </div>
            )}

            {!userRole && (
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
            )}
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
