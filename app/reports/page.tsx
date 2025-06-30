'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CheckSquare, 
  Clock, 
  DollarSign,
  Download,
  Calendar,
  Filter,
  Zap,
  Target,
  Award,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardLayout from '@/components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface ReportData {
  tasksByStatus: any[];
  tasksByPriority: any[];
  userProductivity: any[];
  monthlyProgress: any[];
  teamPerformance: any[];
  paymentStats: any;
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [timeRange, setTimeRange] = useState('30');
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchReportData();
  }, [timeRange]);

  const fetchReportData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/reports?days=${timeRange}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
      // Mock data for demo
      setReportData({
        tasksByStatus: [
          { name: 'Completed', value: 45, color: '#10B981' },
          { name: 'In Progress', value: 25, color: '#3B82F6' },
          { name: 'Pending', value: 20, color: '#F59E0B' },
          { name: 'Cancelled', value: 10, color: '#EF4444' }
        ],
        tasksByPriority: [
          { name: 'Urgent', value: 15, color: '#EF4444' },
          { name: 'High', value: 30, color: '#F59E0B' },
          { name: 'Medium', value: 40, color: '#3B82F6' },
          { name: 'Low', value: 15, color: '#10B981' }
        ],
        userProductivity: [
          { name: 'John Doe', completed: 25, pending: 5, efficiency: 83 },
          { name: 'Jane Smith', completed: 22, pending: 3, efficiency: 88 },
          { name: 'Mike Johnson', completed: 18, pending: 7, efficiency: 72 },
          { name: 'Sarah Wilson', completed: 20, pending: 4, efficiency: 83 }
        ],
        monthlyProgress: [
          { month: 'Jan', completed: 45, created: 50 },
          { month: 'Feb', completed: 52, created: 55 },
          { month: 'Mar', completed: 48, created: 52 },
          { month: 'Apr', completed: 61, created: 65 },
          { month: 'May', completed: 55, created: 58 },
          { month: 'Jun', completed: 67, created: 70 }
        ],
        teamPerformance: [
          { team: 'Development', members: 8, tasksCompleted: 145, avgTime: 3.2 },
          { team: 'Design', members: 5, tasksCompleted: 89, avgTime: 2.8 },
          { team: 'Marketing', members: 6, tasksCompleted: 112, avgTime: 2.5 },
          { team: 'Sales', members: 4, tasksCompleted: 78, avgTime: 3.0 }
        ],
        paymentStats: {
          totalPaid: 15420.50,
          pendingPayments: 2340.00,
          avgTaskValue: 125.30,
          topEarners: [
            { name: 'John Doe', amount: 2450.00 },
            { name: 'Jane Smith', amount: 2180.00 },
            { name: 'Mike Johnson', amount: 1890.00 }
          ]
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReport = async (format: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/reports/download?format=${format}&days=${timeRange}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `neurodesk-report-${timeRange}days.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast({
        title: "Report Downloaded",
        description: `Report downloaded as ${format.toUpperCase()} file`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

  if (isLoading) {
    return (
      <DashboardLayout role={user?.role || 'EMPLOYEE'}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400 animate-pulse" />
            <p className="text-gray-500">Loading reports...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role={user?.role || 'EMPLOYEE'}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive insights into team performance and productivity</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center px-3 py-2 bg-yellow-100 rounded-lg border border-yellow-200">
              <Zap className="w-4 h-4 text-yellow-600 mr-2" />
              <span className="text-yellow-700 text-sm font-semibold">Powered by Bolt</span>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => downloadReport('pdf')} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                    <p className="text-2xl font-bold">
                      {reportData?.tasksByStatus.reduce((sum, item) => sum + item.value, 0) || 0}
                    </p>
                    <p className="text-xs text-green-600 mt-1">↗ +12% from last period</p>
                  </div>
                  <CheckSquare className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold">
                      {Math.round((reportData?.tasksByStatus.find(item => item.name === 'Completed')?.value || 0) / 
                        (reportData?.tasksByStatus.reduce((sum, item) => sum + item.value, 0) || 1) * 100)}%
                    </p>
                    <p className="text-xs text-green-600 mt-1">↗ +5% from last period</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold">{reportData?.userProductivity.length || 0}</p>
                    <p className="text-xs text-blue-600 mt-1">→ No change</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Payments</p>
                    <p className="text-2xl font-bold">${reportData?.paymentStats.totalPaid.toLocaleString() || '0'}</p>
                    <p className="text-xs text-green-600 mt-1">↗ +18% from last period</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Task Status Distribution</CardTitle>
                  <CardDescription>Current status of all tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={reportData?.tasksByStatus}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {reportData?.tasksByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Progress</CardTitle>
                  <CardDescription>Tasks created vs completed over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={reportData?.monthlyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="created" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tasks by Priority</CardTitle>
                  <CardDescription>Distribution of task priorities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={reportData?.tasksByPriority}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Task Completion Trends</CardTitle>
                  <CardDescription>Weekly task completion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => {
                      const progress = [85, 92, 78, 88][index];
                      return (
                        <div key={week} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{week}</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Productivity</CardTitle>
                <CardDescription>Individual user performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData?.userProductivity.map((user, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-gray-500">
                            {user.completed} completed • {user.pending} pending
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{user.efficiency}% efficiency</p>
                          <Progress value={user.efficiency} className="w-20 h-2" />
                        </div>
                        <Badge variant={user.efficiency >= 85 ? "default" : user.efficiency >= 70 ? "secondary" : "destructive"}>
                          {user.efficiency >= 85 ? "Excellent" : user.efficiency >= 70 ? "Good" : "Needs Improvement"}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Performance metrics by team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData?.teamPerformance.map((team, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-lg">{team.team}</h4>
                        <Badge variant="outline">{team.members} members</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{team.tasksCompleted}</p>
                          <p className="text-sm text-gray-500">Tasks Completed</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">{team.avgTime}</p>
                          <p className="text-sm text-gray-500">Avg Days/Task</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-purple-600">
                            {Math.round(team.tasksCompleted / team.members)}
                          </p>
                          <p className="text-sm text-gray-500">Tasks/Member</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Overview</CardTitle>
                  <CardDescription>Financial metrics and statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        ${reportData?.paymentStats.totalPaid.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Total Paid</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">
                        ${reportData?.paymentStats.pendingPayments.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      ${reportData?.paymentStats.avgTaskValue.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">Average Task Value</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Earners</CardTitle>
                  <CardDescription>Highest earning team members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reportData?.paymentStats.topEarners.map((earner, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <span className="font-medium">{earner.name}</span>
                        </div>
                        <span className="font-bold text-green-600">
                          ${earner.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}