"use client";

import React from "react";
import type { ColorTokens, Lang, Theme } from "@/types";

interface HeaderProps {
  C: ColorTokens;
  lang: Lang;
  theme: Theme;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onEditProfile: () => void;
  hideProfileBtn?: boolean;
}

export default function Header({
  C, lang, theme, onToggleLang, onToggleTheme, onEditProfile, hideProfileBtn = false,
}: HeaderProps) {
  const isDark = theme === "dark";

  const btnBase: React.CSSProperties = {
    background: "transparent",
    color: C.text,
    border: `1.5px solid ${C.border}`,
    borderRadius: 10,
    padding: "5px 9px",
    cursor: "pointer",
    fontSize: 10,
    fontWeight: 600,
    transition: "all 0.18s",
    outline: "none",
    letterSpacing: "0.01em",
  };

  return (
    <header
      style={{
        padding: "12px 16px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid ${C.border}`,
        background: C.headerBg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Logo + Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 40, height: 40, borderRadius: 12, overflow: "hidden",
            background: `linear-gradient(135deg,${C.green},${C.gold})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: C.shadowGreen, flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="TENACHIN Logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
            }}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }}
          />
          <span
            style={{
              fontSize: 20, display: "none",
              alignItems: "center", justifyContent: "center",
              width: "100%", height: "100%", color: "#fff", fontWeight: 900,
            }}
          >T</span>
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 900, color: C.green, letterSpacing: "-0.03em", lineHeight: 1 }}>
            TENACHIN
          </div>
          <div style={{ fontSize: 9, color: C.textMuted, fontWeight: 500, letterSpacing: "0.08em" }}>
            ጤና ቺን · WELLNESS
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <button style={btnBase} onClick={onToggleLang}>
          {lang === "en" ? "አማ" : lang === "am" ? "Oro" : "EN"}
        </button>
        <button style={{ ...btnBase, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onToggleTheme}>
          {isDark ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>
        {!hideProfileBtn && (
          <button style={{ ...btnBase, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onEditProfile}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
        )}
      </div>
    </header>
  );
}
