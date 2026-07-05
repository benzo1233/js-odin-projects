const num = document.querySelectorAll(".num");
const operator = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const enter = document.querySelector(".equal");
let display = document.querySelector(".display");

let displayNum = 0;
let sign = "";
let numOne;

num.forEach((num) => {
    num.addEventListener("click", (e) => {
        displayNum = display.textContent += e.target.textContent;
        console.log(displayNum);
    });
});

operator.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        sign = e.target.textContent;
        console.log(sign);

        if (!numOne) {
            numOne = Number(displayNum);
        } 

        display.textContent = "";
        displayNum = 0;
    });
});

clear.addEventListener("click", () => {
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
    display.innerHTML = "";
    numOne = undefined;
}


enter.addEventListener("click", () => {
    const results = Number(operate(Number(numOne), Number(displayNum), sign))
    display.textContent = results;
    console.log(results);
    numOne = results;
})