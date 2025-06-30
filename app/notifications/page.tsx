'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, AlertTriangle, Info, Users, CheckSquare, Mic, MicOff, Zap, Filter, BookMarked as MarkAsRead } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout';
import VoiceCommand from '@/components/VoiceCommand';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchNotifications();
  }, []);

  useEffect(() => {
    filterNotifications();
  }, [notifications, typeFilter, statusFilter]);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const filterNotifications = () => {
    let filtered = notifications;

    if (typeFilter !== 'ALL') {
      filtered = filtered.filter(n => n.type === typeFilter);
    }

    if (statusFilter === 'UNREAD') {
      filtered = filtered.filter(n => !n.is_read);
    } else if (statusFilter === 'READ') {
      filtered = filtered.filter(n => n.is_read);
    }

    setFilteredNotifications(filtered);
  };

  const markAsRead = async (notificationId: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/notifications/${notificationId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, is_read: true } : n
      ));
      
      toast({
        title: "Notification marked as read",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to mark notification as read",
        variant: "destructive",
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      const unreadNotifications = notifications.filter(n => !n.is_read);
      
      await Promise.all(
        unreadNotifications.map(n => 
          axios.put(`http://localhost:5000/api/notifications/${n.id}/read`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          })
        )
      );
      
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
      
      toast({
        title: "All notifications marked as read",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to mark all notifications as read",
        variant: "destructive",
      });
    }
  };

  const handleVoiceCommand = async (command: string) => {
    const cmd = command.toLowerCase();
    
    if (cmd.includes('mark all as read') || cmd.includes('read all notifications')) {
      markAllAsRead();
      toast({
        title: "Voice Command Processed",
        description: "Marking all notifications as read",
      });
    } else if (cmd.includes('refresh notifications') || cmd.includes('update notifications')) {
      fetchNotifications();
      toast({
        title: "Voice Command Processed",
        description: "Refreshing notifications",
      });
    } else if (cmd.includes('show unread') || cmd.includes('filter unread')) {
      setStatusFilter('UNREAD');
      toast({
        title: "Voice Command Processed",
        description: "Showing unread notifications",
      });
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'TASK': return <CheckSquare className="w-5 h-5" />;
      case 'TEAM': return <Users className="w-5 h-5" />;
      case 'SYSTEM': return <Info className="w-5 h-5" />;
      case 'ANNOUNCEMENT': return <Bell className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'TASK': return 'text-blue-600 bg-blue-100';
      case 'TEAM': return 'text-green-600 bg-green-100';
      case 'SYSTEM': return 'text-gray-600 bg-gray-100';
      case 'ANNOUNCEMENT': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <DashboardLayout role={user?.role || 'EMPLOYEE'}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">Stay updated with your latest activities</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center px-3 py-2 bg-yellow-100 rounded-lg border border-yellow-200">
              <Zap className="w-4 h-4 text-yellow-600 mr-2" />
              <span className="text-yellow-700 text-sm font-semibold">Powered by Bolt</span>
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark All Read ({unreadCount})
              </Button>
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <VoiceCommand onCommand={handleVoiceCommand} />
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                </div>
                <Bell className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unread</p>
                  <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tasks</p>
                  <p className="text-2xl font-bold">{notifications.filter(n => n.type === 'TASK').length}</p>
                </div>
                <CheckSquare className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Team</p>
                  <p className="text-2xl font-bold">{notifications.filter(n => n.type === 'TEAM').length}</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="TASK">Task Notifications</SelectItem>
                  <SelectItem value="TEAM">Team Updates</SelectItem>
                  <SelectItem value="SYSTEM">System Messages</SelectItem>
                  <SelectItem value="ANNOUNCEMENT">Announcements</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="UNREAD">Unread Only</SelectItem>
                  <SelectItem value="READ">Read Only</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={() => {
                  setTypeFilter('ALL');
                  setStatusFilter('ALL');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({filteredNotifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({filteredNotifications.filter(n => !n.is_read).length})</TabsTrigger>
            <TabsTrigger value="task">Tasks ({filteredNotifications.filter(n => n.type === 'TASK').length})</TabsTrigger>
            <TabsTrigger value="team">Team ({filteredNotifications.filter(n => n.type === 'TEAM').length})</TabsTrigger>
            <TabsTrigger value="system">System ({filteredNotifications.filter(n => n.type === 'SYSTEM').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <NotificationList 
              notifications={filteredNotifications} 
              onMarkAsRead={markAsRead}
            />
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            <NotificationList 
              notifications={filteredNotifications.filter(n => !n.is_read)} 
              onMarkAsRead={markAsRead}
            />
          </TabsContent>

          <TabsContent value="task" className="space-y-4">
            <NotificationList 
              notifications={filteredNotifications.filter(n => n.type === 'TASK')} 
              onMarkAsRead={markAsRead}
            />
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <NotificationList 
              notifications={filteredNotifications.filter(n => n.type === 'TEAM')} 
              onMarkAsRead={markAsRead}
            />
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <NotificationList 
              notifications={filteredNotifications.filter(n => n.type === 'SYSTEM')} 
              onMarkAsRead={markAsRead}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
}

function NotificationList({ notifications, onMarkAsRead }: NotificationListProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'TASK': return <CheckSquare className="w-5 h-5" />;
      case 'TEAM': return <Users className="w-5 h-5" />;
      case 'SYSTEM': return <Info className="w-5 h-5" />;
      case 'ANNOUNCEMENT': return <Bell className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'TASK': return 'text-blue-600 bg-blue-100';
      case 'TEAM': return 'text-green-600 bg-green-100';
      case 'SYSTEM': return 'text-gray-600 bg-gray-100';
      case 'ANNOUNCEMENT': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No notifications found</h3>
          <p className="text-gray-500">You're all caught up!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className={`hover:shadow-lg transition-shadow ${
            !notification.is_read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {notification.title}
                      </h3>
                      {!notification.is_read && (
                        <Badge variant="default" className="bg-blue-600">
                          New
                        </Badge>
                      )}
                      <Badge variant="outline">
                        {notification.type.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{notification.message}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                {!notification.is_read && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onMarkAsRead(notification.id)}
                    className="ml-4"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Read
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}