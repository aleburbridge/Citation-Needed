import React, { useEffect, useState, useCallback } from "react";
import { Article as ArticleComponent } from "./Article";
import { MistakeDialog } from "./MistakeDialog";
import { GameProgress } from "./GameProgress";
import { ResultsDisplay } from "./ResultsDisplay";
import { DateSelector } from "./DateSelector";
import {
  Article,
  GameState,
  GameResult,
  GameResults,
  Link,
} from "@/types/wiki-game";
import {
  getArticlesForToday,
  getArticlesForDate,
  getGameStorageKey,
  getGameStorageKeyForDate,
  getMaxScore,
} from "@/data/articles";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const WikiGame: React.FC = () => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState<string>(
    formatDate(new Date()),
  );
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

  // Initialize game with articles for current date and load any saved progress
  useEffect(() => {
    const initializeGame = () => {
      const articlesForDate = getArticlesForDate(currentDate);
      setArticles(articlesForDate);

      // Initialize default game state
      const defaultState: GameState = {
        currentArticleIndex: 0,
        clickedLinks: {},
        enteredCorrections: {},
        scores: Array(articlesForDate.length).fill(0),
        gameCompleted: false,
      };

      // Try to load saved state for the current date
      try {
        const storageKey = getGameStorageKeyForDate(currentDate);
        const savedState = localStorage.getItem(storageKey);
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          // Verify the saved state format matches our current expected format
          if (
            parsedState.clickedLinks !== undefined &&
            parsedState.enteredCorrections !== undefined &&
            Array.isArray(parsedState.scores) &&
            parsedState.scores.length === articlesForDate.length
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
  }, [currentDate]);

  // Check if all articles have been completed - moved to separate effect to avoid render phase state updates
  useEffect(() => {
    if (articles.length > 0 && !isLoading) {
      const allMistakesFound = articles.every((article) => {
        if (!article.links) return false;
        const mistakeLink = article.links.find((link) => link.isMistake);
        if (!mistakeLink) return false;
        const mistakeLinkId = `${article.id}-${article.links.indexOf(mistakeLink)}`;
        return gameState.clickedLinks[mistakeLinkId];
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
      const storageKey = getGameStorageKeyForDate(currentDate);
      localStorage.setItem(storageKey, JSON.stringify(gameState));
    }
  }, [gameState, articles, isLoading, currentDate]);

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
          // Found the mistake - give 5 points
          updatedScores[prev.currentArticleIndex] = 5;
        } else {
          // Clicked wrong link - mark as incorrect (0 points)
          updatedScores[prev.currentArticleIndex] = 0;
          // Mark the mistake for this article as clicked to prevent future attempts
          const mistakeLink = currentArticle.links.find(
            (link) => link.isMistake,
          );
          if (mistakeLink) {
            const mistakeLinkId = `${currentArticle.id}-${currentArticle.links.indexOf(mistakeLink)}`;
            updatedClickedLinks[mistakeLinkId] = true;
          }
        }

        return {
          ...prev,
          clickedLinks: updatedClickedLinks,
          scores: updatedScores,
        };
      });

      if (isMistake) {
        const mistakeLink = currentArticle.links.find((link) => link.isMistake);
        if (mistakeLink) {
          setCurrentMistakeLink(mistakeLink);
          setDialogOpen(true);
        }
      } else {
        // Get the actual mistake link to show what was missed
        const mistakeLink = currentArticle.links.find((link) => link.isMistake);
        if (mistakeLink) {
          toast({
            title: "Incorrect",
            description: `"${mistakeLink.text}" should have been "${Array.isArray(mistakeLink.correctAnswer) ? mistakeLink.correctAnswer[0] : mistakeLink.correctAnswer}"`,
            variant: "default",
          });
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

      const isCorrect = Array.isArray(currentMistakeLink.correctAnswer)
        ? currentMistakeLink.correctAnswer.some(
            (answer) =>
              correction.trim().toLowerCase() === answer.toLowerCase(),
          )
        : correction.trim().toLowerCase() ===
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
        title: isCorrect ? "Correct!" : "Not quite right",
        description: isCorrect
          ? "+5 points"
          : `The correct answer was "${Array.isArray(currentMistakeLink.correctAnswer) ? currentMistakeLink.correctAnswer[0] : currentMistakeLink.correctAnswer}".`,
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
    const storageKey = getGameStorageKeyForDate(currentDate);
    localStorage.removeItem(storageKey);

    toast({
      title: "Game Reset",
      description: "Your progress has been reset. Good luck!",
    });
  }, [isLoading, articles.length, toast, currentDate]);

  const handleDateSelect = useCallback((dateString: string) => {
    setCurrentDate(dateString);
  }, []);

  const getGameResults = useCallback((): GameResults => {
    if (isLoading || articles.length === 0) {
      return {
        date: currentDate,
        results: [],
        score: 0,
        maxScore: 0,
      };
    }

    const results: GameResult[] = articles.map((article) => {
      if (!article.links) return "unattempted";

      const mistakeLink = article.links.find((link) => link.isMistake);
      if (!mistakeLink) return "unattempted";

      const mistakeLinkId = `${article.id}-${article.links.indexOf(mistakeLink)}`;
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
      date: currentDate,
      results,
      score: totalScore,
      maxScore,
    };
  }, [
    isLoading,
    articles,
    gameState.clickedLinks,
    gameState.scores,
    currentDate,
  ]);

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
    if (!article.links) return false;
    const mistakeLink = article.links.find((link) => link.isMistake);
    if (!mistakeLink) return false;
    const mistakeLinkId = `${article.id}-${article.links.indexOf(mistakeLink)}`;
    return gameState.clickedLinks[mistakeLinkId] || false;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-3 text-center relative">
        <h1 className="text-3xl font-bold mb-2">
          Citation Needed {currentDate}{" "}
          <DateSelector
            onDateSelect={handleDateSelect}
            currentDate={currentDate}
          />
        </h1>
        <p className="text-gray-600 mb-4">
          <i>
            Click the hyperlink with incorrect information in each Wikipedia
            passage
          </i>
        </p>

        <div className="flex justify-center items-center gap-2"></div>
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
          totalScore={totalScore}
          maxScore={maxScore}
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
