import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "vinext host App",
  description: "I am the host app",
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
