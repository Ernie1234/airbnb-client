import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNow, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(date: Date | string): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date; // Parse only if it's a string
  const distance = formatDistanceToNow(dateObj, { addSuffix: true });
  return `${distance}`;
}

export function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function getInitials(fullName: string): string {
  const nameParts = fullName.trim().split(/\s+/);

  if (nameParts.length >= 2) {
    const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
    const lastNameInitial = nameParts[nameParts.length - 1]
      .charAt(0)
      .toUpperCase();
    return `${firstNameInitial}${lastNameInitial}`;
  }

  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  }

  return "";
}
