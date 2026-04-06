"use client";

import Link from "next/link";
import { Interview } from "@/lib/types";
import StatusBadge from "./StatusBadge";

interface InterviewCardProps {
  interview: Interview;
  onDelete?: (id: string) => void;
}

export default function InterviewCard({ interview, onDelete }: InterviewCardProps) {
  const formattedDate = new Date(interview.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isPast = new Date(interview.date) < new Date();

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-all duration-300 hover:border-slate-300 dark:hover:border-white/[0.1] hover:shadow-xl hover:shadow-indigo-500/[0.03] shadow-sm">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-gradient-to-br dark:from-indigo-500/20 dark:to-violet-500/20 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              {interview.companyName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                {interview.companyName}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{interview.position}</p>
            </div>
          </div>
          <StatusBadge status={interview.status} size="sm" />
        </div>

        {/* Details */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
          <span className="flex items-center gap-1.5">
             <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <span className={isPast ? "text-slate-400 dark:text-slate-500" : "text-indigo-600 dark:text-indigo-400"}>{formattedDate}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
            {interview.round}
          </span>
          {interview.questions.length > 0 && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              {interview.questions.length} question{interview.questions.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Questions preview */}
        {interview.questions.length > 0 && (
          <div className="mb-3 space-y-1">
            {interview.questions.slice(0, 2).map((q, i) => (
              <p key={i} className="text-xs text-slate-500 dark:text-slate-500 truncate pl-3 border-l border-slate-200 dark:border-slate-700">
                {q}
              </p>
            ))}
            {interview.questions.length > 2 && (
              <p className="text-xs text-slate-400 dark:text-slate-600 pl-3">
                +{interview.questions.length - 2} more
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-white/[0.04]">
          <Link
            href={`/interviews/${interview.id}`}
            className="flex-1 text-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-all"
          >
            View Details
          </Link>
          {onDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onDelete(interview.id);
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:text-slate-500 dark:hover:text-rose-400 dark:hover:bg-rose-500/10 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
