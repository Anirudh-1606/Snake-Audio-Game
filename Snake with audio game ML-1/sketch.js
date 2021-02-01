// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Coding Challenge #115: Snake Game Redux
// https://youtu.be/OMoVcohRgZA
let video;

let label = "waiting....";

let classifier;

let snake;
let rez = 20;
let food;
let w;
let h;

// directions object used by passed to the snake handler
const directions = {
  up: 1,
  down: 2,
  left: 3,
  right: 4,
};

function setup() {
  createCanvas(640, 520);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5);
  snake = new Snake();
  foodLocation();
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function draw() {
  scale(rez);
  background(220);
  textSize(32);
  text(label, 10, 50);
  fill(255);

  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();

  if (snake.endGame()) {
    print("END GAME");
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}
