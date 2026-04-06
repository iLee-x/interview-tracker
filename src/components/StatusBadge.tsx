"use client";

import { InterviewStatus, STATUS_COLORS } from "@/lib/types";

interface StatusBadgeProps {
  status: InterviewStatus;
  size?: "sm" | "md";
}

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium capitalize ${STATUS_COLORS[status]} ${sizeClasses}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          status === "upcoming"
            ? "bg-blue-400 animate-pulse"
            : status === "offered"
            ? "bg-emerald-400"
            : status === "rejected"
            ? "bg-rose-400"
            : "bg-slate-400"
        }`}
      />
      {status}
    </span>
  );
}
