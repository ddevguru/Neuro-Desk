'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Clock, Calendar, Target, Mic, MicOff, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout';
import VoiceCommand from '@/components/VoiceCommand';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assigned_by_name: string;
  due_date: string;
  created_at: string;
}

export default function EmployeeDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const updateTaskStatus = async (taskId: number, status: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/tasks/${taskId}/status`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast({
        title: "Task Updated",
        description: `Task status changed to ${status.replace('_', ' ').toLowerCase()}`,
      });
      
      fetchTasks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const handleVoiceCommand = async (command: string) => {
    const cmd = command.toLowerCase();
    
    if (cmd.includes('show tasks') || cmd.includes('my tasks')) {
      fetchTasks();
      toast({
        title: "Voice Command Processed",
        description: "Refreshing your tasks",
      });
    } else if (cmd.includes('complete task')) {
      // Find task to complete (simplified - in production, use more sophisticated matching)
      const pendingTasks = tasks.filter(t => t.status === 'PENDING' || t.status === 'IN_PROGRESS');
      if (pendingTasks.length > 0) {
        updateTaskStatus(pendingTasks[0].id, 'COMPLETED');
        toast({
          title: "Voice Command Processed",
          description: `Marked "${pendingTasks[0].title}" as completed`,
        });
      } else {
        toast({
          title: "No Tasks to Complete",
          description: "You don't have any pending tasks",
        });
      }
    } else if (cmd.includes('start task') || cmd.includes('begin task')) {
      const pendingTasks = tasks.filter(t => t.status === 'PENDING');
      if (pendingTasks.length > 0) {
        updateTaskStatus(pendingTasks[0].id, 'IN_PROGRESS');
        toast({
          title: "Voice Command Processed",
          description: `Started working on "${pendingTasks[0].title}"`,
        });
      } else {
        toast({
          title: "No Pending Tasks",
          description: "You don't have any pending tasks to start",
        });
      }
    }
  };

  const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const todayTasks = tasks.filter(task => {
    const taskDate = new Date(task.due_date);
    const today = new Date();
    return taskDate.toDateString() === today.toDateString();
  });

  const stats = [
    {
      title: "My Tasks",
      value: totalTasks,
      icon: <CheckSquare className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "In Progress",
      value: tasks.filter(t => t.status === 'IN_PROGRESS').length,
      icon: <Clock className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: <Target className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Due Today",
      value: todayTasks.length,
      icon: <Calendar className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <DashboardLayout role="EMPLOYEE">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Day at a Glance</h1>
            <p className="text-gray-600 mt-1">Stay focused and productive with your personalized dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center px-3 py-2 bg-yellow-100 rounded-lg border border-yellow-200">
              <Zap className="w-4 h-4 text-yellow-600 mr-2" />
              <span className="text-yellow-700 text-sm font-semibold">Powered by Bolt</span>
            </div>
            <Button
              onClick={() => setIsVoiceActive(!isVoiceActive)}
              variant={isVoiceActive ? "default" : "outline"}
              className={isVoiceActive ? "bg-red-600 hover:bg-red-700" : ""}
            >
              {isVoiceActive ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
              {isVoiceActive ? "Stop Voice" : "Voice Commands"}
            </Button>
          </div>
        </div>

        {/* Voice Command Component */}
        {isVoiceActive && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <VoiceCommand onCommand={handleVoiceCommand} />
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-md ${stat.bgColor}`}>
                    <span className={stat.color}>{stat.icon}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Productivity Tracker */}
        <Card>
          <CardHeader>
            <CardTitle>Productivity Tracker</CardTitle>
            <CardDescription>Your task completion progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Task Completion Rate</span>
                  <span className="text-sm text-gray-500">{Math.round(completionRate)}%</span>
                </div>
                <Progress value={completionRate} className="w-full" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{totalTasks}</p>
                  <p className="text-sm text-gray-500">Total Tasks</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
                  <p className="text-sm text-gray-500">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">{totalTasks - completedTasks}</p>
                  <p className="text-sm text-gray-500">Remaining</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Tasks</CardTitle>
            <CardDescription>Manage your assigned tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant={
                        task.status === 'COMPLETED' ? 'default' :
                        task.status === 'IN_PROGRESS' ? 'secondary' : 'outline'
                      }>
                        {task.status.replace('_', ' ')}
                      </Badge>
                      <Badge variant={
                        task.priority === 'URGENT' ? 'destructive' :
                        task.priority === 'HIGH' ? 'default' : 'outline'
                      }>
                        {task.priority}
                      </Badge>
                      {task.assigned_by_name && (
                        <span className="text-sm text-gray-500">
                          From: {task.assigned_by_name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {task.status === 'PENDING' && (
                      <Button
                        size="sm"
                        onClick={() => updateTaskStatus(task.id, 'IN_PROGRESS')}
                      >
                        Start
                      </Button>
                    )}
                    {task.status === 'IN_PROGRESS' && (
                      <Button
                        size="sm"
                        onClick={() => updateTaskStatus(task.id, 'COMPLETED')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Complete
                      </Button>
                    )}
                    {task.due_date && (
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          Due: {new Date(task.due_date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {tasks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CheckSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No tasks assigned yet. Check back later!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}