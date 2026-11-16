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
var obstacleOneXSpeed = 1;
var obstacleOneYSpeed = 1;

var obstacleTwoX = 250;
var obstacleTwoY = 430;
var obstacleTwoXSpeed = -1;
var obstacleTwoYSpeed = 1;

var obstacleThreeX = 350;
var obstacleThreeY = 180;
var obstacleThreeXSpeed = 1;
var obstacleThreeYSpeed = -1;

// Mouse
var mouseShapeX = 0;
var mouseShapeY = 0;
var mouseShapeExists = false;

function setup()
{
    createCanvas(500, 600);

    obstacleOneXSpeed = random(-2, 2);
    obstacleOneYSpeed = random(-2, 2);
    obstacleTwoXSpeed = random(-2, 2);
    obstacleTwoYSpeed = random(-2, 2);
    obstacleThreeXSpeed = random(-2, 2);
    obstacleThreeYSpeed = random(-2, 2);
}

function draw()
{
    background(205, 178, 140);
    movePlayer();
    moveObstacleOne();
    moveObstacleTwo();
    moveObstacleThree();
    createBorders(14);
    createExit();
    createObstacles();
    drawMouseObstacle();
    createPlayer();
    checkExit();
    displayWinMessage();
}

function createPlayer()
{
    fill(150);
    stroke(0);
    strokeWeight(2);

    triangle(
        characterX - characterSize, characterY - characterSize,
        characterX - characterSize, characterY + characterSize,
        characterX + characterSize, characterY
    );
}

function movePlayer()
{
    if(won === false)
    {
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
    }

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

function createObstacles()
{
    stroke(0);
    strokeWeight(3);

    fill(100);
    rect(obstacleOneX, obstacleOneY, 90, 35);

    fill(170);
    rect(obstacleTwoX, obstacleTwoY, 45, 80);

    fill(125);
    rect(obstacleThreeX, obstacleThreeY, 65, 50);
}

function moveObstacleOne()
{
    obstacleOneX += obstacleOneXSpeed;
    obstacleOneY += obstacleOneYSpeed;

    if(random(1) < 0.02)
    {
        obstacleOneXSpeed = random(-2, 2);
        obstacleOneYSpeed = random(-2, 2);
    }

    if(obstacleOneX > width)
    {
        obstacleOneX = 0;
    }
    else if(obstacleOneX < 0)
    {
        obstacleOneX = width;
    }
    if(obstacleOneY > height)
    {
        obstacleOneY = 0;
    }
    else if(obstacleOneY < 0)
    {
        obstacleOneY = height;
    }
}

function moveObstacleTwo()
{
    obstacleTwoX += obstacleTwoXSpeed;
    obstacleTwoY += obstacleTwoYSpeed;

    if(random(1) < 0.02)
    {
        obstacleTwoXSpeed = random(-2, 2);
        obstacleTwoYSpeed = random(-2, 2);
    }

    if(obstacleTwoX > width)
    {
        obstacleTwoX = 0;
    }
    else if(obstacleTwoX < 0)
    {
        obstacleTwoX = width;
    }
    if(obstacleTwoY > height)
    {
        obstacleTwoY = 0;
    }
    else if(obstacleTwoY < 0)
    {
        obstacleTwoY = height;
    }
}

function moveObstacleThree()
{
    obstacleThreeX += obstacleThreeXSpeed;
    obstacleThreeY += obstacleThreeYSpeed;

    if(random(1) < 0.02)
    {
        obstacleThreeXSpeed = random(-2, 2);
        obstacleThreeYSpeed = random(-2, 2);
    }

    if(obstacleThreeX > width)
    {
        obstacleThreeX = 0;
    }
    else if(obstacleThreeX < 0)
    {
        obstacleThreeX = width;
    }
    if(obstacleThreeY > height)
    {
        obstacleThreeY = 0;
    }
    else if(obstacleThreeY < 0)
    {
        obstacleThreeY = height;
    }
}

function createBorders(thickness)
{
    fill(90);
    noStroke();

    rect(0, 0, width, thickness);
    rect(0, 0, thickness, height);
    rect(0, height - thickness, width, thickness);
    rect(width - thickness, 0, thickness, exitTop);
    rect(width - thickness, exitBottom, thickness, height - exitBottom);
}

function createExit()
{
    fill(80);
    stroke(0);
    strokeWeight(2);
    rect(width - 62, exitTop + 12, 48, 36);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text("EXIT", width - 38, exitTop + 30);
}

function checkExit()
{
    if(characterX > width - characterSize && characterY > exitTop && characterY < exitBottom)
    {
        won = true;
    }
    else if(characterX > width - characterSize)
    {
        characterX = width - characterSize;
    }
}

function displayWinMessage()
{
    if(won === true)
    {
        fill(0);
        noStroke();
        textAlign(CENTER);
        textSize(30);
        text("You escaped!", width / 2, height / 2);
    }
}

function createMouseObstacle(x, y)
{
    mouseShapeX = x;
    mouseShapeY = y;
    mouseShapeExists = true;

    fill(140);
    stroke(0);
    strokeWeight(3);
    circle(mouseShapeX, mouseShapeY, 35);
}

function drawMouseObstacle()
{
    if(mouseShapeExists === true)
    {
        fill(140);
        stroke(0);
        strokeWeight(3);
        circle(mouseShapeX, mouseShapeY, 35);
    }
}

function mouseClicked()
{
    createMouseObstacle(mouseX, mouseY);
}
