import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEO Agent Bot",
  description:
    "An AI-assisted workspace for SEO content planning and optimization.",
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
