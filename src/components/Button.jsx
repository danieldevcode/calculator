function Button({ id, value, content, className, onClick }) {
  return (
    <button
      id={id}
      value={value}
      className={`button ${className ? className : null}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export default Button;
