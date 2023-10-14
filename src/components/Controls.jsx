import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

function Controls({ expression, setExpression }) {
  // Hacer una subsexpression separada por los simbolos
  // Asi tambien controlo los puntos por subexpresion

  // REFACTOR: 
  function handleButton(e) {
    const char = e.target.textContent;
    const prevChar = expression.slice(-1);
    const isNumber = Number.isInteger(Number(char));

    if (isNumber) updateExpression(char);
    else if (char == "AC") setExpression("");
    else if (expression != "") replaceOperator(char);
  }

  function updateExpression(char) {
    setExpression((prevExpression) => prevExpression.concat(char));
  }

  function replaceOperator(operator) {
    setExpression((prev) => {
      const prevCharIsNumber = Number.isInteger(Number(prev.slice(-1)));
      if (prevCharIsNumber) return prev.concat(operator);
      else return prev.slice(0, -1).concat(operator);
    });
  }

  return (
    <div className="controls">
      <Button content="AC" className="ac" onClick={handleButton} />
      <Button content="&#247;" className="operator" onClick={handleButton} />
      <Button content="7" onClick={handleButton} />
      <Button content="8" onClick={handleButton} />
      <Button content="9" onClick={handleButton} />
      <Button content="&#215;" className="operator" onClick={handleButton} />
      <Button content="4" onClick={handleButton} />
      <Button content="5" onClick={handleButton} />
      <Button content="6" onClick={handleButton} />
      <Button content="&#8722;" className="operator" onClick={handleButton} />
      <Button content="1" onClick={handleButton} />
      <Button content="2" onClick={handleButton} />
      <Button content="3" onClick={handleButton} />
      <Button content="&#43;" className="operator" onClick={handleButton} />
      <Button content="0" onClick={handleButton} />
      <Button content="." onClick={handleButton} />
      <Button content={<FontAwesomeIcon icon={faDeleteLeft} size="sm" />} />
      <Button content="&#61;" className="equal" />
    </div>
  );
}

export default Controls;
