"use client";

import React, { useState } from "react";
import type { ColorTokens, FoodItem, Lang, Profile } from "@/types";
import { t } from "@/lib/i18n";
import { FOODS } from "@/lib/foods";
import { orChat } from "@/lib/openrouter";

interface FoodScreenProps {
  foodLog: FoodItem[];
  setFoodLog: (fn: FoodItem[] | ((prev: FoodItem[]) => FoodItem[])) => void;
  setCalIn: (v: number | ((p: number) => number)) => void;
  calorieGoal: number;
  profile: Profile;
  lang: Lang;
  C: ColorTokens;
}

type FilterKey = "all" | "fasting" | "breakfast" | "veg" | "meat" | "snack" | "drink";

export default function FoodScreen({
  foodLog, setFoodLog, setCalIn, calorieGoal, profile, lang, C,
}: FoodScreenProps) {
  const T = (key: string) => t(lang, key);

  const [foodFilter, setFoodFilter] = useState<FilterKey>("all");
  const [aiRec,      setAiRec]      = useState("");
  const [aiLoading,  setAiLoading]  = useState(false);

  const isFast = ["Christian-Orthodox", "Christian-Catholic"].includes(profile.religion);

  const filtered = foodFilter === "all"
    ? FOODS
    : foodFilter === "fasting"
    ? FOODS.filter((f) => f.fast)
    : FOODS.filter((f) => f.cat === foodFilter);

  const totalLogged = foodLog.reduce((s, f) => s + f.cal, 0);

  const FILTERS: [FilterKey, string][] = [
    ["all", T("filter_all")],
    ["fasting", T("filter_fasting")],
    ["breakfast", T("filter_breakfast")],
    ["veg", T("filter_veg")],
    ["meat", T("filter_meat")],
    ["snack", T("filter_snack")],
    ["drink", T("filter_drink")],
  ];

  const getFoodRec = async () => {
    setAiLoading(true); setAiRec("");
    try {
      const langName = lang === "en" ? "English" : lang === "am" ? "Amharic" : "Afaan Oromoo";
      const p = `Recommend a full Ethiopian day meal plan. BMI profile, Budget:${Math.round((parseFloat(profile.budget || "2000")) / 30)}ETB/day, Conditions:${profile.conditions.join(",") || "none"}, Sex:${profile.sex}, Age:${profile.age}. ${isFast ? "Fasting foods only (vegan)." : ""} List breakfast, lunch, dinner, snack with calories. 3-4 sentences. Respond in ${langName}.`;
      const r = await orChat("You are a concise Ethiopian nutritionist.", [{ role: "user", content: p }]);
      setAiRec(r);
    } catch (e) {
      setAiRec("Error: " + (e instanceof Error ? e.message : String(e)));
    }
    setAiLoading(false);
  };

  const card: React.CSSProperties = {
    background: C.card, backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)", border: `1px solid ${C.cardBorder}`,
    borderRadius: 20, padding: "18px 20px", marginBottom: 12, boxShadow: C.shadow,
  };

  const chip = (active: boolean): React.CSSProperties => ({
    background: active ? C.green : "transparent",
    color: active ? "#fff" : C.text,
    border: `1.5px solid ${active ? C.green : C.border}`,
    borderRadius: 20, padding: "6px 14px", cursor: "pointer",
    fontSize: 11, fontWeight: 600, transition: "all 0.18s",
    outline: "none", flexShrink: 0, whiteSpace: "nowrap",
  });

  return (
    <div style={{ padding: "18px 20px" }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: C.green, letterSpacing: "-0.03em", marginBottom: 4 }}>🍽️ {T("food_title")}</div>
      <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 16, fontWeight: 500 }}>{T("food_subtitle")}</div>

      {/* Today's log */}
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 800 }}>{T("todays_log")}</span>
          <span style={{ fontSize: 12, color: totalLogged > calorieGoal ? C.red : C.green, fontWeight: 800 }}>
            {totalLogged} / {calorieGoal} kcal
          </span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: C.border, overflow: "hidden", marginBottom: 8 }}>
          <div style={{ height: "100%", width: `${Math.min((totalLogged / calorieGoal) * 100, 100)}%`, background: totalLogged > calorieGoal ? C.red : C.green, borderRadius: 3, transition: "width 0.4s" }} />
        </div>
        {foodLog.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
            {foodLog.map((f, i) => (
              <span key={i} style={{ fontSize: 10, background: C.greenGlass, color: C.green, borderRadius: 8, padding: "3px 8px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 2 }}>
                {f.name} ({f.cal})
                <button style={{ border: "none", background: "none", color: C.red, cursor: "pointer", fontSize: 11, padding: "0 2px" }}
                  onClick={() => { setFoodLog((l) => l.filter((_, j) => j !== i)); setCalIn((c) => Math.max(0, (c as number) - f.cal)); }}>
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* AI Meal Plan */}
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 800 }}>🤖 {T("ai_meal_plan")}</span>
          <button style={{ background: C.green, color: "#fff", border: "none", borderRadius: 10, padding: "7px 14px", cursor: "pointer", fontSize: 11, fontWeight: 600 }}
            onClick={getFoodRec} disabled={aiLoading}>
            {aiLoading ? "…" : T("generate")}
          </button>
        </div>
        {aiRec ? (
          <div style={{ fontSize: 12, color: C.textSub, lineHeight: 1.65 }}>{aiRec}</div>
        ) : (
          <div style={{ fontSize: 11, color: C.textMuted }}>
            {T("budget_day")}: ~{Math.round((parseFloat(profile.budget || "2000")) / 30)} ETB · {isFast ? T("fasting_mode") : T("full_menu")}
          </div>
        )}
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 14, paddingBottom: 4 }}>
        {FILTERS.map(([v, l]) => (
          <button key={v} style={chip(foodFilter === v)} onClick={() => setFoodFilter(v)}>{l}</button>
        ))}
      </div>

      {/* Food list */}
      {filtered.map((f, i) => (
        <div key={i} style={{ ...card, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{f.name}</div>
            <div style={{ fontSize: 11, color: C.textMuted }}>{f.cal} kcal · {f.price}</div>
            {f.fast && <span style={{ fontSize: 10, background: `${C.green}22`, color: C.green, borderRadius: 6, padding: "2px 8px", fontWeight: 700 }}>{T("fasting_ok")}</span>}
          </div>
          <button style={{ background: C.green, color: "#fff", border: "none", borderRadius: 10, padding: "7px 14px", cursor: "pointer", fontSize: 11, fontWeight: 600 }}
            onClick={() => { setFoodLog((l) => [...l, f]); setCalIn((c) => (c as number) + f.cal); }}>
            + {T("log_food")}
          </button>
        </div>
      ))}
    </div>
  );
}
