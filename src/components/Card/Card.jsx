import styles from "./Card.module.css";

function Card({ title, extra, children }) {
  return (
    <section className={styles.card}>
      {(title || extra) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}

          {extra && <div className={styles.extra}>{extra}</div>}
        </div>
      )}

      <div className={styles.body}>{children}</div>
    </section>
  );
}

export default Card;
