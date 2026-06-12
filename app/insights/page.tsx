import { prisma } from "@/lib/db";

// Server-side dynamic database fetch (Super fast execution)
async function getInsightsData() {
  try {
    return await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function InsightsPage() {
  const articles = await getInsightsData();

  return (
    <main className="bg-black text-white min-h-screen pt-40 px-6">
      <div className="max-w-7xl mx-auto space-y-16 pb-24">
        {/* Header */}
        <div className="max-w-xl space-y-2">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] block">
            03 / KNOWLEDGE BASE
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight">AVENEX INSIGHTS</h1>
          <p className="text-xs text-zinc-400 font-light tracking-wide leading-relaxed">
            Critical analysis and technical research documentation straight from our systems engineering core.
          </p>
        </div>

        {/* Dynamic Articles Container */}
        <div className="border-t border-zinc-900 divide-y divide-zinc-900">
          {articles.length === 0 ? (
            <div className="py-12 text-xs font-mono text-zinc-600 tracking-widest uppercase">
              No technical documents currently synchronized in server core.
            </div>
          ) : (
            articles.map((art) => (
              <article key={art.id} className="py-12 grid grid-cols-1 md:grid-cols-4 gap-6 items-start group cursor-pointer">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-zinc-600 block tracking-widest">
                    {new Date(art.createdAt).toLocaleDateString("en-US", { month: 'short', year: 'numeric' }).toUpperCase()}
                  </span>
                  <span className="text-[9px] font-mono bg-zinc-950 border border-zinc-900 text-zinc-400 px-2 py-0.5 inline-block tracking-widest uppercase">
                    Architecture
                  </span>
                </div>
                <div className="md:col-span-3 space-y-3">
                  <h3 className="text-lg font-medium text-zinc-200 tracking-wide group-hover:text-white transition-colors duration-200">
                    {art.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-3xl">
                    {art.content}
                  </p>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors duration-200 font-bold block pt-2">
                    Read Document →
                  </span>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}