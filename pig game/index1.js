const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const diceEl = document.getElementById("dice");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const btnNew = document.getElementById("btn--new");
const btnRoll = document.getElementById("btn--roll");
const btnHold = document.getElementById("btn--hold");

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

function init() {
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.style.display = "block";
  diceEl.src = "dice1.jpg";
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.style.background = "";
  player1El.style.background = "";
}

btnRoll.addEventListener("click", function () {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice${dice}.jpg`;

  switch (dice) {
    case 1:
      switchPlayer();
      break;
    default:
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      break;
  }
});
btnHold.addEventListener("click", function () {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    document.querySelector(`.player--${activePlayer}`).style.background = "#28a745";
    diceEl.style.display = "none";
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener("click", init);

init();
