export default function SolutionsPage() {
  const coreSolutions = [
    {
      num: "01",
      title: "Enterprise Web Architecture",
      desc: "Robust, scalable, and high-conversion web ecosystems built for heavy traffic and operational efficiency.",
    },
    {
      num: "02",
      title: "AI & SaaS Integration",
      desc: "Seamlessly embedding predictive intelligence and automated computational engines into your existing business logic.",
    },
    {
      num: "03",
      title: "Cloud Infrastructure & DevOps",
      desc: "Managed cloud environments designed for horizontal scaling, 99.9% availability, and automated deployments.",
    },
    {
      num: "04",
      title: "System Integration & API Engineering",
      desc: "Bridging complex third-party platforms with your core systems for unified, real-time data synchronization.",
    },
    {
      num: "05",
      title: "Continuous Maintenance & Security",
      desc: "Proactive infrastructure monitoring, security hardening, and performance optimization to ensure long-term stability.",
    },
  ];

  return (
    <main className="bg-black text-white min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Header */}
        <div className="max-w-xl space-y-2">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] block">
            02 / CAPABILITIES
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight">
            OUR ARCHITECTURAL
            <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-br from-zinc-200 via-zinc-400 to-zinc-700">
             &nbsp; SOLUTIONS
            </span>
          </h1>

          <p className="text-xs md:text-sm mt-5 text-zinc-400 font-light tracking-wide leading-relaxed">
            Industrial-grade software execution designed strictly for
            performance, scalability, and long-term tech stability.
          </p>
        </div>

        {/* Structural Stack Grid */}
        <div className="border-t border-zinc-900 divide-y divide-zinc-900">
          {coreSolutions.map((sol) => (
            // 'py-8 md:py-12' se rows ke beech ka space mobile par compact kar diya
            <div
              key={sol.num}
              className="py-8 md:py-12 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-start"
            >
              <span className="text-xs md:text-sm font-mono text-zinc-600 tracking-widest">
                {sol.num} / PROTOCOL
              </span>
              <div className="md:col-span-2 space-y-2">
                <h3 className="text-sm md:text-lg font-medium text-zinc-200 tracking-wide">
                  {sol.title}
                </h3>
                <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
                  {sol.desc}
                </p>
              </div>
              <div className="text-right hidden md:block">
                <span className="text-xs uppercase tracking-widest bg-zinc-950 border border-zinc-900 text-zinc-400 px-3 py-1 font-mono">
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
