
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { avatars } from '../utils/data';
import AuthModal from './AuthModal';

const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'student' | 'mentor'>('student');

  const openAuthModal = (mode: 'student' | 'mentor') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <section className="hero-gradient min-h-[90vh] py-16 px-4 md:px-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
      {/* Floating avatars background effect */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-20">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt="Anime avatar"
            className="absolute w-20 h-20 md:w-32 md:h-32 animate-float"
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              animationDelay: `${index * 0.7}s`,
            }}
          />
        ))}
      </div>
      
      <div className="z-10 max-w-3xl mx-auto md:mx-0 text-center md:text-left mb-10 md:mb-0">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="text-elophaz-primary">Connect</span> with real college mentors for{" "}
          <span className="text-elophaz-secondary">authentic insights</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
          Speak directly with current students from your dream colleges. Get honest advice on admissions, campus life, and academics.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-md mx-auto md:mx-0">
          <div className="relative flex-1">
            <Input
              placeholder="Search colleges or mentors..."
              className="pl-10 h-12 border-2 focus:border-elophaz-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <Button className="h-12 px-8 bg-elophaz-primary hover:bg-elophaz-primary/90">
            <Search className="mr-2 h-5 w-5" />
            <span>Search</span>
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Button
            className="h-12 px-8 bg-elophaz-secondary hover:bg-elophaz-secondary/90"
            onClick={() => openAuthModal('student')}
          >
            Join as Student
          </Button>
          <Button
            variant="outline"
            className="h-12 px-8 border-elophaz-primary text-elophaz-primary hover:bg-elophaz-primary/10"
            onClick={() => openAuthModal('mentor')}
          >
            Become a Mentor
          </Button>
        </div>
      </div>
      
      <div className="relative z-10 w-full md:w-2/5 flex justify-center">
        <div className="grid grid-cols-2 gap-4 md:gap-6 relative animate-float">
          {avatars.slice(0, 4).map((avatar, index) => (
            <div
              key={index}
              className="anime-shadow rounded-2xl bg-white p-2 transform"
              style={{
                transform: `rotate(${index % 2 === 0 ? '3' : '-3'}deg)`,
              }}
            >
              <img
                src={avatar}
                alt="Anime avatar"
                className="w-32 h-32 md:w-40 md:h-40 rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        mode={authMode} 
      />
    </section>
  );
};

export default Hero;
