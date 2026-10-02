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
  profile, setPF, onComplete, C, lang,
}: OnboardingScreenProps) {
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const T = (key: string) => t(lang, key);

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
    card: {
      background: C.card, backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)", border: `1px solid ${C.cardBorder}`,
      borderRadius: 20, padding: "20px 22px", marginBottom: 14, boxShadow: C.shadow,
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

  // Live BMI calculation
  const hNum = parseFloat(profile.height);
  const wNum = parseFloat(profile.weight);
  const liveBmi = (hNum > 0.5 && hNum < 2.5 && wNum > 20 && wNum < 300)
    ? (wNum / (hNum ** 2)).toFixed(1)
    : null;
  const liveBmiNum = liveBmi ? parseFloat(liveBmi) : null;
  const liveBmiCat = !liveBmiNum ? null
    : liveBmiNum < 18.5 ? T("underweight")
    : liveBmiNum < 25 ? T("normal")
    : liveBmiNum < 30 ? T("overweight")
    : T("obese");
  const liveBmiCol = !liveBmiCat ? C.green
    : liveBmiCat === T("normal") ? C.green
    : liveBmiCat === T("underweight") ? C.blue
    : liveBmiCat === T("overweight") ? C.gold
    : C.red;

  const handleNext = () => {
    if (!profile.age?.trim() || !profile.height?.trim() || !profile.weight?.trim()) {
      setErrorMsg(
        lang === "am"
          ? "እባክዎ ዕድሜ፣ ቁመት እና ክብደትዎን ያስገቡ"
          : lang === "or"
          ? "Maaloo umrii, dheerina fi ulfina keessan galchaa"
          : "Please enter your age, height, and weight to continue."
      );
      return;
    }
    const ageVal = parseInt(profile.age);
    if (isNaN(ageVal) || ageVal < 5 || ageVal > 120) {
      setErrorMsg(
        lang === "am"
          ? "እባክዎ ትክክለኛ ዕድሜ ያስገቡ (ከ5 እስከ 120)"
          : lang === "or"
          ? "Maaloo umrii sirrii galchaa (5 hanga 120)"
          : "Please enter a realistic age (5–120)."
      );
      return;
    }
    const hVal = parseFloat(profile.height);
    if (isNaN(hVal) || hVal < 0.6 || hVal > 2.5) {
      setErrorMsg(
        lang === "am"
          ? "እባክዎ ቁመትዎን በሜትር ያስገቡ (ለምሳሌ 1.72)"
          : lang === "or"
          ? "Maaloo dheerina meetiraan galchaa (fkn 1.72)"
          : "Please enter your height in meters (e.g. 1.72)."
      );
      return;
    }
    const wVal = parseFloat(profile.weight);
    if (isNaN(wVal) || wVal < 20 || wVal > 300) {
      setErrorMsg(
        lang === "am"
          ? "እባክዎ ክብደትዎን በኪሎ ያስገቡ (ለምሳሌ 70)"
          : lang === "or"
          ? "Maaloo ulfina kiiloon galchaa (fkn 70)"
          : "Please enter your weight in kg (e.g. 70)."
      );
      return;
    }
    setErrorMsg("");
    setStep(2);
  };

  const handleToggleCondition = (c: string) => {
    if (c === "None") {
      if (profile.conditions.includes("None")) {
        setPF("conditions", []);
      } else {
        setPF("conditions", ["None"]);
      }
    } else {
      const filtered = profile.conditions.filter((cond) => cond !== "None");
      if (filtered.includes(c)) {
        setPF("conditions", filtered.filter((cond) => cond !== c));
      } else {
        setPF("conditions", [...filtered, c]);
      }
    }
  };

  const handleFinish = () => {
    if (profile.conditions.includes("None")) {
      setPF("conditions", []);
    }
    onComplete();
  };

  const isNoneSelected = profile.conditions.includes("None") || profile.conditions.length === 0;

  return (
    <div style={{ padding: "20px 20px 40px", maxWidth: 480, margin: "0 auto" }}>
      {/* Progress indicator */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 8, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          <span>{step === 1 ? "Step 1 of 2: Physical Metrics" : "Step 2 of 2: Health & Conditions"}</span>
          <span>{step === 1 ? "50%" : "100%"}</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[1, 2].map((n) => (
            <div key={n} style={{
              flex: 1, height: 5, borderRadius: 3,
              background: n <= step ? C.green : C.border,
              transition: "background 0.3s ease",
            }} />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div>
          <div style={s.card}>
            <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 4, color: C.text, letterSpacing: "-0.02em" }}>
              {T("onb_personal_title")}
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 18, lineHeight: 1.4 }}>
              {T("onb_personal_sub")}
            </div>

            {/* Full Name & Email */}
            <div style={{ marginBottom: 14 }}>
              <label style={s.label}>{T("fullname")}</label>
              <input style={s.input} placeholder="Jon Doe" type="text"
                value={profile.fullName}
                onChange={(e) => setPF("fullName", e.target.value)} />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={s.label}>{T("email")}</label>
              <input style={s.input} placeholder="name@gmail.com" type="email"
                value={profile.email}
                onChange={(e) => setPF("email", e.target.value)} />
            </div>

            {/* Age & Sex Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              <div>
                <label style={s.label}>{T("age")} *</label>
                <input style={s.input} placeholder="25" type="number" min="5" max="120"
                  value={profile.age}
                  onChange={(e) => { setErrorMsg(""); setPF("age", e.target.value); }} />
              </div>
              <div>
                <label style={s.label}>{T("sex")}</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {(["Male", "Female"] as const).map((v) => (
                    <button key={v} type="button"
                      style={{ ...s.btn(profile.sex === v), flex: 1, padding: "12px 6px", fontSize: 12 }}
                      onClick={() => setPF("sex", v)}>
                      {v === "Male" ? T("male") : T("female")}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Height & Weight Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              <div>
                <label style={s.label}>{T("height_m")} *</label>
                <input style={s.input} placeholder="1.72" type="number" step="0.01" min="0.6" max="2.5"
                  value={profile.height}
                  onChange={(e) => { setErrorMsg(""); setPF("height", e.target.value); }} />
              </div>
              <div>
                <label style={s.label}>{T("weight_kg")} *</label>
                <input style={s.input} placeholder="70" type="number" step="0.5" min="20" max="300"
                  value={profile.weight}
                  onChange={(e) => { setErrorMsg(""); setPF("weight", e.target.value); }} />
              </div>
            </div>

            {/* Live BMI badge if height and weight are provided */}
            {liveBmi && (
              <div style={{
                background: `${liveBmiCol}14`, border: `1px solid ${liveBmiCol}40`,
                borderRadius: 12, padding: "10px 14px", marginBottom: 14,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: 12, color: C.textSub, fontWeight: 600 }}>Initial BMI:</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: liveBmiCol }}>
                  {liveBmi} kg/m² ({liveBmiCat})
                </span>
              </div>
            )}

            {/* Budget */}
            <div style={{ marginBottom: 6 }}>
              <label style={s.label}>{T("budget_mo")}</label>
              <input style={s.input} placeholder="3000" type="number"
                value={profile.budget}
                onChange={(e) => setPF("budget", e.target.value)} />
            </div>
          </div>

          {errorMsg && (
            <div style={{
              background: `${C.red}18`, border: `1px solid ${C.red}50`,
              color: C.red, borderRadius: 12, padding: "10px 14px",
              fontSize: 12, fontWeight: 600, marginBottom: 12,
            }}>
              {errorMsg}
            </div>
          )}

          <button style={s.primaryBtn} onClick={handleNext}>{T("next")}</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={s.card}>
            <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 4, color: C.text, letterSpacing: "-0.02em" }}>
              {T("onb_medical_title")}
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16, lineHeight: 1.4 }}>
              {T("onb_medical_sub")}
            </div>

            {/* "None / Healthy" button */}
            <div style={{ marginBottom: 12 }}>
              <button
                type="button"
                style={{
                  ...s.btn(isNoneSelected, C.green),
                  width: "100%", padding: "11px 16px",
                  borderRadius: 14, textAlign: "left",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}
                onClick={() => handleToggleCondition("None")}
              >
                <span>{T("none_healthy")}</span>
                <span style={{ fontSize: 14 }}>{isNoneSelected ? "✓" : "+"}</span>
              </button>
            </div>

            <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
              {T("select_conditions")}
            </div>

            {/* Condition chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {CONDITIONS.map((c) => {
                const active = profile.conditions.includes(c);
                return (
                  <button key={c} type="button"
                    style={{
                      ...s.btn(active, C.green),
                      fontSize: 12, padding: "8px 14px", borderRadius: 20,
                      boxShadow: active ? C.shadowGreen : "none",
                    }}
                    onClick={() => handleToggleCondition(c)}>
                    {active ? `✓ ${c}` : c}
                  </button>
                );
              })}
            </div>

            {/* Other conditions */}
            <label style={s.label}>{T("other_condition")}</label>
            <textarea style={{ ...s.input, resize: "vertical", minHeight: 70 }}
              placeholder={T("type_here")}
              value={profile.otherCondition}
              onChange={(e) => setPF("otherCondition", e.target.value)} />
          </div>

          <button style={s.primaryBtn} onClick={handleFinish}>{T("start_journey")}</button>
          <button style={{ ...s.btn(false), width: "100%", padding: "12px", fontSize: 13 }}
            onClick={() => setStep(1)}>{T("back")}</button>
        </div>
      )}
    </div>
  );
}
