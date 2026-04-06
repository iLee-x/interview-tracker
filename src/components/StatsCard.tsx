"use client";

import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  gradient: string;
  trend?: string;
}

export default function StatsCard({ title, value, icon, gradient, trend }: StatsCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-all duration-300 hover:border-slate-300 dark:hover:border-white/[0.1] shadow-sm">
      {/* Background glow */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity ${gradient}`} />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">{value}</p>
          {trend && (
            <p className="text-xs text-slate-500 mt-1">{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
