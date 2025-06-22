
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MessageSquare, Home, User, Sparkles, Zap, Heart } from "lucide-react";

interface ChatAssistantProps {
  onNavigate: (view: 'landing' | 'dashboard' | 'chat') => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatAssistant = ({ onNavigate }: ChatAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI fitness coach. I'm here to help you with workout advice, nutrition tips, and motivation. What would you like to know?",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    "What's a good post-workout meal?",
    "How many calories should I eat?",
    "Best exercises for beginners?",
    "How to stay motivated?",
    "Protein requirements for muscle gain",
    "Healthy snack ideas",
  ];

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('post-workout') || lowerMessage.includes('after workout')) {
      return "Great question! For post-workout nutrition, aim for a combination of protein and carbs within 30-60 minutes. Try: Greek yogurt with berries, chocolate milk, a protein shake with banana, or chicken with sweet potato. The protein helps muscle recovery while carbs replenish energy stores. Aim for 20-30g protein and 30-60g carbs depending on your workout intensity!";
    }
    
    if (lowerMessage.includes('calories') || lowerMessage.includes('how many')) {
      return "Your calorie needs depend on several factors: age, gender, weight, height, and activity level. As a general guide: sedentary adults need about 1,800-2,000 calories, moderately active need 2,000-2,400, and very active need 2,400-2,800. For weight loss, create a 500-750 calorie deficit. For muscle gain, eat in a slight surplus. I'd recommend tracking for a week to see your current intake, then adjust based on your goals!";
    }
    
    if (lowerMessage.includes('beginner') || lowerMessage.includes('start')) {
      return "Perfect! Starting your fitness journey is exciting. For beginners, I recommend: 1) Start with bodyweight exercises: squats, push-ups, lunges, planks. 2) Add 20-30 mins of walking daily. 3) Focus on form over intensity. 4) Start with 2-3 workouts per week. 5) Include rest days for recovery. 6) Stay hydrated and eat balanced meals. Remember: consistency beats perfection. Start small and gradually increase intensity as you get stronger!";
    }
    
    if (lowerMessage.includes('motivat') || lowerMessage.includes('stay on track')) {
      return "Staying motivated is key to success! Here are my top tips: 1) Set specific, achievable goals. 2) Track your progress (like you're doing here!). 3) Find a workout buddy or join communities. 4) Celebrate small wins. 5) Mix up your routine to prevent boredom. 6) Remember your 'why' - write it down! 7) Focus on how exercise makes you FEEL, not just how you look. 8) Be patient - real changes take time. You've got this! 💪";
    }
    
    if (lowerMessage.includes('protein') || lowerMessage.includes('muscle')) {
      return "For muscle gain, aim for 0.8-1.2g of protein per pound of body weight daily. Spread it throughout the day with 20-30g per meal. Great sources include: lean meats, fish, eggs, dairy, legumes, and protein powder. Don't forget: muscle growth also needs adequate calories, strength training, and rest. Timing matters too - having protein within 2 hours post-workout maximizes muscle protein synthesis. Quality sleep and staying hydrated are equally important!";
    }
    
    if (lowerMessage.includes('snack') || lowerMessage.includes('hungry')) {
      return "Smart snacking can support your goals! Here are healthy options: For energy: apple with almond butter, Greek yogurt with nuts, hummus with veggies. For muscle building: hard-boiled eggs, cottage cheese, protein smoothie. For recovery: chocolate milk, banana with peanut butter. For late-night: casein protein or Greek yogurt. Aim for 150-300 calories and include protein or fiber to keep you satisfied. Prep snacks ahead to avoid unhealthy choices!";
    }
    
    // Default response
    return "That's a great question! While I can provide general fitness and nutrition guidance, remember that individual needs vary. For personalized advice, especially regarding medical conditions or specific dietary requirements, consult with healthcare professionals. In the meantime, focus on consistency, listen to your body, and remember that small changes lead to big results over time. What specific aspect of fitness or nutrition would you like to explore further?";
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Fitness Coach</h1>
                <p className="text-sm text-gray-600">Your 24/7 fitness companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => onNavigate('landing')}>
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button variant="outline" onClick={() => onNavigate('dashboard')}>
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Chat Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Smart Advice</h3>
              <p className="text-sm text-gray-600">Personalized recommendations</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <Zap className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Instant Response</h3>
              <p className="text-sm text-gray-600">Get answers immediately</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <Heart className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Always Supportive</h3>
              <p className="text-sm text-gray-600">Motivation when you need it</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Questions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Questions</CardTitle>
            <CardDescription>Get started with these common fitness questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left justify-start h-auto p-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Chat with your AI Coach
            </CardTitle>
            <CardDescription className="text-purple-100">
              Ask anything about fitness, nutrition, or wellness
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex max-w-[80%] ${
                        message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <Avatar className={`${message.type === 'user' ? 'ml-3' : 'mr-3'} flex-shrink-0`}>
                        <AvatarFallback className={message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'}>
                          {message.type === 'user' ? 'U' : 'AI'}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`p-4 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex">
                      <Avatar className="mr-3">
                        <AvatarFallback className="bg-purple-600 text-white">AI</AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="p-6 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputMessage);
                }}
                className="flex space-x-4"
              >
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about fitness, nutrition, or wellness..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatAssistant;
