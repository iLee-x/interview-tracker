import { Interview } from "./types";

const STORAGE_KEY = "interview-tracker-data";

export function loadInterviews(): Interview[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveInterviews(interviews: Interview[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(interviews));
}

export function exportData(): string {
  const interviews = loadInterviews();
  return JSON.stringify(interviews, null, 2);
}

export function importData(jsonString: string): Interview[] {
  try {
    const data = JSON.parse(jsonString);
    if (Array.isArray(data)) {
      saveInterviews(data);
      return data;
    }
    throw new Error("Invalid data format");
  } catch (e) {
    throw new Error("Failed to import data: " + (e as Error).message);
  }
}
