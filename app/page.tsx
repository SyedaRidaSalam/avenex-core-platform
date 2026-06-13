import Link from "next/link";

const coreCapabilities = [
  {
    num: "01",
    label: "PRECISION",
    title: "Zero-Bloat Engineering",
    desc: "We operate on a 'zero-bloat' philosophy. Every line of code is audited for efficiency, ensuring your infrastructure is lean, memory-optimized, and free from legacy bottlenecks.",
  },
  {
    num: "02",
    label: "VELOCITY",
    title: "Agile Rapid-Ship",
    desc: "Built for market speed. We utilize modular, decoupled architectures that allow us to ship features and pivot system requirements at enterprise speed without compromising stability.",
  },
  {
    num: "03",
    label: "SCALABILITY",
    title: "Future-Proof Foundation",
    desc: "Our systems are architected for the long-term. We build with the assumption of 100x growth, implementing horizontal scaling and distributed logic from day one.",
  },
];

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* 1. HERO SECTION - Grid added here */}
      <section className="hero-grid max-w-7xl mx-auto px-6 pt-40 pb-24 flex flex-col items-center text-center">
        <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase mb-4 block animate-pulse">
          Global Software Systems
        </span>
        <h1 className="text-4xl md:text-7xl font-light tracking-tight max-w-4xl leading-[1.1] mb-8">
          Next-Generation Platforms Engineered for{" "}
          <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-br from-zinc-200 via-zinc-400 to-zinc-700">
            Scale
          </span>
        </h1>
        <p className="text-zinc-400 max-w-xl text-xs md:text-sm font-light leading-relaxed tracking-wide mb-12">
          Avenex builds robust, high-performance software systems tailored for
          enterprise demands. From modular digital architectures to seamless
          computational integrations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="bg-white text-black hover:bg-zinc-200 uppercase text-[10px] tracking-[0.25em] font-bold px-10 py-4 transition-colors duration-300 text-center"
          >
            Get Started
          </Link>
          <Link
            href="/insights"
            className="border border-zinc-800 text-white hover:bg-zinc-950 uppercase text-[10px] tracking-[0.25em] font-bold px-10 py-4 transition-colors duration-300 text-center"
          >
            System Insights
          </Link>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES (Bento Grid) */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {coreCapabilities.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-zinc-950/30 border border-zinc-900 p-8 flex flex-col justify-between hover:border-zinc-700 transition-all duration-500"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-zinc-500 block tracking-widest">
                  {item.num} / {item.label}
                </span>
                <h3 className="text-lg font-medium tracking-wider uppercase text-zinc-100">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-zinc-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRUSTED BY SECTION
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-zinc-900">
        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 text-center mb-8">
          Infrastructure deployed for
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <span className="text-xl font-bold tracking-tighter text-zinc-500 italic">SIEMENS</span>
          <span className="text-xl font-bold tracking-tighter text-zinc-500 italic">TRIVAGO</span>
          <span className="text-xl font-bold tracking-tighter text-zinc-500 italic">AVENEX CORE</span>
        </div>
      </section> */}
    </main>
  );
}
