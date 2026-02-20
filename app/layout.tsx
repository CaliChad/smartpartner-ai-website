import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0F1A",
};

export const metadata: Metadata = {
  title: "SMARTPARTNER.AI - Let AI Run Your Repetitive Tasks",
  description: "Custom AI automation for small teams. From WhatsApp responses to lead capture and CRM updates. Save time, cut costs, and scale with less stress.",
  keywords: ["AI automation", "WhatsApp AI", "lead generation", "CRM automation", "business automation", "AI assistant"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://js.paystack.co" />
        <link rel="preconnect" href="https://js.paystack.co" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
