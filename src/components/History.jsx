import { useState, useEffect, useRef } from "react";
import { replaceOperators } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTrash,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

function History({
  history,
  setHistory,
  setExpression,
  setConstant,
  setEvaluation,
}) {
  const LIST_REF = useRef(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const historyList = history.map((string, index) => {
    const equalIndex = string.indexOf("=");
    return (
      <li key={index} onClick={() => handleHistory(string)}>
        {replaceOperators(string.slice(0, equalIndex).split("")).join("")}
        <span className="result">{string.slice(equalIndex + 1)}</span>
      </li>
    );
  });

  useEffect(
    function handleScroll() {
      if (isHistoryOpen) {
        const element = LIST_REF.current;
        element.scroll(0, element.scrollHeight);
      }
    },
    [isHistoryOpen, history]
  );

  function handleHistory(string) {
    const expression = string.split(" ").slice(0, -2);
    const constant = expression[expression.length - 1];
    setConstant(constant);
    setExpression(expression);
    setEvaluation("");
    setIsHistoryOpen(false);
  }

  return (
    <>
      <div className="history-icon" onClick={() => setIsHistoryOpen(true)}>
        <FontAwesomeIcon icon={faClockRotateLeft} size="sm" />
      </div>
      <div className={`history ${isHistoryOpen ? "open" : "closed"}`}>
        <section className="header">
          <div className="back-icon" onClick={() => setIsHistoryOpen(false)}>
            <FontAwesomeIcon icon={faArrowLeft} size="sm" />
          </div>
          <p className="title">History</p>
          <div className="trash-icon" onClick={() => setHistory([])}>
            <FontAwesomeIcon icon={faTrash} size="sm" />
          </div>
        </section>
        <ol ref={LIST_REF} className="list">
          {historyList}
        </ol>
      </div>
    </>
  );
}

export default History;
