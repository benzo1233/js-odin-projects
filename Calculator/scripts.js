// const numButtons = document.querySelectorAll(".num");
// const operatorButtons = document.querySelectorAll(".operator");
// const clearButton = document.querySelector(".clear");
// const enterButton = document.querySelector(".equal");

//new
const buttons = document.querySelector(".calculator");

let displayElement = document.querySelector(".display");

let currInput = "";
let currOperator = "";
let firstOperand = null;

// numButtons.forEach((num) => {
//     num.addEventListener("click", (e) => {
//         numHandler(e);
//     });
// });

// operatorButtons.forEach((button) => {
//     button.addEventListener("click", (e) => {
//         operatorHandler(e);
//     });
// });

// enterButton.addEventListener("click", () => {
//     enterHandler();
// });

// clearButton.addEventListener("click", () => {
//     reset();
// });


buttons.addEventListener("click", (e) => {
    const buttonContent = e.target.classList;
    if (buttonContent.contains("num")) {
        numHandler(e);
    }

    if (buttonContent.contains("operator")) {
        operatorHandler(e);
    }

    if (buttonContent.contains("equal")) {
        enterHandler();
    }

    if (buttonContent.contains("clear")) {
        reset();
    }
});

function operatorHandler (e) {
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
}

function numHandler (e) {
    currInput += e.target.textContent;
    displayElement.textContent = currInput;
}

function enterHandler (e) {
    if (!firstOperand && currOperator === "" && currInput === "") {
        displayElement.textContent = ("put something vro");
        return;
    }

    firstOperand = displayElement.textContent = Number(
        operate(Number(firstOperand), Number(currInput), currOperator),
    );

    currInput = "";
    currOperator = "";
}

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
