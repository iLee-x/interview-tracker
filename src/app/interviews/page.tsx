"use client";

import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  loadFromStorage,
  deleteInterview,
  setSearchQuery,
  setStatusFilter,
} from "@/store/interviewSlice";
import { InterviewStatus, STATUS_OPTIONS } from "@/lib/types";
import InterviewCard from "@/components/InterviewCard";
import EmptyState from "@/components/EmptyState";
import ConfirmDialog from "@/components/ConfirmDialog";
import Link from "next/link";

export default function InterviewsPage() {
  const dispatch = useAppDispatch();
  const { interviews, searchQuery, statusFilter, isLoaded } = useAppSelector(
    (state) => state.interviews
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "company" | "created">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  const filteredInterviews = useMemo(() => {
    let filtered = [...interviews];

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((i) => i.status === statusFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          i.companyName.toLowerCase().includes(query) ||
          i.position.toLowerCase().includes(query) ||
          i.round.toLowerCase().includes(query) ||
          i.questions.some((q) => q.toLowerCase().includes(query)) ||
          i.notes.toLowerCase().includes(query)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let cmp = 0;
      switch (sortBy) {
        case "date":
          cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "company":
          cmp = a.companyName.localeCompare(b.companyName);
          break;
        case "created":
          cmp =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      return sortOrder === "desc" ? -cmp : cmp;
    });

    return filtered;
  }, [interviews, searchQuery, statusFilter, sortBy, sortOrder]);

  const handleDelete = (id: string) => setDeleteId(id);
  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteInterview(deleteId));
      setDeleteId(null);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
            All Interviews
          </h1>
          <p className="text-slate-400 mt-1">
            {interviews.length} interview{interviews.length !== 1 ? "s" : ""} logged
          </p>
        </div>
        <Link
          href="/interviews/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold hover:from-indigo-400 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 self-start"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Interview
        </Link>
      </div>

      {interviews.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                placeholder="Search by company, position, questions..."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all text-sm"
              />
            </div>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) =>
                dispatch(
                  setStatusFilter(e.target.value as InterviewStatus | "all")
                )
              }
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer min-w-[140px]"
            >
              <option value="all" className="bg-[#1a1a2e]">
                All Status
              </option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value} className="bg-[#1a1a2e]">
                  {s.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split("-");
                setSortBy(by as "date" | "company" | "created");
                setSortOrder(order as "asc" | "desc");
              }}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer min-w-[170px]"
            >
              <option value="date-desc" className="bg-[#1a1a2e]">Date (Newest)</option>
              <option value="date-asc" className="bg-[#1a1a2e]">Date (Oldest)</option>
              <option value="company-asc" className="bg-[#1a1a2e]">Company (A-Z)</option>
              <option value="company-desc" className="bg-[#1a1a2e]">Company (Z-A)</option>
              <option value="created-desc" className="bg-[#1a1a2e]">Recently Added</option>
            </select>
          </div>

          {/* Results */}
          {filteredInterviews.length === 0 ? (
            <EmptyState
              title="No matches found"
              description="Try adjusting your search or filter criteria."
              showAction={false}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInterviews.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  interview={interview}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Interview"
        message="Are you sure you want to delete this interview? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
