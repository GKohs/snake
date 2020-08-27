/* eslint semi: ["error", "always"] */
// /* global alert */
const Direction = Object.freeze({ monday: 1, tuesday: 2, wednesday: 3 });
const Keys = Object.freeze({ right: 39, up: 38, left: 37, down: 40 });

document.addEventListener('DOMContentLoaded', () => {
  function buildGrid () {
    for (let i = 0; i < 100; i++) {
      var div = document.createElement('div');
      gameGrid.appendChild(div);
    }
  }

  function control (e) {
    gameGrid.childNodes[currentIndex].classList.remove('snake');

    switch (e.keyCode) {
      case Keys.right:
        direction = 1;
        break;
      case Keys.up:
        direction = -width;
        break;
      case Keys.left:
        direction = -1;
        break;
      case Keys.down:
        direction = width;
        break;
    }
  }

  function startGame () {
    currentSnake.forEach(index => gameGrid.childNodes[index].classList.remove('snake'));
    gameGrid.childNodes[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach(index => gameGrid.childNodes[index].classList.add('snake'));
    interval = setInterval(moveOutcomes, intervalTime);
  }

  function randomApple () {
    do {
      appleIndex = Math.floor(Math.random() * gameGrid.children.length);
    } while (gameGrid.childNodes[appleIndex].classList.contains('snake'));
    gameGrid.childNodes[appleIndex].classList.add('apple');
  }

  function moveOutcomes () {
    // hitting border or self
    if (
      (currentSnake[0] + width >= (width * width) && direction === width) || // bottom
      (currentSnake[0] % width === width - 1 && direction === 1) || // right
      (currentSnake[0] % width === 0 && direction === -1) || // left
      (currentSnake[0] - width < 0 && direction === -width) || // top
      gameGrid.childNodes[currentSnake[0] + direction].classList.contains('snake') // self
    ) {
      return clearInterval(interval);
    }

    const tail = currentSnake.pop();
    gameGrid.childNodes[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);

    // hit apple
    if (gameGrid.childNodes[currentSnake[0]].classList.contains('apple')) {
      gameGrid.childNodes[currentSnake[0]].classList.remove('apple');
      gameGrid.childNodes[tail].classList.add('snake');
      currentSnake.push(tail);
      randomApple();
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }

    gameGrid.childNodes[currentSnake[0]].classList.add('snake');
  }

  const gameGrid = document.querySelector('#game-grid');
  const scoreDisplay = document.querySelector('span');
  const startBtn = document.querySelector('.start');

  const width = 10;
  let currentIndex = 0;
  let appleIndex = 0;
  let currentSnake = [2, 1, 0];
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  buildGrid();

  document.addEventListener('keydown', control);

  startBtn.addEventListener('click', startGame);
});
