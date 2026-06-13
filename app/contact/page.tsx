"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    msg: string;
  }>({ type: null, msg: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, msg: "" });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          msg: "Transmission successful. Specifications recorded securely.",
        });
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus({ type: "error", msg: data.error || "Transmission failed." });
      }
    } catch (err) {
      setStatus({
        type: "error",
        msg: "Network link fault. Server unreachable.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-black text-white min-h-screen pt-10 px-6 flex items-center">
      <div className="max-w-xl mx-auto w-full space-y-8 py-12">
        <div className="max-w-xl space-y-2">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] block">
            07 / Join the protocol
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight uppercase">
            Engage<span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-br from-zinc-200 via-zinc-400 to-zinc-700">
              &nbsp;AVENEX
            </span>
          </h1>
          <p className="text-xs md:text-sm mt-5 text-zinc-400 font-light tracking-wide leading-relaxed">
            Submit your enterprise specifications or structural infrastructure requirements below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pt-6 border-t border-zinc-900">
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">Full Name *</label>
            <Input type="text" required placeholder="e.g., Alexander" className="bg-zinc-950 border-zinc-900 rounded-none text-white focus-visible:ring-zinc-700 h-11 text-xs" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">Corporate Email *</label>
              <Input type="email" required placeholder="name@company.com" className="bg-zinc-950 border-zinc-900 rounded-none text-white focus-visible:ring-zinc-700 h-11 text-xs" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">Company Name</label>
              <Input type="text" placeholder="e.g., Siemens AG" className="bg-zinc-950 border-zinc-900 rounded-none text-white focus-visible:ring-zinc-700 h-11 text-xs" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">Project Brief / Specifications *</label>
            <Textarea required rows={5} placeholder="Describe the product ecosystem or specific software deliverables needed..." className="bg-zinc-950 border-zinc-900 rounded-none text-white focus-visible:ring-zinc-700 resize-none text-xs leading-relaxed" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
          </div>

          {/* Social Connection Block */}
          <div className="flex items-center justify-between border-y border-zinc-900 py-4">
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Alternative Channels</span>
            <div className="flex gap-4 text-zinc-500">
              <Link href="https://www.facebook.com/avenex" target="_blank" className="hover:text-white transition-colors"><SiFacebook size={16} /></Link>
              <Link href="https://www.instagram.com/avenex.io/" target="_blank" className="hover:text-white transition-colors"><SiInstagram size={16} /></Link>
              <Link href="https://www.linkedin.com/company/avenex-io/" target="_blank" className="hover:text-white transition-colors"><FaLinkedinIn size={16} /></Link>
              <Link href="https://x.com/avenexhq" target="_blank" className="hover:text-white transition-colors"><SiX size={16} /></Link>
            </div>
          </div>

          {status.msg && (
            <div className={`p-4 text-[11px] font-mono border rounded-none tracking-wide ${status.type === "success" ? "text-green-500 bg-green-950/20 border-green-900" : "text-red-500 bg-red-950/20 border-red-900"}`}>
              {status.msg}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-zinc-200 uppercase text-[10px] tracking-[0.25em] font-bold py-6 rounded-none transition-colors duration-300">
            {loading ? "Transmitting Specification..." : "Submit Requirements"}
          </Button>
        </form>
      </div>
    </main>
  );
}