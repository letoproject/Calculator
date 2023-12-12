const display = document.querySelector(".display");
const currentOperation = document.querySelector(".currentOperation");
const buttons = document.querySelectorAll("button");
const clearBtn = document.querySelector(".clear");
const operandBtns = document.querySelectorAll(".operand");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");

currentOperation.textContent = "";
let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;
let lastOperator = null;

clearBtn.addEventListener("click", initialState);
equalsBtn.addEventListener("click", evaluate);

operandBtns.forEach((btn) => {
  btn.addEventListener("click", getValue),
    btn.addEventListener("click", updateDisplayValue);
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", getOperator);
  btn.addEventListener("click", updateDisplayValue);
});

function initialState() {
  currentOperation.textContent = "";
  displayValue = "0";
  firstOperand = null;
  secondOperand = null;
  operator = null;
  result = null;
  updateDisplayValue();
}

function updateDisplayValue() {
  display.textContent = displayValue;
  if (firstOperand && operator) {
    return (currentOperation.textContent = `${firstOperand} ${operator} `);
  }

  if (secondOperand !== null) {
    return (currentOperation.textContent = `${firstOperand} ${operator} ${secondOperand} =`);
  }
}

updateDisplayValue();

function getValue() {
  console.log("click value", this.value);
  const value = this.value;
  if (firstOperand === null) {
    if (displayValue === "0" || displayValue === 0) {
      return (displayValue = value);
    } else if (displayValue === firstOperand) {
      return (displayValue = value);
    } else {
      return (displayValue += value);
    }
  }

  if (secondOperand === null) {
    if (displayValue === firstOperand) {
      return (displayValue = value);
    }
    return (displayValue += value);
  }
}

function getOperator(e) {
  console.log("click operator", e.target.value);
  if (operator !== null && firstOperand !== null) {
    lastOperator = e.target.value;
    console.log("firstOperand1", firstOperand);
    console.log("operator1", operator);
    // secondOperand = displayValue;
    console.log("lastOperator1", lastOperator);
    console.log("evaluate1");
    evaluate();
    return;
  }

  if (operator === null && firstOperand !== null) {
    // currentOperator = lastOperator;
    // operator = e.target.value;
    operator = lastOperator;
    secondOperand = displayValue;
    console.log("lastOperator2", lastOperator);
    console.log("firstOperand", firstOperand);
    console.log("evaluate2");
    evaluate();
    // operate(firstOperand, secondOperand, operator);
    return;
  }
  firstOperand = displayValue;
  operator = e.target.value;

  console.log("firstOperand", firstOperand);
  console.log("operator", operator);
  console.log("lastOperator", lastOperator);
}

function evaluate() {
  if (
    (firstOperand === null || firstOperand === undefined) &&
    (secondOperand === null || secondOperand === undefined) &&
    (operator === null || operator === undefined)
  ) {
    return;
  }

  secondOperand = displayValue;

  console.log("firstOperandE", firstOperand);
  console.log("operatorE", operator);
  console.log("secondOperandE", secondOperand);

  result = operate(firstOperand, secondOperand, operator);
  console.log("result", result);
  displayValue = result;
  updateDisplayValue();
  firstOperand = result;
  secondOperand = null;
  operator = lastOperator;
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
