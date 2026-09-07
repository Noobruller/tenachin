"use client";

import React from "react";
import type { ColorTokens } from "@/types";

interface NInputProps {
  val: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder: string;
  btnLabel: string;
  btnColor?: string;
  C: ColorTokens;
}

export default function NInput({
  val, onChange, onSubmit, placeholder, btnLabel, btnColor, C,
}: NInputProps) {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
      <input
        style={{
          background: C.surfaceEl,
          border: `1.5px solid ${C.border}`,
          borderRadius: 12,
          padding: "9px 12px",
          color: C.text,
          fontSize: 13,
          flex: 1,
          boxSizing: "border-box",
          outline: "none",
          fontFamily: "inherit",
        }}
        type="number"
        min="0"
        value={val}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      />
      <button
        style={{
          background: btnColor ?? C.green,
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: "9px 16px",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 600,
          flexShrink: 0,
          transition: "all 0.18s",
          outline: "none",
        }}
        onClick={onSubmit}
      >
        {btnLabel}
      </button>
    </div>
  );
}
