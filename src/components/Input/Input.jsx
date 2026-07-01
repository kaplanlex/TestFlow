import styles from "./Input.module.css";
import { useId } from "react";

function Input({
  label,
  error,
  value,
  onChange,
  placeholder,
  type = "text",
  name,
  disabled = false,
}) {
  const inputId = useId();

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Input;
