import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@shared/components/layout/Navbar';
import { Sidebar } from '@shared/components/layout/Sidebar';
import { useAppSelector } from '@shared/hooks/useAppStore';

// Lazy-loaded pages
const BattlePage = lazy(() => import('@features/battle/pages/BattlePage'));
const HistoryPage = lazy(() => import('@features/history/pages/HistoryPage'));

// Layout wrapper with sidebar offset
function PageSkeleton() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-3)',
        fontSize: '0.875rem',
      }}
    >
      Loading…
    </div>
  );
}

export function AppRoutes() {
  const { sidebarOpen } = useAppSelector((s) => s.ui);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar isOpen={sidebarOpen} />
      <div
        style={{
          flex: 1,
          marginLeft: sidebarOpen ? 'var(--sidebar-width)' : 0,
          transition: 'margin-left 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          minWidth: 0,
        }}
      >
        <Navbar />
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<BattlePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/rankings" element={<BattlePage />} />
            <Route path="*" element={<BattlePage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
