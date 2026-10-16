let leaves = [];
let maxDepth = 11;
let lenRatio = 0.68;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(210, 20, 8);
  translate(width / 2, height * 0.95);

  let sway = sin(frameCount * 0.015) * 0.12;
  branch(height * 0.22, 0, sway, 0);

  // update and draw falling leaves
  for (let i = leaves.length - 1; i >= 0; i--) {
    let leaf = leaves[i];
    leaf.x += leaf.vx;
    leaf.y += leaf.vy;
    leaf.vy += 0.02;
    leaf.angle += leaf.spin;
    fill(leaf.hue, 70, 80, 0.8);
    noStroke();
    push();
    translate(leaf.x, leaf.y);
    rotate(leaf.angle);
    ellipse(0, 0, leaf.size, leaf.size * 0.6);
    pop();
    if (leaf.y > height * 1.1) leaves.splice(i, 1);
  }
}

function branch(len, depth, sway, baseAngle) {
  if (len < 3 || depth > maxDepth) {
    // spawn a leaf occasionally
    if (random() < 0.08 && leaves.length < 80) {
      leaves.push({
        x: 0,
        y: 0,
        vx: random(-0.5, 0.5),
        vy: random(0.3, 1.2),
        angle: random(TWO_PI),
        spin: random(-0.05, 0.05),
        size: random(4, 9),
        hue: random(80, 140)
      });
    }
    return;
  }

  let hue = map(depth, 0, maxDepth, 100, 30);
  stroke(hue, 60, 70);
  strokeWeight(map(depth, 0, maxDepth, 6, 0.8));

  line(0, 0, 0, -len);
  translate(0, -len);

  let angle1 = 0.45 + sway + sin(depth + frameCount * 0.01) * 0.05;
  let angle2 = -0.45 + sway + cos(depth + frameCount * 0.01) * 0.05;

  push();
  rotate(angle1);
  branch(len * lenRatio * random(0.95, 1.05), depth + 1, sway * 0.9, baseAngle + angle1);
  pop();

  push();
  rotate(angle2);
  branch(len * lenRatio * random(0.95, 1.05), depth + 1, sway * 0.9, baseAngle + angle2);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}