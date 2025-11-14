import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavbarWrapper } from "@/app/components";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Call4ly",
    description: "AI-drevet receptionist til virksomheder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-neutral-900`}
      >
      <NavbarWrapper/>
        {children}
      </body>
    </html>
  );
}
