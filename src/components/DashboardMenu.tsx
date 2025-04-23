
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, UserRound, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

type DashboardMenuProps = {
  role: "student" | "mentor";
  onLogout: () => void;
};

const DashboardMenu: React.FC<DashboardMenuProps> = ({ role, onLogout }) => {
  const navigate = useNavigate();

  // Set dashboard path based on role
  const dashboardPath = role === "mentor" ? "/mentor/dashboard" : "/student/dashboard";
  const profilePath = role === "mentor" ? "/mentor/dashboard/profile" : "/student/dashboard/profile";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-elophaz-primary text-elophaz-primary hover:bg-elophaz-primary/10"
        >
          <LayoutDashboard className="w-4 h-4 mr-2" />
          Dashboard
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(dashboardPath)}
        >
          <LayoutDashboard className="w-4 h-4" /> Dashboard Home
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(profilePath)}
        >
          <UserRound className="w-4 h-4" /> Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer text-red-500"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardMenu;
