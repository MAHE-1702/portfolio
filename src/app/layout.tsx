import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { CursorFollower } from "@/components/layout/CursorFollower";
import { PageLoader } from "@/components/layout/PageLoader";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
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
      className={outfit.variable}
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
