// ─── Workout Plans by Health Condition ────────────────────────────────────────
// Each exercise includes name, duration in seconds, description, and target conditions.

export interface Exercise {
  name: string;
  duration: number;     // seconds
  rest: number;         // rest after this exercise (seconds)
  description: string;
  intensity: "low" | "moderate" | "high";
}

export interface WorkoutPlan {
  id: string;
  title: string;
  subtitle: string;
  targetConditions: string[];  // matches CONDITIONS from foods.ts
  totalMinutes: number;
  exercises: Exercise[];
}

export const WORKOUT_PLANS: WorkoutPlan[] = [
  // ─── Heart Health (Hypertension, Coronary Artery Disease, Stroke) ──────────
  {
    id: "heart-health",
    title: "Heart Health Routine",
    subtitle: "Low-impact cardio & breathing for cardiovascular wellness",
    targetConditions: ["Hypertension", "Coronary Artery Disease", "Stroke"],
    totalMinutes: 20,
    exercises: [
      { name: "Deep Breathing",        duration: 60,  rest: 15, description: "Inhale 4s, hold 4s, exhale 6s. Lowers blood pressure naturally.", intensity: "low" },
      { name: "Gentle Walk in Place",  duration: 120, rest: 20, description: "Walk at a comfortable pace. Keep shoulders relaxed.", intensity: "low" },
      { name: "Arm Circles",           duration: 45,  rest: 15, description: "Extend arms, make slow circles. Forward then backward.", intensity: "low" },
      { name: "Seated Marching",       duration: 90,  rest: 20, description: "Sit upright, lift knees alternately. Good for circulation.", intensity: "low" },
      { name: "Wall Push-ups",         duration: 60,  rest: 20, description: "Stand arm's length from wall, push slowly. 10-12 reps.", intensity: "moderate" },
      { name: "Side Steps",            duration: 90,  rest: 20, description: "Step side to side. Keep core engaged, breathe steadily.", intensity: "moderate" },
      { name: "Calf Raises",           duration: 60,  rest: 15, description: "Rise onto toes slowly, hold 2s, lower. Improves circulation.", intensity: "low" },
      { name: "Cool-down Stretching",  duration: 90,  rest: 0,  description: "Gentle full-body stretches. Focus on deep breathing.", intensity: "low" },
    ],
  },

  // ─── Diabetes Management (Type 2 Diabetes) ────────────────────────────────
  {
    id: "diabetes-control",
    title: "Blood Sugar Balance",
    subtitle: "Post-meal movement & resistance to improve insulin sensitivity",
    targetConditions: ["Type 2 Diabetes"],
    totalMinutes: 25,
    exercises: [
      { name: "Brisk Walking",         duration: 120, rest: 20, description: "Walk with purpose. Helps glucose uptake by muscles.", intensity: "moderate" },
      { name: "Bodyweight Squats",      duration: 60,  rest: 20, description: "Feet shoulder-width, squat to 90°. 12-15 reps.", intensity: "moderate" },
      { name: "Standing Leg Lifts",     duration: 60,  rest: 15, description: "Lift each leg to the side, 10 reps per side.", intensity: "low" },
      { name: "Chair Dips",             duration: 45,  rest: 20, description: "Use a sturdy chair, lower body using arms. 8-10 reps.", intensity: "moderate" },
      { name: "Resistance Band Pulls",  duration: 60,  rest: 20, description: "Pull band apart at chest height. 15 reps.", intensity: "moderate" },
      { name: "Step-ups",               duration: 90,  rest: 20, description: "Step onto a low platform, alternate legs. Steady pace.", intensity: "moderate" },
      { name: "Plank Hold",             duration: 30,  rest: 20, description: "Hold plank on forearms. Modify on knees if needed.", intensity: "moderate" },
      { name: "Seated Toe Touches",     duration: 60,  rest: 15, description: "Sit, reach for toes. Hold 15s each side.", intensity: "low" },
      { name: "Post-meal Walk",         duration: 180, rest: 0,  description: "Walk 10-15 min after meals. Best for blood sugar control.", intensity: "low" },
    ],
  },

  // ─── Weight Management (Obesity) ───────────────────────────────────────────
  {
    id: "weight-loss",
    title: "Fat Burn & Tone",
    subtitle: "Progressive interval training to boost metabolism",
    targetConditions: ["Obesity"],
    totalMinutes: 30,
    exercises: [
      { name: "Jumping Jacks",         duration: 45,  rest: 20, description: "Full range of motion. Modify to step-jacks if needed.", intensity: "high" },
      { name: "High Knees",            duration: 30,  rest: 20, description: "Drive knees up fast. Keep core tight.", intensity: "high" },
      { name: "Bodyweight Squats",      duration: 60,  rest: 20, description: "Deep squats, 15-20 reps. Engage glutes at the top.", intensity: "moderate" },
      { name: "Mountain Climbers",      duration: 30,  rest: 20, description: "From plank, drive knees to chest alternately.", intensity: "high" },
      { name: "Lunges",                 duration: 60,  rest: 20, description: "Alternate forward lunges, 10 per leg.", intensity: "moderate" },
      { name: "Burpees (Modified)",     duration: 30,  rest: 25, description: "Squat, step back to plank, step forward, stand.", intensity: "high" },
      { name: "Push-ups",              duration: 45,  rest: 20, description: "Standard or on knees. 10-15 reps.", intensity: "moderate" },
      { name: "Bicycle Crunches",       duration: 45,  rest: 20, description: "Twist to touch elbow to opposite knee. 20 reps.", intensity: "moderate" },
      { name: "Plank Hold",             duration: 45,  rest: 20, description: "Hold solid plank. Breathe steadily.", intensity: "moderate" },
      { name: "Cool-down Stretch",      duration: 120, rest: 0,  description: "Stretch all major muscle groups. 15s per stretch.", intensity: "low" },
    ],
  },

  // ─── Kidney Care (Chronic Kidney Disease) ──────────────────────────────────
  {
    id: "kidney-care",
    title: "Gentle Movement",
    subtitle: "Light exercises safe for kidney patients, reducing fatigue",
    targetConditions: ["Chronic Kidney Disease"],
    totalMinutes: 15,
    exercises: [
      { name: "Neck Rolls",            duration: 45,  rest: 10, description: "Slowly roll head in circles. Relieves tension.", intensity: "low" },
      { name: "Shoulder Shrugs",       duration: 30,  rest: 10, description: "Raise shoulders to ears, hold 3s, release. 10 reps.", intensity: "low" },
      { name: "Seated Leg Extensions", duration: 60,  rest: 15, description: "Sit, extend one leg straight, hold 5s. Alternate.", intensity: "low" },
      { name: "Ankle Rotations",       duration: 30,  rest: 10, description: "Circle each ankle 10 times each direction.", intensity: "low" },
      { name: "Gentle Walk",           duration: 180, rest: 20, description: "Walk at a very comfortable pace. Stop if dizzy.", intensity: "low" },
      { name: "Seated Cat-Cow",        duration: 60,  rest: 15, description: "Sit, arch and round spine with breath. 8-10 reps.", intensity: "low" },
      { name: "Deep Breathing",        duration: 90,  rest: 0,  description: "4-7-8 breathing: inhale 4s, hold 7s, exhale 8s.", intensity: "low" },
    ],
  },

  // ─── General Fitness (no specific condition / default) ─────────────────────
  {
    id: "general-fitness",
    title: "Daily Fitness Boost",
    subtitle: "Balanced full-body workout for overall wellness",
    targetConditions: [],
    totalMinutes: 25,
    exercises: [
      { name: "Warm-up Jog in Place", duration: 60,  rest: 15, description: "Light jog to raise heart rate. Swing arms naturally.", intensity: "low" },
      { name: "Dynamic Stretches",    duration: 60,  rest: 10, description: "Leg swings, arm circles, hip rotations.", intensity: "low" },
      { name: "Push-ups",             duration: 45,  rest: 20, description: "Standard or modified. Focus on form, 12-15 reps.", intensity: "moderate" },
      { name: "Bodyweight Squats",    duration: 60,  rest: 20, description: "Full range, 15-20 reps. Keep knees over toes.", intensity: "moderate" },
      { name: "Plank Hold",           duration: 45,  rest: 20, description: "Forearm plank. Keep body straight, core engaged.", intensity: "moderate" },
      { name: "Lunges",               duration: 60,  rest: 20, description: "Alternate legs, 10 per side. Steady pace.", intensity: "moderate" },
      { name: "Superman Hold",        duration: 30,  rest: 15, description: "Lie face down, lift arms & legs. Hold 5s, repeat 6x.", intensity: "moderate" },
      { name: "Jumping Jacks",        duration: 45,  rest: 20, description: "Full body cardio burst. Keep rhythm steady.", intensity: "high" },
      { name: "Glute Bridges",        duration: 45,  rest: 15, description: "Lie on back, lift hips. Squeeze glutes at top. 15 reps.", intensity: "moderate" },
      { name: "Cool-down Stretch",    duration: 120, rest: 0,  description: "Hold each stretch 15-20s. Deep breaths throughout.", intensity: "low" },
    ],
  },
];
