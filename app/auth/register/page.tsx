'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Brain, Zap, Eye, EyeOff, Loader2, Plus, X, Crown, Users, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    profile_photo: '',
    role: 'EMPLOYEE'
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        ...formData,
        skills
      });

      toast({
        title: "Registration successful!",
        description: "Your account has been created. Please sign in.",
      });

      router.push('/auth/login');
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.error || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    { value: 'ADMIN', label: 'Administrator', icon: Crown, color: 'text-purple-600', bg: 'bg-purple-100' },
    { value: 'TEAM_LEADER', label: 'Team Leader', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { value: 'EMPLOYEE', label: 'Employee', icon: User, color: 'text-green-600', bg: 'bg-green-100' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-32 h-32 border border-blue-500/20 rounded-full"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-48 h-48 border border-purple-500/20 rounded-full"
        />
      </div>

      <div className="max-w-4xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div className="flex items-center justify-center mb-4">
                <Brain className="w-12 h-12 text-blue-400 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-white">NeuroDesk</h1>
                  <div className="flex items-center justify-center mt-1">
                    <div className="flex items-center px-2 py-1 bg-yellow-500/20 rounded border border-yellow-500/30">
                      <Zap className="w-3 h-3 text-yellow-400 mr-1" />
                      <span className="text-yellow-400 text-xs font-semibold">BOLT</span>
                    </div>
                  </div>
                </div>
              </div>
              <CardTitle className="text-white text-2xl">Create Your Account</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Join the AI-powered workspace revolution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-6">
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label className="text-white text-lg font-semibold">Select Your Role</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {roleOptions.map((role) => (
                      <motion.div
                        key={role.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card 
                          className={`cursor-pointer transition-all duration-200 ${
                            formData.role === role.value 
                              ? 'bg-white/20 border-white/40 shadow-lg' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                          onClick={() => setFormData({...formData, role: role.value})}
                        >
                          <CardContent className="p-4 text-center">
                            <div className={`w-12 h-12 rounded-full ${role.bg} flex items-center justify-center mx-auto mb-3`}>
                              <role.icon className={`w-6 h-6 ${role.color}`} />
                            </div>
                            <h3 className="text-white font-semibold">{role.label}</h3>
                            <p className="text-gray-400 text-sm mt-1">
                              {role.value === 'ADMIN' && 'Full system access'}
                              {role.value === 'TEAM_LEADER' && 'Manage team tasks'}
                              {role.value === 'EMPLOYEE' && 'Complete assigned tasks'}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="full_name" className="text-white">Full Name</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      type="text"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Choose a username"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a strong password"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 pr-12 h-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile_photo" className="text-white">Profile Photo URL</Label>
                    <Input
                      id="profile_photo"
                      name="profile_photo"
                      type="url"
                      value={formData.profile_photo}
                      onChange={handleInputChange}
                      placeholder="https://example.com/photo.jpg"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-white">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Your address"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                    rows={3}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-white">Skills & Expertise</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      placeholder="Add a skill (e.g., JavaScript, Design, Marketing)"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 h-12"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <Button
                      type="button"
                      onClick={addSkill}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 h-12 px-6"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {skills.map((skill, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                        >
                          {skill}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 h-auto p-0 text-blue-300 hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-14 text-lg font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <Button
                    variant="link"
                    className="text-blue-400 hover:text-blue-300 p-0 font-semibold"
                    onClick={() => router.push('/auth/login')}
                  >
                    Sign in
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}