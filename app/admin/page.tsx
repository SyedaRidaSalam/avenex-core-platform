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
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("avenex_session") === "active") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        setStatsLoading(true);
        try {
          const [statsRes, leadsRes] = await Promise.all([
            fetch("/api/admin/stats"),
            fetch("/api/admin/leads")
          ]);
          
          if (statsRes.ok) {
            const data = await statsRes.json();
            setStats({ leads: data.leadsCount || 0, posts: data.postsCount || 0, jobs: data.jobsCount || 0 });
          }
          if (leadsRes.ok) {
            const data = await leadsRes.json();
            setLeads(data.leads || []);
          }
        } catch (err) {
          console.error("Sync error:", err);
        } finally {
          setStatsLoading(false);
        }
      };
      fetchData();
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
    } catch {
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

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto md:my-24 space-y-6">
        <div className="space-y-1">
          <span className="text-[9px] font-mono text-red-500 uppercase tracking-[0.4em] block">🔒 Restricted Node</span>
          <h1 className="text-xl font-light tracking-tight text-zinc-200">ENTER OPERATIONAL GATEWAY</h1>
        </div>
        <form onSubmit={handleVerify} className="space-y-4 pt-4 border-t border-zinc-900">
          <Input type="password" required placeholder="••••••••••••" className="bg-black border-zinc-900 rounded-none text-white text-xs h-11" value={passkey} onChange={(e) => setPasskey(e.target.value)} />
          {error && <p className="text-[10px] font-mono text-red-500">✕ Authentication mismatch.</p>}
          <Button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-zinc-200 text-[10px] tracking-[0.25em] uppercase font-bold py-5 rounded-none">
            {loading ? "Authenticating..." : "Verify Identity"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-mono text-green-500 uppercase tracking-[0.4em]">● Node: Authenticated</span>
          <h1 className="text-2xl font-light mt-1">SYSTEMS OVERVIEW</h1>
        </div>
        <button onClick={handleLogout} className="text-[9px] text-zinc-500 hover:text-red-400 uppercase tracking-widest border border-zinc-900 px-3 py-1 transition-all">Logout</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Incoming Leads", val: stats.leads },
          { label: "Published Logs", val: stats.posts },
          { label: "Active Pipelines", val: stats.jobs }
        ].map((item, i) => (
          <div key={i} className="bg-[#050505] border border-zinc-900 p-6 space-y-2">
            <p className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">{item.label}</p>
            <p className="text-3xl font-light font-mono">{statsLoading ? "..." : item.val}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-900 pt-8">
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-6">Inbound Lead Stream</h2>
        
        {/* Scrollable Container */}
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto pr-2 border-r border-zinc-900/50">
          <table className="w-full text-left text-[11px] text-zinc-400">
            <thead className="sticky top-0 bg-black z-10 text-zinc-600 uppercase tracking-widest border-b border-zinc-900">
              <tr>
                <th className="pb-4">Name</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Company</th>
                <th className="pb-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {leads.map((lead: any) => (
                <tr key={lead.id} className="hover:bg-zinc-900/20 transition-colors">
                  <td className="py-4 text-white font-medium">{lead.name}</td>
                  <td className="py-4 font-mono">{lead.email}</td>
                  <td className="py-4">{lead.company || "Individual"}</td>
                  <td className="py-4">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}