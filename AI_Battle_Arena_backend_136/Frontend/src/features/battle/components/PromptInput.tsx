import { useRef, useState, useCallback, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Swords, ArrowUp } from 'lucide-react';
import { Button } from '@shared/components/ui/Button';
import styles from '../styles/PromptInput.module.scss';

interface PromptInputProps {
  onSubmit: (problem: string) => void;
  isLoading?: boolean;
  defaultValue?: string;
}

const MAX_CHARS = 2000;

export function PromptInput({ onSubmit, isLoading = false, defaultValue = '' }: PromptInputProps) {
  const [value, setValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const charPct = value.length / MAX_CHARS;

  const handleSubmit = useCallback(() => {
    if (!value.trim() || isLoading) return;
    onSubmit(value.trim());
  }, [value, isLoading, onSubmit]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    // Auto-resize
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 340)}px`;
    setValue(el.value);
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <label className={styles.label} htmlFor="battle-prompt">
        Problem Statement
      </label>

      <div className={`${styles.textareaWrap} ${focused ? styles.focused : ''}`}>
        <textarea
          id="battle-prompt"
          ref={textareaRef}
          className={styles.textarea}
          placeholder="Describe a problem you want AI models to battle over… e.g. &quot;Explain recursion with a real-world analogy&quot;"
          value={value}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={MAX_CHARS}
          rows={4}
          aria-label="Battle problem statement"
          disabled={isLoading}
        />

        <div className={styles.footer}>
          <span className={styles.hint}>
            <kbd>⌘</kbd>
            <kbd>Enter</kbd>
            to start
          </span>
          <span
            className={`${styles.charCount} ${
              charPct > 0.9 ? styles.danger : charPct > 0.7 ? styles.warning : ''
            }`}
          >
            {value.length} / {MAX_CHARS}
          </span>
        </div>
      </div>

      <div className={styles.submitRow}>
        <Button
          variant="primary"
          size="xl"
          leftIcon={<Swords size={18} />}
          rightIcon={<ArrowUp size={16} />}
          onClick={handleSubmit}
          loading={isLoading}
          disabled={!value.trim() || isLoading}
          className={styles.submitBtn}
          aria-label="Start AI battle"
        >
          {isLoading ? 'Battle in Progress…' : 'Start Battle'}
        </Button>
      </div>
    </motion.div>
  );
}
