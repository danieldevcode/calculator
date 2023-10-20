function Button({ id, content, className, onClick }) {
  return (
    <button
      id={id ? id : content}
      className={`button ${className ? className : null}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export default Button;
