"use client";

import { useState, useEffect } from "react";

interface SystemStats {
  leads: number;
  posts: number;
  jobs: number;
}

export default function AdminDashboard() {
  const [statsLoading, setStatsLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<SystemStats>({ leads: 0, posts: 0, jobs: 0 });
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="space-y-12 animate-in fade-in duration-500 mt-10">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-mono text-green-500 uppercase tracking-[0.4em]">● System: Online</span>
          <h1 className="text-2xl font-light mt-1 uppercase">Systems Overview</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Incoming Leads", val: stats.leads },
          { label: "Published Insights", val: stats.posts },
          { label: "Active Openings", val: stats.jobs }
        ].map((item, i) => (
          <div key={i} className="bg-[#050505] border border-zinc-900 p-6 space-y-2">
            <p className="text-xs md:text-sm font-mono text-zinc-500 tracking-widest uppercase">{item.label}</p>
            <p className="text-3xl font-light font-mono">{statsLoading ? "..." : item.val}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-900 pt-8">
        <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] text-zinc-500 mb-6">Inbound Lead Stream</h2>
        
        <div className="max-h-[300px] overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin">
          <table className="w-full text-left text-[11px] text-zinc-400 border-collapse">
            <thead className="sticky top-0 bg-black z-10 text-zinc-600 uppercase tracking-widest border-b border-zinc-900">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Company</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/50">
              {leads.map((lead: any) => (
                <tr key={lead.id} className="hover:bg-zinc-900/20 transition-colors">
                  <td className="py-3 text-white font-medium">{lead.name}</td>
                  <td className="py-3 font-mono">{lead.email}</td>
                  <td className="py-3">{lead.company || "Individual"}</td>
                  <td className="py-3">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}