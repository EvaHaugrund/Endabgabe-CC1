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
