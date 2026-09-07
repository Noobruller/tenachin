                                            TENACHIN (ጤናችን) — Ethiopian Health & Fitness Platform

Tenachin is a modern, multilingual (Amharic, Afaan Oromo & English) health, nutrition, wellness, and fitness tracking platform designed for Ethiopian lifestyles, cuisine, and fitness goals.

Rebuilt from a monolithic prototype into a modular, production-grade **Next.js 14 + TypeScript** architecture with layered components, typed models, and clean separation of concerns.

---

-- Key Features

- **🇪🇹 Ethiopian Nutritional Intelligence**: Comprehensive food database with traditional staples (Injera, Shiro, Doro Wat, Misir Wat, Kik Alicha, Atkilt, etc.), localized macro breakdowns, and calorie tracking.
-  Bilingual Localization**: Native toggle between **English** and **አማርኛ (Amharic)** across all UI elements, guidance messages, and health metrics.
-  AI Health & Fitness Coach**: Integrated conversational coach powered by OpenRouter LLM API, providing contextual fitness advice, meal plans, and encouragement.
-  Device Motion Sensors**: Real-time step counting, workout intensity detection, and motion telemetry via DeviceMotionEvent/DeviceOrientation API.
-  Interactive Progress & Biometrics**: Visual progress rings for calories, protein, hydration, and steps, alongside BMI and macro calculators.
-  Premium & Subscription Tiers**: Tiered plans (Free, Pro, Elite) with local Ethiopian payment integration support (Telebirr, CBE Birr, Chapa).
-  Glassmorphic Modern UI**: Dynamic dark & light themes, modern typography (DM Sans via `next/font`), smooth micro-animations, and responsive mobile-first shell.

---

--Architecture & Folder Structure

```
tenachin/
├── app/                          
│   ├── globals.css               
│   ├── layout.tsx                
│   └── page.tsx                  
├── components/                   
│   ├── auth/                     
│   ├── coach/                    
│   ├── food/                     
│   ├── home/                     
│   ├── layout/                   
│   ├── onboarding/               
│   ├── premium/                  
│   ├── tracker/                  
│   ├── ui/                       
│   └── AppShell.tsx              
├── hooks/                        
│   ├── useChat.ts                
│   ├── useLocalStorage.ts        
│   ├── useMotionSensor.ts        
│   ├── useProfile.ts            
│   └── useTracker.ts             
├── lib/                          
│   ├── foods.ts                  
│   ├── i18n.ts                   
│   ├── openrouter.ts             
│   ├── plans.ts                  
│   └── tokens.ts                 
├── types/
│   └── index.ts                  
├── .env.example                  
├── .gitignore                    
├── next.config.mjs               
├── package.json                  
├── README.md                     
└── tsconfig.json                 
```

---

-- Getting Started

-- Prerequisites
- Node.js 18.17+ or 20+
- npm, yarn, or pnpm

-- Installation

1. Clone repository and install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables (optional for AI Coach):
   Create `.env.local` in root:
   ```env
   NEXT_PUBLIC_OR_KEY=your_openrouter_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

##  Scripts

- `npm run dev`: Starts Next.js development server at `http://localhost:3000`
- `npm run build`: Type-checks and creates production build
- `npm run start`: Runs production server
- `npm run lint`: Runs ESLint checks
