/* this js file will have extensive commenting, with the purpose of
 * giving insight into my understanding of the problem and how I
 * implemented solutions.
 */

/** First, we establish what variables we need and connect them to the 
 * html elements. 
 */
const buttons = document.querySelectorAll('[data-value]');
const resultContainer = document.getElementById('resultContainer');
const playerScoreboard = document.getElementById('playerScoreboard');
const computerScoreboard = document.getElementById('computerScoreboard');
const div = document.createElement('div');
const p = document.createElement('p');

/**
 * We will play the game by rounds.
 * rounds is set to 5 by default, but can be changed through js.
 * param does not have a direct impact on the script, it is used for documentation.
 * @param {number} rounds 
 */

/* game is the main function, and will be used to determine the number of rounds.*/
const game = (rounds) => {
  let playerScore = 0;
  let computerScore = 0;
  let round = 1;
  let result = '';
  let choices = ['rock', 'paper', 'scissors'];

  /**
   * This function generates a random pick for our Dr.Evil
   * the floor function will round the number and return a number
   * between 1 and the number of elements in choices variable.
   * this way, we can add another element, or multiple elements and
   * the computerChoice will still work. But the rest of the script 
   * would need to be scaled up and adapted to the new architecture.
   */
  const computerChoice = () => {
    const index = Math.floor(Math.random() * Math.floor(choices.length));
    return choices[index];
  };

  /**
   * playRound determines the winner of a single round.
   * @param {string} playerSelection
   * @param {string} computerSelection
   */
  const playRound = (playerSelection, computerSelection) => {
    if (playerSelection === computerSelection) {
      message = `${playerSelection} against ${computerSelection} ! It's a tie!`;
    } else if (
      (playerSelection === 'rock' && computerSelection === 'scissors') ||
      (playerSelection === 'paper' && computerSelection === 'rock') ||
      (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
      playerScore += 1;
      message = `Austin Wins the round ! His ${playerSelection} beat Dr. Evil's ${computerSelection} !`;
    } else {
      computerScore += 1;
      message = `Austin Lost ! His ${playerSelection} was beaten by Dr. Evil's ${computerSelection} !`;
    }
    return `${message}`;
  };

  /* displayResult and displayRound will update the results banner giving us
   * real time information on the game */
  const displayResult = (result) => {
    p.innerHTML = result;
    resultContainer.appendChild(p);
  };

  displayRound = (round) => {
    div.innerHTML = round;
    resultContainer.appendChild(div);
  };

  /**
   * endGame will give the final tally once the parameter for the
   * ammount of rounds to play is reached.
   * Gives the end game result message.
   * @param {number} rounds
   */
  const endGame = (rounds) => {
    if (round === rounds) {
      p.innerHTML = '';
      if (playerScore > computerScore) {
        result = `You Win this Game ! But Dr. Evil wants a rematch immediately. Make your next choice to continue!`;
      } else if (playerScore < computerScore) {
        result = `You Lose this Game... But Dr. Evil is having so much, he wants another match! Make your next choice to continue!`;
      } else {
        result = `It's a tie game! Neither party wants to leave it at that. Make your next choice to continue!`;
      }
    }

    playerScoreboard.innerText = playerScore;
    computerScoreboard.innerText = computerScore;

    displayResult(result);
  };

  /**
   * this function adds click event listeners on every button
   * When a button is clicked ,the round will start. Once we reach
   * the final round, it will reset the rounds on next click and start over.
   */
  buttons.forEach((button) => {
    button.addEventListener('click', function (event) {
      if (round < rounds) {
        round++;
      } else {
        round = 1;
        playerScore = 0;
        computerScore = 0;
        result = '';
      }
      let playerSelection = event.target.dataset.value;
      let computerSelection = computerChoice();

      displayRound(playRound(playerSelection, computerSelection));
      endGame(rounds);
    });
  });
};

/**
 * Now we just need to call the function to start the game!
 * You can change number of rounds by passing it to the function.
 */
game(5);