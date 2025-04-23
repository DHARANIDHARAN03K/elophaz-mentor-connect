
import React from "react";
import { Button } from "@/components/ui/button";

interface AuthButtonsProps {
  openAuthModal: (mode: 'student' | 'mentor', tab?: 'signup' | 'login') => void;
  className?: string;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ openAuthModal, className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
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
);

export default AuthButtons;
