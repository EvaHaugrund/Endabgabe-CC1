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
let dogStanding = [];

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
  if (dog.y > 465 && dog.fall === false) {
    dog.jumping = false;
    dog.y = 465;
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
    picX: 0,
    picY: 0,
    speed: sp,
    direction: 1,
    sx: 30,
    sy: 28,
    dx: 200,
    t: 0,
    walking: false,
    attacking: false
  };
  return cat;
}
function drawCat(cat) {
  //rect(cat.x, cat.y, cat.sx, cat.sy);
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
    x: 100,
    y: cy,
    picX: 0,
    picY: 0,
    speed: sp,
    direction: 1,
    sx: 30,
    sy: 67,
    dx: 200,
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
function spawnTree(cx, cy) {
  var tree = {
    x: cx,
    y: cy,
    sx: 60,
    sy: 125
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
    sx: 50,
    sy: 40
  };
  return shrub;
}
function drawShrub(shrub) {
  rect(shrub.x, shrub.y, shrub.sx, shrub.sy);
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
    humans: [],
    trees: [],
    shrubbery: []
  };
  switch (id) {
    case 0:
      page.shrubbery.push(spawnShrub(400, 400));
      break;
    case 1:
      page.cats.push(spawnCat(200, 472, 1));
      page.cats.push(spawnCat(200, 472, 2));
      page.humans.push(spawnHuman(400, 433, 1));
      page.trees.push(spawnTree(450, 375));

      break;
    case 2:
      page.cats.push(spawnCat(200, 472, 1));
      break;
    case 3:
      break;
  }
  level.page.push(page);
}
function drawPage() {
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
createPage(2);
createPage(3);

page = level.page[pageNow];
function draw() {
  clear();

  drawPage();
  updatePage();
  movePlayer();
  drawPlayer();
}
