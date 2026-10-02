// ─── Language & Theme ───────────────────────────────────────────────────────
export type Lang = "en" | "am" | "or";
export type Theme = "dark" | "light";

// ─── Color Design Tokens ────────────────────────────────────────────────────
export interface ColorTokens {
  bg: string;
  surface: string;
  surfaceEl: string;
  surfaceHigh: string;
  border: string;
  borderMid: string;
  text: string;
  textSub: string;
  textMuted: string;
  green: string;
  greenDark: string;
  greenGlass: string;
  gold: string;
  goldGlass: string;
  blue: string;
  purple: string;
  red: string;
  indigo: string;
  card: string;
  cardBorder: string;
  glass: string;
  navBg: string;
  headerBg: string;
  shadow: string;
  shadowGreen: string;
  shadowGold: string;
}

// ─── Profile ────────────────────────────────────────────────────────────────
export interface Profile {
  fullName: string;
  email: string;
  age: string;
  sex: "Male" | "Female";
  weight: string;
  height: string;

  budget: string;
  conditions: string[];
  otherCondition: string;
}

// ─── Tracking ───────────────────────────────────────────────────────────────
export interface SleepLog {
  hours: number;
  bedtime: string;
  wake: string;
  score: number;
  logged: boolean;
}

// ─── Food ───────────────────────────────────────────────────────────────────
export type FoodCategory = "bread" | "veg" | "meat" | "breakfast" | "snack" | "drink" | "seafood" | "legumes" | "dairy" | "grains";

export interface FoodItem {
  name: string;
  cal: number;
  protein: number;   // grams of protein per serving
  price: string;
  cat: FoodCategory;
  origin: string;    // cuisine / country of origin
}

// ─── AI Chat ────────────────────────────────────────────────────────────────
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// ─── App Screens & Tabs ─────────────────────────────────────────────────────
export type Screen = "login" | "signup" | "app";
export type Tab = "onboarding" | "home" | "tracker" | "food" | "workout" | "coach";
