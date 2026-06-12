import { prisma } from "@/lib/db";

// Server-side fetching: Neon DB se real jobs uthana
async function getActiveJobs() {
  try {
    return await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }
}

export default async function CareersPage() {
  const openPositions = await getActiveJobs();

  return (
    <main className="bg-black text-white min-h-screen pt-40 px-6">
      <div className="max-w-7xl mx-auto space-y-16 pb-24">
        {/* Header */}
        <div className="max-w-xl space-y-2">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] block">
            04 / TALENT PIPELINE
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight">JOIN AVENEX SYSTEMS</h1>
          <p className="text-xs text-zinc-400 font-light tracking-wide leading-relaxed">
            We are constantly tracking elite software engineers capable of building low-latency distributed networks and fault-tolerant cloud engines.
          </p>
        </div>

        {/* Dynamic Positions Panel */}
        <div className="border-t border-zinc-900 divide-y divide-zinc-900">
          {openPositions.length === 0 ? (
            <div className="py-12 text-xs font-mono text-zinc-600 tracking-widest uppercase">
              No active openings currently logged in global operations node.
            </div>
          ) : (
            openPositions.map((job) => (
              <div 
                key={job.id} 
                className="py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-zinc-950/40 px-2 transition-colors duration-200"
              >
                <div className="space-y-1">
                  <h3 className="text-base font-medium text-zinc-200 tracking-wide">{job.title}</h3>
                  <div className="flex gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-[10px] font-mono border border-zinc-800 px-3 py-1 text-zinc-400 uppercase tracking-widest">
                    Full-Time
                  </span>
                  <button className="bg-white text-black text-[10px] tracking-[0.2em] font-bold uppercase px-6 py-2.5 hover:bg-zinc-200 transition-colors duration-200">
                    Apply
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}