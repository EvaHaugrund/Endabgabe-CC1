function preload() {
  dog_sprite = loadImage("png/dog-spritesheet.png");

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
