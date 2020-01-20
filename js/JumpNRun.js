// function move basiert auf code von Frank Poth
// https://github.com/frankarendpoth/frankarendpoth.github.io/blob/master/content/pop-vlog/javascript/2017/009-control/control.js

//Player
var dog = {
  x: 0,
  y: 465,
  sx: 37,
  sy: 35,
  picX: 0,
  picY: 0,
  t: 0,
  live: 100,
  points: 0,
  x_velocity: 0,
  y_velocity: 0,
  jumping: false,
  fall: false,
  peeing: false,
  walking: false,
  direction: 1
};
// let dogStanding = [];

function drawPlayer() {
  //rect(dog.x, dog.y, dog.sx, dog.sy);
  if (dog.peeing === true) {
    dog.picX = 800;
    dog.picY = 1600;
    if (dog.t > 10) {
      dog.picX = 0;
      dog.picY = 1600;
      if (dog.t > 20) dog.t = 0;
    }
  } else if (dog.jumping === true) {
    dog.picX = 0;
    dog.picY = 800;
  } else if (dog.y_velocity > 0 && dog.jumping === false) {
    dog.picX = 800;
    dog.picY = 800;
  } else if (dog.walking === true) {
    dog.picX = 800;
    dog.picY = 0;
    if (dog.t > 5) {
      dog.picX = 1610;
      dog.picY = 0;
      if (dog.t > 10) dog.t = 0;
    }
  } else {
    dog.t++;
    dog.picX = 0;
    dog.picY = 0;
    if (dog.t > 10) {
      dog.picX = 805;
      dog.picY = 0;
      if (dog.t > 20) dog.t = 0;
    }
  }
  if (dog.direction === 0) {
    image(
      dog_spriteL,
      dog.x - 9,
      dog.y - 8,
      50,
      45,
      dog.picX,
      dog.picY,
      800,
      800
    );
  } else {
    image(
      dog_spriteR,
      dog.x - 13,
      dog.y - 8,
      50,
      45,
      dog.picX,
      dog.picY,
      800,
      800
    );
  }
}

function movePlayer() {
  if (keyIsDown(UP_ARROW) && dog.jumping === false) {
    dog.y_velocity -= 25;
    dog.jumping = true;
  }

  if (keyIsDown(LEFT_ARROW)) {
    dog.x_velocity -= 0.5;
    dog.walking = true;
    dog.direction = 0;
    dog.t++;
  } else if (keyIsDown(RIGHT_ARROW)) {
    dog.x_velocity += 0.5;
    dog.walking = true;
    dog.direction = 1;
    dog.t++;
  } else {
    dog.walking = false;
  }
  if (keyIsDown(DOWN_ARROW)) {
    dog.peeing = true;
    dog.t++;
  } else {
    dog.peeing = false;
  }
  dog.y_velocity += 1.5; // gravity
  for (var i in page.shrubbery) {
    if (colision(dog, page.shrubbery[i])) {
      dog.x_velocity = 0;
      dog.t++;
    } else {
      dog.y += dog.y_velocity;
      if (colision(dog, page.shrubbery[i])) {
        dog.y_velocity = 0;
        dog.jumping = false;
        dog.y = page.shrubbery[i].y - dog.sy - 1;
      } else {
        dog.y -= dog.y_velocity;
      }
    }
  }

  dog.x += dog.x_velocity;
  dog.y += dog.y_velocity;
  dog.x_velocity *= 0.9; // friction
  dog.y_velocity *= 0.9; // friction

  // if dog is falling below floor line
  for (let i in page.holes) {
    if (
      dog.x >= page.holes[i].x &&
      dog.x + dog.sx <= page.holes[i].x + page.holes[i].sx
    ) {
      dog.fall = true;
    } else {
      dog.fall = false;
    }
  }
  if (dog.y > 465 && dog.fall === false) {
    dog.jumping = false;
    dog.y = 465;
    dog.y_velocity = 0;
  }

  if (dog.y > 600) {
    state = 2;
  }

  //if dog is leaving canvas
  if (dog.x > 640) {
    dog.x = 0;
    pageNow += 1;
    switchPage(pageNow);
  } else if (dog.x < -1 && pageNow >= 1) {
    if (pageNow != 0 && pageNow != 3 && pageNow != 9) {
      dog.x = 630;
      pageNow -= 1;
      switchPage(pageNow);
    }
  }
  if (dog.x <= 0 && (pageNow === 0 || pageNow === 3 || pageNow === 9)) {
    dog.x = 0;
  }
}

