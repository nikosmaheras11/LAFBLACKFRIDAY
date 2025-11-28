import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LAF Black Friday | Exclusive Deals",
  description: "Don't miss our biggest Black Friday sale of the year. Up to 70% off on all products. Limited time offers!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
