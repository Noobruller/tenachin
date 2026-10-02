"use client";

import React from "react";
import type { ColorTokens, Lang, Tab } from "@/types";
import { t } from "@/lib/i18n";

/* ── SVG icon components (lightweight, no emoji) ─────────────────────────── */
const IconHome = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconTracker = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const IconFood = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const IconCoach = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconWorkout = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 6.5h11" /><path d="M6.5 17.5h11" />
    <path d="M12 6.5v11" />
    <rect x="2" y="8" width="4" height="8" rx="1" />
    <rect x="18" y="8" width="4" height="8" rx="1" />
  </svg>
);

const ICONS: Record<Tab, React.FC> = {
  onboarding: IconHome,
  home: IconHome,
  tracker: IconTracker,
  food: IconFood,
  workout: IconWorkout,
  coach: IconCoach,
};

const NAV_ITEMS: { id: Tab; key: string }[] = [
  { id: "home",    key: "nav_home"    },
  { id: "tracker", key: "nav_tracker" },
  { id: "food",    key: "nav_food"    },
  { id: "workout", key: "nav_workout" },
  { id: "coach",   key: "nav_coach"   },
];

interface BottomNavProps {
  tab: Tab;
  setTab: (t: Tab) => void;
  C: ColorTokens;
  lang: Lang;
}

export default function BottomNav({ tab, setTab, C, lang }: BottomNavProps) {
  const T = (key: string) => t(lang, key);

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 480,
        background: C.navBg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: `1px solid ${C.border}`,
        zIndex: 50,
        display: "flex",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {NAV_ITEMS.map((n) => {
        const active = tab === n.id;
        const color = active ? C.green : C.textMuted;
        const Icon = ICONS[n.id];
        return (
          <button
            key={n.id}
            onClick={() => setTab(n.id)}
            style={{
              flex: 1,
              padding: "10px 4px 8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              color,
              transition: "color 0.2s",
              position: "relative",
            }}
          >
            {active && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 36,
                  height: 3,
                  borderRadius: "0 0 4px 4px",
                  background: C.green,
                }}
              />
            )}
            <Icon />
            <span style={{ fontSize: 9, fontWeight: active ? 800 : 400, letterSpacing: "0.02em" }}>
              {T(n.key)}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

