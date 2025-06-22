
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Utensils, Activity as ActivityIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { dataService, MealEntry, WorkoutEntry } from "@/services/dataService";

interface ActivityLoggerProps {
  type: 'nutrition' | 'workout';
  onDataChange?: () => void;
}

const ActivityLogger = ({ type, onDataChange }: ActivityLoggerProps) => {
  const [selectedFood, setSelectedFood] = useState('');
  const [quantity, setQuantity] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [recentEntries, setRecentEntries] = useState<(MealEntry | WorkoutEntry)[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadRecentEntries();
  }, [type]);

  const loadRecentEntries = () => {
    if (type === 'nutrition') {
      const meals = dataService.getMeals().slice(0, 5); // Last 5 meals
      setRecentEntries(meals);
    } else {
      const workouts = dataService.getWorkouts().slice(0, 5); // Last 5 workouts
      setRecentEntries(workouts);
    }
  };

  const foodDatabase = [
    { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: 'Brown Rice (100g)', calories: 123, protein: 2.6, carbs: 25, fat: 0.9 },
    { name: 'Broccoli (100g)', calories: 25, protein: 3, carbs: 5, fat: 0.3 },
    { name: 'Banana (medium)', calories: 105, protein: 1.3, carbs: 27, fat: 0.3 },
    { name: 'Oatmeal (100g)', calories: 68, protein: 2.4, carbs: 12, fat: 1.4 },
    { name: 'Eggs (2 large)', calories: 140, protein: 12, carbs: 1, fat: 10 },
    { name: 'Salmon (100g)', calories: 208, protein: 20, carbs: 0, fat: 13 },
    { name: 'Sweet Potato (100g)', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
  ];

  const workoutTypes = [
    'Strength Training',
    'Cardio',
    'HIIT',
    'Yoga',
    'Swimming',
    'Running',
    'Cycling',
    'Basketball',
    'Soccer',
    'Tennis',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'nutrition') {
      const food = foodDatabase.find(f => f.name === selectedFood);
      if (food && quantity) {
        const multiplier = parseFloat(quantity);
        const mealData = {
          foodName: food.name,
          quantity: multiplier,
          calories: Math.round(food.calories * multiplier),
          protein: Math.round(food.protein * multiplier * 10) / 10,
          carbs: Math.round(food.carbs * multiplier * 10) / 10,
          fat: Math.round(food.fat * multiplier * 10) / 10,
          notes
        };
        
        dataService.addMeal(mealData);
        
        toast({
          title: "Meal Logged Successfully!",
          description: `${food.name} (${quantity}x) - ${mealData.calories} calories, ${mealData.protein}g protein`,
        });
      }
    } else {
      if (workoutType && duration) {
        const workoutData = {
          type: workoutType,
          duration: parseInt(duration),
          notes
        };
        
        dataService.addWorkout(workoutData);
        
        toast({
          title: "Workout Logged Successfully!",
          description: `${workoutType} for ${duration} minutes`,
        });
      }
    }

    // Reset form
    setSelectedFood('');
    setQuantity('');
    setWorkoutType('');
    setDuration('');
    setNotes('');
    
    // Refresh recent entries and notify parent
    loadRecentEntries();
    onDataChange?.();
  };

  const calculateMacros = () => {
    const food = foodDatabase.find(f => f.name === selectedFood);
    if (food && quantity) {
      const multiplier = parseFloat(quantity) || 0;
      return {
        calories: Math.round(food.calories * multiplier),
        protein: Math.round(food.protein * multiplier * 10) / 10,
        carbs: Math.round(food.carbs * multiplier * 10) / 10,
        fat: Math.round(food.fat * multiplier * 10) / 10,
      };
    }
    return null;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-8">
      {/* Logger Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {type === 'nutrition' ? (
              <>
                <Utensils className="w-5 h-5 mr-2 text-green-600" />
                Log Your Meal
              </>
            ) : (
              <>
                <ActivityIcon className="w-5 h-5 mr-2 text-blue-600" />
                Log Your Workout
              </>
            )}
          </CardTitle>
          <CardDescription>
            {type === 'nutrition' 
              ? 'Track your meals and get automatic macro calculations'
              : 'Record your exercise sessions and track your progress'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {type === 'nutrition' ? (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="food">Select Food</Label>
                    <Select value={selectedFood} onValueChange={setSelectedFood}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose from database" />
                      </SelectTrigger>
                      <SelectContent>
                        {foodDatabase.map((food) => (
                          <SelectItem key={food.name} value={food.name}>
                            {food.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (servings)</Label>
                    <Input
                      id="quantity"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 1.5"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>

                {/* Macro Preview */}
                {selectedFood && quantity && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Nutritional Information</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {(() => {
                        const macros = calculateMacros();
                        return macros ? (
                          <>
                            <div className="text-center">
                              <Badge className="bg-blue-600 text-white">{macros.calories}</Badge>
                              <p className="text-sm text-gray-600 mt-1">Calories</p>
                            </div>
                            <div className="text-center">
                              <Badge className="bg-green-600 text-white">{macros.protein}g</Badge>
                              <p className="text-sm text-gray-600 mt-1">Protein</p>
                            </div>
                            <div className="text-center">
                              <Badge className="bg-orange-600 text-white">{macros.carbs}g</Badge>
                              <p className="text-sm text-gray-600 mt-1">Carbs</p>
                            </div>
                            <div className="text-center">
                              <Badge className="bg-yellow-600 text-white">{macros.fat}g</Badge>
                              <p className="text-sm text-gray-600 mt-1">Fat</p>
                            </div>
                          </>
                        ) : null;
                      })()}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="workout">Workout Type</Label>
                    <Select value={workoutType} onValueChange={setWorkoutType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select workout type" />
                      </SelectTrigger>
                      <SelectContent>
                        {workoutTypes.map((workout) => (
                          <SelectItem key={workout} value={workout}>
                            {workout}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="e.g., 45"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder={type === 'nutrition' 
                  ? "How did it taste? Any modifications?" 
                  : "How did the workout feel? Any achievements?"
                }
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Button 
              type="submit" 
              className={`w-full ${type === 'nutrition' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={type === 'nutrition' ? !selectedFood || !quantity : !workoutType || !duration}
            >
              <Plus className="w-4 h-4 mr-2" />
              Log {type === 'nutrition' ? 'Meal' : 'Workout'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Entries - Now showing real data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-600" />
            Recent Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEntries.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No {type === 'nutrition' ? 'meals' : 'workouts'} logged yet. Start by adding your first entry above!
              </p>
            ) : (
              recentEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">
                      {type === 'nutrition' 
                        ? (entry as MealEntry).foodName 
                        : (entry as WorkoutEntry).type
                      }
                    </p>
                    <p className="text-sm text-gray-600">{formatTime(entry.timestamp)}</p>
                    {entry.notes && (
                      <p className="text-xs text-gray-500 mt-1">{entry.notes}</p>
                    )}
                  </div>
                  <div className="text-right">
                    {type === 'nutrition' ? (
                      <>
                        <Badge>{(entry as MealEntry).calories} cal</Badge>
                        <p className="text-sm text-gray-600">{(entry as MealEntry).protein}g protein</p>
                      </>
                    ) : (
                      <>
                        <Badge>{(entry as WorkoutEntry).duration} min</Badge>
                        <p className="text-sm text-gray-600">Workout session</p>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLogger;
