"use client";

import React, { useState } from "react";
import type { ColorTokens, Lang, Profile } from "@/types";
import { t } from "@/lib/i18n";
import { CONDITIONS } from "@/lib/foods";

interface OnboardingScreenProps {
  profile: Profile;
  setPF: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
  toggleCond: (c: string) => void;
  onComplete: () => void;
  C: ColorTokens;
  lang: Lang;
}

export default function OnboardingScreen({
  profile, setPF, toggleCond, onComplete, C, lang,
}: OnboardingScreenProps) {
  const [step, setStep] = useState(1);
  const T = (key: string) => t(lang, key);

  const s = {
    input: {
      background: C.surfaceEl, border: `1.5px solid ${C.border}`,
      borderRadius: 12, padding: "12px 16px", color: C.text,
      fontSize: 14, width: "100%", boxSizing: "border-box" as const,
      outline: "none", fontFamily: "inherit",
    },
    label: {
      fontSize: 11, color: C.textMuted, fontWeight: 700,
      textTransform: "uppercase" as const, letterSpacing: "0.07em",
      marginBottom: 6, display: "block",
    },
    card: {
      background: C.card, backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)", border: `1px solid ${C.cardBorder}`,
      borderRadius: 20, padding: "18px 20px", marginBottom: 12, boxShadow: C.shadow,
    },
    btn: (active: boolean, col?: string): React.CSSProperties => ({
      background: active ? (col ?? C.green) : "transparent",
      color: active ? "#fff" : C.text,
      border: `1.5px solid ${active ? (col ?? C.green) : C.border}`,
      borderRadius: 12, padding: "10px 18px", cursor: "pointer",
      fontSize: 13, fontWeight: 600, transition: "all 0.18s", outline: "none",
    }),
    primaryBtn: {
      background: C.green, color: "#fff", border: "none",
      borderRadius: 16, padding: "15px", fontSize: 15,
      width: "100%", cursor: "pointer", fontWeight: 700,
      boxShadow: C.shadowGreen, marginBottom: 10,
    } as React.CSSProperties,
  };

  return (
    <div style={{ padding: "20px 20px 100px" }}>
      {/* Progress indicator */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
        {[1, 2].map((n) => (
          <div key={n} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: n <= step ? C.green : C.border,
            transition: "background 0.3s",
          }} />
        ))}
      </div>

      {step === 1 && (
        <div>
          <div style={s.card}>
            <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 20, color: C.green }}>
              🌿 {T("onb_personal_title")}
            </div>
            {[
              ["fullName", T("fullname"), "Yohannes Belay", "text"] as const,
              ["email",    T("email"),    "name@gmail.com", "email"] as const,
              ["age",      T("age"),      "25",             "number"] as const,
              ["weight",   T("weight_kg"),"70",             "number"] as const,
              ["height",   T("height_m"), "1.72",           "number"] as const,
              ["budget",   T("budget_mo"),"3000",           "number"] as const,
            ].map(([k, lbl, ph, type]) => (
              <div key={k} style={{ marginBottom: 14 }}>
                <label style={s.label}>{lbl}</label>
                <input style={s.input} placeholder={ph} type={type}
                  value={profile[k as keyof Profile] as string}
                  step={k === "height" ? "0.01" : undefined}
                  onChange={(e) => setPF(k as keyof Profile, e.target.value as Profile[typeof k])} />
              </div>
            ))}

            {/* Sex */}
            <div style={{ marginBottom: 14 }}>
              <label style={s.label}>{T("sex")}</label>
              <div style={{ display: "flex", gap: 8 }}>
                {(["Male", "Female"] as const).map((v) => (
                  <button key={v} style={{ ...s.btn(profile.sex === v), flex: 1 }}
                    onClick={() => setPF("sex", v)}>
                    {v === "Male" ? T("male") : T("female")}
                  </button>
                ))}
              </div>
            </div>

            {/* Religion */}
            <div>
              <label style={s.label}>{T("religion")}</label>
              <select style={s.input} value={profile.religion}
                onChange={(e) => setPF("religion", e.target.value)}>
                {["Christian-Orthodox","Christian-Catholic","Christian-Protestant","Muslim","None"]
                  .map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <button style={s.primaryBtn} onClick={() => setStep(2)}>{T("next")}</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={s.card}>
            <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12, color: C.green }}>
              ❤️ {T("onb_medical_title")}
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>{T("select_conditions")}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
              {CONDITIONS.map((c) => (
                <button key={c}
                  style={{ ...s.btn(profile.conditions.includes(c)), fontSize: 11, padding: "6px 12px", borderRadius: 20 }}
                  onClick={() => toggleCond(c)}>
                  {c}
                </button>
              ))}
            </div>
            <label style={s.label}>{T("other_condition")}</label>
            <textarea style={{ ...s.input, resize: "vertical", minHeight: 64 }}
              placeholder={T("type_here")}
              value={profile.otherCondition}
              onChange={(e) => setPF("otherCondition", e.target.value)} />
          </div>
          <button style={s.primaryBtn} onClick={onComplete}>{T("start_journey")}</button>
          <button style={{ ...s.btn(false), width: "100%", padding: "12px", fontSize: 13 }}
            onClick={() => setStep(1)}>{T("back")}</button>
        </div>
      )}
    </div>
  );
}
