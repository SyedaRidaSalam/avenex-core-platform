"use client";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function JobDetailModal({ job, onClose }: { job: any, onClose: () => void }) {
  
  // Modal khulne par background scroll lock karne ke liye
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-[3px] animate-in fade-in duration-500" 
      onClick={onClose}
    >
      <div 
        // Is div mein "animate-in slide-in-from-right" se animation smooth ho jayegi
        className="w-full max-w-xl bg-zinc-950 border-l border-zinc-900 h-screen flex flex-col shadow-2xl cursor-default animate-in slide-in-from-right duration-500 ease-in-out"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header Section */}
        <div className="p-8 border-b border-zinc-900 flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 tracking-[0.4em] uppercase block">
              {job.department} / {job.location}
            </span>
            <h2 className="text-3xl font-light text-white tracking-tight leading-tight">
              {job.title}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Section (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          <div className="space-y-6">
            <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">
              Role Specification
            </h4>
            <div className="text-zinc-400 text-sm leading-relaxed font-light whitespace-pre-line"  dangerouslySetInnerHTML={{ __html: job.description || "" }} />
          </div>
          
          <div className="pt-8 border-t border-zinc-900">
             <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-mono text-zinc-600 uppercase mb-1">Employment Type</p>
                  <p className="text-zinc-300 text-xs uppercase tracking-widest">{job.type}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-600 uppercase mb-1">Posted Date</p>
                  <p className="text-zinc-300 text-xs uppercase tracking-widest">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
             </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="p-8 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
           <p className="text-[10px] font-mono text-zinc-500 mb-4 tracking-tight">
             * Apply through the talent pipeline button on the main careers page.
           </p>
           {/* Yahan aap ApplyButton bhi rakh sakte ho agar chahein */}
        </div>
      </div>
    </div>
  );
}