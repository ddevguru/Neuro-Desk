'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, Brain, Users, Target, Mic, MessageSquare } from 'lucide-react';

export default function SplashScreen() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        router.push('/landing');
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  if (!loading) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <Zap className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Welcome to NeuroDesk</h1>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
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
          className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-32 h-32 border-2 border-white/10 rounded-full"
        />
        <motion.div
          animate={{
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-20 w-4 h-4 bg-white/30 rounded-full"
        />
        <motion.div
          animate={{
            y: [20, -20, 20],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 right-32 w-6 h-6 bg-white/20 rounded-full"
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        {/* Bolt Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Zap className="w-6 h-6 text-yellow-300 mr-2" />
            <span className="text-white font-semibold">Powered by Bolt</span>
          </div>
        </motion.div>

        {/* Logo and Title */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative">
            <Brain className="w-24 h-24 text-white mx-auto mb-4" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-white/20 rounded-full"
            />
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">NeuroDesk</h1>
          <p className="text-xl text-white/80 max-w-md mx-auto">
            AI-Powered Task Management with Voice Commands
          </p>
        </motion.div>

        {/* Feature Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex justify-center space-x-8 mb-8"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-center"
          >
            <Mic className="w-8 h-8 text-white mx-auto mb-2" />
            <span className="text-white/60 text-sm">Voice AI</span>
          </motion.div>
          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-center"
          >
            <Users className="w-8 h-8 text-white mx-auto mb-2" />
            <span className="text-white/60 text-sm">Team Sync</span>
          </motion.div>
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="text-center"
          >
            <Target className="w-8 h-8 text-white mx-auto mb-2" />
            <span className="text-white/60 text-sm">Smart Tasks</span>
          </motion.div>
          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="text-center"
          >
            <MessageSquare className="w-8 h-8 text-white mx-auto mb-2" />
            <span className="text-white/60 text-sm">Real-time Chat</span>
          </motion.div>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-3 h-3 bg-white rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="text-white/60"
        >
          Initializing AI Systems...
        </motion.p>
      </motion.div>

      {/* Additional Bolt Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="absolute bottom-8 left-8"
      >
        <div className="flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
          <Zap className="w-4 h-4 text-yellow-300 mr-2" />
          <span className="text-white/60 text-sm">Built with Bolt</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="absolute bottom-8 right-8"
      >
        <div className="flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
          <span className="text-white/60 text-sm">Voice Challenge</span>
          <Mic className="w-4 h-4 text-green-300 ml-2" />
        </div>
      </motion.div>
    </div>
  );
}