let dog_spriteR;
let dog_spriteL;
let cat_spriteR;
let cat_spriteL;
let human_spriteR;
let human_spriteL;
let backgroundPNG;
let groundPNG;
let treePNG;
let treeWithPeePNG;
let shrubPNG;
let lifeBoxPNG;
let lifeBox2PNG;
let doghousePNG;
let holePNG;
let rightArrow;
let leftArrow;
let upArrow;
let downArrow;

function preload() {
  dog_spriteR = loadImage("png/dog-spritesheet.png");
  dog_spriteL = loadImage("png/dog-spritesheet2.png");
  cat_spriteR = loadImage("png/cat-spritesheetR.png");
  cat_spriteL = loadImage("png/cat-spritesheetL.png");
  human_spriteR = loadImage("png/human-spritesheetR.png");
  human_spriteL = loadImage("png/human-spritesheetL.png");
  backgroundPNG = loadImage("png/background.png");
  groundPNG = loadImage("png/ground.png");
  treePNG = loadImage("png/tree.png");
  treeWithPeePNG = loadImage("png/TreeWithPee.png");
  shrubPNG = loadImage("png/shrub.png");
  lifeBoxPNG = loadImage("png/lifeBox.png");
  lifeBox2PNG = loadImage("png/lifeBox2.png");
  doghousePNG = loadImage("png/doghouse.png");
  holePNG = loadImage("png/hole.png");
  rightArrow = loadImage("png/Right-Arrow.png");
  leftArrow = loadImage("png/Left-Arrow.png");
  upArrow = loadImage("png/Up-Arrow.png");
  downArrow = loadImage("png/Down-Arrow.png");

  soundFormats("mp3", "ogg");
  //http://soundbible.com/tags-fireball.html
  // soundFireball = loadSound('Musik/Flame Arrow-SoundBible.com-618067908.mp3');
  // soundTrippelFireball = loadSound("Musik/Catapult-SoundBible.com-829548288.mp3");
}

function setup() {
  let canvas = createCanvas(650, 600);
  canvas.parent("jumpnrun");
  frameRate(30);
  //dog_sprite.loadPixels();
}

new p5();
