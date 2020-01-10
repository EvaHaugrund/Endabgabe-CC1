// function move basiert auf code von Frank Poth
// https://github.com/frankarendpoth/frankarendpoth.github.io/blob/master/content/pop-vlog/javascript/2017/009-control/control.js

//Player
var dog = {
  x: 5,
  y: 480,
  sx: 25,
  sy: 25,
  live: 100,
  points: 0,
  x_velocity: 0,
  y_velocity: 0,
  jumping: false,
  fall: false,
  peeing: false
};

function player() {
  if (dog.peeing === true) {
    fill(100, 100, 100);
  } else {
    fill("yellow");
  }
  rect(dog.x, dog.y, dog.sx, dog.sy);
  //   image(dog_sprite, dog.x, dog.y, 50, 30, 0, 0, 800, 800);
}
function movePlayer() {
  if (keyIsDown(UP_ARROW) && dog.jumping === false) {
    dog.y_velocity -= 25;
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
  // if (dog.x >= hole.x && dog.x + dog.sx <= hole.x + hole.sx) {
  //   fall = true;
  // } else {
  //   fall = false;
  // }
  if (dog.y > 475 && dog.fall === false) {
    dog.jumping = false;
    dog.y = 475;
    dog.y_velocity = 0;
  }
  // else if (
  //   dog.y + dog.sy >= shrub.y &&
  //   dog.x + dog.sx - 2 >= shrub.x &&
  //   dog.x <= shrub.x + shrub.sx - 2
  // ) {
  //   dog.jumping = false;
  //   dog.y = 440;
  //   dog.y_velocity = 0;
  // }
  // if (dog.y > 600) {
  //   state = gameOver;
  // }

  //if dog is leaving canvas
  if (dog.x > 640) {
    dog.x = 0;
    pageNow += 1;
    switchPage(pageNow);
  } else if (dog.x < -1 && pageNow >= 1) {
    dog.x = 630;
    pageNow -= 1;
    switchPage(pageNow);
  }
  if (dog.x <= 0 && pageNow === 0) {
    dog.x = 0;
  }
}

//Cats
function spawnCat(cx, cy, sp) {
  var cat = {
    startX: cx,
    x: 0,
    y: cy,
    speed: sp,
    direction: 1,
    sx: 15,
    sy: 15,
    dx: 200
  };
  return cat;
}
function drawCat(cat) {
  push();
  fill("red");
  rect(cat.startX + cat.x, cat.y, cat.sx, cat.sy);
  pop();
}
function moveCat(cat) {
  if (
    (cat.x < cat.dx && cat.direction === 1) ||
    (cat.direction === -1 && cat.x > 0)
  ) {
    let sp = cat.speed * cat.direction;
    cat.x = cat.x + sp;
  } else {
    cat.direction = cat.direction * -1;
  }
}

//Humans
function spawnHuman(cx, cy, sp) {
  var human = {
    startX: cx,
    x: 0,
    y: cy,
    speed: sp,
    direction: 1,
    sx: 15,
    sy: 40,
    dx: 200
  };
  return human;
}
function drawHuman(human) {
  push();
  fill("pink");
  rect(human.startX + human.x, human.y, human.sx, human.sy);
  pop();
}
function moveHuman(human) {
  if (
    (human.x < human.dx && human.direction === 1) ||
    (human.direction === -1 && human.x > 0)
  ) {
    let sp = human.speed * human.direction;
    human.x = human.x + sp;
  } else {
    human.direction = human.direction * -1;
  }
}

//Trees
function spawnTree(cx, cy) {
  var tree = {
    x: cx,
    y: cy,
    sx: 20,
    sy: 40,
    dx: 200
  };
  return tree;
}
function drawTree(x, y) {
  push();
  fill("brown");
  rect(x, y, tree.sx, 40);
  pop();
}

//colision
function hit() {
  if (colision(cat, dog) === true && (gameCanvas === 1 || gameCanvas === 3)) {
    dog.live -= 1;
  }
  if (colision(box, dog) === true && lUp === false) {
    dog.live += 1;
    lUp = true;
  }
  if (colision(dog, human) === true && gameCanvas === 2) {
    canvas = gameOver;
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

//canvas
let level = {
  page: []
};
let page = {};
let pageNow = 0;
function start() {
  fill(100, 100, 100);
  rect(200, 200, 100, 50);
  rect(400, 200, 100, 50);
  fill(0, 0, 0);
  textSize(15);
  text("Start Game", 220, 230);
  text("Select Level", 415, 230);
}
function selectLevel() {
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

function createPage(id) {
  page = {
    cats: [],
    humans: []
  };
  switch (id) {
    case 0:
      page.cats.push(spawnCat(200, 485, 1));
      page.cats.push(spawnCat(200, 485, 2));
      page.humans.push(spawnHuman(200, 460, 3));
      break;
    case 1:
      page.cats.push(spawnCat(200, 490, 1));
      break;
  }
  level.page.push(page);
}
function drawPage() {
  //ground
  push();
  fill(200, 200, 200);
  rect(0, 500, 650, 10);
  pop();

  for (let i in page.cats) {
    drawCat(page.cats[i]);
  }
  for (let j in page.humans) {
    drawHuman(page.humans[j]);
  }
}
function updatePage() {
  for (let i = 0; i < page.cats.length; i++) {
    moveCat(page.cats[i]);
  }
  for (let i = 0; i < page.humans.length; i++) {
    moveHuman(page.humans[i]);
  }
}
function switchPage(n) {
  page = level.page[n];
}
createPage(0);
createPage(1);

page = level.page[pageNow];
function draw() {
  clear();
  drawPage();
  updatePage();
  movePlayer();
  player();
}
