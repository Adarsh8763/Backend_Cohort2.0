import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Trophy, MessageSquare } from 'lucide-react';
import type { JudgeRecommendation, BattleStatus } from '@shared/types';
import styles from '../styles/JudgeSection.module.scss';

// ─── Animated score bar ───────────────────────────────────────
function ScoreBar({
  score,
  maxScore = 10,
  model,
  isWinner,
}: {
  score: number;
  maxScore?: number;
  model: 1 | 2;
  isWinner: boolean;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth((score / maxScore) * 100), 300);
    return () => clearTimeout(t);
  }, [score, maxScore]);

  return (
    <div className={`${styles.scoreCard} ${isWinner ? styles.winner : ''}`}>
      <div className={styles.scoreCardHeader}>
        <span className={styles.scoreModelName}>
          <span
            className={`${styles.scoreDot} ${model === 1 ? styles.model1 : styles.model2}`}
          />
          {model === 1 ? 'GPT-4o' : 'Claude 3.5'}
        </span>
        <span className={`${styles.scoreValue} ${model === 1 ? styles.model1 : styles.model2}`}>
          {score.toFixed(1)}
          <span style={{ fontSize: '0.55em', opacity: 0.5, marginLeft: 2 }}>/10</span>
        </span>
      </div>
      <div className={styles.scoreBarTrack}>
        <motion.div
          className={`${styles.scoreBarFill} ${model === 1 ? styles.model1 : styles.model2}`}
          style={{ width: `${width}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </div>
    </div>
  );
}

// ─── Reasoning card ──────────────────────────────────────────
function ReasoningCard({
  model,
  reasoning,
}: {
  model: 1 | 2;
  reasoning: string;
}) {
  return (
    <motion.div
      className={styles.reasoningCard}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: model === 1 ? 0.5 : 0.65 }}
    >
      <div className={styles.reasoningHeader}>
        <span className={styles.reasoningTitle}>
          <MessageSquare size={13} />
          {model === 1 ? 'GPT-4o' : 'Claude 3.5'} — Judge's Reasoning
        </span>
      </div>
      <p className={styles.reasoningText}>{reasoning}</p>
    </motion.div>
  );
}

// ─── Judging state ───────────────────────────────────────────
function JudgingState() {
  return (
    <div className={styles.judgingSkeleton}>
      <div className={styles.judgingLabel}>
        <span className={styles.judgingDot} />
        Judge AI is analyzing both responses…
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────
interface JudgeSectionProps {
  recommendation: JudgeRecommendation;
  status: BattleStatus;
  winner: 1 | 2 | null;
}

export function JudgeSection({ recommendation, status, winner }: JudgeSectionProps) {
  if (status === 'idle' || status === 'generating_solution_1' || status === 'generating_solution_2') {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.section
        className={styles.judgeSection}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Judge Results"
      >
        {/* Header */}
        <div className={styles.judgeHeader}>
          <div className={styles.judgeTitle}>
            <span className={styles.judgeBadge}>
              <Scale size={14} />
              Judge AI
            </span>
            <div>
              <p className={styles.judgeSubtitle}>Comparative evaluation complete</p>
            </div>
          </div>

          {status === 'complete' && winner && (
            <motion.div
              className={styles.winnerAnnouncement}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.4 }}
            >
              <Trophy size={18} color="var(--judge)" />
              <div>
                <div className={styles.winnerLabel}>Winner</div>
                <div className={styles.winnerName}>
                  {winner === 1 ? 'GPT-4o' : 'Claude 3.5'}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Judging indicator */}
        {status === 'judging' ? (
          <JudgingState />
        ) : (
          <>
            {/* Score bars */}
            <div className={styles.scoresGrid}>
              <ScoreBar
                score={recommendation.solution_1_score}
                model={1}
                isWinner={winner === 1}
              />
              <ScoreBar
                score={recommendation.solution_2_score}
                model={2}
                isWinner={winner === 2}
              />
            </div>

            {/* Reasoning */}
            <div className={styles.reasoningGrid}>
              <ReasoningCard model={1} reasoning={recommendation.solution_1_resoning} />
              <ReasoningCard model={2} reasoning={recommendation.solution_2_resoning} />
            </div>
          </>
        )}
      </motion.section>
    </AnimatePresence>
  );
}
