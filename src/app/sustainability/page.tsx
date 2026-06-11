import React from "react";
import { Manrope } from "next/font/google";
import { SusHero, SusApproach, SusCommunity, SusQuote } from "@/components/sustainability";
import "./sustainability.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-figtree",
});

export const metadata = {
  title: "Sustainability & Impact - Aayush Wellness Limited",
  description:
    "At Aayush Wellness, impact is not a department - it is embedded in every product we formulate, every partnership we build, and every community we serve.",
};

export default function SustainabilityPage() {
  return (
    <main className={`${manrope.variable} sustainability-page w-full`}>
      <SusHero />
      <SusApproach />
      <SusCommunity />
      <SusQuote />
    </main>
  );
}
