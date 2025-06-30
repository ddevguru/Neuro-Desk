'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Brain, Zap, ArrowRight, Mic, Users, Target, Shield, BarChart3, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice Commands",
      description: "Control everything with natural voice commands powered by ElevenLabs AI"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Assignment",
      description: "AI automatically assigns tasks based on employee skills and availability"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "Real-time communication and project collaboration tools"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into team performance and productivity"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Role-Based Access",
      description: "Secure access control for Admins, Team Leaders, and Employees"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Real-time Chat",
      description: "Instant messaging and announcement system for teams"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <nav className="relative z-50 bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">NeuroDesk</span>
              <div className="flex items-center px-3 py-1 bg-yellow-500/20 rounded-full border border-yellow-500/30">
                <Zap className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-yellow-400 text-xs font-semibold">BOLT</span>
              </div>
            </div>
            <Button
              onClick={() => router.push('/auth/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Login to Your Desk
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background Image and Gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/90 to-slate-900/90"
          style={{
            backgroundImage: `url('/images/landing.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
            zIndex: 0,
          }}
        />
        {/* Background Animation */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-20 w-32 h-32 border border-blue-500/20 rounded-full"
          />
          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 right-20 w-48 h-48 border border-purple-500/20 rounded-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 bg-slate-900/30 backdrop-blur-sm rounded-2xl py-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              The Future of
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                <br />Task Management
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              AI-powered workspace where voice commands meet intelligent task assignment. 
              Streamline your team's productivity with NeuroDesk's revolutionary approach to project management.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
          >
            <Button
              onClick={() => router.push('/auth/register')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Get Started Free
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.div>
            </Button>
            <Button
              onClick={() => router.push('/auth/login')}
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              Sign In
            </Button>
          </motion.div>

          {/* Demo Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="relative bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
 
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-2 text-white/60 text-sm">
                    <Mic className="w-4 h-4" />
                    <span>Voice Active</span>
                  </div>
                </div>
                <div className="text-left text-green-400 font-mono text-sm">
                  <p> "Create a new task for UI design with high priority"</p>
                  <p className="text-blue-400 mt-2"> Task created and assigned to Sarah (UI/UX Expert)</p>
                  <p className="text-white/60 mt-2"> Notification sent to team members</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to manage tasks, teams, and productivity in one intelligent platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
              >
                <div className="text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Workspace?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Join thousands of teams already using NeuroDesk to boost productivity and streamline workflows
            </p>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="flex items-center px-4 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/30">
                <Zap className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-yellow-400 text-sm font-semibold">Powered by Bolt</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
                <Mic className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-green-400 text-sm font-semibold">Voice AI Challenge</span>
              </div>
            </div>
            <Button
              onClick={() => router.push('/auth/register')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl font-semibold"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-6 h-6 text-blue-400" />
              <span className="text-white font-semibold">NeuroDesk</span>
              <div className="flex items-center px-2 py-1 bg-yellow-500/20 rounded border border-yellow-500/30">
                <Zap className="w-3 h-3 text-yellow-400 mr-1" />
                <span className="text-yellow-400 text-xs">BOLT</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 NeuroDesk. Powered by Bolt & ElevenLabs AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}