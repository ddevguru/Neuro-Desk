'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Zap,
  Home,
  CheckSquare,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  Bell,
  HelpCircle,
  User,
  LogOut,
  Menu,
  X,
  Crown,
  Bot,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import AIChat from '@/components/AIChat';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'ADMIN' | 'TEAM_LEADER' | 'EMPLOYEE';
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState('FREE');
  const [showAIChat, setShowAIChat] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setSubscriptionStatus(parsedUser.subscription_status || 'FREE');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const getNavigationItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', href: `/dashboard/${role.toLowerCase().replace('_', '-')}` },
      { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
      { icon: MessageSquare, label: 'Communication', href: '/communication' },
      { icon: Bell, label: 'Notifications', href: '/notifications' },
      { icon: User, label: 'Profile', href: '/profile' },
    ];

    if (role === 'ADMIN') {
      return [
        ...baseItems.slice(0, 2),
        { icon: Users, label: 'Team Management', href: '/team-management' },
        { icon: BarChart3, label: 'Reports & Analytics', href: '/reports' },
        { icon: Settings, label: 'Settings', href: '/settings' },
        ...baseItems.slice(2),
        { icon: HelpCircle, label: 'Help & Support', href: '/help' },
      ];
    } else if (role === 'TEAM_LEADER') {
      return [
        ...baseItems.slice(0, 2),
        { icon: Users, label: 'Team Management', href: '/team-management' },
        { icon: BarChart3, label: 'Reports', href: '/reports' },
        ...baseItems.slice(2),
        { icon: HelpCircle, label: 'Help & Support', href: '/help' },
      ];
    }

    return [
      ...baseItems,
      { icon: HelpCircle, label: 'Help & Support', href: '/help' },
    ];
  };

  const navigationItems = getNavigationItems();

  const getSubscriptionBadge = () => {
    switch (subscriptionStatus) {
      case 'PREMIUM':
        return <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">Premium</Badge>;
      case 'ENTERPRISE':
        return <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Enterprise</Badge>;
      default:
        return <Badge variant="outline" className="border-gray-300 text-gray-600">Free</Badge>;
    }
  };

  // Current date and time
  const currentDateTime = "Sunday, June 29, 2025, 11:40 PM IST";
  const motivationalMessage = "Empower your day with NeuroDesk!";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <style jsx>{`
        .glassmorphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        @supports not (backdrop-filter: blur(10px)) {
          .glassmorphism {
            background: rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Always visible on large screens */}
      <aside className={`
        fixed top-0 left-0 z-50 w-80 h-full glassmorphism
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
        md:w-64 sm:w-56
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="w-8 h-8 text-blue-600" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-blue-200 rounded-full"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NeuroDesk</h1>
                <div className="flex items-center mt-1">
                  <div className="flex items-center px-2 py-1 bg-yellow-100 rounded border border-yellow-200">
                    <Zap className="w-3 h-3 text-yellow-600 mr-1" />
                    <span className="text-yellow-700 text-xs font-semibold">BOLT</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-600 hover:bg-white/20"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User info */}
          <div className="p-4 sm:p-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 sm:w-10 sm:h-10">
                <AvatarImage src={user?.profile_photo} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  {user?.full_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-gray-900">{user?.full_name}</p>
                <p className="text-xs text-gray-500 truncate">@{user?.username}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant={role === 'ADMIN' ? 'default' : role === 'TEAM_LEADER' ? 'secondary' : 'outline'} className="text-xs">
                    {role.replace('_', ' ')}
                  </Badge>
                  {getSubscriptionBadge()}
                </div>
              </div>
            </div>
            
            {subscriptionStatus === 'FREE' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 glassmorphism rounded-lg"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Crown className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">Upgrade to Premium</span>
                </div>
                <p className="text-xs text-blue-600 mb-2">Unlock advanced features and unlimited tasks</p>
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Upgrade Now
                </Button>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 sm:px-4 py-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={`w-full justify-start h-12 text-left ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-white/20'
                    }`}
                    onClick={() => {
                      router.push(item.href);
                      setSidebarOpen(false);
                    }}
                  >
                    <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Button>
                </motion.div>
              );
            })}
          </nav>

          {/* AI Chat Button */}
          <div className="p-4 border-t border-gray-200/50">
            <Button
              onClick={() => setShowAIChat(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white mb-2"
            >
              <Bot className="w-5 h-5 mr-3" />
              AI Assistant
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white/10 shadow-sm border-b border-gray-200/50 sticky top-0 z-30 glassmorphism">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 flex-wrap gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-600 hover:bg-white/20"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{currentDateTime}</span>
              <span className="hidden sm:inline">• {motivationalMessage}</span>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative text-gray-600 hover:bg-white/20"
                onClick={() => router.push('/notifications')}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAIChat(true)}
                className="hidden sm:flex items-center space-x-2 text-purple-600 hover:text-purple-700 hover:bg-white/20"
              >
                <Bot className="w-5 h-5" />
                <span>AI Assistant</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profile_photo} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {user?.full_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glassmorphism" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-gray-900">{user?.full_name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {getSubscriptionBadge()}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowAIChat(true)}>
                    <Bot className="mr-2 h-4 w-4" />
                    AI Assistant
                  </DropdownMenuItem>
                  {subscriptionStatus === 'FREE' && (
                    <DropdownMenuItem>
                      <Crown className="mr-2 h-4 w-4" />
                      Upgrade to Premium
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 md:p-8 lg:p-10 flex-1 overflow-x-auto">
          {children}
        </main>
      </div>

      {/* AI Chat Component */}
      <AIChat 
        isOpen={showAIChat} 
        onClose={() => setShowAIChat(false)} 
      />
    </div>
  );
}