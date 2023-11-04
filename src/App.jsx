import { useState } from "react";
import Controls from "./components/Controls";
import Screen from "./components/Screen";
import "./styles/calculator.scss";
import { useHotkeys } from "react-hotkeys-hook";

function App() {
  const [expression, setExpression] = useState([]);
  const [constant, setConstant] = useState([]);
  const [evaluation, setEvaluation] = useState(null);
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
      const button = document.getElementById(e.key.toLowerCase());
      handleButtonStyle(button);
      button.click();
    },
    hotkeysOpt
  );

  function handleButtonStyle(button) {
    button.style.backgroundColor = "rgb(204,204,255)";
    setTimeout(() => {
      button.removeAttribute("style");
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
      />
    </div>
  );
}

export default App;
