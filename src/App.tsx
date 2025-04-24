
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MentorDashboard from "./pages/MentorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import WelcomeStudent from "./pages/WelcomeStudent";
import WelcomeMentor from "./pages/WelcomeMentor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/welcome/student" element={<WelcomeStudent />} />
          <Route path="/welcome/mentor" element={<WelcomeMentor />} />
          <Route path="/mentor/dashboard" element={<MentorDashboard />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
