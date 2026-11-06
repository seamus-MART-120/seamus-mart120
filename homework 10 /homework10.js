
// Character
var characterX = 60;
var characterY = 300;
var characterSize = 18;

// Keys
var w = 87;
var s = 83;
var a = 65;
var d = 68;

// Exit
var exitTop = 260;
var exitBottom = 340;
var won = false;

// Obstacles
var obstacleOneX = 130;
var obstacleOneY = 150;
var obstacleTwoX = 250;
var obstacleTwoY = 430;
var obstacleThreeX = 350;
var obstacleThreeY = 180;

// Mouse
var mouseShapeX = 0;
var mouseShapeY = 0;
var mouseShapeExists = false;

function setup()
{
    // Canvas
    createCanvas(500, 600);
}

function draw()
{
    background(205, 178, 140);

    // Movement
    if(won === false)
    {
        characterMovement();
    }

    createBorders(14);
    drawExit();
    drawObstacles();
    drawMouseObstacle();
    drawCharacter();

    // Victory
    if(characterX > width - characterSize && characterY > exitTop && characterY < exitBottom)
    {
        won = true;
    }
    else if(characterX > width - characterSize)
    {
        characterX = width - characterSize;
    }

    if(won === true)
    {
        fill(0);
        noStroke();
        textAlign(CENTER);
        textSize(30);
        text("You escaped!", width / 2, height / 2);
    }
}

function characterMovement()
{
    // Controls
    if(keyIsDown(w))
    {
        characterY -= 5;
    }
    if(keyIsDown(s))
    {
        characterY += 5;
    }
    if(keyIsDown(a))
    {
        characterX -= 5;
    }
    if(keyIsDown(d))
    {
        characterX += 5;
    }

    // Boundaries
    if(characterX < characterSize)
    {
        characterX = characterSize;
    }
    if(characterY < characterSize)
    {
        characterY = characterSize;
    }
    if(characterY > height - characterSize)
    {
        characterY = height - characterSize;
    }
}

function drawCharacter()
{
    fill(220, 25, 25);
    stroke(0);
    strokeWeight(2);

    // Triangle
    triangle(
        characterX - characterSize, characterY - characterSize,
        characterX - characterSize, characterY + characterSize,
        characterX + characterSize, characterY
    );
}

function createBorders(thickness)
{
    fill(82, 48, 30);
    noStroke();

    // Walls
    rect(0, 0, width, thickness);
    rect(0, 0, thickness, height);
    rect(0, height - thickness, width, thickness);

    // Opening
    rect(width - thickness, 0, thickness, exitTop);
    rect(width - thickness, exitBottom, thickness, height - exitBottom);
}

function drawExit()
{
    // Sign
    fill(0, 110, 55);
    stroke(0);
    strokeWeight(2);
    rect(width - 62, exitTop + 12, 48, 36);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text("EXIT", width - 38, exitTop + 30);
}

function drawObstacles()
{
    // Collision
    stroke(0);
    strokeWeight(3);

    fill(70, 130, 180);
    rect(obstacleOneX, obstacleOneY, 90, 35);

    fill(238, 190, 55);
    rect(obstacleTwoX, obstacleTwoY, 45, 80);

    fill(145, 85, 165);
    rect(obstacleThreeX, obstacleThreeY, 65, 50);
}

function drawMouseObstacle()
{
    if(mouseShapeExists === true)
    {
        fill(235, 105, 75);
        stroke(0);
        strokeWeight(3);
        circle(mouseShapeX, mouseShapeY, 35);
    }
}

function mouseClicked()
{
    mouseShapeX = mouseX;
    mouseShapeY = mouseY;
    mouseShapeExists = true;
}
