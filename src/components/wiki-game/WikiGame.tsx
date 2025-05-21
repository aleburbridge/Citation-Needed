import React, { useEffect, useState, useCallback } from "react";
import { Article as ArticleComponent } from "./Article";
import { MistakeDialog } from "./MistakeDialog";
import { GameProgress } from "./GameProgress";
import { ResultsDisplay } from "./ResultsDisplay";
import {
  Article,
  GameState,
  GameResult,
  GameResults,
  Link,
} from "@/types/wiki-game";
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
    clickedLinks: {},
    enteredCorrections: {},
    scores: [],
    gameCompleted: false,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentMistakeLink, setCurrentMistakeLink] = useState<Link | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  // Initialize game with today's articles and load any saved progress
  useEffect(() => {
    const initializeGame = () => {
      const todayArticles = getArticlesForToday();
      setArticles(todayArticles);

      // Initialize default game state
      const defaultState: GameState = {
        currentArticleIndex: 0,
        clickedLinks: {},
        enteredCorrections: {},
        scores: Array(todayArticles.length).fill(0),
        gameCompleted: false,
      };

      // Try to load saved state
      try {
        // Force a reset of stored data due to format changes
        localStorage.removeItem(getGameStorageKey());

        const savedState = localStorage.getItem(getGameStorageKey());
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          // Verify the saved state format matches our current expected format
          if (
            parsedState.clickedLinks !== undefined &&
            parsedState.enteredCorrections !== undefined &&
            Array.isArray(parsedState.scores) &&
            parsedState.scores.length === todayArticles.length
          ) {
            setGameState(parsedState);
          } else {
            // Use default state if saved state format doesn't match
            setGameState(defaultState);
          }
        } else {
          setGameState(defaultState);
        }
      } catch (err) {
        console.error("Error loading saved game state:", err);
        setGameState(defaultState);
      } finally {
        setIsLoading(false);
      }
    };

    initializeGame();
  }, []);

  // Check if all articles have been completed - moved to separate effect to avoid render phase state updates
  useEffect(() => {
    if (articles.length > 0 && !isLoading) {
      const allMistakesFound = articles.every((article) => {
        if (!article.links || article.mistakeIndex === undefined) return false;
        const mistakeLink = article.links[article.mistakeIndex];
        return mistakeLink && gameState.clickedLinks[mistakeLink.id];
      });

      if (allMistakesFound && !gameState.gameCompleted) {
        setGameState((prev) => ({
          ...prev,
          gameCompleted: true,
        }));
      }
    }
  }, [gameState.clickedLinks, articles, isLoading, gameState.gameCompleted]);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (articles.length > 0 && !isLoading) {
      localStorage.setItem(getGameStorageKey(), JSON.stringify(gameState));
    }
  }, [gameState, articles, isLoading]);

  // Handle moving to the next article
  const moveToNextArticle = useCallback(() => {
    if (!isLoading && gameState.currentArticleIndex < articles.length - 1) {
      setTimeout(() => {
        handleNavigate(gameState.currentArticleIndex + 1);
      }, 1500);
    } else if (
      !isLoading &&
      gameState.currentArticleIndex === articles.length - 1
    ) {
      // If it's the last article, mark the game as completed
      setGameState((prev) => ({
        ...prev,
        gameCompleted: true,
      }));
    }
  }, [isLoading, gameState.currentArticleIndex, articles.length]);

  // Memoize handlers to prevent recreation on each render
  const handleLinkClick = useCallback(
    (linkId: string, isMistake: boolean) => {
      if (isLoading) return;

      const currentArticle = articles[gameState.currentArticleIndex];
      if (!currentArticle) return;

      // Update state to mark link as clicked
      setGameState((prev) => {
        const updatedClickedLinks = {
          ...prev.clickedLinks,
          [linkId]: true,
        };

        const updatedScores = [...prev.scores];

        if (isMistake) {
          // Award 5 points for clicking the correct mistake
          updatedScores[prev.currentArticleIndex] = 5;
        } else {
          // Mark the mistake for this article as clicked to prevent future attempts
          // This effectively counts a wrong link as a "miss" for this article
          const mistakeLink = currentArticle.links[currentArticle.mistakeIndex];
          if (mistakeLink) {
            updatedClickedLinks[mistakeLink.id] = true;
          }
          // Keep score as 0 for this article
        }

        return {
          ...prev,
          clickedLinks: updatedClickedLinks,
          scores: updatedScores,
        };
      });

      if (isMistake) {
        // Find the mistaken link to display in the dialog
        const mistakeLink = currentArticle.links.find(
          (link) => link.id === linkId,
        );
        if (mistakeLink) {
          setCurrentMistakeLink(mistakeLink);
          // Open dialog for correction
          setDialogOpen(true);

          // Show congratulatory toast - moved outside of setState
          toast({
            title: "Good eye!",
            description: "You found the mistake! Now, what's the correct term?",
          });
        }
      } else {
        // If they clicked a correct link, show a toast and count it as a miss
        toast({
          title: "Incorrect",
          description: "That wasn't the mistake. Moving to the next article.",
          variant: "destructive",
        });

        // Get the actual mistake link to show what was missed
        const mistakeLink = currentArticle.links[currentArticle.mistakeIndex];
        if (mistakeLink) {
          setTimeout(() => {
            toast({
              title: "The actual mistake was",
              description: `"${mistakeLink.text}" should have been "${mistakeLink.correctAnswer}"`,
              variant: "default",
            });
          }, 800);
        }

        // Move to the next article
        moveToNextArticle();
      }
    },
    [
      isLoading,
      articles,
      gameState.currentArticleIndex,
      toast,
      moveToNextArticle,
    ],
  );

  const handleSubmitCorrection = useCallback(
    (correction: string) => {
      if (!currentMistakeLink || isLoading) return;

      const currentArticle = articles[gameState.currentArticleIndex];
      if (!currentArticle) return;

      const isCorrect =
        correction.trim().toLowerCase() ===
        currentMistakeLink.correctAnswer?.toLowerCase();

      setGameState((prev) => {
        const updatedCorrections = {
          ...prev.enteredCorrections,
          [currentArticle.id]: correction,
        };

        const updatedScores = [...prev.scores];
        // If correct, add another 5 points (total 10 for this article)
        if (isCorrect) {
          updatedScores[prev.currentArticleIndex] = 10;
        }

        return {
          ...prev,
          enteredCorrections: updatedCorrections,
          scores: updatedScores,
        };
      });

      // These updates should be after the setState call
      setDialogOpen(false);
      setCurrentMistakeLink(null);

      // Show toast with feedback
      toast({
        title: isCorrect ? "Correct! +5 points" : "Not quite right",
        description: isCorrect
          ? "That's exactly right! You've earned 5 more points."
          : `The correct answer was "${currentMistakeLink.correctAnswer}".`,
        variant: isCorrect ? "default" : "destructive",
      });

      // Move to next article
      moveToNextArticle();
    },
    [
      currentMistakeLink,
      isLoading,
      articles,
      gameState.currentArticleIndex,
      toast,
      moveToNextArticle,
    ],
  );

  const handleNavigate = useCallback(
    (index: number) => {
      if (isLoading) return;

      setGameState((prev) => ({
        ...prev,
        currentArticleIndex: index,
      }));
    },
    [isLoading],
  );

  const resetGame = useCallback(() => {
    if (isLoading) return;

    const defaultState: GameState = {
      currentArticleIndex: 0,
      clickedLinks: {},
      enteredCorrections: {},
      scores: Array(articles.length).fill(0),
      gameCompleted: false,
    };

    setGameState(defaultState);
    localStorage.removeItem(getGameStorageKey());

    toast({
      title: "Game Reset",
      description: "Your progress has been reset. Good luck!",
    });
  }, [isLoading, articles.length, toast]);

  const getGameResults = useCallback((): GameResults => {
    if (isLoading || articles.length === 0) {
      return {
        date: new Date().toISOString().split("T")[0],
        results: [],
        score: 0,
        maxScore: 0,
      };
    }

    const results: GameResult[] = articles.map((article) => {
      if (!article.links || article.mistakeIndex === undefined)
        return "unattempted";

      const mistakeLink = article.links[article.mistakeIndex];
      if (!mistakeLink) return "unattempted";

      const mistakeLinkId = mistakeLink.id;
      if (!gameState.clickedLinks[mistakeLinkId]) return "unattempted";

      const articleIndex = articles.findIndex((a) => a.id === article.id);
      const score = gameState.scores[articleIndex];

      // Yellow for finding mistake but not correct answer
      if (score === 5) return "partial";
      // Red for clicking a wrong link (score is 0 but link is marked as clicked)
      else if (score === 0) return "incorrect";
      // Green for both finding mistake and correct answer
      return score === 10 ? "correct" : "incorrect";
    });

    const totalScore = gameState.scores.reduce((sum, score) => sum + score, 0);
    const maxScore = getMaxScore(articles);

    return {
      date: new Date().toISOString().split("T")[0],
      results,
      score: totalScore,
      maxScore,
    };
  }, [isLoading, articles, gameState.clickedLinks, gameState.scores]);

  // Don't render until articles are loaded
  if (isLoading || articles.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        Loading challenge...
      </div>
    );
  }

  const currentArticle = articles[gameState.currentArticleIndex];
  if (!currentArticle) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        Error loading article data. Please try again.
      </div>
    );
  }

  const totalScore = gameState.scores.reduce((sum, score) => sum + score, 0);
  const maxScore = getMaxScore(articles);

  // Prepare the clickedMistakes array safely for GameProgress
  const clickedMistakes = articles.map((article) => {
    if (!article.links || article.mistakeIndex === undefined) return false;
    const mistakeLink = article.links[article.mistakeIndex];
    return (mistakeLink && gameState.clickedLinks[mistakeLink.id]) || false;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Wikipedia Challenge</h1>
        <p className="text-gray-600 mb-4">
          <i>Find the mistake in each Wikipedia passage</i>
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
        clickedMistakes={clickedMistakes}
        enteredCorrections={articles.map(
          (article) => gameState.enteredCorrections[article.id] || "",
        )}
        onNavigate={handleNavigate}
      />

      <main className="my-6">
        <ArticleComponent
          article={currentArticle}
          clickedLinks={gameState.clickedLinks}
          onLinkClick={handleLinkClick}
        />

        {currentMistakeLink && (
          <MistakeDialog
            article={currentArticle}
            mistakeLink={currentMistakeLink}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            onSubmitCorrection={handleSubmitCorrection}
          />
        )}
      </main>

      {gameState.gameCompleted && (
        <div className="mt-8">
          <ResultsDisplay results={getGameResults()} />
        </div>
      )}
    </div>
  );
};