//Cats
function spawnCat(cx, cy, sp) {
  let cat = {
    startX: cx,
    x: cx,
    y: cy,
    picX: 0,
    picY: 0,
    speed: sp,
    direction: 1,
    sx: 30,
    sy: 28,
    dx: 400,
    t: 0,
    walking: false,
    attacking: false
  };
  return cat;
}
function drawCat(cat) {
  // rect(cat.x, cat.y, cat.sx, cat.sy);
  if (cat.walking === true) {
    cat.picX = 0;
    cat.picY = 0;
    if (cat.t > 7) {
      cat.picX = 1610;
      cat.picY = 0;
      if (cat.t > 14) cat.t = 0;
    }
  }
  if (cat.direction === 1) {
    image(
      cat_spriteR,
      cat.x - 18,
      cat.y - 16,
      50,
      45,
      cat.picX,
      cat.picY,
      800,
      800
    );
  } else {
    image(
      cat_spriteL,
      cat.x - 18,
      cat.y - 16,
      50,
      45,
      cat.picX,
      cat.picY,
      800,
      800
    );
  }
}
function moveCat(cat) {
  for (let i in page.shrubbery) {
    if (colision(cat, page.shrubbery[i])) {
      cat.direction = cat.direction * -1;
    }
  }
  for (let i in page.holes) {
    if (
      cat.x + cat.sx >= page.holes[i].x &&
      cat.x <= page.holes[i].x + page.holes[i].sx
    ) {
      cat.direction = cat.direction * -1;
    }
  }
  if (
    (cat.x < cat.dx && cat.direction === 1) ||
    (cat.direction === -1 && cat.x > 0)
  ) {
    let sp = cat.speed * cat.direction;
    cat.x = cat.x + sp;
    cat.walking = true;
    cat.t++;
  } else {
    cat.direction = cat.direction * -1;
    cat.walking = true;
    cat.t++;
  }
}

//Humans
function spawnHuman(cx, cy, sp) {
  var human = {
    startX: cx,
    x: cx,
    y: cy,
    picX: 0,
    picY: 0,
    speed: sp,
    direction: 1,
    sx: 30,
    sy: 67,
    dx: 600,
    t: 0,
    walking: false
  };
  return human;
}
function drawHuman(human) {
  // rect(human.x, human.y, human.sx, human.sy);
  if (human.walking === true) {
    human.picX = 865;
    human.picY = 0;
    if (human.t > 5 && human.t < 6) {
      human.picX = 450;
      human.picY = 0;
    } else if (human.t >= 6 && human.t < 11) {
      human.picX = 1350;
      human.picY = 0;
    } else if (human.t >= 11) {
      human.picX = 450;
      human.picY = 0;
      if (human.t > 12) human.t = 0;
    }
  }
  if (human.direction === 1) {
    image(
      human_spriteR,
      human.x,
      human.y,
      35,
      80,
      human.picX,
      human.picY,
      430,
      1300
    );
  } else {
    image(
      human_spriteL,
      human.x,
      human.y,
      35,
      80,
      human.picX,
      human.picY,
      430,
      1300
    );
  }
}
function moveHuman(human) {
  for (let i in page.shrubbery) {
    if (colision(human, page.shrubbery[i])) {
      human.direction = human.direction * -1;
    }
  }
  for (let i in page.holes) {
    if (
      human.x + human.sx >= page.holes[i].x &&
      human.x <= page.holes[i].x + page.holes[i].sx
    ) {
      human.direction = human.direction * -1;
    }
  }
  if (
    (human.x < human.dx && human.direction === 1) ||
    (human.direction === -1 && human.x > 0)
  ) {
    let sp = human.speed * human.direction;
    human.x = human.x + sp;
    human.walking = true;
    human.t++;
  } else {
    human.direction = human.direction * -1;
    human.walking = true;
    human.t++;
  }
}

