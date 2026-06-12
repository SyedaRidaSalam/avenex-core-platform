"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminCareers() {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInjectJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, department, location }),
      });

      if (res.ok) {
        setMessage("✓ Career opening successfully committed to active pipelines.");
        setTitle("");
        setDepartment("");
        setLocation("");
      } else {
        setMessage("✕ API verification error.");
      }
    } catch (err) {
      setMessage("✕ Pipeline injection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-8">
      <div className="space-y-1">
        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] block">Pipeline Sync</span>
        <h1 className="text-2xl font-light tracking-tight">INJECT NEW CAREER PIPELINE</h1>
      </div>

      <form onSubmit={handleInjectJob} className="space-y-6 pt-6 border-t border-zinc-900">
        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">Role / Position Title</label>
          <Input 
            required type="text" placeholder="e.g., Senior Systems Architect"
            className="bg-black border-zinc-900 rounded-none text-white text-xs h-11 focus-visible:ring-zinc-700"
            value={title} onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">Department Node</label>
            <Input 
              required type="text" placeholder="e.g., Core Infrastructure"
              className="bg-black border-zinc-900 rounded-none text-white text-xs h-11 focus-visible:ring-zinc-700"
              value={department} onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">Geographic Node</label>
            <Input 
              required type="text" placeholder="e.g., Remote / Global"
              className="bg-black border-zinc-900 rounded-none text-white text-xs h-11 focus-visible:ring-zinc-700"
              value={location} onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        {message && (
          <p className="text-[11px] font-mono tracking-wide text-zinc-400 bg-zinc-900/40 p-3 border border-zinc-900">
            {message}
          </p>
        )}

        <Button 
          type="submit" disabled={loading}
          className="w-full bg-white text-black hover:bg-zinc-200 text-[10px] tracking-[0.25em] uppercase font-bold py-6 rounded-none transition-colors"
        >
          {loading ? "Injecting Pipeline..." : "Commit Opening"}
        </Button>
      </form>
    </div>
  );
}