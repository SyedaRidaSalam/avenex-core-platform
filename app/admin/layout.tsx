"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "CORE OVERVIEW", path: "/admin" },
    { name: "MANAGE INSIGHTS", path: "/admin/insights" },
    { name: "MANAGE CAREERS", path: "/admin/careers" },
    { name: "MANAGE APPLICATIONS", path: "/admin/applications" },
  ];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - Both desktop & mobile aligned */}
      <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r border-zinc-900 p-8 flex flex-col gap-12 bg-[#050505] md:mt-21 mt-15">
        <div> 
          <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">Avenex Control</h2>
          <h1 className="text-xl font-light tracking-tight mt-1 text-white">SYSTEM ADMIN</h1>
        </div>
        
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`text-xs tracking-[0.2em] uppercase py-4 px-4 transition-all duration-300 flex items-center gap-3
                  ${isActive 
                    ? "text-white bg-zinc-900/50 border-l-2 border-white" 
                    : "text-zinc-600 hover:text-zinc-300 hover:bg-zinc-900/20 border-l-2 border-transparent"
                  }`}
              >
                {isActive && <div className="w-1 h-1 bg-white rounded-full" />}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content - Synced Margin Top */}
      <main className="flex-1 p-8 md:p-20 md:mt-8 overflow-y-auto">
        <div className="max-w-5xl w-full">
          {children}
        </div>
      </main>
    </div>
  );
}