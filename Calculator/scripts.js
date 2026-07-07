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
        if (firstOperand && currOperator && currInput) {
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
    const op =
        operator === "+"
            ? add(num1, num2)
            : operator === "-"
                ? sub(num1, num2)
                : operator === "*"
                    ? multi(num1, num2)
                    : operator === "/"
                        ? div(num1, num2)
                        : "ERR";

    return Number(op);
};

function add(num1, num2) {
    return num1 + num2;
};

function sub(num1, num2) {
    return num1 - num2;
};

function multi(num1, num2) {
    return num1 * num2;
};

function div(num1, num2) {
    return num1 / num2;
};

function reset() {
    displayElement.textContent = "";
    currInput = "";
    firstOperand = null;
    currOperator = "";

    console.log(`RESET: ${firstOperand}`);
};
