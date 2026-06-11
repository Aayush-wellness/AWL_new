import React from "react";
import { Manrope } from "next/font/google";
import { AyuHero, AyuGap, AyuPrinciples, AyuProcess, AyuBanner } from "@/components/ayurveda";
import "./ayurveda.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-figtree",
});

export const metadata = {
  title: "Ayurveda + Modern Nutrition - Aayush Wellness Limited",
  description:
    "At Aayush Wellness, we integrate traditional Indian Ayurvedic herbal principles with modern clinical nutritional science to formulate clean, evidence-backed daily nutraceuticals.",
};

export default function AyurvedaPage() {
  return (
    <main className={`${manrope.variable} ayurveda-page w-full`}>
      <AyuHero />
      <AyuGap />
      <AyuPrinciples />
      <AyuProcess />
      <AyuBanner />
    </main>
  );
}
