"use client";

import React, { useState, useCallback } from "react";
import type { Lang, Profile, Screen, Tab, Theme } from "@/types";
import { TOKENS } from "@/lib/tokens";
import { t } from "@/lib/i18n";
import { lsGet, lsSet } from "@/hooks/useLocalStorage";
import { useProfile } from "@/hooks/useProfile";
import { useTracker } from "@/hooks/useTracker";
import { useMotionSensor } from "@/hooks/useMotionSensor";
import { useChat } from "@/hooks/useChat";

import Header              from "@/components/layout/Header";
import BottomNav           from "@/components/layout/BottomNav";
import AuthScreen          from "@/components/auth/AuthScreen";
import OnboardingScreen    from "@/components/onboarding/OnboardingScreen";
import HomeScreen          from "@/components/home/HomeScreen";
import TrackerScreen       from "@/components/tracker/TrackerScreen";
import FoodScreen          from "@/components/food/FoodScreen";
import CoachScreen         from "@/components/coach/CoachScreen";
import PremiumScreen       from "@/components/premium/PremiumScreen";
import EditProfileModal    from "@/components/ui/EditProfileModal";

const NAV_HEIGHT = 64;

export default function AppShell() {
  // ── Theme / Lang ───────────────────────────────────────────────────────────
  const [theme, setTheme] = useState<Theme>(() => lsGet<Theme>("tn_theme", "dark"));
  const [lang,  setLang]  = useState<Lang> (() => lsGet<Lang> ("tn_lang",  "en"));

  const C      = TOKENS[theme];
  const isDark = theme === "dark";
  const T      = (key: string) => t(lang, key);

  const setThemePersist = (v: Theme) => { lsSet("tn_theme", v); setTheme(v); };
  const setLangPersist  = (v: Lang)  => { lsSet("tn_lang",  v); setLang(v);  };
  const toggleLang  = () => setLangPersist(lang === "en" ? "am" : lang === "am" ? "or" : "en");
  const toggleTheme = () => setThemePersist(isDark ? "light" : "dark");

  // ── Navigation state ───────────────────────────────────────────────────────
  const [screen,         setScreen]         = useState<Screen>("login");
  const [tab,            setTab]            = useState<Tab>("onboarding");
  const [editingProfile, setEditingProfile] = useState(false);

  // ── Custom hooks ───────────────────────────────────────────────────────────
  const { profile, setProfile, setPF, toggleCond, bmi, calorieGoal } = useProfile();

  const tracker = useTracker(profile.weight);

  const { sensorAvail, sensorActive, startSensor, stopSensor } = useMotionSensor({
    onStep: tracker.addStepFromSensor,
  });

  const bmiNum = bmi ? parseFloat(bmi) : null;
  const bmiCat = !bmiNum ? null
    : bmiNum < 18.5 ? T("underweight")
    : bmiNum < 25   ? T("normal")
    : bmiNum < 30   ? T("overweight")
    : T("obese");

  const chat = useChat({ profile, bmi, bmiCat, lang });

  // ── Auth handlers ──────────────────────────────────────────────────────────
  const handleAuthSuccess = useCallback((partial: Partial<Profile>) => {
    if (Object.keys(partial).length > 0) {
      setProfile((p) => ({ ...p, ...partial }));
    }
    setScreen("app");
    setTab("onboarding");
  }, [setProfile]);

  const handleSignOut = useCallback(() => {
    setScreen("login");
    setTab("onboarding");
    setEditingProfile(false);
  }, []);

  // ── Global font + bg ──────────────────────────────────────────────────────
  const globalStyle = `
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; background: ${C.bg}; }
    @keyframes bounce {
      0%, 80%, 100% { transform: translateY(0); }
      40%           { transform: translateY(-6px); }
    }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 4px; }
    select option { background: ${C.surface}; color: ${C.text}; }
  `;

  const appStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: C.bg,
    color: C.text,
    fontFamily: "'DM Sans', system-ui, sans-serif",
    maxWidth: 480,
    margin: "0 auto",
    position: "relative",
    overflowX: "hidden",
  };

  // ── Auth screens ───────────────────────────────────────────────────────────
  if (screen === "login" || screen === "signup") {
    return (
      <>
        <style>{globalStyle}</style>
        <AuthScreen
          screen={screen}
          setScreen={setScreen}
          lang={lang}
          theme={theme}
          C={C}
          onToggleLang={toggleLang}
          onToggleTheme={toggleTheme}
          onAuthSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  // ── Edit profile overlay ───────────────────────────────────────────────────
  if (editingProfile) {
    return (
      <>
        <style>{globalStyle}</style>
        <div style={appStyle}>
          <EditProfileModal
            profile={profile}
            setPF={setPF}
            toggleCond={toggleCond}
            onClose={() => setEditingProfile(false)}
            onSignOut={handleSignOut}
            C={C}
            lang={lang}
          />
        </div>
      </>
    );
  }

  // ── Main app ───────────────────────────────────────────────────────────────
  const isCoach = tab === "coach";

  const contentStyle: React.CSSProperties = isCoach
    ? {
        position: "fixed",
        top: 0, bottom: NAV_HEIGHT,
        left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 480,
        display: "flex", flexDirection: "column",
        overflow: "hidden", background: C.bg,
      }
    : { paddingBottom: NAV_HEIGHT + 16 };

  return (
    <>
      <style>{globalStyle}</style>
      <div style={appStyle}>
        {isCoach ? (
          <div style={contentStyle}>
            <Header C={C} lang={lang} theme={theme}
              onToggleLang={toggleLang} onToggleTheme={toggleTheme}
              onEditProfile={() => setEditingProfile(true)} />
            <CoachScreen
              messages={chat.messages}
              chatIn={chat.chatIn}
              setChatIn={chat.setChatIn}
              chatLoad={chat.chatLoad}
              chatErr={chat.chatErr}
              chatEndRef={chat.chatEndRef}
              sendChat={chat.sendChat}
              C={C} lang={lang}
            />
          </div>
        ) : (
          <div>
            <Header C={C} lang={lang} theme={theme}
              onToggleLang={toggleLang} onToggleTheme={toggleTheme}
              onEditProfile={() => setEditingProfile(true)} />
            <div style={contentStyle}>
              {tab === "onboarding" && (
                <OnboardingScreen
                  profile={profile} setPF={setPF} toggleCond={toggleCond}
                  onComplete={() => setTab("home")}
                  C={C} lang={lang}
                />
              )}
              {tab === "home" && (
                <HomeScreen
                  profile={profile} bmi={bmi}
                  steps={tracker.steps} water={tracker.water}
                  netCal={tracker.netCal} sleepLog={tracker.sleepLog}
                  C={C} lang={lang}
                />
              )}
              {tab === "tracker" && (
                <TrackerScreen
                  steps={tracker.steps} calIn={tracker.calIn}
                  calBurned={tracker.calBurned} water={tracker.water}
                  streak={tracker.streak} sleepLog={tracker.sleepLog}
                  profile={profile}
                  recalcCalFromSteps={tracker.recalcCalFromSteps}
                  addStepsManual={tracker.addStepsManual}
                  setSteps={tracker.setSteps} setCalIn={tracker.setCalIn}
                  setCalBurn={tracker.setCalBurn} setWater={tracker.setWater}
                  setSleepLog={tracker.setSleepLog} setStreak={tracker.setStreak}
                  sensorAvail={sensorAvail} sensorActive={sensorActive}
                  startSensor={startSensor} stopSensor={stopSensor}
                  waterGoal={tracker.waterGoal} stepsGoal={tracker.stepsGoal}
                  calorieGoal={calorieGoal}
                  C={C} lang={lang}
                />
              )}
              {tab === "food" && (
                <FoodScreen
                  foodLog={tracker.foodLog} setFoodLog={tracker.setFoodLog}
                  setCalIn={tracker.setCalIn} calorieGoal={calorieGoal}
                  profile={profile} lang={lang} C={C}
                />
              )}
              {tab === "premium" && (
                <PremiumScreen C={C} lang={lang} />
              )}
            </div>
          </div>
        )}

        <BottomNav tab={tab} setTab={setTab} C={C} lang={lang} />
      </div>
    </>
  );
}
