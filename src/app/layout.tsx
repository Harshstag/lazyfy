import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lazyfy - Type the real thing. Send the right thing.",
  description: "Lazyfy rewrites your informal, emotional, or blunt messages into polished professional communication for Teams, Slack, Email, and LinkedIn.",
  openGraph: {
    title: "Lazyfy - Corporate Translator",
    description: "Vent the rough. Send the polished.",
    url: "https://lazyfy.vercel.app",
    siteName: "Lazyfy",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} antialiased min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary flex flex-col`}
      >
        <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
