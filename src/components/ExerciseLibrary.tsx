
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Target, Zap, Play, BookOpen } from "lucide-react";
import { exercises, workoutPlans, Exercise, WorkoutPlan } from "@/data/exerciseLibrary";

interface ExerciseLibraryProps {
  onNavigate: (view: 'landing' | 'dashboard' | 'chat') => void;
}

const ExerciseLibrary = ({ onNavigate }: ExerciseLibraryProps) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutPlan | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredExercises = exercises.filter(exercise => {
    const matchesDifficulty = difficultyFilter === 'all' || exercise.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === 'all' || exercise.category === categoryFilter;
    return matchesDifficulty && matchesCategory;
  });

  const categories = [...new Set(exercises.map(ex => ex.category))];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cardio': return <Zap className="w-4 h-4" />;
      case 'Strength Training': return <Target className="w-4 h-4" />;
      case 'HIIT': return <Zap className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Exercise Library</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => onNavigate('dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="exercises" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="exercises">Individual Exercises</TabsTrigger>
            <TabsTrigger value="workouts">Workout Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="exercises" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  {difficulties.map(diff => (
                    <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Exercise Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise) => (
                <Card key={exercise.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setSelectedExercise(exercise)}>
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                    <img 
                      src={exercise.imageUrl} 
                      alt={exercise.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{exercise.name}</CardTitle>
                      {getCategoryIcon(exercise.category)}
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getDifficultyColor(exercise.difficulty)}>
                        {exercise.difficulty}
                      </Badge>
                      <Badge variant="outline">{exercise.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {exercise.reps && <span>• {exercise.reps} reps</span>}
                      {exercise.duration && <span>• {exercise.duration}</span>}
                      {exercise.sets && <span>• {exercise.sets} sets</span>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="workouts" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {workoutPlans.map((workout) => (
                <Card key={workout.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setSelectedWorkout(workout)}>
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                    <img 
                      src={workout.imageUrl} 
                      alt={workout.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{workout.name}</CardTitle>
                      <Badge className={getDifficultyColor(workout.difficulty)}>
                        {workout.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{workout.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{workout.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>{workout.exercises.length} exercises</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Start Workout
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Exercise Detail Modal */}
        {selectedExercise && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedExercise(null)}>
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img 
                  src={selectedExercise.imageUrl} 
                  alt={selectedExercise.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{selectedExercise.name}</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setSelectedExercise(null)}>
                    Close
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Badge className={getDifficultyColor(selectedExercise.difficulty)}>
                    {selectedExercise.difficulty}
                  </Badge>
                  <Badge variant="outline">{selectedExercise.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700">{selectedExercise.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2">Target Muscles</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExercise.targetMuscles.map(muscle => (
                      <Badge key={muscle} variant="secondary">{muscle}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Instructions</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    {selectedExercise.instructions.map((instruction, index) => (
                      <li key={index} className="text-gray-700">{instruction}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Exercise Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedExercise.reps && <div><strong>Reps:</strong> {selectedExercise.reps}</div>}
                    {selectedExercise.duration && <div><strong>Duration:</strong> {selectedExercise.duration}</div>}
                    {selectedExercise.sets && <div><strong>Sets:</strong> {selectedExercise.sets}</div>}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Tips</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedExercise.tips.map((tip, index) => (
                      <li key={index} className="text-gray-700">{tip}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Workout Detail Modal */}
        {selectedWorkout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedWorkout(null)}>
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img 
                  src={selectedWorkout.imageUrl} 
                  alt={selectedWorkout.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{selectedWorkout.name}</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setSelectedWorkout(null)}>
                    Close
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Badge className={getDifficultyColor(selectedWorkout.difficulty)}>
                    {selectedWorkout.difficulty}
                  </Badge>
                  <Badge variant="outline">{selectedWorkout.duration}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700">{selectedWorkout.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-4">Exercises in this workout</h4>
                  <div className="space-y-3">
                    {selectedWorkout.exercises.map((exerciseId, index) => {
                      const exercise = exercises.find(ex => ex.id === exerciseId);
                      if (!exercise) return null;
                      
                      return (
                        <div key={exerciseId} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium">{exercise.name}</h5>
                            <p className="text-sm text-gray-600">
                              {exercise.reps && `${exercise.reps} • `}
                              {exercise.duration && `${exercise.duration} • `}
                              {exercise.sets && `${exercise.sets}`}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {exercise.category}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Button className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Start This Workout
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseLibrary;
