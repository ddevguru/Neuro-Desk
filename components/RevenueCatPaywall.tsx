'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, Zap, X, Star, Shield, Users, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface RevenueCatPaywallProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (planId: string) => void;
}

export default function RevenueCatPaywall({ isOpen, onClose, onSubscribe }: RevenueCatPaywallProps) {
  const [selectedPlan, setSelectedPlan] = useState('premium_monthly');
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      id: 'premium_monthly',
      name: 'Premium',
      price: '$9.99',
      period: 'month',
      description: 'Perfect for small teams and growing businesses',
      features: [
        'Unlimited tasks and projects',
        'Advanced voice commands',
        'Team collaboration tools',
        'Priority support',
        'Advanced analytics',
        'Custom integrations'
      ],
      popular: true,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'enterprise_monthly',
      name: 'Enterprise',
      price: '$29.99',
      period: 'month',
      description: 'For large organizations with advanced needs',
      features: [
        'Everything in Premium',
        'Advanced security features',
        'Custom branding',
        'Dedicated account manager',
        'Advanced reporting',
        'API access',
        'SSO integration',
        'Custom workflows'
      ],
      popular: false,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleSubscribe = async (planId: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, you would integrate with RevenueCat SDK here
      // For demo purposes, we'll simulate the subscription process
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSubscribe(planId);
      onClose();
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">Upgrade to Premium</DialogTitle>
                <DialogDescription className="text-lg">
                  Unlock the full potential of NeuroDesk with advanced features
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center px-3 py-1 bg-yellow-100 rounded-full border border-yellow-200">
              <Zap className="w-4 h-4 text-yellow-600 mr-1" />
              <span className="text-yellow-700 text-sm font-semibold">BOLT</span>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6">
          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800">Team Collaboration</h3>
              <p className="text-sm text-blue-600">Advanced team features and unlimited members</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-800">Advanced Analytics</h3>
              <p className="text-sm text-purple-600">Detailed insights and performance metrics</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">Priority Support</h3>
              <p className="text-sm text-green-600">24/7 support and dedicated assistance</p>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className={`relative cursor-pointer transition-all duration-200 ${
                    selectedPlan === plan.id 
                      ? 'ring-2 ring-blue-500 shadow-lg' 
                      : 'hover:shadow-md'
                  } ${plan.popular ? 'border-blue-500' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-4`}>
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-500">/{plan.period}</span>
                    </div>
                    <CardDescription className="text-center mt-2">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      className={`w-full ${
                        selectedPlan === plan.id
                          ? `bg-gradient-to-r ${plan.color} hover:opacity-90 text-white`
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={isLoading}
                    >
                      {isLoading && selectedPlan === plan.id ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        `Choose ${plan.name}`
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Trusted by thousands of teams worldwide</h3>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Secure payments</span>
                </div>
                <div className="flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Check className="w-4 h-4" />
                  <span>30-day money back</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Powered by RevenueCat • Secure payment processing • Your data is protected
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}