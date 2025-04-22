
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AvatarSelection from './AvatarSelection';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'student' | 'mentor';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode }) => {
  const [selectedTab, setSelectedTab] = useState<'login' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication for demo purposes
    if (selectedTab === 'signup' && (!name || !email || !password || (mode === 'mentor' && !college))) {
      toast({
        title: "Please complete all fields",
        description: "All fields are required to create an account.",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedTab === 'login' && (!email || !password)) {
      toast({
        title: "Please enter email and password",
        description: "Both fields are required to log in.",
        variant: "destructive",
      });
      return;
    }
    
    // Show success message
    toast({
      title: selectedTab === 'login' ? "Login successful" : "Account created!",
      description: selectedTab === 'login' 
        ? "Welcome back to Elophaz!" 
        : `Your ${mode} account has been created successfully.`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-1">
            {mode === 'student' ? 'Join as Student' : 'Become a Mentor'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {mode === 'student' 
              ? 'Connect with college mentors for authentic insights' 
              : 'Share your college experience and earn by helping students'
            }
          </DialogDescription>
        </DialogHeader>

        <Tabs 
          defaultValue={selectedTab} 
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value as 'login' | 'signup')} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Log In</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signup">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Create a secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                  </div>
                  
                  {mode === 'mentor' && (
                    <div className="space-y-1">
                      <Label htmlFor="college">College/University</Label>
                      <Input 
                        id="college" 
                        placeholder="Your college name" 
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <AvatarSelection 
                    selectedAvatar={selectedAvatar}
                    onSelect={setSelectedAvatar} 
                  />
                </div>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-elophaz-primary hover:bg-elophaz-primary/90"
              >
                Create Account
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </TabsContent>
          
          <TabsContent value="login">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="login-email">Email</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <a href="#" className="text-xs text-elophaz-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input 
                    id="login-password" 
                    type="password" 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </div>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-elophaz-primary hover:bg-elophaz-primary/90"
              >
                Log In
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
