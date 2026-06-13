import { prisma } from "@/lib/db";
import JobItem from "@/components/JobItem";

async function getActiveJobs() {
  return await prisma.job.findMany({ orderBy: { createdAt: "desc" } });
}
export const revalidate = 0;

export default async function CareersPage() {
  const openPositions = await getActiveJobs();

  return (
     <main className="bg-black text-white min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        <div className="max-w-xl space-y-2">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] block">
            06 / Engineering the future
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight">JOIN With<span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-br from-zinc-200 via-zinc-400 to-zinc-700">
            &nbsp;AVENEX
            </span></h1>
          <p className="text-xs md:text-sm mt-5 text-zinc-400 font-light tracking-wide leading-relaxed">
            We are constantly tracking elite software engineers capable of building low-latency distributed networks and fault-tolerant cloud engines.
          </p>
        </div>

        {/* Dynamic Positions */}
        <div className="border-t border-zinc-900 divide-y divide-zinc-900">
          {openPositions.length === 0 ? (
            <div className="py-12 text-xs font-mono text-zinc-600 tracking-widest uppercase">
              No active openings currently logged in global operations node.
            </div>
          ) : (
            openPositions.map((job) => (
              <JobItem key={job.id} job={job} openPositions={openPositions} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}