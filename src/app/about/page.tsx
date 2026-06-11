import React from "react";
import { Manrope } from "next/font/google";
import { AboutHero, AboutStory, AboutVision, AboutValues } from "@/components/about";
import "./about.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-figtree",
});

export const metadata = {
  title: "About Us - Aayush Wellness Limited",
  description: "Aayush Wellness Limited is a publicly listed preventive healthcare and wellness company - bridging ancient Ayurvedic wisdom with modern science to make proactive health a daily reality for every individual.",
};

export default function AboutPage() {
  return (
    <main className={`${manrope.variable} about-page w-full`}>
      <AboutHero />
      <AboutStory />
      <AboutVision />
      <AboutValues />
    </main>
  );
}
