import type { PremiumPlan } from "@/types";

export const PLANS: PremiumPlan[] = [
  {
    id: "1mo",
    price: "199",
    period: "/ mo",
    badge: null,
    features: [
      "AI Coach (30 msg/day)",
      "Daily Health Tracker",
      "Ethiopian Food DB",
      "BMI & NCD Monitoring",
      "Sleep & Water Logs",
    ],
  },
  {
    id: "3mo",
    price: "499",
    period: "/ 3 months",
    badge: null,
    features: [
      "AI Coach (100 msg/day)",
      "Everything in Basic",
      "Personalized Meal Plans",
      "Weekly Progress Reports",
      "Priority Support",
    ],
  },
  {
    id: "6mo",
    price: "899",
    period: "/ 6 months",
    badge: "most_popular",
    features: [
      "Unlimited AI Coaching",
      "Everything in Standard",
      "Advanced Analytics",
      "Custom Workout Plans",
      "Fasting Calendar",
      "Family Dashboard",
    ],
  },
  {
    id: "12mo",
    price: "1,499",
    period: "/ year",
    badge: "best_value",
    features: [
      "Everything in Pro",
      "Doctor Referral Link",
      "Offline Mode",
      "Exclusive Health Content",
      "Annual PDF Report",
      "24/7 Priority Support",
      "Save 37%",
    ],
  },
];

export const PLAN_LABELS = ["1 Month", "3 Months", "6 Months", "1 Year"];
export const PLAN_SUB = ["Basic Access", "Standard Access", "Pro Access", "Best Value"];
