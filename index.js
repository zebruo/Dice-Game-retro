// variables
let randomNumber = 0;
let roundScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let gameOver = false;

// Get the #dice element
const dice = document.querySelector("#dice");
// Get the message element
const message = document.querySelector("#message");
// Get roll button
const roll = document.querySelector("#reload");
// Get hold button
const hold = document.querySelector("#download");
// Get new game button
const newGame = document.querySelector("#new-game");
// Get the players
const player0 = document.querySelector(".player-0");
const player1 = document.querySelector(".player-1");

// Roll the dice and display the round score
const rollDice = function () {
  if (gameOver) return;

  message.textContent = "";

  // Create a random number
  randomNumber = Math.floor(Math.random() * 6) + 1;

  // Display dice
  dice.innerHTML = `<img class="dice" src="./images/dice/dice-${randomNumber}.svg" alt="dice ${randomNumber}">`;

  // Round score
  if (randomNumber !== 1) {
    roundScore += randomNumber;
    // Display round score
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
  } else {
    message.textContent = "Groink ! Tour perdu.";
    changePlayer();
  }
};

// Change player
const changePlayer = function () {
  roundScore = 0;
  document.querySelector(`#current-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("active-player");
  player1.classList.toggle("active-player");
};

// Disable a set of controls (used when the game is over)
const disableControls = function (elements) {
  elements.forEach(function (element) {
    element.classList.add("is-disabled");
    element.setAttribute("aria-disabled", "true");
    element.setAttribute("tabindex", "-1");
  });
};

// Hol the score
const holdScore = function () {
  if (gameOver) return;

  // Clear any leftover "bust" message from a previous turn (e.g. holding
  // without rolling right after the other player lost their turn)
  message.textContent = "";

  // add current score
  scores[activePlayer] += roundScore;
  // display score
  document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

  // check player score
  if (scores[activePlayer] >= 100) {
    gameOver = true;
    const playerName = document.querySelector(`.playerName-${activePlayer}`);
    playerName.classList.add("winner-player");
    // Update only the name's text node so the player-X span (active-player marker) stays intact
    playerName.firstChild.textContent = "winner !";
    disableControls([roll, hold]);
  } else {
    // Change player
    changePlayer();
  }
};

// New game
const replay = function () {
  document.location.reload();
};

// Listen for click and keyboard (Enter/Space) activation, since the buttons are <p> elements
const bindActivation = function (element, handler) {
  element.addEventListener("click", handler, false);
  element.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      handler();
    }
  });
};

bindActivation(roll, rollDice);
bindActivation(hold, holdScore);
bindActivation(newGame, replay);
