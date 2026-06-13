import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// 1. Yeh imports add karo
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

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
        {/* 2. Yeh plugin add karna zaroori hai taaki upload system sahi se chale */}
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        
        <Navbar />
        
        <div className="flex-grow">
          {children}
        </div>
        
        <Footer />
      </body>
    </html>
  );
}