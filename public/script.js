const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 3) * box
};

let score = 0;
let d;

document.addEventListener('keydown', direction);
document.addEventListener('keydown', restartGame);

function direction(event) {
  if (event.keyCode == 37 && d != 'RIGHT') {
    d = 'LEFT';
  } else if (event.keyCode == 38 && d != 'DOWN') {
    d = 'UP';
  } else if (event.keyCode == 39 && d != 'LEFT') {
    d = 'RIGHT';
  } else if (event.keyCode == 40 && d != 'UP') {
    d = 'DOWN';
  }
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

function draw() {
  ctx.fillStyle = '#f4f4f4';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? 'green' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d == 'LEFT') snakeX -= box;
  if (d == 'UP') snakeY -= box;
  if (d == 'RIGHT') snakeX += box;
  if (d == 'DOWN') snakeY += box;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 3) * box
    };
    // Increase the size of the snake by not popping the last element
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    showGameOver(); // Show game over message
    return;
  }

  snake.unshift(newHead);

  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 5, canvas.height - 5);
}

function showGameOver() {
  ctx.fillStyle = 'black';
  ctx.font = '50px Arial';
  ctx.fillText('Game Over', canvas.width / 6, canvas.height / 2);
  ctx.font = '20px Arial';
  ctx.fillText('Press R to Restart', canvas.width / 5, canvas.height / 1.5);
}

function restartGame(event) {
  if (event.keyCode == 82) { // 'R' key
    resetGame();
  }
}

function resetGame() {
  snake = [];
  snake[0] = { x: 9 * box, y: 10 * box };
  score = 0;
  d = undefined;
  food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 3) * box
  };
  clearInterval(game);
  game = setInterval(draw, 100);
}

let game = setInterval(draw, 100);
