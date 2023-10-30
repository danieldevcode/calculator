import { useEffect, useState } from "react";
import { create, all } from "mathjs";

function Screen({ expression, constant }) {
  const [evaluation, setEvaluation] = useState(null);
  const math = create(all);

  useEffect(
    function evaluteExpression() {
      setEvaluation(() => {
        try {
          return math.evaluate(expression.join(""));
        } catch (error) {
          return "Format error";
        }
      });
    },
    [expression]
  );

  // NOTE: COULD I RUN JUST A FUNCTION ?
  return (
    <div className="screen">
      <p className="expression">{expression.join(" ")}</p>
      <p className="evaluation">{constant.join("")}</p>
      <p className="evaluation">{evaluation}</p>
    </div>
  );
}

export default Screen;
