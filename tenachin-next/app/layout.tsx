import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TENACHIN — Ethiopian Wellness App",
  description:
    "AI-powered wellness coach built for Ethiopia. Track steps, sleep, calories, water, and get personalised meal plans based on Ethiopian foods. Available in English, Amharic, and Afaan Oromoo.",
  keywords: ["Ethiopia", "wellness", "health", "AI coach", "BMI", "fitness tracker"],
  authors: [{ name: "TENACHIN" }],
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "TENACHIN Wellness",
    description: "Your personal Ethiopian wellness AI coach",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
