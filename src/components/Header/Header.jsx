import styles from "./Header.module.css";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";

function Header() {
  const { userName } = useAppContext();
  const { theme, toggleTheme } = useTheme();

  const isDarkTheme = theme === "dark";

  return (
    <header className={styles.header}>
      <div className={styles.userInfo}>
        <span className={styles.label}>QA-Инженер:</span>
        <span className={styles.userName}>{userName}</span>
      </div>

      <button
        className={styles.themeButton}
        type="button"
        onClick={toggleTheme}
      >
        {isDarkTheme ? "Светлая тема" : "Темная тема"}
      </button>
    </header>
  );
}

export default Header;
