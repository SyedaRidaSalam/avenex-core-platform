"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/RichTextEditor"; // Editor import kiya

export default function AdminCareers() {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState(""); // Editor ka content yahan aayega
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Auto-dismiss logic
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInjectJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          department,
          location,
          type,
          description,
        }),
      });

      if (res.ok) {
        setMessage({
          text: "✓ Career opening successfully published.",
          type: "success",
        });
        setTitle("");
        setDepartment("");
        setLocation("");
        setType("");
        setDescription("");
      } else {
        setMessage({ text: "✕ API verification error.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "✕ Pipeline injection failed.", type: "error" });
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
        <h1 className="text-2xl font-light tracking-tight">ADD NEW OPENING</h1>
      </div>

      <form
        onSubmit={handleInjectJob}
        className="space-y-6 pt-6 border-t border-zinc-900"
      >
        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">
            Job Title
          </label>
          <Input
            required
            type="text"
            placeholder="e.g., Senior Systems Architect"
            className="bg-black border-zinc-900 rounded-none text-white text-xs h-11 focus-visible:ring-zinc-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">
              Department
            </label>
            <Input
              required
              type="text"
              placeholder="e.g., Engineering"
              className="bg-black border-zinc-900 rounded-none text-white text-xs h-11 focus-visible:ring-zinc-700"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">
              Location
            </label>
            <Input
              required
              type="text"
              placeholder="e.g., Remote"
              className="bg-black border-zinc-900 rounded-none text-white text-xs h-11 focus-visible:ring-zinc-700"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">
            Employment Type
          </label>
          <Input
            required
            type="text"
            placeholder="e.g., Full-time"
            className="bg-black border-zinc-900 rounded-none text-white text-xs h-11 focus-visible:ring-zinc-700"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold block mb-2">
            Description
          </label>
          {/* RichTextEditor insert kar diya */}
          <RichTextEditor
            content={description}
            onChange={(html: string) => setDescription(html)}
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
          {loading ? "SAVING..." : "PUBLISH OPENING"}
        </Button>
      </form>
    </div>
  );
}
