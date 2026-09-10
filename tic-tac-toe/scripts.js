// TicTacToe
//  1) Gameboard object for state (One Instance, IIFE?)   
// need to figure out how to trigger win condition and tie
// board will be a 3x3 array
//  2) Player (Factory function?), two players
//  3) A Controller (They hinted at IIFE)
//  4) Switch Players, changing O to X and viseVersa

const gameBoard = (() => {
    let rows = 3;
    let cols = 3;
    let board = [];
    let gameOverStatus = false;
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

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(null);
        }
    };

    function placeTic(row, col, marker) {
        if (gameOverStatus === true) {
            console.log("GameOVER!!")
            return;
        }
        if (board[row][col] !== null) {
            console.log("Cannot Place Here")
            return false;
        }
        board[row][col] = marker;
        console.log("Tic Placed!");
        console.log(row, col);
        return true;
    };

    // for testing
    function setWin(status) {
        gameOverStatus = status;
    }

    function checkWin(name) {
        for (const line of winningLines) {
            // const [p1, p2, p3] = line;
            // let a1 = board[p1[0], p1[1]];
            // let a2 = board[p2[0], p2[1]];
            // let a3 = board[p3[0], p3[1]];
            // OR
            const [p1, p2, p3] = line.map(([r, c]) => board[r][c]);
            if (p1 !== null && p1 === p2 && p1 === p3) {
                console.log(`We have a Winner: ${name}`)
                setWin(true);
            }
        }
    }


    return {
        placeTic,
        setWin,
        checkWin,
    }
})();

function createPlayer(name, marker) {
    return {
        name,
        marker,
    };
}

const controller = (() => {
    const player1 = createPlayer("Ben", "X");
    const player2 = createPlayer("Kenny", "O");

    let currentPlayer = player1;
    function playGame(row, col) {
        const placed = gameBoard.placeTic(row, col, currentPlayer.marker);
        if (placed === true) {
            view.updateView(row, col, currentPlayer.marker);
            gameBoard.checkWin(currentPlayer.name)
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    return {
        playGame,
        getCurrentPlayer
    }
})();


const body = document.getElementById("body");
const view = {
    createView() {
        for (let i = 0; i < 3; i++) {
            const row = document.createElement("div");
            for (let j = 0; j < 3; j++) {
                const button = document.createElement("button");
                button.textContent = "-";
                button.dataset.row = i;
                button.dataset.col = j;
                row.appendChild(button);
            }
            body.appendChild(row);
        }
    },

    updateView(row, col, marker) {
        const button = document.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
        );
        button.textContent = marker;
    }
};

body.addEventListener("click", (e) => {
    const target = e.target.dataset;
    if (!e.target.matches("button")) { return }

    const row = Number(target.row);
    const col = Number(target.col);
    console.log(controller.getCurrentPlayer());
    controller.playGame(row, col);
});

view.createView();


