"use client";

import React from "react";
import type { ColorTokens, Lang, Profile } from "@/types";
import { CONDITIONS } from "@/lib/foods";
import { t } from "@/lib/i18n";

interface EditProfileModalProps {
  profile: Profile;
  setPF: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
  toggleCond: (c: string) => void;
  onClose: () => void;
  onSignOut: () => void;
  C: ColorTokens;
  lang: Lang;
}

export default function EditProfileModal({
  profile, setPF, toggleCond, onClose, onSignOut, C, lang,
}: EditProfileModalProps) {
  const T = (key: string) => t(lang, key);

  const s = {
    label: {
      fontSize: 11, color: C.textMuted, fontWeight: 700,
      textTransform: "uppercase" as const, letterSpacing: "0.07em",
      marginBottom: 6, display: "block",
    },
    input: {
      background: C.surfaceEl, border: `1.5px solid ${C.border}`,
      borderRadius: 12, padding: "12px 16px", color: C.text,
      fontSize: 14, width: "100%", boxSizing: "border-box" as const,
      outline: "none", fontFamily: "inherit", transition: "border-color 0.2s",
    },
    btn: (active: boolean, col?: string) => ({
      background: active ? (col ?? C.green) : "transparent",
      color: active ? "#fff" : C.text,
      border: `1.5px solid ${active ? (col ?? C.green) : C.border}`,
      borderRadius: 12, padding: "10px 18px", cursor: "pointer",
      fontSize: 13, fontWeight: 600, transition: "all 0.18s",
      outline: "none",
    }),
  };

  const fields: [keyof Profile, string, string, string][] = [
    ["fullName",  T("fullname"),   "Yohannes Belay", "text"],
    ["email",     T("email"),      "name@gmail.com", "email"],
    ["age",       T("age"),        "25",             "number"],
    ["weight",    T("weight_kg"),  "70",             "number"],
    ["height",    T("height_m"),   "1.72",           "number"],
    ["budget",    T("budget_mo"),  "3000",           "number"],
  ];

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: C.bg, overflowY: "auto",
        padding: "20px 20px 60px",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, paddingTop: 8 }}>
        <button
          style={{ ...s.btn(false), padding: "8px 14px", borderRadius: 12 }}
          onClick={onClose}
        >←</button>
        <span style={{ fontWeight: 800, fontSize: 17, color: C.green }}>{T("edit_profile")}</span>
      </div>

      {/* Fields */}
      {fields.map(([k, lbl, ph, type]) => (
        <div key={k} style={{ marginBottom: 14 }}>
          <label style={s.label}>{lbl}</label>
          <input
            style={s.input}
            value={profile[k] as string}
            placeholder={ph}
            type={type}
            step={k === "height" ? "0.01" : undefined}
            onChange={(e) => setPF(k, e.target.value as Profile[typeof k])}
          />
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
      <div style={{ marginBottom: 14 }}>
        <label style={s.label}>{T("religion")}</label>
        <select style={s.input} value={profile.religion}
          onChange={(e) => setPF("religion", e.target.value)}>
          {["Christian-Orthodox","Christian-Catholic","Christian-Protestant","Muslim","None"]
            .map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>

      {/* Conditions */}
      <div style={{ marginBottom: 20 }}>
        <label style={s.label}>{T("ncd_title")}</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CONDITIONS.map((c) => (
            <button key={c}
              style={{ ...s.btn(profile.conditions.includes(c)), fontSize: 11, padding: "6px 12px", borderRadius: 20 }}
              onClick={() => toggleCond(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Save */}
      <button
        style={{
          background: C.green, color: "#fff", border: "none",
          borderRadius: 14, padding: "14px", fontSize: 15,
          width: "100%", cursor: "pointer", fontWeight: 700,
          marginBottom: 10, boxShadow: C.shadowGreen,
        }}
        onClick={onClose}
      >{T("save_changes")}</button>

      {/* Sign out */}
      <button
        style={{ ...s.btn(false), width: "100%", padding: "12px", fontSize: 13, color: C.red, borderColor: C.red }}
        onClick={onSignOut}
      >{T("sign_out")}</button>
    </div>
  );
}
