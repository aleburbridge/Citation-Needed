export interface Article {
  id: string;
  title: string;
  content: string;
  mistake: {
    text: string;
    correctAnswer: string;
    startIndex: number;
    endIndex: number;
  };
}

export interface GameState {
  currentArticleIndex: number;
  clickedMistakes: boolean[];
  enteredCorrections: string[];
  scores: number[];
  gameCompleted: boolean;
}

export type GameResult = "correct" | "incorrect" | "unattempted";

export interface GameResults {
  date: string;
  results: GameResult[];
  score: number;
  maxScore: number;
}
