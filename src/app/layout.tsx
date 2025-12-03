import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAT Progress Dashboard",
  description: "Track your SAT exam preparation progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

