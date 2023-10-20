import { useState } from "react";
import Controls from "./components/Controls";
import Screen from "./components/Screen";
import "./styles/calculator.scss";
import { useHotkeys } from "react-hotkeys-hook";

function App() {
  const [expression, setExpression] = useState([]);
  const [constant, setConstant] = useState([]);
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
      document.getElementById(e.key.toLowerCase()).click();
    },
    hotkeysOpt
  );

  return (
    <div className="calculator">
      <Screen expression={expression} constant={constant} />
      <Controls
        expression={expression}
        setExpression={setExpression}
        constant={constant}
        setConstant={setConstant}
      />
    </div>
  );
}

export default App;
