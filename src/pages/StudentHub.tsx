import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, BarChart3, Trophy, Home, LogOut, Linkedin, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function StudentHub() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-8">
      {/* Header with Logout */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-center flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
          <h1 className="text-3xl font-bold">Student Hub</h1>
          <p className="text-muted-foreground mt-2">Access your profile and track activities</p>
        </div>
        <Button onClick={handleLogout} variant="outline" className="gap-2">
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>

      {/* Four Main Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Profile Section */}
        <Card className="overflow-hidden shadow-card">
          <div className="h-32 bg-gradient-to-r from-blue-200 to-blue-100 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Student Profile</h2>
              <p className="text-muted-foreground">
                View and manage your academic and personal information.
              </p>
            </div>
            
            <Link to="/portfolio" className="block">
              <Button className="w-full justify-center gap-2 bg-blue-500 hover:bg-blue-600" size="lg">
                Go to Profile
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Activity Tracker Section */}
        <Card className="overflow-hidden shadow-card">
          <div className="h-32 bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
            <div className="relative w-24 h-24 rounded-full bg-white/30 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-success flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="absolute left-4 top-4 w-8 h-10 bg-white/40 rounded-sm transform rotate-12"></div>
            <div className="absolute right-6 bottom-4 w-12 h-1 bg-green-300/60 rounded-full transform -rotate-12"></div>
          </div>
          
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Activity Tracker</h2>
              <p className="text-muted-foreground">
                Track your participation in various campus activities and events.
              </p>
            </div>
            
            <Link to="/activities" className="block">
              <Button className="w-full justify-center gap-2 bg-green-500 hover:bg-green-600" size="lg">
                View Activities
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Achievement Section */}
        <Card className="overflow-hidden shadow-card">
          <div className="h-32 bg-gradient-to-r from-yellow-100 to-amber-100 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
            <div className="relative w-24 h-24 rounded-full bg-white/30 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="absolute left-4 top-4 w-6 h-6 bg-yellow-300/60 rounded-full"></div>
            <div className="absolute right-6 bottom-4 w-4 h-4 bg-amber-300/60 rounded-full"></div>
          </div>
          
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Achievements</h2>
              <p className="text-muted-foreground">
                View your badges, certificates, and academic milestones.
              </p>
            </div>
            
            <Link to="/gamification" className="block">
              <Button className="w-full justify-center gap-2 bg-yellow-500 hover:bg-yellow-600" size="lg">
                View Achievements
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Student Dashboard Section */}
        <Card className="overflow-hidden shadow-card">
          <div className="h-32 bg-gradient-to-r from-purple-100 to-indigo-100 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
            <div className="relative w-24 h-24 rounded-full bg-white/30 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                <Home className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="absolute left-4 top-4 w-8 h-8 bg-purple-300/60 rounded-lg transform rotate-45"></div>
            <div className="absolute right-6 bottom-4 w-6 h-6 bg-indigo-300/60 rounded-lg transform -rotate-12"></div>
          </div>
          
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Student Dashboard</h2>
              <p className="text-muted-foreground">
                Access your comprehensive academic dashboard and analytics.
              </p>
            </div>
            
            <Link to="/dashboard" className="block">
              <Button className="w-full justify-center gap-2 bg-purple-500 hover:bg-purple-600" size="lg">
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* LinkedIn Integration Section */}
      <Card className="shadow-card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Linkedin className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Integrate Profile with LinkedIn</h3>
                <p className="text-muted-foreground">Connect your academic achievements with your professional profile</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Connect LinkedIn
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}