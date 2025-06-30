'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  Search, 
  Book, 
  MessageCircle, 
  Video, 
  FileText, 
  Zap,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import DashboardLayout from '@/components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  });
  const { toast } = useToast();

  const faqItems = [
    {
      question: "How do I create a new task?",
      answer: "You can create a new task by going to the Tasks page and clicking the 'Create Task' button. You can also use voice commands by saying 'Create a new task' when voice commands are active."
    },
    {
      question: "How do voice commands work?",
      answer: "Voice commands use your browser's speech recognition. Click the microphone button and speak clearly. Commands like 'Create task', 'Show my tasks', 'Assign task to [name]' are supported."
    },
    {
      question: "How are tasks automatically assigned?",
      answer: "Tasks are automatically assigned based on skill matching. When you create a task with required skills, the system finds the best matching employee based on their skill profile."
    },
    {
      question: "How do I update my skills?",
      answer: "Go to your Profile page, click on the 'Skills & Expertise' tab, and add or remove skills. This helps with better task assignment."
    },
    {
      question: "What are the different user roles?",
      answer: "There are three roles: Admin (full system access), Team Leader (can create and assign tasks), and Employee (can view and complete assigned tasks)."
    },
    {
      question: "How do payments work?",
      answer: "When a task is completed and has a payment amount, the payment is automatically processed and added to your earnings. You'll receive a notification when payment is received."
    },
    {
      question: "How do I upgrade to Premium?",
      answer: "Click the 'Upgrade to Premium' button in the sidebar or user menu. Premium includes unlimited tasks, advanced features, and priority support."
    },
    {
      question: "Can I use NeuroDesk on mobile?",
      answer: "Yes! NeuroDesk is fully responsive and works great on mobile devices. All features including voice commands are available on mobile."
    }
  ];

  const tutorials = [
    {
      title: "Getting Started with NeuroDesk",
      description: "Learn the basics of task management and team collaboration",
      duration: "5 min",
      type: "video"
    },
    {
      title: "Using Voice Commands Effectively",
      description: "Master voice commands for faster task management",
      duration: "3 min",
      type: "video"
    },
    {
      title: "Setting Up Your Team",
      description: "Guide for team leaders on organizing and managing teams",
      duration: "8 min",
      type: "article"
    },
    {
      title: "Advanced Task Assignment",
      description: "Learn about skill-based automatic task assignment",
      duration: "6 min",
      type: "article"
    }
  ];

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate ticket submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Support Ticket Submitted",
      description: "We'll get back to you within 24 hours. Ticket ID: #" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    });

    setTicketForm({
      subject: '',
      category: '',
      priority: 'medium',
      description: ''
    });
  };

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="EMPLOYEE">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
            <p className="text-gray-600 mt-1">Get help and learn how to use NeuroDesk effectively</p>
          </div>
          <div className="flex items-center px-3 py-2 bg-yellow-100 rounded-lg border border-yellow-200">
            <Zap className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-yellow-700 text-sm font-semibold">Powered by Bolt</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
              <p className="text-gray-600 text-sm">Comprehensive guides and tutorials</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm">Get instant help from our support team</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-gray-600 text-sm">Watch step-by-step video guides</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="ticket">Support Ticket</TabsTrigger>
          </TabsList>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find answers to common questions about NeuroDesk
                </CardDescription>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search FAQ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredFAQ.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                {filteredFAQ.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <HelpCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No FAQ items found matching your search.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tutorials */}
          <TabsContent value="tutorials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="w-5 h-5 mr-2" />
                  Tutorials & Guides
                </CardTitle>
                <CardDescription>
                  Learn how to use NeuroDesk with our comprehensive tutorials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tutorials.map((tutorial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              tutorial.type === 'video' ? 'bg-red-100' : 'bg-blue-100'
                            }`}>
                              {tutorial.type === 'video' ? (
                                <Video className={`w-5 h-5 ${tutorial.type === 'video' ? 'text-red-600' : 'text-blue-600'}`} />
                              ) : (
                                <FileText className="w-5 h-5 text-blue-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
                              <p className="text-gray-600 text-sm mb-3">{tutorial.description}</p>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{tutorial.type}</Badge>
                                <Badge variant="outline">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {tutorial.duration}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Support
                  </CardTitle>
                  <CardDescription>
                    Send us an email for detailed support
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>support@neurodesk.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>Response time: 24 hours</span>
                  </div>
                  <Button className="w-full">
                    Send Email
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Phone Support
                  </CardTitle>
                  <CardDescription>
                    Call us for immediate assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>Mon-Fri: 9AM-6PM EST</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>
                  Get instant help from our support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-700 font-medium">Support team is online</span>
                  </div>
                  <p className="text-green-600 text-sm mt-1">Average response time: 2 minutes</p>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Ticket */}
          <TabsContent value="ticket" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit Support Ticket</CardTitle>
                <CardDescription>
                  Create a detailed support request for complex issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitTicket} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input
                        value={ticketForm.subject}
                        onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                        placeholder="Brief description of your issue"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <select
                        value={ticketForm.category}
                        onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                        className="w-full p-2 border rounded-md"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="technical">Technical Issue</option>
                        <option value="billing">Billing & Payments</option>
                        <option value="feature">Feature Request</option>
                        <option value="account">Account Management</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <div className="flex space-x-4">
                      {['low', 'medium', 'high', 'urgent'].map((priority) => (
                        <label key={priority} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value={priority}
                            checked={ticketForm.priority === priority}
                            onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                            className="text-blue-600"
                          />
                          <span className="capitalize">{priority}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                      placeholder="Please provide detailed information about your issue..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Ticket
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}