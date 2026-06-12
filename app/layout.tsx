import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
title: "Avenex | Enterprise Software Solutions",
  description: "Engineered for international scale. Custom platforms and advanced architectures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased min-h-screen flex flex-col selection:bg-white selection:text-black">
        {/* Top Navbar */}
        <Navbar />
        
        {/* Main Content Area */}
        <div className="flex-grow">
          {children}
        </div>
        
        {/* Bottom Footer */}
        <Footer />
      </body>
    </html>
  );
}
