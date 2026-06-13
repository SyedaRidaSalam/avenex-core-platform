export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Title */}
        <div className="space-y-2 mb-16">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] block">
            04 / THE AVENEX ORIGIN
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white uppercase">
            Built for<span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-br from-zinc-200 via-zinc-400 to-zinc-700"> &nbsp;Speed </span>
            <br />
            Engineered for<span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-br from-zinc-200 via-zinc-400 to-zinc-700"> &nbsp;Scale </span>
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 font-light tracking-wide leading-relaxed max-w-xl mt-5">
            Avenex Systems is a high-growth technology startup born from the necessity for cleaner, more performant software architectures.
          </p>
        </div>

        {/* Founder Section - Naya Section */}
        <div className="border-t border-zinc-900 pt-16 space-y-8">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-mono">05 / Founder's Vision</h2>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-light tracking-tight italic">Syeda Rida Salam</h3>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Founder & Lead Full Stack Engineer</p>
            </div>
            <div className="flex-[2] space-y-4 text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              <p>
                Avenex was founded with a singular purpose: to solve the friction in modern software infrastructure. Born and raised in Pakistan, I witnessed firsthand the transformative power of technology when scaled correctly. 
              </p>
              <p>
                My journey as a Full Stack Developer has been defined by an obsession with precision. I started Avenex to bridge the gap between complex enterprise requirements and clean, high-performance distributed systems. We aren't just writing code; we are building the backbone of digital growth.
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 border-t border-zinc-900 pt-16">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide">The Startup Mindset</h2>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              While others bloat their stacks with legacy dependencies, we build from the ground up using modern, type-safe, and low-latency principles.
            </p>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-xl md:text-2xl font-light tracking-wide">Our Commitment</h2>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              We are obsessed with technical debt removal. We possess the agility to pivot quickly and the technical depth to solve the most complex distributed system challenges.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 auto-rows-[180px] mt-16 md:mt-24">
          {[
            { label: "Agility", desc: "Rapid deployment cycles that match market demands." },
            { label: "Precision", desc: "No unnecessary layers. Just pure, functional code." },
            { label: "Ambition", desc: "Redefining how enterprise software is architected." },
          ].map((item, idx) => (
            <div key={idx} className="group relative overflow-hidden bg-zinc-950/30 border border-zinc-900 p-6 flex flex-col justify-center hover:border-zinc-700 transition-all duration-300">
              <div className="absolute inset-0 z-0 bg-zinc-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div className="relative z-10 space-y-2">
                <h3 className="text-[12px] font-medium tracking-[0.2em] uppercase text-zinc-100 group-hover:text-white transition-colors">{item.label}</h3>
                <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}