import type { FoodItem } from "@/types";

export const FOODS: FoodItem[] = [
  { name: "Injera (2 pcs)",    cal: 350, price: "20–40 ETB",    cat: "bread",     fast: true  },
  { name: "Shiro Wat",         cal: 300, price: "150–250 ETB",  cat: "veg",       fast: true  },
  { name: "Doro Wat",          cal: 520, price: "600–1000 ETB", cat: "meat",      fast: false },
  { name: "Kitfo",             cal: 580, price: "600–1200 ETB", cat: "meat",      fast: false },
  { name: "Tibs (Zilzil)",     cal: 500, price: "600–950 ETB",  cat: "meat",      fast: false },
  { name: "Gomen",             cal: 100, price: "120–220 ETB",  cat: "veg",       fast: true  },
  { name: "Tikil Gomen",       cal: 115, price: "120–220 ETB",  cat: "veg",       fast: true  },
  { name: "Azifa",             cal: 175, price: "150–250 ETB",  cat: "veg",       fast: true  },
  { name: "Chechebsa",         cal: 400, price: "200–350 ETB",  cat: "breakfast", fast: false },
  { name: "Shahan Ful",        cal: 340, price: "150–250 ETB",  cat: "breakfast", fast: true  },
  { name: "Enkulal Firfir",    cal: 285, price: "180–300 ETB",  cat: "breakfast", fast: false },
  { name: "Genfo",             cal: 525, price: "250–400 ETB",  cat: "breakfast", fast: false },
  { name: "Key Wat",           cal: 450, price: "500–800 ETB",  cat: "meat",      fast: false },
  { name: "Sambusa",           cal: 175, price: "30–60 ETB",    cat: "snack",     fast: false },
  { name: "Kolo",              cal: 180, price: "25–50 ETB",    cat: "snack",     fast: true  },
  { name: "Ayib",              cal: 100, price: "100–150 ETB",  cat: "veg",       fast: false },
  { name: "Tej (glass)",       cal: 300, price: "150–300 ETB",  cat: "drink",     fast: false },
  { name: "Buna (coffee)",     cal: 7,   price: "30–70 ETB",    cat: "drink",     fast: true  },
  { name: "Miser Alicha",      cal: 185, price: "150–250 ETB",  cat: "veg",       fast: true  },
  { name: "Fasolia",           cal: 130, price: "130–220 ETB",  cat: "veg",       fast: true  },
  { name: "Yebeg Alicha",      cal: 420, price: "500–850 ETB",  cat: "meat",      fast: false },
  { name: "Gored Gored",       cal: 500, price: "600–1100 ETB", cat: "meat",      fast: false },
  { name: "Buticha",           cal: 205, price: "120–200 ETB",  cat: "veg",       fast: true  },
  { name: "Timatim Salata",    cal: 75,  price: "100–180 ETB",  cat: "veg",       fast: true  },
];

export const CONDITIONS = [
  "Hypertension",
  "Type 2 Diabetes",
  "Obesity",
  "Stroke",
  "Coronary Artery Disease",
  "Chronic Kidney Disease",
];
