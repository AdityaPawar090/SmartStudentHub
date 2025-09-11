import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  Calendar,
  Users,
  Trophy,
  Plus,
  ChevronRight,
  Award,
  Upload,
  CheckCircle,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const upcomingEvents = [
  {
    id: 1,
    title: "AI Workshop",
    club: "Tech Club",
    date: "Oct 26, 2024 • 2:00 PM",
    image: "🤖",
  },
  {
    id: 2,
    title: "Coding Challenge",
    club: "Tech Club", 
    date: "Nov 15, 2024 • 10:00 AM",
    image: "💻",
  },
];

const participationRequests = [
  {
    id: 1,
    name: "Ethan Harper",
    event: "AI Workshop",
    avatar: "EH",
  },
  {
    id: 2,
    name: "Olivia Bennett", 
    event: "Coding Challenge",
    avatar: "OB",
  },
];

const leaderboards = [
  {
    id: 1,
    title: "AI Workshop",
    icon: "🏆",
  },
  {
    id: 2,
    title: "Coding Challenge", 
    icon: "🏆",
  },
];

export default function ClubDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
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
          <h1 className="text-3xl font-bold">Club Dashboard</h1>
          <p className="text-muted-foreground">Manage events and track student participation</p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search profiles..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Skills
              </Button>
              <Button variant="outline" className="gap-2">
                <Award className="h-4 w-4" />
                Achievements
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="p-3 bg-primary/10 rounded-lg text-2xl">
                {event.image}
              </div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground">{event.club}</div>
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-muted-foreground">{event.date}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Participation Requests */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Participation Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {participationRequests.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-primary text-white">
                    {request.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{request.name}</h4>
                  <p className="text-sm text-muted-foreground">{request.event}</p>
                </div>
              </div>
              <Button size="sm">
                Approve
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
              <div className="p-3 rounded-lg bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Upload Attendance Sheet</h4>
                <p className="text-sm text-muted-foreground mb-3">Digitize attendance records with OCR technology.</p>
                <Button className="w-full sm:w-auto">
                  Upload
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
              <div className="p-3 rounded-lg bg-primary/10">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Verify Certificates</h4>
                <p className="text-sm text-muted-foreground mb-3">Ensure authenticity of student achievements.</p>
                <Button className="w-full sm:w-auto">
                  Verify
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboards */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Leaderboards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {leaderboards.map((leaderboard) => (
            <div key={leaderboard.id} className="flex items-center justify-between p-4 bg-warning/5 border border-warning/20 rounded-lg hover:bg-warning/10 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{leaderboard.icon}</div>
                <span className="font-medium">{leaderboard.title}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}