const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const enterButton = document.querySelector(".equal");
let displayElement = document.querySelector(".display");

let currInput = "";
let currOperator = "";
let firstOperand;

numButtons.forEach((num) => {
    num.addEventListener("click", (e) => {
        currInput = displayElement.textContent += e.target.textContent;
        console.log(currInput);
    });
});

operatorButtons.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        currOperator = e.target.textContent;
        console.log(currOperator);

        if (!firstOperand) {
            firstOperand = Number(currInput);
        } 

        displayElement.textContent = "";
        currInput = 0;
    });
});

clearButton.addEventListener("click", () => {
    reset();
});


function operate (num1, num2, operator) {
    const op = 
        operator === "+" ? add(num1,num2) :
        operator === "-" ? sub(num1,num2) :
        operator === "*" ? multi(num1,num2) :
        operator === "/" ? div(num1,num2) : 
        "ERR";

    return Number(op);
}


function add (num1, num2) {
    return num1 + num2;
}

function sub (num1, num2) {
    return num1 - num2;
}

function multi (num1, num2) {
    return num1 * num2;
}

function div (num1, num2) {
    return num1 / num2;
}

function reset () {
    displayElement.innerHTML = "";
    firstOperand = 0;
    console.log(`RESET: ${firstOperand}`);
}


enterButton.addEventListener("click", () => {
    if (!firstOperand) {
        console.log("NO PREV VALUE");
    }
    const results = Number(operate(Number(firstOperand), Number(currInput), currOperator))
    displayElement.textContent = results;
    console.log(results);
    firstOperand = results;
})