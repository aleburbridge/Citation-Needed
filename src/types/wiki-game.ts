export interface Article {
  id: string;
  title: string;
  content: string[];
  links: Link[];
  mistakeIndex: number;
}

export interface Link {
  id: string;
  text: string;
  correctAnswer?: string; // Only present for the mistake link
  isMistake: boolean;
}

export interface GameState {
  currentArticleIndex: number;
  clickedLinks: Record<string, boolean>; // Track which links have been clicked by ID
  enteredCorrections: Record<string, string>; // Track corrections entered for mistakes by article ID
  scores: number[];
  gameCompleted: boolean;
}

export type GameResult = "correct" | "incorrect" | "partial" | "unattempted";

export interface GameResults {
  date: string;
  results: GameResult[];
  score: number;
  maxScore: number;
}
