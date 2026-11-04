import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login Aayush Wellness",
  description: "Secure admin login for Aayush Wellness CMS",
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
