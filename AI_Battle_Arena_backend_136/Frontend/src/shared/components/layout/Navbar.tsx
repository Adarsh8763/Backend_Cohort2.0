import { NavLink } from 'react-router-dom';
import { Swords, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@shared/hooks/useAppStore';
import { toggleSidebar } from '@app/uiSlice';
import styles from './Navbar.module.scss';

export function Navbar() {
  const dispatch = useAppDispatch();

  return (
    <header className={styles.navbar}>
      {/* Logo */}
      <NavLink to="/" className={styles.logo}>
        <span className={styles.logoIcon}>
          <Swords size={14} color="#fff" />
        </span>
        Arena
      </NavLink>

      {/* Center nav */}
      <nav className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          Battle
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          History
        </NavLink>
        <NavLink
          to="/rankings"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          Rankings
        </NavLink>
      </nav>

      {/* Right actions */}
      <div className={styles.actions}>
        <motion.button
          className={styles.sidebarToggle}
          onClick={() => dispatch(toggleSidebar())}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </motion.button>
        <div className={styles.avatar} title="Profile">A</div>
      </div>
    </header>
  );
}
