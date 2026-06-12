"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SystemStats {
  leads: number;
  posts: number;
  jobs: number;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passkey, setPasskey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [statsLoading, setStatsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [stats, setStats] = useState<SystemStats>({ leads: 0, posts: 0, jobs: 0 });

  // Token session checking on initial render
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("avenex_session") === "active") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch live system statistics from database endpoints once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const fetchStats = async () => {
        setStatsLoading(true);
        try {
          // Creating a lightweight client request to fetch aggregates safely
          const res = await fetch("/api/admin/stats");
          if (res.ok) {
            const data = await res.json();
            setStats({
              leads: data.leadsCount || 0,
              posts: data.postsCount || 0,
              jobs: data.jobsCount || 0,
            });
          }
        } catch (err) {
          console.error("Stats synchronization error:", err);
        } finally {
          setStatsLoading(false);
        }
      };

      fetchStats();
    }
  }, [isAuthenticated]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("avenex_session", "active");
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("avenex_session");
    setIsAuthenticated(false);
    setPasskey("");
  };

  // GATEWAY VIEW (If not authorized)
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-24 space-y-6">
        <div className="space-y-1">
          <span className="text-[9px] font-mono text-red-500 uppercase tracking-[0.4em] block">
            🔒 Restricted Node
          </span>
          <h1 className="text-xl font-light tracking-tight text-zinc-200">ENTER OPERATIONAL GATEWAY</h1>
        </div>

        <form onSubmit={handleVerify} className="space-y-4 pt-4 border-t border-zinc-900">
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">
              Secure Passkey
            </label>
            <Input 
              type="password" 
              required 
              placeholder="••••••••••••"
              className="bg-black border-zinc-900 rounded-none text-white text-xs h-11 focus-visible:ring-zinc-700"
              value={passkey} 
              onChange={(e) => setPasskey(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-[10px] font-mono text-red-500 tracking-wide">
              ✕ Authentication mismatch. Access denied.
            </p>
          )}

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black hover:bg-zinc-200 text-[10px] tracking-[0.25em] uppercase font-bold py-5 rounded-none transition-colors"
          >
            {loading ? "Authenticating..." : "Verify Identity"}
          </Button>
        </form>
      </div>
    );
  }

  // CORE DASHBOARD PANEL VIEW (If authorized)
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono text-green-500 uppercase tracking-[0.4em]">
            ● Node: Authenticated
          </span>
          <button 
            onClick={handleLogout}
            className="text-[9px] font-mono text-zinc-500 hover:text-red-400 uppercase tracking-widest border border-zinc-900 px-2 py-1 transition-colors"
          >
            Logout
          </button>
        </div>
        <h1 className="text-2xl font-light tracking-tight">SYSTEMS OVERVIEW</h1>
      </div>

      {/* Real-time DB Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-black border border-zinc-900 p-6 rounded-none space-y-2">
          <p className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">Incoming Leads</p>
          <p className="text-3xl font-light tracking-tight font-mono text-white">
            {statsLoading ? "..." : stats.leads}
          </p>
        </div>
        <div className="bg-black border border-zinc-900 p-6 rounded-none space-y-2">
          <p className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">Published Logs</p>
          <p className="text-3xl font-light tracking-tight font-mono text-white">
            {statsLoading ? "..." : stats.posts}
          </p>
        </div>
        <div className="bg-black border border-zinc-900 p-6 rounded-none space-y-2">
          <p className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">Active Pipelines</p>
          <p className="text-3xl font-light tracking-tight font-mono text-white">
            {statsLoading ? "..." : stats.jobs}
          </p>
        </div>
      </div>

      <p className="text-zinc-600 text-[10px] font-mono tracking-wide animate-pulse">
        {statsLoading 
          ? "● Refreshing core database aggregates..." 
          : "● Secured cloud gateway engine executing flawlessly. System metrics synchronized."}
      </p>
    </div>
  );
}