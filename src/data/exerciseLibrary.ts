
export interface Exercise {
  id: string;
  name: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  targetMuscles: string[];
  description: string;
  instructions: string[];
  duration?: string;
  reps?: string;
  sets?: string;
  imageUrl: string;
  tips: string[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  exercises: string[]; // Exercise IDs
  imageUrl: string;
}

export const exercises: Exercise[] = [
  {
    id: 'push-up',
    name: 'Push-ups',
    category: 'Strength Training',
    difficulty: 'Beginner',
    targetMuscles: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    description: 'A classic bodyweight exercise that builds upper body and core strength.',
    instructions: [
      'Start in a plank position with hands shoulder-width apart',
      'Lower your body until your chest nearly touches the floor',
      'Push back up to the starting position',
      'Keep your body in a straight line throughout the movement'
    ],
    reps: '8-12',
    sets: '2-3',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    tips: [
      'Start with knee push-ups if regular push-ups are too difficult',
      'Keep your core engaged throughout the movement',
      'Focus on controlled movements rather than speed'
    ]
  },
  {
    id: 'bodyweight-squat',
    name: 'Bodyweight Squats',
    category: 'Strength Training',
    difficulty: 'Beginner',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    description: 'A fundamental lower body exercise that builds leg and glute strength.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body by bending your knees and pushing your hips back',
      'Go down until your thighs are parallel to the floor',
      'Push through your heels to return to starting position'
    ],
    reps: '10-15',
    sets: '2-3',
    imageUrl: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&h=300&fit=crop',
    tips: [
      'Keep your chest up and back straight',
      'Don\'t let your knees cave inward',
      'Start with partial squats if full squats are difficult'
    ]
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'Core',
    difficulty: 'Beginner',
    targetMuscles: ['Core', 'Shoulders', 'Back'],
    description: 'An isometric core exercise that builds stability and strength.',
    instructions: [
      'Start in a push-up position',
      'Lower onto your forearms',
      'Keep your body in a straight line from head to heels',
      'Hold the position while breathing normally'
    ],
    duration: '30-60 seconds',
    sets: '2-3',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    tips: [
      'Don\'t let your hips sag or pike up',
      'Start with shorter holds and gradually increase time',
      'Keep your neck in a neutral position'
    ]
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    category: 'Cardio',
    difficulty: 'Beginner',
    targetMuscles: ['Full Body', 'Cardiovascular'],
    description: 'A simple cardio exercise that gets your heart rate up.',
    instructions: [
      'Stand with feet together and arms at your sides',
      'Jump while spreading your legs shoulder-width apart',
      'Simultaneously raise your arms overhead',
      'Jump back to the starting position'
    ],
    duration: '30-60 seconds',
    sets: '2-3',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
    tips: [
      'Land softly on the balls of your feet',
      'Keep a steady rhythm',
      'Modify by stepping side to side if jumping is too intense'
    ]
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'Cardio',
    difficulty: 'Beginner',
    targetMuscles: ['Core', 'Shoulders', 'Legs', 'Cardiovascular'],
    description: 'A dynamic exercise that combines cardio with core strengthening.',
    instructions: [
      'Start in a plank position',
      'Bring one knee toward your chest',
      'Quickly switch legs, bringing the other knee forward',
      'Continue alternating legs in a running motion'
    ],
    duration: '20-30 seconds',
    sets: '2-3',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    tips: [
      'Keep your core tight throughout',
      'Don\'t let your hips bounce up and down',
      'Start slowly and increase speed as you get comfortable'
    ]
  },
  {
    id: 'lunges',
    name: 'Forward Lunges',
    category: 'Strength Training',
    difficulty: 'Beginner',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    description: 'A unilateral leg exercise that improves balance and leg strength.',
    instructions: [
      'Stand with feet hip-width apart',
      'Step forward with one leg, lowering your hips',
      'Lower until both knees are bent at 90 degrees',
      'Push back to the starting position and repeat on other side'
    ],
    reps: '8-10 each leg',
    sets: '2-3',
    imageUrl: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&h=300&fit=crop',
    tips: [
      'Keep your front knee over your ankle',
      'Don\'t let your front knee go past your toes',
      'Keep your torso upright throughout the movement'
    ]
  },
  {
    id: 'wall-sit',
    name: 'Wall Sit',
    category: 'Strength Training',
    difficulty: 'Beginner',
    targetMuscles: ['Quadriceps', 'Glutes', 'Calves'],
    description: 'An isometric exercise that builds leg endurance and strength.',
    instructions: [
      'Stand with your back against a wall',
      'Slide down until your thighs are parallel to the floor',
      'Keep your knees at 90 degrees',
      'Hold the position while breathing normally'
    ],
    duration: '20-45 seconds',
    sets: '2-3',
    imageUrl: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&h=300&fit=crop',
    tips: [
      'Keep your back flat against the wall',
      'Don\'t let your knees go past your toes',
      'Start with shorter holds and gradually increase time'
    ]
  },
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'HIIT',
    difficulty: 'Intermediate',
    targetMuscles: ['Full Body', 'Cardiovascular'],
    description: 'A full-body exercise that combines strength and cardio.',
    instructions: [
      'Start standing, then squat down and place hands on floor',
      'Jump feet back into plank position',
      'Do a push-up (optional for beginners)',
      'Jump feet back to squat position, then jump up with arms overhead'
    ],
    reps: '5-8',
    sets: '2-3',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
    tips: [
      'Start slowly and focus on form',
      'Modify by stepping back instead of jumping',
      'Take breaks between reps if needed'
    ]
  }
];

export const workoutPlans: WorkoutPlan[] = [
  {
    id: 'beginner-full-body',
    name: 'Beginner Full Body Workout',
    description: 'A complete workout targeting all major muscle groups, perfect for beginners.',
    difficulty: 'Beginner',
    duration: '20-25 minutes',
    exercises: ['bodyweight-squat', 'push-up', 'plank', 'lunges', 'jumping-jacks'],
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  },
  {
    id: 'cardio-starter',
    name: 'Cardio Starter',
    description: 'Low-impact cardio exercises to build endurance gradually.',
    difficulty: 'Beginner',
    duration: '15-20 minutes',
    exercises: ['jumping-jacks', 'mountain-climbers', 'wall-sit'],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop'
  },
  {
    id: 'core-basics',
    name: 'Core Basics',
    description: 'Essential core exercises to build a strong foundation.',
    difficulty: 'Beginner',
    duration: '10-15 minutes',
    exercises: ['plank', 'mountain-climbers'],
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
  },
  {
    id: 'hiit-intro',
    name: 'HIIT Introduction',
    description: 'High-intensity interval training for intermediate fitness levels.',
    difficulty: 'Intermediate',
    duration: '15-20 minutes',
    exercises: ['burpees', 'mountain-climbers', 'jumping-jacks', 'push-up'],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop'
  }
];
