import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createLocalDate(dateString: string): Date {
  // Parse date string like "2025-05-25" and create a local date to avoid timezone issues
  const parts = dateString.split('-');
  if (parts.length === 3) {
    // Create date in local timezone (year, month-1, day)
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  }
  return new Date(dateString);
}

export function formatDate(date: Date | string): string {
  let d: Date;
  if (typeof date === 'string') {
    d = createLocalDate(date);
  } else {
    d = date;
  }

  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit'
  });
}
    d = date;
  }

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "2-digit",
  });
}