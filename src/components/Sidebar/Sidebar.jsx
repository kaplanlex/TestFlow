import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <NavLink to="/" className={styles.logo}>
        <span className={styles.logoMark}>T</span>
        <span className={styles.logoText}>TestFlow</span>
      </NavLink>

      <nav className={styles.nav} aria-label="Основная навигация">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Панель управления
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Проекты
        </NavLink>

        <NavLink
          to="/test-cases"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Тест-кейсы
        </NavLink>

        <NavLink
          to="/checklists"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Чек-листы
        </NavLink>

        <NavLink
          to="/bugs"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Баг-репорты
        </NavLink>

        <NavLink
          to="/kanban"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Канбан-доска
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Настройки
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
