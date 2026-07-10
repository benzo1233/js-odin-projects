const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const enterButton = document.querySelector(".equal");
let displayElement = document.querySelector(".display");

let currInput = "";
let currOperator = "";
let firstOperand = null;

numButtons.forEach((num) => {
    num.addEventListener("click", (e) => {
        currInput += e.target.textContent;
        displayElement.textContent = currInput;
    });
});

operatorButtons.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        if (e.target.textContent === "SQRT" && (firstOperand || currInput)) {
            const val = currInput !== "" ? Number(currInput) : firstOperand;
            firstOperand = operate(null, val, "SQRT");
            displayElement.textContent = firstOperand;
            currInput = "";
            return;
        } else if (firstOperand && currOperator && currInput) {
            firstOperand = operate(firstOperand, Number(currInput), currOperator);
            displayElement.textContent = firstOperand;
        } else if (currInput !== "") {
            firstOperand = Number(currInput);
        }

        currOperator = e.target.textContent;
        currInput = "";
    });
});

enterButton.addEventListener("click", () => {
    if (!firstOperand && currOperator === "" && currInput === "") {
        console.log("INVALID FIELDS");
        return;
    }

    firstOperand = displayElement.textContent = Number(
        operate(Number(firstOperand), Number(currInput), currOperator),
    );

    currInput = "";
    currOperator = "";
});

clearButton.addEventListener("click", () => {
    reset();
});

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return sub(num1, num2);
        case "*":
            return multi(num1, num2)
        case "/":
            return div(num1, num2);
        case "%":
            return modulo(num1, num2);
        case "SQRT":
            return sqrt(num2);
        default:
            return "ERR";
    }
};

function add(num1, num2) { return num1 + num2; };

function sub(num1, num2) { return num1 - num2; };

function multi(num1, num2) { return num1 * num2; };

function div(num1, num2) { return num1 / num2; };

function modulo(num1, num2) { return num1 % num2; };

function sqrt(num2) { return Math.sqrt(num2); };

function reset() {
    displayElement.textContent = "";
    currInput = "";
    firstOperand = null;
    currOperator = "";
};
