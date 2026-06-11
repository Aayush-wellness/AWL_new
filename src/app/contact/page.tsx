import React from "react";
import { ContactPageClient } from "./ContactPageClient";

export const metadata = {
  title: "Contact Us - Aayush Wellness Limited",
  description: "Get in touch with Aayush Wellness Limited regarding distribution partnerships, investment, or startup accelerator programs.",
};

export default function ContactPage() {
  return (
    <main className="w-full">
      <ContactPageClient />
    </main>
  );
}
