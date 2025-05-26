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
  TooltipProvider,
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

  // Get all available puzzle dates
  const availableDates = articleGroups.map((group) => new Date(group.date));

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

  const currentDateObj = new Date(currentDate);

  return (
    <TooltipProvider>
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
    </TooltipProvider>
  );
};
