import styles from "./Button.module.css";

function Button({
  variant = "primary",
  onClick,
  disabled = false,
  children,
  type = "button",
}) {
  const variantClass = styles[variant] || styles.primary;

  return (
    <button
      className={`${styles.button} ${variantClass}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
