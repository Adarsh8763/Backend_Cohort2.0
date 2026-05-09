import { motion, AnimatePresence } from 'framer-motion';
import { Search, Pin, PinOff, Plus, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@shared/hooks/useAppStore';
import { togglePin, setSelectedId, setSearchQuery } from '@features/history/historySlice';
import { Button } from '@shared/components/ui/Button';
import styles from './Sidebar.module.scss';
import type { BattleRecord } from '@shared/types';

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function BattleItem({ record, isSelected }: { record: BattleRecord; isSelected: boolean }) {
  const dispatch = useAppDispatch();

  return (
    <motion.button
      className={`${styles.battleItem} ${isSelected ? styles.selected : ''}`}
      onClick={() => dispatch(setSelectedId(record.id))}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.2 }}
    >
      <span
        className={`${styles.winnerDot} ${
          record.winner === 1 ? styles.model1 : record.winner === 2 ? styles.model2 : styles.tie
        }`}
      />
      <div className={styles.itemContent}>
        <div className={styles.itemTitle}>{record.problem}</div>
        <div className={styles.itemMeta}>{formatDate(record.createdAt)}</div>
      </div>
      <motion.button
        className={`${styles.pinBtn} ${record.isPinned ? styles.pinned : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(togglePin(record.id));
        }}
        whileTap={{ scale: 0.85 }}
        aria-label={record.isPinned ? 'Unpin' : 'Pin'}
      >
        {record.isPinned ? <Pin size={12} /> : <PinOff size={12} />}
      </motion.button>
    </motion.button>
  );
}

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { records, searchQuery, selectedId } = useAppSelector((s) => s.history);

  const filtered = records.filter((r) =>
    r.problem.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const pinned = filtered.filter((r) => r.isPinned);
  const recent = filtered.filter((r) => !r.isPinned);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          className={styles.sidebar}
          initial={{ x: -240 }}
          animate={{ x: 0 }}
          exit={{ x: -240 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Search */}
          <div className={styles.sidebarHead}>
            <div className={styles.searchWrap}>
              <Search size={14} className={styles.searchIcon} />
              <input
                type="search"
                placeholder="Search battles…"
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                aria-label="Search battle history"
              />
            </div>
          </div>

          {/* New battle */}
          <div className={styles.newBattleBtn}>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Plus size={14} />}
              onClick={() => navigate('/')}
              style={{ width: '100%' }}
            >
              New Battle
            </Button>
          </div>

          {/* Pinned */}
          {pinned.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionLabel}>Pinned</div>
              <AnimatePresence>
                {pinned.map((r) => (
                  <BattleItem key={r.id} record={r} isSelected={selectedId === r.id} />
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Recent */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>
              <Clock size={10} style={{ display: 'inline', marginRight: 4 }} />
              Recent
            </div>
            {recent.length === 0 ? (
              <p className={styles.empty}>No battles yet. Start your first battle!</p>
            ) : (
              <AnimatePresence>
                {recent.map((r) => (
                  <BattleItem key={r.id} record={r} isSelected={selectedId === r.id} />
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
