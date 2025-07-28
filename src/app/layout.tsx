import type { Metadata } from "next";
import { Roboto, Roboto_Mono, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // all weights
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"], // all weights
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // all weights
});

export const metadata: Metadata = {
  title: "Yueying Portfolio",
  description: "2025 latest works",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${robotoMono.variable} ${lora.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
