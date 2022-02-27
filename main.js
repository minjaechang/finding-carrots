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

const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let timer = undefined;
let score = 0;

gameField.addEventListener('click', onGameFieldClick);

gameButton.addEventListener('click', () => {
  if (!started) {
    startGame();
  } else {
    stopGame();
  }
});

popUpReplay.addEventListener('click', () => {
  hidePopUp();
  startGame();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText('Replay❓');
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  stopGameTimer();
  stopSound(bgSound);
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  showPopUpWithText(win ? 'You Won 🎉' : 'You Lost 💩');
}

function showStopButton() {
  gameButton.style.visibility = 'visible';
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
      finishGame(false);
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

function showPopUpWithText(text) {
  popUp.classList.remove('popUp--hide');
  popUpText.innerText = text;
}

function hidePopUp() {
  popUp.classList.add('popUp--hide');
}

function initGame() {
  score = 0;
  gameField.innerHTML = '';
  gameScore.innerText = CARROT_COUNT;
  addItem('carrot', 5, 'img/carrot.png');
  addItem('bug', 5, 'img/bug.png');
}

function onGameFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches('.carrot')) {
    target.remove();
    score++;
    updateScoreBoard();
    playSound(carrotSound);
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.bug')) {
    finishGame(false);
    playSound(bugSound);
  }
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
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

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
