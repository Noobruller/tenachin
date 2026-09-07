"use client";

import { useState } from "react";
import type { Profile } from "@/types";
import { lsGet, lsSet } from "./useLocalStorage";

const DEFAULT_PROFILE: Profile = {
  fullName: "",
  email: "",
  age: "",
  sex: "Male",
  weight: "",
  height: "",
  religion: "None",
  budget: "",
  conditions: [],
  otherCondition: "",
};

export function useProfile() {
  const [profile, setProfileRaw] = useState<Profile>(() =>
    lsGet<Profile>("tn_profile", DEFAULT_PROFILE)
  );

  const setProfile = (updater: Profile | ((prev: Profile) => Profile)) => {
    setProfileRaw((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      lsSet("tn_profile", next);
      return next;
    });
  };

  const setPF = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setProfile((p) => ({ ...p, [key]: value }));
  };

  const toggleCond = (condition: string) => {
    setProfile((p) => ({
      ...p,
      conditions: p.conditions.includes(condition)
        ? p.conditions.filter((c) => c !== condition)
        : [...p.conditions, condition],
    }));
  };

  const bmi =
    profile.weight && profile.height
      ? (parseFloat(profile.weight) / parseFloat(profile.height) ** 2).toFixed(1)
      : null;

  const calorieGoal = (parseFloat(profile.weight || "70") * 30) | 0;

  return { profile, setProfile, setPF, toggleCond, bmi, calorieGoal };
}
