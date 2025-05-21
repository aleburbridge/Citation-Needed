import React, { useEffect, useState } from "react";
import { Article as ArticleComponent } from "./Article";
import { MistakeDialog } from "./MistakeDialog";
import { GameProgress } from "./GameProgress";
import { ResultsDisplay } from "./ResultsDisplay";
import { Article, GameState, GameResult, GameResults } from "@/types/wiki-game";
import {
  getArticlesForToday,
  getGameStorageKey,
  getMaxScore,
} from "@/data/articles";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";

export const WikiGame: React.FC = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    currentArticleIndex: 0,
    clickedMistakes: [],
    enteredCorrections: [],
    scores: [],
    gameCompleted: false,
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  // Initialize game with today's articles and load any saved progress
  useEffect(() => {
    const todayArticles = getArticlesForToday();
    setArticles(todayArticles);

    // Initialize default game state
    const defaultState: GameState = {
      currentArticleIndex: 0,
      clickedMistakes: Array(todayArticles.length).fill(false),
      enteredCorrections: Array(todayArticles.length).fill(""),
      scores: Array(todayArticles.length).fill(0),
      gameCompleted: false,
    };

    // Try to load saved state
    try {
      const savedState = localStorage.getItem(getGameStorageKey());
      if (savedState) {
        setGameState(JSON.parse(savedState));
      } else {
        setGameState(defaultState);
      }
    } catch (err) {
      console.error("Error loading saved game state:", err);
      setGameState(defaultState);
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem(getGameStorageKey(), JSON.stringify(gameState));
    }
  }, [gameState, articles]);

  const handleMistakeClick = () => {
    // Update state to mark mistake as clicked and award 5 points
    setGameState((prev) => {
      const updatedClickedMistakes = [...prev.clickedMistakes];
      updatedClickedMistakes[prev.currentArticleIndex] = true;

      const updatedScores = [...prev.scores];
      // Award 5 points for clicking the mistake if not already clicked
      if (!prev.clickedMistakes[prev.currentArticleIndex]) {
        updatedScores[prev.currentArticleIndex] = 5;
      }

      return {
        ...prev,
        clickedMistakes: updatedClickedMistakes,
        scores: updatedScores,
      };
    });

    // Open dialog for correction
    setDialogOpen(true);

    // Show congratulatory toast
    toast({
      title: "Good eye!",
      description: "You found the mistake! Now, what's the correct term?",
    });
  };

  const handleSubmitCorrection = (correction: string) => {
    const currentArticle = articles[gameState.currentArticleIndex];
    const isCorrect =
      correction.trim().toLowerCase() ===
      currentArticle.mistake.correctAnswer.toLowerCase();

    setGameState((prev) => {
      const updatedCorrections = [...prev.enteredCorrections];
      updatedCorrections[prev.currentArticleIndex] = correction;

      const updatedScores = [...prev.scores];
      // If correct, add another 5 points (total 10 for this article)
      if (isCorrect) {
        updatedScores[prev.currentArticleIndex] = 10;
      }

      // Check if all articles have been attempted
      const allAttempted = prev.clickedMistakes.every((clicked) => clicked);

      return {
        ...prev,
        enteredCorrections: updatedCorrections,
        scores: updatedScores,
        gameCompleted: allAttempted,
      };
    });

    setDialogOpen(false);

    // Show toast with feedback
    toast({
      title: isCorrect ? "Correct! +5 points" : "Not quite right",
      description: isCorrect
        ? "That's exactly right! You've earned 5 more points."
        : `The correct answer was "${currentArticle.mistake.correctAnswer}".`,
      variant: isCorrect ? "default" : "destructive",
    });

    // Navigate to next article automatically if not the last one
    if (
      gameState.currentArticleIndex < articles.length - 1 &&
      !gameState.clickedMistakes[gameState.currentArticleIndex + 1]
    ) {
      setTimeout(() => {
        handleNavigate(gameState.currentArticleIndex + 1);
      }, 1500);
    }
  };

  const handleNavigate = (index: number) => {
    setGameState((prev) => ({
      ...prev,
      currentArticleIndex: index,
    }));
  };

  const resetGame = () => {
    const defaultState: GameState = {
      currentArticleIndex: 0,
      clickedMistakes: Array(articles.length).fill(false),
      enteredCorrections: Array(articles.length).fill(""),
      scores: Array(articles.length).fill(0),
      gameCompleted: false,
    };

    setGameState(defaultState);
    localStorage.removeItem(getGameStorageKey());

    toast({
      title: "Game Reset",
      description: "Your progress has been reset. Good luck!",
    });
  };

  const getGameResults = (): GameResults => {
    const results: GameResult[] = articles.map((_, index) => {
      if (!gameState.clickedMistakes[index]) return "unattempted";
      return gameState.scores[index] === 10 ? "correct" : "incorrect";
    });

    const totalScore = gameState.scores.reduce((sum, score) => sum + score, 0);
    const maxScore = getMaxScore(articles);

    return {
      date: new Date().toISOString().split("T")[0],
      results,
      score: totalScore,
      maxScore,
    };
  };

  // Don't render until articles are loaded
  if (articles.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        Loading challenge...
      </div>
    );
  }

  const currentArticle = articles[gameState.currentArticleIndex];
  const totalScore = gameState.scores.reduce((sum, score) => sum + score, 0);
  const maxScore = getMaxScore(articles);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Wikipedia Challenge</h1>
        <p className="text-gray-600 mb-4">
          Find the mistake in each Wikipedia passage and correct it!
        </p>
        <div className="flex justify-center items-center gap-2">
          <p className="font-medium">
            Score: {totalScore}/{maxScore}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={resetGame}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" />
            Reset
          </Button>
        </div>
      </header>

      <GameProgress
        articles={articles}
        currentIndex={gameState.currentArticleIndex}
        scores={gameState.scores}
        clickedMistakes={gameState.clickedMistakes}
        enteredCorrections={gameState.enteredCorrections}
        onNavigate={handleNavigate}
      />

      <main className="my-6">
        <ArticleComponent
          article={currentArticle}
          mistakeClicked={
            gameState.clickedMistakes[gameState.currentArticleIndex]
          }
          onMistakeClick={handleMistakeClick}
        />

        <MistakeDialog
          article={currentArticle}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmitCorrection={handleSubmitCorrection}
        />
      </main>

      {gameState.gameCompleted && (
        <div className="mt-8">
          <ResultsDisplay results={getGameResults()} />
        </div>
      )}
    </div>
  );
};
