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
  life: 20,
  points: 0,
  x_velocity: 0,
  y_velocity: 0,
  jumping: false,
  fall: false,
  peeing: false,
  walking: false,
  direction: 1
};

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
    dog.y_velocity -= 35;
    dog.jumping = true;
  }

  if (keyIsDown(LEFT_ARROW)) {
    dog.x_velocity -= 0.7;
    dog.walking = true;
    dog.direction = 0;
    dog.t++;
  } else if (keyIsDown(RIGHT_ARROW)) {
    dog.x_velocity += 0.7;
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
  dog.y_velocity += 1.4; // gravity
  for (var i in page.shrubbery) {
    if (colision(dog, page.shrubbery[i])) {
      dog.x_velocity = 0;
      if (dog.x < page.shrubbery[i].x) {
        dog.x--;
      } else {
        dog.x++;
      }
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
  dog.x_velocity *= 0.8; // friction
  dog.y_velocity *= 0.8; // friction

  // if dog is falling below floor line
  for (let i in page.holes) {
    if (
      dog.x >= page.holes[i].x &&
      dog.x + dog.sx <= page.holes[i].x + page.holes[i].sx &&
      dog.y > 465
    ) {
      dog.fall = true;
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
