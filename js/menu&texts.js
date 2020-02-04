//canvas
let state = 0;
let level = {
  page: []
};
let page = {};
let pageNow = 0;

function drawLife() {
  fill(0, 0, 0);
  textSize(15);
  text("Life:" + dog.life, 50, 50);

  if (dog.life <= 0) {
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
  fill(0, 0, 0);
  textSize(15);
  text("back to Menu", 247, 290);
  if (pageNow != 14) {
    fill(100, 100, 100);
    rect(360, 260, 100, 50);
    fill(0, 0, 0);
    textSize(15);
    text("next level", 380, 290);
  }
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
  if (state === 4) {
    fill(0, 0, 0);
  } else {
    fill(250, 250, 250);
  }
  text("Level:" + number, 550, 50);
}
//text
function spawnExplained1(cx, cy) {
  let explained1 = {
    x: cx,
    y: cy
  };
  return explained1;
}
function drawExplained1(explained1) {
  fill(0, 0, 0);
  textSize(12);
  text("jump with", explained1.x, explained1.y);
  text("you walk with", explained1.x, explained1.y + 17);
  text("and pee with", explained1.x, explained1.y + 34);
  image(upArrow, explained1.x + 100, explained1.y - 12, 15, 15, 0, 0, 50, 50);
  image(rightArrow, explained1.x + 120, explained1.y + 5, 15, 15, 0, 0, 50, 50);
  image(leftArrow, explained1.x + 80, explained1.y + 5, 15, 15, 0, 0, 50, 50);
  image(downArrow, explained1.x + 100, explained1.y + 21, 15, 15, 0, 0, 50, 50);
  text(
    "the cube gives you 10 extra lifes",
    explained1.x - 70,
    explained1.y + 120
  );
  text(
    "if you pee against a tree you get a point",
    explained1.x + 70,
    explained1.y + 150
  );
  text("you can jump on the shrub", explained1.x + 250, explained1.y + 180);
  text("don't fall in the hole", explained1.x + 330, explained1.y + 200);
}
function spawnExplained2(cx, cy) {
  let explained2 = {
    x: cx,
    y: cy
  };
  return explained2;
}

function drawExplained2(explained2) {
  fill(0, 0, 0);
  textSize(12);
  text(
    "if you touch the cat your life is going down",
    explained2.x,
    explained2.y
  );
  text(
    "don't touch the human he will catch you",
    explained2.x + 300,
    explained2.y
  );
}
function spawnExplained3(cx, cy) {
  let explained3 = {
    x: cx,
    y: cy
  };
  return explained3;
}
function drawExplained3(explained3) {
  fill(0, 0, 0);
  textSize(12);
  text(
    "walk into the dog house to finish this level",
    explained3.x,
    explained3.y
  );
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
    dog.fall = false;
    for (let j in level.page) {
      for (let i in level.page[j].trees) {
        if (level.page[j].trees[i].hit === true) {
          level.page[j].trees[i].hit = false;
        }
      }
      for (let i in level.page[j].lifeBox) {
        if (level.page[j].lifeBox[i].hit === true) {
          level.page[j].lifeBox[i].hit = false;
        }
      }
    }

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
  }
  //game over
  //back to Menu
  if (
    state === 2 &&
    mouseX > 240 &&
    mouseX < 340 &&
    mouseY > 260 &&
    mouseY < 310
  ) {
    state = 0;
    dog.life = 20;
    dog.points = 0;
    dog.x = 0;
    dog.y = 465;
    if (pageNow <= 2) {
      pageNow = 0;
      switchPage(pageNow);
    } else if (pageNow >= 3 && pageNow <= 8) {
      pageNow = 3;
      switchPage(pageNow);
    } else if (pageNow >= 9 && pageNow <= 14) {
      pageNow = 9;
      switchPage(pageNow);
    }
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
    dog.life = 20;
    dog.x = 0;
    dog.fall = false;
    for (let j in level.page) {
      for (let i in level.page[j].trees) {
        if (level.page[j].trees[i].hit === true) {
          level.page[j].trees[i].hit = false;
        }
      }
      for (let i in level.page[j].lifeBox) {
        if (level.page[j].lifeBox[i].hit === true) {
          level.page[j].lifeBox[i].hit = false;
        }
      }
    }

    if (pageNow <= 2) {
      pageNow = 0;
      switchPage(pageNow);
    } else if (pageNow >= 3 && pageNow <= 8) {
      pageNow = 3;
      switchPage(pageNow);
    } else if (pageNow >= 9 && pageNow <= 14) {
      pageNow = 9;
      switchPage(pageNow);
    }
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
  //back to Menu
  if (
    state === 3 &&
    mouseX > 240 &&
    mouseX < 340 &&
    mouseY > 260 &&
    mouseY < 310
  ) {
    state = 0;
    dog.life = 20;
    dog.points = 0;
    if (pageNow <= 2) {
      pageNow = 0;
      switchPage(pageNow);
    } else if (pageNow >= 3 && pageNow <= 8) {
      pageNow = 3;
      switchPage(pageNow);
    } else if (pageNow >= 9 && pageNow <= 14) {
      pageNow = 9;
      switchPage(pageNow);
    }
  }
  //next level
  if (
    state === 3 &&
    mouseX > 360 &&
    mouseX < 460 &&
    mouseY > 260 &&
    mouseY < 310 &&
    pageNow != 14
  ) {
    state = 4;
    dog.x = 0;
    pageNow += 1;
    switchPage(pageNow);
  }
}
