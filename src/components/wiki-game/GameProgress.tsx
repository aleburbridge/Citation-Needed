import React from "react";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/wiki-game";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Circle,
  AlertCircle,
} from "lucide-react";

interface GameProgressProps {
  articles: Article[];
  currentIndex: number;
  scores: number[];
  clickedMistakes: boolean[];
  enteredCorrections: string[];
  onNavigate: (index: number) => void;
}

export const GameProgress: React.FC<GameProgressProps> = ({
  articles,
  currentIndex,
  scores,
  clickedMistakes,
  enteredCorrections,
  onNavigate,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === articles.length - 1;

  const getStatusIcon = (index: number) => {
    if (!clickedMistakes[index]) {
      return <Circle className="h-4 w-4" />;
    }

    const isCorrect = scores[index] === 10;
    const isPartial = scores[index] === 5;

    if (isCorrect) {
      return <CircleCheck className="h-4 w-4 text-green-500" />;
    } else if (isPartial) {
      return <CircleCheck className="h-4 w-4 text-yellow-500" />;
    } else {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full max-w-3xl mx-auto py-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate(currentIndex - 1)}
          disabled={isFirst}
        >
          ←
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate(currentIndex + 1)}
          disabled={isLast}
        >
          →
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {articles.map((_, index) => (
          <Button
            key={index}
            variant={currentIndex === index ? "default" : "outline"}
            size="icon"
            className="w-8 h-8 rounded-full"
            onClick={() => onNavigate(index)}
          >
            {getStatusIcon(index)}
            <span className="sr-only">Article {index + 1}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
