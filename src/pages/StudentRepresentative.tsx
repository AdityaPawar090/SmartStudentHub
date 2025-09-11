import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Users, Home, BarChart3, FileText, Trophy, LogOut, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function StudentRepresentative() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-8">
      {/* Header */}
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
          <h1 className="text-3xl font-bold">Student Representative</h1>
          <p className="text-muted-foreground mt-2">Manage activities and oversee platform functionality</p>
        </div>
        <Button onClick={handleLogout} variant="outline">
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>

      {/* Admin Section */}
      <Card className="overflow-hidden shadow-card">
        <div className="h-32 bg-gradient-to-r from-green-200 to-emerald-100 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
              <Settings className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
        
        <CardContent className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Admin</h2>
            <p className="text-muted-foreground">
              Manage student records, verify activities, and oversee the platform's functionality.
            </p>
          </div>
          
          <Link to="/admin" className="block">
            <Button className="w-full justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold" size="lg">
              Proceed as Admin
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Club Representative Section */}
      <Card className="overflow-hidden shadow-card">
        <div className="h-32 bg-gradient-to-r from-orange-200 to-amber-100 flex items-center justify-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
          <div className="relative w-24 h-24 rounded-full bg-white/30 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-success flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute left-4 top-4 w-8 h-10 bg-white/40 rounded-sm transform rotate-12"></div>
          <div className="absolute right-6 bottom-4 w-12 h-1 bg-orange-300/60 rounded-full transform -rotate-12"></div>
        </div>
        
        <CardContent className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Club Representative</h2>
            <p className="text-muted-foreground">
              Update club activities, manage events, and engage with students.
            </p>
          </div>
          
          <Link to="/club" className="block">
            <Button className="w-full justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold" size="lg">
              Proceed as Club Rep
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}