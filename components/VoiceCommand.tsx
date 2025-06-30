'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Loader2, Zap, AlertCircle, Wifi, WifiOff, Globe, Languages } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface VoiceCommandProps {
  onCommand: (command: string) => void;
  autoStart?: boolean;
  continuousListening?: boolean;
}

export default function VoiceCommand({ onCommand, autoStart = false, continuousListening = true }: VoiceCommandProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [language, setLanguage] = useState('en-US');
  const [taskCreationData, setTaskCreationData] = useState<any>({});
  const [isCollectingTaskData, setIsCollectingTaskData] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [isAutoListening, setIsAutoListening] = useState(continuousListening);
  const [lastCommand, setLastCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  // Supported languages for voice recognition
  const supportedLanguages = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
    { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
    { code: 'de-DE', name: 'German', flag: '🇩🇪' },
    { code: 'it-IT', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt-BR', name: 'Portuguese', flag: '🇧🇷' },
    { code: 'ru-RU', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh-CN', name: 'Chinese (Simplified)', flag: '🇨🇳' },
    { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ar-SA', name: 'Arabic', flag: '🇸🇦' },
    { code: 'nl-NL', name: 'Dutch', flag: '🇳🇱' },
    { code: 'sv-SE', name: 'Swedish', flag: '🇸🇪' },
    { code: 'da-DK', name: 'Danish', flag: '🇩🇰' },
    { code: 'no-NO', name: 'Norwegian', flag: '🇳🇴' },
    { code: 'fi-FI', name: 'Finnish', flag: '🇫🇮' },
    { code: 'pl-PL', name: 'Polish', flag: '🇵🇱' },
    { code: 'tr-TR', name: 'Turkish', flag: '🇹🇷' }
  ];

  useEffect(() => {
    // Check network status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);

    // Fetch users for task assignment
    fetchUsers();

    // Check if Speech Recognition is available
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      initRecognition();
      
      // Auto-start if enabled
      if (autoStart && isOnline) {
        setTimeout(() => {
          startContinuousListening();
        }, 1000);
      }
    } else {
      setIsSupported(false);
      setError('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.log('Recognition cleanup');
        }
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
    };
  }, [autoStart, isOnline]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const initRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    try {
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;
      recognitionRef.current.maxAlternatives = 3;

      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        setError('');
      };

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence || 0.8;

          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            setConfidence(confidence);
            console.log('Final transcript:', transcript);
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);

        if (finalTranscript.trim()) {
          processCommand(finalTranscript.trim());
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        
        if (event.error === 'network') {
          setError('Network error. Retrying...');
          // Auto-restart on network error
          if (isAutoListening) {
            restartTimeoutRef.current = setTimeout(() => {
              startContinuousListening();
            }, 2000);
          }
        } else if (event.error === 'not-allowed') {
          setError('Microphone access denied. Please allow microphone permissions.');
          setIsAutoListening(false);
        } else if (event.error === 'no-speech') {
          // Don't show error for no speech, just restart
          if (isAutoListening) {
            restartTimeoutRef.current = setTimeout(() => {
              startContinuousListening();
            }, 1000);
          }
        } else {
          setError(`Speech recognition error: ${event.error}`);
        }
        
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
        
        // Auto-restart if continuous listening is enabled
        if (isAutoListening && isOnline) {
          restartTimeoutRef.current = setTimeout(() => {
            startContinuousListening();
          }, 500);
        }
      };
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      setIsSupported(false);
      setError('Speech recognition initialization failed.');
    }
  };

  const startContinuousListening = () => {
    if (!isSupported || !isOnline) return;
    
    try {
      if (recognitionRef.current && !isListening) {
        setTranscript('');
        setConfidence(0);
        setError('');
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error('Error starting recognition:', error);
      setError('Failed to start voice recognition.');
    }
  };

  const stopListening = () => {
    setIsAutoListening(false);
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log('Recognition already stopped');
      }
    }
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }
  };

  const toggleContinuousListening = () => {
    if (isAutoListening) {
      stopListening();
    } else {
      setIsAutoListening(true);
      startContinuousListening();
    }
  };

  // Translation function (simplified - in production use Google Translate API)
  const translateToEnglish = async (text: string, fromLang: string): Promise<string> => {
    // If already English, return as is
    if (fromLang.startsWith('en')) {
      return text;
    }

    // Simple translation mapping for common phrases
    const translations: { [key: string]: { [key: string]: string } } = {
      'es-ES': {
        'crear tarea': 'create task',
        'enviar mensaje': 'send message',
        'asignar tarea': 'assign task',
        'completar tarea': 'complete task',
        'ir a tareas': 'go to tasks',
        'ir a comunicación': 'go to communication',
        'ir a perfil': 'go to profile',
        'ayuda': 'help'
      },
      'fr-FR': {
        'créer tâche': 'create task',
        'envoyer message': 'send message',
        'assigner tâche': 'assign task',
        'terminer tâche': 'complete task',
        'aller aux tâches': 'go to tasks',
        'aller à communication': 'go to communication',
        'aller au profil': 'go to profile',
        'aide': 'help'
      },
      'de-DE': {
        'aufgabe erstellen': 'create task',
        'nachricht senden': 'send message',
        'aufgabe zuweisen': 'assign task',
        'aufgabe abschließen': 'complete task',
        'zu aufgaben gehen': 'go to tasks',
        'zu kommunikation gehen': 'go to communication',
        'zum profil gehen': 'go to profile',
        'hilfe': 'help'
      }
    };

    const langTranslations = translations[fromLang];
    if (langTranslations) {
      const lowerText = text.toLowerCase();
      for (const [foreign, english] of Object.entries(langTranslations)) {
        if (lowerText.includes(foreign)) {
          return text.toLowerCase().replace(foreign, english);
        }
      }
    }

    // If no translation found, return original text
    return text;
  };

  const processCommand = async (command: string) => {
    setIsProcessing(true);
    setLastCommand(command);
    setCommandHistory(prev => [command, ...prev.slice(0, 4)]);
    
    try {
      console.log('Processing command:', command);
      
      // Translate to English if needed
      const englishCommand = await translateToEnglish(command, language);
      console.log('Translated command:', englishCommand);
      
      // Handle task creation flow
      if (isCollectingTaskData) {
        await handleTaskCreationFlow(englishCommand);
        return;
      }
      
      // Execute specific commands
      await executeVoiceCommand(englishCommand);
      
      // Call the parent onCommand handler
      onCommand(englishCommand);
      
      // Text-to-speech response (if available)
      if ('speechSynthesis' in window && isOnline) {
        const response = getCommandResponse(englishCommand);
        speak(response);
      }
    } catch (error) {
      console.error('Error processing command:', error);
      setError('Error processing command');
      speak('Sorry, I encountered an error processing that command');
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setTranscript('');
        setConfidence(0);
        if (!isListening && !isCollectingTaskData) {
          setError('');
        }
      }, 3000);
    }
  };

  const executeVoiceCommand = async (command: string) => {
    const cmd = command.toLowerCase();
    const token = localStorage.getItem('token');

    try {
      // Task creation commands
      if (cmd.includes('create task') || cmd.includes('new task') || cmd.includes('create a task') || cmd.includes('add task')) {
        setIsCollectingTaskData(true);
        setCurrentField('title');
        setTaskCreationData({});
        speak('I\'ll help you create a new task. What is the task title?');
        return;
      }

      // Task assignment commands with field-wise collection
      if (cmd.includes('assign task') && !cmd.includes(' to ')) {
        setIsCollectingTaskData(true);
        setCurrentField('assign_task_title');
        setTaskCreationData({});
        speak('Which task would you like to assign? Please say the task title or say "latest task" for the most recent task.');
        return;
      }

      // Direct task assignment
      if (cmd.includes('assign task to') || cmd.includes('assign to')) {
        const userMatch = cmd.match(/assign (?:task )?to\s+(.+)/);
        if (userMatch && token) {
          const userName = userMatch[1].trim();
          await assignTaskToUser(userName);
        }
        return;
      }

      // Message sending commands with better parsing
      if (cmd.includes('send message to team') || cmd.includes('message team') || cmd.includes('team message')) {
        let messageText = '';
        
        if (cmd.includes('send message to team')) {
          const match = cmd.match(/send message to team\s+(.+)/);
          messageText = match ? match[1] : '';
        } else if (cmd.includes('message team')) {
          const match = cmd.match(/message team\s+(.+)/);
          messageText = match ? match[1] : '';
        } else if (cmd.includes('team message')) {
          const match = cmd.match(/team message\s+(.+)/);
          messageText = match ? match[1] : '';
        }

        if (messageText && token) {
          await sendMessage(messageText, 'TEAM');
          speak('Message sent to team successfully');
        } else {
          speak('Please specify the message to send to the team');
        }
        return;
      }

      // Direct message commands
      if (cmd.includes('send message to') && !cmd.includes('team')) {
        const userMatch = cmd.match(/send message to\s+(\w+)\s+(.+)/);
        if (userMatch && token) {
          const userName = userMatch[1];
          const messageText = userMatch[2];
          await sendDirectMessage(userName, messageText);
        }
        return;
      }

      // Announcement commands
      if (cmd.includes('send announcement') || cmd.includes('announce') || cmd.includes('make announcement')) {
        let messageText = '';
        
        if (cmd.includes('send announcement')) {
          const match = cmd.match(/send announcement\s+(.+)/);
          messageText = match ? match[1] : '';
        } else if (cmd.includes('announce')) {
          const match = cmd.match(/announce\s+(.+)/);
          messageText = match ? match[1] : '';
        } else if (cmd.includes('make announcement')) {
          const match = cmd.match(/make announcement\s+(.+)/);
          messageText = match ? match[1] : '';
        }

        if (messageText && token) {
          await sendMessage(messageText, 'ANNOUNCEMENT');
          speak('Announcement sent successfully');
        }
        return;
      }

      // Task status commands
      if (cmd.includes('complete task') || cmd.includes('mark task complete') || cmd.includes('finish task')) {
        await updateTaskStatus('COMPLETED');
        return;
      }

      if (cmd.includes('start task') || cmd.includes('begin task') || cmd.includes('start working')) {
        await updateTaskStatus('IN_PROGRESS');
        return;
      }

      // Navigation commands
      if (cmd.includes('go to tasks') || cmd.includes('show tasks') || cmd.includes('open tasks')) {
        router.push('/tasks');
        speak('Navigating to tasks page');
        return;
      }

      if (cmd.includes('go to profile') || cmd.includes('show profile') || cmd.includes('open profile')) {
        router.push('/profile');
        speak('Navigating to profile page');
        return;
      }

      if (cmd.includes('go to team') || cmd.includes('show team') || cmd.includes('team management')) {
        router.push('/team-management');
        speak('Navigating to team management page');
        return;
      }

      if (cmd.includes('go to communication') || cmd.includes('show messages') || cmd.includes('open chat')) {
        router.push('/communication');
        speak('Navigating to communication page');
        return;
      }

      if (cmd.includes('go to reports') || cmd.includes('show reports') || cmd.includes('open reports')) {
        router.push('/reports');
        speak('Navigating to reports page');
        return;
      }

      if (cmd.includes('go to dashboard') || cmd.includes('show dashboard') || cmd.includes('open dashboard')) {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          router.push(`/dashboard/${user.role.toLowerCase().replace('_', '-')}`);
          speak('Navigating to dashboard');
        }
        return;
      }

      if (cmd.includes('go to notifications') || cmd.includes('show notifications') || cmd.includes('open notifications')) {
        router.push('/notifications');
        speak('Navigating to notifications page');
        return;
      }

      if (cmd.includes('go to help') || cmd.includes('show help') || cmd.includes('open help')) {
        router.push('/help');
        speak('Navigating to help page');
        return;
      }

      // Email invitation commands
      if (cmd.includes('invite') && cmd.includes('@')) {
        const emailMatch = cmd.match(/invite\s+([^\s]+@[^\s]+)/);
        if (emailMatch && token) {
          await sendInvitation(emailMatch[1]);
        }
        return;
      }

      // Help commands
      if (cmd.includes('help') || cmd.includes('what can you do') || cmd.includes('commands')) {
        speak('I can help you create tasks, send messages, assign tasks, navigate pages, and manage your workspace. Try saying "create a new task", "send message to team", or "go to tasks"');
        return;
      }

      // Page-specific commands
      if (cmd.includes('refresh page') || cmd.includes('reload page')) {
        window.location.reload();
        speak('Refreshing page');
        return;
      }

      // Unknown command
      speak('I didn\'t understand that command. Try saying "help" to see available commands.');

    } catch (error) {
      console.error('Error executing voice command:', error);
      speak('Sorry, I encountered an error executing that command');
      toast({
        title: "Command Error",
        description: "There was an error executing your voice command",
        variant: "destructive",
      });
    }
  };

  const handleTaskCreationFlow = async (input: string) => {
    const token = localStorage.getItem('token');
    
    switch (currentField) {
      case 'title':
        setTaskCreationData(prev => ({ ...prev, title: input }));
        setCurrentField('description');
        speak('Got it. Now, what is the task description?');
        break;
        
      case 'description':
        setTaskCreationData(prev => ({ ...prev, description: input }));
        setCurrentField('priority');
        speak('Perfect. What is the priority? Say low, medium, high, or urgent.');
        break;
        
      case 'priority':
        const priority = input.toLowerCase().includes('urgent') ? 'URGENT' :
                        input.toLowerCase().includes('high') ? 'HIGH' :
                        input.toLowerCase().includes('low') ? 'LOW' : 'MEDIUM';
        setTaskCreationData(prev => ({ ...prev, priority }));
        setCurrentField('skills');
        speak('What skills are required for this task? List them separated by commas, or say none.');
        break;
        
      case 'skills':
        const skills = input.toLowerCase() === 'none' ? [] : 
                     input.split(',').map(s => s.trim()).filter(Boolean);
        setTaskCreationData(prev => ({ ...prev, required_skills: skills }));
        setCurrentField('payment');
        speak('What is the payment amount for this task? Say the amount in dollars or say zero for no payment.');
        break;
        
      case 'payment':
        const paymentMatch = input.match(/(\d+(?:\.\d{2})?)/);
        const payment = paymentMatch ? parseFloat(paymentMatch[1]) : 0;
        const finalTaskData = { ...taskCreationData, payment_amount: payment };
        
        await createTask(finalTaskData);
        break;

      case 'assign_task_title':
        if (input.toLowerCase().includes('latest task') || input.toLowerCase().includes('recent task')) {
          setTaskCreationData(prev => ({ ...prev, useLatestTask: true }));
        } else {
          setTaskCreationData(prev => ({ ...prev, taskTitle: input }));
        }
        setCurrentField('assign_user');
        speak('Who would you like to assign this task to? Say the person\'s name.');
        break;

      case 'assign_user':
        const userName = input.trim();
        await assignSpecificTask(taskCreationData.taskTitle, taskCreationData.useLatestTask, userName);
        break;
    }
  };

  const createTask = async (taskData: any) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.post('http://localhost:5000/api/tasks', taskData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.assigned_to) {
          speak('Task created successfully and assigned automatically based on skills');
        } else {
          speak('Task created successfully and is ready for assignment');
        }
        
        toast({
          title: "Task Created",
          description: `Task "${taskData.title}" has been created successfully`,
        });
      }
    } catch (error) {
      speak('Sorry, there was an error creating the task');
      toast({
        title: "Task Creation Failed",
        description: "There was an error creating the task",
        variant: "destructive",
      });
    }
    
    // Reset the flow
    setIsCollectingTaskData(false);
    setCurrentField('');
    setTaskCreationData({});
  };

  const assignTaskToUser = async (userName: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Find user by name
      const targetUser = users.find(u => 
        u.full_name.toLowerCase().includes(userName.toLowerCase()) ||
        u.username.toLowerCase().includes(userName.toLowerCase())
      );

      if (targetUser) {
        // Get the latest pending task
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const pendingTasks = response.data.filter((t: any) => t.status === 'PENDING' && !t.assigned_to);
        
        if (pendingTasks.length > 0) {
          await axios.put(`http://localhost:5000/api/tasks/${pendingTasks[0].id}/assign`, 
            { assigned_to: targetUser.id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          speak(`Task "${pendingTasks[0].title}" assigned to ${targetUser.full_name}`);
          toast({
            title: "Task Assigned",
            description: `Task "${pendingTasks[0].title}" has been assigned to ${targetUser.full_name}`,
          });
        } else {
          speak('No pending tasks available to assign');
        }
      } else {
        speak(`User ${userName} not found`);
      }
    } catch (error) {
      speak('Error assigning task');
      console.error('Error assigning task:', error);
    }
  };

  const assignSpecificTask = async (taskTitle: string, useLatest: boolean, userName: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Find user by name
      const targetUser = users.find(u => 
        u.full_name.toLowerCase().includes(userName.toLowerCase()) ||
        u.username.toLowerCase().includes(userName.toLowerCase())
      );

      if (!targetUser) {
        speak(`User ${userName} not found`);
        setIsCollectingTaskData(false);
        setCurrentField('');
        setTaskCreationData({});
        return;
      }

      // Get tasks
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      let taskToAssign;
      
      if (useLatest) {
        const pendingTasks = response.data.filter((t: any) => t.status === 'PENDING' && !t.assigned_to);
        taskToAssign = pendingTasks[0];
      } else {
        taskToAssign = response.data.find((t: any) => 
          t.title.toLowerCase().includes(taskTitle.toLowerCase()) && 
          t.status === 'PENDING' && 
          !t.assigned_to
        );
      }
      
      if (taskToAssign) {
        await axios.put(`http://localhost:5000/api/tasks/${taskToAssign.id}/assign`, 
          { assigned_to: targetUser.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        speak(`Task "${taskToAssign.title}" assigned to ${targetUser.full_name}`);
        toast({
          title: "Task Assigned",
          description: `Task "${taskToAssign.title}" has been assigned to ${targetUser.full_name}`,
        });
      } else {
        speak('Task not found or already assigned');
      }
    } catch (error) {
      speak('Error assigning task');
      console.error('Error assigning task:', error);
    }
    
    // Reset the flow
    setIsCollectingTaskData(false);
    setCurrentField('');
    setTaskCreationData({});
  };

  const sendMessage = async (message: string, type: 'TEAM' | 'ANNOUNCEMENT') => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.post('http://localhost:5000/api/messages', {
        message: message,
        message_type: type
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Message Sent",
        description: `Your ${type.toLowerCase()} message has been sent`,
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const sendDirectMessage = async (userName: string, message: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Find user by name
      const targetUser = users.find(u => 
        u.full_name.toLowerCase().includes(userName.toLowerCase()) ||
        u.username.toLowerCase().includes(userName.toLowerCase())
      );

      if (targetUser) {
        await axios.post('http://localhost:5000/api/messages', {
          message: message,
          message_type: 'DIRECT',
          receiver_id: targetUser.id
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        speak(`Message sent to ${targetUser.full_name} successfully`);
        toast({
          title: "Message Sent",
          description: `Your message has been sent to ${targetUser.full_name}`,
        });
      } else {
        speak(`User ${userName} not found`);
      }
    } catch (error) {
      speak('Error sending message');
      console.error('Error sending message:', error);
    }
  };

  const updateTaskStatus = async (status: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      let tasksToUpdate;
      if (status === 'COMPLETED') {
        tasksToUpdate = response.data.filter((t: any) => t.status === 'IN_PROGRESS');
      } else if (status === 'IN_PROGRESS') {
        tasksToUpdate = response.data.filter((t: any) => t.status === 'PENDING');
      }
      
      if (tasksToUpdate && tasksToUpdate.length > 0) {
        await axios.put(`http://localhost:5000/api/tasks/${tasksToUpdate[0].id}/status`, 
          { status: status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        const statusText = status === 'COMPLETED' ? 'completed' : 'started';
        speak(`Task "${tasksToUpdate[0].title}" marked as ${statusText}`);
        toast({
          title: `Task ${statusText.charAt(0).toUpperCase() + statusText.slice(1)}`,
          description: `Task "${tasksToUpdate[0].title}" has been ${statusText}`,
        });
      } else {
        const noTaskText = status === 'COMPLETED' ? 'No tasks in progress to complete' : 'No pending tasks to start';
        speak(noTaskText);
      }
    } catch (error) {
      speak('Error updating task status');
      console.error('Error updating task status:', error);
    }
  };

  const sendInvitation = async (email: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.post('http://localhost:5000/api/invite', {
        email: email,
        role: 'EMPLOYEE'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      speak(`Invitation sent to ${email}`);
      toast({
        title: "Invitation Sent",
        description: `Invitation has been sent to ${email}`,
      });
    } catch (error) {
      speak('Error sending invitation');
      console.error('Error sending invitation:', error);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window && isOnline) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      // Use appropriate voice for the language
      const voices = speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.startsWith(language.split('-')[0])) || voices[0];
      if (voice) {
        utterance.voice = voice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  const getCommandResponse = (command: string) => {
    const cmd = command.toLowerCase();
    
    if (cmd.includes('create task') || cmd.includes('new task')) {
      return 'Starting task creation process. Please provide the task details.';
    } else if (cmd.includes('send message to team')) {
      return 'Message sent to team successfully.';
    } else if (cmd.includes('complete task') || cmd.includes('finish task')) {
      return 'Task marked as complete.';
    } else if (cmd.includes('start task') || cmd.includes('begin task')) {
      return 'Starting task work.';
    } else if (cmd.includes('assign task')) {
      return 'Task assignment in progress.';
    } else if (cmd.includes('help')) {
      return 'I can help you create tasks, send messages, assign tasks, and manage your workspace. What would you like to do?';
    } else {
      return 'Command received and processed successfully.';
    }
  };

  if (!isSupported) {
    return (
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
            <div className="p-2 bg-red-100 rounded-full">
              <MicOff className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-800">Voice Commands Unavailable</h3>
              <p className="text-red-600 text-sm">
                Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari for voice commands.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-600" />
            <span className="text-yellow-700 text-sm font-semibold">Powered by Bolt</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 border-blue-200 shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.div
              animate={isListening ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Button
                onClick={toggleContinuousListening}
                variant={isAutoListening ? "default" : "outline"}
                size="lg"
                className={`${
                  isAutoListening 
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                } h-12 sm:h-14 px-4 sm:px-6 w-full sm:w-auto`}
                disabled={isProcessing}
              >
                {isAutoListening ? <Mic className="w-4 sm:w-5 h-4 sm:h-5 mr-2" /> : <MicOff className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />}
                <span className="text-sm sm:text-base">
                  {isAutoListening ? 'Voice Active' : 'Start Voice Control'}
                </span>
              </Button>
            </motion.div>

            {isProcessing && (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <span className="text-blue-700 font-medium text-sm sm:text-base">Processing...</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Badge variant={isListening ? "default" : "secondary"} className="px-2 sm:px-3 py-1">
              {isListening ? 'Listening...' : isAutoListening ? 'Ready' : 'Inactive'}
            </Badge>
            <Badge variant="default" className="px-2 sm:px-3 py-1">
              <Wifi className="w-3 h-3 mr-1" />
              Online
            </Badge>
            {confidence > 0 && (
              <Badge variant="outline" className="px-2 sm:px-3 py-1">
                {Math.round(confidence * 100)}% confidence
              </Badge>
            )}
            <div className="flex items-center px-2 sm:px-3 py-1 bg-yellow-100 rounded-full border border-yellow-200">
              <Zap className="w-3 h-3 text-yellow-600 mr-1" />
              <span className="text-yellow-700 text-xs font-semibold">BOLT</span>
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Languages className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Voice Language</span>
          </div>
          <Select value={language} onValueChange={(value) => {
            setLanguage(value);
            if (recognitionRef.current) {
              recognitionRef.current.lang = value;
            }
          }}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {supportedLanguages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <span className="flex items-center space-x-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 rounded-xl p-4 border border-red-200 mb-4"
          >
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-sm font-semibold text-red-700">Error</span>
            </div>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </motion.div>
        )}

        {(isListening || transcript || isProcessing || isCollectingTaskData) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 sm:p-6 border border-blue-200 shadow-sm mb-4"
          >
            <div className="flex items-center mb-3">
              <Volume2 className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-blue-700">
                {isCollectingTaskData ? `Task Creation - ${currentField}` : 'Voice Input'}
              </span>
            </div>
            <div className="min-h-[60px] flex items-center">
              {transcript ? (
                <p className="text-gray-800 text-base sm:text-lg leading-relaxed break-words">{transcript}</p>
              ) : isListening ? (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-600 text-sm sm:text-base">
                    {isCollectingTaskData 
                      ? `Please provide the ${currentField.replace('_', ' ')}...` 
                      : 'Listening for your command...'
                    }
                  </span>
                  <div className="flex items-center space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: [8, 24, 8],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="w-2 bg-blue-500 rounded-full"
                        style={{ height: 8 }}
                      />
                    ))}
                  </div>
                </div>
              ) : isProcessing ? (
                <p className="text-gray-600 text-sm sm:text-base">Processing your command...</p>
              ) : null}
            </div>
          </motion.div>
        )}

        {/* Command History */}
        {commandHistory.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent Commands</h4>
            <div className="space-y-1">
              {commandHistory.slice(0, 3).map((cmd, index) => (
                <div key={index} className="text-xs text-gray-500 bg-gray-50 rounded px-2 py-1">
                  {cmd}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm font-semibold text-blue-800 mb-2">💬 Communication Commands:</p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• "Send message to team [message]"</li>
              <li>• "Send message to [name] [message]"</li>
              <li>• "Send announcement [message]"</li>
              <li>• "Go to communication"</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <p className="text-sm font-semibold text-green-800 mb-2">📋 Task Commands:</p>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• "Create a new task"</li>
              <li>• "Assign task to [name]"</li>
              <li>• "Complete task"</li>
              <li>• "Start task"</li>
            </ul>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <p className="text-sm font-semibold text-purple-800 mb-2">🧭 Navigation Commands:</p>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• "Go to tasks"</li>
              <li>• "Go to dashboard"</li>
              <li>• "Go to profile"</li>
              <li>• "Go to reports"</li>
            </ul>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
            <p className="text-sm font-semibold text-orange-800 mb-2">⚙️ System Commands:</p>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• "Invite [email@domain.com]"</li>
              <li>• "Help" or "What can you do"</li>
              <li>• "Refresh page"</li>
              <li>• Works in multiple languages!</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}