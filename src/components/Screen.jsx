function Screen({ expression }) {
  return (
    <div className="screen">
      <p className="formula">{expression}</p>
      <p className="result">0</p>
    </div>
  );
}

export default Screen;
