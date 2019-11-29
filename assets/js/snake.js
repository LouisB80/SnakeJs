
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var dx, dy;
var foodX, foodY;
// Création du serpent
let snake = [
  {x: 450, y: 400},
  {x: 440, y: 400},
  {x: 430, y: 400},
  {x: 420, y: 400},
  {x: 410, y: 400},
];
// Dessin de chaque partie du serpent
function drawSnakePart(snakePart)
{
  ctx.fillStyle = 'lightgreen';
  ctx.strokestyle = 'darkgreen';
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
};
//dessin du serpent complet
function drawSnake()
{
  snake.forEach(drawSnakePart);
};
//Deplacement du serpent
function advanceSnake()
{
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  snake.pop();
  const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
  if (didEatFood) {
    createFood();
    snake.push(foodX,foodY);
  };
};
//Ajout des controles
function changeDirection(event)
{
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  const keyPressed = event.keyCode;
  const goingup = dy === -10;
  const goingdown = dy === 10;
  const goingleft = dx === -10;
  const goingright = dx === 10;
  if(keyPressed === LEFT_KEY && !goingright)
  {
    dx = -10;
    dy = 0;
  };
  if(keyPressed === RIGHT_KEY && !goingleft)
  {
    dx = 10;
    dy = 0;
  };
  if(keyPressed === DOWN_KEY && !goingup)
  {
    dx = 0;
    dy = 10;
  };
  if(keyPressed === UP_KEY && !goingdown)
  {
    dx = 0;
    dy = -10;
  };
};
//Rafraichissement des canvas
function clearCanvas()
{
  ctx.fillStyle = "white";
  ctx.strokestyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height)
};
// Generation d'un position aléatoire
function randomTen(min, max)
{
  var result = (Math.round((Math.random() * (max - min) + min) /10 ) * 10)
  return result;
};
//Creation de la nourriture
function createFood()
{
  foodX = randomTen(0, (canvas.width - 10));
  foodY = randomTen(0, (canvas.height - 10));
  snake.forEach(function idFoodOnSnake(part)
  {
    const foodIsOnSnake = part.x == foodX && part.y == foodY
    if(foodIsOnSnake){
      createFood();
    }
  });
};
//Dessin de la nourriture dans le canvas
function drawFood()
{
  ctx.fillStyle = 'red';
  ctx.strokestyle = 'red';
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
};
//Fonction principal
function main()
{
  setTimeout(function onTick()
  {
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
    main();
  },50);
  document.addEventListener("keydown", changeDirection);
};
