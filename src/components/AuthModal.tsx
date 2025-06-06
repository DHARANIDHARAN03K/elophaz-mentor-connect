import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Facebook } from 'lucide-react';

const GoogleIcon = () => (
  <svg className="mr-2" width="20" height="20" viewBox="0 0 48 48">
    <g>
      <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.8 33.4 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.4-.2-3.5z"/>
      <path fill="#34A853" d="M6.3 14.6l7 5.1C15.4 17.1 19.3 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.6 6 29.6 4 24 4 15.9 4 8.6 9.9 6.3 14.6z"/>
      <path fill="#FBBC05" d="M24 44c5.3 0 9.7-1.7 12.8-4.6l-5.9-4.8c-2.1 1.5-5 2.4-6.9 2.4-6.1 0-11.2-4.1-13.1-9.7l-6.7 5.2C8.3 42.2 15.4 44 24 44z"/>
      <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.4 3.6-4.7 6.2-11.7 6.2-7.2 0-13.2-5.8-13.2-13S16.8 8 24 8c3.6 0 6.9 1.3 9.5 3.4l7.2-7.2C36.4 2 30.6 0 24 0 10.8 0 0 10.8 0 24c0 13.2 10.8 24 24 24 13.2 0 24-10.8 24-24 0-1.7-.2-3.3-.5-5z"/>
    </g>
  </svg>
);

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
  const navigate = useNavigate();

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
    
    window.localStorage.setItem("userRole", mode);
    
    // Ensure the userRoleChanged event is dispatched properly
    window.dispatchEvent(new CustomEvent('userRoleChanged'));
    
    toast({
      title: selectedTab === 'login' ? "Login successful" : "Account created!",
      description:
        selectedTab === 'login'
          ? "Welcome back to Elophaz!"
          : `Your ${mode} account has been created successfully.`,
    });
    
    // Reset form fields
    setCollegeIdFile(null);
    setCollegeIdFileName('');
    setCollegeMail('');
    setLinkedinId('');
    
    onClose();
    
    // Modify the redirection logic here to go to a different page after signup vs login
    if (selectedTab === 'signup') {
      // After signup, go to welcome page route for each user type
      if (mode === 'student') {
        navigate('/welcome/student'); // You'll create this route
      } else {
        navigate('/welcome/mentor'); // You'll create this route
      }
    } else {
      // For login, keep the original dashboard redirect
      const redirectPath = mode === 'mentor' ? '/mentor/dashboard' : '/student/dashboard';
      navigate(redirectPath);
    }
  };

  const handleGoogleSignup = () => {
    window.localStorage.setItem("userRole", mode);
    
    // Ensure the userRoleChanged event is dispatched properly
    window.dispatchEvent(new CustomEvent('userRoleChanged'));
    
    toast({
      title: 'Google Sign Up',
      description: 'Google sign up not yet implemented.',
      variant: 'default'
    });
    
    // Modify the Google sign up redirect to also go to welcome pages
    if (selectedTab === 'signup') {
      const welcomePath = mode === 'mentor' ? '/welcome/mentor' : '/welcome/student';
      navigate(welcomePath);
    } else {
      const dashboardPath = mode === 'mentor' ? '/mentor/dashboard' : '/student/dashboard';
      navigate(dashboardPath);
    }
    
    onClose();
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
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center border border-gray-200 gap-2 mb-2 bg-white hover:bg-gray-50 text-gray-800"
              onClick={handleGoogleSignup}
            >
              <GoogleIcon />
              Sign up with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center border border-gray-200 gap-2 mb-4 bg-white hover:bg-gray-50 text-gray-800"
              onClick={() => toast({
                title: 'Facebook Sign Up',
                description: 'Facebook sign up not yet implemented.',
                variant: 'default'
              })}
            >
              <Facebook className="mr-2" />
              Sign up with Facebook
            </Button>
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
