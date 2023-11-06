import { useState } from "react";
import { replaceOperators } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faClockRotateLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function History({ history, setHistory }) {
  const [isOpen, setIsOpen] = useState(false);
  const historyList = history.map((string, index) => {
    const equalIndex = string.indexOf("=");
    return (
      <li key={index} data-value={string}>
        {replaceOperators(string.slice(0, equalIndex).split(""))}
        <span className="result">{string.slice(equalIndex + 1)}</span>
      </li>
    );
  });

  function handleModal() {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  return (
    <>
      <div className="history-button" onClick={handleModal}>
        <FontAwesomeIcon icon={faClockRotateLeft} size="sm" />
      </div>
      <div className="history">
        <section className="header">
          <FontAwesomeIcon
            className="back-icon"
            icon={faArrowLeft}
            size="sm"
            onClick={handleModal}
          />
          <p className="title">History</p>
          <FontAwesomeIcon
            className="trash-icon"
            icon={faTrash}
            size="xs"
            onClick={() => setHistory([])}
          />
        </section>
        <ol className="list">{historyList}</ol>
      </div>
    </>
  );
}

export default History;
