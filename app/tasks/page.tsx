'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckSquare, 
  Plus, 
  Filter, 
  Search, 
  Calendar, 
  User, 
  DollarSign, 
  Edit, 
  Trash2,
  Mic,
  MicOff,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout';
import VoiceCommand from '@/components/VoiceCommand';
import VoiceTaskDialog from '@/components/VoiceTaskDialog';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assigned_to: number;
  assigned_to_name: string;
  assigned_by_name: string;
  required_skills: string[];
  due_date: string;
  payment_amount: number;
  is_paid: boolean;
  created_at: string;
}

interface User {
  id: number;
  full_name: string;
  username: string;
  role: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<any>(null);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showVoiceTaskDialog, setShowVoiceTaskDialog] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [editingTask, setEditingTask] = useState<any>({});
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    required_skills: '',
    due_date: '',
    assigned_to: '',
    payment_amount: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchTasks();
    fetchUsers();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

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

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filterTasks = () => {
    let filtered = tasks;

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assigned_to_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    if (priorityFilter !== 'ALL') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    setFilteredTasks(filtered);
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const requiredSkills = newTask.required_skills.split(',').map(skill => skill.trim()).filter(Boolean);
      
      const response = await axios.post('http://localhost:5000/api/tasks', {
        ...newTask,
        required_skills: requiredSkills,
        assigned_to: newTask.assigned_to ? parseInt(newTask.assigned_to) : null,
        payment_amount: parseFloat(newTask.payment_amount.toString()) || 0
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
        due_date: '',
        assigned_to: '',
        payment_amount: 0
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

  const handleEditTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const requiredSkills = typeof editingTask.required_skills === 'string' 
        ? editingTask.required_skills.split(',').map((skill: string) => skill.trim()).filter(Boolean)
        : editingTask.required_skills;
      
      await axios.put(`http://localhost:5000/api/tasks/${editingTask.id}`, {
        ...editingTask,
        required_skills: requiredSkills,
        assigned_to: editingTask.assigned_to ? parseInt(editingTask.assigned_to.toString()) : null,
        payment_amount: parseFloat(editingTask.payment_amount?.toString()) || 0
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Task Updated Successfully",
        description: "Task has been updated",
      });

      setShowEditTask(false);
      setEditingTask({});
      fetchTasks();
    } catch (error: any) {
      toast({
        title: "Error Updating Task",
        description: error.response?.data?.error || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleStatusUpdate = async (taskId: number, status: string) => {
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

  const handleAssignTask = async (taskId: number, userId: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/tasks/${taskId}/assign`, 
        { assigned_to: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast({
        title: "Task Assigned",
        description: "Task has been assigned successfully",
      });
      
      fetchTasks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to assign task",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast({
        title: "Task Deleted",
        description: "Task has been deleted successfully",
      });
      
      fetchTasks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  const handleVoiceCommand = async (command: string) => {
    const cmd = command.toLowerCase();
    
    if (cmd.includes('create task') || cmd.includes('new task') || cmd.includes('add task')) {
      setShowVoiceTaskDialog(true);
      toast({
        title: "Voice Command Processed",
        description: "Opening voice-controlled task creation",
      });
    } else if (cmd.includes('create task manually') || cmd.includes('manual task')) {
      setShowCreateTask(true);
      toast({
        title: "Voice Command Processed",
        description: "Opening manual task creation dialog",
      });
    } else if (cmd.includes('show all tasks') || cmd.includes('view all tasks')) {
      setStatusFilter('ALL');
      setPriorityFilter('ALL');
      setSearchTerm('');
      toast({
        title: "Voice Command Processed",
        description: "Showing all tasks",
      });
    } else if (cmd.includes('show pending tasks')) {
      setStatusFilter('PENDING');
      toast({
        title: "Voice Command Processed",
        description: "Filtering pending tasks",
      });
    } else if (cmd.includes('show completed tasks')) {
      setStatusFilter('COMPLETED');
      toast({
        title: "Voice Command Processed",
        description: "Filtering completed tasks",
      });
    } else if (cmd.includes('show high priority')) {
      setPriorityFilter('HIGH');
      toast({
        title: "Voice Command Processed",
        description: "Filtering high priority tasks",
      });
    } else if (cmd.includes('show urgent tasks')) {
      setPriorityFilter('URGENT');
      toast({
        title: "Voice Command Processed",
        description: "Filtering urgent tasks",
      });
    } else if (cmd.includes('refresh tasks') || cmd.includes('reload tasks')) {
      fetchTasks();
      toast({
        title: "Voice Command Processed",
        description: "Refreshing tasks",
      });
    } else if (cmd.includes('search for')) {
      const searchMatch = cmd.match(/search for (.+)/);
      if (searchMatch) {
        setSearchTerm(searchMatch[1]);
        toast({
          title: "Voice Command Processed",
          description: `Searching for "${searchMatch[1]}"`,
        });
      }
    } else if (cmd.includes('clear filters')) {
      setStatusFilter('ALL');
      setPriorityFilter('ALL');
      setSearchTerm('');
      toast({
        title: "Voice Command Processed",
        description: "Cleared all filters",
      });
    }
  };

  const canEdit = user?.role === 'ADMIN' || user?.role === 'TEAM_LEADER';

  return (
    <DashboardLayout role={user?.role || 'EMPLOYEE'}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
            <p className="text-gray-600 mt-1">Organize and track your team's work efficiently</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center px-3 py-2 bg-yellow-100 rounded-lg border border-yellow-200">
              <Zap className="w-4 h-4 text-yellow-600 mr-2" />
              <span className="text-yellow-700 text-sm font-semibold">Powered by Bolt</span>
            </div>
            {canEdit && (
              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowVoiceTaskDialog(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Voice Create Task
                </Button>
                <Dialog open={showCreateTask} onOpenChange={setShowCreateTask}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Manual Create
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Task</DialogTitle>
                      <DialogDescription>
                        Create a task that will be automatically assigned based on required skills
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateTask} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="due_date">Due Date</Label>
                          <Input
                            id="due_date"
                            type="datetime-local"
                            value={newTask.due_date}
                            onChange={(e) => setNewTask({...newTask, due_date: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="payment_amount">Payment Amount ($)</Label>
                          <Input
                            id="payment_amount"
                            type="number"
                            step="0.01"
                            value={newTask.payment_amount}
                            onChange={(e) => setNewTask({...newTask, payment_amount: parseFloat(e.target.value) || 0})}
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <Label htmlFor="assigned_to">Assign To (Optional)</Label>
                          <Select value={newTask.assigned_to} onValueChange={(value) => setNewTask({...newTask, assigned_to: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Auto-assign or select user" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">Auto-assign based on skills</SelectItem>
                              {users.filter(u => u.role === 'EMPLOYEE').map(user => (
                                <SelectItem key={user.id} value={user.id.toString()}>
                                  {user.full_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
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
              </div>
            )}
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
          <VoiceCommand 
            onCommand={handleVoiceCommand} 
            autoStart={false}
            continuousListening={isVoiceActive}
          />
        )}

        {/* Voice Task Creation Dialog */}
        <VoiceTaskDialog
          isOpen={showVoiceTaskDialog}
          onClose={() => setShowVoiceTaskDialog(false)}
          onTaskCreated={fetchTasks}
        />

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Priority</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="URGENT">Urgent</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('ALL');
                  setPriorityFilter('ALL');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tasks */}
        <Tabs defaultValue="grid" className="space-y-6">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  users={users}
                  onStatusUpdate={handleStatusUpdate}
                  onAssignTask={handleAssignTask}
                  onEditTask={(task) => {
                    setEditingTask(task);
                    setShowEditTask(true);
                  }}
                  onDeleteTask={handleDeleteTask}
                  userRole={user?.role}
                  canEdit={canEdit}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Task
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Assigned To
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Due Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTasks.map((task) => (
                        <tr key={task.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{task.title}</div>
                              <div className="text-sm text-gray-500">{task.description}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(task.status)}>
                              {task.status.replace('_', ' ')}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {task.assigned_to_name || 'Unassigned'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {task.payment_amount > 0 ? (
                              <span className="text-green-600 font-medium">
                                ${task.payment_amount}
                                {task.is_paid && ' (Paid)'}
                              </span>
                            ) : (
                              'No payment'
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {task.status === 'PENDING' && (
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusUpdate(task.id, 'IN_PROGRESS')}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  Start
                                </Button>
                              )}
                              {task.status === 'IN_PROGRESS' && (
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusUpdate(task.id, 'COMPLETED')}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Complete
                                </Button>
                              )}
                              {canEdit && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => {
                                      setEditingTask(task);
                                      setShowEditTask(true);
                                    }}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-red-600 hover:text-red-700"
                                    onClick={() => handleDeleteTask(task.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {filteredTasks.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <CheckSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No tasks found</h3>
              <p className="text-gray-500 mb-4">
                {tasks.length === 0 
                  ? "No tasks have been created yet." 
                  : "Try adjusting your filters to see more tasks."
                }
              </p>
              {canEdit && tasks.length === 0 && (
                <Button
                  onClick={() => setShowVoiceTaskDialog(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Create Your First Task with Voice
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Edit Task Dialog */}
        <Dialog open={showEditTask} onOpenChange={setShowEditTask}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>
                Update task details and assignment
              </DialogDescription>
            </DialogHeader>
            {showEditTask && (
              <form onSubmit={handleEditTask} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit_title">Task Title</Label>
                    <Input
                      id="edit_title"
                      value={editingTask.title || ''}
                      onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                      placeholder="Enter task title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit_priority">Priority</Label>
                    <Select value={editingTask.priority} onValueChange={(value) => setEditingTask({...editingTask, priority: value})}>
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
                </div>
                <div>
                  <Label htmlFor="edit_description">Description</Label>
                  <Textarea
                    id="edit_description"
                    value={editingTask.description || ''}
                    onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                    placeholder="Describe the task"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit_due_date">Due Date</Label>
                    <Input
                      id="edit_due_date"
                      type="datetime-local"
                      value={editingTask.due_date ? new Date(editingTask.due_date).toISOString().slice(0, 16) : ''}
                      onChange={(e) => setEditingTask({...editingTask, due_date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit_payment_amount">Payment Amount ($)</Label>
                    <Input
                      id="edit_payment_amount"
                      type="number"
                      step="0.01"
                      value={editingTask.payment_amount || 0}
                      onChange={(e) => setEditingTask({...editingTask, payment_amount: parseFloat(e.target.value) || 0})}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit_assigned_to">Assign To</Label>
                    <Select value={editingTask.assigned_to?.toString() || ''} onValueChange={(value) => setEditingTask({...editingTask, assigned_to: parseInt(value)})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Unassigned</SelectItem>
                        {users.filter(u => u.role === 'EMPLOYEE').map(user => (
                          <SelectItem key={user.id} value={user.id.toString()}>
                            {user.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit_status">Status</Label>
                    <Select value={editingTask.status} onValueChange={(value) => setEditingTask({...editingTask, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit_skills">Required Skills (comma-separated)</Label>
                  <Input
                    id="edit_skills"
                    value={Array.isArray(editingTask.required_skills) ? editingTask.required_skills.join(', ') : editingTask.required_skills}
                    onChange={(e) => setEditingTask({...editingTask, required_skills: e.target.value})}
                    placeholder="e.g., JavaScript, React, UI Design"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowEditTask(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Update Task</Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

interface TaskCardProps {
  task: Task;
  users: User[];
  onStatusUpdate: (taskId: number, status: string) => void;
  onAssignTask: (taskId: number, userId: number) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
  userRole: string;
  canEdit: boolean;
}

function TaskCard({ task, users, onStatusUpdate, onAssignTask, onEditTask, onDeleteTask, userRole, canEdit }: TaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 w-full lg:w-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
              <p className="text-gray-600 mb-3">{task.description}</p>
              
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className={getStatusColor(task.status)}>
                  {task.status.replace('_', ' ')}
                </Badge>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                {task.payment_amount > 0 && (
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    <DollarSign className="w-3 h-3 mr-1" />
                    ${task.payment_amount}
                    {task.is_paid && ' (Paid)'}
                  </Badge>
                )}
                {task.required_skills && task.required_skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {task.required_skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-500">
                {task.assigned_to_name && (
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>Assigned to: {task.assigned_to_name}</span>
                  </div>
                )}
                {task.assigned_by_name && (
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>Created by: {task.assigned_by_name}</span>
                  </div>
                )}
                {task.due_date && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
              {/* Status Update Buttons */}
              {task.status === 'PENDING' && (
                <Button
                  size="sm"
                  onClick={() => onStatusUpdate(task.id, 'IN_PROGRESS')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Start
                </Button>
              )}
              {task.status === 'IN_PROGRESS' && (
                <Button
                  size="sm"
                  onClick={() => onStatusUpdate(task.id, 'COMPLETED')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Complete
                </Button>
              )}

              {/* Assignment Dropdown */}
              {canEdit && !task.assigned_to_name && (
                <Select onValueChange={(value) => onAssignTask(task.id, parseInt(value))}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Assign" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.filter(u => u.role === 'EMPLOYEE').map(user => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Edit and Delete Buttons */}
              {canEdit && (
                <div className="flex space-x-1">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onEditTask(task)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'COMPLETED': return 'bg-green-100 text-green-800 border-green-200';
    case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'URGENT': return 'bg-red-100 text-red-800 border-red-200';
    case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'MEDIUM': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'LOW': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}