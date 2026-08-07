import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/providers";
import { cn } from "@/lib/utils";
import Header from "@/components/header/Header";


const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SOC analitics",
  description: ""
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={cn("h-full", "antialiased", montserrat.variable, "font-sans", inter.variable)}>
      <body className="">
        <Header/>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
