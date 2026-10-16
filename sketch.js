let angle = 0;
let angleOffset = 0.3;
let lenRatio = 0.7;
let maxDepth = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(120, 200, 140);
  strokeWeight(1.5);
}

function draw() {
  background(13, 17, 23);
  translate(width / 2, height);
  angleOffset = 0.25 + 0.15 * sin(frameCount * 0.02);
  branch(height * 0.28, 0);
}

function branch(len, depth) {
  if (len < 4 || depth > maxDepth) return;
  line(0, 0, 0, -len);
  translate(0, -len);
  push();
  rotate(angle + angleOffset);
  branch(len * lenRatio, depth + 1);
  pop();
  push();
  rotate(angle - angleOffset);
  branch(len * lenRatio, depth + 1);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}