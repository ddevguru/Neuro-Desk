'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  X, 
  Plus,
  Mic,
  MicOff,
  Zap,
  Camera,
  Shield,
  Award,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout';
import VoiceCommand from '@/components/VoiceCommand';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [editedUser, setEditedUser] = useState<any>({});
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [stats, setStats] = useState<any>({});
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditedUser({
        full_name: parsedUser.full_name || '',
        username: parsedUser.username || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        address: parsedUser.address || '',
        profile_photo: parsedUser.profile_photo || ''
      });
      setSkills(parsedUser.skills || []);
    }
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/user/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/user/profile', {
        ...editedUser,
        skills
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updatedUser = { ...user, ...editedUser, skills };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleVoiceCommand = async (command: string) => {
    const cmd = command.toLowerCase();
    
    if (cmd.includes('edit profile') || cmd.includes('update profile')) {
      setIsEditing(true);
      toast({
        title: "Voice Command Processed",
        description: "Profile editing mode activated",
      });
    } else if (cmd.includes('save profile') || cmd.includes('save changes')) {
      if (isEditing) {
        handleSave();
        toast({
          title: "Voice Command Processed",
          description: "Saving profile changes",
        });
      }
    } else if (cmd.includes('cancel edit') || cmd.includes('cancel changes')) {
      setIsEditing(false);
      setEditedUser({
        full_name: user?.full_name || '',
        username: user?.username || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        profile_photo: user?.profile_photo || ''
      });
      setSkills(user?.skills || []);
      toast({
        title: "Voice Command Processed",
        description: "Cancelled profile editing",
      });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'TEAM_LEADER': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'EMPLOYEE': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!user) {
    return (
      <DashboardLayout role="EMPLOYEE">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Loading profile...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto">
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarImage src={user.profile_photo} />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {user.full_name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <CardTitle className="mt-4">{user.full_name}</CardTitle>
                <CardDescription>@{user.username}</CardDescription>
                <Badge className={getRoleColor(user.role)}>
                  {user.role.replace('_', ' ')}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                )}
                {user.address && (
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{user.address}</span>
                  </div>
                )}
                <div className="flex items-center space-x-3 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    Joined {new Date(user.created_at || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tasks Completed</span>
                  <Badge variant="outline">{stats.completedTasks || 0}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Tasks</span>
                  <Badge variant="outline">{stats.activeTasks || 0}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Skills</span>
                  <Badge variant="outline">{skills.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Earnings</span>
                  <Badge variant="outline" className="text-green-600">${stats.totalEarnings || 0}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="skills">Skills & Expertise</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                      <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                          Update your personal details and contact information
                        </CardDescription>
                      </div>
                      <Button
                        onClick={() => {
                          if (isEditing) {
                            handleSave();
                          } else {
                            setIsEditing(true);
                          }
                        }}
                        variant={isEditing ? "default" : "outline"}
                      >
                        {isEditing ? (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        ) : (
                          <>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                          id="full_name"
                          value={isEditing ? editedUser.full_name : user.full_name}
                          onChange={(e) => setEditedUser({...editedUser, full_name: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={isEditing ? editedUser.username : user.username}
                          onChange={(e) => setEditedUser({...editedUser, username: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={isEditing ? editedUser.email : user.email}
                        onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={isEditing ? editedUser.phone : user.phone || ''}
                          onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profile_photo">Profile Photo URL</Label>
                        <Input
                          id="profile_photo"
                          value={isEditing ? editedUser.profile_photo : user.profile_photo || ''}
                          onChange={(e) => setEditedUser({...editedUser, profile_photo: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={isEditing ? editedUser.address : user.address || ''}
                        onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>

                    {isEditing && (
                      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setEditedUser({
                              full_name: user.full_name || '',
                              username: user.username || '',
                              email: user.email || '',
                              phone: user.phone || '',
                              address: user.address || '',
                              profile_photo: user.profile_photo || ''
                            });
                          }}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                        <Button onClick={handleSave}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills & Expertise */}
              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                    <CardDescription>
                      Manage your skills to get better task assignments
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Input
                        placeholder="Add a new skill..."
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        className="flex-1"
                      />
                      <Button onClick={addSkill}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm border border-blue-200"
                          >
                            {skill}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSkill(skill)}
                              className="ml-2 h-auto p-0 text-blue-600 hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Award className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No skills added yet. Add your first skill above!</p>
                      </div>
                    )}

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 Skill Tips</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Add specific technical skills (e.g., "React", "Python", "Photoshop")</li>
                        <li>• Include soft skills (e.g., "Leadership", "Communication")</li>
                        <li>• Skills help with automatic task assignment</li>
                        <li>• Keep your skills updated for better matches</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account security and privacy
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg space-y-2 sm:space-y-0">
                        <div>
                          <h4 className="font-medium">Change Password</h4>
                          <p className="text-sm text-gray-600">Update your account password</p>
                        </div>
                        <Button variant="outline">
                          Change Password
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg space-y-2 sm:space-y-0">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">Add an extra layer of security</p>
                        </div>
                        <Button variant="outline">
                          Enable 2FA
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg space-y-2 sm:space-y-0">
                        <div>
                          <h4 className="font-medium">Login Sessions</h4>
                          <p className="text-sm text-gray-600">Manage your active sessions</p>
                        </div>
                        <Button variant="outline">
                          View Sessions
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg space-y-2 sm:space-y-0">
                        <div>
                          <h4 className="font-medium">Download Data</h4>
                          <p className="text-sm text-gray-600">Export your account data</p>
                        </div>
                        <Button variant="outline">
                          Download
                        </Button>
                      </div>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2">⚠️ Danger Zone</h4>
                      <p className="text-sm text-red-700 mb-3">
                        These actions are irreversible. Please proceed with caution.
                      </p>
                      <Button variant="destructive" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}