//Trees
function spawnTree(cx, cy, h) {
  var tree = {
    x: cx,
    y: cy,
    sx: 60,
    sy: 125,
    hit: h
  };
  return tree;
}
function drawTree(tree) {
  //rect(tree.x, tree.y, tree.sx, tree.sy);
  image(treePNG, tree.x - 15, tree.y - 8, 220, 300, 20, 90, 800, 800);
}

//Scrubbery
function spawnShrub(cx, cy) {
  var shrub = {
    x: cx,
    y: cy,
    sx: 48,
    sy: 50
  };
  return shrub;
}
function drawShrub(shrub) {
  //rect(shrub.x, shrub.y, shrub.sx, shrub.sy);
  image(shrubPNG, shrub.x - 2, shrub.y - 8, 220, 300, 70, 140, 800, 800);
}

//hole
function spawnHole(cx, cy) {
  var hole = {
    x: cx,
    y: cy,
    sx: 70,
    sy: 150
  };
  return hole;
}
function drawHole(hole) {
  rect(hole.x, hole.y, hole.sx, hole.sy);
  image(holePNG, hole.x, hole.y, hole.sx, hole.sy, 0, 0, 800, 800);
}

//live Box
function spawnLiveBox(cx, cy, h) {
  let box = {
    x: cx,
    y: cy,
    sx: 20,
    sy: 20,
    hit: h
  };
  return box;
}
function drawLiveBox(box) {
  //rect(box.x, box.y, box.sx, box.sy);
  image(liveBoxPNG, box.x, box.y, 21, 21, 0, 0, 21, 21);
}

//doghouse
function spawnDoghouse(cx, cy) {
  let house = {
    x: cx,
    y: cy,
    sx: 74,
    sy: 72
  };
  return house;
}
function drawDoghouse(house) {
  //rect(house.x, house.y, house.sx, house.sy);
  image(doghousePNG, house.x - 1, house.y, 220, 300, 65, 130, 800, 800);
}

//text
function explained(cx, xy) {
  fill(0, 0, 0);
  text("you walk and jump with the arrows", cx, cy);
}

//colision
function hit() {
  for (var i in page.cats) {
    if (colision(dog, page.cats[i]) === true) {
      dog.live -= 1;
    }
  }
  for (var b in page.liveBox) {
    if (colision(page.liveBox[b], dog) === true) {
      dog.live += 1;
    }
  }

  for (var j in page.humans) {
    if (colision(dog, page.humans[j]) === true) {
      state = 2;
    }
  }

  for (var t in page.trees) {
    if (colision(dog, page.trees[t]) === true && dog.peeing === true) {
      dog.points += 1;
      dog.peeing = false;
    }
  }
  for (let i in page.doghouse) {
    if (
      colision(dog, page.doghouse[i]) === true &&
      dog.x + 20 >= page.doghouse[i].x
    ) {
      state = 3;
    }
  }
}
function colision(obj1, obj2) {
  if (
    (obj1.x >= obj2.x &&
      obj1.x <= obj2.x + obj2.sx &&
      obj1.y >= obj2.y &&
      obj1.y <= obj2.y + obj2.sy) ||
    (obj1.x + obj1.sx >= obj2.x &&
      obj1.x + obj1.sx <= obj2.x + obj2.sx &&
      obj1.y >= obj2.y &&
      obj1.y <= obj2.y + obj2.sy) ||
    (obj1.x + obj1.sx >= obj2.x &&
      obj1.x + obj1.sx <= obj2.x + obj2.sx &&
      obj1.y + obj1.sy >= obj2.y &&
      obj1.y + obj1.sy <= obj2.y + obj2.sy) ||
    (obj1.x >= obj2.x &&
      obj1.x <= obj2.x + obj2.sx &&
      obj1.y + obj1.sy >= obj2.y &&
      obj1.y + obj1.sy <= obj2.y + obj2.sy)
  ) {
    return true;
  }
  return false;
}

