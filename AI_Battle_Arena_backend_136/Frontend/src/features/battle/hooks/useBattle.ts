// ============================================================
// useBattle — orchestrates the full battle lifecycle
// ============================================================
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useAppStore';
import {
  setProblem,
  startBattle,
  setSolution1Done,
  setSolution2Done,
  setJudgeResult,
  setBattleError,
  resetBattle,
  appendSolution1,
  appendSolution2,
} from '../battleSlice';
import { addRecord } from '@features/history/historySlice';
import type { BattleRecord } from '@shared/types';
import { useStartBattleMutation } from '../services/battleApi';

export function useBattle() {
  const dispatch = useAppDispatch();
  const battle = useAppSelector((s) => s.battle);
  const [startBattleMutation, { isLoading }] = useStartBattleMutation();

  const submitProblem = useCallback(
    async (problem: string) => {
      if (!problem.trim()) return;
      dispatch(setProblem(problem));
      dispatch(startBattle());

      try {
        // ── Simulate streaming for demo ───────────────────
        // Replace this block with real SSE/WebSocket stream from backend
        const result = await startBattleMutation({ problem }).unwrap();

        // Stream solution 1 char by char (demo)
        for (const char of result.solution_1) {
          dispatch(appendSolution1(char));
          await new Promise((r) => setTimeout(r, 5));
        }
        dispatch(setSolution1Done());

        // Stream solution 2
        for (const char of result.solution_2) {
          dispatch(appendSolution2(char));
          await new Promise((r) => setTimeout(r, 5));
        }
        dispatch(setSolution2Done());

        // Set judge result
        dispatch(setJudgeResult(result.judge_recommendation));

        // Save to history
        const winner =
          result.judge_recommendation.solution_1_score >
          result.judge_recommendation.solution_2_score
            ? 1
            : result.judge_recommendation.solution_2_score >
              result.judge_recommendation.solution_1_score
            ? 2
            : null;

        const record: BattleRecord = {
          id: crypto.randomUUID(),
          problem: result.problem,
          solution_1: result.solution_1,
          solution_2: result.solution_2,
          judge_recommendation: result.judge_recommendation,
          createdAt: new Date().toISOString(),
          isPinned: false,
          winner,
        };
        dispatch(addRecord(record));
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Battle failed. Please try again.';
        dispatch(setBattleError(message));
      }
    },
    [dispatch, startBattleMutation],
  );

  const reset = useCallback(() => dispatch(resetBattle()), [dispatch]);

  return {
    ...battle,
    isLoading,
    submitProblem,
    reset,
    winner:
      battle.status === 'complete'
        ? battle.judge_recommendation.solution_1_score >
          battle.judge_recommendation.solution_2_score
          ? (1 as const)
          : battle.judge_recommendation.solution_2_score >
            battle.judge_recommendation.solution_1_score
          ? (2 as const)
          : null
        : null,
  };
}
