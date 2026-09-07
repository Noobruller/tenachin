"use client";

import React, { useState } from "react";
import type { ColorTokens, Lang, Profile, SleepLog } from "@/types";
import { t } from "@/lib/i18n";
import ProgressRing from "@/components/home/ProgressRing";
import NInput from "@/components/ui/NInput";

interface TrackerScreenProps {
  steps: number;
  calIn: number;
  calBurned: number;
  water: number;
  streak: number;
  sleepLog: SleepLog;
  profile: Profile;
  recalcCalFromSteps: (s: number) => number;
  addStepsManual: (n: number) => void;
  setSteps: (v: number | ((p: number) => number)) => void;
  setCalIn: (v: number | ((p: number) => number)) => void;
  setCalBurn: (v: number | ((p: number) => number)) => void;
  setWater: (v: number | ((p: number) => number)) => void;
  setSleepLog: (v: SleepLog) => void;
  setStreak: (v: number) => void;
  sensorAvail: boolean;
  sensorActive: boolean;
  startSensor: () => void;
  stopSensor: () => void;
  waterGoal: number;
  stepsGoal: number;
  calorieGoal: number;
  C: ColorTokens;
  lang: Lang;
}

export default function TrackerScreen({
  steps, calIn, calBurned, water, streak, sleepLog, profile,
  recalcCalFromSteps, addStepsManual, setSteps, setCalIn, setCalBurn,
  setWater, setSleepLog, setStreak,
  sensorAvail, sensorActive, startSensor, stopSensor,
  waterGoal, stepsGoal, calorieGoal, C, lang,
}: TrackerScreenProps) {
  const T = (key: string) => t(lang, key);

  const [stepIn,    setStepIn]    = useState("");
  const [calInIn,   setCalInIn]   = useState("");
  const [calBurnIn, setCalBurnIn] = useState("");
  const [waterIn,   setWaterIn]   = useState("");
  const [sleepHr,   setSleepHr]   = useState("");
  const [sleepBed,  setSleepBed]  = useState("");
  const [sleepWk,   setSleepWk]   = useState("");
  const [sleepTimerOn,    setSleepTimerOn]    = useState(false);
  const [sleepTimerStart, setSleepTimerStart] = useState<number | null>(null);

  const waterPct = Math.min((water / waterGoal) * 100, 100);
  const stepsPct = Math.min((steps / stepsGoal) * 100, 100);
  const calPct   = Math.min((calIn / calorieGoal) * 100, 100);
  const netCal   = calIn - (calBurned | 0);

  const card: React.CSSProperties = {
    background: C.card, backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)", border: `1px solid ${C.cardBorder}`,
    borderRadius: 20, padding: "18px 20px", marginBottom: 12, boxShadow: C.shadow,
  };

  const btn = (active: boolean, col?: string): React.CSSProperties => ({
    background: active ? (col ?? C.green) : "transparent",
    color: active ? "#fff" : C.text,
    border: `1.5px solid ${active ? (col ?? C.green) : C.border}`,
    borderRadius: 12, padding: "10px 18px", cursor: "pointer",
    fontSize: 13, fontWeight: 600, transition: "all 0.18s", outline: "none",
  });

  const logSleep = () => {
    const h = parseFloat(sleepHr);
    if (isNaN(h) || h <= 0) return;
    const score = Math.min(100, Math.round((h / 8) * 100));
    setSleepLog({ hours: h, bedtime: sleepBed || "—", wake: sleepWk || "—", score, logged: true });
    setSleepHr(""); setSleepBed(""); setSleepWk("");
    setStreak(streak + 1);
  };

  const startTimer = () => {
    setSleepTimerOn(true);
    setSleepTimerStart(Date.now());
    setSleepBed(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  };

  const stopTimer = () => {
    if (!sleepTimerStart) return;
    const h = parseFloat(((Date.now() - sleepTimerStart) / 3600000).toFixed(2));
    const score = Math.min(100, Math.round((h / 8) * 100));
    setSleepLog({ hours: h, bedtime: sleepBed, wake: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), score, logged: true });
    setSleepTimerOn(false); setSleepTimerStart(null);
    setStreak(streak + 1);
  };

  const logStepInput = () => {
    const n = parseInt(stepIn);
    if (isNaN(n) || n <= 0) return;
    addStepsManual(n); setStepIn("");
  };

  return (
    <div style={{ padding: "18px 20px" }}>
      {/* Title */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: C.green, letterSpacing: "-0.03em" }}>{T("tracker_title")}</div>
        <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, background: C.surfaceEl, borderRadius: 8, padding: "4px 10px" }}>
          🔥 {streak} {T("day_streak")}
        </div>
      </div>

      {/* ── Sleep ─────────────────────────────────────────────────────────── */}
      <div style={card}>
        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 14, color: C.indigo, display: "flex", alignItems: "center", gap: 6 }}>
          <span>🌙</span>{T("sleep_tracker")}
        </div>
        {sleepLog.logged ? (
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <ProgressRing pct={sleepLog.score} size={76} stroke={7} color={C.indigo} bg={C.border}>
              <span style={{ fontSize: 16, fontWeight: 900, color: C.indigo, lineHeight: 1 }}>{sleepLog.score}</span>
              <span style={{ fontSize: 9, color: C.textMuted }}>/100</span>
            </ProgressRing>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800 }}>✓ {sleepLog.hours.toFixed(1)}h</div>
              {sleepLog.bedtime !== "—" && <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{sleepLog.bedtime} → {sleepLog.wake}</div>}
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4, fontStyle: "italic" }}>
                {sleepLog.score >= 85 ? "Excellent sleep! 🎉" : sleepLog.score >= 65 ? "Good sleep 👍" : "Aim for 7-8 hrs"}
              </div>
              <button style={{ ...btn(false), fontSize: 10, padding: "4px 10px", marginTop: 8, borderRadius: 8 }}
                onClick={() => setSleepLog({ hours: 0, bedtime: "", wake: "", score: 0, logged: false })}>
                {T("sleep_reset")}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <button style={{ ...btn(!sleepTimerOn), flex: 1, background: sleepTimerOn ? `${C.indigo}18` : "transparent", color: sleepTimerOn ? C.indigo : C.text, borderColor: sleepTimerOn ? C.indigo : C.border }}
                onClick={startTimer} disabled={sleepTimerOn}>😴 {T("start_sleep")}</button>
              <button style={{ ...btn(sleepTimerOn, C.indigo), flex: 1, border: "none" }}
                onClick={stopTimer} disabled={!sleepTimerOn}>☀️ {T("wake_up")}</button>
            </div>
            {sleepTimerOn && <div style={{ fontSize: 11, color: C.indigo, textAlign: "center", marginBottom: 10, fontWeight: 600 }}>⏱ {T("timer_running")}</div>}
            <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 8, fontWeight: 600 }}>{T("log_manual")}:</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
              <div>
                <label style={{ fontSize: 9, color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4, display: "block" }}>{T("bedtime")}</label>
                <input style={{ background: C.surfaceEl, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "8px 12px", color: C.text, fontSize: 12, width: "100%", boxSizing: "border-box", outline: "none" }}
                  type="time" value={sleepBed} onChange={(e) => setSleepBed(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 9, color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4, display: "block" }}>{T("wake_time")}</label>
                <input style={{ background: C.surfaceEl, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "8px 12px", color: C.text, fontSize: 12, width: "100%", boxSizing: "border-box", outline: "none" }}
                  type="time" value={sleepWk} onChange={(e) => setSleepWk(e.target.value)} />
              </div>
            </div>
            <NInput val={sleepHr} onChange={setSleepHr} onSubmit={logSleep}
              placeholder={T("hours_slept")} btnLabel={T("log_sleep")} btnColor={C.indigo} C={C} />
          </div>
        )}
      </div>

      {/* ── Steps ─────────────────────────────────────────────────────────── */}
      <div style={card}>
        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 14, color: C.green, display: "flex", alignItems: "center", gap: 6 }}>
          <span>👣</span>{T("step_counter")}
          {sensorActive && <span style={{ fontSize: 9, background: `${C.green}22`, color: C.green, borderRadius: 6, padding: "2px 8px", fontWeight: 700, marginLeft: "auto" }}>● LIVE</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
          <ProgressRing pct={stepsPct} size={76} stroke={7} color={C.green} bg={C.border}>
            <span style={{ fontSize: 15, fontWeight: 900, color: C.green, lineHeight: 1 }}>{Math.round(stepsPct)}%</span>
          </ProgressRing>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: C.text, letterSpacing: "-0.04em", lineHeight: 1 }}>{steps.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>/ {stepsGoal.toLocaleString()} · ~{(steps * 0.00076).toFixed(1)} km</div>
            <div style={{ fontSize: 11, color: C.gold, marginTop: 2, fontWeight: 600 }}>≈ {recalcCalFromSteps(steps)} kcal burned</div>
          </div>
        </div>
        {sensorAvail && (
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <button style={{ ...btn(!sensorActive, C.green), flex: 1, fontSize: 12 }} onClick={startSensor} disabled={sensorActive}>
              📱 {T("auto_tracking")}
            </button>
            {sensorActive && <button style={{ ...btn(false), fontSize: 12, color: C.red, borderColor: C.red, padding: "8px 14px" }} onClick={stopSensor}>■ Stop</button>}
          </div>
        )}
        <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, marginBottom: 6 }}>{T("manual_steps")}:</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
          {[500, 1000, 2000, 5000].map((n) => (
            <button key={n} style={{ ...btn(false), fontSize: 11, padding: "7px 12px", borderRadius: 10 }} onClick={() => addStepsManual(n)}>
              +{n >= 1000 ? `${n / 1000}k` : n}
            </button>
          ))}
          <button style={{ ...btn(false), fontSize: 11, padding: "7px 12px", borderRadius: 10, color: C.red, borderColor: C.red }}
            onClick={() => { const ns = Math.max(0, steps - 1000); setSteps(ns); setCalBurn(recalcCalFromSteps(ns)); }}>-1k</button>
        </div>
        <NInput val={stepIn} onChange={setStepIn} onSubmit={logStepInput} placeholder={T("step_counter")} btnLabel={T("add")} C={C} />
        {steps >= stepsGoal && <div style={{ marginTop: 10, textAlign: "center", fontSize: 13, color: C.green, fontWeight: 800 }}>{T("step_goal_hit")}</div>}
      </div>

      {/* ── Calories ──────────────────────────────────────────────────────── */}
      <div style={card}>
        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 14, color: C.gold, display: "flex", alignItems: "center", gap: 6 }}>
          <span>🔥</span>{T("cal_tracker")}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
          <ProgressRing pct={calPct} size={76} stroke={7} color={C.gold} bg={C.border}>
            <span style={{ fontSize: 15, fontWeight: 900, color: C.gold, lineHeight: 1 }}>{Math.round(calPct)}%</span>
          </ProgressRing>
          <div style={{ flex: 1 }}>
            {[[T("consumed"), `${calIn} kcal`, C.gold], [T("burned"), `${Math.round(calBurned)} kcal`, C.green]].map(([lbl, val, col]) => (
              <div key={lbl} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: C.textMuted }}>{lbl}</span><span style={{ color: col, fontWeight: 800 }}>{val}</span>
              </div>
            ))}
            <div style={{ height: 1, background: C.border, marginBottom: 4 }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: C.textMuted, fontWeight: 700 }}>{T("net")}</span>
              <span style={{ color: netCal <= calorieGoal ? C.green : C.red, fontWeight: 900 }}>{netCal} / {calorieGoal}</span>
            </div>
          </div>
        </div>
        <div style={{ background: C.surfaceEl, borderRadius: 10, padding: "8px 12px", marginBottom: 10, fontSize: 11, color: C.green, fontWeight: 600 }}>
          {recalcCalFromSteps(steps)} kcal auto-calculated from {steps.toLocaleString()} steps
        </div>
        <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, marginBottom: 6 }}>{T("log_consumed")}:</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
          {[100, 200, 300, 500].map((n) => (
            <button key={n} style={{ ...btn(false), fontSize: 11, padding: "7px 10px", borderRadius: 10 }} onClick={() => setCalIn((c) => (c as number) + n)}>+{n}</button>
          ))}
        </div>
        <NInput val={calInIn} onChange={setCalInIn}
          onSubmit={() => { const n = parseInt(calInIn); if (!isNaN(n) && n > 0) { setCalIn((c) => (c as number) + n); setCalInIn(""); } }}
          placeholder="kcal" btnLabel={T("add")} btnColor={C.gold} C={C} />
        <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, marginBottom: 6, marginTop: 12 }}>{T("log_burned")}:</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
          {[50, 100, 200, 300].map((n) => (
            <button key={n} style={{ ...btn(false), fontSize: 11, padding: "7px 10px", borderRadius: 10, color: C.green, borderColor: C.green }} onClick={() => setCalBurn((c) => (c as number) + n)}>+{n}</button>
          ))}
        </div>
        <NInput val={calBurnIn} onChange={setCalBurnIn}
          onSubmit={() => { const n = parseInt(calBurnIn); if (!isNaN(n) && n > 0) { setCalBurn((c) => (c as number) + n); setCalBurnIn(""); } }}
          placeholder="kcal" btnLabel={T("add")} btnColor={C.green} C={C} />
        <button style={{ ...btn(false), fontSize: 10, padding: "5px 12px", marginTop: 10, color: C.red, borderColor: C.red, borderRadius: 10 }}
          onClick={() => { setCalIn(0); setCalBurn(recalcCalFromSteps(steps)); }}>{T("reset_cal")}</button>
      </div>

      {/* ── Water ─────────────────────────────────────────────────────────── */}
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontWeight: 800, fontSize: 14, color: C.blue }}>💧 {T("water_tracker")}</span>
          <span style={{ fontSize: 12, fontWeight: 800, color: C.blue }}>{water.toFixed(1)}L / {waterGoal}L</span>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 12 }}>
          <ProgressRing pct={waterPct} size={76} stroke={7} color={C.blue} bg={C.border}>
            <span style={{ fontSize: 15, fontWeight: 900, color: C.blue, lineHeight: 1 }}>{Math.round(waterPct)}%</span>
          </ProgressRing>
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {[100, 250, 500, 750].map((ml) => (
              <button key={ml} style={{ ...btn(false), fontSize: 11, padding: "8px 4px", textAlign: "center", color: C.blue, borderColor: C.blue }}
                onClick={() => setWater((w) => Math.min(parseFloat(((w as number) + ml / 1000).toFixed(2)), waterGoal))}>
                +{ml}ml
              </button>
            ))}
          </div>
        </div>
        <NInput val={waterIn} onChange={setWaterIn}
          onSubmit={() => { const n = parseFloat(waterIn); if (!isNaN(n) && n > 0) { setWater((w) => Math.min(parseFloat(((w as number) + n).toFixed(2)), waterGoal)); setWaterIn(""); } }}
          placeholder="Litres (e.g. 0.5)" btnLabel={T("add")} btnColor={C.blue} C={C} />
        {water >= waterGoal && <div style={{ marginTop: 10, textAlign: "center", fontSize: 13, color: C.blue, fontWeight: 800 }}>{T("water_goal_hit")}</div>}
        <button style={{ ...btn(false), fontSize: 10, padding: "5px 12px", marginTop: 8, color: C.red, borderColor: C.red, borderRadius: 10 }} onClick={() => setWater(0)}>{T("reset")}</button>
      </div>

      {/* ── NCD Monitor ───────────────────────────────────────────────────── */}
      {profile.conditions.length > 0 && (
        <div style={{ ...card, border: `1px solid ${C.gold}44`, background: C.bg === "#080D09" ? "#1a1500" : "#fffbeb" }}>
          <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 10, color: C.gold }}>❤️ {T("ncd_title")}</div>
          {profile.conditions.map((c) => (
            <div key={c} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 600 }}>{c}</span>
              <span style={{ fontSize: 10, color: C.textMuted, marginLeft: "auto", fontStyle: "italic" }}>
                {c === "Hypertension" ? "↓ Limit salt" : c === "Type 2 Diabetes" ? "↓ Monitor carbs" : c === "Obesity" ? `BMI tracked` : "Track daily"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
