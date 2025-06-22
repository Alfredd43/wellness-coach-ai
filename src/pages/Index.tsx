
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Heart, Users, Search, TrendingUp, Calendar } from "lucide-react";
import Dashboard from "@/components/Dashboard";
import ChatAssistant from "@/components/ChatAssistant";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'chat'>('landing');

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <Badge className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 text-lg">
              AI-Powered Fitness Platform
            </Badge>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Your Personal Fitness & Nutrition Companion
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your fitness journey with AI-powered insights, personalized nutrition coaching, 
              and smart workout recommendations tailored just for you.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-6 text-lg"
                onClick={() => setCurrentView('dashboard')}
              >
                Start Your Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg"
                onClick={() => setCurrentView('chat')}
              >
                Try AI Coach
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive tools powered by artificial intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Smart Activity Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 leading-relaxed">
                Log workouts and meals with AI-powered macro calculations. Get instant insights on calories, protein, carbs, and fats.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Personalized Nutrition</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 leading-relaxed">
                AI-generated meal plans tailored to your goals. Whether it's weight loss, muscle gain, or maintenance - we've got you covered.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">AI Fitness Coach</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 leading-relaxed">
                24/7 AI assistant ready to answer questions, provide workout tips, and keep you motivated on your fitness journey.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Progress Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 leading-relaxed">
                Beautiful charts and insights to track your progress. See weekly and monthly trends with detailed analytics.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Community & Gamification</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 leading-relaxed">
                Earn badges, maintain streaks, and compete with friends. Social features to keep you motivated and engaged.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Smart Exercise Library</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 leading-relaxed">
                Curated workouts for all fitness levels with video tutorials, form tips, and equipment alternatives.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users already achieving their fitness goals with AI-powered insights.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 text-lg font-semibold"
            onClick={() => setCurrentView('dashboard')}
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );

  if (currentView === 'dashboard') {
    return <Dashboard onNavigate={setCurrentView} />;
  }

  if (currentView === 'chat') {
    return <ChatAssistant onNavigate={setCurrentView} />;
  }

  return <LandingPage />;
};

export default Index;
