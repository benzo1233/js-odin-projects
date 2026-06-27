// GOT IT WORKING
// NOW IMPROVE BY SEPARATING
// CONSTANTS -> STATES -> DOM REFERENCES -> EVENT LISTENERS -> FUNCTIONS


function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

const rock = document.getElementById("rock");
const scissors = document.getElementById("scissors");
const paper = document.getElementById("paper");
const results = document.getElementById("results");

rock.addEventListener("click", () => playGame("rock"));
scissors.addEventListener("click", () => playGame("scissors"));
paper.addEventListener("click", () => playGame("paper"));

let humanScore = 0;
let computerScore = 0;
let gameOver = false;

function playGame(playerSelection) {
  if (gameOver) return;

  function playRound(humanChoice, computerChoice) {
    const hand = document.createElement("p");
    const result = document.createElement("p");
    const finalResult = document.createElement("p");

    const winConditions = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper",
    };
    if (humanChoice === computerChoice) {
      result.textContent = "TIE!";
    } else if (winConditions[humanChoice] === computerChoice) {
      result.textContent = "You Win!";
      humanScore++;
    } else {
      result.textContent = "You Lose!!";
      computerScore++;
    }
    hand.textContent = `You: ${playerSelection} : Bot: ${computerChoice}`;
    
    if (humanScore == 5 || computerScore == 5) {
      finalResult.style.fontWeight = "bold";
      finalResult.textContent = `==== Final Score: You = ${humanScore} : Bot = ${computerScore} ====`;
      gameOver = true;
    } else {
      finalResult.textContent = `Score: You = ${humanScore} : Bot = ${computerScore}`;
    }
    results.appendChild(finalResult);
    results.appendChild(hand);
    results.appendChild(result);

  }
  playRound(playerSelection, getComputerChoice());

  // console.log("GAME OVER!");
  // console.log(`Final Score: ${humanScore} : ${computerScore}`);
}

// const generator = document.querySelector("#generator");
// generator.addEventListener("click", () => playGame());
