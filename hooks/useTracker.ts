"use client";

import { useState, useEffect } from "react";
import type { SleepLog, FoodItem } from "@/types";
import { lsGet, lsSet } from "./useLocalStorage";

const DEFAULT_SLEEP: SleepLog = {
  hours: 0,
  bedtime: "",
  wake: "",
  score: 0,
  logged: false,
};

export function useTracker(weightKg: string) {
  const weight = parseFloat(weightKg || "70");

  // ── Persisted state ──────────────────────────────────────────────────────
  const [steps,     setStepsRaw]   = useState(() => lsGet<number>("tn_steps",    0));
  const [calIn,     setCalInRaw]   = useState(() => lsGet<number>("tn_cal_in",   0));
  const [calBurned, setCalBurnRaw] = useState(() => lsGet<number>("tn_cal_burn", 0));
  const [water,     setWaterRaw]   = useState(() => lsGet<number>("tn_water",    0));
  const [foodLog,   setFoodLogRaw] = useState<FoodItem[]>(() => lsGet<FoodItem[]>("tn_foodlog", []));
  const [streak,    setStreakRaw]  = useState(() => lsGet<number>("tn_streak",   0));
  const [sleepLog,  setSleepRaw]  = useState<SleepLog>(() => lsGet<SleepLog>("tn_sleep", DEFAULT_SLEEP));
  const [lastReset, setLastReset] = useState(() => lsGet<string>("tn_last_reset", ""));

  // ── Daily reset ──────────────────────────────────────────────────────────
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    if (lastReset !== today) {
      setStepsRaw(0);   lsSet("tn_steps",    0);
      setCalInRaw(0);   lsSet("tn_cal_in",   0);
      setCalBurnRaw(0); lsSet("tn_cal_burn", 0);
      setWaterRaw(0);   lsSet("tn_water",    0);
      setFoodLogRaw([]); lsSet("tn_foodlog", []);
      setSleepRaw(DEFAULT_SLEEP); lsSet("tn_sleep", DEFAULT_SLEEP);
      lsSet("tn_last_reset", today);
      setLastReset(today);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Helpers ──────────────────────────────────────────────────────────────
  const recalcCalFromSteps = (s: number) =>
    parseFloat((s * 0.00075 * weight * 0.75).toFixed(1));

  // ── Setters with persistence ─────────────────────────────────────────────
  const setSteps = (v: number | ((p: number) => number)) => {
    setStepsRaw((prev) => {
      const next = typeof v === "function" ? v(prev) : v;
      lsSet("tn_steps", next);
      return next;
    });
  };

  const setCalIn = (v: number | ((p: number) => number)) => {
    setCalInRaw((prev) => {
      const next = typeof v === "function" ? v(prev) : v;
      lsSet("tn_cal_in", next);
      return next;
    });
  };

  const setCalBurn = (v: number | ((p: number) => number)) => {
    setCalBurnRaw((prev) => {
      const next = typeof v === "function" ? v(prev) : v;
      lsSet("tn_cal_burn", next);
      return next;
    });
  };

  const setWater = (v: number | ((p: number) => number)) => {
    setWaterRaw((prev) => {
      const next = typeof v === "function" ? v(prev) : v;
      lsSet("tn_water", next);
      return next;
    });
  };

  const setStreak = (v: number) => { lsSet("tn_streak", v); setStreakRaw(v); };

  const setSleepLog = (v: SleepLog) => { lsSet("tn_sleep", v); setSleepRaw(v); };

  const setFoodLog = (fn: FoodItem[] | ((prev: FoodItem[]) => FoodItem[])) => {
    setFoodLogRaw((prev) => {
      const next = typeof fn === "function" ? fn(prev) : fn;
      lsSet("tn_foodlog", next);
      return next;
    });
  };

  // ── Step actions ─────────────────────────────────────────────────────────
  const addStepsManual = (n: number) => {
    setSteps((s) => {
      const ns = s + n;
      setCalBurn(recalcCalFromSteps(ns));
      return ns;
    });
  };

  const addStepFromSensor = () => {
    setSteps((s) => {
      const ns = s + 1;
      lsSet("tn_steps", ns);
      return ns;
    });
    const cal = parseFloat((1 * 0.00075 * weight * 0.75).toFixed(4));
    setCalBurn((b) => {
      const next = parseFloat((b + cal).toFixed(2));
      lsSet("tn_cal_burn", next);
      return next;
    });
  };

  // ── Derived values ────────────────────────────────────────────────────────
  const waterGoal = 2.5;
  const stepsGoal = 10000;
  const netCal    = calIn - (calBurned | 0);

  return {
    steps, calIn, calBurned, water, foodLog, streak, sleepLog,
    setSteps, setCalIn, setCalBurn, setWater, setFoodLog, setStreak, setSleepLog,
    addStepsManual, addStepFromSensor, recalcCalFromSteps,
    waterGoal, stepsGoal, netCal,
  };
}
