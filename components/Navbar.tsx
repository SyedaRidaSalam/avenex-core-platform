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
    { name: "Connect", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-black/85 backdrop-blur-md border-b border-zinc-900 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold tracking-[0.25em] text-white hover:opacity-80 transition-opacity">
          AVENEX
        </Link>

        {/* Desktop Links (Badi screens par dikhenge, mobile par hide) */}
        <div className="hidden md:flex gap-8 text-[11px] tracking-[0.25em] uppercase font-bold text-white">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 ${
                  isActive ? "text-white font-extrabold" : "text-zinc-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Hamburger Button (Sirf mobile/tablet par dikhega) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-400 hover:text-white focus:outline-none transition-colors"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full md:hidden bg-black/95 backdrop-blur-md border-b border-zinc-900 py-6 px-6 z-[90]">
          <div className="flex flex-col gap-6 text-[11px] tracking-[0.25em] uppercase font-bold items-center">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)} // Link click hote hi menu band ho jaye
                  className={`w-full text-center transition-colors duration-200 ${
                    isActive ? "text-white font-extrabold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}