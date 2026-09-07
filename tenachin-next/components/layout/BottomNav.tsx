"use client";

import React from "react";
import type { ColorTokens, Lang, Tab } from "@/types";
import { t } from "@/lib/i18n";

const NAV_ITEMS = [
  { id: "home"    as Tab, icon: "🏠", key: "nav_home"    },
  { id: "tracker" as Tab, icon: "📊", key: "nav_tracker" },
  { id: "food"    as Tab, icon: "🍽️", key: "nav_food"    },
  { id: "coach"   as Tab, icon: "🤖", key: "nav_coach"   },
  { id: "premium" as Tab, icon: "💎", key: "nav_premium" },
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
        const color = active
          ? n.id === "premium" ? C.gold : C.green
          : C.textMuted;
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
                  background: n.id === "premium" ? C.gold : C.green,
                }}
              />
            )}
            <span style={{ fontSize: 20, lineHeight: 1 }}>{n.icon}</span>
            <span style={{ fontSize: 9, fontWeight: active ? 800 : 400, letterSpacing: "0.02em" }}>
              {T(n.key)}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
