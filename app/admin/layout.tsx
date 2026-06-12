import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-950 text-white min-h-screen flex flex-col md:flex-row pt-20">
      {/* Sidebar Control Node */}
      <aside className="w-full md:w-64 bg-black border-r border-zinc-900 p-6 flex flex-col gap-6">
        <div>
          <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block">Operational Core</span>
          <h2 className="text-sm font-bold tracking-wider text-zinc-300">AVENEX ADMIN</h2>
        </div>
        
        <nav className="flex flex-col gap-3 text-xs font-mono tracking-wide">
          <Link href="/admin" className="text-zinc-400 hover:text-white p-2 hover:bg-zinc-900 transition-all">
            // CORE OVERVIEW
          </Link>
          <Link href="/admin/insights" className="text-zinc-400 hover:text-white p-2 hover:bg-zinc-900 transition-all">
            // MANAGE INSIGHTS
          </Link>
          <Link href="/admin/careers" className="text-zinc-400 hover:text-white p-2 hover:bg-zinc-900 transition-all">
            // MANAGE CAREERS
          </Link>
        </nav>
      </aside>

      {/* Dynamic Content Panel */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}