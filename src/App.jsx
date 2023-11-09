import { useState } from "react";
import Controls from "./components/Controls";
import Screen from "./components/Screen";
import History from "./components/History";
import "./styles/app.scss";
import { useHotkeys } from "react-hotkeys-hook";

function App() {
  const [expression, setExpression] = useState([]);
  const [constant, setConstant] = useState("0");
  const [evaluation, setEvaluation] = useState(null);
  const [history, setHistory] = useState([]);
  const hotkeysArr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "backspace",
    "-",
    "+",
    "/",
    "multiply",
    ".",
    "enter",
    "delete",
  ];
  const hotkeysOpt = {
    preventDefault: true,
    combinationKey: "&",
  };

  useHotkeys(
    hotkeysArr,
    function handleHotkey(e) {
      const ID_DICTIONARY = {
        0: "zero",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
        "+": "add",
        "-": "subtract",
        "*": "multiply",
        "/": "divide",
        enter: "equals",
        ".": "decimal",
        delete: "clear",
        backspace: "backspace",
      };
      const ID = ID_DICTIONARY[e.key.toLowerCase()];
      const button = document.getElementById(ID);
      handleButtonStyle(button);
      button.click();
    },
    hotkeysOpt
  );

  function handleButtonStyle(button) {
    button.classList.add("active");
    setTimeout(() => {
      button.classList.remove("active");
    }, 50);
  }

  return (
    <div className="calculator">
      <Screen
        expression={expression}
        constant={constant}
        evaluation={evaluation}
      />
      <Controls
        expression={expression}
        setExpression={setExpression}
        constant={constant}
        setConstant={setConstant}
        evaluation={evaluation}
        setEvaluation={setEvaluation}
        setHistory={setHistory}
      />
      <History
        history={history}
        setHistory={setHistory}
        setExpression={setExpression}
        setConstant={setConstant}
        setEvaluation={setEvaluation}
      />
    </div>
  );
}

export default App;
