// x and y for my character
var characterX = 100;
var characterY = 100;
var characterSize = 25;

// define the key codes for each letter
var w = 87;
var s = 83;
var a = 65;
var d = 68;

// arrays for the moving obstacles
var shapeXs = [];
var shapeYs = [];
var diameters = [];
var shapeColors = [];
var shapeXSpeeds = [];
var shapeYSpeeds = [];

// create a shape when the mouse is clicked
var mouseShapeX;
var mouseShapeY;
var mouseShapeExists = false;

var won = false;

function setup()
{
    createCanvas(500, 600);

    for(var i = 0; i < 50; i++)
    {
        shapeXSpeeds[i] = Math.floor(Math.random() * 4) - 2;
        shapeYSpeeds[i] = Math.floor(Math.random() * 4) - 2;

        if(shapeXSpeeds[i] === 0)
        {
            shapeXSpeeds[i] = 1;
        }
        if(shapeYSpeeds[i] === 0)
        {
            shapeYSpeeds[i] = -1;
        }

        shapeXs[i] = getRandomNumber(500);
        shapeYs[i] = getRandomNumber(600);
        diameters[i] = getRandomNumber(30);
        shapeColors[i] = [
            color(13, 145, 14),
            color(220, 60, 60),
            color(60, 90, 220),
            color(240, 170, 40),
            color(170, 60, 210),
            color(40, 190, 190)
        ][i % 6];
    }

    createCharacter(100, 100);
}

function draw()
{
    background(120, 45, 78);
    stroke(0);
    fill(0);

    createBorders(10);

    textSize(16);
    textAlign(CENTER);
    text("EXIT", width - 35, height - 35);

    drawCharacter();
    characterMovement();
    moveAndDrawShapes();
    drawMouseShape();
    checkExit();
    displayWinMessage();
}

function characterMovement()
{
    if(won)
    {
        return;
    }

    if(keyIsDown(w))
    {
        characterY -= 10;
    }
    if(keyIsDown(s))
    {
        characterY += 10;
    }
    if(keyIsDown(a))
    {
        characterX -= 10;
    }
    if(keyIsDown(d))
    {
        characterX += 10;
    }

    if(characterX < characterSize / 2)
    {
        characterX = characterSize / 2;
    }
    if(characterY < characterSize / 2)
    {
        characterY = characterSize / 2;
    }
    if(characterX > width - characterSize / 2)
    {
        characterX = width - characterSize / 2;
    }
    if(characterY > height - characterSize / 2)
    {
        characterY = height - characterSize / 2;
    }
}

function createCharacter(x, y)
{
    characterX = x;
    characterY = y;
}

function drawCharacter()
{
    fill(23, 40, 123);
    noStroke();
    circle(characterX, characterY, characterSize);
}

function moveAndDrawShapes()
{
    for(var i = 0; i < shapeXs.length; i++)
    {
        fill(shapeColors[i]);
        noStroke();
        circle(shapeXs[i], shapeYs[i], diameters[i]);

        shapeXs[i] += shapeXSpeeds[i];
        shapeYs[i] += shapeYSpeeds[i];

        if(random(1) < 0.02)
        {
            shapeXSpeeds[i] = Math.floor(Math.random() * 5) - 2;
            shapeYSpeeds[i] = Math.floor(Math.random() * 5) - 2;

            if(shapeXSpeeds[i] === 0)
            {
                shapeXSpeeds[i] = 1;
            }
            if(shapeYSpeeds[i] === 0)
            {
                shapeYSpeeds[i] = -1;
            }
        }

        if(shapeXs[i] > width)
        {
            shapeXs[i] = 0;
        }
        if(shapeXs[i] < 0)
        {
            shapeXs[i] = width;
        }
        if(shapeYs[i] > height)
        {
            shapeYs[i] = 0;
        }
        if(shapeYs[i] < 0)
        {
            shapeYs[i] = height;
        }
    }
}

function createBorders(thickness)
{
    fill(0);
    noStroke();

    rect(0, 0, width, thickness);
    rect(0, 0, thickness, height);
    rect(0, height - thickness, width, thickness);
    rect(width - thickness, 0, thickness, height - 50);
}

function mouseClicked()
{
    mouseShapeX = mouseX;
    mouseShapeY = mouseY;
    mouseShapeExists = true;
}

function drawMouseShape()
{
    if(mouseShapeExists)
    {
        fill(120, 130, 140);
        stroke(0);
        circle(mouseShapeX, mouseShapeY, 25);
    }
}

function checkExit()
{
    if(characterX > width - characterSize &&
       characterY > height - 50)
    {
        won = true;
    }
}

function displayWinMessage()
{
    if(won)
    {
        fill(0);
        noStroke();
        textAlign(CENTER);
        textSize(26);
        text("You Win!", width / 2, height / 2);
    }
}

function getRandomNumber(number)
{
    return Math.floor(Math.random() * number) + 10;
}
