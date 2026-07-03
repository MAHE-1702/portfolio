import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { CursorFollower } from "@/components/layout/CursorFollower";
import { PageLoader } from "@/components/layout/PageLoader";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maheshwaran Annadurai | Full Stack Web & Flutter Developer",
  description:
    "Portfolio of Maheshwaran Annadurai — Full Stack Web & Flutter Mobile Developer crafting high-performance digital experiences with React, Next.js, and Flutter.",
  keywords: [
    "Maheshwaran Annadurai",
    "Full Stack Developer",
    "Flutter Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer",
    "Mobile App Developer",
  ],
  authors: [{ name: "Maheshwaran Annadurai" }],
  creator: "Maheshwaran Annadurai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="antialiased font-sans bg-background text-foreground">
        <PageLoader />
        <SmoothScrollProvider>
          <CursorFollower />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
