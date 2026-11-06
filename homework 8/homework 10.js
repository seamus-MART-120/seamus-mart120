// Homework 10: Find the Exit
// Use the arrow keys or WASD to move. Click the canvas to add an obstacle.

var player;
var exitDoor;
var obstacles = [];
var gameWon = false;
var playerSize = 30;
var moveSpeed = 3;

function setup() {
  createCanvas(700, 500);

  // The player and exit are rectangles described by their position and size.
  player = { x: 30, y: 235, size: playerSize };
  exitDoor = { x: 630, y: 205, width: 40, height: 90 };

  // These obstacles have different sizes and colors. They are decorations:
  // the player can move through them because this game ignores collisions.
  obstacles.push({ x: 150, y: 90, width: 90, height: 35, color: [230, 92, 82] });
  obstacles.push({ x: 300, y: 180, width: 45, height: 110, color: [77, 156, 112] });
  obstacles.push({ x: 455, y: 345, width: 115, height: 50, color: [94, 123, 205] });
}

function draw() {
  background(238, 245, 248);

  drawExit();
  drawObstacles();
  movePlayer();
  drawPlayer();
  checkForWin();

  noStroke();
  fill(40, 54, 64);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Move: arrow keys or WASD   |   Click: add an obstacle", 16, 14);

  if (gameWon) {
    fill(30, 120, 75);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("You made it to the exit! You win!", width / 2, 65);
  } else {
    fill(40, 54, 64);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("Guide the yellow player to the green exit.", width / 2, height - 20);
  }
}

function movePlayer() {
  // The || means either the arrow key OR its matching WASD key will work.
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    player.x -= moveSpeed;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    player.x += moveSpeed;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    player.y -= moveSpeed;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    player.y += moveSpeed;
  }

  // Keep the player visible on the canvas. This is not obstacle collision.
  player.x = constrain(player.x, 0, width - player.size);
  player.y = constrain(player.y, 0, height - player.size);
}

function drawPlayer() {
  noStroke();
  fill(255, 195, 55);
  rect(player.x, player.y, player.size, player.size, 6);
  fill(70, 55, 35);
  circle(player.x + 10, player.y + 11, 4);
  circle(player.x + 21, player.y + 11, 4);
}

function drawObstacles() {
  noStroke();
  for (var i = 0; i < obstacles.length; i++) {
    var obstacle = obstacles[i];
    fill(obstacle.color[0], obstacle.color[1], obstacle.color[2]);
    rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, 5);
  }
}

function drawExit() {
  noStroke();
  fill(52, 164, 104);
  rect(exitDoor.x, exitDoor.y, exitDoor.width, exitDoor.height, 5);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  text("EXIT", exitDoor.x + exitDoor.width / 2, exitDoor.y + exitDoor.height / 2);
}

function checkForWin() {
  // These four comparisons check whether the player overlaps the exit.
  // The && means all four parts must be true. Obstacles are not checked.
  if (
    player.x < exitDoor.x + exitDoor.width &&
    player.x + player.size > exitDoor.x &&
    player.y < exitDoor.y + exitDoor.height &&
    player.y + player.size > exitDoor.y
  ) {
    gameWon = true;
  }
}

function mousePressed() {
  // Add a stationary obstacle where the mouse was clicked.
  // Its color and size are chosen at random.
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    obstacles.push({
      x: mouseX - 20,
      y: mouseY - 20,
      width: random(30, 70),
      height: random(30, 70),
      color: [random(80, 220), random(80, 220), random(80, 220)]
    });
  }

  return false;
}
