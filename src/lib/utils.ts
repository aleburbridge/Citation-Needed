import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  let d: Date;
  if (typeof date === "string") {
    // Parse the date string and create a local date to avoid timezone issues
    const parts = date.split("-");
    if (parts.length === 3) {
      // Create date in local timezone (year, month-1, day)
      d = new Date(
        parseInt(parts[0]),
        parseInt(parts[1]) - 1,
        parseInt(parts[2]),
      );
    } else {
      d = new Date(date);
    }
  } else {
    d = date;
  }

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "2-digit",
  });
}
