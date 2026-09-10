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
    let gameStatus = false;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(null);
        }
    };

    function placeTic(row, col, marker) {
        if (gameStatus === true) {
            console.log("GameOVER!!")
            return;
        }
        if (board[row][col] !== null) {
            console.log("Cannot Place Here")
            return false;
        }
        board[row][col] = marker;
        console.log("Tic Placed!");
        console.log(board);
        return true;
    };

    // for testing
    function setWin(status) {
        gameStatus = status;
    }

    return {
        placeTic,
        setWin,
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
    function playGame (row, col) {
        const placed = gameBoard.placeTic(row, col, currentPlayer.marker);
        if (placed === true) {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    }

    function getCurrentPlayer () {
        return currentPlayer;
    }
    
    return {
        playGame,
        getCurrentPlayer
    }
})();



