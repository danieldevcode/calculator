import Button from "./Button";
import { useEffect } from "react";
import { create, all } from "mathjs";
import { buttons } from "../utils";
function Controls({
  expression,
  setExpression,
  constant,
  setConstant,
  evaluation,
  setEvaluation,
  setHistory,
}) {
  const math = create(all);
  
  useEffect(
    function buildExpression() {
      setExpression((prevExp) => {
        // CONSTANT IS AN OPERATOR
        if (isOperator(constant)) {
          /* Start a new calculation that operates on the
          result of the previous evaluation */
          if (evaluation) {
            const tempEvaluation = evaluation;
            setEvaluation(null);
            return [tempEvaluation, constant, ""];
          } else if (
            /* Replace 2 consecutive operators with the third one
            if it is different from the last one */
            isOperator(prevExp[prevExp.length - 1]) &&
            isOperator(prevExp[prevExp.length - 2])
          )
            return [...prevExp.slice(0, -2), constant];
          else return [...prevExp, constant];
        }
        // CONSTANT IS A NUMBER
        else {
          // Start a new calculation
          if (evaluation && constant != 0) {
            setEvaluation(null);
            return [constant];
          }
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
        }
      });
    },
    [constant]
  );

  function handleButton({ target }) {
    const value = target.value;
    isOperator(value) ? handleOperator(value) : handleConstant(value);
  }

  function handleOperator(operator) {
    if (operator === "clear") allClear();
    else if (operator === "backspace")
      setConstant((prevConst) => prevConst.slice(0, -1));
    else if (operator === "equals") evaluateExpression();
    // Operators +, -, *, /
    else setConstant(operator);
  }

  function isOperator(value) {
    return ["+", "-", "*", "/", "clear", "backspace", "equals"].includes(value);
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

  function allClear() {
    setExpression([]);
    setConstant("0");
    setEvaluation(null);
  }

  function evaluateExpression() {
    setEvaluation(() => {
      try {
        const evaluation = math.evaluate(expression.join(""));
        if (evaluation)
          setHistory((prevHistory) => [
            ...prevHistory,
            `${expression.join(" ")} = ${evaluation}`,
          ]);
        return evaluation;
      } catch (error) {
        return "Format error";
      }
    });
    setExpression([]);
    setConstant("0");
  }

  return (
    <div className="controls">
      {buttons.map((button, index) => (
        <Button key={index} {...button} onClick={handleButton} />
      ))}
    </div>
  );
}

export default Controls;
