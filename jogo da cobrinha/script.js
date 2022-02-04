let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 16;
let snake = [{ x: 16 * box, y: 16 * box }];
let direction = 1;

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
    if(snake[0].x > 31*box && direction == 2) snake[0].x =0
    else if(snake[0].x < 0 && direction == 0) snake[0].x = box*31
    else if(snake[0].y < 0 && direction == 1) snake[0].y = box*31
    else if(snake[0].y > 31*box && direction == 3) snake[0].y = 0
    
  createBG();
  createSnake();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  direction == 2 //right
    ? (snakeX += box)
    : direction == 3 //down
    ? (snakeY += box)
    : direction == 0 //left
    ? (snakeX -= box)
    : (snakeY -= box); //up

  snake.pop();

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

document.addEventListener("keydown", update);

function update(event) {
  if (event.keycode == 37 && direction != "right") direction = 0; //left
  if (event.keycode == 38 && direction != "down") direction = 1; //up
  if (event.keycode == 39 && direction != "left") direction = 2; //right
  if (event.keycode == 40 && direction != "up") direction = 3; //down
}

let game = setInterval(start,100);
