function getComputerChoice () {
  let str = "";
  const rand = Math.floor(Math.random() * 3);
  if (rand === 2) {
    str = 'rock';
  } else if (rand == 1) {
    str = 'scissors';
  } else {
    str = 'paper';
  }

  return str;
}

// CLEANER VERSION:
// function getComputerChoice() {
//   const choices = ['rock', 'paper', 'scissors'];
//   return choices[Math.floor(Math.random() * 3)];
// }

function getHumanChoice () {
  let userChoice = prompt("Enter rock,paper,or scissors!");
  userChoice = userChoice.toLowerCase().trim();
  return userChoice;
}

// CLEANER VERSION:
// function getHumanChoice() {
//   return prompt("Enter rock, paper, or scissors:").toLowerCase();
// }

function playGame () {
  let humanScore = 0;
  let computerScore = 0;
  
  function playRound(humanChoice, computerChoice) {  
      if (humanChoice == 'rock' && computerChoice == 'rock') {
        console.log("TIE!");
      } else if (humanChoice == 'paper' && computerChoice == 'rock') {
        console.log("You Win!");
        humanScore++;
      } else if (humanChoice == 'scissors' && computerChoice == 'rock') {
        console.log("You Lose!");
        computerScore++;
      } else if (humanChoice == 'rock' && computerChoice == 'paper') {
        console.log("You Lose!");
        computerScore++;
      } else if (humanChoice == 'paper' && computerChoice == 'paper') {
        console.log("TIE!");
      } else if (humanChoice == 'scissors' && computerChoice == 'paper') {
        console.log("You Win!");
        humanScore++;
      } else if (humanChoice == 'rock' && computerChoice == 'scissors') {
        console.log("You Win!");
        humanScore++;
      } else if (humanChoice == 'paper' && computerChoice == 'scissors') {
        console.log("You Lose!");
        computerScore++;
      } else if (humanChoice == 'scissors' && computerChoice == 'scissors') {
        console.log("TIE!");
      } else {
        console.log(`NOT VALID STRING`);
      }
      console.log(`${humanChoice} Vs ${computerChoice}`);
      console.log(`${humanScore} : ${computerScore}\n`);
  }

  for (let i = 0; i < 5; i++) {
    playRound(getHumanChoice(), getComputerChoice());
  }
  console.log("\nGAME OVER!")
  console.log(`${humanScore} : ${computerScore}`);

}

// CLEANER VERSION:
// function playGame() {
//   let humanScore = 0;
//   let computerScore = 0;
// 
//   function playRound(humanChoice, computerChoice) {
//     const winConditions = {
//       rock: 'scissors',
//       paper: 'rock',
//       scissors: 'paper'
//     };
// 
//     console.log(`${humanChoice} vs ${computerChoice}`);
// 
//     if (humanChoice === computerChoice) {
//       console.log("TIE!");
//     } else if (winConditions[humanChoice] === computerChoice) {
//       console.log("You Win!");
//       humanScore++;
//     } else {
//       console.log("You Lose!");
//       computerScore++;
//     }
//     console.log(`${humanScore} : ${computerScore}\n`);
//   }
// 
//   for (let i = 0; i < 5; i++) {
//     playRound(getHumanChoice(), getComputerChoice());
//   }
//   console.log("GAME OVER!");
//   console.log(`Final Score: ${humanScore} : ${computerScore}`);
// }


const generator = document.querySelector("#generator");
generator.addEventListener("click", () => playGame());