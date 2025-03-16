import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavigationBar from '@/components/ui/NavigationBar';
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
  title: "MediFlow HMS",
  description: "Hospital Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}>
        {/* Fixed Navigation Bar */}
        <NavigationBar />

        {/* Main Content Area, ensuring it does not overlap the navbar */}
        <main className="flex-1 ml-64 p-8 overflow-auto bg-[#F1F8FF] min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
