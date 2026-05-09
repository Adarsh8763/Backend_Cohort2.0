import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Trophy, Brain } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { BattleStatus } from '@shared/types';
import styles from '../styles/BattleArena.module.scss';

// ─── Streaming Text with animated cursor ─────────────────────
function StreamingText({
  text,
  isStreaming,
  isDone,
}: {
  text: string;
  isStreaming: boolean;
  isDone: boolean;
}) {
  if (!text && !isStreaming) return null;

  return (
    <div className={`${styles.responseText} ${isDone ? styles.complete : ''}`}>
      <ReactMarkdown>{text}</ReactMarkdown>
      {isStreaming && <span className={styles.cursor} aria-hidden="true" />}
    </div>
  );
}

// ─── Skeleton loader ─────────────────────────────────────────
function SkeletonLoader() {
  return (
    <div className={styles.skeleton}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={styles.skLine} />
      ))}
    </div>
  );
}

// ─── Idle state ──────────────────────────────────────────────
function IdleState({ icon: Icon }: { icon: typeof Bot }) {
  return (
    <div className={styles.idleState}>
      <div className={styles.idleIcon}>
        <Icon size={22} />
      </div>
      <p>Waiting for a battle to begin…</p>
    </div>
  );
}

// ─── Single Panel ─────────────────────────────────────────────
interface PanelProps {
  modelIndex: 1 | 2;
  modelName: string;
  modelProvider: string;
  text: string;
  status: BattleStatus;
  streamingModel: 1 | 2 | null;
  isWinner: boolean;
}

function Panel({
  modelIndex,
  modelName,
  modelProvider,
  text,
  status,
  streamingModel,
  isWinner,
}: PanelProps) {
  const isStreaming = streamingModel === modelIndex;
  const isWaiting =
    modelIndex === 2 &&
    status === 'generating_solution_1' &&
    !text;
  const isDone = status === 'complete' || status === 'judging';
  const showSkeleton =
    (modelIndex === 1 && status === 'generating_solution_1' && !text) ||
    (modelIndex === 2 && (status === 'generating_solution_2' && !text || isWaiting));

  return (
    <div
      className={`${styles.panel} ${isWinner ? styles.winning : ''} ${
        modelIndex === 1 ? styles.model1 : styles.model2
      }`}
    >
      {/* Header */}
      <div className={styles.panelHeader}>
        <div className={styles.modelInfo}>
          <span
            className={`${styles.modelDot} ${
              modelIndex === 1 ? styles.model1 : styles.model2
            }`}
          />
          <span className={styles.modelName}>{modelName}</span>
          <span className={styles.modelLabel}>{modelProvider}</span>
        </div>
        <div className={styles.panelStatus}>
          {isStreaming && (
            <span className={styles.streamingIndicator}>
              <span className={styles.dot} />
              Generating
            </span>
          )}
          {isWinner && status === 'complete' && (
            <motion.span
              className={styles.winnerBadge}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Trophy size={11} />
              Winner
            </motion.span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className={styles.panelBody}>
        <AnimatePresence mode="wait">
          {status === 'idle' ? (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <IdleState icon={modelIndex === 1 ? Brain : Bot} />
            </motion.div>
          ) : showSkeleton ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <SkeletonLoader />
            </motion.div>
          ) : (
            <motion.div
              key="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <StreamingText text={text} isStreaming={isStreaming} isDone={isDone} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Full Arena ───────────────────────────────────────────────
interface BattleArenaProps {
  solution1: string;
  solution2: string;
  status: BattleStatus;
  streamingModel: 1 | 2 | null;
  winner: 1 | 2 | null;
}

export function BattleArena({
  solution1,
  solution2,
  status,
  streamingModel,
  winner,
}: BattleArenaProps) {
  return (
    <motion.div
      className={styles.arena}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <Panel
        modelIndex={1}
        modelName="Mistral"
        modelProvider="MistralAI"
        text={solution1}
        status={status}
        streamingModel={streamingModel}
        isWinner={winner === 1}
      />

      {/* Divider */}
      <div className={styles.divider}>
        <span className={styles.vsBadge}>VS</span>
      </div>

      <Panel
        modelIndex={2}
        modelName="Cohere"
        modelProvider="Cohere"
        text={solution2}
        status={status}
        streamingModel={streamingModel}
        isWinner={winner === 2}
      />
    </motion.div>
  );
}
