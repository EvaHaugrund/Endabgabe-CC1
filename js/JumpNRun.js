//colision
function hit() {
  for (var i in page.cats) {
    if (colision(dog, page.cats[i]) === true) {
      dog.live -= 1;
    }
  }
  for (var b in page.liveBox) {
    if (
      colision(page.liveBox[b], dog) === true &&
      page.liveBox[b].hit === false
    ) {
      dog.live += 10;
      page.liveBox[b].hit = true;
    }
  }

  for (var j in page.humans) {
    if (colision(dog, page.humans[j]) === true) {
      state = 2;
    }
  }

  for (var t in page.trees) {
    if (
      colision(dog, page.trees[t]) === true &&
      dog.peeing === true &&
      page.trees[t].hit === false
    ) {
      dog.points += 1;
      dog.peeing = false;
      page.trees[t].hit = true;
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

function createPage(id) {
  page = {
    cats: [],
    humans: [],
    trees: [],
    shrubbery: [],
    holes: [],
    liveBox: [],
    doghouse: [],
    explanation1: [],
    explanation2: [],
    explanation3: []
  };
  switch (id) {
    case 0:
      page.liveBox.push(spawnLiveBox(100, 350));
      page.trees.push(spawnTree(230, 375));
      page.shrubbery.push(spawnShrub(387, 450));
      page.holes.push(spawnHole(440, 500));
      page.explanation1.push(spawnExplained1(100, 200));
      break;
    case 1:
      page.shrubbery.push(spawnShrub(80, 450));
      page.cats.push(spawnCat(200, 472, 2));
      page.shrubbery.push(spawnShrub(230, 450));
      page.shrubbery.push(spawnShrub(380, 450));
      page.humans.push(spawnHuman(500, 433, 1));
      page.shrubbery.push(spawnShrub(530, 450));
      page.explanation2.push(spawnExplained2(60, 300));
      break;
    case 2:
      page.doghouse.push(spawnDoghouse(550, 428));
      page.explanation3.push(spawnExplained3(200, 300));
      break;
    //level 2
    case 3:
      page.holes.push(spawnHole(100, 500));
      page.trees.push(spawnTree(250, 375));
      page.cats.push(spawnCat(200, 472, 2));
      page.holes.push(spawnHole(380, 500));
      page.shrubbery.push(spawnShrub(450, 450));
      break;
    case 4:
      page.liveBox.push(spawnLiveBox(100, 350));
      page.shrubbery.push(spawnShrub(250, 450));
      page.humans.push(spawnHuman(500, 433, 1));
      break;
    case 5:
      page.trees.push(spawnTree(250, 375));
      break;
    case 6:
      page.holes.push(spawnHole(100, 500));
      page.holes.push(spawnHole(200, 500));
      break;
    case 7:
      page.liveBox.push(spawnLiveBox(100, 350));
      page.trees.push(spawnTree(250, 375));
      break;
    case 8:
      page.cats.push(spawnCat(200, 472, 2));
      page.doghouse.push(spawnDoghouse(550, 428));
      break;
    //level 3
    case 9:
      page.cats.push(spawnCat(200, 472, 2));
      page.shrubbery.push(spawnShrub(300, 450));
      break;
    case 10:
      break;
    case 11:
      break;
    case 12:
      break;
    case 13:
      page.humans.push(spawnHuman(500, 433, 1));
      break;
    case 14:
      page.cats.push(spawnCat(200, 472, 2));
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
    for (let i in page.explanation1) {
      drawExplained1(page.explanation1[i]);
    }
    for (let i in page.explanation2) {
      drawExplained2(page.explanation2[i]);
    }
    for (let i in page.explanation3) {
      drawExplained3(page.explanation3[i]);
    }
    for (let i in page.humans) {
      drawHuman(page.humans[i]);
    }
    for (let i in page.cats) {
      drawCat(page.cats[i]);
    }

    hit();
    movePlayer();
    drawPlayer();
    drawLive();
    drawPoints();
  }
  drawLevelNr();
  noStroke();
  fill(255, 255, 255);
  rect(650, 0, 50, 700);
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
