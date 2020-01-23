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