//canvas
let state = 0;
let level = {
  page: []
};
let page = {};
let pageNow = 0;

function drawLive() {
  fill(0, 0, 0);
  textSize(15);
  text("Live:" + dog.live, 50, 50);

  if (dog.live <= 0) {
    state = 2;
  }
}
function drawPoints() {
  fill(0, 0, 0);
  textSize(15);
  text("Points:" + dog.points, 50, 70);
}

function start() {
  fill(100, 100, 100);
  rect(200, 200, 100, 50);
  rect(400, 200, 100, 50);
  fill(0, 0, 0);
  textSize(15);
  text("Start Game", 215, 230);
  text("Select Level", 410, 230);
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
  text("back", 510, 118);
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
  fill(200, 200, 200);
  textSize(30);
  text("Game Won", 270, 250);
  fill(100, 100, 100);
  rect(240, 260, 100, 50);
  rect(360, 260, 100, 50);
  fill(0, 0, 0);
  textSize(15);
  text("back to Menu", 247, 290);
  text("next level", 380, 290);
}
function drawLevelNr() {
  let number;
  if (pageNow <= 2) {
    number = 1;
  } else if (pageNow >= 3 && pageNow <= 8) {
    number = 2;
  } else if (pageNow >= 9) {
    number = 3;
  }
  text("Level:" + number, 550, 50);
}

function mousePressed() {
  //Start Game
  if (
    state === 0 &&
    mouseX > 200 &&
    mouseX < 300 &&
    mouseY > 200 &&
    mouseY < 250
  ) {
    state = 4;
    dog.x = 0;
    switchPage(pageNow);
  }
  //Level selection menu
  if (
    state === 0 &&
    mouseX > 400 &&
    mouseX < 500 &&
    mouseY > 200 &&
    mouseY < 250
  ) {
    state = 1;
  }
  //select Level 1
  if (
    state === 1 &&
    mouseX > 300 &&
    mouseX < 400 &&
    mouseY > 140 &&
    mouseY < 190
  ) {
    pageNow = 0;
    console.log("Level 1");
  }
  //select Level 2
  if (
    state === 1 &&
    mouseX > 300 &&
    mouseX < 400 &&
    mouseY > 200 &&
    mouseY < 250
  ) {
    pageNow = 3;
    switchPage(pageNow);
    console.log("Level 2");
  }
  //select Level 3
  if (
    state === 1 &&
    mouseX > 300 &&
    mouseX < 400 &&
    mouseY > 260 &&
    mouseY < 310
  ) {
    pageNow = 9;
    switchPage(pageNow);
    console.log("Level 3");
  }
  //back to start
  if (
    state === 1 &&
    mouseX > 500 &&
    mouseX < 550 &&
    mouseY > 100 &&
    mouseY < 125
  ) {
    state = 0;
    console.log("back");
  }
  //game over
  //back to start
  if (
    state === 2 &&
    mouseX > 240 &&
    mouseX < 340 &&
    mouseY > 260 &&
    mouseY < 310
  ) {
    state = 0;
    dog.live = 100;
    dog.points = 0;
    dog.x = 0;
    if (pageNow <= 3) {
      pageNow = 0;
      switchPage(pageNow);
    } else if (pageNow >= 4 && pageNow <= 8) {
      pageNow = 4;
      switchPage(pageNow);
    } else if (pageNow >= 9 && pageNow <= 14) {
      pageNow = 9;
      switchPage(pageNow);
    }
    console.log("back to Menu");
  }
  //restart level
  if (
    state === 2 &&
    mouseX > 360 &&
    mouseX < 460 &&
    mouseY > 260 &&
    mouseY < 310
  ) {
    state = 4;
    dog.live = 100;
    dog.x = 0;
    if (pageNow <= 2) {
      pageNow = 0;
      switchPage(pageNow);
    } else if (pageNow >= 3 && pageNow <= 8) {
      pageNow = 4;
      switchPage(pageNow);
    } else if (pageNow >= 9 && pageNow <= 14) {
      pageNow = 9;
      switchPage(pageNow);
    }
    console.log("restart level");
  }
  if (
    state === 3 &&
    mouseX > 360 &&
    mouseX < 460 &&
    mouseY > 260 &&
    mouseY < 310
  ) {
  }
  //game Won
  if (
    state === 3 &&
    mouseX > 240 &&
    mouseX < 340 &&
    mouseY > 260 &&
    mouseY < 310
  ) {
    state = 0;
    dog.live = 100;
    dog.points = 0;
    console.log("back to Menu");
  }
  //next level
  if (
    state === 3 &&
    mouseX > 360 &&
    mouseX < 460 &&
    mouseY > 260 &&
    mouseY < 310
  ) {
    state = 4;
    dog.live = 100;
    dog.x = 5;
    pageNow += 1;
    switchPage(pageNow);
    console.log("next level");
  }
}

