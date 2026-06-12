export default function SolutionsPage() {
  const coreSolutions = [
    {
      num: "01",
      title: "Custom Enterprise Architectures",
      desc: "Engineered for massive transaction volume and high availability. Decoupled microservices that scale horizontally without performance degradation."
    },
    {
      num: "02",
      title: "Automated Core APIs & Bridges",
      desc: "Ultra-fast pipeline bridges built on cloud-native structures. Secure endpoints connecting internal logistics with client-facing platforms."
    },
    {
      num: "03",
      title: "High-Performance SaaS Ecosystems",
      desc: "Zero-bloat product design for global cloud platforms. Minimal latency, state-of-the-art memory handling, and bulletproof database syncing."
    }
  ];

  return (
    <main className="bg-black text-white min-h-screen pt-40 px-6">
      <div className="max-w-7xl mx-auto space-y-16 pb-24">
        {/* Header */}
        <div className="max-w-xl space-y-2">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] block">02 / CAPABILITIES</span>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight">OUR ARCHITECTURAL SOLUTIONS</h1>
          <p className="text-xs text-zinc-400 font-light tracking-wide leading-relaxed">
            Industrial-grade software execution designed strictly for performance, scalability, and long-term tech stability.
          </p>
        </div>

        {/* Structural Stack Grid */}
        <div className="border-t border-zinc-900 divide-y divide-zinc-900">
          {coreSolutions.map((sol) => (
            <div key={sol.num} className="py-12 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              <span className="text-xs font-mono text-zinc-600 tracking-widest">{sol.num} / PROTOCOL</span>
              <div className="md:col-span-2 space-y-2">
                <h3 className="text-lg font-medium text-zinc-200 tracking-wide">{sol.title}</h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">{sol.desc}</p>
              </div>
              <div className="text-right hidden md:block">
                <span className="text-[10px] uppercase tracking-widest bg-zinc-950 border border-zinc-900 text-zinc-400 px-3 py-1 font-mono">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}