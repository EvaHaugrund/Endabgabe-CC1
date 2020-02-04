//Trees
function spawnTree(cx, cy) {
  var tree = {
    x: cx,
    y: cy,
    sx: 60,
    sy: 125,
    hit: false
  };
  return tree;
}
function drawTree(tree) {
  //rect(tree.x, tree.y, tree.sx, tree.sy);
  if (tree.hit === true) {
    image(treeWithPeePNG, tree.x - 15, tree.y - 8, 220, 300, 20, 90, 800, 800);
  } else {
    image(treePNG, tree.x - 15, tree.y - 8, 220, 300, 20, 90, 800, 800);
  }
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
//life Box
function spawnLifeBox(cx, cy) {
  let box = {
    x: cx,
    y: cy,
    sx: 20,
    sy: 20,
    hit: false
  };
  return box;
}
function drawLifeBox(box) {
  //rect(box.x, box.y, box.sx, box.sy);
  if (box.hit === false) {
    image(lifeBoxPNG, box.x, box.y, 21, 21, 0, 0, 21, 21);
  } else {
    image(lifeBox2PNG, box.x, box.y, 21, 21, 0, 0, 21, 21);
  }
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
