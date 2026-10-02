"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import type { ColorTokens, Lang, Profile } from "@/types";
import { t } from "@/lib/i18n";
import { WORKOUT_PLANS, type WorkoutPlan } from "@/lib/workouts";

interface WorkoutScreenProps {
  profile: Profile;
  C: ColorTokens;
  lang: Lang;
}

type WorkoutState = "browse" | "active" | "complete";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function WorkoutScreen({ profile, C, lang }: WorkoutScreenProps) {
  const T = (key: string) => t(lang, key);

  // ── State ─────────────────────────────────────────────────────────────────
  const [state, setState] = useState<WorkoutState>("browse");
  const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Determine recommended plans based on user's health conditions ────────
  const userConditions = profile.conditions || [];
  const recommendedPlans = WORKOUT_PLANS.filter(
    (p) => p.targetConditions.length === 0 || p.targetConditions.some((c) => userConditions.includes(c))
  );
  const otherPlans = WORKOUT_PLANS.filter(
    (p) => p.targetConditions.length > 0 && !p.targetConditions.some((c) => userConditions.includes(c))
  );

  // ── Timer logic ───────────────────────────────────────────────────────────
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const moveToNext = useCallback(() => {
    if (!activePlan) return;
    const ex = activePlan.exercises[currentIdx];

    if (!isResting && ex.rest > 0) {
      // Move to rest period
      setIsResting(true);
      setTimeLeft(ex.rest);
    } else {
      // Move to next exercise
      const next = currentIdx + 1;
      if (next >= activePlan.exercises.length) {
        // Workout complete
        clearTimer();
        setState("complete");
        setCompletedCount((c) => c + 1);
      } else {
        setCurrentIdx(next);
        setIsResting(false);
        setTimeLeft(activePlan.exercises[next].duration);
      }
    }
  }, [activePlan, currentIdx, isResting, clearTimer]);

  useEffect(() => {
    if (state !== "active" || isPaused) {
      clearTimer();
      return;
    }

    timerRef.current = setInterval(() => {
      setTotalElapsed((t) => t + 1);
      setTimeLeft((prev) => {
        if (prev <= 1) {
          moveToNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [state, isPaused, moveToNext, clearTimer]);

  // ── Actions ───────────────────────────────────────────────────────────────
  const startWorkout = (plan: WorkoutPlan) => {
    setActivePlan(plan);
    setCurrentIdx(0);
    setIsResting(false);
    setIsPaused(false);
    setTimeLeft(plan.exercises[0].duration);
    setTotalElapsed(0);
    setState("active");
  };

  const skipExercise = () => {
    moveToNext();
  };

  const resetWorkout = () => {
    clearTimer();
    setState("browse");
    setActivePlan(null);
    setCurrentIdx(0);
    setIsPaused(false);
  };

  // ── Styles ────────────────────────────────────────────────────────────────
  const card: React.CSSProperties = {
    background: C.card, backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)", border: `1px solid ${C.cardBorder}`,
    borderRadius: 20, padding: "18px 20px", marginBottom: 12, boxShadow: C.shadow,
  };

  const btnStyle = (bg: string): React.CSSProperties => ({
    background: bg, color: "#fff", border: "none", borderRadius: 12,
    padding: "10px 20px", cursor: "pointer", fontSize: 13, fontWeight: 700,
    transition: "all 0.18s", outline: "none",
  });

  const outlineBtn: React.CSSProperties = {
    background: "transparent", color: C.text,
    border: `1.5px solid ${C.border}`, borderRadius: 12,
    padding: "8px 16px", cursor: "pointer", fontSize: 12, fontWeight: 600,
    transition: "all 0.18s", outline: "none",
  };

  const intensityColor = (i: string) =>
    i === "high" ? C.red : i === "moderate" ? C.gold : C.green;

  // ── BROWSE VIEW ───────────────────────────────────────────────────────────
  if (state === "browse") {
    return (
      <div style={{ padding: "18px 20px" }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: C.green, letterSpacing: "-0.03em", marginBottom: 4 }}>
          {T("workout_title")}
        </div>
        <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 18, fontWeight: 500 }}>
          {T("workout_subtitle")}
        </div>

        {/* Recommended for user */}
        {recommendedPlans.length > 0 && (
          <>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.green, marginBottom: 10 }}>
              {T("recommended_for_you")}
            </div>
            {recommendedPlans.map((plan) => (
              <div key={plan.id} style={{ ...card, border: `1.5px solid ${C.green}44` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: C.text, marginBottom: 3 }}>{plan.title}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.4 }}>{plan.subtitle}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: C.green }}>{plan.totalMinutes}</div>
                    <div style={{ fontSize: 9, color: C.textMuted, fontWeight: 600 }}>MIN</div>
                  </div>
                </div>
                {plan.targetConditions.length > 0 && (
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                    {plan.targetConditions.map((c) => (
                      <span key={c} style={{
                        fontSize: 9, fontWeight: 700,
                        background: userConditions.includes(c) ? `${C.green}22` : `${C.blue}18`,
                        color: userConditions.includes(c) ? C.green : C.blue,
                        borderRadius: 6, padding: "2px 8px",
                      }}>{c}</span>
                    ))}
                  </div>
                )}
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 12 }}>
                  {plan.exercises.slice(0, 4).map((ex, i) => (
                    <span key={i} style={{ fontSize: 9, color: C.textMuted, background: C.surfaceEl, borderRadius: 6, padding: "2px 8px" }}>
                      {ex.name}
                    </span>
                  ))}
                  {plan.exercises.length > 4 && (
                    <span style={{ fontSize: 9, color: C.textMuted }}>+{plan.exercises.length - 4} more</span>
                  )}
                </div>
                <button style={btnStyle(C.green)} onClick={() => startWorkout(plan)}>
                  {T("start_workout")}
                </button>
              </div>
            ))}
          </>
        )}

        {/* Other plans */}
        {otherPlans.length > 0 && (
          <>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: C.textMuted, marginBottom: 10, marginTop: 8 }}>
              {T("other_plans")}
            </div>
            {otherPlans.map((plan) => (
              <div key={plan.id} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{plan.title}</div>
                    <div style={{ fontSize: 10, color: C.textMuted }}>{plan.subtitle}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: C.textMuted }}>{plan.totalMinutes} min</div>
                </div>
                {plan.targetConditions.length > 0 && (
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                    {plan.targetConditions.map((c) => (
                      <span key={c} style={{ fontSize: 9, fontWeight: 700, background: `${C.blue}18`, color: C.blue, borderRadius: 6, padding: "2px 8px" }}>{c}</span>
                    ))}
                  </div>
                )}
                <button style={outlineBtn} onClick={() => startWorkout(plan)}>
                  {T("start_workout")}
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    );
  }

  // ── ACTIVE WORKOUT VIEW ───────────────────────────────────────────────────
  if (state === "active" && activePlan) {
    const currentEx = activePlan.exercises[currentIdx];
    const totalExercises = activePlan.exercises.length;
    const progress = ((currentIdx + (isResting ? 0.5 : 0)) / totalExercises) * 100;

    // Timer circle math
    const totalTime = isResting ? currentEx.rest : currentEx.duration;
    const pct = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (pct / 100) * circumference;

    return (
      <div style={{ padding: "18px 20px" }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <button style={{ ...outlineBtn, padding: "6px 12px", fontSize: 11 }} onClick={resetWorkout}>
            Back
          </button>
          <div style={{ fontSize: 12, fontWeight: 800, color: C.textMuted }}>
            {currentIdx + 1} / {totalExercises}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted }}>
            {formatTime(totalElapsed)}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, borderRadius: 2, background: C.border, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: C.green, borderRadius: 2, transition: "width 0.4s" }} />
        </div>

        {/* Phase label */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <span style={{
            fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase",
            color: isResting ? C.blue : C.green,
            background: isResting ? `${C.blue}18` : `${C.green}18`,
            borderRadius: 8, padding: "4px 14px",
          }}>
            {isResting ? T("rest_period") : T("exercise")}
          </span>
        </div>

        {/* Timer circle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <div style={{ position: "relative", width: 190, height: 190 }}>
            <svg width="190" height="190" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="95" cy="95" r={radius} fill="none" stroke={C.border} strokeWidth="8" />
              <circle cx="95" cy="95" r={radius} fill="none"
                stroke={isResting ? C.blue : C.green}
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 0.3s linear" }}
              />
            </svg>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ fontSize: 42, fontWeight: 900, color: isResting ? C.blue : C.green, letterSpacing: "-0.04em", lineHeight: 1 }}>
                {formatTime(timeLeft)}
              </div>
              <div style={{ fontSize: 10, color: C.textMuted, marginTop: 4, fontWeight: 600 }}>
                {isResting ? T("get_ready") : T("keep_going")}
              </div>
            </div>
          </div>
        </div>

        {/* Exercise name & info */}
        {!isResting && (
          <div style={{ ...card, textAlign: "center", border: `1.5px solid ${C.green}33` }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: C.text, marginBottom: 6 }}>{currentEx.name}</div>
            <div style={{ fontSize: 12, color: C.textSub, lineHeight: 1.5, marginBottom: 8 }}>{currentEx.description}</div>
            <span style={{
              fontSize: 10, fontWeight: 700,
              background: `${intensityColor(currentEx.intensity)}22`,
              color: intensityColor(currentEx.intensity),
              borderRadius: 6, padding: "3px 10px",
            }}>
              {currentEx.intensity.toUpperCase()} INTENSITY
            </span>
          </div>
        )}

        {isResting && currentIdx + 1 < totalExercises && (
          <div style={{ ...card, textAlign: "center", background: `${C.blue}08` }}>
            <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 600, marginBottom: 4 }}>{T("up_next")}</div>
            <div style={{ fontWeight: 800, fontSize: 15, color: C.text }}>{activePlan.exercises[currentIdx + 1].name}</div>
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>
              {formatTime(activePlan.exercises[currentIdx + 1].duration)}
            </div>
          </div>
        )}

        {/* Controls */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16 }}>
          <button style={btnStyle(isPaused ? C.green : C.gold)} onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? T("resume") : T("pause")}
          </button>
          <button style={outlineBtn} onClick={skipExercise}>
            {T("skip")}
          </button>
          <button style={{ ...outlineBtn, color: C.red, borderColor: C.red }} onClick={resetWorkout}>
            {T("quit")}
          </button>
        </div>

        {/* Exercise list preview */}
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
            {T("exercises")}
          </div>
          {activePlan.exercises.map((ex, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
              borderRadius: 12, marginBottom: 4,
              background: i === currentIdx ? `${C.green}15` : "transparent",
              opacity: i < currentIdx ? 0.4 : 1,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, flexShrink: 0,
                background: i < currentIdx ? C.green : i === currentIdx ? `${C.green}22` : C.surfaceEl,
                color: i < currentIdx ? "#fff" : i === currentIdx ? C.green : C.textMuted,
              }}>
                {i < currentIdx ? "✓" : i + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: i === currentIdx ? 700 : 500, color: C.text }}>{ex.name}</div>
              </div>
              <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 600, flexShrink: 0 }}>
                {formatTime(ex.duration)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── COMPLETE VIEW ─────────────────────────────────────────────────────────
  if (state === "complete" && activePlan) {
    return (
      <div style={{ padding: "18px 20px" }}>
        <div style={{ textAlign: "center", padding: "30px 0" }}>
          <div style={{
            width: 80, height: 80, borderRadius: 40, margin: "0 auto 20px",
            background: `linear-gradient(135deg,${C.green},${C.greenDark})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, fontWeight: 900, color: "#fff", boxShadow: C.shadowGreen,
          }}>
            Done
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: C.green, letterSpacing: "-0.04em", marginBottom: 8 }}>
            {T("workout_complete")}
          </div>
          <div style={{ fontSize: 13, color: C.textSub, marginBottom: 24 }}>
            {activePlan.title}
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
            {[
              { label: T("time"), value: formatTime(totalElapsed) },
              { label: T("exercises"), value: String(activePlan.exercises.length) },
              { label: T("workouts_done"), value: String(completedCount) },
            ].map((s) => (
              <div key={s.label} style={{ background: C.surfaceEl, border: `1px solid ${C.border}`, borderRadius: 16, padding: "14px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: C.green }}>{s.value}</div>
                <div style={{ fontSize: 9, color: C.textMuted, marginTop: 3, fontWeight: 600, letterSpacing: "0.04em" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button style={btnStyle(C.green)} onClick={() => startWorkout(activePlan)}>
              {T("repeat")}
            </button>
            <button style={outlineBtn} onClick={resetWorkout}>
              {T("browse_plans")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
