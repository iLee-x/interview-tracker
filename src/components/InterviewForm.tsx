"use client";

import { useState, useEffect } from "react";
import { Interview, ROUND_OPTIONS, STATUS_OPTIONS, InterviewStatus, InterviewRound } from "@/lib/types";

interface InterviewFormProps {
  initialData?: Interview;
  onSubmit: (data: Omit<Interview, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export default function InterviewForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Save Interview",
}: InterviewFormProps) {
  const [companyName, setCompanyName] = useState(initialData?.companyName || "");
  const [position, setPosition] = useState(initialData?.position || "");
  const [round, setRound] = useState<string>(initialData?.round || "Phone Screen");
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<InterviewStatus>(initialData?.status || "upcoming");
  const [questions, setQuestions] = useState<string[]>(
    initialData?.questions?.length ? initialData.questions : [""]
  );
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setCompanyName(initialData.companyName);
      setPosition(initialData.position);
      setRound(initialData.round);
      setDate(initialData.date);
      setStatus(initialData.status);
      setQuestions(initialData.questions.length ? initialData.questions : [""]);
      setNotes(initialData.notes);
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!companyName.trim()) newErrors.companyName = "Company name is required";
    if (!position.trim()) newErrors.position = "Position is required";
    if (!date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      companyName: companyName.trim(),
      position: position.trim(),
      round,
      date,
      status,
      questions: questions.filter((q) => q.trim() !== ""),
      notes: notes.trim(),
    });
  };

  const addQuestion = () => setQuestions([...questions, ""]);
  const removeQuestion = (index: number) => {
    if (questions.length === 1) {
      setQuestions([""]);
    } else {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };
  const updateQuestion = (index: number, value: string) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const inputClasses =
    "w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all text-sm";
  const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2";
  const errorClasses = "text-xs text-rose-500 dark:text-rose-400 mt-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company & Position */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClasses}>
            Company Name <span className="text-rose-500 dark:text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Google, Meta, Amazon..."
            className={inputClasses}
          />
          {errors.companyName && <p className={errorClasses}>{errors.companyName}</p>}
        </div>
        <div>
          <label className={labelClasses}>
            Position <span className="text-rose-500 dark:text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="e.g. Software Engineer, SDE II..."
            className={inputClasses}
          />
          {errors.position && <p className={errorClasses}>{errors.position}</p>}
        </div>
      </div>

      {/* Round, Date, Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className={labelClasses}>Round</label>
          <select
            value={round}
            onChange={(e) => setRound(e.target.value)}
            className={inputClasses + " cursor-pointer"}
          >
            {ROUND_OPTIONS.map((r) => (
              <option key={r} value={r} className="bg-white dark:bg-[#1a1a2e]">
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClasses}>
            Date <span className="text-rose-500 dark:text-rose-400">*</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClasses + " cursor-pointer"}
          />
          {errors.date && <p className={errorClasses}>{errors.date}</p>}
        </div>
        <div>
          <label className={labelClasses}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as InterviewStatus)}
            className={inputClasses + " cursor-pointer"}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value} className="bg-white dark:bg-[#1a1a2e]">
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Interview Questions
          </label>
          <button
            type="button"
            onClick={addQuestion}
            className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Question
          </button>
        </div>
        <div className="space-y-3">
          {questions.map((q, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex items-center justify-center w-7 h-10 text-xs text-slate-500 font-mono">
                {i + 1}.
              </div>
              <input
                type="text"
                value={q}
                onChange={(e) => updateQuestion(i, e.target.value)}
                placeholder={`Question ${i + 1}...`}
                className={inputClasses + " flex-1"}
              />
              <button
                type="button"
                onClick={() => removeQuestion(i)}
                className="p-2.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:text-slate-500 dark:hover:text-rose-400 dark:hover:bg-rose-500/10 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className={labelClasses}>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional notes, thoughts, or prep details..."
          rows={4}
          className={inputClasses + " resize-none"}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/[0.06]">
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold hover:from-indigo-400 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
        >
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.06] transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
