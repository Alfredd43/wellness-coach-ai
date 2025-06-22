
export interface User {
  name: string;
  goals: {
    dailyCalories: number;
    dailyProtein: number;
    weeklyWorkouts: number;
  };
}

export interface WorkoutEntry {
  id: string;
  type: string;
  duration: number;
  notes?: string;
  timestamp: string;
}

export interface MealEntry {
  id: string;
  foodName: string;
  quantity: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  notes?: string;
  timestamp: string;
}

export interface WeightEntry {
  id: string;
  weight: number;
  timestamp: string;
}

export interface WaterEntry {
  id: string;
  amount: number; // in ml
  timestamp: string;
}

class DataService {
  private getStorageKey(key: string): string {
    return `fitness-app-${key}`;
  }

  // User data
  getUser(): User {
    const stored = localStorage.getItem(this.getStorageKey('user'));
    return stored ? JSON.parse(stored) : {
      name: 'Alex',
      goals: {
        dailyCalories: 2000,
        dailyProtein: 150,
        weeklyWorkouts: 5
      }
    };
  }

  setUser(user: User): void {
    localStorage.setItem(this.getStorageKey('user'), JSON.stringify(user));
  }

  // Workouts
  getWorkouts(): WorkoutEntry[] {
    const stored = localStorage.getItem(this.getStorageKey('workouts'));
    return stored ? JSON.parse(stored) : [];
  }

  addWorkout(workout: Omit<WorkoutEntry, 'id' | 'timestamp'>): void {
    const workouts = this.getWorkouts();
    const newWorkout: WorkoutEntry = {
      ...workout,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    workouts.unshift(newWorkout);
    localStorage.setItem(this.getStorageKey('workouts'), JSON.stringify(workouts));
  }

  // Meals
  getMeals(): MealEntry[] {
    const stored = localStorage.getItem(this.getStorageKey('meals'));
    return stored ? JSON.parse(stored) : [];
  }

  addMeal(meal: Omit<MealEntry, 'id' | 'timestamp'>): void {
    const meals = this.getMeals();
    const newMeal: MealEntry = {
      ...meal,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    meals.unshift(newMeal);
    localStorage.setItem(this.getStorageKey('meals'), JSON.stringify(meals));
  }

  // Water
  getWaterEntries(): WaterEntry[] {
    const stored = localStorage.getItem(this.getStorageKey('water'));
    return stored ? JSON.parse(stored) : [];
  }

  addWater(amount: number): void {
    const waterEntries = this.getWaterEntries();
    const newEntry: WaterEntry = {
      id: Date.now().toString(),
      amount,
      timestamp: new Date().toISOString()
    };
    waterEntries.unshift(newEntry);
    localStorage.setItem(this.getStorageKey('water'), JSON.stringify(waterEntries));
  }

  // Weight
  getWeightEntries(): WeightEntry[] {
    const stored = localStorage.getItem(this.getStorageKey('weight'));
    return stored ? JSON.parse(stored) : [];
  }

  addWeight(weight: number): void {
    const weightEntries = this.getWeightEntries();
    const newEntry: WeightEntry = {
      id: Date.now().toString(),
      weight,
      timestamp: new Date().toISOString()
    };
    weightEntries.unshift(newEntry);
    localStorage.setItem(this.getStorageKey('weight'), JSON.stringify(weightEntries));
  }

  // Analytics helpers
  getTodaysCalories(): number {
    const meals = this.getMeals();
    const today = new Date().toDateString();
    return meals
      .filter(meal => new Date(meal.timestamp).toDateString() === today)
      .reduce((total, meal) => total + meal.calories, 0);
  }

  getTodaysProtein(): number {
    const meals = this.getMeals();
    const today = new Date().toDateString();
    return meals
      .filter(meal => new Date(meal.timestamp).toDateString() === today)
      .reduce((total, meal) => total + meal.protein, 0);
  }

  getWeeklyWorkouts(): number {
    const workouts = this.getWorkouts();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return workouts.filter(workout => 
      new Date(workout.timestamp) >= oneWeekAgo
    ).length;
  }

  getCurrentStreak(): number {
    const workouts = this.getWorkouts();
    if (workouts.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) { // Check last 30 days
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateString = checkDate.toDateString();
      
      const hasWorkout = workouts.some(workout => 
        new Date(workout.timestamp).toDateString() === dateString
      );
      
      if (hasWorkout) {
        streak++;
      } else if (i > 0) { // Allow today to not have a workout yet
        break;
      }
    }
    
    return streak;
  }
}

export const dataService = new DataService();
