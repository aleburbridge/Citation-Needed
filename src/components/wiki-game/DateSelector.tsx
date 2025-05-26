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
import { formatDate } from "@/lib/utils";

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
    // Expecting format like "5/25/2025" from formatDate
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const month = parseInt(parts[0]) - 1; // Month is 0-indexed
      const day = parseInt(parts[1]);
      const year = parseInt(parts[2]);
      return new Date(year, month, day);
    }
    return new Date(dateStr);
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
