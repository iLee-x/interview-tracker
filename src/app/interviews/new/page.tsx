"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { addInterview } from "@/store/interviewSlice";
import InterviewForm from "@/components/InterviewForm";
import { Interview } from "@/lib/types";

export default function NewInterviewPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = (data: Omit<Interview, "id" | "createdAt" | "updatedAt">) => {
    dispatch(addInterview(data));
    router.push("/interviews");
  };

  return (
    <div className="animate-fade-in-up max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
          Add New Interview
        </h1>
        <p className="text-slate-400 mt-1">Log a new interview to your history</p>
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
        <InterviewForm
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
          submitLabel="Add Interview"
        />
      </div>
    </div>
  );
}
