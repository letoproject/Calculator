const currentOperation = document.querySelector(".currentOperation");
const previousOperation = document.querySelector(".previousOperation");
const buttons = document.querySelectorAll("button");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");
const signBtn = document.querySelector(".sign");
const operandBtns = document.querySelectorAll(".operand");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");

currentOperation.textContent = "0";
previousOperation.textContent = "";
let previousOperand = "";
let currentOperand = "";
let currentOperator = null;
let result = null;

clearBtn.addEventListener("click", initialState);
delBtn.addEventListener("click", deleteValue);
signBtn.addEventListener("click", setSign);
equalsBtn.addEventListener("click", evaluate);

operandBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => getValue(e.target.value));
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => getOperator(e.target.value));
});

function initialState() {
  currentOperation.textContent = "0";
  previousOperation.textContent = "";
  previousOperand = "";
  currentOperand = "";
  currentOperator = null;
  result = null;
}

console.log(result);

function deleteValue() {
  if (currentOperation.textContent === "0") return;

  currentOperation.textContent = currentOperation.textContent.slice(0, -1);
  if (currentOperation.textContent.length <= 0) initialState();
}

function setSign() {
  if (currentOperation.textContent === "0") return;
  currentOperation.textContent = (
    Number(currentOperation.textContent) * -1
  ).toString();
}

function getValue(value) {
  if (value === "." && currentOperation.textContent.includes(".")) {
    return;
  } else if (
    value === "." &&
    (currentOperation.textContent === "0" ||
      currentOperation.textContent === "")
  ) {
    return (currentOperation.textContent = 0 + value);
  }

  if (currentOperation.textContent === "0") {
    return (currentOperation.textContent = value);
  }

  if (result) {
    previousOperation.textContent = `${result} ${currentOperator}`;
    if (!currentOperator) {
      previousOperation.textContent = "";
      initialState();
    }
    result = null;
    currentOperation.textContent = "";
  }

  currentOperation.textContent += value;
}

function getOperator(operator) {
  if (currentOperator !== null) {
    evaluate();
  }

  previousOperand = currentOperation.textContent;
  if (previousOperand === "" && result !== null) {
    previousOperand = result;
  }

  currentOperator = operator;
  previousOperation.textContent = `${previousOperand} ${currentOperator}`;
  currentOperation.textContent = "";
}

function evaluate() {
  if (!previousOperand || !currentOperator) {
    return;
  }

  currentOperand = currentOperation.textContent;
  if (
    currentOperand === null ||
    currentOperand === "" ||
    currentOperand === "."
  ) {
    return;
  }

  previousOperation.textContent = `${previousOperand} ${currentOperator} ${currentOperand} =`;
  result = operate(previousOperand, currentOperand, currentOperator);
  if (!result) return;

  currentOperation.textContent = Math.round(result * 1000) / 1000;
  currentOperator = null;
}

function sum(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    alert("Nah");
    initialState();
    return null;
  }
  return a / b;
}

function operate(a, b, operator) {
  a = Number(a);
  b = Number(b);

  if (isNaN(a) || isNaN(b)) return;

  switch (operator) {
    case "+":
      return sum(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return;
  }
}
