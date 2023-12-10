const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const clearBtn = document.querySelector(".clear");
const operandBtns = document.querySelectorAll(".operand");
const operatorBtns = document.querySelectorAll(".operator");

display.textContent = "0";
let a = null;
let b = null;
let result = null;
let operator = null;

clearBtn.addEventListener("click", initialState);
Array.from(operandBtns).map((btn) => btn.addEventListener("click", getValue));
Array.from(operatorBtns).map((btn) =>
  btn.addEventListener("click", getOperator)
);

function initialState() {
  display.textContent = "0";
  a = null;
  b = null;
  result = null;
  operator = null;
}

function displayValue(value) {
  const currentValue = display.textContent;
  if (currentValue === "0") {
    display.textContent = "";
    return (display.textContent = value);
  }
  return (display.textContent = currentValue + value);
}

function getValue(e) {
  const value = e.target.value;

  if (a === null) {
    displayValue(value);
    return (a = value);
  }

  a += value;
  console.log("a", a);
  displayValue(a);
  return a;
}

function getOperator(e) {
  return (operator = e.target.value);
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
  if (b === 0) return "Nah";
  return a / b;
}

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      sum(a, b);
      return;
    case "-":
      subtract(a, b);
      return;
    case "*":
      multiply(a, b);
      return;
    case "/":
      divide(a, b);
      return;
    default:
      return;
  }
}
