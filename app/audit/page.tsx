"use client";

import { useEffect } from 'react';

export default function AuditPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
  

   <main className="bg-black text-white min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Header */}
        <div className="max-w-xl space-y-2">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] block">
           08 / Diagnostic Protocol
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight uppercase">
              Architecture
            <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-br from-zinc-200 via-zinc-400 to-zinc-700">
             &nbsp; Diagnostic
            </span>
          </h1>

          <p className="text-xs md:text-sm mt-5 text-zinc-400 font-light tracking-wide leading-relaxed">
             Technical debt is the silent killer of scale. We identify bottlenecks and engineer the path to 10x throughput. Book your 15-minute diagnostic session below.
       
          </p>
        </div>
        {/* Audit Bento Grid Component - Matches Landing Page Hover Effect */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Latency Audit", desc: "Precise identification of query-timeout roots and inefficient data pathways." },
            { title: "Resilience Test", desc: "Stress-testing your modular foundations against unexpected traffic spikes." },
            { title: "Scaling Roadmap", desc: "Architectural blueprint tailored for your next enterprise-level growth phase." }
          ].map((item, i) => (
            <div key={i} className="group relative overflow-hidden bg-zinc-950/30 border border-zinc-900 p-8 flex flex-col justify-between hover:border-zinc-700 transition-all duration-500">
              <h3 className="text-[12px] uppercase tracking-[0.3em] font-bold text-zinc-200 mb-3">{item.title}</h3>
              <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-light">{item.desc}</p>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-zinc-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </section>

        {/* Calendly Section - Premium Dashboard Styling */}
        <section className="group relative bg-zinc-950/30 border border-zinc-900 p-1 transition-all duration-500 hover:border-zinc-700">
          <div className="p-8 border-b border-zinc-900 flex justify-between items-center bg-black/50">
             <h3 className="text-[12px] uppercase tracking-[0.3em] font-bold text-zinc-400">System Integration: Availability Calendar</h3>
             <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                <div className="w-2 h-2 rounded-full bg-zinc-700" />
                <div className="w-2 h-2 rounded-full bg-zinc-600" />
             </div>
          </div>
          <div className="overflow-hidden h-[700px] w-full bg-white">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/avenex-io/avenex-architecture-audit" 
              style={{ minWidth: '320px', height: '100%' }}
            ></div>
          </div>
        </section>

      </div>
    </main>
  );
}