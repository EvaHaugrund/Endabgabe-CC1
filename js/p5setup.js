function preload() {
  dog_spriteR = loadImage("png/dog-spritesheet.png");
  dog_spriteL = loadImage("png/dog-spritesheet2.png");
  cat_spriteR = loadImage("png/cat-spritesheetR.png");
  cat_spriteL = loadImage("png/cat-spritesheetL.png");
  human_spriteR = loadImage("png/human-spritesheetR.png");
  human_spriteL = loadImage("png/human-spritesheetL.png");
  groundPNG = loadImage("png/ground.png");
  treePNG = loadImage("png/tree.png");

  soundFormats("mp3", "ogg");
  //http://soundbible.com/tags-fireball.html
  // soundFireball = loadSound('Musik/Flame Arrow-SoundBible.com-618067908.mp3');
  // soundTrippelFireball = loadSound("Musik/Catapult-SoundBible.com-829548288.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  //dog_sprite.loadPixels();
}

window.addEventListener("resize", function() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
});

new p5();
var width = windowWidth;
var height = windowHeight;
