import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function Controls({ expression, setExpression, constant, setConstant }) {
  function handleButton({ target }) {
    const value = target.id;
    isOperator(value) ? handleOperator(value) : handleConstant(value);
  }

  function isOperator(value) {
    return ["+", "-", "*", "/", "delete", "backspace", "enter"].includes(value);
  }

  function handleOperator(operator) {
    // All clear
    if (operator === "delete") {
      console.clear();
      setConstant([]);
      setExpression([]);
    }
    // Backspace
    else if (operator === "backspace") {
      if (constant.length > 0) {
        setConstant((prevConst) => prevConst.slice(0, -1));
      }
    }
    // Evaluate expression
    else if (operator === "enter") console.log("evaluate");
    // Operators
    else {
      if (
        operator === "-" &&
        constant.length === 0 &&
        expression[expression.length - 2] !== "-"
      )
        setConstant((prevConst) => [...prevConst, operator]);
      else if (constant.length > 0 && constant.join("") !== "-") {
        setExpression((prevExp) => [...prevExp, operator, ""]);
        setConstant([]);
      }
    }
  }

  function handleConstant(digit) {
    setConstant((prevConst) => {
      return digit === "." && prevConst.includes(".")
        ? [...prevConst]
        : [...prevConst, digit];
    });
  }

  // Save constant in expression
  useEffect(() => {
    setExpression((prevExp) => {
      return prevExp.length <= 1
        ? [constant.join("")]
        : prevExp.map((term, index) => {
            return prevExp.length - 1 == index ? constant.join("") : term;
          });
    });
  }, [constant]);

  useEffect(() => {
    console.log(`Constant [${constant}]`);
  }, [constant]);

  useEffect(() => {
    // console.log(`Expression: [${expression}]`);
    console.log(expression);
  }, [expression]);

  return (
    <div className="controls">
      <Button id="delete" content="AC" className="ac" onClick={handleButton} />
      <Button
        id="/"
        content="&#247;"
        className="operator"
        onClick={handleButton}
      />
      <Button content="7" onClick={handleButton} />
      <Button content="8" onClick={handleButton} />
      <Button content="9" onClick={handleButton} />
      <Button
        id="*"
        content="&#215;"
        className="operator"
        onClick={handleButton}
      />
      <Button content="4" onClick={handleButton} />
      <Button content="5" onClick={handleButton} />
      <Button content="6" onClick={handleButton} />
      <Button
        id="-"
        content="&#8722;"
        className="operator"
        onClick={handleButton}
      />
      <Button content="1" onClick={handleButton} />
      <Button content="2" onClick={handleButton} />
      <Button content="3" onClick={handleButton} />
      <Button
        id="+"
        content="&#43;"
        className="operator"
        onClick={handleButton}
      />
      <Button content="0" onClick={handleButton} />
      <Button content="." onClick={handleButton} />
      <Button
        id="backspace"
        content={<FontAwesomeIcon icon={faDeleteLeft} size="sm" />}
        onClick={handleButton}
      />
      <Button
        id="enter"
        content="&#61;"
        className="equal"
        onClick={handleButton}
      />
    </div>
  );
}

export default Controls;
