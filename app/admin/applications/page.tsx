import { prisma } from "@/lib/db";

export default async function ApplicationsPage() {
  // Relation include kiya taaki job details mil sakein
  const apps = await prisma.jobApplication.findMany({ 
    include: { job: true }, 
    orderBy: { createdAt: "desc" } 
  });

  return (
    <div className="max-w-6xl space-y-8 mt-10">
      <div className="space-y-1">
        <span className="text-[12px] font-mono text-zinc-600 uppercase tracking-[0.4em] block">Vacancies Data</span>
        <h1 className="text-2xl font-light tracking-tight">INCOMING APPLICATIONS</h1>
      </div>

      <div className="border-t border-zinc-900 pt-6">
        <table className="w-full text-left text-[11px] text-zinc-400 border-collapse">
          <thead className="text-zinc-600 uppercase tracking-widest border-b border-zinc-900">
            <tr>
              <th className="pb-4 font-bold">Candidate</th>
              <th className="pb-4 font-bold">Email</th>
              <th className="pb-4 font-bold">Position</th>
              <th className="pb-4 font-bold">Type</th>
              <th className="pb-4 font-bold">Timestamp</th>
              <th className="pb-4 font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {apps.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-zinc-600 font-mono tracking-widest uppercase text-center">
                  No incoming signals in pipeline.
                </td>
              </tr>
            ) : (
              apps.map((app: any) => (
                <tr key={app.id} className="hover:bg-zinc-950/40 transition-colors text-xs">
                  <td className="py-4 text-white  tracking-wide">{app.name}</td>
                  <td className="py-4 font-mono text-zinc-500">{app.email}</td>
                  
                  {/* Dynamically Position aur Job Type */}
                  <td className="py-4 text-zinc-300">{app.job?.title || "N/A"}</td>
                  <td className="py-4 uppercase tracking-widest text-[9px] text-zinc-600">
                    {app.job?.type || "N/A"}
                  </td>
                  
                  <td className="py-4 font-mono">{new Date(app.createdAt).toLocaleDateString()}</td>
                  
                  {/* Download Resume Link */}
                  <td className="py-4">
                    {app.resumeUrl ? (
                      <a 
                        href={app.resumeUrl} 
                        target="_blank" 
                        className="text-white hover:text-zinc-400 underline decoration-zinc-800 underline-offset-4 uppercase tracking-widest"
                      >
                        Download CV
                      </a>
                    ) : (
                      <span className="text-zinc-700 italic">No file</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}