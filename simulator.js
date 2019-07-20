let limb1 = 150;
let limb2 = 150;
let mass1 = 20;
let mass2 = 20;
let angle1 = 0;
let angle2 = 0;
let angle1Vel = 0;
let angle2Vel = 0;
let g = 1;

let prevx2 = 0;
let prevy2 = 0;
let cx, cy;

let buffer;

function setup() {
  createCanvas(900, 900);
  colorMode(RGB, 255, 255, 255, 1);
  pixelDensity(1);
  angle1 = PI / 2;
  angle2 = PI / 2;
  cx = width / 2;
  cy = height / 3;
  buffer = createGraphics(width, height);
  buffer.background(color(20, 34, 51));
  buffer.translate(cx, cy);
}

function draw() {
  background(color(20, 34, 51));
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  // let num1 = -g * (2 * mass1 + mass2) * sin(angle1);
  // let num2 = -m2 * g * sin(angle1 - 2 * angle2);
  // let num3 = -2 * sin(angle1 - angle2) * mass2;
  // let num4 = angle2Vel * angle2Vel * limb2 + angle1Vel * angle1Vel * limb1 * cos(angle1 - angle2);
  // let den = limb1 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2));
  let angle1Acc = (-g * (2 * mass1 + mass2) * sin(angle1) + -mass2 * g * sin(angle1 - 2 * angle2) + -2 * sin(angle1 - angle2) * mass2 * angle2Vel * angle2Vel * limb2 + angle1Vel * angle1Vel * limb1 * cos(angle1 - angle2)) / (limb1 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2)));

  // num1 = 2 * sin(angle1 - angle2);
  // num2 = (angle1Vel * angle1Vel * limb1 * (m1 + mass2));
  // num3 = g * (m1 + mass2) * cos(angle1);
  // num4 = angle2Vel * angle2Vel * limb2 * mass2 * cos(angle1 - angle2);
  // den = limb2 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2));
  let angle2Acc = (2 * sin(angle1 - angle2) * (angle1Vel * angle1Vel * limb1 * (mass1 + mass2) + g * (mass1 + mass2) * cos(angle1) + angle2Vel * angle2Vel * limb2 * mass2 * cos(angle1 - angle2))) / (limb2 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2)));


  let x1 = limb1 * sin(angle1);
  let y1 = limb1 * cos(angle1);

  let x2 = x1 + limb2 * sin(angle2);
  let y2 = y1 + limb2 * cos(angle2);

  translate(cx, cy);
  stroke(color(229, 252, 255, 0.3));
  strokeWeight(1);

  line(0, 0, x1, y1);
  fill(color(229, 252, 255, 0.3));
  ellipse(x1, y1, mass1, mass1);

  line(x1, y1, x2, y2);
  fill(color(229, 252, 255, 0.3));
  ellipse(x2, y2, mass2, mass2);

  angle1Vel += angle1Acc;
  angle2Vel += angle2Acc;
  angle1 += angle1Vel;
  angle2 += angle2Vel;

  if (frameCount > 1) {
    const transition = map(x2, (limb1 + limb2) * -1, limb1 + limb2, 0, 1);
    const mixedColor = lerpColor(color(122, 79, 242, 0.7), color(230, 9, 116, 0.7), transition);
    buffer.stroke(mixedColor);
    buffer.strokeWeight(2);
    buffer.line(prevx2, prevy2, x2, y2);
  }

  prevx2 = x2;
  prevy2 = y2;
}