
import React from "react";
import { Button } from "@/components/ui/button";
import DashboardMenu from "./DashboardMenu";
import AuthButtons from "./AuthButtons";

type Link = {
  label: string;
  href?: string;
  action?: () => void;
};

interface MobileMenuProps {
  userRole: "student" | "mentor" | null;
  handleLogout: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openAuthModal: (mode: 'student' | 'mentor', tab?: 'signup' | 'login') => void;
}

const studentLinks: Link[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Mentors", href: "#mentors" },
  { label: "FAQ", href: "#faq" },
  { label: "Dashboard", href: "/student/dashboard" },
  { label: "Logout", action: undefined }, // The action will be set below
];

const mentorLinks: Link[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "Dashboard", href: "/mentor/dashboard" },
  { label: "Logout", action: undefined },
];

const desktopStudentLinks: Link[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Mentors", href: "#mentors" },
  { label: "FAQ", href: "#faq" },
];

// Helper function to inject logout action
const addLogoutAction = (links: Link[], handleLogout: () => void) =>
  links.map((link) =>
    link.label === "Logout"
      ? { ...link, action: handleLogout }
      : link
  );

const MobileMenu: React.FC<MobileMenuProps> = ({
  userRole,
  handleLogout,
  isOpen,
  setIsOpen,
  openAuthModal
}) => {
  const links = userRole === "student"
    ? addLogoutAction(studentLinks, handleLogout)
    : userRole === "mentor"
    ? addLogoutAction(mentorLinks, handleLogout)
    : desktopStudentLinks;

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed top-16 left-0 right-0 bg-white z-40 shadow-md animate-fade-in py-4 px-6">
      <div className="flex flex-col gap-4">
        {links.map((link) =>
          link.action ? (
            <button
              key={link.label}
              onClick={() => {
                link.action && link.action();
                setIsOpen(false);
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
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          )
        )}
        {userRole && (
          <div className="flex flex-col gap-3 pt-2">
            <DashboardMenu role={userRole} onLogout={handleLogout} />
          </div>
        )}
        {!userRole && (
          <div className="flex flex-col gap-3 pt-2">
            <AuthButtons openAuthModal={openAuthModal} className="w-full flex-col gap-2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