function createPage(id) {
  page = {
    cats: [],
    humans: [],
    trees: [],
    shrubbery: [],
    holes: [],
    liveBox: [],
    doghouse: []
  };
  switch (id) {
    case 0:
      page.liveBox.push(spawnLiveBox(100, 350));
      page.trees.push(spawnTree(230, 375));
      page.shrubbery.push(spawnShrub(387, 450));
      page.holes.push(spawnHole(440, 500));
      break;
    case 1:
      page.shrubbery.push(spawnShrub(80, 450));
      page.cats.push(spawnCat(200, 472, 2));
      page.shrubbery.push(spawnShrub(230, 450));
      page.shrubbery.push(spawnShrub(380, 450));
      page.humans.push(spawnHuman(500, 433, 1));
      page.shrubbery.push(spawnShrub(530, 450));
      break;
    case 2:
      page.doghouse.push(spawnDoghouse(550, 428));
      break;
    //level 2
    case 3:
      break;

    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      break;
    case 8:
      page.doghouse.push(spawnDoghouse(550, 428));
      break;
    //level 3
    case 9:
      break;
    case 10:
      break;
    case 11:
      break;
    case 12:
      break;
    case 13:
      break;
    case 14:
      page.cats.push(spawnCat(200, 472, 2));
      page.humans.push(spawnHuman(400, 433, 1));
      page.trees.push(spawnTree(450, 375));
      page.holes.push(spawnHole(100, 500));
      page.shrubbery.push(spawnShrub(400, 450));
      page.liveBox.push(spawnLiveBox(100, 355));
      page.doghouse.push(spawnDoghouse(550, 428));
      break;
  }
  level.page.push(page);
}
function drawPage() {
  if (state === 0) {
    start();
  } else if (state === 1) {
    selectLevel();
  } else if (state === 2) {
    gameOver();
  } else if (state === 3) {
    gameWon();
  } else if (state === 4) {
    //sky
    image(backgroundPNG, 0, 0, 650, 650, 0, 0, 800, 800);
    //ground
    //rect(0, 650, 650, 5);
    image(groundPNG, 0, 500, 650, 650, 0, 0, 800, 800);

    for (let i in page.cats) {
      drawCat(page.cats[i]);
    }
    for (let i in page.humans) {
      drawHuman(page.humans[i]);
    }
    for (let i in page.trees) {
      drawTree(page.trees[i]);
    }
    for (let i in page.shrubbery) {
      drawShrub(page.shrubbery[i]);
    }
    for (let i in page.holes) {
      drawHole(page.holes[i]);
    }
    for (let i in page.liveBox) {
      drawLiveBox(page.liveBox[i]);
    }
    for (let i in page.doghouse) {
      drawDoghouse(page.doghouse[i]);
    }

    hit();
    movePlayer();
    drawPlayer();
    drawLive();
    drawPoints();
  }
  drawLevelNr();
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
//level 1
createPage(0);
createPage(1);
createPage(2);
//level 2
createPage(3);
createPage(4);
createPage(5);
createPage(6);
createPage(7);
createPage(8);
//level 3
createPage(9);
createPage(10);
createPage(11);
createPage(12);
createPage(13);
createPage(14);

page = level.page[pageNow];
function draw() {
  clear();

  drawPage();
  updatePage();
}
