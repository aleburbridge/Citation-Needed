import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { GameResult, GameResults } from "@/types/wiki-game";
import { Copy } from "lucide-react";
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
      case "partial":
        return "🟨";
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
    try {
      const shareText = generateShareText();

      // Use the newer clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Results copied to clipboard!",
          description: "You can now paste and share your results.",
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = shareText;

        // Make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (successful) {
          toast({
            title: "Results copied to clipboard!",
            description: "You can now paste and share your results.",
          });
        } else {
          throw new Error("Copy command was unsuccessful");
        }
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast({
        title: "Could not copy to clipboard",
        description:
          "Please try manually selecting and copying the results below.",
        variant: "destructive",
      });

      // Show the results as text for manual copy
      const resultsContainer = document.getElementById("results-text");
      if (resultsContainer) {
        resultsContainer.textContent = generateShareText();
        resultsContainer.style.display = "block";
      }
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

      <div className="flex justify-center">
        <Button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2"
          variant="default"
        >
          <Copy className="h-4 w-4" />
          Copy Results
        </Button>
      </div>

      {/* Hidden pre-formatted text for fallback manual copying */}
      <pre
        id="results-text"
        className="mt-4 p-3 bg-gray-100 rounded text-left overflow-x-auto hidden"
      ></pre>
    </div>
  );
};
