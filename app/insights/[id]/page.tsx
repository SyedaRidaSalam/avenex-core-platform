import { prisma } from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";

// Next.js 15+ ke liye params promise-based hote hain
export default async function InsightPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  // Database se data fetch karein
  const insight = await prisma.insights.findUnique({ 
    where: { id: id } 
  });

  // Agar record na mile
  if (!insight) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      {/* Image Section */}
      {insight.imageUrl && (
        <div className="relative w-full h-[40vh] border-b border-zinc-900 overflow-hidden">
          <Image 
            src={insight.imageUrl} 
            alt={insight.title || "Insight image"} 
            fill 
            className="object-cover opacity-60" 
            priority
            sizes="100vw"
          />
        </div>
      )}
      
      {/* Content Section */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <span className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase">
          {insight.category}
        </span>
        <h1 className="text-4xl md:text-6xl font-light mt-4 mb-8">
          {insight.title}
        </h1>
        
        {/* Yahan HTML render ho raha hai, ab bold, H2 aur list sab dikhega */}
        <div 
          className="prose prose-invert prose-sm md:prose-base max-w-none leading-relaxed text-zinc-300"
          dangerouslySetInnerHTML={{ __html: insight.content || "" }} 
        />
      </article>
    </main>
  );
}