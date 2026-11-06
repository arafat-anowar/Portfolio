import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arafat's Dev World — EWU RPG Portfolio",
  description: "An interactive top-down 2D pixel-art RPG developer portfolio set in the East West University (EWU) campus.",
  keywords: ["Developer Portfolio", "RPG Portfolio", "East West University", "Phaser 3", "Next.js", "Pixel Art"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#060b19] text-slate-100 overflow-hidden w-screen h-screen">
        {children}
      </body>
    </html>
  );
}
