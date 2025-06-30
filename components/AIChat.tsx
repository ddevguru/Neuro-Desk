'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, Loader2, Zap, X, Minimize2, Maximize2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChat({ isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI assistant powered by advanced language models. I can help you with task management, team coordination, voice commands, and answer questions about NeuroDesk. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const message = userMessage.toLowerCase();

    // Enhanced AI responses with more comprehensive knowledge
    if (message.includes('voice') && (message.includes('command') || message.includes('control'))) {
      return `NeuroDesk's voice control system is incredibly powerful! Here's what you can do:

**🎯 Task Management:**
• "Create a new task" - Guided task creation
• "Assign task to [name]" - Smart task assignment
• "Complete task" - Mark tasks as done
• "Start task" - Begin working on tasks

**💬 Communication:**
• "Send message to team [message]" - Team broadcasts
• "Send message to [name] [message]" - Direct messages
• "Send announcement [message]" - Company-wide announcements

**🧭 Navigation:**
• "Go to tasks/dashboard/profile/reports" - Instant navigation
• "Show notifications" - View your alerts

**🌍 Multi-Language Support:**
The system works in 20+ languages including Spanish, French, German, Chinese, Hindi, and more. Just speak naturally in your preferred language!

**🔄 Continuous Listening:**
Once activated, the system listens continuously - no need to click buttons repeatedly. It auto-recovers from network issues and provides audio feedback.

Try saying "Create a new task" to see the guided creation process in action!`;
    }

    if (message.includes('task') && (message.includes('create') || message.includes('assign') || message.includes('manage'))) {
      return `NeuroDesk's intelligent task management system offers several powerful features:

**🤖 Smart Auto-Assignment:**
When you create a task with required skills, our AI automatically finds the best team member based on their skill profile. No manual assignment needed!

**📋 Voice-Guided Creation:**
Say "Create a new task" and the system will walk you through each field:
1. Task title
2. Description  
3. Priority level
4. Required skills
5. Payment amount

**💰 Automatic Payments:**
When tasks are completed, payments are automatically processed and team members are notified. All earnings are tracked in their profiles.

**🎯 Field-by-Field Voice Assignment:**
Say "Assign task" and the system will ask:
1. Which task to assign
2. Who to assign it to
Then handles everything automatically!

**📊 Real-Time Tracking:**
Monitor task progress, completion rates, and team productivity with live updates and comprehensive analytics.

Would you like me to guide you through creating your first voice-controlled task?`;
    }

    if (message.includes('team') && (message.includes('communication') || message.includes('message') || message.includes('chat'))) {
      return `NeuroDesk's communication hub keeps your team connected with multiple channels:

**💬 Team Chat:**
• Real-time team discussions
• Voice command: "Send message to team [your message]"
• Instant delivery to all team members

**📧 Direct Messages:**
• Private conversations with team members
• Voice command: "Send message to [name] [your message]"
• Secure and private communication

**📢 Announcements:**
• Company-wide broadcasts (Admin/Team Leader only)
• Voice command: "Send announcement [your message]"
• Reaches all team members instantly

**🔔 Smart Notifications:**
• Real-time alerts for new messages
• Task assignments and updates
• Payment confirmations

**🎤 Voice Integration:**
All communication features work seamlessly with voice commands. Just speak naturally and the system handles message delivery, user matching, and notifications.

The system even works offline - messages are queued and sent when connection is restored!`;
    }

    if (message.includes('payment') || message.includes('earning') || message.includes('money')) {
      return `NeuroDesk includes a comprehensive payment system for task-based work:

**💰 Automatic Processing:**
• Set payment amounts when creating tasks
• Payments automatically trigger when tasks are completed
• Instant notifications to team members

**📊 Earnings Tracking:**
• View total earnings in your profile
• Detailed payment history
• Task-specific payment records

**🔄 Payment Flow:**
1. Task created with payment amount
2. Task assigned to team member
3. Work completed and marked as done
4. Payment automatically processed
5. Notification sent to recipient

**💳 Payment Methods:**
• Secure transaction processing
• Multiple payment options supported
• Transparent fee structure

**📈 Analytics:**
• Track team payment trends
• Monitor project costs
• Generate financial reports

**🎤 Voice Commands:**
• "Create task with payment of [amount]"
• "Show my earnings"
• "Payment history"

All payments are secure, tracked, and integrated with the task management system for seamless workflow!`;
    }

    if (message.includes('premium') || message.includes('upgrade') || message.includes('subscription')) {
      return `NeuroDesk Premium unlocks the full potential of AI-powered task management:

**🚀 Premium Features:**
• Unlimited tasks and projects
• Advanced voice commands with custom phrases
• Priority customer support (24/7)
• Advanced analytics and reporting
• Custom team workflows
• API access for integrations

**💎 Enterprise Features:**
• Custom branding and white-labeling
• Advanced security and compliance
• Dedicated account manager
• Custom integrations and workflows
• Advanced user management
• SSO integration

**🎯 Pricing:**
• Premium: $9.99/month - Perfect for small teams
• Enterprise: $29.99/month - For large organizations

**✨ Benefits:**
• 10x more productive with unlimited features
• Advanced AI capabilities
• Custom voice command training
• Priority feature requests

**🔄 Easy Upgrade:**
Click "Upgrade to Premium" in the sidebar or say "Upgrade my account" with voice commands. 30-day money-back guarantee!

Ready to unlock the full power of NeuroDesk?`;
    }

    if (message.includes('help') || message.includes('support') || message.includes('how')) {
      return `I'm here to help you master NeuroDesk! Here are the main areas I can assist with:

**🎯 Getting Started:**
• Account setup and profile configuration
• Team member invitations
• First task creation

**🎤 Voice Commands:**
• Complete voice command reference
• Multi-language support setup
• Troubleshooting voice recognition

**📋 Task Management:**
• Creating and assigning tasks
• Setting up automatic assignments
• Payment configuration

**👥 Team Collaboration:**
• Communication setup
• Role management
• Team productivity optimization

**📊 Analytics & Reporting:**
• Understanding your dashboard
• Generating reports
• Performance tracking

**🔧 Technical Support:**
• Browser compatibility
• Microphone setup
• Network troubleshooting

**💡 Pro Tips:**
• Workflow optimization
• Advanced features
• Best practices

What specific area would you like help with? I can provide detailed guidance for any NeuroDesk feature!`;
    }

    if (message.includes('language') || message.includes('translate') || message.includes('multilingual')) {
      return `NeuroDesk's multilingual capabilities make it truly global:

**🌍 Supported Languages (20+):**
• English (US/UK) 🇺🇸🇬🇧
• Spanish 🇪🇸 • French 🇫🇷 • German 🇩🇪
• Italian 🇮🇹 • Portuguese 🇧🇷 • Russian 🇷🇺
• Japanese 🇯🇵 • Korean 🇰🇷 • Chinese 🇨🇳
• Hindi 🇮🇳 • Arabic 🇸🇦 • Dutch 🇳🇱
• Swedish 🇸🇪 • Danish 🇩🇰 • Norwegian 🇳🇴
• Finnish 🇫🇮 • Polish 🇵🇱 • Turkish 🇹🇷

**🔄 Smart Translation:**
• Speak in your native language
• System automatically translates to English for processing
• Responses can be in your preferred language
• Database stores in English for consistency

**🎤 Voice Recognition:**
• Native language speech recognition
• High accuracy across all supported languages
• Automatic language detection
• Context-aware translation

**💬 Communication:**
• Team members can use different languages
• Messages are translated for recipients
• Announcements work across language barriers

**⚙️ Setup:**
1. Click the language selector in voice commands
2. Choose your preferred language
3. Start speaking naturally
4. System handles everything else!

This makes NeuroDesk perfect for international teams and global organizations!`;
    }

    if (message.includes('security') || message.includes('privacy') || message.includes('safe')) {
      return `NeuroDesk takes security and privacy seriously with enterprise-grade protection:

**🔒 Data Security:**
• End-to-end encryption for all communications
• Secure database with encrypted storage
• Regular security audits and updates
• GDPR and CCPA compliant

**🛡️ Access Control:**
• Role-based permissions (Admin/Team Leader/Employee)
• Secure authentication with JWT tokens
• Session management and timeout
• Two-factor authentication available

**🎤 Voice Privacy:**
• Voice data processed locally when possible
• No permanent storage of voice recordings
• Encrypted transmission of voice commands
• User control over voice data

**💾 Data Protection:**
• Regular automated backups
• Data redundancy across multiple servers
• Disaster recovery procedures
• User data export capabilities

**🔐 Account Security:**
• Strong password requirements
• Account lockout protection
• Secure password reset procedures
• Login activity monitoring

**📋 Compliance:**
• SOC 2 Type II certified
• HIPAA compliant options
• ISO 27001 standards
• Regular penetration testing

**🚨 Incident Response:**
• 24/7 security monitoring
• Immediate threat response
• User notification procedures
• Transparent security reporting

Your data and privacy are our top priorities!`;
    }

    if (message.includes('api') || message.includes('integration') || message.includes('webhook')) {
      return `NeuroDesk offers powerful integration capabilities for seamless workflow automation:

**🔌 REST API:**
• Full CRUD operations for tasks, users, teams
• Real-time webhooks for events
• Rate limiting and authentication
• Comprehensive documentation

**📡 Webhook Events:**
• Task creation, assignment, completion
• User registration and updates
• Payment processing events
• Team communication events

**🔗 Popular Integrations:**
• Slack - Team notifications and commands
• Microsoft Teams - Seamless collaboration
• Google Workspace - Calendar and email sync
• Zapier - Connect to 3000+ apps
• GitHub - Development workflow integration

**⚙️ Custom Integrations:**
• RESTful API with JSON responses
• OAuth 2.0 authentication
• Real-time WebSocket connections
• GraphQL endpoint available

**📊 Data Export:**
• CSV/Excel export for all data
• JSON API responses
• Real-time data streaming
• Scheduled report delivery

**🛠️ Developer Tools:**
• SDKs for popular languages
• Postman collection available
• Interactive API documentation
• Sandbox environment for testing

**💼 Enterprise Features:**
• Custom API endpoints
• Dedicated support channel
• SLA guarantees
• White-label API options

Ready to integrate NeuroDesk with your existing tools?`;
    }

    if (message.includes('mobile') || message.includes('app') || message.includes('phone')) {
      return `NeuroDesk is fully optimized for mobile devices with native-like experience:

**📱 Mobile Web App:**
• Responsive design works on all devices
• Touch-optimized interface
• Swipe gestures for navigation
• Offline capability for core features

**🎤 Mobile Voice Commands:**
• Full voice control on mobile browsers
• Optimized for mobile microphones
• Background listening capability
• Touch-to-talk option

**📋 Mobile Features:**
• Complete task management
• Real-time team communication
• Push notifications (when supported)
• Camera integration for task photos

**🔔 Notifications:**
• Browser push notifications
• Email notifications as backup
• SMS notifications (Premium)
• In-app notification center

**⚡ Performance:**
• Fast loading on mobile networks
• Optimized for low bandwidth
• Progressive loading of content
• Cached data for offline use

**🎯 Mobile-Specific Features:**
• Location-based task assignments
• Photo attachments for tasks
• Voice memos for task updates
• Quick actions from home screen

**📊 Mobile Analytics:**
• Track mobile usage patterns
• Mobile-specific performance metrics
• User engagement analytics
• Device compatibility reports

**🔧 Browser Support:**
• Chrome, Safari, Firefox, Edge
• iOS Safari with full voice support
• Android Chrome optimized
• Progressive Web App (PWA) ready

Access NeuroDesk anywhere, anytime with full functionality!`;
    }

    if (message.includes('analytics') || message.includes('report') || message.includes('dashboard')) {
      return `NeuroDesk provides comprehensive analytics and reporting for data-driven decisions:

**📊 Real-Time Dashboard:**
• Live task completion rates
• Team productivity metrics
• Payment processing status
• User activity monitoring

**📈 Advanced Reports:**
• Task performance analytics
• Team efficiency reports
• Financial summaries and trends
• User productivity rankings

**🎯 Key Metrics:**
• Task completion rates by priority
• Average task completion time
• Team member workload distribution
• Payment processing analytics

**📋 Custom Reports:**
• Filter by date ranges, teams, users
• Export to PDF, Excel, CSV
• Scheduled report delivery
• Custom metric calculations

**🔍 Detailed Analytics:**
• Voice command usage statistics
• Communication pattern analysis
• Task assignment effectiveness
• Payment trend analysis

**📱 Mobile Analytics:**
• Mobile vs desktop usage
• Voice command accuracy rates
• User engagement metrics
• Performance optimization insights

**🎤 Voice Analytics:**
• Command recognition accuracy
• Most used voice commands
• Language usage patterns
• Error rate analysis

**💰 Financial Reports:**
• Payment processing summaries
• Earnings by team member
• Cost per task analysis
• Revenue trend forecasting

**🚀 Performance Insights:**
• System response times
• User satisfaction metrics
• Feature adoption rates
• Productivity improvement tracking

Transform your data into actionable insights with NeuroDesk analytics!`;
    }

    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return `Hello! Welcome to NeuroDesk - the future of AI-powered task management! 🚀

I'm your intelligent assistant, powered by advanced language models and integrated with NeuroDesk's comprehensive features. I can help you with:

**🎤 Voice Commands** - Complete hands-free control
**📋 Task Management** - Smart creation and assignment  
**👥 Team Collaboration** - Seamless communication
**📊 Analytics** - Data-driven insights
**💰 Payment Processing** - Automated task payments
**🌍 Multi-Language** - 20+ languages supported

What would you like to explore first? Try asking about:
• "How do voice commands work?"
• "How to create and assign tasks?"
• "Team communication features"
• "Payment and earnings system"

I'm here to help you master every aspect of NeuroDesk! What can I assist you with today?`;
    }

    if (message.includes('thank')) {
      return `You're very welcome! I'm always here to help you get the most out of NeuroDesk's powerful features. 

Whether you need help with voice commands, task management, team collaboration, or any other aspect of the platform, just ask! I'm designed to provide detailed, helpful guidance for users at all levels.

Feel free to ask me anything else about NeuroDesk - I'm here 24/7 to assist you! 🚀`;
    }

    // Default comprehensive response
    return `I understand you're asking about "${userMessage}". As your NeuroDesk AI assistant, I can help you with:

**🎯 Core Features:**
• Voice-controlled task management
• Smart team collaboration tools
• Automated payment processing
• Multi-language support (20+ languages)
• Real-time analytics and reporting

**🎤 Voice Commands:**
• "Create a new task" - Guided task creation
• "Send message to team [message]" - Team communication
• "Assign task to [name]" - Smart task assignment
• "Go to [page]" - Instant navigation

**💡 Popular Questions:**
• How do voice commands work?
• How to set up automatic task assignment?
• How to use team communication features?
• How to track payments and earnings?
• How to upgrade to Premium?

**🔧 Technical Support:**
• Browser compatibility and setup
• Microphone configuration
• Network troubleshooting
• Mobile optimization

Could you rephrase your question or ask about one of these specific topics? I'm here to provide detailed, helpful guidance for any aspect of NeuroDesk!`;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(inputMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'I apologize, but I\'m having trouble processing your request right now. Please try again or contact our support team for assistance.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Card className={`bg-white shadow-2xl border-2 border-blue-200 ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        } transition-all duration-300`}>
          <CardHeader className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI Assistant</CardTitle>
                  {!isMinimized && (
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm opacity-90">Online</span>
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-100 border-yellow-400/30">
                        <Zap className="w-3 h-3 mr-1" />
                        BOLT
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-0 flex flex-col h-[calc(600px-80px)]">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[85%] ${
                        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        }`}>
                          {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={`rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <div className="text-sm whitespace-pre-line leading-relaxed">
                            {message.content}
                          </div>
                          <p className={`text-xs mt-2 ${
                            message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                            <span className="text-sm text-gray-600">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything about NeuroDesk..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
                <div className="mt-2 text-center">
                  <p className="text-xs text-gray-500">
                    Powered by Advanced AI • Ask about voice commands, tasks, teams, or features
                  </p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}