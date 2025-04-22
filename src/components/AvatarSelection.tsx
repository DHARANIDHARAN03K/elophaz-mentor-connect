
import React, { useState } from 'react';
import { avatars } from '../utils/data';
import { Check } from 'lucide-react';

interface AvatarSelectionProps {
  onSelect: (avatar: string) => void;
  selectedAvatar?: string;
}

const AvatarSelection: React.FC<AvatarSelectionProps> = ({ onSelect, selectedAvatar }) => {
  const [hoveredAvatar, setHoveredAvatar] = useState<string | null>(null);

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-3">Choose your anime avatar</h3>
      <div className="grid grid-cols-4 gap-3">
        {avatars.map((avatar, index) => (
          <div 
            key={index} 
            className={`
              relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all
              ${selectedAvatar === avatar ? 'border-elophaz-primary ring-2 ring-elophaz-primary/30' : 'border-transparent hover:border-elophaz-primary/50'}
            `}
            onClick={() => onSelect(avatar)}
            onMouseEnter={() => setHoveredAvatar(avatar)}
            onMouseLeave={() => setHoveredAvatar(null)}
          >
            <img 
              src={avatar} 
              alt={`Avatar option ${index + 1}`} 
              className="w-full h-auto aspect-square object-cover"
            />
            
            {selectedAvatar === avatar && (
              <div className="absolute inset-0 bg-elophaz-primary/20 flex items-center justify-center">
                <div className="bg-elophaz-primary rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
              </div>
            )}
            
            {hoveredAvatar === avatar && selectedAvatar !== avatar && (
              <div className="absolute inset-0 bg-black/10 transition-opacity" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelection;
