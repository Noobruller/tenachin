"use client";

import React, { useState, useEffect, useCallback } from "react";
import type { Lang, Profile, Screen, Tab, Theme } from "@/types";
import { TOKENS } from "@/lib/tokens";
import { t } from "@/lib/i18n";
import { lsGet, lsSet } from "@/hooks/useLocalStorage";
import { supabase } from "@/lib/supabase";
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
import WorkoutScreen       from "@/components/workout/WorkoutScreen";
import CoachScreen         from "@/components/coach/CoachScreen";
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
  const [screen,         setScreen]         = useState<Screen>(() => {
    const session = lsGet<{ loggedIn: boolean } | null>("tn_session", null);
    return session?.loggedIn ? "app" : "login";
  });
  const [tab,            setTab]            = useState<Tab>(() => {
    const session = lsGet<{ loggedIn: boolean } | null>("tn_session", null);
    const onboarded = lsGet<boolean>("tn_onboarded", false);
    if (!session?.loggedIn) return "onboarding";
    return onboarded ? "home" : "onboarding";
  });
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
  const handleAuthSuccess = useCallback((partial: Partial<Profile>, isSignup = false) => {
    if (Object.keys(partial).length > 0) {
      setProfile((p) => ({ ...p, ...partial }));
    }
    lsSet("tn_session", { loggedIn: true });
    setScreen("app");
    if (isSignup) {
      lsSet("tn_onboarded", false);
      setTab("onboarding");
    } else {
      const onboarded = lsGet<boolean>("tn_onboarded", false);
      setTab(onboarded ? "home" : "onboarding");
    }
  }, [setProfile]);

  useEffect(() => {
    if (!supabase) return;

    // Check current active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const fullName =
          session.user.user_metadata?.full_name ||
          session.user.user_metadata?.name ||
          session.user.email?.split("@")[0] ||
          "";
        setProfile((p) => ({
          ...p,
          fullName: p.fullName || fullName,
          email: session.user.email || p.email,
        }));
        lsSet("tn_session", { loggedIn: true });
        setScreen("app");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const fullName =
          session.user.user_metadata?.full_name ||
          session.user.user_metadata?.name ||
          session.user.email?.split("@")[0] ||
          "";
        setProfile((p) => ({
          ...p,
          fullName: p.fullName || fullName,
          email: session.user.email || p.email,
        }));
        lsSet("tn_session", { loggedIn: true });
        setScreen("app");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setProfile]);

  const handleSignOut = useCallback(() => {
    if (supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    lsSet("tn_session", { loggedIn: false });
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
    width: "100%",
    margin: "0 auto",
    position: "relative",
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
        <div className="app-shell-container" style={appStyle}>
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
  const isOnboarding = tab === "onboarding";

  const contentStyle: React.CSSProperties = isCoach
    ? {
        display: "flex", flexDirection: "column",
        overflow: "hidden", background: C.bg,
      }
    : {
        paddingBottom: isOnboarding ? 24 : NAV_HEIGHT + 24,
        width: "100%",
        boxSizing: "border-box",
      };

  return (
    <>
      <style>{globalStyle}</style>
      <div className="app-shell-container" style={appStyle}>
        {isCoach ? (
          <div className="coach-desktop-container" style={contentStyle}>
            <Header C={C} lang={lang} theme={theme}
              tab={tab} setTab={setTab}
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
              tab={tab} setTab={setTab}
              onToggleLang={toggleLang} onToggleTheme={toggleTheme}
              onEditProfile={() => setEditingProfile(true)}
              hideProfileBtn={isOnboarding} />
            <div style={contentStyle}>
              {tab === "onboarding" && (
                <OnboardingScreen
                  profile={profile} setPF={setPF} toggleCond={toggleCond}
                  onComplete={() => {
                    lsSet("tn_onboarded", true);
                    setTab("home");
                  }}
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
              {tab === "workout" && (
                <WorkoutScreen
                  profile={profile} C={C} lang={lang}
                />
              )}
            </div>
          </div>
        )}

        {!isOnboarding && (
          <BottomNav tab={tab} setTab={setTab} C={C} lang={lang} />
        )}
      </div>
    </>
  );
}
