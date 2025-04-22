
import React from 'react';
import { Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MentorCardProps {
  id: string;
  name: string;
  college: string;
  department: string;
  year: number;
  avatar: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  ratePerCall: number;
  bio: string;
}

const MentorCard: React.FC<MentorCardProps> = ({ 
  id, 
  name, 
  college, 
  department, 
  year, 
  avatar, 
  rating, 
  reviewCount, 
  verified, 
  ratePerCall, 
  bio 
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 card-hover">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 md:w-1/3 flex flex-col items-center justify-center bg-elophaz-light/30">
          <div className="relative">
            <img 
              src={avatar} 
              alt={`${name}'s avatar`}
              className="w-24 h-24 rounded-full mb-4 anime-shadow" 
            />
            {verified && (
              <span className="verified-badge absolute -bottom-1 -right-1 px-2 py-0.5 flex items-center gap-0.5 text-xs">
                <Check className="h-3 w-3" /> Verified
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold mb-1">{name}</h3>
          <p className="text-sm text-gray-600 text-center mb-2">{department}, Year {year}</p>
          <p className="text-sm font-medium text-center mb-3">{college}</p>
          
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400 mr-1" />
              <span className="font-medium">{rating}</span>
            </div>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-600">{reviewCount} reviews</span>
          </div>
          
          <Button className="w-full bg-elophaz-primary hover:bg-elophaz-primary/90">
            ₹{ratePerCall} per 30-min call
          </Button>
        </div>
        
        <div className="p-6 md:w-2/3">
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">About Me</h4>
            <p className="text-gray-700">{bio}</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2">I can help with:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-elophaz-light rounded-full text-sm text-elophaz-primary">Admissions</span>
              <span className="px-3 py-1 bg-elophaz-light rounded-full text-sm text-elophaz-primary">Campus Life</span>
              <span className="px-3 py-1 bg-elophaz-light rounded-full text-sm text-elophaz-primary">Academics</span>
              <span className="px-3 py-1 bg-elophaz-light rounded-full text-sm text-elophaz-primary">Placements</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
