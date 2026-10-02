import type { FoodItem } from "@/types";

export const FOODS: FoodItem[] = [
  // ─── Ethiopian ──────────────────────────────────────────────────────────────
  { name: "Doro Wat",              cal: 520,  protein: 38, price: "600–1000 ETB",  cat: "meat", origin: "Ethiopia"     },
  { name: "Kitfo",                 cal: 580,  protein: 42, price: "600–1200 ETB",  cat: "meat", origin: "Ethiopia"     },
  { name: "Tibs (Zilzil)",         cal: 500,  protein: 40, price: "600–950 ETB",   cat: "meat", origin: "Ethiopia"     },
  { name: "Key Wat",               cal: 450,  protein: 35, price: "500–800 ETB",   cat: "meat", origin: "Ethiopia"     },
  { name: "Yebeg Alicha",          cal: 420,  protein: 32, price: "500–850 ETB",   cat: "meat", origin: "Ethiopia"     },
  { name: "Gored Gored",           cal: 500,  protein: 44, price: "600–1100 ETB",  cat: "meat", origin: "Ethiopia"     },
  { name: "Shiro Wat",             cal: 300,  protein: 18, price: "150–250 ETB",   cat: "legumes",  origin: "Ethiopia"     },
  { name: "Azifa (Lentil Salad)",  cal: 175,  protein: 12, price: "150–250 ETB",   cat: "legumes",  origin: "Ethiopia"     },
  { name: "Miser Alicha",          cal: 185,  protein: 14, price: "150–250 ETB",   cat: "legumes",  origin: "Ethiopia"     },
  { name: "Buticha",               cal: 205,  protein: 13, price: "120–200 ETB",   cat: "legumes",  origin: "Ethiopia"     },
  { name: "Enkulal Firfir (Egg)",  cal: 285,  protein: 18, price: "180–300 ETB",   cat: "breakfast", origin: "Ethiopia"     },
  { name: "Injera (2 pcs)",        cal: 350,  protein: 10, price: "20–40 ETB",     cat: "bread",  origin: "Ethiopia"     },
  { name: "Genfo",                 cal: 525,  protein: 12, price: "250–400 ETB",   cat: "breakfast", origin: "Ethiopia"     },
  { name: "Shahan Ful",            cal: 340,  protein: 16, price: "150–250 ETB",   cat: "breakfast",  origin: "Ethiopia"     },

  // ─── Japanese ───────────────────────────────────────────────────────────────
  { name: "Grilled Salmon (Sake)", cal: 370,  protein: 40, price: "$12–20",        cat: "seafood", origin: "Japan"        },
  { name: "Edamame (1 cup)",       cal: 190,  protein: 17, price: "$3–6",          cat: "legumes",  origin: "Japan"        },
  { name: "Chicken Teriyaki",      cal: 440,  protein: 36, price: "$10–16",        cat: "meat", origin: "Japan"        },
  { name: "Natto (Fermented Soy)", cal: 210,  protein: 18, price: "$2–4",          cat: "legumes",  origin: "Japan"        },
  { name: "Sashimi Platter",       cal: 280,  protein: 42, price: "$15–30",        cat: "seafood", origin: "Japan"        },

  // ─── Indian ─────────────────────────────────────────────────────────────────
  { name: "Tandoori Chicken",      cal: 260,  protein: 30, price: "₹250–450",      cat: "meat", origin: "India"        },
  { name: "Dal Tadka",             cal: 220,  protein: 14, price: "₹120–200",      cat: "legumes",  origin: "India"        },
  { name: "Paneer Tikka",          cal: 320,  protein: 22, price: "₹200–350",      cat: "dairy", origin: "India"        },
  { name: "Chana Masala",          cal: 240,  protein: 15, price: "₹150–250",      cat: "legumes",  origin: "India"        },
  { name: "Egg Bhurji",            cal: 250,  protein: 18, price: "₹100–180",      cat: "breakfast", origin: "India"        },

  // ─── Mexican ────────────────────────────────────────────────────────────────
  { name: "Carne Asada",           cal: 480,  protein: 44, price: "$12–18",        cat: "meat", origin: "Mexico"       },
  { name: "Black Bean Bowl",       cal: 350,  protein: 21, price: "$8–12",         cat: "legumes",  origin: "Mexico"       },
  { name: "Chicken Burrito Bowl",  cal: 520,  protein: 38, price: "$10–15",        cat: "meat", origin: "Mexico"       },
  { name: "Huevos Rancheros",      cal: 380,  protein: 22, price: "$8–14",         cat: "breakfast", origin: "Mexico"       },

  // ─── Mediterranean / Greek ──────────────────────────────────────────────────
  { name: "Grilled Lamb Kofta",    cal: 400,  protein: 32, price: "€8–14",         cat: "meat", origin: "Greece"       },
  { name: "Greek Yogurt + Honey",  cal: 180,  protein: 18, price: "€3–6",          cat: "dairy", origin: "Greece"       },
  { name: "Falafel Plate",         cal: 340,  protein: 16, price: "€6–10",         cat: "legumes",  origin: "Lebanon"      },
  { name: "Hummus + Pita",         cal: 300,  protein: 12, price: "€4–8",          cat: "legumes",  origin: "Lebanon"      },
  { name: "Shakshuka",             cal: 310,  protein: 20, price: "€6–12",         cat: "breakfast", origin: "Israel"       },
  { name: "Grilled Sea Bass",      cal: 280,  protein: 36, price: "€12–20",        cat: "seafood", origin: "Turkey"       },

  // ─── American / Western ─────────────────────────────────────────────────────
  { name: "Grilled Chicken Breast",cal: 330,  protein: 46, price: "$8–14",         cat: "meat", origin: "USA"          },
  { name: "Turkey Meatballs",      cal: 280,  protein: 28, price: "$8–12",         cat: "meat", origin: "USA"          },
  { name: "Scrambled Eggs (3)",    cal: 240,  protein: 21, price: "$4–8",          cat: "breakfast", origin: "USA"          },
  { name: "Bison Burger (no bun)", cal: 350,  protein: 34, price: "$12–18",        cat: "meat", origin: "USA"          },
  { name: "Cottage Cheese Bowl",   cal: 200,  protein: 24, price: "$4–7",          cat: "dairy", origin: "USA"          },
  { name: "Whey Protein Shake",    cal: 150,  protein: 30, price: "$3–5",          cat: "drink",  origin: "USA"          },

  // ─── Korean ─────────────────────────────────────────────────────────────────
  { name: "Bulgogi (Beef)",        cal: 420,  protein: 36, price: "₩12,000–18,000",cat: "meat", origin: "Korea"        },
  { name: "Sundubu-jjigae (Tofu)", cal: 240,  protein: 20, price: "₩8,000–12,000", cat: "legumes",  origin: "Korea"        },
  { name: "Dakgalbi (Chicken)",    cal: 380,  protein: 32, price: "₩10,000–15,000",cat: "meat", origin: "Korea"        },

  // ─── Thai ───────────────────────────────────────────────────────────────────
  { name: "Larb Gai (Chicken)",    cal: 280,  protein: 26, price: "฿80–150",       cat: "meat", origin: "Thailand"     },
  { name: "Tom Yum Goong (Shrimp)",cal: 200,  protein: 22, price: "฿120–200",      cat: "seafood", origin: "Thailand"     },
  { name: "Pad Thai with Shrimp",  cal: 400,  protein: 24, price: "฿100–180",      cat: "seafood", origin: "Thailand"     },

  // ─── West African ──────────────────────────────────────────────────────────
  { name: "Suya (Grilled Beef)",   cal: 350,  protein: 34, price: "₦1,500–3,000",  cat: "meat", origin: "Nigeria"      },
  { name: "Egusi Soup + Fufu",     cal: 450,  protein: 22, price: "₦2,000–4,000",  cat: "meat", origin: "Nigeria"      },
  { name: "Jollof Rice + Chicken", cal: 500,  protein: 30, price: "₦2,500–5,000",  cat: "meat", origin: "Nigeria"      },

  // ─── Brazilian ──────────────────────────────────────────────────────────────
  { name: "Picanha Steak",         cal: 450,  protein: 42, price: "R$40–70",       cat: "meat", origin: "Brazil"       },
  { name: "Feijoada (Black Bean)", cal: 480,  protein: 28, price: "R$25–50",       cat: "legumes", origin: "Brazil"       },
  { name: "Açaí + Granola Bowl",   cal: 320,  protein: 8,  price: "R$15–30",       cat: "breakfast",  origin: "Brazil"       },

  // ─── Chinese ────────────────────────────────────────────────────────────────
  { name: "Kung Pao Chicken",      cal: 380,  protein: 30, price: "¥30–55",        cat: "meat", origin: "China"        },
  { name: "Mapo Tofu",             cal: 260,  protein: 18, price: "¥20–40",        cat: "legumes",  origin: "China"        },
  { name: "Steamed Fish (Sea Bass)",cal: 250, protein: 38, price: "¥50–90",        cat: "seafood", origin: "China"        },

  // ─── Peruvian ───────────────────────────────────────────────────────────────
  { name: "Lomo Saltado",          cal: 450,  protein: 36, price: "S/25–45",       cat: "meat", origin: "Peru"         },
  { name: "Ceviche",               cal: 200,  protein: 28, price: "S/20–40",       cat: "seafood", origin: "Peru"         },

  // ─── North African / Middle Eastern ─────────────────────────────────────────
  { name: "Koshary (Lentil Bowl)", cal: 350,  protein: 16, price: "EGP 30–60",     cat: "legumes",  origin: "Egypt"        },
  { name: "Shawarma Plate",        cal: 500,  protein: 38, price: "AED 25–45",     cat: "meat", origin: "Arabia"       },
  { name: "Lamb Tagine",           cal: 420,  protein: 30, price: "MAD 60–120",    cat: "meat", origin: "Morocco"      },

  // ─── East African (non-Ethiopian) ──────────────────────────────────────────
  { name: "Nyama Choma (Roast)",   cal: 400,  protein: 38, price: "KES 500–900",   cat: "meat", origin: "Kenya"        },
  { name: "Ugali + Fish Stew",     cal: 380,  protein: 24, price: "KES 300–600",   cat: "seafood", origin: "Kenya"        },

  // ─── Global Staples & Snacks ────────────────────────────────────────────────
  { name: "Boiled Eggs (3 large)", cal: 210,  protein: 18, price: "$1–3",          cat: "snack", origin: "Global"        },
  { name: "Peanut Butter Toast",   cal: 340,  protein: 14, price: "$2–4",          cat: "breakfast",  origin: "Global"        },
  { name: "Quinoa Salad Bowl",     cal: 280,  protein: 12, price: "$6–10",         cat: "grains",  origin: "Global"        },
  { name: "Lentil Soup",           cal: 230,  protein: 18, price: "$4–8",          cat: "legumes",  origin: "Global"        },
  { name: "Tuna Salad",            cal: 300,  protein: 32, price: "$6–10",         cat: "seafood", origin: "Global"        },
  { name: "Mixed Nuts (¼ cup)",    cal: 210,  protein: 7,  price: "$2–5",          cat: "snack",  origin: "Global"        },
  { name: "Protein Smoothie",      cal: 250,  protein: 28, price: "$5–9",          cat: "drink",  origin: "Global"        },
  { name: "Buna (Ethiopian Coffee)",cal: 7,   protein: 0,  price: "30–70 ETB",     cat: "drink",  origin: "Ethiopia"     },
];

export const CONDITIONS = [
  "Hypertension",
  "Type 2 Diabetes",
  "Obesity",
  "Stroke",
  "Coronary Artery Disease",
  "Chronic Kidney Disease",
];
