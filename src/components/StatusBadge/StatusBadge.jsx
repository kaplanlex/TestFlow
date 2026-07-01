import styles from "./StatusBadge.module.css";

const statusClassMap = {
  /* Приоритеты */
  критический: "red",
  высокий: "red",
  средний: "amber",
  низкий: "green",

  /* Статусы багов */
  новый: "blue",
  открыт: "blue",
  "в работе": "violet",
  исправлен: "green",
  закрыт: "gray",
  "повторно открыт": "red",
  отклонен: "gray",
  отклонён: "gray",

  /* Статусы тест-кейсов */
  пройден: "green",
  провален: "red",
  заблокирован: "amber",
  "не выполнен": "gray",
  "в процессе": "violet",

  /* Статусы чек-листов */
  выполнен: "green",
  "не выполнено": "gray",
  частично: "amber",

  /* Статусы проектов */
  активен: "green",
  активный: "green",
  завершен: "gray",
  завершён: "gray",
  "на паузе": "amber",
  архивный: "gray",
};

function StatusBadge({ value }) {
  const normalizedValue = String(value || "")
    .trim()
    .toLowerCase();

  const colorClassName = statusClassMap[normalizedValue] || "gray";

  return (
    <span className={`${styles.badge} ${styles[colorClassName]}`}>
      {value || "Без статуса"}
    </span>
  );
}

export default StatusBadge;
