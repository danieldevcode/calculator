import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { create, all } from "mathjs";

function Controls({
  expression,
  setExpression,
  constant,
  setConstant,
  evaluation,
  setEvaluation,
}) {
  const math = create(all);

  function handleButton({ target }) {
    const value = target.value;
    isOperator(value) ? handleOperator(value) : handleConstant(value);
  }

  function isOperator(value) {
    return ["+", "-", "*", "/", "clear", "backspace", "equals"].includes(value);
  }

  function allClear() {
    setConstant("0");
    setExpression([]);
    setEvaluation(null);
  }

  function handleOperator(operator) {
    // All clear
    if (operator === "clear") allClear();
    // Backspace
    else if (operator === "backspace") {
      setConstant((prevConst) => prevConst.slice(0, -1));
    }
    // Evaluate expression
    else if (operator === "equals") {
      setEvaluation(() => {
        try {
          return math.evaluate(expression.join(""));
        } catch (error) {
          return "Format error";
        }
      });
      setConstant("0");
      setExpression([]);
    }
    // Operators +, -, *, /
    else setConstant(operator);
  }

  function handleConstant(digit) {
    if (constant.length <= 22)
      setConstant((prevConst) => {
        // Replace default 0 with the digit && Can't begin with multiple zeros
        if (prevConst[0] == 0) return digit;
        // Replace operator with digit
        if (isOperator(prevConst[0])) return digit;
        // Two decimals in one constant are not allowed
        else if (digit === "." && prevConst.includes(".")) return prevConst;
        // Add digit to previous constant
        else return prevConst + digit;
      });
    [];
  }

  useEffect(() => {
      setExpression((prevExp) => {
        // Constant is an operator
        if (isOperator(constant)) {
          /* If an operator is pressed after an evaluation, 
          start a new calculation that operates on the
          result of the previous evaluation */
          if (evaluation) {
            const tempEvaluation = evaluation;
            setEvaluation(null);
            return [tempEvaluation, constant, ""];
          }
          // Replace consecutive operator EXCEPT "-"
          if (
            isOperator(prevExp[prevExp.length - 1]) &&
            isOperator(prevExp[prevExp.length - 2])
          )
            return [...prevExp.slice(0, -2), constant];

          return [...prevExp, constant];
        }

        // Constant is a number
        if (prevExp.length === 0) return [constant];
        else if (isOperator(prevExp[prevExp.length - 1])) {
          const newArr = [...prevExp, ""];
          const result = newArr.map((term, index) => {
            return newArr.length - 1 === index ? constant : term;
          });
          return result;
        } else {
          return prevExp.map((term, index) => {
            return prevExp.length - 1 === index ? constant : term;
          });
        }
      });
  }, [constant]);

  useEffect(() => {
    console.log(expression);
  }, [expression]);

  return (
    <div className="controls">
      <Button
        id="clear"
        value="clear"
        content="AC"
        className="ac"
        onClick={handleButton}
      />
      <Button
        id="divide"
        value="/"
        content="&#247;"
        className="operator"
        onClick={handleButton}
      />
      <Button id="seven" value="7" content="7" onClick={handleButton} />
      <Button id="eight" value="8" content="8" onClick={handleButton} />
      <Button id="nine" value="9" content="9" onClick={handleButton} />
      <Button
        id="multiply"
        value="*"
        content="&#215;"
        className="operator"
        onClick={handleButton}
      />
      <Button id="four" value="4" content="4" onClick={handleButton} />
      <Button id="five" value="5" content="5" onClick={handleButton} />
      <Button id="six" value="6" content="6" onClick={handleButton} />
      <Button
        id="subtract"
        value="-"
        content="&#8722;"
        className="operator"
        onClick={handleButton}
      />
      <Button id="one" value="1" content="1" onClick={handleButton} />
      <Button id="two" value="2" content="2" onClick={handleButton} />
      <Button id="three" value="3" content="3" onClick={handleButton} />
      <Button
        id="add"
        value="+"
        content="&#43;"
        className="operator"
        onClick={handleButton}
      />
      <Button id="zero" value="0" content="0" onClick={handleButton} />
      <Button id="decimal" value="." content="." onClick={handleButton} />
      <Button
        id="backspace"
        value="backspace"
        content={<FontAwesomeIcon icon={faDeleteLeft} size="sm" />}
        onClick={handleButton}
      />
      <Button
        id="equals"
        value="equals"
        content="&#61;"
        className="equal"
        onClick={handleButton}
      />
    </div>
  );
}

export default Controls;
