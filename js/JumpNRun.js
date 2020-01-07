// function move basiert auf code von Frank Poth
// https://github.com/frankarendpoth/frankarendpoth.github.io/blob/master/content/pop-vlog/javascript/2017/009-control/control.js
var direction = 1;
var state = start;
var selectetLevel = 1;
var gamestate = 1;
var won;
var dogPeeing = false;
var fall = false;
var lUp = false;
var pUp = false;
var Up = [];

var dog = {
  x: 5,
  y: 480,
  sx: 30,
  sy: 50,
  live: 100,
  points: 0,
  x_velocity: 0,
  y_velocity: 0,
  jumping: false
};
var cat = {
  x: 250,
  y: 490,
  sx: 10,
  sy: 10
};
var human = {
  x: 200,
  y: 450,
  sx: 20,
  sy: 50
};
var box = {
  x: 100,
  y: 400,
  sx: 20,
  sy: 20
};
var tree = {
  x: 300,
  y: 440,
  sx: 15,
  sy: 60
};
var shrub = {
  x: 400,
  y: 460,
  sx: 50,
  sy: 40
};
var hole = {
  x: 350,
  y: 500,
  sx: 40,
  sy: 40
};
var haus = {
  x: 600,
  y: 470,
  sx: 30,
  sy: 30
};

//state
function start() {
  fill(100, 100, 100);
  rect(200, 200, 100, 50);
  rect(400, 200, 100, 50);
  fill(0, 0, 0);
  textSize(15);
  text("Start Game", 220, 230);
  text("Select Level", 415, 230);
}
function level() {
  fill(100, 100, 100);
  rect(300, 140, 100, 50);
  rect(300, 200, 100, 50);
  rect(300, 260, 100, 50);
  rect(500, 100, 50, 25);
  fill(0, 0, 0);
  textSize(15);
  text("Level 1", 330, 170);
  text("Level 2", 330, 230);
  text("Level 3", 330, 290);
  text("back", 513, 116);
}
function gameOver() {
  fill(200, 200, 200);
  textSize(30);
  text("Game Over", 270, 250);
  fill(100, 100, 100);
  rect(240, 260, 100, 50);
  rect(360, 260, 100, 50);
  fill(0, 0, 0);
  textSize(15);
  text("back to Menu", 247, 290);
  text("restart", 390, 290);
  dog.points = 0;
}
function gameWon() {
  fill(10, 10, 10);
  rect(100, 100, 50, 50);
}

//objects
function player() {
  if (dogPeeing === true) {
    fill(100, 100, 100);
  } else {
    fill("yellow");
  }
  image(dog_sprite, dog.x, dog.y, 50, 30, 0, 0, 800, 800);
}
//cat
function enemy1() {
  fill("red");
  rect(cat.x, cat.y, cat.sx, cat.sy);
}
//human
function enemy2() {
  fill(250, 100, 100);
  rect(human.x, human.y, human.sx, human.sy);
}
function liveBox() {
  fill("pink");
  rect(box.x, box.y, box.sx, box.sy);
}
function trees() {
  fill("brown");
  rect(tree.x, tree.y, tree.sx, tree.sy);
}
function shrubbery() {
  fill("darkgreen");
  rect(shrub.x, shrub.y, shrub.sx, shrub.sy);
}
function holes() {
  fill(0, 0, 0);
  rect(hole.x, hole.y, hole.sx, hole.sy);
}
function dogHaus() {
  fill("Pink");
  rect(haus.x, haus.y, haus.sx, haus.sy);
}
function ground() {
  fill("blue");
  rect(5, 500, 650, 10);
}

//display
function live() {
  fill(200, 200, 200);
  textSize(15);
  text("Live:" + dog.live, 100, 100);
}
function points() {
  fill(200, 200, 200);
  textSize(15);
  text("Points:" + dog.points, 100, 120);
}

