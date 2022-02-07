let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 16;
let snake = [{ x: 16 * box, y: 16 * box }];
let direction = 1;
let food = {
  x: Math.floor(Math.random() * 31 + 1) * box,
  y: Math.floor(Math.random() * 31 + 1) * box,
};
function createBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, box * 32, box * 32);
}

function createSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function start() {
  if (snake[0].x > 31 * box && direction == 2) snake[0].x = 0;
  else if (snake[0].x < 0 && direction == 0) snake[0].x = box * 31;
  else if (snake[0].y < 0 && direction == 1) snake[0].y = box * 31;
  else if (snake[0].y > 31 * box && direction == 3) snake[0].y = 0;

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[i].y == snake[0].y) {
      clearInterval(game);
      alert("Game Over!");
    }
  }

  createBG();
  createSnake();
  drawFood();
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  direction == 2 //right
    ? (snakeX += box)
    : direction == 3 //down
    ? (snakeY += box)
    : direction == 0 //left
    ? (snakeX -= box)
    : (snakeY -= box); //up

  if (snakeX != food.x || snakeY != food.y) snake.pop();
  else {
    food.x = Math.floor(Math.random() * 31 + 1) * box;
    food.y = Math.floor(Math.random() * 31 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

document.addEventListener("keydown", update);

function update(event) {
  if (event.keyCode == 37 && direction != 2) direction = 0; //left
  if (event.keyCode == 38 && direction != 3) direction = 1; //up
  if (event.keyCode == 39 && direction != 0) direction = 2; //right
  if (event.keyCode == 40 && direction != 1) direction = 3; //down
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

let game = setInterval(start, 100);
