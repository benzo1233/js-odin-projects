// ======================== GAME BOARD ============================

const gameBoard = (() => {
    let board = [];
    let isGameOver = false;

    //Build Board
    for (let row = 0; row < 3; row++) {
        let row = [];
        for (let col = 0; col < 3; col++) {
            row.push(null);
        }
        board.push(row);
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
        if (isGameOver === true) {
            return;
        }
        if (board[row][col] !== null) {
            return false;
        }

        board[row][col] = name;
        return true;
    };

    function checkWin() {
        for (const winningLine of winningLines) {
            const [first, second, third] = winningLine.map(([r, c]) => board[r][c]);
            if (first !== null && first === second && first === third) {
                isGameOver = true;
                return true;
            }
        }
    }

    function checkTie() {
        if (isFilled() && isGameOver === false) {
            isGameOver = true;
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
        isGameOver = false;
    }

    return {
        placeTic,
        checkWin,
        checkTie,
        reset,
    }
})();

// ======================== VIEW ============================

const view = (() => {
    const body = document.getElementById("body");
    const display = document.querySelector("#display");
    const playerOne = document.querySelector("#player1");
    const playerTwo = document.querySelector("#player2");

    function createBoard() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const button = document.createElement("button");
                button.classList.add("tacBtn");
                button.textContent = "-";
                button.dataset.row = row;
                button.dataset.col = col;
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
        tacs.forEach(tac => {
            tac.disabled = false;
        });
    };

    function displayTurn(currentPlayer) {
        if (currentPlayer.marker === "X") {
            playerOne.classList.add("active-turn");
            playerTwo.classList.remove("active-turn");
        } else {
            playerTwo.classList.add("active-turn");
            playerOne.classList.remove("active-turn");
        }
    }

    function displayWinner(name) {
        display.textContent = ` Winner: ${name}`;
    }

    function displayTie() {
        display.textContent = "TIE!!!";
    }

    function disableUserInput() {
        playerOne.contentEditable = "false";
        playerTwo.contentEditable = "false";
    }

    function getNames() {
        const p1 = playerOne.textContent.trim();
        const p2 = playerTwo.textContent.trim();
        return [p1, p2];
    }

    function reset() {
        const tacs = document.querySelectorAll(".tacBtn");
        tacs.forEach((tac) => {
            tac.textContent = "-";
        });

        display.textContent = "";
    }

    //Initialize TicTacToe
    createBoard();

    return {
        updateBoard,
        enableBoard,
        displayTurn,
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

// ======================== GAME  ============================


const game = (() => {
    let currTurn;
    let lastStarter;
    let playerOne;
    let playerTwo;

    function setPlayers(player1, player2) {
        playerOne = player1;
        playerTwo = player2;
        if (lastStarter === undefined) {
            currTurn = playerOne;
            lastStarter = currTurn;
        }

    }

    function getTurn() {
        return currTurn;
    }

    function switchTurn() {
        currTurn = currTurn === playerOne ? playerTwo : playerOne;
    }

    function reset() {
        lastStarter = lastStarter === playerOne ? playerTwo : playerOne;
        currTurn = lastStarter;
    }

    return {
        setPlayers,
        getTurn,
        switchTurn,
        reset,
    }
})();

// ======================== CONTROLLER ============================


const controller = (() => {
    const player1 = createPlayer("", "X");
    const player2 = createPlayer("", "O");

    function startGame() {
        const [p1, p2] = view.getNames();
        player1.name = p1 || "Player 1";
        player2.name = p2 || "Player 2";

        game.setPlayers(player1, player2);
        view.enableBoard();
        view.disableUserInput();
        syncTurnDisplay();
    }

    function playGame(row, col) {
        const currentPlayer = game.getTurn();
        const placed = gameBoard.placeTic(row, col, currentPlayer.marker);

        if (placed === true) {
            view.updateBoard(row, col, currentPlayer.marker);
            game.switchTurn();

            
            if (gameBoard.checkWin()) {
                view.displayWinner(currentPlayer.name);
                return;
            }
            if (gameBoard.checkTie()) {
                view.displayTie();
                return;
            };
            
            syncTurnDisplay();
        }
    }

    function resetGame() {
        gameBoard.reset();
        view.reset();
        game.reset(); //game.reset flips the current player to whoever did not start last round. b/c of this we need a to sync the display after reset is applied.
        syncTurnDisplay();
    }

    function syncTurnDisplay() {
        view.displayTurn(game.getTurn());
    }

    return {
        startGame,
        playGame,
        resetGame,
    }
})();

// ======================== LISTENERS ============================

const body = document.querySelector("body");

body.addEventListener("click", (e) => {
    if (e.target.matches(".tacBtn")) {
        const row = Number(e.target.dataset.row);
        const col = Number(e.target.dataset.col);

        controller.playGame(row, col);
    }

    if (e.target.matches("#start")) {
        controller.startGame();
    }

    if (e.target.matches("#reset")) {
        controller.resetGame();
    }
});