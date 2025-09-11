import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  XCircle,
  MessageSquare,
  Eye,
  Filter,
  Download,
  Search,
  Clock,
  LogOut,
  TrendingUp,
  Users as UsersIcon,
  Calendar,
  ArrowLeft,
  Zap,
  Wifi,
  WifiOff,
  Activity,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const submissions = [
  {
    id: 1,
    studentName: "John Doe",
    studentId: "CS2021001",
    activityTitle: "National Mathematics Olympiad",
    activityType: "Academic Competition",
    submissionDate: "2024-01-15",
    status: "pending" as const,
    points: 50,
    description: "Participated in the National Mathematics Olympiad and secured 2nd position in state level competition.",
    files: ["certificate.pdf", "participation_proof.jpg"],
  },
  {
    id: 2,
    studentName: "Jane Smith", 
    studentId: "CS2021002",
    activityTitle: "AI Workshop by Google",
    activityType: "Workshop/Seminar",
    submissionDate: "2024-01-14",
    status: "approved" as const,
    points: 30,
    description: "Attended comprehensive 3-day workshop on AI and Machine Learning fundamentals.",
    files: ["certificate.pdf"],
  },
  {
    id: 3,
    studentName: "Mike Johnson",
    studentId: "CS2021003",
    activityTitle: "Basketball Tournament",
    activityType: "Sports Tournament",
    submissionDate: "2024-01-13",
    status: "pending" as const,
    points: 25,
    description: "Team captain for inter-college basketball tournament.",
    files: ["team_photo.jpg", "match_results.pdf"],
  },
];

const statusColors = {
  pending: "bg-warning text-warning-foreground",
  approved: "bg-success text-success-foreground", 
  rejected: "bg-destructive text-destructive-foreground",
};

const branchData = [
  { branch: "ENTC", students: 120, avgGPA: 8.2, activities: 45 },
  { branch: "CS", students: 150, avgGPA: 8.5, activities: 52 },
  { branch: "IT", students: 130, avgGPA: 8.3, activities: 48 },
  { branch: "AIDS", students: 80, avgGPA: 8.4, activities: 38 },
  { branch: "Mechanical", students: 140, avgGPA: 7.9, activities: 35 },
];

const attendanceData = [
  { month: "Jan", attendance: 92 },
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 94 },
  { month: "Apr", attendance: 90 },
  { month: "May", attendance: 96 },
];

// Heatmap data for achievements and activities
const achievementHeatmapData = [
  { branch: "CS", academic: 95, sports: 78, cultural: 85, community: 72, research: 88 },
  { branch: "IT", academic: 88, sports: 82, cultural: 79, community: 85, research: 75 },
  { branch: "ENTC", academic: 92, sports: 65, cultural: 88, community: 78, research: 92 },
  { branch: "AIDS", academic: 85, sports: 70, cultural: 82, community: 88, research: 80 },
  { branch: "Mechanical", academic: 78, sports: 95, cultural: 75, community: 82, research: 68 },
];

const activityHeatmapData = [
  { branch: "CS", workshops: 45, competitions: 38, projects: 52, internships: 28, certifications: 35 },
  { branch: "IT", workshops: 42, competitions: 35, projects: 48, internships: 32, certifications: 38 },
  { branch: "ENTC", workshops: 38, competitions: 42, projects: 45, internships: 25, certifications: 40 },
  { branch: "AIDS", workshops: 35, competitions: 28, projects: 38, internships: 22, certifications: 30 },
  { branch: "Mechanical", workshops: 32, competitions: 45, projects: 35, internships: 18, certifications: 25 },
];

