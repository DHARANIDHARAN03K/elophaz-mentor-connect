
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
import { Google } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'student' | 'mentor';
  tabDefault?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, tabDefault = 'signup' }) => {
  const [selectedTab, setSelectedTab] = useState<'login' | 'signup'>(tabDefault);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [collegeIdFile, setCollegeIdFile] = useState<File | null>(null);
  const [collegeIdFileName, setCollegeIdFileName] = useState('');
  const [collegeMail, setCollegeMail] = useState('');
  const [linkedinId, setLinkedinId] = useState('');

  const { toast } = useToast();

  const handleCollegeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCollegeIdFile(file);
      setCollegeIdFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedTab === 'signup') {
      if (
        !name ||
        !email ||
        !password ||
        (mode === 'mentor' && !college) ||
        (mode === 'mentor' && !collegeIdFile)
      ) {
        toast({
          title: "Please complete all fields",
          description:
            "All fields are required to create an account. Mentor Verification requires College ID.",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (selectedTab === 'login' && (!email || !password)) {
      toast({
        title: "Please enter email and password",
        description: "Both fields are required to log in.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: selectedTab === 'login' ? "Login successful" : "Account created!",
      description:
        selectedTab === 'login'
          ? "Welcome back to Elophaz!"
          : `Your ${mode} account has been created successfully.`,
    });
    
    setCollegeIdFile(null);
    setCollegeIdFileName('');
    setCollegeMail('');
    setLinkedinId('');
    
    onClose();
  };

  const handleGoogleSignup = () => {
    toast({
      title: 'Google Sign Up',
      description: 'Google sign up not yet implemented.',
      variant: 'default'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
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
          defaultValue={tabDefault} 
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value as 'login' | 'signup')} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Log In</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signup">
            {/* Google Signup Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center border border-gray-200 gap-2 mb-4 bg-white hover:bg-gray-50 text-gray-800"
              onClick={handleGoogleSignup}
            >
              <Google className="mr-2" />
              Sign up with Google
            </Button>
            {/* Divider */}
            <div className="flex items-center my-2 gap-2">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>
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
              
              {mode === 'mentor' && (
                <div className="mt-6 border rounded-lg p-4 bg-gray-50 space-y-4 shadow-inner">
                  <h4 className="font-semibold text-base flex items-center gap-2 mb-2">
                    Mentor Verification
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <Label className="flex items-center gap-1" htmlFor="collegeId">
                        <span>College ID <span className="text-red-500">*</span></span>
                      </Label>
                      <div className="flex items-center gap-3 mt-1">
                        <label
                          htmlFor="collegeId"
                          className="cursor-pointer flex items-center gap-2 px-3 py-2 bg-white border-2 border-dashed border-elophaz-primary rounded-md hover:bg-elophaz-primary/10 transition-colors"
                        >
                          <input
                            id="collegeId"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={handleCollegeIdChange}
                            required
                          />
                          <span className="pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-1" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="14" x="3" y="5" rx="2"/><path d="M7 16V7M17 16v-6m0-2V7m-10 0V6"/></svg>
                            Upload File
                          </span>
                          <span className="text-sm text-gray-600">{collegeIdFileName || 'No file chosen'}</span>
                        </label>
                      </div>
                      <span className="block text-xs text-gray-500 mt-1">
                        Upload your valid college ID card/photo (PDF, JPG, PNG)
                      </span>
                    </div>
                    <div>
                      <Label htmlFor="collegeMail" className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-1" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M16 8a6 6 0 0 1 6 6v6H2v-6a6 6 0 0 1 6-6h8Z"/><circle cx="8.5" cy="10.5" r=".5"/><rect x="8" y="12" width="1.5" height="4.5"/></svg>
                        College Email (optional)
                      </Label>
                      <Input
                        id="collegeMail"
                        type="email"
                        placeholder="your.college@email.edu"
                        value={collegeMail}
                        onChange={(e) => setCollegeMail(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedinId" className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-1" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M16 8a6 6 0 0 1 6 6v6H2v-6a6 6 0 0 1 6-6h8Z"/><circle cx="8.5" cy="10.5" r=".5"/><rect x="8" y="12" width="1.5" height="4.5"/></svg>
                        LinkedIn Profile (optional)
                      </Label>
                      <Input
                        id="linkedinId"
                        type="text"
                        placeholder="https://linkedin.com/in/username"
                        value={linkedinId}
                        onChange={(e) => setLinkedinId(e.target.value)}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Only verified mentors can offer paid calls.
                  </p>
                </div>
              )}
              
              <div className="pt-2 pb-6">
                <Button 
                  type="submit"
                  className="w-full bg-elophaz-primary hover:bg-elophaz-primary/90"
                >
                  Create Account
                </Button>
              </div>
              
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

