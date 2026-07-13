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
    else if (buttonContent.classList.contains("decimal")) decimalHandler();
    else if (buttonContent.classList.contains("signage")) signage();
});

function operatorHandler(value) {
    if (value === "SQRT" && (calc.prevOperand || calc.currOperand)) {
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

    const res = operate(Number(calc.prevOperand), Number(calc.currOperand), calc.operator);
    calc.prevOperand = res;
    updateDisplay(res);

    calc.currOperand = "";
    calc.operator = "";
}

function decimalHandler() {
    if (calc.currOperand.includes(".")) {
        return; 
    } else {
        calc.currOperand += ".";
        updateDisplay(calc.currOperand);
    }
}

function signage () {
    if (calc.currOperand !== "") {
        let num = Number(calc.currOperand);
        num *= -1;
        calc.currOperand = String(num);
        updateDisplay(calc.currOperand);
    } else if (calc.prevOperand !== "") {
        let num = Number(calc.prevOperand);
        num *= -1;
        calc.prevOperand = String(num);
        updateDisplay(calc.prevOperand);
    }
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
