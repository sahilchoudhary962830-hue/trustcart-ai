import type { TrustLevel } from "@/types";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatScore(score: number): string {
  return `${Math.round(score)}%`;
}

export function getTrustBadgeColor(level: TrustLevel): string {
  switch (level) {
    case "trusted":
      return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800";
    case "caution":
      return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800";
    case "risky":
      return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800";
  }
}

export function getTrustBadgeLabel(level: TrustLevel): string {
  switch (level) {
    case "trusted":
      return "Trusted";
    case "caution":
      return "Caution";
    case "risky":
      return "Risky";
  }
}

export function getFakeScoreColor(score: number): string {
  if (score < 30) return "#10b981";
  if (score <= 60) return "#f59e0b";
  return "#ef4444";
}

export function getVerdictColor(
  verdict: "real" | "suspicious" | "fake",
): string {
  switch (verdict) {
    case "real":
      return "text-emerald-600 dark:text-emerald-400";
    case "suspicious":
      return "text-amber-600 dark:text-amber-400";
    case "fake":
      return "text-red-600 dark:text-red-400";
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}
