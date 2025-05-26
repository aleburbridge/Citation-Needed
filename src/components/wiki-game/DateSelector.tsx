import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { articleGroups } from "@/data/articleHistory";
import { formatDate, createLocalDate } from "@/lib/utils";

interface DateSelectorProps {
  onDateSelect: (date: string) => void;
  currentDate: string;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  onDateSelect,
  currentDate,
}) => {
  const [open, setOpen] = React.useState(false);

  // Create a set of available date strings for quick lookup
  const availableDateStrings = new Set(
    articleGroups.map((group) => group.date),
  );

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const dateString = formatDate(date);
      if (availableDateStrings.has(dateString)) {
        onDateSelect(dateString);
        setOpen(false);
      }
    }
  };

  const isDateAvailable = (date: Date) => {
    const dateString = formatDate(date);
    return availableDateStrings.has(dateString);
  };

  // Parse the current date string properly to avoid timezone issues
  const parseCurrentDate = (dateStr: string): Date => {
    // Try to find the original date string that produced this formatted date
    const matchingGroup = articleGroups.find((group) => group.date === dateStr);
    if (matchingGroup) {
      // If we found a matching group, we need to extract the original date
      // Since we know the format is from "2025-05-25" etc., let's reverse engineer it
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        const month = parseInt(parts[0]);
        const day = parseInt(parts[1]);
        const year = parseInt(parts[2]);
        return new Date(year, month - 1, day); // month is 0-indexed
      }
    }

    // Fallback to current date
    return new Date();
  };

  const currentDateObj = parseCurrentDate(currentDate);

  return (
    <Tooltip>
      <Popover open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              aria-label="Select puzzle date"
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Play previous puzzles</p>
        </TooltipContent>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={currentDateObj}
            onSelect={handleDateSelect}
            disabled={(date) => !isDateAvailable(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </Tooltip>
  );
};
