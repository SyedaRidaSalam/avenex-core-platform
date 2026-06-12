import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900 bg-black py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-sm font-bold tracking-[0.3em] text-white">AVENEX</span>
          <p className="text-xs text-zinc-500 mt-2 font-light">
            Next-generation enterprise software architecture. Engineered for international scale.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-8 text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-medium">
          <Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
          <span className="text-zinc-600 select-none">© {currentYear} AVENEX GLOBAL. ALL RIGHTS RESERVED.</span>
        </div>
      </div>
    </footer>
  );
}