import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900 bg-black pt-20 pb-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid: Company Info + Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-xl font-bold tracking-tighter text-white">AVENEX</span>
            <p className="text-xs md:text-sm text-zinc-500 max-w-sm leading-relaxed mt-3">
              Engineering the next generation of distributed systems. Built for performance, security, and global scale.
            </p>
          </div>

          {/* Links Column */}
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-mono text-zinc-600 uppercase tracking-[0.2em] mb-2">Platform</span>
            <Link href="/insights" className="text-xs md:text-sm text-zinc-400 hover:text-white transition-colors duration-200">Insights</Link>
            <Link href="/careers" className="text-xs md:text-sm text-zinc-400 hover:text-white transition-colors duration-200">Careers</Link>
            <Link href="/about" className="text-xs md:text-sm text-zinc-400 hover:text-white transition-colors duration-200">Company</Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-mono text-zinc-600 uppercase tracking-[0.2em] mb-2">Legal</span>
            <Link href="/privacy" className="text-xs md:text-sm text-zinc-400 hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="text-xs md:text-sm text-zinc-400 hover:text-white transition-colors duration-200">Terms of Service</Link>
            <Link href="/contact" className="text-xs md:text-sm text-zinc-400 hover:text-white transition-colors duration-200">Support</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-[12px] text-zinc-600 tracking-widest font-mono uppercase">
            © {currentYear} Avenex Systems. All rights reserved.
          </p>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] text-zinc-500 uppercase tracking-widest">System Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}