// Helper function to get color intensity based on value
const getHeatmapColor = (value: number, max: number) => {
  const intensity = value / max;
  if (intensity >= 0.8) return "bg-green-600";
  if (intensity >= 0.6) return "bg-green-500";
  if (intensity >= 0.4) return "bg-yellow-500";
  if (intensity >= 0.2) return "bg-orange-500";
  return "bg-red-500";
};
export default function Faculty() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedSubmission, setSelectedSubmission] = useState<typeof submissions[0] | null>(null);
  const [reviewComment, setReviewComment] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [smartPresenceActive, setSmartPresenceActive] = useState(false);
  const [presenceCount, setPresenceCount] = useState(0);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const handleApprove = (id: number) => {
    console.log("Approving submission:", id);
    // Handle approval logic
  };

  const handleReject = (id: number, comment: string) => {
    console.log("Rejecting submission:", id, "with comment:", comment);
    // Handle rejection logic
  };

  const handleRequestInfo = (id: number, comment: string) => {
    console.log("Requesting info for submission:", id, "with comment:", comment);
    // Handle request info logic
  };

  const toggleSmartPresence = () => {
    setSmartPresenceActive(!smartPresenceActive);
    if (!smartPresenceActive) {
      // Simulate detecting students
      const interval = setInterval(() => {
        setPresenceCount(prev => {
          const newCount = prev + Math.floor(Math.random() * 3) + 1;
          return Math.min(newCount, 45); // Max 45 students
        });
      }, 1000);
      
      setTimeout(() => {
        clearInterval(interval);
      }, 8000);
    } else {
      setPresenceCount(0);
    }
  };
  const filteredSubmissions = submissions.filter((submission) => {
    if (filterStatus !== "all" && submission.status !== filterStatus) return false;
    if (filterType !== "all" && submission.activityType !== filterType) return false;
    return true;
  });

  const pendingCount = submissions.filter(s => s.status === "pending").length;
  const approvedCount = submissions.filter(s => s.status === "approved").length;
  const totalSubmissions = submissions.length;

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
          <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
          <p className="text-muted-foreground">Review and manage student activity submissions</p>
        </div>
        <Button onClick={handleLogout} variant="outline">
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold text-warning">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved Today</p>
                <p className="text-2xl font-bold text-success">{approvedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Submissions</p>
                <p className="text-2xl font-bold text-primary">{totalSubmissions}</p>
              </div>
              <Eye className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Points</p>
                <p className="text-2xl font-bold text-accent">35</p>
              </div>
              <Download className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-4 w-4" />
              <Input placeholder="Search by student name or activity..." className="max-w-sm" />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Activity Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Academic Competition">Academic Competition</SelectItem>
                <SelectItem value="Sports Tournament">Sports Tournament</SelectItem>
                <SelectItem value="Workshop/Seminar">Workshop/Seminar</SelectItem>
                <SelectItem value="Community Service">Community Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Achievement and Activity Heatmaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievement Heatmap */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Branch Achievement Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-6 gap-2 text-xs">
                <div className="font-medium">Branch</div>
                <div className="font-medium text-center">Academic</div>
                <div className="font-medium text-center">Sports</div>
                <div className="font-medium text-center">Cultural</div>
                <div className="font-medium text-center">Community</div>
                <div className="font-medium text-center">Research</div>
              </div>
              
              {achievementHeatmapData.map((row) => (
                <div key={row.branch} className="grid grid-cols-6 gap-2 items-center">
                  <div className="font-medium text-sm">{row.branch}</div>
                  <div className={`h-8 rounded flex items-center justify-center text-white text-xs font-medium ${getHeatmapColor(row.academic, 100)}`}>
                    {row.academic}%
                  </div>
                  <div className={`h-8 rounded flex items-center justify-center text-white text-xs font-medium ${getHeatmapColor(row.sports, 100)}`}>
                    {row.sports}%
                  </div>
                  <div className={`h-8 rounded flex items-center justify-center text-white text-xs font-medium ${getHeatmapColor(row.cultural, 100)}`}>
                    {row.cultural}%
                  </div>
                  <div className={`h-8 rounded flex items-center justify-center text-white text-xs font-medium ${getHeatmapColor(row.community, 100)}`}>
                    {row.community}%
                  </div>
                  <div className={`h-8 rounded flex items-center justify-center text-white text-xs font-medium ${getHeatmapColor(row.research, 100)}`}>
                    {row.research}%
                  </div>
                </div>
              ))}
              
              <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>Low (0-20%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>Medium (20-40%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span>Good (40-60%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>High (60-80%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <span>Excellent (80-100%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Participation Heatmap */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-accent" />
              Activity Participation Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-6 gap-2 text-xs">
                <div className="font-medium">Branch</div>
                <div className="font-medium text-center">Workshops</div>
                <div className="font-medium text-center">Competitions</div>
                <div className="font-medium text-center">Projects</div>
                <div className="font-medium text-center">Internships</div>
                <div className="font-medium text-center">Certifications</div>
              </div>
              
              {activityHeatmapData.map((row) => (
                <div key={row.branch} className="grid grid-cols-6 gap-2 items-center">
                  <div className="font-medium text-sm">{row.branch}</div>
                  <div className={`h-8 rounded flex items-center justify-center text-white text-xs font-medium ${getHeatmapColor(row.workshops, 60)}`}>
                    {row.workshops}
                  </div>
                  <div className={`h-8 rounded flex items-center justify-center text-white text-xs font-medium ${getHeatmapColor(row.competitions, 60)}`}>
                    {row.competitions}
                  </div>
                  <div className={`h-8 rounded flex items-center justify-center text-white text-xs font-medium ${getHeatmapColor(row.projects, 60)}`}>
                    {row.projects}
                  </div>
                  <div className={`h-8 rounded flex items-center justify-center text-white text-xs font-medium ${getHeatmapColor(row.internships, 60)}`}>
                    {row.internships}
                  </div>
                  <div className={`h-8 rounded flex items-center justify-center text-white text-xs font-medium ${getHeatmapColor(row.certifications, 60)}`}>
                    {row.certifications}
                  </div>
                </div>
              ))}
              
              <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>Low</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span>Good</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>High</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Branch-wise Progress */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Branch-wise Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div>
              <h4 className="font-medium mb-4">Student Performance by Branch</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={branchData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="branch" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgGPA" fill="hsl(217, 91%, 60%)" name="Average GPA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Heatmap-style Grid */}
            <div>
              <h4 className="font-medium mb-4">Activity Participation Heatmap</h4>
              <div className="grid grid-cols-1 gap-3">
                {branchData.map((branch) => (
                  <div key={branch.branch} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="font-medium">{branch.branch}</div>
                      <div className="text-sm text-muted-foreground">{branch.students} students</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-4 rounded-full bg-gradient-to-r from-blue-200 to-blue-600"
                        style={{ width: `${(branch.activities / 60) * 100}px` }}
                      />
                      <span className="text-sm font-medium">{branch.activities}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Attendance Board */}
      <Card className="shadow-card bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            Smart Attendance Board
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Attendance Stats */}
            <div className="space-y-4">
              <div className="text-center p-4 bg-white/60 rounded-lg">
                <div className="text-3xl font-bold text-green-600">94%</div>
                <div className="text-sm text-muted-foreground">Overall Attendance</div>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">1,234</div>
                <div className="text-sm text-muted-foreground">Total Students</div>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">45</div>
                <div className="text-sm text-muted-foreground">Classes Today</div>
              </div>
              
              {/* Smart Presence Button */}
              <div className="text-center p-4 bg-white/80 rounded-lg border-2 border-dashed border-green-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    <div className={`p-3 rounded-full transition-all duration-300 ${
                      smartPresenceActive 
                        ? 'bg-green-500 animate-pulse' 
                        : 'bg-gray-400'
                    }`}>
                      {smartPresenceActive ? (
                        <Wifi className="h-6 w-6 text-white" />
                      ) : (
                        <WifiOff className="h-6 w-6 text-white" />
                      )}
                    </div>
                  </div>
                  
                  <Button
                    onClick={toggleSmartPresence}
                    className={`w-full transition-all duration-300 ${
                      smartPresenceActive
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    {smartPresenceActive ? 'Stop Detection' : 'Start Smart Presence'}
                  </Button>
                  
                  {smartPresenceActive && (
                    <div className="space-y-2 animate-fade-in">
                      <div className="flex items-center justify-between text-sm">
                        <span>Detecting Students...</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{presenceCount}</div>
                      <div className="text-xs text-muted-foreground">Students Detected</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(presenceCount / 45) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Attendance Trend */}
            <div className="lg:col-span-2">
              <h4 className="font-medium mb-4">Monthly Attendance Trend</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="hsl(142, 71%, 45%)" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(142, 71%, 45%)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Student Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{submission.studentName}</div>
                      <div className="text-sm text-muted-foreground">{submission.studentId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{submission.activityTitle}</div>
                  </TableCell>
                  <TableCell>{submission.activityType}</TableCell>
                  <TableCell>{submission.submissionDate}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[submission.status]}>
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{submission.points}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedSubmission(submission)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Review Submission</DialogTitle>
                          </DialogHeader>
                          {selectedSubmission && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-1">Student</h4>
                                  <p>{selectedSubmission.studentName}</p>
                                  <p className="text-sm text-muted-foreground">{selectedSubmission.studentId}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-1">Activity</h4>
                                  <p>{selectedSubmission.activityTitle}</p>
                                  <p className="text-sm text-muted-foreground">{selectedSubmission.activityType}</p>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium mb-2">Description</h4>
                                <p className="text-sm bg-muted p-3 rounded">{selectedSubmission.description}</p>
                              </div>
                              
                              <div>
                                <h4 className="font-medium mb-2">Supporting Documents</h4>
                                <div className="flex flex-wrap gap-2">
                                  {selectedSubmission.files.map((file, index) => (
                                    <Badge key={index} variant="outline" className="cursor-pointer">
                                      {file}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Review Comment</h4>
                                <Textarea
                                  placeholder="Add your review comment..."
                                  value={reviewComment}
                                  onChange={(e) => setReviewComment(e.target.value)}
                                />
                              </div>

                              <div className="flex gap-2">
                                <Button 
                                  onClick={() => handleApprove(selectedSubmission.id)}
                                  className="flex-1"
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Approve
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={() => handleRequestInfo(selectedSubmission.id, reviewComment)}
                                  className="flex-1"
                                >
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Request Info
                                </Button>
                                <Button 
                                  variant="destructive"
                                  onClick={() => handleReject(selectedSubmission.id, reviewComment)}
                                  className="flex-1"
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}