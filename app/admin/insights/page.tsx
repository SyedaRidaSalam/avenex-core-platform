"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminInsights() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        setMessage("✓ Article synchronized and published to public core node.");
        setTitle("");
        setContent("");
      } else {
        setMessage("✕ Transmission failed. Check server endpoints.");
      }
    } catch (err) {
      setMessage("✕ Infrastructure link fault.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-8">
      <div className="space-y-1">
        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] block">Data Injection</span>
        <h1 className="text-2xl font-light tracking-tight">PUBLISH NEW INSIGHT DOCUMENT</h1>
      </div>

      <form onSubmit={handlePublish} className="space-y-6 pt-6 border-t border-zinc-900">
        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">Document Title</label>
          <Input 
            required type="text" placeholder="e.g., Scaling Distributed Ledger Databases..."
            className="bg-black border-zinc-900 rounded-none text-white text-xs h-11 focus-visible:ring-zinc-700"
            value={title} onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">Technical Content / Brief</label>
          <Textarea 
            required rows={6} placeholder="Paste structural data or technical research documentation here..."
            className="bg-black border-zinc-900 rounded-none text-white text-xs leading-relaxed focus-visible:ring-zinc-700 resize-none"
            value={content} onChange={(e) => setContent(e.target.value)}
          />
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
          {loading ? "Transmitting..." : "Publish To Insights"}
        </Button>
      </form>
    </div>
  );
}