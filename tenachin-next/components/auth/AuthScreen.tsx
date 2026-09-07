"use client";

import React, { useState } from "react";
import type { ColorTokens, Lang, Screen, Profile, Theme } from "@/types";
import { t } from "@/lib/i18n";
import { lsGet, lsSet } from "@/hooks/useLocalStorage";

interface AuthScreenProps {
  screen: Screen;
  setScreen: (s: Screen) => void;
  lang: Lang;
  theme: Theme;
  C: ColorTokens;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onAuthSuccess: (partialProfile: Partial<Profile>) => void;
}

export default function AuthScreen({
  screen, setScreen, lang, theme, C,
  onToggleLang, onToggleTheme, onAuthSuccess,
}: AuthScreenProps) {
  const isSU  = screen === "signup";
  const isDark = theme === "dark";
  const T = (key: string) => t(lang, key);

  const [authName,    setAuthName]    = useState("");
  const [authEmail,   setAuthEmail]   = useState("");
  const [authPass,    setAuthPass]    = useState("");
  const [authErr,     setAuthErr]     = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [signupDone,  setSignupDone]  = useState(false);

  const s = {
    input: {
      background: C.surfaceEl, border: `1.5px solid ${C.border}`,
      borderRadius: 12, padding: "12px 16px", color: C.text,
      fontSize: 14, width: "100%", boxSizing: "border-box" as const,
      outline: "none", fontFamily: "inherit", transition: "border-color 0.2s",
    },
    label: {
      fontSize: 11, color: C.textMuted, fontWeight: 700,
      textTransform: "uppercase" as const, letterSpacing: "0.07em",
      marginBottom: 6, display: "block",
    },
    btn: (active: boolean, col?: string): React.CSSProperties => ({
      background: active ? (col ?? C.green) : "transparent",
      color: active ? "#fff" : C.text,
      border: `1.5px solid ${active ? (col ?? C.green) : C.border}`,
      borderRadius: 12, padding: "10px 18px", cursor: "pointer",
      fontSize: 13, fontWeight: 600, transition: "all 0.18s", outline: "none",
    }),
    card: {
      background: C.card, backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)", border: `1px solid ${C.cardBorder}`,
      borderRadius: 20, padding: "28px 24px",
      boxShadow: C.shadow,
    },
  };

  const doLogin = () => {
    setAuthErr("");
    if (!authEmail.trim() || !authPass.trim()) {
      setAuthErr("Enter email and password."); return;
    }
    setAuthLoading(true);
    setTimeout(() => {
      const saved = lsGet<{ email: string; password: string; name: string } | null>("tn_account", null);
      if (!saved || saved.email !== authEmail.trim()) {
        setAuthErr("Account not found. Sign up first."); setAuthLoading(false); return;
      }
      if (saved.password !== authPass) {
        setAuthErr("Incorrect password."); setAuthLoading(false); return;
      }
      onAuthSuccess({ fullName: saved.name, email: saved.email });
      setAuthLoading(false);
    }, 800);
  };

  const doSignup = () => {
    setAuthErr("");
    if (!authName.trim() || !authEmail.trim() || !authPass.trim()) {
      setAuthErr("All fields are required."); return;
    }
    if (authPass.length < 6) {
      setAuthErr("Password must be 6+ characters."); return;
    }
    setAuthLoading(true);
    setTimeout(() => {
      lsSet("tn_account", { name: authName.trim(), email: authEmail.trim(), password: authPass });
      onAuthSuccess({ fullName: authName.trim(), email: authEmail.trim() });
      setAuthLoading(false);
      setSignupDone(true);
      setTimeout(() => setSignupDone(false), 2200);
    }, 900);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        color: C.text,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        maxWidth: 480,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px 0",
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div
          style={{
            width: 88, height: 88, margin: "0 auto 14px", borderRadius: 28,
            background: `linear-gradient(145deg,${C.surfaceHigh},${C.surface})`,
            border: `1px solid ${C.cardBorder}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", boxShadow: C.shadowGreen,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png" alt="TENACHIN Logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              (e.currentTarget.nextSibling as HTMLElement).style.display = "block";
            }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <span style={{ fontSize: 44, display: "none" }}>🌿</span>
        </div>
        <div style={{ fontSize: 30, fontWeight: 900, color: C.green, letterSpacing: "-0.05em", lineHeight: 1 }}>
          TENACHIN
        </div>
        <div style={{ fontSize: 12, color: C.textMuted, marginTop: 6, letterSpacing: "0.1em", fontWeight: 500 }}>
          ጤና ቺን · FAYYAA · WELLNESS
        </div>
      </div>

      {/* Signup success */}
      {signupDone && (
        <div style={{ ...s.card, width: "100%", maxWidth: 360, textAlign: "center", borderColor: C.green, boxShadow: C.shadowGreen }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
          <div style={{ fontWeight: 800, color: C.green, fontSize: 15 }}>{T("signed_up")}</div>
        </div>
      )}

      {/* Form */}
      {!signupDone && (
        <div style={{ ...s.card, width: "100%", maxWidth: 360 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 20 }}>
            {isSU ? T("create_account") : T("welcome_back")}
          </div>

          {isSU && (
            <>
              <label style={s.label}>{T("fullname")}</label>
              <input style={{ ...s.input, marginBottom: 14 }} placeholder="Yohannes Belay"
                value={authName} onChange={(e) => setAuthName(e.target.value)} />
            </>
          )}

          <label style={s.label}>{T("email")}</label>
          <input style={{ ...s.input, marginBottom: 14 }} placeholder="name@gmail.com"
            type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} />

          <label style={s.label}>{T("password")}</label>
          <input style={{ ...s.input, marginBottom: 4 }} placeholder="••••••••"
            type="password" value={authPass}
            onChange={(e) => setAuthPass(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (isSU ? doSignup() : doLogin())} />

          {authErr && (
            <div style={{ fontSize: 12, color: C.red, marginTop: 10, padding: "8px 12px", background: `${C.red}15`, borderRadius: 10 }}>
              {authErr}
            </div>
          )}

          <button
            style={{
              background: C.green, color: "#fff", border: "none", borderRadius: 14,
              padding: "14px", fontSize: 15, width: "100%", cursor: "pointer",
              fontWeight: 700, marginTop: 16, marginBottom: 12, boxShadow: C.shadowGreen,
            }}
            onClick={isSU ? doSignup : doLogin}
            disabled={authLoading}
          >
            {authLoading ? "…" : isSU ? T("sign_up") : T("sign_in")}
          </button>

          <div style={{ textAlign: "center", fontSize: 12, color: C.textMuted }}>
            {isSU ? T("have_account") : T("no_account")}{" "}
            <span
              style={{ color: C.green, fontWeight: 700, cursor: "pointer" }}
              onClick={() => { setAuthErr(""); setScreen(isSU ? "login" : "signup"); }}
            >
              {isSU ? T("sign_in") : T("sign_up")}
            </span>
          </div>

          <div style={{ textAlign: "center", marginTop: 14 }}>
            <span style={{ fontSize: 11, color: C.textMuted, cursor: "pointer" }}
              onClick={() => onAuthSuccess({})}>
              {T("skip_now")}
            </span>
          </div>
        </div>
      )}

      {/* Lang + Theme toggles */}
      <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
        {(["en", "am", "or"] as const).map((c) => {
          const labels: Record<string, string> = { en: "🇬🇧 EN", am: "🇪🇹 አማ", or: "🟢 Oro" };
          return (
            <button key={c}
              style={{
                background: lang === c ? C.green : "transparent",
                color: lang === c ? "#fff" : C.text,
                border: `1.5px solid ${lang === c ? C.green : C.border}`,
                borderRadius: 10, padding: "5px 10px", cursor: "pointer",
                fontSize: 11, fontWeight: 600, outline: "none",
              }}
              onClick={onToggleLang}
            >{labels[c]}</button>
          );
        })}
        <button
          style={{
            background: "transparent", color: C.text,
            border: `1.5px solid ${C.border}`, borderRadius: 10,
            padding: "5px 10px", cursor: "pointer", fontSize: 12, outline: "none",
          }}
          onClick={onToggleTheme}
        >{isDark ? "☀️" : "🌙"}</button>
      </div>
    </div>
  );
}
