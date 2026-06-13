import { prisma } from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 0; // Freshness ke liye

export default async function InsightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const insight = await prisma.insights.findUnique({ where: { id: id } });

  if (!insight) notFound();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* 1. Hero Image with Enhanced Bottom Gradient */}
      {insight.imageUrl && (
        <div className="relative w-full h-[50vh] overflow-hidden">
          <Image
            src={insight.imageUrl}
            alt={insight.title}
            fill
            className="object-cover scale-[1.02]"
            priority
          />
          {/* Yahan dark gradient badha diya hai (from-black/90) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      {/* 2. Article Wrapper */}
      <article className="max-w-3xl mx-auto px-6 -mt-20 relative z-10 pb-24">
        {/* Metadata */}
        <div className="flex items-center gap-4 mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
          <span className="border border-zinc-800 px-3 py-1 bg-black">
            {insight.category}
          </span>
          <span>{new Date(insight.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-8 text-zinc-100">
          {insight.title}
        </h1>

        {/* Short Description (Premium Intro) */}
        <p className="text-xl text-zinc-400 font-light mb-12 italic border-l border-zinc-800 pl-6">
          {insight.description}
        </p>

        {/* Rich Content - Custom Styling */}
        <div
          className="prose prose-invert prose-lg prose-zinc max-w-none 
          prose-headings:font-light prose-headings:tracking-tight 
          prose-p:text-zinc-400 prose-p:leading-relaxed 
          prose-a:text-white prose-a:underline hover:prose-a:text-zinc-400
          prose-strong:text-white prose-strong:font-medium"
          dangerouslySetInnerHTML={{ __html: insight.content || "" }}
        />
      </article>
    </main>
  );
}
