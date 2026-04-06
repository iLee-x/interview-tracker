import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "InterviewLog — Track Your Interview Journey",
  description:
    "A personal interview tracking tool to log companies, rounds, questions, and outcomes. Stay organized throughout your job search.",
  keywords: ["interview", "tracker", "job search", "career"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#06060e] text-white min-h-screen`}
      >
        <ReduxProvider>
          <Navbar />
          <main className="pt-16 min-h-screen dot-grid">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
