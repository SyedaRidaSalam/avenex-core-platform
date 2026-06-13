import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-40 pb-24 flex flex-col items-center text-center">
        <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase mb-4 block animate-pulse">
          Global Software Systems
        </span>
        <h1 className="text-4xl md:text-7xl font-light tracking-tight max-w-4xl leading-[1.1] mb-8">
          Next-Generation Platforms Engineered for{" "}
          <span className="text-zinc-400 font-normal">Scale</span>
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

      {/* 2. CORE CAPABILITIES GRID (The Siemens/Trivago Minimal Style) */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-zinc-600 block tracking-widest">
              01 / CAPABILITY
            </span>
            <h3 className="text-base font-medium tracking-wider uppercase text-zinc-200">
              Enterprise Engineering
            </h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              We design decoupled, scalable microservices and solid database
              APIs that form the core backbone of global commercial software
              platforms.
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-mono text-zinc-600 block tracking-widest">
              02 / CAPABILITY
            </span>
            <h3 className="text-base font-medium tracking-wider uppercase text-zinc-200">
              Adaptive Computations
            </h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Incorporate predictive workflows, modern processing endpoints, and
              customized server-side logic directly into core business
              operations.
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-mono text-zinc-600 block tracking-widest">
              03 / CAPABILITY
            </span>
            <h3 className="text-base font-medium tracking-wider uppercase text-zinc-200">
              High-Performance Specs
            </h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Zero bloat design. Our tech stack layouts ensure rapid data
              delivery speeds, minimal overhead metrics, and constant cloud
              synchronization.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
