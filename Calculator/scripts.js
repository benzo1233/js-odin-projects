//TODO: Separate Logic/Math (Modal) and UI/Rendering (Controller);
// Makes Code easily tested, changed, & maintained.

const buttons = document.querySelector(".calculator");
let displayElement = document.querySelector(".display");

let calc = {
    currOperand : "",
    prevOperand : null,
    operator : "",
}

buttons.addEventListener("click", (e) => {
    const buttonContent = e.target;
    if (buttonContent.classList.contains("num")) numHandler(buttonContent.textContent);
    else if (buttonContent.classList.contains("operator")) operatorHandler(buttonContent.textContent);
    else if (buttonContent.classList.contains("equal")) enterHandler();
    else if (buttonContent.classList.contains("clear")) reset();
});

function operatorHandler(value) {
    if (value === "SQRT" && (calc.prevOperand || calc.calc.currOperand)) {
        const val = calc.currOperand !== "" ? Number(calc.currOperand) : calc.prevOperand;
        calc.prevOperand = operate(null, val, "SQRT");
        updateDisplay(calc.prevOperand);
        calc.currOperand = "";
        return;
    } else if (calc.prevOperand && calc.operator && calc.currOperand) {
        calc.prevOperand = operate(calc.prevOperand, Number(calc.currOperand), calc.operator);
        updateDisplay(calc.prevOperand);
    } else if (calc.currOperand !== "") {
        calc.prevOperand = Number(calc.currOperand);
    }

    calc.currOperand = "";
    calc.operator = value;
}

function numHandler(value) {
    calc.currOperand += value;
    updateDisplay(calc.currOperand);
}

function enterHandler() {
    if (!calc.prevOperand && calc.operator === "" && calc.currOperand === "") {
        updateDisplay("Put something vro");
        return;
    }

    calc.prevOperand = updateDisplay(
        operate(Number(calc.prevOperand), Number(calc.currOperand), calc.operator)
    );

    calc.currOperand = "";
    calc.operator = "";
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
    calc.currOperand = "";
    calc.prevOperand = null;
    calc.operator = "";
};
