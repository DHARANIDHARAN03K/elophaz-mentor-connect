
import React from "react";
import DashboardMenu from "./DashboardMenu";

type Link = {
  label: string;
  href?: string;
  action?: () => void;
};

interface NavbarLinksProps {
  userRole: "student" | "mentor" | null;
  handleLogout: () => void;
}

const studentLinks: Link[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Mentors", href: "#mentors" },
  { label: "FAQ", href: "#faq" },
];

const mentorLinks: Link[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

const NavbarLinks: React.FC<NavbarLinksProps> = ({ userRole, handleLogout }) => {
  const links = userRole === "student" 
    ? studentLinks
    : userRole === "mentor"
    ? mentorLinks
    : studentLinks;

  return (
    <>
      {links.map((link) => (
        <a key={link.label} href={link.href} className="text-gray-600 hover:text-elophaz-primary transition-colors">
          {link.label}
        </a>
      ))}
      {userRole && (
        <DashboardMenu role={userRole} onLogout={handleLogout} />
      )}
    </>
  );
};

export default NavbarLinks;
