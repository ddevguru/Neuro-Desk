'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Loader2, CheckCircle, X, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface VoiceTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
}

interface TaskData {
  title: string;
  description: string;
  priority: string;
  required_skills: string[];
  due_date: string;
  payment_amount: number;
  assigned_to?: number;
}

const TASK_FIELDS = [
  { key: 'title', label: 'Task Title', prompt: 'What is the task title?' },
  { key: 'description', label: 'Description', prompt: 'Please describe the task in detail.' },
  { key: 'priority', label: 'Priority', prompt: 'What is the priority? Say low, medium, high, or urgent.' },
  { key: 'skills', label: 'Required Skills', prompt: 'What skills are required? List them separated by commas, or say none.' },
  { key: 'payment', label: 'Payment Amount', prompt: 'What is the payment amount in dollars? Say zero for no payment.' },
  { key: 'due_date', label: 'Due Date', prompt: 'When is this task due? Say the date or say no due date.' },
  { key: 'assign', label: 'Assignment', prompt: 'Who should this be assigned to? Say a name or say auto-assign.' }
];

export default function VoiceTaskDialog({ isOpen, onClose, onTaskCreated }: VoiceTaskDialogProps) {
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [taskData, setTaskData] = useState<Partial<TaskData>>({});
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [confidence, setConfidence] = useState(0);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
      initializeVoiceRecognition();
      resetDialog();
      // Start listening automatically when dialog opens
      setTimeout(() => {
        startListening();
        speak(TASK_FIELDS[0].prompt);
      }, 500);
    } else {
      stopListening();
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.log('Recognition cleanup');
        }
      }
    };
  }, [isOpen]);

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

  const initializeVoiceRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    try {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onstart = () => {
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
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);

        if (finalTranscript.trim()) {
          processVoiceInput(finalTranscript.trim());
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setError(`Voice recognition error: ${event.error}`);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      setError('Failed to initialize voice recognition');
    }
  };

  const resetDialog = () => {
    setCurrentFieldIndex(0);
    setTaskData({});
    setTranscript('');
    setIsProcessing(false);
    setIsCompleted(false);
    setError('');
    setConfidence(0);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        setTranscript('');
        setError('');
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        setError('Failed to start voice recognition');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log('Recognition already stopped');
      }
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const processVoiceInput = async (input: string) => {
    setIsProcessing(true);
    
    try {
      const currentField = TASK_FIELDS[currentFieldIndex];
      let processedValue: any = input;

      // Process input based on field type
      switch (currentField.key) {
        case 'title':
          processedValue = input;
          break;

        case 'description':
          processedValue = input;
          break;

        case 'priority':
          const priorityMap: { [key: string]: string } = {
            'low': 'LOW',
            'medium': 'MEDIUM',
            'high': 'HIGH',
            'urgent': 'URGENT'
          };
          const priority = input.toLowerCase();
          processedValue = priorityMap[priority] || 'MEDIUM';
          break;

        case 'skills':
          if (input.toLowerCase().includes('none') || input.toLowerCase().includes('no skills')) {
            processedValue = [];
          } else {
            processedValue = input.split(',').map(skill => skill.trim()).filter(Boolean);
          }
          break;

        case 'payment':
          const paymentMatch = input.match(/(\d+(?:\.\d{2})?)/);
          processedValue = paymentMatch ? parseFloat(paymentMatch[1]) : 0;
          break;

        case 'due_date':
          if (input.toLowerCase().includes('no due date') || input.toLowerCase().includes('none')) {
            processedValue = '';
          } else {
            // Simple date parsing - in production, use a proper date parser
            const dateMatch = input.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
            if (dateMatch) {
              const [, month, day, year] = dateMatch;
              const fullYear = year.length === 2 ? `20${year}` : year;
              processedValue = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T12:00`;
            } else {
              // Try to parse relative dates
              const today = new Date();
              if (input.toLowerCase().includes('tomorrow')) {
                today.setDate(today.getDate() + 1);
                processedValue = today.toISOString().slice(0, 16);
              } else if (input.toLowerCase().includes('next week')) {
                today.setDate(today.getDate() + 7);
                processedValue = today.toISOString().slice(0, 16);
              } else {
                processedValue = '';
              }
            }
          }
          break;

        case 'assign':
          if (input.toLowerCase().includes('auto') || input.toLowerCase().includes('automatic')) {
            processedValue = undefined; // Auto-assign
          } else {
            // Find user by name
            const userName = input.trim();
            const targetUser = users.find(u => 
              u.full_name.toLowerCase().includes(userName.toLowerCase()) ||
              u.username.toLowerCase().includes(userName.toLowerCase())
            );
            processedValue = targetUser ? targetUser.id : undefined;
          }
          break;
      }

      // Update task data
      const updatedTaskData = { ...taskData };
      switch (currentField.key) {
        case 'title':
          updatedTaskData.title = processedValue;
          break;
        case 'description':
          updatedTaskData.description = processedValue;
          break;
        case 'priority':
          updatedTaskData.priority = processedValue;
          break;
        case 'skills':
          updatedTaskData.required_skills = processedValue;
          break;
        case 'payment':
          updatedTaskData.payment_amount = processedValue;
          break;
        case 'due_date':
          updatedTaskData.due_date = processedValue;
          break;
        case 'assign':
          updatedTaskData.assigned_to = processedValue;
          break;
      }

      setTaskData(updatedTaskData);

      // Provide confirmation and move to next field
      let confirmationText = '';
      switch (currentField.key) {
        case 'title':
          confirmationText = `Task title set to "${processedValue}".`;
          break;
        case 'description':
          confirmationText = `Description recorded.`;
          break;
        case 'priority':
          confirmationText = `Priority set to ${processedValue.toLowerCase()}.`;
          break;
        case 'skills':
          if (processedValue.length === 0) {
            confirmationText = `No specific skills required.`;
          } else {
            confirmationText = `Skills recorded: ${processedValue.join(', ')}.`;
          }
          break;
        case 'payment':
          confirmationText = processedValue > 0 ? `Payment amount set to $${processedValue}.` : `No payment for this task.`;
          break;
        case 'due_date':
          confirmationText = processedValue ? `Due date set.` : `No due date specified.`;
          break;
        case 'assign':
          if (processedValue) {
            const user = users.find(u => u.id === processedValue);
            confirmationText = `Task will be assigned to ${user?.full_name}.`;
          } else {
            confirmationText = `Task will be auto-assigned based on skills.`;
          }
          break;
      }

      speak(confirmationText);

      // Move to next field or complete
      if (currentFieldIndex < TASK_FIELDS.length - 1) {
        setTimeout(() => {
          setCurrentFieldIndex(currentFieldIndex + 1);
          const nextField = TASK_FIELDS[currentFieldIndex + 1];
          speak(nextField.prompt);
          setTimeout(() => {
            startListening();
          }, 2000);
        }, 2000);
      } else {
        // All fields completed, create task
        setTimeout(() => {
          createTask(updatedTaskData);
        }, 2000);
      }

    } catch (error) {
      console.error('Error processing voice input:', error);
      setError('Error processing voice input');
      speak('Sorry, I had trouble understanding that. Please try again.');
      setTimeout(() => {
        startListening();
      }, 2000);
    } finally {
      setIsProcessing(false);
    }
  };

  const createTask = async (finalTaskData: Partial<TaskData>) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token');
      }

      const taskPayload = {
        title: finalTaskData.title || 'Untitled Task',
        description: finalTaskData.description || '',
        priority: finalTaskData.priority || 'MEDIUM',
        required_skills: finalTaskData.required_skills || [],
        due_date: finalTaskData.due_date || null,
        payment_amount: finalTaskData.payment_amount || 0,
        assigned_to: finalTaskData.assigned_to || null
      };

      const response = await axios.post('http://localhost:5000/api/tasks', taskPayload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsCompleted(true);
      
      let successMessage = 'Task created successfully!';
      if (response.data.assigned_to) {
        successMessage += ' Task has been automatically assigned based on skills.';
      } else if (finalTaskData.assigned_to) {
        const user = users.find(u => u.id === finalTaskData.assigned_to);
        successMessage += ` Task assigned to ${user?.full_name}.`;
      }

      speak(successMessage);
      
      toast({
        title: "Task Created Successfully",
        description: successMessage,
      });

      onTaskCreated();

      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error: any) {
      console.error('Error creating task:', error);
      setError('Failed to create task');
      speak('Sorry, there was an error creating the task. Please try again.');
      
      toast({
        title: "Task Creation Failed",
        description: error.response?.data?.error || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleManualNext = () => {
    if (transcript.trim()) {
      processVoiceInput(transcript.trim());
    } else {
      speak('Please provide an answer first.');
      startListening();
    }
  };

  const handleSkipField = () => {
    if (currentFieldIndex < TASK_FIELDS.length - 1) {
      setCurrentFieldIndex(currentFieldIndex + 1);
      const nextField = TASK_FIELDS[currentFieldIndex + 1];
      speak(`Skipping ${TASK_FIELDS[currentFieldIndex].label}. ${nextField.prompt}`);
      setTimeout(() => {
        startListening();
      }, 2000);
    }
  };

  const currentField = TASK_FIELDS[currentFieldIndex];
  const progress = ((currentFieldIndex + 1) / TASK_FIELDS.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Mic className="w-6 h-6 text-blue-600" />
            <span>Voice-Controlled Task Creation</span>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <Zap className="w-3 h-3 mr-1" />
              BOLT
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Speak naturally to create your task. I'll guide you through each step.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span>{currentFieldIndex + 1} of {TASK_FIELDS.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {!isCompleted ? (
            <>
              {/* Current Field */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-blue-800">
                    {currentField.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700 mb-4">{currentField.prompt}</p>
                  
                  {/* Voice Input Status */}
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">
                          {isListening ? 'Listening...' : isProcessing ? 'Processing...' : 'Ready'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isListening && (
                          <Badge variant="default" className="bg-green-600">
                            <Mic className="w-3 h-3 mr-1" />
                            Live
                          </Badge>
                        )}
                        {confidence > 0 && (
                          <Badge variant="outline">
                            {Math.round(confidence * 100)}% confidence
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="min-h-[60px] flex items-center">
                      {transcript ? (
                        <p className="text-gray-800 text-lg leading-relaxed">{transcript}</p>
                      ) : isListening ? (
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-600">Speak now...</span>
                          <div className="flex items-center space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ height: [8, 24, 8] }}
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
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                          <span className="text-gray-600">Processing your response...</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">Click "Start Listening" to begin</span>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="flex space-x-2">
                  <Button
                    onClick={startListening}
                    disabled={isListening || isProcessing}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    {isListening ? 'Listening...' : 'Start Listening'}
                  </Button>
                  
                  <Button
                    onClick={stopListening}
                    disabled={!isListening}
                    variant="outline"
                  >
                    <MicOff className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={handleSkipField}
                    variant="outline"
                    disabled={isProcessing}
                  >
                    Skip Field
                  </Button>
                  
                  <Button
                    onClick={handleManualNext}
                    disabled={!transcript.trim() || isProcessing}
                    variant="outline"
                  >
                    Next
                  </Button>
                </div>
              </div>

              {/* Task Data Preview */}
              {Object.keys(taskData).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Task Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {taskData.title && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Title:</span>
                        <span className="text-sm">{taskData.title}</span>
                      </div>
                    )}
                    {taskData.priority && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Priority:</span>
                        <Badge variant="outline">{taskData.priority}</Badge>
                      </div>
                    )}
                    {taskData.payment_amount !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Payment:</span>
                        <span className="text-sm">${taskData.payment_amount}</span>
                      </div>
                    )}
                    {taskData.required_skills && taskData.required_skills.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Skills:</span>
                        <span className="text-sm">{taskData.required_skills.join(', ')}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            /* Completion Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-800 mb-2">Task Created Successfully!</h3>
              <p className="text-green-600 mb-4">Your task has been created and is ready for action.</p>
              <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">
                Close
              </Button>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}