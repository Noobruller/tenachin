"use client";

import React from "react";
import type { ColorTokens, Lang, Profile, SleepLog } from "@/types";
import { t } from "@/lib/i18n";

interface HomeScreenProps {
  profile: Profile;
  bmi: string | null;
  steps: number;
  water: number;
  netCal: number;
  sleepLog: SleepLog;
  C: ColorTokens;
  lang: Lang;
}

export default function HomeScreen({
  profile, bmi, steps, water, netCal, sleepLog, C, lang,
}: HomeScreenProps) {
  const T = (key: string) => t(lang, key);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return T("good_morning");
    if (h < 17) return T("good_afternoon");
    return T("good_evening");
  };

  const bmiNum = bmi ? parseFloat(bmi) : null;
  const bmiCat = !bmiNum
    ? null
    : bmiNum < 18.5 ? T("underweight")
    : bmiNum < 25   ? T("normal")
    : bmiNum < 30   ? T("overweight")
    : T("obese");

  const bmiColor = !bmiCat
    ? C.green
    : bmiCat === T("normal") ? C.green
    : bmiCat === T("underweight") ? C.blue
    : bmiCat === T("overweight") ? C.gold
    : C.red;

  const TIPS = [
    { i: "🚶", en: "Aim for 10,000 steps. A 15-min post-meal walk helps digestion.", am: "10,000 ደረጃዎችን ያለፉ። ከምግብ 15 ደቂቃ መሄድ ምግብ መፈጨትን ያሻሽላል።", or: "Tarkaanfii 10,000 gahi. Booda nyaataa daqiiqaa 15 deemi." },
    { i: "💧", en: "Drink 2.5L daily. Add lemon to your morning buna.", am: "2.5 ሊትር ይጠጡ። ለጠዋት ቡና ውሃ ሎሚ ይጨምሩ።", or: "Lolaa 2.5 dhugu. Buna ganamaa limuu itti dabalaa." },
    { i: "😴", en: "7-9 hrs optimal. Consistent sleep times boost immunity.", am: "7-9 ሰዓት ተኛ። ቀጣይ የእንቅልፍ ሰዓት ያሻሽላሉ።", or: "Sa'aa 7-9 rafi. Yeroon hirribaa wal-fakkaatan dhukkuba ittisa." },
    { i: "🥗", en: "Ethiopian fasting foods (gomen, azifa) are nutrient powerhouses.", am: "ጎመን፣ አዚፋ ወይም ሚሰር ሸሮ ልዩ ንጥረ ነገሮች ምንጭ ናቸው።", or: "Nyaata sooma (gomen, azifa) nyaataan guutuu dha." },
  ];

  const dateStr = new Date().toLocaleDateString(
    lang === "en" ? "en-ET" : lang === "am" ? "am-ET" : "om-ET",
    { weekday: "long", month: "long", day: "numeric" }
  );

  const card: React.CSSProperties = {
    background: C.card,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: `1px solid ${C.cardBorder}`,
    borderRadius: 20,
    padding: "18px 20px",
    marginBottom: 12,
    boxShadow: C.shadow,
  };

  return (
    <div style={{ padding: "20px 20px 8px" }}>
      {/* Greeting */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: C.text, letterSpacing: "-0.03em" }}>
          {greeting()}{profile.fullName ? `, ${profile.fullName.split(" ")[0]}` : ""} 👋
        </div>
        <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4, fontWeight: 500 }}>{dateStr}</div>
      </div>

      {/* Quick stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 16 }}>
        {[
          { i: "👣", v: steps >= 1000 ? `${(steps / 1000).toFixed(1)}k` : String(steps), l: T("steps_label"), c: C.green },
          { i: "💧", v: `${water.toFixed(1)}L`, l: T("water_label"), c: C.blue },
          { i: "🔥", v: String(netCal), l: T("cal_label"), c: C.gold },
          { i: "😴", v: sleepLog.logged ? `${sleepLog.hours.toFixed(1)}h` : "—", l: T("sleep_label"), c: C.indigo },
        ].map((q) => (
          <div key={q.l} style={{ background: C.surfaceEl, border: `1px solid ${C.border}`, borderRadius: 16, padding: "12px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{q.i}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: q.c, letterSpacing: "-0.02em", lineHeight: 1 }}>{q.v}</div>
            <div style={{ fontSize: 9, color: C.textMuted, marginTop: 3, fontWeight: 600, letterSpacing: "0.04em" }}>{q.l}</div>
          </div>
        ))}
      </div>

      {/* BMI card */}
      {bmi && bmiNum && (
        <div style={{ ...card, background: `linear-gradient(135deg,${C.surface},${C.surfaceEl})`, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontWeight: 800, fontSize: 13 }}>{T("bmi_title")}</span>
            <span style={{
              fontSize: 11, background: `${bmiColor}22`, color: bmiColor,
              borderRadius: 6, padding: "4px 12px", fontWeight: 700,
            }}>{bmiCat}</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 10 }}>
            <span style={{ fontSize: 36, fontWeight: 900, color: bmiColor, letterSpacing: "-0.04em", lineHeight: 1 }}>{bmi}</span>
            <span style={{ fontSize: 12, color: C.textMuted, fontWeight: 600 }}>kg/m²</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: C.border, overflow: "hidden" }}>
            <div style={{ height: "100%", width: "100%", background: "linear-gradient(90deg,#5B9CF6 0%,#2ECC71 40%,#F4B942 70%,#FF5C5C 100%)", borderRadius: 4, position: "relative" }}>
              <div style={{
                position: "absolute", top: -4,
                left: `${Math.min(Math.max((bmiNum - 10) / 30 * 100, 0), 100)}%`,
                width: 16, height: 16, background: C.surface,
                border: `2.5px solid ${bmiColor}`, borderRadius: "50%",
                transform: "translateX(-50%)", boxShadow: `0 2px 8px ${bmiColor}55`,
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Daily tips */}
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.textMuted, marginBottom: 10, marginTop: 4 }}>
        {T("daily_tips")}
      </div>
      {TIPS.map((tip, i) => (
        <div key={i} style={{ ...card, display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{ fontSize: 26, flexShrink: 0, lineHeight: 1, marginTop: 2 }}>{tip.i}</div>
          <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.55 }}>
            {lang === "am" ? tip.am : lang === "or" ? tip.or : tip.en}
          </div>
        </div>
      ))}
    </div>
  );
}
