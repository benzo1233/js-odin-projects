
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
            return;
        }
        if (board[row][col] !== null) {
            return false;
        }

        board[row][col] = name;
        return true;
    };

    function checkWin() {
        for (const line of winningLines) {
            const [p1, p2, p3] = line.map(([r, c]) => board[r][c]);
            if (p1 !== null && p1 === p2 && p1 === p3) {
                gameOverStatus = true;
                return true;
            }
        }
    }

    function checkTie() {
        if (isFilled() && gameOverStatus === false) {
            gameOverStatus = true;
            return true;
        }
    }

    function isFilled() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === null) {
                    return false;
                }
            }
        }
        return true;
    }

    function reset() {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                board[r][c] = null;
            }
        };
        gameOverStatus = false;
    }

    return {
        placeTic,
        checkWin,
        checkTie,
        reset,
    }
})();


const view = (() => {
    const body = document.getElementById("body");
    function createBoard() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const button = document.createElement("button");
                button.classList.add("tacBtn");
                button.textContent = "-";
                button.dataset.row = i;
                button.dataset.col = j;
                button.disabled = true;
                body.appendChild(button);
            }
        }
    };

    function updateBoard(row, col, marker) {
        const button = document.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
        );
        button.textContent = marker;
    };

    function enableBoard() {
        const tacs = document.querySelectorAll(".tacBtn");
        for (const tac of tacs) {
            tac.disabled = false;
        }
    };

    function displayWinner(name) {
        const display = document.querySelector("#display");
        display.textContent = ` Winner: ${name}`;
    }

    function displayTie() {
        const display = document.querySelector("#display");
        display.textContent = "TIE!!!";
    }

    //TESTING
    const playerOne = document.querySelector("#player1");
    const playerTwo = document.querySelector("#player2");
    // OR
    // const playerNames = document.querySelectorAll("[contenteditable]");

    function disableUserInput() {
        playerOne.contentEditable = "false";
        playerTwo.contentEditable = "false";
    }

    function getNames () {
        const p1 = playerOne.textContent.trim();
        const p2 = playerTwo.textContent.trim();
        return [p1, p2];
    }

    function reset() {
        const btn = document.querySelectorAll(".tacBtn");
        btn.forEach((btn) => {
            btn.textContent = "-";
        });

        const display = document.querySelector("#display");
        display.textContent = "";
    }

    //Initialize TicTacToe
    createBoard();

    return {
        updateBoard,
        enableBoard,
        displayWinner,
        displayTie,
        disableUserInput,
        getNames,
        reset,
    }
})();

function createPlayer(name, marker) {
    return {
        name,
        marker,
    };
}

const controller = (() => {
    const player1 = createPlayer("", "X");
    const player2 = createPlayer("", "O");

    let currentPlayer = player1;

    function playGame(row, col) {
        const placed = gameBoard.placeTic(row, col, currentPlayer.marker);
        if (placed === true) {
            view.updateBoard(row, col, currentPlayer.marker);

            if (gameBoard.checkWin()) {
                view.displayWinner(currentPlayer.name);
            }
            if (gameBoard.checkTie()) {
                view.displayTie();
            };
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    }
    
    function startGame () {
        const [p1, p2] = view.getNames();
        player1.name = p1 || "Player 1";
        player2.name = p2 || "Player 2";

        view.enableBoard();
        view.disableUserInput();
    }

    function resetGame() {
        gameBoard.reset();
        view.reset();
        //Resets Player
        currentPlayer = player1;
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    return {
        playGame,
        startGame,
        resetGame,
        getCurrentPlayer,
        // player1,
        // player2,
    }
})();


const body = document.querySelector("body");

body.addEventListener("click", (e) => {
    // const playerOne = document.querySelector("#player1");
    // const playerTwo = document.querySelector("#player2");

    if (e.target.matches(".tacBtn")) {
        const target = e.target.dataset;
        const row = Number(target.row);
        const col = Number(target.col);
        //NEED TO REPLACE THIS w/ UI that shows whos turn it is
        console.log(controller.getCurrentPlayer());
        controller.playGame(row, col);
    }

    if (e.target.matches("#start")) {
        controller.startGame();
    }

    if (e.target.matches("#reset")) {
        controller.resetGame();
    }
});