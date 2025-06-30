'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Users, Clock, TrendingUp, Mic, MicOff, Zap, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
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
  assigned_to_name: string;
  due_date: string;
  created_at: string;
}

export default function TeamLeaderDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    required_skills: '',
    due_date: ''
  });
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

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const requiredSkills = newTask.required_skills.split(',').map(skill => skill.trim()).filter(Boolean);
      
      const response = await axios.post('http://localhost:5000/api/tasks', {
        ...newTask,
        required_skills: requiredSkills,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Task Created Successfully",
        description: response.data.assigned_to 
          ? "Task has been automatically assigned based on skills matching"
          : "Task created and ready for assignment",
      });

      setShowCreateTask(false);
      setNewTask({
        title: '',
        description: '',
        priority: 'MEDIUM',
        required_skills: '',
        due_date: ''
      });
      fetchTasks();
    } catch (error: any) {
      toast({
        title: "Error Creating Task",
        description: error.response?.data?.error || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleVoiceCommand = async (command: string) => {
    const cmd = command.toLowerCase();
    
    if (cmd.includes('create task') || cmd.includes('new task')) {
      setShowCreateTask(true);
      toast({
        title: "Voice Command Processed",
        description: "Opening task creation dialog",
      });
    } else if (cmd.includes('show tasks') || cmd.includes('view tasks')) {
      fetchTasks();
      toast({
        title: "Voice Command Processed",
        description: "Refreshing task list",
      });
    } else {
      // Try to extract task details from voice command
      const taskMatch = cmd.match(/create task (.+) with (.+) priority/);
      if (taskMatch) {
        setNewTask(prev => ({
          ...prev,
          title: taskMatch[1],
          priority: taskMatch[2].toUpperCase()
        }));
        setShowCreateTask(true);
        toast({
          title: "Voice Command Processed",
          description: `Task "${taskMatch[1]}" with ${taskMatch[2]} priority ready to create`,
        });
      }
    }
  };

  const stats = [
    {
      title: "Team Tasks",
      value: tasks.length,
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
      value: tasks.filter(t => t.status === 'COMPLETED').length,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Team Members",
      value: new Set(tasks.map(t => t.assigned_to_name).filter(Boolean)).size,
      icon: <Users className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <DashboardLayout role="TEAM_LEADER">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Leader Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your team's tasks and productivity</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center px-3 py-2 bg-yellow-100 rounded-lg border border-yellow-200">
              <Zap className="w-4 h-4 text-yellow-600 mr-2" />
              <span className="text-yellow-700 text-sm font-semibold">Powered by Bolt</span>
            </div>
            <Dialog open={showCreateTask} onOpenChange={setShowCreateTask}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Task
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Create a task that will be automatically assigned based on required skills
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateTask} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Task Title</Label>
                    <Input
                      id="title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      placeholder="Enter task title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      placeholder="Describe the task"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="URGENT">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="skills">Required Skills (comma-separated)</Label>
                    <Input
                      id="skills"
                      value={newTask.required_skills}
                      onChange={(e) => setNewTask({...newTask, required_skills: e.target.value})}
                      placeholder="e.g., JavaScript, React, UI Design"
                    />
                  </div>
                  <div>
                    <Label htmlFor="due_date">Due Date</Label>
                    <Input
                      id="due_date"
                      type="datetime-local"
                      value={newTask.due_date}
                      onChange={(e) => setNewTask({...newTask, due_date: e.target.value})}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setShowCreateTask(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Task</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
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

        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Team Tasks</CardTitle>
            <CardDescription>Tasks assigned to your team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.slice(0, 5).map((task) => (
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
                      {task.assigned_to_name && (
                        <span className="text-sm text-gray-500">
                          Assigned to: {task.assigned_to_name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(task.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {tasks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CheckSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No tasks assigned yet. Create your first task!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}