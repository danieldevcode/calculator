import { useState } from "react";
import Controls from "./components/Controls";
import Screen from "./components/Screen";
import "./styles/calculator.scss";

function App() {
  const [expression, setExpression] = useState("");
  return (
    <div className="calculator">
      <Screen expression={expression} />
      <Controls expression={expression} setExpression={setExpression} />
    </div>
  );
}

export default App;
