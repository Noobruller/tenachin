"use client";

import React from "react";
import type { ColorTokens, Lang } from "@/types";
import { t } from "@/lib/i18n";
import { PLANS, PLAN_LABELS, PLAN_SUB } from "@/lib/plans";

interface PremiumScreenProps {
  C: ColorTokens;
  lang: Lang;
}

export default function PremiumScreen({ C, lang }: PremiumScreenProps) {
  const T = (key: string) => t(lang, key);

  const PLAN_META = [
    { col: C.blue,   grad: `linear-gradient(135deg,${C.blue},#1A3A8E)` },
    { col: C.green,  grad: `linear-gradient(135deg,${C.green},${C.greenDark})` },
    { col: C.purple, grad: `linear-gradient(135deg,${C.purple},#4A22A8)` },
    { col: C.gold,   grad: `linear-gradient(135deg,${C.gold},#A06010)` },
  ];

  const card: React.CSSProperties = {
    background: C.card,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: `1px solid ${C.cardBorder}`,
    borderRadius: 20,
    padding: "18px 20px",
    marginBottom: 14,
    boxShadow: C.shadow,
  };

  return (
    <div style={{ padding: "20px 20px" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "8px 0 24px" }}>
        <div style={{
          width: 64, height: 64, borderRadius: 22, margin: "0 auto 14px",
          background: `linear-gradient(135deg,${C.purple},${C.gold})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32, boxShadow: C.shadowGold,
        }}>
          💎
        </div>
        <div style={{ fontSize: 24, fontWeight: 900, color: C.text, letterSpacing: "-0.04em", lineHeight: 1.1 }}>
          {T("prem_headline")}
        </div>
        <div style={{ fontSize: 12, color: C.textMuted, marginTop: 8, lineHeight: 1.5 }}>
          {T("prem_sub")}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {["🤖 Unlimited AI", "🍽️ Meal Plans", "📊 Analytics", "🏋️ Workouts"].map((f) => (
            <span key={f} style={{
              fontSize: 10, fontWeight: 700,
              background: `${C.purple}18`, color: C.purple,
              border: `1px solid ${C.purple}44`, borderRadius: 20, padding: "4px 12px",
            }}>{f}</span>
          ))}
        </div>
      </div>

      {/* Plan cards */}
      {PLANS.map((plan, idx) => {
        const meta = PLAN_META[idx];
        const isPopular = plan.badge === "most_popular";
        const isBest    = plan.badge === "best_value";

        return (
          <div key={plan.id} style={{
            ...card,
            border: `2px solid ${isPopular || isBest ? meta.col : C.border}`,
            boxShadow: isPopular
              ? `0 0 32px ${meta.col}22`
              : isBest ? `0 0 32px ${meta.col}18` : C.shadow,
            position: "relative",
            marginBottom: isPopular ? 20 : 14,
          }}>
            {/* Badge */}
            {plan.badge && (
              <div style={{
                position: "absolute", top: -13, left: "50%",
                transform: "translateX(-50%)",
                background: meta.grad, color: "#fff",
                borderRadius: 20, padding: "4px 16px",
                fontSize: 10, fontWeight: 800,
                whiteSpace: "nowrap", letterSpacing: "0.05em",
                boxShadow: `0 3px 12px ${meta.col}55`,
              }}>
                {isPopular ? T("most_popular") : T("best_value")} {isPopular ? "🔥" : "⭐"}
              </div>
            )}

            {/* Plan header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: meta.col, letterSpacing: "-0.03em" }}>
                  {PLAN_LABELS[idx]}
                </div>
                <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 600, letterSpacing: "0.05em", marginTop: 2 }}>
                  {PLAN_SUB[idx].toUpperCase()}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                  <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 700 }}>ETB</span>
                  <span style={{ fontSize: 30, fontWeight: 900, color: meta.col, letterSpacing: "-0.04em", lineHeight: 1 }}>
                    {plan.price}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 500 }}>{plan.period}</div>
              </div>
            </div>

            <div style={{ height: 1, background: `${meta.col}22`, marginBottom: 14 }} />

            {/* Features */}
            <div style={{ marginBottom: 16 }}>
              {plan.features.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%",
                    background: meta.grad,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 1,
                  }}>
                    <span style={{ fontSize: 9, color: "#fff", fontWeight: 900 }}>✓</span>
                  </div>
                  <span style={{ fontSize: 12, color: C.text, lineHeight: 1.4, fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              style={{
                width: "100%", padding: "14px 0",
                background: meta.grad, border: "none", borderRadius: 14,
                color: "#fff", fontSize: 14, fontWeight: 800,
                cursor: "pointer", letterSpacing: "0.02em",
                boxShadow: `0 6px 20px ${meta.col}44`,
                transition: "opacity 0.15s, transform 0.15s",
              }}
              onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
              onMouseUp={(e)   => { e.currentTarget.style.transform = "scale(1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              onClick={() => alert(`🚧 Payment coming soon!\n\nPlan: TENACHIN ${PLAN_LABELS[idx]}\nPrice: ETB ${plan.price}${plan.period}\n\nThank you for your interest!`)}
            >
              {T("subscribe")} →
            </button>

            {isPopular && <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: meta.col, fontWeight: 700 }}>{T("chosen_by")}</div>}
            {isBest    && <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: meta.col, fontWeight: 700 }}>{T("save_37")}</div>}
          </div>
        );
      })}

      {/* Payment methods */}
      <div style={{ ...card, textAlign: "center", padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, marginBottom: 8 }}>
          🔒 {T("pay_secure")}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          {["Telebirr", "CBE Birr", "Amole", "Bank Transfer"].map((p) => (
            <span key={p} style={{ fontSize: 10, fontWeight: 700, background: C.greenGlass, color: C.green, borderRadius: 8, padding: "4px 10px" }}>
              {p}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 10, color: C.textMuted, marginTop: 10 }}>{T("prem_note")}</div>
      </div>
    </div>
  );
}
