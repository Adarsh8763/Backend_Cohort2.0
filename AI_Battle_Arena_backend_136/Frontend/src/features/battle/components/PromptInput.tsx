import { useRef, useState, useCallback, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import { useAppSelector } from "@shared/hooks/useAppStore";
import { Button } from "@shared/components/ui/Button";
import styles from "../styles/PromptInput.module.scss";

interface PromptInputProps {
  onSubmit: (problem: string) => void;
  isLoading?: boolean;
  defaultValue?: string;
}

const MAX_CHARS = 2000;

export function PromptInput({
  onSubmit,
  isLoading = false,
  defaultValue = "",
}: PromptInputProps) {
  const [value, setValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sidebarOpen } = useAppSelector((s) => s.ui);

  const charPct = value.length / MAX_CHARS;

  const handleSubmit = useCallback(() => {
    if (!value.trim() || isLoading) return;
    onSubmit(value.trim());
  }, [value, isLoading, onSubmit]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.shiftKey && e.key === "Enter") {
      return;
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    // Auto-resize
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 340)}px`;
    setValue(el.value);
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: sidebarOpen ? '76%' : '95%' }}
    >
      <label className={styles.label} htmlFor="battle-prompt">
        Problem Statement
      </label>

      <div
        className={`${styles.textareaOuterWrap} ${focused ? styles.focused : ""}`}
      >
        <div className={`${styles.textareaInnerWrap}`}>
          <textarea
            id="battle-prompt"
            ref={textareaRef}
            className={styles.textarea}
            placeholder='Describe a problem you want AI models to battle over… e.g. "Explain recursion with a real-world analogy"'
            value={value}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            maxLength={MAX_CHARS}
            rows={2}
            aria-label="Battle problem statement"
            disabled={isLoading}
          />
          <Button
            variant="primary"
            // size="md"
            leftIcon={<Swords size={15} />}
            // rightIcon={<ArrowUp size={16} />}
            onClick={handleSubmit}
            loading={isLoading}
            disabled={!value.trim() || isLoading}
            className={styles.submitBtn}
            aria-label="Start AI battle"
          >
          </Button>
        </div>

        <div className={styles.footer}>
          <span className={styles.hint}>
            <kbd>Enter</kbd>
            to start
          </span>
          <span
            className={`${styles.charCount} ${
              charPct > 0.9
                ? styles.danger
                : charPct > 0.7
                  ? styles.warning
                  : ""
            }`}
          >
            {value.length} / {MAX_CHARS}
          </span>
        </div>
      </div>

    </motion.div>
  );
}
