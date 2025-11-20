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
    metadataBase: new URL("https://www.call4ly.com"),
    title: "Call4ly – AI receptionist & kundeopkald til virksomheder",
    description:
        "Call4ly hjælper virksomheder med at håndtere kundeopkald automatisk med AI. Spar tid, øg effektiviteten og forbedr kundeservice – helt uden ekstra personale.",
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        title: "Call4ly – AI receptionist & kundeopkald til virksomheder",
        description:
            "Automatiser jeres kundeopkald med AI og spar tid på kundeservice.",
        url: "https://www.call4ly.com",
        siteName: "Call4ly",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
            },
        ],
        locale: "da_DK",
        type: "website",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-neutral-900`}
      >
      <NavbarWrapper/>
        {children}
      </body>
    </html>
  );
}
