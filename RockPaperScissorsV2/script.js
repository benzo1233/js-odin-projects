// GOT IT WORKING
// NOW IMPROVE BY SEPARATING
// CONSTANTS -> STATES -> DOM REFERENCES -> EVENT LISTENERS -> FUNCTIONS

const winConditions = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};  

const rock = document.getElementById("rock");
const scissors = document.getElementById("scissors");
const paper = document.getElementById("paper");
const results = document.getElementById("results");

rock.addEventListener("click", () => controller.playGame("rock"));
scissors.addEventListener("click", () => controller.playGame("scissors"));
paper.addEventListener("click", () => controller.playGame("paper"));


//Model, handles data and game state
const game = {
  humanScore : 0,
  computerScore : 0,
  roundResult : 0,
  gameOver : false,

  playRound (humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
      this.roundResult = 0;
    } else if (winConditions[humanChoice] === computerChoice) {
      this.roundResult = 1;
      this.humanScore++;
    } else {
      this.roundResult = -1;
      this.computerScore++;
    }  
    
    if (this.humanScore == 5 || this.computerScore == 5) {
      this.gameOver = true;
    }

    return {
      humanScore: this.humanScore,
      computerScore: this.computerScore,
      humanChoice: humanChoice,
      computerChoice : computerChoice,
      roundResult: this.roundResult,
      gameOver: this.gameOver
    }
  }  
}  


//view, handles rendering of ui
const view = {
  hand : document.createElement("p"),
  result : document.createElement("p"),
  score: document.createElement("p"),
  finalResult : document.createElement("p"),

  render (gameResult) {
    this.hand.textContent = `You: ${gameResult.humanChoice} : Bot: ${gameResult.computerChoice}`
    this.score.textContent = `Score: ${gameResult.humanScore} : ${gameResult.computerScore}`

    if (gameResult.roundResult === 1) {
      this.result.textContent = "You Win!";
    } else if (gameResult.roundResult === -1) {
      this.result.textContent = "You Lose!";
    } else {
      this.result.textContent = "You Tie!";
    }

    results.appendChild(this.hand);
    results.appendChild(this.result);
    results.appendChild(this.score);
    
    if (gameResult.gameOver) {
      this.finalResult.style.fontWeight = "bold",
      this.finalResult.textContent = `FINAL Score: ${gameResult.humanScore} : ${gameResult.computerScore}`
      results.appendChild(this.finalResult);
    }
  }

}


// controller: calls upon modal to update game and then view to render
const controller = {
  playGame(playerSelection) {
    if (game.gameOver) return;

    const computerChoice = getComputerChoice();
    const gameResult = game.playRound(playerSelection, computerChoice);

    view.render(gameResult);
  }
}


function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}





