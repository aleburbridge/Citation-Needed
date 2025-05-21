import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { GameResult, GameResults } from "@/types/wiki-game";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResultsDisplayProps {
  results: GameResults;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [resultText, setResultText] = useState("");

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

  const copyToClipboard = () => {
    try {
      const shareText = generateShareText();

      // Always show the text for copying (since direct clipboard access is restricted)
      setResultText(shareText);

      // Use the execCommand approach instead of Clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = shareText;

      // Make the textarea part of the document but visually hidden
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      textArea.style.pointerEvents = "none";
      textArea.style.left = "-9999px";
      textArea.style.top = "-9999px";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        // Try to copy with execCommand
        const successful = document.execCommand("copy");
        if (successful) {
          setCopied(true);
          toast({
            title: "Results copied to clipboard!",
            description: "You can now paste and share your results.",
          });

          // Reset the copied state after 2 seconds
          setTimeout(() => setCopied(false), 2000);
        } else {
          throw new Error("Copy command failed");
        }
      } catch (err) {
        // If execCommand fails, at least we have the text visible
        toast({
          title: "Copy to clipboard unavailable",
          description: "Please manually select and copy the text below.",
          variant: "default",
        });
      } finally {
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Show a toast with instructions for manual copying
      toast({
        title: "Could not copy automatically",
        description: "Please select and copy the text below.",
        variant: "default",
      });
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

      <div className="flex justify-center mb-4">
        <Button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2"
          variant="default"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? "Copied!" : "Copy Results"}
        </Button>
      </div>

      {/* Always show the text for manual copying */}
      <div className="mt-4 relative">
        <pre className="p-3 bg-gray-100 rounded text-left overflow-x-auto text-sm whitespace-pre-wrap">
          {resultText || generateShareText()}
        </pre>
        <p className="text-xs text-gray-500 mt-1">
          If automatic copying doesn't work, please select and copy the text
          above.
        </p>
      </div>
    </div>
  );
};
