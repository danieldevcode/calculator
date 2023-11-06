export function replaceOperators(array) {
  const OPERATORS = {
    "+": "+",
    "-": "-",
    "*": "×",
    "/": "÷",
  };
  return array.map((term) => {
    return OPERATORS[term] ? OPERATORS[term] : term;
  });
}
