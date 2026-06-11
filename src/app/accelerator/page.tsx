import React from "react";
import { Manrope } from "next/font/google";
import {
  AccHero,
  AccOffer,
  AccFocus,
  AccBack,
  AccEvaluation,
  AccQuote,
  AccApplication,
} from "@/components/accelerator";
import "./accelerator.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-figtree",
});

export const metadata = {
  title: "Accelerator - Aayush Wellness Limited",
  description:
    "Aayush Wellness Accelerator backs founders building at the intersection of health, science, and human impact with ₹5 Crore Venture & Growth Capital.",
};

export default function AcceleratorPage() {
  return (
    <main className={`${manrope.variable} w-full`}>
      <AccHero />
      <AccOffer />
      <AccFocus />
      <AccBack />
      <AccEvaluation />
      <AccQuote />
      <AccApplication />
    </main>
  );
}
