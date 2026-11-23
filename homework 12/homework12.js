// x and y for my character
var characterX = 60;
var characterY = 300;
var characterSize = 18;

// define the key codes for each letter
var w = 87;
var s = 83;
var a = 65;
var d = 68;

// enemy arrays
var shapeXs = [];
var shapeYs = [];
var diameters = [];
var shapeXSpeeds = [];
var shapeYSpeeds = [];

// create a shape when the mouse is clicked
var mouseShapeX;
var mouseShapeY;

function setup() {
    createCanvas(500, 600);

    // get a random speed when the it first starts
    for (var i = 0; i < 50; i++) {
        shapeXSpeeds[i] = Math.floor(Math.random() * (Math.floor(Math.random() * 5)) + 1);
        shapeYSpeeds[i] = Math.floor(Math.random() * (Math.floor(Math.random() * 5)) + 1);
        shapeXs[i] = getRandomNumber(500);
        shapeYs[i] = getRandomNumber(600);
        diameters[i] = getRandomNumber(30);
    }

    createCharacter(60, 300);
}

function draw() {
    background(205, 178, 140);
    stroke(0);

    // draw and move the enemy circles
    fill(120);
    for (var i = 0; i < shapeXs.length; i++) {
        circle(shapeXs[i], shapeYs[i], diameters[i]);

        shapeXSpeeds[i] = Math.floor(Math.random() * (Math.floor(Math.random() * 5)) + 1);
        shapeYSpeeds[i] = Math.floor(Math.random() * (Math.floor(Math.random() * 5)) + 1);

        shapeXs[i] += shapeXSpeeds[i];
        shapeYs[i] += shapeYSpeeds[i];

        if (shapeXs[i] > width) {
            shapeXs[i] = 0;
        }
        if (shapeXs[i] < 0) {
            shapeXs[i] = width;
        }
        if (shapeYs[i] > height) {
            shapeYs[i] = 0;
        }
        if (shapeYs[i] < 0) {
            shapeYs[i] = height;
        }
    }

    // call createBorders function
    createBorders(10);

    // exit
    fill(80);
    rect(width - 62, 272, 48, 36);
    fill(255);
    textSize(16);
    text("EXIT", width - 38, 290);

    // mouse shape
    fill(140);
    circle(mouseShapeX, mouseShapeY, 25);

    drawCharacter();
    characterMovement();

    // check to see if the character has left the exit
    if (characterX > width && characterY > 260 && characterY < 340) {
        fill(0);
        textSize(26);
        text("You escaped!", width / 2 - 80, height / 2);
    }
}

function characterMovement() {
    // handle the keys
    if (keyIsDown(w)) {
        characterY -= 10;
    }
    if (keyIsDown(s)) {
        characterY += 10;
    }
    if (keyIsDown(a)) {
        characterX -= 10;
        console.log("movement: " + characterX);
    }
    if (keyIsDown(d)) {
        characterX += 10;
    }
}

function createCharacter(x, y) {
    characterX = x;
    characterY = y;
}

function drawCharacter() {
    fill(150);
    stroke(0);
    triangle(
        characterX - characterSize,
        characterY - characterSize,
        characterX - characterSize,
        characterY + characterSize,
        characterX + characterSize,
        characterY
    );
}

function createBorders(thickness) {
    fill(90);
    rect(0, 0, width, thickness);
    rect(0, 0, thickness, height);
    rect(0, height - thickness, width, thickness);
    rect(width - thickness, 0, thickness, 260);
    rect(width - thickness, 340, thickness, height - 340);
}

function mouseClicked() {
    mouseShapeX = mouseX;
    mouseShapeY = mouseY;
}

function getRandomNumber(number) {
    return Math.floor(Math.random() * number) + 10;
}
