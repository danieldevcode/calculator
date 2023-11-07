import { useEffect, useState, useRef } from "react";
import { replaceOperators } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faClockRotateLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function History({
  history,
  setHistory,
  setExpression,
  setConstant,
  setEvaluation,
}) {
  const LIST_REF = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const historyList = history.map((string, index) => {
    const equalIndex = string.indexOf("=");
    return (
      <li key={index} onClick={() => handleHistory(string)}>
        {replaceOperators(string.slice(0, equalIndex).split(""))}
        <span className="result">{string.slice(equalIndex + 1)}</span>
      </li>
    );
  });

  useEffect(
    function handleScroll() {
      if (isOpen) {
        const element = LIST_REF.current;
        element.scroll(0, element.scrollHeight);
      }
    },
    [isOpen]
  );

  function handleModal() {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  function handleHistory(string) {
    const expression = string.split(" ").slice(0, -2);
    const constant = expression[expression.length - 1];
    setConstant(constant)
    setExpression(expression);
    setEvaluation("");
    handleModal();
  }

  return (
    <>
      <div className="history-icon" onClick={handleModal}>
        <FontAwesomeIcon icon={faClockRotateLeft} size="sm" />
      </div>
      <div className={`history ${isOpen ? "open" : "closed"}`}>
        <section className="header">
          <div className="back-icon" onClick={handleModal}>
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
