const buttons = document.querySelector(".calculator");
let displayElement = document.querySelector(".display");

let calc = {
    currInput : "",
    currOperand : "",
    firstOperand : null,
}

buttons.addEventListener("click", (e) => {
    const buttonContent = e.target;
    if (buttonContent.classList.contains("num")) numHandler(buttonContent.textContent);
    if (buttonContent.classList.contains("operator")) operatorHandler(buttonContent.textContent);
    if (buttonContent.classList.contains("equal")) enterHandler();
    if (buttonContent.classList.contains("clear")) reset();
});

function operatorHandler(value) {
    if (value === "SQRT" && (calc.firstOperand || calc.calc.currInput)) {
        const val = calc.currInput !== "" ? Number(calc.currInput) : calc.firstOperand;
        calc.firstOperand = operate(null, val, "SQRT");
        updateDisplay(calc.firstOperand);
        calc.currInput = "";
        return;
    } else if (calc.firstOperand && calc.currOperand && calc.currInput) {
        calc.firstOperand = operate(calc.firstOperand, Number(calc.currInput), calc.currOperand);
        updateDisplay(calc.firstOperand);
    } else if (calc.currInput !== "") {
        calc.firstOperand = Number(calc.currInput);
    }

    calc.currInput = "";
    calc.currOperand = value;
}

function numHandler(value) {
    calc.currInput += value;
    updateDisplay(calc.currInput);
}

function enterHandler(e) {
    if (!calc.firstOperand && calc.currOperand === "" && calc.currInput === "") {
        updateDisplay("Put something vro");
        return;
    }

    calc.firstOperand = updateDisplay(
        operate(Number(calc.firstOperand), Number(calc.currInput), calc.currOperand)
    );

    calc.currInput = "";
    calc.currOperand = "";
}

function updateDisplay (value) {
    displayElement.textContent = value;
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
    updateDisplay("");
    calc.currInput = "";
    calc.firstOperand = null;
    calc.currOperand = "";
};
