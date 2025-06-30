'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Users, 
  Mic, 
  MicOff, 
  Zap, 
  Bell,
  Search,
  Plus,
  Hash,
  AtSign
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import DashboardLayout from '@/components/DashboardLayout';
import VoiceCommand from '@/components/VoiceCommand';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface Message {
  receiver_id: number;
  id: number;
  sender_id: number;
  sender_name: string;
  message: string;
  message_type: string;
  created_at: string;
}

interface User {
  id: number;
  full_name: string;
  username: string;
  role: string;
  profile_photo: string;
}

export default function CommunicationPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchUsers();
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (messageType: 'DIRECT' | 'TEAM' | 'ANNOUNCEMENT' = 'TEAM') => {
    if (!currentMessage.trim()) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/messages', {
        message: currentMessage,
        message_type: messageType,
        receiver_id: selectedUser?.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCurrentMessage('');
      fetchMessages();
      
      toast({
        title: "Message Sent",
        description: `Your ${messageType.toLowerCase()} message has been sent`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const handleVoiceCommand = async (command: string) => {
    const cmd = command.toLowerCase();
    
    if (cmd.includes('send message') || cmd.includes('send announcement')) {
      const messageMatch = cmd.match(/send (?:message|announcement) (.+)/);
      if (messageMatch) {
        setCurrentMessage(messageMatch[1]);
        toast({
          title: "Voice Command Processed",
          description: "Message text added. Click send to deliver.",
        });
      }
    } else if (cmd.includes('refresh messages') || cmd.includes('update messages')) {
      fetchMessages();
      toast({
        title: "Voice Command Processed",
        description: "Messages refreshed",
      });
    }
  };

  const filteredUsers = users.filter(u => 
    u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const teamMessages = messages.filter(m => m.message_type === 'TEAM' || m.message_type === 'ANNOUNCEMENT');
  const directMessages = messages.filter(m => m.message_type === 'DIRECT');

  return (
    <DashboardLayout role={user?.role || 'EMPLOYEE'}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Communication Hub</h1>
            <p className="text-gray-600 mt-1">Stay connected with your team</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Team Members */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Team Members
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {filteredUsers.map((member) => (
                      <motion.div
                        key={member.id}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedUser?.id === member.id 
                            ? 'bg-blue-50 border border-blue-200' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedUser(member)}
                      >
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={member.profile_photo} />
                          <AvatarFallback>{member.full_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {member.full_name}
                          </p>
                          <p className="text-xs text-gray-500">@{member.username}</p>
                          <Badge 
                            variant="outline" 
                            className="text-xs mt-1"
                          >
                            {member.role.replace('_', ' ')}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="team" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="team" className="flex items-center">
                  <Hash className="w-4 h-4 mr-2" />
                  Team Chat
                </TabsTrigger>
                <TabsTrigger value="direct" className="flex items-center">
                  <AtSign className="w-4 h-4 mr-2" />
                  Direct Messages
                </TabsTrigger>
                <TabsTrigger value="announcements" className="flex items-center">
                  <Bell className="w-4 h-4 mr-2" />
                  Announcements
                </TabsTrigger>
              </TabsList>

              {/* Team Chat */}
              <TabsContent value="team">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Team Discussion
                    </CardTitle>
                    <CardDescription>
                      General team communication and updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ScrollArea className="flex-1 mb-4">
                      <div className="space-y-4">
                        {teamMessages.map((message) => (
                          <MessageBubble 
                            key={message.id} 
                            message={message} 
                            isOwn={message.sender_id === user?.id}
                          />
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                    <div className="flex space-x-2">
                      <Textarea
                        placeholder="Type your message..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        className="flex-1 min-h-[60px]"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage('TEAM');
                          }
                        }}
                      />
                      <Button 
                        onClick={() => sendMessage('TEAM')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Direct Messages */}
              <TabsContent value="direct">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AtSign className="w-5 h-5 mr-2" />
                      Direct Messages
                      {selectedUser && (
                        <span className="ml-2 text-sm font-normal text-gray-600">
                          with {selectedUser.full_name}
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {selectedUser 
                        ? `Private conversation with ${selectedUser.full_name}`
                        : "Select a team member to start a direct conversation"
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    {selectedUser ? (
                      <>
                        <ScrollArea className="flex-1 mb-4">
                          <div className="space-y-4">
                            {directMessages
                              .filter(m => 
                                (m.sender_id === user?.id && m.receiver_id === selectedUser.id) ||
                                (m.sender_id === selectedUser.id && m.receiver_id === user?.id)
                              )
                              .map((message) => (
                                <MessageBubble 
                                  key={message.id} 
                                  message={message} 
                                  isOwn={message.sender_id === user?.id}
                                />
                              ))}
                            <div ref={messagesEndRef} />
                          </div>
                        </ScrollArea>
                        <div className="flex space-x-2">
                          <Textarea
                            placeholder={`Message ${selectedUser.full_name}...`}
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            className="flex-1 min-h-[60px]"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage('DIRECT');
                              }
                            }}
                          />
                          <Button 
                            onClick={() => sendMessage('DIRECT')}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p>Select a team member to start chatting</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Announcements */}
              <TabsContent value="announcements">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="w-5 h-5 mr-2" />
                      Announcements
                    </CardTitle>
                    <CardDescription>
                      Important updates and company-wide messages
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ScrollArea className="flex-1 mb-4">
                      <div className="space-y-4">
                        {messages
                          .filter(m => m.message_type === 'ANNOUNCEMENT')
                          .map((message) => (
                            <div key={message.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="flex items-start space-x-3">
                                <Bell className="w-5 h-5 text-blue-600 mt-1" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-blue-900">
                                    {message.sender_name}
                                  </p>
                                  <p className="text-gray-800 mt-1">{message.message}</p>
                                  <p className="text-xs text-gray-500 mt-2">
                                    {new Date(message.created_at).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                    {(user?.role === 'ADMIN' || user?.role === 'TEAM_LEADER') && (
                      <div className="flex space-x-2">
                        <Textarea
                          placeholder="Create an announcement..."
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                          className="flex-1 min-h-[60px]"
                        />
                        <Button 
                          onClick={() => sendMessage('ANNOUNCEMENT')}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Bell className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
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

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isOwn 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-900'
      }`}>
        {!isOwn && (
          <p className="text-xs font-medium mb-1 opacity-75">
            {message.sender_name}
          </p>
        )}
        <p className="text-sm">{message.message}</p>
        <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
          {new Date(message.created_at).toLocaleTimeString()}
        </p>
      </div>
    </motion.div>
  );
}