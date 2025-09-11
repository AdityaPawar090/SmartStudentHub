import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { GraduationCap, Eye, EyeOff, UserPlus } from 'lucide-react';

const roleConfig = {
  student: {
    title: 'Student Login',
    description: 'Access your academic dashboard and track your activities',
    icon: '👤',
    bgColor: 'bg-blue-100',
    redirectPath: '/student-hub'
  },
  'student-representative': {
    title: 'Student Representative Login',
    description: 'Manage activities, assign scores, and grant badges',
    icon: '👥',
    bgColor: 'bg-green-100',
    redirectPath: '/student-representative'
  },
  teacher: {
    title: 'Teacher Login',
    description: 'Review submissions and monitor student progress',
    icon: '👨‍🏫',
    bgColor: 'bg-purple-100',
    redirectPath: '/faculty'
  }
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || roleConfig[role].redirectPath;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password, role);
    
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleRegister = () => {
    // Handle registration logic here
    console.log('Register clicked for role:', role);
  };

  const config = roleConfig[role];

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 min-h-screen bg-gradient-card/90 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header with Classroom Background */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">Smart Student Hub</span>
            </div>
            
            {/* Welcome Section with Classroom Background */}
            <div 
              className="relative bg-white/85 rounded-lg p-6 mb-4 overflow-hidden"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="absolute inset-0 bg-white/70"></div>
              <div className="relative z-10">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Smart Student Hub</h1>
                <p className="text-gray-600">Empowering Academic Excellence Through Digital Innovation</p>
              </div>
            </div>
            
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
              ← Back to Home
            </Link>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-2 p-1 bg-muted rounded-lg">
            {Object.entries(roleConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setRole(key as UserRole)}
                className={`p-3 rounded-md text-center transition-colors ${
                  role === key 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted-foreground/10'
                }`}
              >
                <div className="text-lg mb-1">{config.icon}</div>
                <div className="text-xs font-medium">
                  {key === 'student-representative' ? 'Rep' : config.title.split(' ')[0]}
                </div>
              </button>
            ))}
          </div>

          {/* Login Card */}
          <Card className={`shadow-card ${config.bgColor} border-0`}>
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">{config.icon}</div>
              <CardTitle className="text-2xl">{config.title}</CardTitle>
              <p className="text-muted-foreground text-sm">{config.description}</p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleRegister}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register / Sign Up
                  </Button>
                </div>
              </form>
              
              {/* Demo Credentials */}
              <div className="mt-6 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs font-medium mb-2">Demo Credentials:</p>
                <div className="text-xs space-y-1">
                  <div>Student: student@example.com</div>
                  <div>Rep: rep@example.com</div>
                  <div>Teacher: teacher@example.com</div>
                  <div className="font-medium">Password: password</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}