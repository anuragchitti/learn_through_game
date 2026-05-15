import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "LearnThroughGame — Master tech by playing",
  description:
    "Learn any technical course through interactive challenges, concept cards, and a gamified progression system. Earn real certificates.",
  keywords: ["learning", "coding", "gamified", "courses", "certification", "interactive"],
  openGraph: {
    title: "LearnThroughGame",
    description: "Master tech by playing. Beginner to Pro.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-white antialiased">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
      </body>
    </html>
  );
}
