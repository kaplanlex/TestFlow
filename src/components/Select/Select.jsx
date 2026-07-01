import styles from "./Select.module.css";
import { useId } from "react";

function Select({
  label,
  options = [],
  value,
  onChange,
  name,
  disabled = false,
  placeholder = "Выберите значение",
}) {
  const selectId = useId();

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={selectId}>
          {label}
        </label>
      )}

      <select
        id={selectId}
        className={styles.select}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
