"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/utils/uploadthing";
import RichTextEditor from "@/components/RichTextEditor";
import { X } from "lucide-react";

export default function AdminInsights() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // Naya field add kiya
  const [category, setCategory] = useState("ARCHITECTURE");
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, content, category, imageUrl }),
      });

      if (res.ok) {
        setMessage({
          text: "✓ Article published successfully.",
          type: "success",
        });
        // Sab reset kar diya
        setTitle("");
        setDescription("");
        setContent(""); // Ye RichTextEditor ko trigger karega reset hone ke liye
        setImageUrl("");
        setCategory("ARCHITECTURE");
      } else {
        setMessage({
          text: "✕ Transmission failed. Check server endpoints.",
          type: "error",
        });
      }
    } catch (err) {
      setMessage({ text: "✕ Infrastructure link fault.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-8 mt-10">
      <div className="space-y-1">
        <span className="text-[12px] font-mono text-zinc-600 uppercase tracking-[0.4em] block">
          Admin Portal
        </span>
        <h1 className="text-2xl font-light tracking-tight">
          PUBLISH NEW INSIGHT
        </h1>
      </div>

      <form
        onSubmit={handlePublish}
        className="space-y-6 pt-6 border-t border-zinc-900"
      >
        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">
            Banner Image
          </label>
          <div className="space-y-2 border border-zinc-700 p-4 bg-zinc-950">
            {imageUrl ? (
              <div className="flex items-center justify-between bg-zinc-900 px-3 py-2 border border-green-900 text-green-500 text-xs">
                <span className="font-mono">✓ IMAGE ATTACHED</span>
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-2">
                <UploadButton
                  endpoint="imageUploader"
                  onUploadBegin={() => setProgress(1)}
                  onClientUploadComplete={(res: any) => {
                    if (res && res[0].url) {
                      setImageUrl(res[0].url);
                      setProgress(0);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`Upload Error: ${error.message}`);
                    setProgress(0);
                  }}
                  appearance={{
                    button: "bg-zinc-800 text-white text-[10px] px-4 py-2 hover:bg-zinc-700 rounded-none",
                    allowedContent: "hidden",
                  }}
                />
                {progress > 0 && !imageUrl && (
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest animate-pulse">
                    UPLOADING...
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">
            Document Title
          </label>
          <Input
            required
            type="text"
            placeholder="e.g., Market Analysis 2026..."
            className="bg-black border-zinc-900 rounded-none text-white text-xs h-11 focus-visible:ring-zinc-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">
            Short Description
          </label>
          <Input
            required
            type="text"
            placeholder="Brief summary for list view..."
            className="bg-black border-zinc-900 rounded-none text-white text-xs h-11 focus-visible:ring-zinc-700"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">
            Category Badge
          </label>
          <select
            className="bg-black border-zinc-900 w-full text-white text-xs h-11 p-2 focus:ring-zinc-700 border"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="ARCHITECTURE">ARCHITECTURE</option>
            <option value="ENGINEERING">ENGINEERING</option>
            <option value="SECURITY">SECURITY</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">
            Technical Content
          </label>
          <RichTextEditor
            content={content}
            onChange={(html: string) => setContent(html)}
          />
        </div>

        {message && (
          <p
            className={`text-[11px] font-mono tracking-wide p-3 border ${
              message.type === "success"
                ? "text-green-500 bg-green-950/20 border-green-900"
                : "text-red-500 bg-red-950/20 border-red-900"
            }`}
          >
            {message.text}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black hover:bg-zinc-200 text-[10px] tracking-[0.25em] uppercase font-bold py-6 rounded-none transition-colors"
        >
          {loading ? "Publishing.." : "PUBLISH DOCUMENT"}
        </Button>
      </form>
    </div>
  );
}