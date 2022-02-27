'use strict';

const CARROT_SIZE = 80;
const GAME_DURATION_SEC = 5;
const CARROT_COUNT = 5;

const gameButton = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();

const popUp = document.querySelector('.popUp');
const popUpText = document.querySelector('.popUp__message');
const popUpReplay = document.querySelector('.popUp__replay');

let started = false;
let timer = undefined;
let score = 0;

gameButton.addEventListener('click', () => {
  if (!started) {
    startGame();
  } else {
    stopGame();
  }
});

popUpReplay.addEventListener('click', () => {
  startGame();
  hidePopUp();
});

function startGame() {
  started = !started;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  started = !started;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText();
}

function showStopButton() {
  const icon = gameButton.querySelector('.fa-solid');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function hideGameButton() {
  gameButton.style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerWithText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame();
      return;
    }
    updateTimerWithText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerWithText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerHTML = `${minutes}:${seconds}`;
}

function finishGame() {
  started = false;
  showPopUpWithText();
}

function showPopUpWithText(text) {
  popUp.classList.remove('popUp--hide');
}

function hidePopUp() {
  popUp.classList.add('popUp--hide');
}

function initGame() {
  gameField.innerHTML = '';
  gameScore.innerText = CARROT_COUNT;
  addItem('carrot', 5, 'img/carrot.png');
  addItem('bug', 5, 'img/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);

    item.style.position = 'absolute';

    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);

    item.style.left = x + 'px';
    item.style.top = y + 'px';

    gameField.append(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function updateTimerText(remainingTime) {}
