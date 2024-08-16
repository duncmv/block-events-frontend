import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import { Container } from "postcss";
import Footer from "./components/Footer";
import react from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Block Events",
  description: "Events management at your finger tips",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="autumn">
      <body className={`${inter.className} flex flex-col h-screen`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
