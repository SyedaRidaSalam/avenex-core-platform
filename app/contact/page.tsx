"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string }>({ type: null, msg: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, msg: "" });

    try {
      // Connecting to our new backend route
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ 
          type: "success", 
          msg: "Transmission successful. Specifications recorded securely." 
        });
        setFormData({ name: "", email: "", company: "", message: "" }); // Reset form fields
      } else {
        setStatus({ type: "error", msg: data.error || "Transmission failed." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Network link fault. Server unreachable." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-black text-white min-h-screen pt-10 px-6 flex items-center">
      <div className="max-w-xl mx-auto w-full space-y-8 py-12">
        
        {/* Title Block */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] block">
            01 / CONNECT
          </span>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-100">
            ENGAGE AVENEX SYSTEMS
          </h1>
          <p className="text-xs md:text-sm mt-5 text-zinc-400 font-light tracking-wide leading-relaxed">
            Submit your enterprise specifications or structural infrastructure requirements below.
          </p>
        </div>

        {/* Form Element */}
        <form onSubmit={handleSubmit} className="space-y-6 pt-6 border-t border-zinc-900">
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">
              Full Name *
            </label>
            <Input 
              type="text" required placeholder="e.g., Alexander"
              className="bg-zinc-950 border-zinc-900 rounded-none text-white focus-visible:ring-zinc-700 h-11 text-xs"
              value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">
                Corporate Email *
              </label>
              <Input 
                type="email" required placeholder="name@company.com"
                className="bg-zinc-950 border-zinc-900 rounded-none text-white focus-visible:ring-zinc-700 h-11 text-xs"
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">
                Company Name
              </label>
              <Input 
                type="text" placeholder="e.g., Siemens AG"
                className="bg-zinc-950 border-zinc-900 rounded-none text-white focus-visible:ring-zinc-700 h-11 text-xs"
                value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">
              Project Brief / Specifications *
            </label>
            <Textarea 
              required rows={5} placeholder="Describe the product ecosystem or specific software deliverables needed..."
              className="bg-zinc-950 border-zinc-900 rounded-none text-white focus-visible:ring-zinc-700 resize-none text-xs leading-relaxed"
              value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          {/* Dynamic Status Notification Banner */}
          {status.msg && (
            <div className={`p-4 text-[11px] font-mono border rounded-none tracking-wide ${
              status.type === "success" 
                ? "bg-zinc-900/50 border-zinc-800 text-zinc-300" 
                : "bg-red-950/20 border-red-900 text-red-400"
            }`}>
              {status.msg}
            </div>
          )}

          <Button 
            type="submit" disabled={loading} 
            className="w-full bg-white text-black hover:bg-zinc-200 uppercase text-[10px] tracking-[0.25em] font-bold py-6 rounded-none transition-colors duration-300"
          >
            {loading ? "Transmitting Specification..." : "Submit Requirements"}
          </Button>
        </form>
      </div>
    </main>
  );
}