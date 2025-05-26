export interface Article {
  id: string;
  title: string;
  content: string[];
  links: Link[];
}

export interface Link {
  id?: string; // Optional since we can use array indices
  text: string;
  correctAnswer?: string | string[]; // Can be a single string or array of strings
  isMistake: boolean;
}

export interface GameState {
  currentArticleIndex: number;
  clickedLinks: Record<string, boolean>; // Track which links have been clicked by ID
  enteredCorrections: Record<string, string>; // Track corrections entered for mistakes by article ID
  scores: number[];
  gameCompleted: boolean;
}

export type GameResult = "unattempted" | "partial" | "incorrect" | "correct";

export interface GameResults {
  date: string;
  results: GameResult[];
  score: number;
  maxScore: number;
}
