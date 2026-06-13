export default function AboutPage() {
  return (
   <main className="bg-black text-white min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        <div className="space-y-2 mb-16">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] block">
            05 / THE AVENEX ORIGIN
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white uppercase">
            Built for <span className="text-zinc-500">Speed.</span>
            <br />
            Engineered for <span className="text-zinc-500">Scale.</span>
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 font-light tracking-wide leading-relaxed max-w-xl mt-5">
            Avenex Systems is a high-growth technology startup born from the
            necessity for cleaner, more performant software architectures. We
            engineer fault-tolerant, low-latency distributed systems for the
            modern enterprise.
          </p>
        </div>

        {/* Main Philosophy Section - Mobile pe block, desktop pe grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 border-t border-zinc-900 pt-12 md:pt-16">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide">
              The Startup Mindset
            </h2>
            <p className="text-xs md:text-sm md:text-sm text-zinc-400 font-light leading-relaxed">
              Avenex Systems is a high-growth technology startup born from the
              necessity for cleaner, more performant software architectures.
              While others bloat their stacks with legacy dependencies, we build
              from the ground up using modern, type-safe, and low-latency
              principles.
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide">
              Our Commitment
            </h2>
            <p className="text-xs md:text-sm md:text-sm text-zinc-400 font-light leading-relaxed">
              We are a team of engineers obsessed with technical debt removal
              and computational efficiency. As a startup, we possess the agility
              to pivot quickly and the technical depth to solve the most complex
              distributed system challenges.
            </p>
          </div>
        </div>

        {/* Interactive/Highlight Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mt-16 md:mt-24">
          {[
            {
              label: "Agility",
              desc: "Rapid deployment cycles that match market demands.",
            },
            {
              label: "Precision",
              desc: "No unnecessary layers. Just pure, functional code.",
            },
            {
              label: "Ambition",
              desc: "Redefining how enterprise software is architected.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="border border-zinc-900 p-6 md:p-8 hover:border-zinc-700 transition-all duration-300 group cursor-default"
            >
              <h3 className="text-xs md:text-sm font-medium mb-2 md:mb-3 group-hover:text-zinc-300 uppercase tracking-widest">
                {item.label}
              </h3>
              <p className="text-xs md:text-sm text-zinc-500 font-light group-hover:text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
