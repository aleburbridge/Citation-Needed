import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { GameResult, GameResults } from "@/types/wiki-game";
import { Copy, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResultsDisplayProps {
  results: GameResults;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const { toast } = useToast();

  const getResultEmoji = (result: GameResult): string => {
    switch (result) {
      case "correct":
        return "🟩";
      case "incorrect":
        return "🟥";
      case "unattempted":
        return "⬜";
    }
  };

  const generateShareText = useCallback(() => {
    const resultsLine = results.results.map(getResultEmoji).join("");
    return `Wikipedia Challenge ${results.date} - ${results.score}/${results.maxScore}\n${resultsLine}`;
  }, [results]);

  const copyToClipboard = async () => {
    const shareText = generateShareText();

    try {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Results copied to clipboard!",
        description: "You can now paste and share your results.",
      });
    } catch (err) {
      toast({
        title: "Could not copy to clipboard",
        description: "Please try again or copy manually.",
        variant: "destructive",
      });
    }
  };

  const shareResults = async () => {
    const shareText = generateShareText();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Wikipedia Challenge Results",
          text: shareText,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-xl font-bold mb-2">Your Results</h2>
      <p className="text-gray-700 mb-4">
        Score: {results.score}/{results.maxScore}
      </p>

      <div className="flex justify-center mb-6 text-2xl">
        {results.results.map((result, index) => (
          <span key={index} className="mx-1">
            {getResultEmoji(result)}
          </span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <Button onClick={copyToClipboard} className="flex items-center gap-2">
          <Copy className="h-4 w-4" />
          Copy Results
        </Button>
        {navigator.share && (
          <Button
            onClick={shareResults}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        )}
      </div>
    </div>
  );
};
