import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, RotateCcw, Swords } from 'lucide-react';
import { useBattle } from '../hooks/useBattle';
import { PromptInput } from '../components/PromptInput';
import { BattleArena } from '../components/BattleArena';
import { JudgeSection } from '@features/judge/components/JudgeSection';
import { Button } from '@shared/components/ui/Button';
import styles from '../styles/BattlePage.module.scss';

export default function BattlePage() {
  const {
    problem,
    solution_1,
    solution_2,
    judge_recommendation,
    status,
    streamingModel,
    error,
    winner,
    submitProblem,
    reset,
  } = useBattle();

  const isBusy = status !== 'idle' && status !== 'complete' && status !== 'error';
  const hasStarted = status !== 'idle';

  return (
    <main className={styles.page}>
      {/* Hero */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.section
            className={styles.hero}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.heroEyebrow}>
              <Swords size={11} />
              AI Battle Arena
            </span>
            <h1 className={styles.heroTitle}>
              Let AI Models
              <br />
              Battle It Out
            </h1>
            <p className={styles.heroSubtitle}>
              Submit a problem. Watch Mistral and Cohere compete. A Judge AI
              declares the winner.
            </p>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Error banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            className={styles.errorBanner}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <AlertCircle size={16} />
            {error}
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<RotateCcw size={13} />}
              onClick={reset}
              className={styles.resetBtn}
            >
              Try again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Battle Arena */}
      <AnimatePresence>
        {hasStarted && (
          <BattleArena
            solution1={solution_1}
            solution2={solution_2}
            status={status}
            streamingModel={streamingModel}
            winner={winner}
          />
        )}
      </AnimatePresence>

      {/* Judge Section */}
      <JudgeSection
        recommendation={judge_recommendation}
        status={status}
        winner={winner}
      />

      {/* Reset after complete */}
      <AnimatePresence>
        {status === 'complete' && (
          <motion.div
            style={{ display: 'flex', justifyContent: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              variant="ghost"
              size="lg"
              leftIcon={<RotateCcw size={16} />}
              onClick={reset}
            >
              Start New Battle
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Problem input */}
      <PromptInput
        onSubmit={submitProblem}
        isLoading={isBusy}
        defaultValue={problem}
      />
    </main>
  );
}
