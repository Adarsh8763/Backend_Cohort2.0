// ============================================================
// BATTLE SLICE — core battle state management
// ============================================================
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BattleState, BattleStatus, JudgeRecommendation } from '@shared/types';

interface BattleSliceState {
  problem: string;
  solution_1: string;
  solution_2: string;
  judge_recommendation: JudgeRecommendation;
  status: BattleStatus;
  error: string | null;
  streamingModel: 1 | 2 | null;
}

const initialRecommendation: JudgeRecommendation = {
  solution_1_score: 0,
  solution_2_score: 0,
  solution_1_resoning: '',
  solution_2_resoning: '',
};

const initialState: BattleSliceState = {
  problem: '',
  solution_1: '',
  solution_2: '',
  judge_recommendation: initialRecommendation,
  status: 'idle',
  error: null,
  streamingModel: null,
};

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    setProblem(state, action: PayloadAction<string>) {
      state.problem = action.payload;
    },
    startBattle(state) {
      state.status = 'generating_solution_1';
      state.solution_1 = '';
      state.solution_2 = '';
      state.judge_recommendation = initialRecommendation;
      state.error = null;
      state.streamingModel = 1;
    },
    appendSolution1(state, action: PayloadAction<string>) {
      state.solution_1 += action.payload;
    },
    setSolution1Done(state) {
      state.status = 'generating_solution_2';
      state.streamingModel = 2;
    },
    appendSolution2(state, action: PayloadAction<string>) {
      state.solution_2 += action.payload;
    },
    setSolution2Done(state) {
      state.status = 'judging';
      state.streamingModel = null;
    },
    setJudgeResult(state, action: PayloadAction<JudgeRecommendation>) {
      state.judge_recommendation = action.payload;
      state.status = 'complete';
    },
    setBattleError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.status = 'error';
      state.streamingModel = null;
    },
    resetBattle() {
      return initialState;
    },
    // For mock/demo: set full state from API response
    setBattleState(state, action: PayloadAction<BattleState>) {
      state.problem = action.payload.problem;
      state.solution_1 = action.payload.solution_1;
      state.solution_2 = action.payload.solution_2;
      state.judge_recommendation = action.payload.judge_recommendation;
      state.status = 'complete';
    },
  },
});

export const {
  setProblem,
  startBattle,
  appendSolution1,
  setSolution1Done,
  appendSolution2,
  setSolution2Done,
  setJudgeResult,
  setBattleError,
  resetBattle,
  setBattleState,
} = battleSlice.actions;

export default battleSlice.reducer;
