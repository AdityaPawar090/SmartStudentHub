import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const userRoles = [
  {
    title: "Student",
    description: "Track your activities and complete your profile",
    icon: "👤",
    route: "/login",
    buttonText: "Get Started",
    bgColor: "bg-blue-100",
  },
  {
    title: "Student Representative", 
    description: "Manage activities, assign scores, and grant badges",
    icon: "👥",
    route: "/login",
    buttonText: "Get Started", 
    bgColor: "bg-blue-100",
  },
  {
    title: "Teacher",
    description: "Mark attendance and monitor participation", 
    icon: "👨‍🏫",
    route: "/login",
    buttonText: "Get Started",
    bgColor: "bg-blue-100",
  },
];

export default function Landing() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-center">
            <div className="text-sm font-medium text-primary mb-1">CENTRALIZED STUDENT ACTIVITY RECORD</div>
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">Welcome, {user.name}</span>
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Button onClick={logout} variant="ghost">Log Out</Button>
            </div>
          ) : (
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Welcome Section with Classroom Background */}
          <div 
            className="relative bg-white/90 rounded-xl p-16 mb-8 overflow-hidden mx-auto"
            style={{
              width: '95%',
              minHeight: '300px',
              backgroundImage: `url('https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-white/60"></div>
            <div className="relative z-10">
              <h1 className="text-6xl font-bold mb-8 text-gray-800 leading-tight">
                Welcome to the Smart Student Hub
              </h1>
              <p className="text-2xl text-gray-600 font-medium">
                A centralized platform for managing student achievements
              </p>
            </div>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {userRoles.map((role) => (
            <Card key={role.title} className={`shadow-card hover:shadow-floating transition-all duration-300 ${role.bgColor} border-0`}>
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="text-6xl mb-6">{role.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{role.title}</h3>
                <p className="text-muted-foreground mb-8 flex-1">{role.description}</p>
                <Link to={role.route} className="w-full">
                  <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 text-lg">
                    {role.buttonText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}