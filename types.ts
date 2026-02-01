
export enum GameStage {
  SPLASH = 'SPLASH',
  MAP = 'MAP',
  STAGE_1 = 'STAGE_1', // Ha Long - Phonetics
  STAGE_2 = 'STAGE_2', // Hoi An - Vocabulary
  STAGE_3 = 'STAGE_3', // Phu Quoc - Grammar
  RESULT = 'RESULT'
}

export interface UserProgress {
  username: string;
  xp: number;
  unlockedStages: number[];
  completedStages: number[];
  badges: string[];
}

export interface Question {
  id: number;
  text: string;
  options?: string[];
  answer: string | string[];
  hint?: string;
  type: 'multiple-choice' | 'drag-drop' | 'fill-blank' | 'matching' | 'reorder';
  explanation?: string;
}

export interface MatchingItem {
  id: string;
  left: string;
  right: string;
}
