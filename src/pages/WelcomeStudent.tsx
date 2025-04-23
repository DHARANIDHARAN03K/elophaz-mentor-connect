
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const WelcomeStudent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <Card className="w-full shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
            <CheckCircle className="text-green-600 w-8 h-8" />
          </div>
          <CardTitle className="text-2xl text-elophaz-primary">Welcome to Elophaz!</CardTitle>
          <CardDescription>Your student account has been successfully created</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">What you can do now:</h3>
            <ul className="space-y-2 ml-6 list-disc">
              <li>Search and connect with mentors from your target colleges</li>
              <li>Schedule one-on-one meetings with mentors</li>
              <li>Get personalized advice on your college applications</li>
              <li>Learn about campus life and academic programs</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800">Pro Tip</h4>
            <p className="text-blue-700 text-sm">Complete your profile to get better mentor recommendations based on your interests and goals.</p>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3">
          <Button 
            onClick={() => navigate('/student/dashboard')} 
            className="w-full bg-elophaz-primary hover:bg-elophaz-primary/90"
          >
            Go to Your Dashboard
          </Button>
          <Button 
            onClick={() => navigate('/')} 
            variant="outline" 
            className="w-full"
          >
            Explore the Homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WelcomeStudent;
