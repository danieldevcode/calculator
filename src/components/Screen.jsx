import { useEffect, useRef } from "react";
import { replaceOperators } from "../utils";

function Screen({ expression, constant, evaluation }) {
  const EXPRESSION_REF = useRef();
  const CONSTANT_REF = useRef();

  useEffect(() => handleScroll(EXPRESSION_REF), [expression]);
  useEffect(() => handleScroll(CONSTANT_REF), [constant]);

  function handleScroll(ref) {
    const element = ref.current;
    if (element) element.scroll(element.scrollWidth, element.scrollHeight);
  }
  
  return (
    <div className="screen">
      {evaluation ? (
        <p
          id="display"
          className={isNaN(evaluation) ? "evaluation error" : "evaluation"}
        >
          {evaluation}
        </p>
      ) : (
        <>
          <p ref={EXPRESSION_REF} className="expression">
            {replaceOperators(expression).join(" ")}
          </p>
          <p id="display" ref={CONSTANT_REF} className="constant">
            {replaceOperators(constant.split()).join("")}
          </p>
        </>
      )}
    </div>
  );
}

export default Screen;
