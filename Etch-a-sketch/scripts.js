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

// MVC however since we dont have any data to store
// just use the and controller
// for 
//  make cell func w/ event handlers and add style
// then make row func which calls cell func a certain amount of times and creates a row of elements
// calls rows func a specified number of times to make # of rows

const board = document.querySelector("#board");
const reset = document.querySelector("#reset");
const form = document.querySelector("#rowColForm");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const rowNum = Number(formData.get("rows"));
    const colNum = Number(formData.get("cols"));
    createBoard(rowNum, colNum);
});

reset.addEventListener("click", () => {
    board.querySelectorAll("button").forEach((cell) => {
        cell.style.background = "";
    });
});


function createCell() {
    const div = document.createElement("button");

    div.style.width = "25px";
    div.style.height = "25px";

    div.addEventListener("mouseenter", () => (div.style.background = "orange"));

    return div;
};

function createRow(colNum) {
    const row = document.createElement("div");

    for (let i = 0; i < colNum; i++) {
        const div = createCell();
        row.appendChild(div);
    }

    return row;
};

function createRows(rowNum, colNum) {
    const rows = document.createElement("div");

    for (let i = 0; i < rowNum; i++) {
        const container = createRow(colNum);
        rows.appendChild(container);
    }

    return rows;
};

function createBoard(rowNum, colNum) {
    board.innerHTML = ""; //reset all after every board generation
    board.appendChild(createRows(rowNum, colNum));
};


createBoard(16, 16); //Create intial 16x16
