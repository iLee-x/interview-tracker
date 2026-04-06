export type InterviewStatus = "upcoming" | "completed" | "offered" | "rejected";

export type InterviewRound =
  | "Phone Screen"
  | "Technical"
  | "System Design"
  | "Behavioral"
  | "OA"
  | "Onsite"
  | "Final"
  | "HR"
  | "Other";

export interface Interview {
  id: string;
  companyName: string;
  position: string;
  round: InterviewRound | string;
  date: string;
  status: InterviewStatus;
  questions: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export const ROUND_OPTIONS: InterviewRound[] = [
  "Phone Screen",
  "OA",
  "Technical",
  "System Design",
  "Behavioral",
  "Onsite",
  "Final",
  "HR",
  "Other",
];

export const STATUS_OPTIONS: { value: InterviewStatus; label: string }[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "offered", label: "Offered" },
  { value: "rejected", label: "Rejected" },
];

export const STATUS_COLORS: Record<InterviewStatus, string> = {
  upcoming: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30",
  completed: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-500/20 dark:text-slate-300 dark:border-slate-500/30",
  offered: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30",
  rejected: "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30",
};
