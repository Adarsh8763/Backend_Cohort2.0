// ============================================================
// SHARED TYPES — Battle Arena type definitions
// ============================================================

export interface JudgeRecommendation {
  solution_1_score: number;
  solution_2_score: number;
  solution_1_resoning: string;
  solution_2_resoning: string;
}

export interface BattleState {
  problem: string;
  solution_1: string;
  solution_2: string;
  judge_recommendation: JudgeRecommendation;
}

export interface BattleRecord {
  id: string;
  problem: string;
  solution_1: string;
  solution_2: string;
  judge_recommendation: JudgeRecommendation;
  createdAt: string;
  isPinned: boolean;
  winner: 1 | 2 | null;
}

export type BattleStatus =
  | 'idle'
  | 'generating_solution_1'
  | 'generating_solution_2'
  | 'judging'
  | 'complete'
  | 'error';

export interface Model {
  id: string;
  name: string;
  label: string;
  accent: 'primary' | 'secondary';
}

export const MODELS: Model[] = [
  { id: 'mistral', name: 'Mistral', label: 'MistralAI', accent: 'primary' },
  { id: 'cohere', name: 'Cohere', label: 'Cohere', accent: 'secondary' },
];
