import { useAppSelector } from '@shared/hooks/useAppStore';
import styles from '../styles/HistoryPage.module.scss';

export default function HistoryPage() {
  const { records } = useAppSelector((s) => s.history);

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1>Battle History</h1>
        <p className={styles.subtitle}>{records.length} battles recorded</p>
      </div>
      <div className={styles.grid}>
        {records.length === 0 ? (
          <div className={styles.empty}>
            <p>No battles yet. Go to the Arena and start your first battle!</p>
          </div>
        ) : (
          records.map((record) => (
            <div key={record.id} className={styles.card}>
              <p className={styles.cardProblem}>{record.problem}</p>
              <div className={styles.cardMeta}>
                <span className={`${styles.winner} ${record.winner === 1 ? styles.m1 : record.winner === 2 ? styles.m2 : ''}`}>
                  {record.winner ? `Winner: ${record.winner === 1 ? 'GPT-4o' : 'Claude 3.5'}` : 'Tie'}
                </span>
                <span className={styles.date}>
                  {new Date(record.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
