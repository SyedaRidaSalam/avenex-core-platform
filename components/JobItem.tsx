"use client";
import { useState } from "react";
import JobDetailModal from "./JobDetailModal";
import ApplyButton from "./ApplyButton";

export default function JobItem({ job, openPositions }: { job: any, openPositions: any[] }) {
  const [selectedJob, setSelectedJob] = useState<any>(null);

  return (
    <>
      <div className="py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-zinc-950/40 px-2 transition-colors duration-200">
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
            {job.type}
          </span>
          <button
            onClick={() => setSelectedJob(job)}
            className="text-[10px] font-mono text-white hover:text-zinc-400 uppercase tracking-widest transition-colors underline underline-offset-4"
          >
            View Job
          </button>
          <ApplyButton jobs={openPositions} currentJobId={job.id} />
        </div>
      </div>

      {selectedJob && (
        <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </>
  );
}