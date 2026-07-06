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
        console.log(currInput);
    });
});

operatorButtons.forEach((operator) => {
    operator.addEventListener("click", (e) => {

        if (firstOperand !== null && currOperator && currInput !== "") {
            firstOperand = operate(firstOperand, Number(currInput), currOperator);
            displayElement.textContent = firstOperand;
            console.log(`spec: ${firstOperand}`);
        } else if (currInput !== "") {
            // First operator press: just capture the first operand
            firstOperand = Number(currInput);
        }
        console.log(`prev: ${currOperator}`);
        currOperator = e.target.textContent;
        console.log(`curr: ${currOperator}`);
        currInput = ""; // ready for the next number
        
        
        // currOperator = e.target.textContent;
        // console.log(currOperator);

        // if (!firstOperand) {
        //     firstOperand = Number(currInput);
        // } 

        // displayElement.textContent = "";
        // currInput = 0;
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
    displayElement.textContent = "";
    currInput = "";
    currOperator = "";
    firstOperand = null;
    console.log(`RESET: ${firstOperand}`);
}


enterButton.addEventListener("click", () => {
    if (firstOperand === null && currInput === "" && currOperator === "") {
        console.log("Nothing to Calculate");
        return;
    }
    const results = Number(operate(Number(firstOperand), Number(currInput), currOperator))
    displayElement.textContent = results;
    firstOperand = results;
    currInput = "";
    currOperator = "";

    console.log(results);
})