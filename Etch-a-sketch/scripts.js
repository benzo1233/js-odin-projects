

// TASK:
// Make a 16x16 sketch board
// Make row of 16 elements:
/* ==== TODO ===== 
Creating div element to contain 16 elements, using flexbox
Append 16 divs to it, perhaps intially making them 10x10pixels with black border
*/

//Make the row 16 times 
/*  ===== TODO =====
encapsulate code above and run it 16 times.
*/

// Further Note: Make it a func?

const board = document.querySelector("#board");
const reset = document.querySelector("#reset");

function createRow () {
    const container = document.createElement("div");
    container.id = container;

    for (let i = 0; i < 8; i++) {
        const div = document.createElement("button");
        div.style.width= "25px";
        div.style.height= "25px";
        container.appendChild(div);

        div.addEventListener("mouseenter", () => div.style.background = "orange");
        reset.addEventListener("click", () => div.style.background = "");

    }
    board.appendChild(container);
}

function createCol () {
    for (let i = 0; i < 8; i++) {
        createRow();
    }
    board.appendChild(container);
}

function createBoard () {
    createCol(8);
}

createBoard();

