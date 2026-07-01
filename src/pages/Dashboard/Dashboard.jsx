import { Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import styles from "./Dashboard.module.css";
import { useAppContext } from "../../context/AppContext";

const BUG_STATUSES = ["Открыт", "В работе", "Исправлен", "Закрыт"];

function getEntityTitle(entity) {
  return (
    entity.title ||
    entity.name ||
    entity.summary ||
    entity.description ||
    "Без названия"
  );
}

function getEntityStatus(entity) {
  return entity.status || "Без статуса";
}

function getEntityPriority(entity) {
  return entity.priority || "Не указан";
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function Dashboard() {
  const { projects, bugs, testCases, checklists } = useAppContext();

  const hasNoData =
    projects.length === 0 &&
    bugs.length === 0 &&
    testCases.length === 0 &&
    checklists.length === 0;

  const counters = [
    {
      title: "Всего проектов",
      value: projects.length,
      description: "Проекты в системе",
    },
    {
      title: "Тест-кейсов",
      value: testCases.length,
      description: "Сценарии проверок",
    },
    {
      title: "Багов в системе",
      value: bugs.length,
      description: "Найденные дефекты",
    },
    {
      title: "Чек-листов",
      value: checklists.length,
      description: "Быстрые проверки",
    },
  ];

  const bugStatusCounts = BUG_STATUSES.map((status) => {
    const count = bugs.filter(
      (bug) => normalizeText(bug.status) === normalizeText(status),
    ).length;

    return {
      status,
      count,
    };
  });

  const maxBugCount = Math.max(...bugStatusCounts.map((item) => item.count), 1);

  const latestBugs = [...bugs]
    .sort((firstBug, secondBug) => {
      const firstDate = new Date(firstBug.createdAt || 0).getTime();
      const secondDate = new Date(secondBug.createdAt || 0).getTime();

      return secondDate - firstDate;
    })
    .slice(0, 5);

  const activeProjects = projects.filter((project) => {
    const status = normalizeText(project.status);

    return status === "активен" || status === "активный";
  });

  if (hasNoData) {
    return (
      <section className={styles.dashboard}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>TF</div>

          <h1 className={styles.emptyTitle}>TestFlow готов к запуску</h1>

          <p className={styles.emptyText}>
            Система готова к работе. Начните с создания проекта в меню слева.
          </p>

          <Link to="/projects" className={styles.emptyButton}>
            Перейти к проектам
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.dashboard}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Панель управления</h1>

          <p className={styles.pageDescription}>
            Краткая аналитика по проектам, тест-кейсам, багам и чек-листам.
          </p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {counters.map((counter) => (
          <article className={styles.statCard} key={counter.title}>
            <span className={styles.statLabel}>{counter.title}</span>

            <strong className={styles.statValue}>{counter.value}</strong>

            <p className={styles.statDescription}>{counter.description}</p>
          </article>
        ))}
      </div>

      <div className={styles.analyticsGrid}>
        <article className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Распределение багов</h2>

              <p className={styles.cardDescription}>
                Количество багов по текущим статусам.
              </p>
            </div>
          </div>

          <div className={styles.chartWrapper}>
            <svg
              className={styles.chart}
              viewBox="0 0 420 230"
              role="img"
              aria-label="Диаграмма распределения багов по статусам"
            >
              <line
                className={styles.axisLine}
                x1="30"
                y1="170"
                x2="390"
                y2="170"
              />

              {bugStatusCounts.map((item, index) => {
                const barHeight = (item.count / maxBugCount) * 120;
                const x = 55 + index * 90;
                const y = 170 - barHeight;

                return (
                  <g key={item.status}>
                    <rect
                      className={`${styles.chartBar} ${
                        styles[`bar${index + 1}`]
                      }`}
                      x={x}
                      y={y}
                      width="46"
                      height={barHeight}
                      rx="8"
                    />

                    <text
                      className={styles.chartValue}
                      x={x + 23}
                      y={y - 10}
                      textAnchor="middle"
                    >
                      {item.count}
                    </text>

                    <text
                      className={styles.chartLabel}
                      x={x + 23}
                      y="198"
                      textAnchor="middle"
                    >
                      {item.status}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </article>

        <article className={styles.summaryCard}>
          <h2 className={styles.cardTitle}>Сводка качества</h2>

          <div className={styles.summaryList}>
            {bugStatusCounts.map((item) => (
              <div className={styles.summaryItem} key={item.status}>
                <span className={styles.summaryStatus}>{item.status}</span>
                <strong className={styles.summaryValue}>{item.count}</strong>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className={styles.listsGrid}>
        <article className={styles.listCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Последние баги</h2>

              <p className={styles.cardDescription}>
                5 последних добавленных баг-репортов.
              </p>
            </div>
          </div>

          {latestBugs.length > 0 ? (
            <div className={styles.bugList}>
              {latestBugs.map((bug) => (
                <div className={styles.bugItem} key={bug.id}>
                  <div className={styles.bugMain}>
                    <h3 className={styles.itemTitle}>{getEntityTitle(bug)}</h3>

                    <div className={styles.badges}>
                      <StatusBadge value={getEntityPriority(bug)} />
                      <StatusBadge value={getEntityStatus(bug)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.smallEmptyText}>Баги пока не добавлены.</p>
          )}
        </article>

        <article className={styles.listCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Активные проекты</h2>

              <p className={styles.cardDescription}>
                Проекты со статусом &quot;Активен&quot;.
              </p>
            </div>
          </div>

          {activeProjects.length > 0 ? (
            <div className={styles.projectList}>
              {activeProjects.map((project) => (
                <div className={styles.projectItem} key={project.id}>
                  <div>
                    <h3 className={styles.itemTitle}>
                      {getEntityTitle(project)}
                    </h3>

                    <p className={styles.itemMeta}>
                      Создан: {project.createdAt || "дата не указана"}
                    </p>
                  </div>

                  <StatusBadge value={project.status || "Активен"} />
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.smallEmptyText}>Активных проектов пока нет.</p>
          )}
        </article>
      </div>
    </section>
  );
}

export default Dashboard;
