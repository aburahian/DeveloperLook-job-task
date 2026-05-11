import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { HeaderChromeProvider } from "@/contexts/HeaderChromeContext";
import { CustomCursors } from "@/components/CustomCursors";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Rise at Seven | Award Winning Search-First Content Marketing Agency",
  description:
    "Rise at Seven is a search-first content marketing agency with offices in London, Sheffield, Manchester & New York.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className="scroll-smooth">
      <body className="bg-grey-100 text-grey-900 antialiased">
        <HeaderChromeProvider>
          <SmoothScrollProvider>
            <CustomCursors />
            <Header />
            {children}
          </SmoothScrollProvider>
        </HeaderChromeProvider>
      </body>
    </html>
  );
}
