"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passkey, setPasskey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const session = localStorage.getItem("avenex_session");
    setIsAuthenticated(session === "active");
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("avenex_session", "active");
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { name: "CORE OVERVIEW", path: "/admin" },
    { name: "MANAGE INSIGHTS", path: "/admin/insights" },
    { name: "MANAGE CAREERS", path: "/admin/careers" },
    { name: "MANAGE APPLICATIONS", path: "/admin/applications" },
  ];

  // While checking auth status
  if (isAuthenticated === null) return <div className="bg-black min-h-screen" />;

  // LOGOUT LOGIC
  const handleLogout = () => {
    localStorage.removeItem("avenex_session");
    setIsAuthenticated(false);
  };

  // IF NOT AUTHENTICATED: Show Login Screen Only
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-red-500 uppercase tracking-[0.4em] block">🔒 Restricted Node</span>
            <h1 className="text-xl font-light tracking-tight text-zinc-200">ENTER OPERATIONAL GATEWAY</h1>
          </div>
          <form onSubmit={handleVerify} className="space-y-4 pt-4 border-t border-zinc-900">
            <Input type="password" required placeholder="••••••••••••" className="bg-black border-zinc-900 rounded-none text-white text-xs h-11" value={passkey} onChange={(e) => setPasskey(e.target.value)} />
            {error && <p className="text-xs font-mono text-red-500">✕ Authentication mismatch.</p>}
            <Button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-zinc-200 text-[10px] tracking-[0.25em] uppercase font-bold py-5 rounded-none">
              {loading ? "Authenticating..." : "Verify Identity"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // IF AUTHENTICATED: Show Sidebar and Content
  return (
    <div className="bg-black text-white min-h-screen flex flex-col md:flex-row">
      <aside className=" mt-22 w-full md:w-72 border-b md:border-b-0 md:border-r border-zinc-900 p-8 flex flex-col gap-12 bg-[#050505]">
        <div>
          <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">Avenex Control</h2>
          <h1 className="text-xl font-light tracking-tight mt-1 text-white">SYSTEM ADMIN</h1>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path} className={`text-xs tracking-[0.2em] uppercase py-4 px-4 flex items-center gap-3 ${isActive ? "text-white bg-zinc-900/50 border-l-2 border-white" : "text-zinc-600 hover:text-zinc-300 border-l-2 border-transparent"}`}>
                {item.name}
              </Link>
            );
          })}
          <button onClick={handleLogout} className="mt-8 text-xs text-zinc-600 hover:text-red-400 uppercase tracking-widest text-left px-4">Logout Session</button>
        </nav>
      </aside>
      <main className="flex-1 p-8 md:p-20 overflow-y-auto">
        <div className="max-w-5xl w-full">{children}</div>
      </main>
    </div>
  );
}