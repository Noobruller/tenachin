"use client";

import React from "react";

interface ProgressRingProps {
  pct: number;
  size?: number;
  stroke?: number;
  color: string;
  bg?: string;
  children?: React.ReactNode;
}

export default function ProgressRing({
  pct, size = 72, stroke = 6, color, bg, children,
}: ProgressRingProps) {
  const r    = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const off  = circ * (1 - Math.min(pct, 100) / 100);

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)", display: "block" }}
      >
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={bg ?? "rgba(255,255,255,0.08)"}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={off}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center",
          justifyContent: "center", flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  );
}
