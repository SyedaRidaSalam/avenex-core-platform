"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/utils/uploadthing";
import { X } from "lucide-react";

export default function ApplyButton({
  jobs = [],
  currentJobId,
}: {
  jobs?: any[];
  currentJobId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeUrl) {
      alert("Please upload your PDF resume first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/jobs/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: currentJobId,
          name: formData.name,
          email: formData.email,
          resumeUrl: resumeUrl,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (err) {
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setIsSubmitted(false);
          setResumeUrl("");
          setProgress(0);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-white text-black hover:bg-zinc-200 text-[10px] uppercase tracking-[0.2em] font-bold rounded-none px-6 py-2.5">
          Apply
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-black border border-zinc-800 text-white sm:max-w-xl rounded-none p-10">
        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="text-4xl text-green-500">✓</div>
            <DialogTitle className="text-xl uppercase tracking-widest">
              Application Submitted
            </DialogTitle>
            <p className="text-zinc-500 text-sm">
              Thank you for your interest. We have received your application and
              will review it soon.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl tracking-widest uppercase font-light">
                Apply for Position
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                  Target Position
                </Label>
                <div className="bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-300">
                  {jobs?.find((j) => j.id === currentJobId)?.title ||
                    "Selected Position"}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                    Full Name
                  </Label>
                  <Input
                    required
                    placeholder="Enter Name"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-zinc-950 border-zinc-800 rounded-none h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                    Email
                  </Label>
                  <Input
                    required
                    type="email"
                    placeholder="email@example.com"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-zinc-950 border-zinc-800 rounded-none h-10"
                  />
                </div>
              </div>
              <div className="space-y-2 border border-zinc-700 p-4 bg-zinc-950">
                <Label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                  Resume / CV (PDF Only)
                </Label>

                {resumeUrl ? (
                  // Sirf tab dikhega jab file ACTUAL upload ho jayegi
                  <div className="flex items-center justify-between bg-zinc-900 px-3 py-2 border border-green-900 text-green-500 text-xs">
                    <span className="font-mono">✓ PDF ATTACHED</span>
                    <button
                      type="button"
                      onClick={() => setResumeUrl("")}
                      className="hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-start gap-2">
                    <UploadButton
                      endpoint="pdfUploader"
                      onUploadBegin={() => setProgress(1)} // Upload start hua
                      onClientUploadComplete={(res: any) => {
                        if (res && res[0].url) {
                          setResumeUrl(res[0].url); // Ab state update hoga
                        }
                      }}
                      onUploadError={(error: Error) => {
                        alert(`Upload Error: ${error.message}`);
                        setProgress(0);
                      }}
                      appearance={{
                        button:
                          "bg-zinc-800 text-white text-[10px] px-4 py-2 hover:bg-zinc-700",
                        allowedContent: "hidden",
                      }}
                    />
                    {progress > 0 && !resumeUrl && (
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                        Uploading...
                      </p>
                    )}
                  </div>
                )}
              </div>
              <Button
                type="submit"
                disabled={loading || !resumeUrl}
                className="w-full bg-white text-black hover:bg-zinc-200 uppercase text-[10px] tracking-[0.2em] font-bold rounded-none py-7 mt-4"
              >
                {loading ? "Sending Application..." : "Submit Application"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
