import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>QA-платформа для тестировщиков</div>

          <h1 className={styles.title}>
            TestFlow — Профессиональное рабочее пространство тестировщика
          </h1>

          <p className={styles.description}>
            Управляйте проектами, создавайте тест-кейсы, ведите чек-листы,
            отслеживайте баги и контролируйте процесс тестирования в одном
            удобном интерфейсе.
          </p>

          <div className={styles.actions}>
            <Link to="/dashboard" className={styles.primaryButton}>
              Войти в панель
            </Link>

            <a href="#features" className={styles.secondaryButton}>
              Смотреть возможности
            </a>
          </div>
        </div>

        <div className={styles.heroCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardDot}></span>
            <span className={styles.cardDot}></span>
            <span className={styles.cardDot}></span>
          </div>

          <div className={styles.dashboardPreview}>
            <div className={styles.previewColumn}>
              <span className={styles.previewLabel}>Проекты</span>
              <strong className={styles.previewValue}>12</strong>
            </div>

            <div className={styles.previewColumn}>
              <span className={styles.previewLabel}>Тест-кейсы</span>
              <strong className={styles.previewValue}>248</strong>
            </div>

            <div className={styles.previewColumn}>
              <span className={styles.previewLabel}>Баги</span>
              <strong className={styles.previewValue}>37</strong>
            </div>
          </div>

          <div className={styles.progressBlock}>
            <div className={styles.progressHeader}>
              <span>Прогресс тестирования</span>
              <strong>76%</strong>
            </div>

            <div className={styles.progressTrack}>
              <div className={styles.progressFill}></div>
            </div>
          </div>

          <div className={styles.taskList}>
            <div className={styles.taskItem}>
              <span className={styles.taskStatusGreen}></span>
              Авторизация пользователя пройдена
            </div>

            <div className={styles.taskItem}>
              <span className={styles.taskStatusYellow}></span>
              Проверка корзины в процессе
            </div>

            <div className={styles.taskItem}>
              <span className={styles.taskStatusRed}></span>
              Ошибка оплаты требует исправления
            </div>
          </div>
        </div>
      </section>

      <section id="features" className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Возможности TestFlow</h2>

          <p className={styles.sectionDescription}>
            Минимум хаоса, максимум контроля над процессом тестирования.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>01</div>

            <h3 className={styles.featureTitle}>Управление проектами</h3>

            <p className={styles.featureText}>
              Создавайте проекты, отслеживайте их состояние и храните всю
              информацию о тестировании в одном месте.
            </p>
          </article>

          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>02</div>

            <h3 className={styles.featureTitle}>Трекинг багов</h3>

            <p className={styles.featureText}>
              Фиксируйте баг-репорты, назначайте приоритеты и контролируйте
              исправления через понятную Канбан-доску.
            </p>
          </article>

          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>03</div>

            <h3 className={styles.featureTitle}>Тест-дизайн</h3>

            <p className={styles.featureText}>
              Формируйте тест-кейсы, описывайте шаги проверки, ожидаемый
              результат и итоговый статус выполнения.
            </p>
          </article>

          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>04</div>

            <h3 className={styles.featureTitle}>Чек-листы</h3>

            <p className={styles.featureText}>
              Используйте быстрые списки проверок для регресса, smoke-тестов и
              повседневной QA-работы.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Home;