function move() {
  //Player movement

  if (keyIsDown(UP_ARROW) && dog.jumping === false) {
    dog.y_velocity -= 20;
    dog.jumping = true;
  }

  if (keyIsDown(LEFT_ARROW)) {
    dog.x_velocity -= 0.5;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    dog.x_velocity += 0.5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    dogPeeing = true;
  }

  dog.y_velocity += 1.5; // gravity
  dog.x += dog.x_velocity;
  dog.y += dog.y_velocity;
  dog.x_velocity *= 0.9; // friction
  dog.y_velocity *= 0.9; // friction

  // if dog is falling below floor line
  if (dog.x >= hole.x && dog.x + dog.sx <= hole.x + hole.sx) {
    fall = true;
  } else {
    fall = false;
  }
  if (dog.y > 470 && fall === false) {
    dog.jumping = false;
    dog.y = 470;
    dog.y_velocity = 0;
  } else if (
    dog.y + dog.sy >= shrub.y &&
    dog.x + dog.sx - 2 >= shrub.x &&
    dog.x <= shrub.x + shrub.sx - 2
  ) {
    dog.jumping = false;
    dog.y = 430;
    dog.y_velocity = 0;
  }
  if (dog.y > 600) {
    state = gameOver;
  }
  //if dog is leaving state
  if (dog.x > 630) {
    dog.x = 5;
    gamestate += 1;
  } else if (dog.x < 5 && gamestate >= 2) {
    dog.x = 630;
    gamestate -= 1;
  }
  if (dog.x <= 5 && gamestate === 1) {
    dog.x = 5;
  }

  //Cat movement
  cat.x = cat.x + direction;
  if (
    cat.x > 460 ||
    cat.x < 100 ||
    (cat.x + cat.sx >= shrub.x && cat.x <= shrub.x + shrub.sx)
  ) {
    direction = direction * -1;
  }

  //Human movement

  human.x = human.x + direction;
  if (human.x > 460 || human.x < 100) {
    direction = direction * -1;
  }
}
function hit() {
  if (colision(cat, dog) === true && (gamestate === 1 || gamestate === 3)) {
    dog.live -= 1;
  }
  if (colision(box, dog) === true && lUp === false) {
    dog.live += 1;
    lUp = true;
  }
  if (colision(dog, human) === true && gamestate === 2) {
    state = gameOver;
  }
  if (colision(dog, tree) === true && dogPeeing === true && pUp === false) {
    dog.points += 1;
    dogPeeing = false;
    pUp = true;
  } else if (colision(dog, tree) === false && dogPeeing === true) {
    dogPeeing = false;
  }
  if (
    dog.x + dog.sx >= shrub.x &&
    dog.x <= shrub.x + 1 &&
    dog.y + dog.sy >= shrub.y
  ) {
    dog.x = shrub.x - dog.sx;
  } else if (
    dog.x <= shrub.x + shrub.sx &&
    dog.x >= shrub.x + shrub.sx - 5 &&
    dog.y + dog.sy >= shrub.y
  ) {
    dog.x = shrub.x + shrub.sx;
  }
}
function colision(obj1, obj2) {
  if (
    (obj1.x > obj2.x &&
      obj1.x < obj2.x + obj2.sx &&
      obj1.y > obj2.y &&
      obj1.y < obj2.y + obj2.sy) ||
    (obj1.x + obj1.sx > obj2.x &&
      obj1.x + obj1.sx < obj2.x + obj2.sx &&
      obj1.y > obj2.y &&
      obj1.y < obj2.y + obj2.sy) ||
    (obj1.x + obj1.sx > obj2.x &&
      obj1.x + obj1.sx < obj2.x + obj2.sx &&
      obj1.y + obj1.sy > obj2.y &&
      obj1.y + obj1.sy < obj2.y + obj2.sy) ||
    (obj1.x > obj2.x &&
      obj1.x < obj2.x + obj2.sx &&
      obj1.y + obj1.sy > obj2.y &&
      obj1.y + obj1.sy < obj2.y + obj2.sy)
  ) {
    return true;
  }
  return false;
}
function mousePressed() {
  //Start Game
  if (
    state === start &&
    mouseX > 200 &&
    mouseX < 300 &&
    mouseY > 200 &&
    mouseY < 250
  ) {
    state = selectetLevel;
    dog.x = 5;
  }
  //Level selection menu
  if (
    state === start &&
    mouseX > 400 &&
    mouseX < 500 &&
    mouseY > 200 &&
    mouseY < 250
  ) {
    state = level;
  }
  //select Level 1
  if (
    state === level &&
    mouseX > 300 &&
    mouseX < 400 &&
    mouseY > 140 &&
    mouseY < 190
  ) {
    selectetLevel = 1;
    console.log("Level 1");
  }
  //select Level 2
  if (
    state === level &&
    mouseX > 300 &&
    mouseX < 400 &&
    mouseY > 200 &&
    mouseY < 250
  ) {
    selectetLevel = 2;
    console.log("Level 2");
  }
  //select Level 3
  if (
    state === level &&
    mouseX > 300 &&
    mouseX < 400 &&
    mouseY > 260 &&
    mouseY < 310
  ) {
    selectetLevel = 3;
    console.log("Level 3");
  }
  //back to start
  if (
    state === level &&
    mouseX > 500 &&
    mouseX < 550 &&
    mouseY > 100 &&
    mouseY < 125
  ) {
    state = start;
    console.log("back");
  }
  //game over
  //back to start
  if (
    state === gameOver &&
    mouseX > 240 &&
    mouseX < 340 &&
    mouseY > 260 &&
    mouseY < 310
  ) {
    state = start;
    dog.live = 100;
    console.log("back to Menu");
  }
  //restart level
  if (
    state === gameOver &&
    mouseX > 360 &&
    mouseX < 460 &&
    mouseY > 260 &&
    mouseY < 310
  ) {
    state = selectetLevel;
    dog.live = 100;
    dog.x = 5;
    console.log("restart level");
  }
}
function draw() {
  clear();
  //Start
  if (state === start) {
    start();
  }
  //Level selection
  if (state === level) {
    level();
  }

  if (dog.live <= 0) {
    state = gameOver;
  }

  if (dog.x >= haus.x && gamestate === 3) {
    state = won;
  }

  //Level 1
  if (state === 1 && gamestate === 1) {
    ground();
    holes();
    trees();
    shrubbery();
    player();
    enemy1();
    liveBox();
    live();
    points();

    hit();
    move();
  }
  if (state === 1 && gamestate === 2) {
    trees();
    player();
    enemy2();
    liveBox();
    live();
    points();
    ground();
    hit();
    move();
  }
  if (state === 1 && gamestate === 3) {
    dogHaus();
    trees();
    player();
    liveBox();
    live();
    points();
    ground();
    hit();
    move();
  }
  if (state === gameOver) {
    gameOver();
  }
  if (state === won) {
    gameWon();
  }

  image(dog_sprite, 0, 0, 50, 30, 0, 0, 800, 800);

  // //all state
  // // start();
  // // level();

  // //Level 1
  // player();
  // enemy1();
  // liveBox();
  // live();
  // ground();
  // hit();
  // move();

  //enemy2();
}
