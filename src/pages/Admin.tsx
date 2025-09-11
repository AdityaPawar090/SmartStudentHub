import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Shield,
  TrendingUp,
  FileText,
  BarChart3,
  Search,
  Filter,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const stats = [
  { title: "Total Users", value: "1,234", icon: Users, color: "text-warning" },
  { title: "Verified Certificates", value: "567", icon: Shield, color: "text-primary" },
  { title: "Placement Rate", value: "85%", icon: TrendingUp, color: "text-success" },
  { title: "Active Students", value: "892", icon: Users, color: "text-accent" },
];

const analyticsReports = [
  {
    title: "Student Analytics",
    description: "Track progress",
    icon: BarChart3,
  },
  {
    title: "Generate Reports", 
    description: "For NAAC/AICTE",
    icon: FileText,
  },
];

const recentStudents = [
  {
    id: "CS2021001",
    name: "Alice Johnson",
    department: "Computer Science",
    gpa: "3.8",
    activities: 28,
    status: "active",
  },
  {
    id: "ME2021045",
    name: "Bob Smith",
    department: "Mechanical Engineering", 
    gpa: "3.6",
    activities: 22,
    status: "active",
  },
  {
    id: "EE2021089",
    name: "Carol Davis",
    department: "Electrical Engineering",
    gpa: "3.9",
    activities: 31,
    status: "pending",
  },
];

export default function Admin() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage student records, verify activities, and oversee platform functionality</p>
        </div>
        <Button onClick={handleLogout} variant="outline">
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card hover:shadow-floating transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-background ${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Find Students */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Find Students</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Badge variant="secondary" className="px-3 py-2">Skills</Badge>
              <Badge variant="secondary" className="px-3 py-2">Achievements</Badge>
              <Badge variant="secondary" className="px-3 py-2">Department</Badge>
            </div>
          </div>

          {/* Student List */}
          <div className="space-y-3">
            {recentStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm text-muted-foreground">{student.id} • {student.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-medium">{student.gpa}</div>
                    <div className="text-muted-foreground">GPA</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{student.activities}</div>
                    <div className="text-muted-foreground">Activities</div>
                  </div>
                  <Badge variant={student.status === "active" ? "default" : "secondary"}>
                    {student.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics & Reports */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Analytics & Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analyticsReports.map((report) => (
              <div key={report.title} className="text-center p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="inline-flex p-4 bg-accent/10 rounded-full mb-4">
                  <report.icon className="h-8 w-8 text-accent" />
                </div>
                <h4 className="font-medium mb-2">{report.title}</h4>
                <p className="text-sm text-muted-foreground">{report.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}