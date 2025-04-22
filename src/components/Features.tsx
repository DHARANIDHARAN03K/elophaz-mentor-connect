
import React from 'react';
import { Shield, CreditCard, Users, Star } from 'lucide-react';
import { features } from '../utils/data';

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'shield-check':
      return <Shield className="h-8 w-8" />;
    case 'credit-card':
      return <CreditCard className="h-8 w-8" />;
    case 'user-circle':
      return <Users className="h-8 w-8" />;
    case 'star':
      return <Star className="h-8 w-8" />;
    default:
      return <Shield className="h-8 w-8" />;
  }
};

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-elophaz-primary">Elophaz</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get authentic college insights directly from current students through our trusted platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-elophaz-primary/10 text-elophaz-primary">
                {getIconComponent(feature.icon)}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-3 rounded-full bg-elophaz-light text-elophaz-primary font-medium">
            Join over 5000+ students who've found their perfect college match!
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
