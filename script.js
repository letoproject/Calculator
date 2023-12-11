const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const clearBtn = document.querySelector(".clear");
const operandBtns = document.querySelectorAll(".operand");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");

let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;

clearBtn.addEventListener("click", initialState);
equalsBtn.addEventListener("click", evaluate);

operandBtns.forEach((btn) => btn.addEventListener("click", getValue));

operatorBtns.forEach((btn) => btn.addEventListener("click", getOperator));

function initialState() {
  displayValue = "0";
  firstOperand = null;
  secondOperand = null;
  operator = null;
  result = null;
  updateDisplayValue();
}

function updateDisplayValue() {
  display.textContent = displayValue;
}

updateDisplayValue();

function getValue() {
  const value = this.value;
  if (firstOperand === null) {
    if (displayValue === "0" || displayValue === 0) {
      displayValue = value;
      return updateDisplayValue();
    } else if (firstOperand === displayValue) {
      displayValue = value;
      return updateDisplayValue();
    }
    displayValue += value;
    return updateDisplayValue();
  }

  if (displayValue === firstOperand) {
    displayValue = value;
    return updateDisplayValue();
  }
  displayValue += value;
  return updateDisplayValue();
}

function getOperator(e) {
  if (operator !== null) {
    firstOperand = secondOperand;
    secondOperand = display.textContent;
    return evaluate();
  }
  firstOperand = display.textContent;
  operator = e.target.value;
  console.log("firstOperand", firstOperand);
  console.log("operator", operator);
  console.log("secondOperand", secondOperand);
}

function evaluate() {
  if (firstOperand === null && secondOperand === null && operator === null) {
    return;
  }
  secondOperand = display.textContent;
  console.log("secondOperand", secondOperand);
  result = operate(firstOperand, secondOperand, operator);
  console.log("result", result);
  displayValue = result;
  updateDisplayValue();
  operator = null;
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
  a = Number(a);
  b = Number(b);
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
