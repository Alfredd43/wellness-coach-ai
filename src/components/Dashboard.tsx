
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Activity, Heart, TrendingUp, Calendar, Plus, MessageSquare, Home, User } from "lucide-react";
import ActivityLogger from "./ActivityLogger";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  onNavigate: (view: 'landing' | 'dashboard' | 'chat') => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  // Mock data for charts
  const weeklyData = [
    { day: 'Mon', calories: 1850, protein: 120, workouts: 1 },
    { day: 'Tue', calories: 2100, protein: 140, workouts: 0 },
    { day: 'Wed', calories: 1950, protein: 130, workouts: 1 },
    { day: 'Thu', calories: 2200, protein: 150, workouts: 1 },
    { day: 'Fri', calories: 1900, protein: 125, workouts: 0 },
    { day: 'Sat', calories: 2300, protein: 160, workouts: 1 },
    { day: 'Sun', calories: 2000, protein: 135, workouts: 1 },
  ];

  const macroData = [
    { name: 'Protein', value: 25, color: '#3B82F6' },
    { name: 'Carbs', value: 50, color: '#10B981' },
    { name: 'Fats', value: 25, color: '#F59E0B' },
  ];

  const handleQuickLog = (type: string) => {
    toast({
      title: "Quick Log",
      description: `${type} logged successfully!`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">FitCompanion</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => onNavigate('landing')}>
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button variant="outline" onClick={() => onNavigate('chat')}>
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Coach
              </Button>
              <Button variant="outline">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex! 👋</h2>
          <p className="text-gray-600">Here's your fitness progress for today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Today's Calories</p>
                  <p className="text-3xl font-bold">1,847</p>
                  <p className="text-sm text-blue-100">Goal: 2,000</p>
                </div>
                <Activity className="w-8 h-8 text-blue-200" />
              </div>
              <Progress value={92} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Protein Intake</p>
                  <p className="text-3xl font-bold">128g</p>
                  <p className="text-sm text-green-100">Goal: 150g</p>
                </div>
                <Heart className="w-8 h-8 text-green-200" />
              </div>
              <Progress value={85} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Workouts</p>
                  <p className="text-3xl font-bold">5</p>
                  <p className="text-sm text-purple-100">This week</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-200" />
              </div>
              <div className="flex space-x-1 mt-3">
                {[1,2,3,4,5,6,7].map((day) => (
                  <div key={day} className={`w-4 h-4 rounded-full ${day <= 5 ? 'bg-white' : 'bg-purple-300'}`} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Streak</p>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-sm text-orange-100">Days</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-200" />
              </div>
              <Badge className="bg-white text-orange-600 mt-3">🔥 On fire!</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Log your activities quickly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => handleQuickLog('Morning workout')} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Log Workout
              </Button>
              <Button onClick={() => handleQuickLog('Breakfast')} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Log Meal
              </Button>
              <Button onClick={() => handleQuickLog('Water')} className="bg-cyan-600 hover:bg-cyan-700">
                <Plus className="w-4 h-4 mr-2" />
                Log Water
              </Button>
              <Button onClick={() => handleQuickLog('Weight')} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Log Weight
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Calories</CardTitle>
                  <CardDescription>Your calorie intake this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="calories" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Macro Distribution</CardTitle>
                  <CardDescription>Today's macronutrient breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={macroData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {macroData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center space-x-6 mt-4">
                    {macroData.map((macro) => (
                      <div key={macro.name} className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: macro.color }} />
                        <span className="text-sm">{macro.name} ({macro.value}%)</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="nutrition">
            <ActivityLogger type="nutrition" />
          </TabsContent>

          <TabsContent value="workouts">
            <ActivityLogger type="workout" />
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>Your fitness journey over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="protein" stroke="#10B981" strokeWidth={3} />
                    <Line type="monotone" dataKey="workouts" stroke="#3B82F6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
