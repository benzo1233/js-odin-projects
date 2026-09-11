// TicTacToe
//  1) Gameboard object for state (One Instance, IIFE?)   
// need to figure out how to trigger win condition and tie
// board will be a 3x3 array
//  2) Player (Factory function?), two players
//  3) A Controller (They hinted at IIFE)
//  4) Switch Players, changing O to X and viseVersa


// Modal
const gameBoard = (() => {
    let board = [];
    let gameOverStatus = false;

    //Build Board
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(null);
        }
    };

    const winningLines = [
        //Row
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],

        //Col
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],

        //Diag
        [[0, 0], [1, 1], [2, 2]],
        [[2, 0], [1, 1], [0, 2]],
    ];

    function placeTic(row, col, name) {
        if (gameOverStatus === true) {
            console.log("Cannot Place, Game is over!!")
            return;
        }
        if (board[row][col] !== null) {
            // console.log("Cannot Place Here")
            return false;
        }

        board[row][col] = name;
        // console.log("Tic Placed!");
        // console.log(row, col);
        return true;
    };

    function checkWin(name) {
        for (const line of winningLines) {
            const [p1, p2, p3] = line.map(([r, c]) => board[r][c]);
            if (p1 !== null && p1 === p2 && p1 === p3) {
                setWin(true);
                return true;
            }
        }
    }

    // for testing
    function setWin(status) {
        gameOverStatus = status;
    }

    return {
        placeTic,
        checkWin,
        // setWin,
    }
})();

function createPlayer(name, marker) {
    return {
        name,
        marker,
    };
}

// TODO: turn view object to IIFE and only expose updateView
// Bc we want one instance of createView and expose updateView to be reuseable
const body = document.getElementById("body");

// View
const view = (() => {
    function createView() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const button = document.createElement("button");
                button.setAttribute("id", "tacBtn");
                button.textContent = "-";
                button.dataset.row = i;
                button.dataset.col = j;
                button.disabled = true;
                body.appendChild(button);
            }
        }
    };

    function updateView(row, col, marker) {
        const button = document.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
        );
        button.textContent = marker;
    };

    function enableBtn() {
        const btns = document.querySelectorAll("#tacBtn");
        for (const btn of btns) {
            btn.disabled = false;
        }
    };

    function winnerDisplay(name) {
        const winner = document.querySelector("#winner-status");
        winner.textContent = ` Winner: ${name}`;
    }

    //Initialize
    createView();

    return {
        updateView,
        enableBtn,
        winnerDisplay,
    }
})();

// Controller
const controller = (() => {
    const player1 = createPlayer("Ben", "X");
    const player2 = createPlayer("Kenny", "O");

    let currentPlayer = player1;

    function playGame(row, col) {
        const placed = gameBoard.placeTic(row, col, currentPlayer.marker);
        if (placed === true) {
            view.updateView(row, col, currentPlayer.marker);

            if (gameBoard.checkWin(currentPlayer.name)) {
                view.winnerDisplay(currentPlayer.name);
            }
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
        return;
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    return {
        playGame,
        getCurrentPlayer,
        player1,
        player2,
    }
})();


body.addEventListener("click", (e) => {
    const target = e.target.dataset;
    if (!e.target.matches("button")) { return }

    const row = Number(target.row);
    const col = Number(target.col);
    console.log(controller.getCurrentPlayer());
    controller.playGame(row, col);
});

const playerOne = document.querySelector("#player1");
const playerTwo = document.querySelector("#player2");
const startBtn = document.querySelector("#start");

startBtn.addEventListener("click", () => {
    view.enableBtn();
    controller.player1.name = playerOne.textContent.trim();
    controller.player2.name = playerTwo.textContent.trim();
    playerOne.contentEditable = "false";
    playerTwo.contentEditable = "false";
});
