import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

export function replaceOperators(array) {
  const OPERATORS = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷",
  };
  return array.map((term) => {
    return OPERATORS[term] ? OPERATORS[term] : term;
  });
}

export const buttons = [
  {
    id: "clear",
    value: "clear",
    content: "AC",
    className: "ac",
  },
  {
    id: "divide",
    value: "/",
    content: "÷",
    className: "operator",
  },
  {
    id: "seven",
    value: "7",
    content: "7",
  },
  {
    id: "eight",
    value: "8",
    content: "8",
  },
  {
    id: "nine",
    value: "9",
    content: "9",
  },
  {
    id: "multiply",
    value: "*",
    content: "×",
    className: "operator",
  },
  {
    id: "four",
    value: "4",
    content: "4",
  },
  {
    id: "five",
    value: "5",
    content: "5",
  },
  {
    id: "six",
    value: "6",
    content: "6",
  },
  {
    id: "subtract",
    value: "-",
    content: "−",
    className: "operator",
  },
  {
    id: "one",
    value: "1",
    content: "1",
  },
  {
    id: "two",
    value: "2",
    content: "2",
  },
  {
    id: "three",
    value: "3",
    content: "3",
  },
  {
    id: "add",
    value: "+",
    content: "+",
    className: "operator",
  },
  {
    id: "zero",
    value: "0",
    content: "0",
  },
  {
    id: "decimal",
    value: ".",
    content: ".",
  },
  {
    id: "backspace",
    value: "backspace",
    content: <FontAwesomeIcon icon={faDeleteLeft} size="sm" />,
  },
  {
    id: "equals",
    value: "equals",
    content: "=",
    className: "equal",
  },
];
