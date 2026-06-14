"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Sahi package standard `lucide-react` hai

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Solutions", href: "/solutions" },
    { name: "Insights", href: "/insights" },
    { name: "Company", href: "/company" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-black/85 backdrop-blur-md border-b border-zinc-900 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold tracking-[0.25em] text-white">
          AVENEX
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8 text-[11px] tracking-[0.25em] uppercase font-bold text-zinc-400">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={`transition-colors hover:text-white ${pathname === link.href ? "text-white" : ""}`}>
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Audit CTA Button (Premium Styling) */}
          <Link 
            href="/audit" 
            className="border border-white/20 hover:border-white text-white px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300"
          >
           Book Audit
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu (Audit ko yahan bhi add kiya) */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full md:hidden bg-black/95 py-6 px-6 border-b border-zinc-900">
          <div className="flex flex-col gap-6 text-[11px] tracking-[0.25em] uppercase font-bold items-center">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-zinc-400">{link.name}</Link>
            ))}
            <Link href="/audit" onClick={() => setIsOpen(false)} className="border border-white text-white w-full py-3 text-center">
              Book Audit
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}