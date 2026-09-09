import { ref, computed } from 'vue'

export interface Profile {
  id: string
  full_name: string
  role: 'coach' | 'client'
  coach_id?: string
  phone_number?: string
  target_calories: number
  target_protein: number
  target_carbs: number
  target_fat: number
  injuries_notes?: string
  avatar_url?: string
  membership_tier?: string
  adherence_rate?: number
  created_at?: string
}

export interface MealItem {
  name: string
  grams: number
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface MealLog {
  id: string
  client_id: string
  client_name?: string
  client_avatar?: string
  image_url: string
  meal_type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
  items: MealItem[]
  total_calories: number
  total_protein: number
  total_carbs: number
  total_fat: number
  coach_comment?: string
  is_approved?: boolean
  logged_at: string
}

export interface Booking {
  id: string
  client_id: string
  client_name: string
  client_phone?: string
  trainer_id: string
  session_type: string
  start_time: string
  end_time: string
  status: 'confirmed' | 'cancelled' | 'completed'
  notes?: string
  fitness_level?: string
  target_goal?: string
  injuries_notes?: string
  created_at: string
}

export interface Exercise {
  id: string
  title: string
  category: 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core'
  video_url: string
  instructions: string
  form_cues: string[]
  target_sets: number
  target_reps: string
  rest_seconds: number
}

export interface AssignedWorkout {
  id: string
  client_id: string
  title: string
  day_label: string
  exercises: Exercise[]
}

export interface MetricEntry {
  id: string
  date: string
  weight_kg: number
  body_fat_percentage?: number
  notes?: string
}

// Initial Mock Seed Data
const initialCoach: Profile = {
  id: 'coach-1',
  full_name: 'Marcus Vance',
  role: 'coach',
  phone_number: '+1 (555) 987-6543',
  target_calories: 2800,
  target_protein: 200,
  target_carbs: 320,
  target_fat: 80,
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  injuries_notes: 'None'
}

const initialClients: Profile[] = [
  {
    id: 'client-1',
    full_name: 'Alex Johnson',
    role: 'client',
    coach_id: 'coach-1',
    phone_number: '+1 (555) 234-5678',
    target_calories: 2200,
    target_protein: 160,
    target_carbs: 230,
    target_fat: 65,
    membership_tier: 'Hybrid Elite Coaching',
    adherence_rate: 94,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    injuries_notes: 'Mild right shoulder impingement; keep bench grip shoulder-width.'
  },
  {
    id: 'client-2',
    full_name: 'Sarah Miller',
    role: 'client',
    coach_id: 'coach-1',
    phone_number: '+1 (555) 345-6789',
    target_calories: 1850,
    target_protein: 140,
    target_carbs: 180,
    target_fat: 55,
    membership_tier: '1-on-1 Gym Mastery',
    adherence_rate: 89,
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    injuries_notes: 'Recovered ACL reconstruction (right knee). High knee volume monitored.'
  },
  {
    id: 'client-3',
    full_name: 'David Ramirez',
    role: 'client',
    coach_id: 'coach-1',
    phone_number: '+1 (555) 456-7890',
    target_calories: 2450,
    target_protein: 175,
    target_carbs: 270,
    target_fat: 72,
    membership_tier: '12-Week Transformation',
    adherence_rate: 82,
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    injuries_notes: 'Tight hip flexors, needs 10m dynamic stretch warmup before squats.'
  }
]

const initialExercises: Exercise[] = [
  {
    id: 'ex-1',
    title: 'Incline Dumbbell Press',
    category: 'Chest',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    instructions: 'Set bench to 30 degrees. Retract shoulder blades, lower dumbbells with elbows at 45-degree angle until hands reach chest level, drive upward focusing on clavicular pectoralis.',
    form_cues: ['Keep wrists stacked above elbows', 'Drive feet into floor', 'Avoid flaring elbows 90°'],
    target_sets: 4,
    target_reps: '8 - 10 reps',
    rest_seconds: 90
  },
  {
    id: 'ex-2',
    title: 'Romanian Deadlift (RDL)',
    category: 'Legs',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    instructions: 'Hold barbell with overhand grip at thighs. Hinge back at hips with soft knees while keeping bar close to shins. Stop when hamstrings are fully loaded, squeeze glutes to stand.',
    form_cues: ['Push hips straight back like closing a car door', 'Maintain neutral spine', 'Lats engaged & packed down'],
    target_sets: 4,
    target_reps: '8 - 10 reps',
    rest_seconds: 120
  },
  {
    id: 'ex-3',
    title: 'Seated Cable Row',
    category: 'Back',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    instructions: 'Sit tall with slight knee bend. Pull V-bar handle into lower sternum, depressing shoulders and driving elbows straight back into back pockets.',
    form_cues: ['Pause 1s at peak contraction', 'Do not hyperextend lower back', 'Control the 2s eccentric release'],
    target_sets: 3,
    target_reps: '10 - 12 reps',
    rest_seconds: 75
  },
  {
    id: 'ex-4',
    title: 'Dumbbell Lateral Raise',
    category: 'Shoulders',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    instructions: 'Stand with slight forward torso tilt. Raise dumbbells out to sides leading with lateral deltoids and elbows until parallel with floor.',
    form_cues: ['Pour water motion with hands', 'Do not shrug neck or traps', 'Control descent without swinging'],
    target_sets: 4,
    target_reps: '12 - 15 reps',
    rest_seconds: 60
  },
  {
    id: 'ex-5',
    title: 'Barbell Back Squat',
    category: 'Legs',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    instructions: 'Place bar across mid-traps, brace core with Valsalva maneuver, break at hips and knees concurrently, sink past parallel, drive up forcefully spreading the floor.',
    form_cues: ['360-degree abdominal brace', 'Knees track over 2nd and 3rd toes', 'Chest upright through sticking point'],
    target_sets: 4,
    target_reps: '6 - 8 reps',
    rest_seconds: 150
  }
]

// Global reactive state
const currentRole = ref<'client' | 'coach'>('client')
const activeClientId = ref<string>('client-1')
const clientsList = ref<Profile[]>(initialClients)
const exercisesList = ref<Exercise[]>(initialExercises)

// Bookings
const bookingsList = ref<Booking[]>([
  {
    id: 'book-101',
    client_id: 'client-1',
    client_name: 'Alex Johnson',
    client_phone: '+1 (555) 234-5678',
    trainer_id: 'coach-1',
    session_type: '1-on-1 PT (45m)',
    start_time: new Date(Date.now() + 26 * 3600 * 1000).toISOString(), // Tomorrow afternoon
    end_time: new Date(Date.now() + (26 * 3600 + 45 * 60) * 1000).toISOString(),
    status: 'confirmed',
    notes: 'Focus on bench press bar path & shoulder stability cues',
    fitness_level: 'Intermediate',
    target_goal: 'Strength & Hypertrophy',
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'book-102',
    client_id: 'client-2',
    client_name: 'Sarah Miller',
    client_phone: '+1 (555) 345-6789',
    trainer_id: 'coach-1',
    session_type: '1st Assessment (60m)',
    start_time: new Date(Date.now() + 52 * 3600 * 1000).toISOString(),
    end_time: new Date(Date.now() + 53 * 3600 * 1000).toISOString(),
    status: 'confirmed',
    notes: 'New client mobility screen and squat test',
    fitness_level: 'Beginner',
    target_goal: 'Fat Loss & Core Strength',
    created_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
  }
])

// Meal logs
const mealLogsList = ref<MealLog[]>([
  {
    id: 'meal-1',
    client_id: 'client-1',
    client_name: 'Alex Johnson',
    client_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    meal_type: 'Breakfast',
    items: [
      { name: 'Oatmeal with Almond Milk', grams: 220, calories: 230, protein: 9, carbs: 42, fat: 4.5 },
      { name: 'Whey Protein Isolate Scoop', grams: 32, calories: 120, protein: 25, carbs: 2, fat: 1 },
      { name: 'Fresh Blueberries', grams: 75, calories: 45, protein: 0.5, carbs: 11, fat: 0.3 },
      { name: 'Crushed Walnuts', grams: 20, calories: 130, protein: 3, carbs: 3, fat: 12.5 }
    ],
    total_calories: 525,
    total_protein: 37.5,
    total_carbs: 58,
    total_fat: 18.3,
    coach_comment: 'Solid complex carbs and anti-inflammatory fats. Keep this standard!',
    is_approved: true,
    logged_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
  },
  {
    id: 'meal-2',
    client_id: 'client-1',
    client_name: 'Alex Johnson',
    client_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    image_url: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&auto=format&fit=crop&q=80',
    meal_type: 'Lunch',
    items: [
      { name: 'Grilled Herb Chicken Breast', grams: 180, calories: 290, protein: 55, carbs: 0, fat: 6 },
      { name: 'Steamed Jasmine Rice', grams: 200, calories: 260, protein: 5, carbs: 58, fat: 0.5 },
      { name: 'Charred Broccoli & Garlic', grams: 120, calories: 55, protein: 4, carbs: 8, fat: 1.5 },
      { name: 'Extra Virgin Olive Oil', grams: 8, calories: 72, protein: 0, carbs: 0, fat: 8 }
    ],
    total_calories: 677,
    total_protein: 64,
    total_carbs: 66,
    total_fat: 16,
    coach_comment: 'Prime pre-workout fuel. Great balance of clean starches and lean protein.',
    is_approved: true,
    logged_at: new Date(Date.now() - 1 * 3600 * 1000).toISOString()
  },
  {
    id: 'meal-3',
    client_id: 'client-2',
    client_name: 'Sarah Miller',
    client_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
    meal_type: 'Lunch',
    items: [
      { name: 'Wild Caught Salmon Fillet', grams: 160, calories: 340, protein: 34, carbs: 0, fat: 20 },
      { name: 'Quinoa Bowl with Avocado', grams: 180, calories: 280, protein: 8, carbs: 36, fat: 12 },
      { name: 'Mixed Baby Greens', grams: 80, calories: 25, protein: 2, carbs: 4, fat: 0 }
    ],
    total_calories: 645,
    total_protein: 44,
    total_carbs: 40,
    total_fat: 32,
    coach_comment: 'High in Omega-3s which will accelerate your knee recovery. Approved!',
    is_approved: true,
    logged_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  }
])

// Hydration state
const dailyWaterMl = ref(2250)

// Metrics history
const metricsHistory = ref<MetricEntry[]>([
  { id: 'm-1', date: '2026-08-10', weight_kg: 86.4, body_fat_percentage: 18.2, notes: 'Initial baseline weigh-in' },
  { id: 'm-2', date: '2026-08-17', weight_kg: 85.8, body_fat_percentage: 17.8, notes: 'Feeling stronger, sleep improved' },
  { id: 'm-3', date: '2026-08-24', weight_kg: 85.1, body_fat_percentage: 17.4, notes: 'Down 1.3kg total, squat felt effortless' },
  { id: 'm-4', date: '2026-08-31', weight_kg: 84.6, body_fat_percentage: 16.9, notes: 'Cardio endurance up, waist measurement -2cm' },
  { id: 'm-5', date: '2026-09-07', weight_kg: 84.1, body_fat_percentage: 16.5, notes: 'Current week check-in' }
])

// Workout set logs
const workoutLogs = ref<Record<string, { setNum: number; weight: number; reps: number; completed: boolean }[]>>({
  'ex-1': [
    { setNum: 1, weight: 32, reps: 10, completed: true },
    { setNum: 2, weight: 34, reps: 9, completed: true },
    { setNum: 3, weight: 36, reps: 8, completed: false },
    { setNum: 4, weight: 36, reps: 8, completed: false }
  ],
  'ex-2': [
    { setNum: 1, weight: 90, reps: 10, completed: true },
    { setNum: 2, weight: 100, reps: 10, completed: false },
    { setNum: 3, weight: 105, reps: 8, completed: false }
  ]
})

export const useEndureStore = () => {
  // Current client computation
  const activeClient = computed(() => {
    return clientsList.value.find(c => c.id === activeClientId.value) || clientsList.value[0]
  })

  // Current user depending on role
  const currentUser = computed<Profile>(() => {
    return currentRole.value === 'coach' ? initialCoach : activeClient.value
  })

  // Today's total nutrition for active client
  const todayMeals = computed(() => {
    return mealLogsList.value.filter(m => m.client_id === activeClientId.value)
  })

  const nutritionTotals = computed(() => {
    return todayMeals.value.reduce(
      (acc, m) => {
        acc.calories += m.total_calories
        acc.protein += m.total_protein
        acc.carbs += m.total_carbs
        acc.fat += m.total_fat
        return acc
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    )
  })

  // Next upcoming session for active client
  const nextSession = computed(() => {
    const upcoming = bookingsList.value
      .filter(b => b.client_id === activeClientId.value && b.status === 'confirmed' && new Date(b.start_time) > new Date())
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
    return upcoming[0] || null
  })

  // Next upcoming sessions for coach
  const coachUpcomingSessions = computed(() => {
    return bookingsList.value
      .filter(b => b.status === 'confirmed')
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
  })

  // Role switching
  const switchRole = (role: 'client' | 'coach') => {
    currentRole.value = role
  }

  const setActiveClient = (id: string) => {
    activeClientId.value = id
  }

  // Hydration actions
  const addWater = (amountMl: number = 250) => {
    dailyWaterMl.value = Math.min(6000, dailyWaterMl.value + amountMl)
  }

  // Meal actions
  const addMeal = (meal: Omit<MealLog, 'id' | 'logged_at'>) => {
    const newMeal: MealLog = {
      ...meal,
      id: `meal-${Date.now()}`,
      client_id: activeClientId.value,
      client_name: activeClient.value.full_name,
      client_avatar: activeClient.value.avatar_url,
      logged_at: new Date().toISOString()
    }
    mealLogsList.value.unshift(newMeal)
    return newMeal
  }

  const approveMeal = (mealId: string, comment?: string) => {
    const meal = mealLogsList.value.find(m => m.id === mealId)
    if (meal) {
      meal.is_approved = true
      if (comment) meal.coach_comment = comment
    }
  }

  const addCoachMealComment = (mealId: string, comment: string) => {
    const meal = mealLogsList.value.find(m => m.id === mealId)
    if (meal) {
      meal.coach_comment = comment
      meal.is_approved = true
    }
  }

  // Bookings actions
  const createBooking = (data: {
    session_type: string
    start_time: string
    end_time: string
    client_name: string
    client_phone?: string
    notes?: string
    fitness_level?: string
    target_goal?: string
    injuries_notes?: string
  }) => {
    const newBooking: Booking = {
      id: `book-${Date.now().toString().slice(-4)}`,
      client_id: activeClientId.value,
      client_name: data.client_name,
      client_phone: data.client_phone,
      trainer_id: 'coach-1',
      session_type: data.session_type,
      start_time: data.start_time,
      end_time: data.end_time,
      status: 'confirmed',
      notes: data.notes,
      fitness_level: data.fitness_level,
      target_goal: data.target_goal,
      injuries_notes: data.injuries_notes,
      created_at: new Date().toISOString()
    }
    bookingsList.value.push(newBooking)
    return newBooking
  }

  // Business Rule: Check 12-hour policy
  const canCancelOrReschedule = (startTimeStr: string): { allowed: boolean; hoursRemaining: number; reason?: string } => {
    const sessionTime = new Date(startTimeStr).getTime()
    const now = Date.now()
    const hoursRemaining = (sessionTime - now) / (1000 * 3600)
    if (hoursRemaining < 12) {
      return {
        allowed: false,
        hoursRemaining,
        reason: 'Sessions cannot be cancelled or rescheduled within 12 hours of the start time per Endure policy.'
      }
    }
    return { allowed: true, hoursRemaining }
  }

  const cancelBooking = (bookingId: string) => {
    const booking = bookingsList.value.find(b => b.id === bookingId)
    if (!booking) throw new Error('Booking not found')
    const check = canCancelOrReschedule(booking.start_time)
    if (!check.allowed) {
      throw new Error(check.reason)
    }
    booking.status = 'cancelled'
    return booking
  }

  // Workout set completion toggle
  const toggleSetComplete = (exerciseId: string, setIndex: number, weight?: number, reps?: number) => {
    if (!workoutLogs.value[exerciseId]) {
      workoutLogs.value[exerciseId] = []
    }
    const sets = workoutLogs.value[exerciseId]
    if (sets[setIndex]) {
      sets[setIndex].completed = !sets[setIndex].completed
      if (weight !== undefined) sets[setIndex].weight = weight
      if (reps !== undefined) sets[setIndex].reps = reps
    } else {
      sets[setIndex] = {
        setNum: setIndex + 1,
        weight: weight || 0,
        reps: reps || 0,
        completed: true
      }
    }
  }

  // Update client targets from PT CRM
  const updateClientTargets = (clientId: string, targets: Partial<Profile>) => {
    const client = clientsList.value.find(c => c.id === clientId)
    if (client) {
      Object.assign(client, targets)
    }
  }

  // Add new exercise to CMS
  const addExercise = (exercise: Omit<Exercise, 'id'>) => {
    const newEx: Exercise = {
      ...exercise,
      id: `ex-${Date.now()}`
    }
    exercisesList.value.unshift(newEx)
    return newEx
  }

  // Add metric
  const addMetricEntry = (weight: number, bodyFat?: number, notes?: string) => {
    const entry: MetricEntry = {
      id: `m-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      weight_kg: weight,
      body_fat_percentage: bodyFat,
      notes
    }
    metricsHistory.value.push(entry)
    return entry
  }

  return {
    // State
    currentRole,
    currentUser,
    activeClientId,
    activeClient,
    clientsList,
    bookingsList,
    mealLogsList,
    todayMeals,
    nutritionTotals,
    dailyWaterMl,
    nextSession,
    coachUpcomingSessions,
    exercisesList,
    workoutLogs,
    metricsHistory,

    // Actions
    switchRole,
    setActiveClient,
    addWater,
    addMeal,
    approveMeal,
    addCoachMealComment,
    createBooking,
    cancelBooking,
    canCancelOrReschedule,
    toggleSetComplete,
    updateClientTargets,
    addExercise,
    addMetricEntry
  }
}
