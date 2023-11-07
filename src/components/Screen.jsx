import { useEffect, useRef } from "react";
import { replaceOperators } from "../utils";

function Screen({ expression, constant, evaluation }) {
  const EXPRESSION_REF = useRef();
  const CONSTANT_REF = useRef();

  useEffect(
    function handleExpressionScroll() {
      const element = EXPRESSION_REF.current;
      if (element) element.scroll(0, element.scrollHeight);
    },
    [expression]
  );

  useEffect(
    function handleConstantScroll() {
      const element = CONSTANT_REF.current;
      if (element) element.scroll(element.scrollWidth, 0);
    },
    [constant]
  );

  function handleClass(className) {
    return evaluation === "Format error" ? `${className} error` : className;
  }

  return (
    <div className="screen">
      {evaluation ? (
        <p id="display" className={handleClass("evaluation")}>
          {evaluation}
        </p>
      ) : (
        <>
          <p ref={EXPRESSION_REF} className="expression">
            {replaceOperators(expression).join(" ")}
          </p>
          <p id="display" ref={CONSTANT_REF} className="constant">
            {replaceOperators(constant.split())}
          </p>
        </>
      )}
    </div>
  );
}

export default Screen;