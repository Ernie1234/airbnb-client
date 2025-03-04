import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNow, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(date: Date | string): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date; // Parse only if it's a string
  const distance = formatDistanceToNow(dateObj, { addSuffix: true });
  return `Added ${distance}`;
}

export function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
