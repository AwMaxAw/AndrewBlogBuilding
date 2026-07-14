import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string, short = false): string {
  return new Date(date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: short ? "short" : "long",
    day: "numeric",
  });
}
