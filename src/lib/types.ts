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
  upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  completed: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  offered: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  rejected: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};
