import Header from "@/components/navigation/Header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PerspectiveProvider } from "@/context/PerspectiveContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edward Ricks | Portfolio",
  description: "Portfolio website for Edward Ricks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col bg-black">
        <Header />
        <PerspectiveProvider>
          <main className="flex-1 flex">
            {children}
          </main>
        </PerspectiveProvider>
      </body>
    </html>
  );
}
