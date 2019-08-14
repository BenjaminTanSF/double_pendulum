let textColor = "#469aaa";
// rgb(70,154,170)

// Initial pendulum properties
let limb1 = 150;
let limb2 = 150;
let mass1 = 80;
let mass2 = 20;
let angle1 = 0;
let angle2 = 0;
let angle1Vel = 0;
let angle2Vel = 0;
let g = 1.0;
let ballDiameter = 10;
let dampening = 0.9999;

// position points
let x1;
let y1;
let x2;
let y2;
let prevx2 = 0;
let prevy2 = 0;
let cx, cy;

// sliders
let limb1Slider;
let limb2Slider;
let mass1Slider;
let mass2Slider;
let dampeningSlider;
let gravitySlider;

// tracking movement
let buffer;

function setup() {
  document.body.style.background = color(0, 40, 90);

  // make canvas fill the window
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  colorMode(RGB, 255, 255, 255, 1);
  pixelDensity(1);

  // default angles & position
  angle1 = PI / 2;
  angle2 = PI / 4;
  cx = width / 2;
  cy = height / 3;

  // create sliders
  limb1Slider = createSlider(10, (width / 3), limb1);
  limb1Slider.position(50, 50);

  limb2Slider = createSlider(10, (width / 3), limb2);
  limb2Slider.position(limb1Slider.x, (limb1Slider.y + limb1Slider.height + 10));

  mass1Slider = createSlider(1, 500, mass1, 1);
  mass1Slider.position(limb2Slider.x, (limb2Slider.y + limb2Slider.height + 10));

  mass2Slider = createSlider(1, 500, mass2, 1);
  mass2Slider.position(mass1Slider.x, (mass1Slider.y + mass1Slider.height + 10));

  gravitySlider = createSlider(0, 20, g, 0.1);
  gravitySlider.position(mass2Slider.x, (mass2Slider.y + mass2Slider.height + 10));

  dampeningSlider = createSlider(9750, 9999, (dampening * 10000));
  dampeningSlider.position(gravitySlider.x, (gravitySlider.y + gravitySlider.height + 10));

  // create buffer
  buffer = createGraphics(width, height);
  buffer.background(color(0, 40, 90));
  buffer.translate(cx, cy);
}

function draw() {
  // setup coloring
  background(color(0, 40, 90));
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  // set pendulum values from sliders
  limb1 = limb1Slider.value();
  limb2 = limb2Slider.value();
  mass1 = mass1Slider.value();
  mass2 = mass2Slider.value();
  g = gravitySlider.value();
  dampening = (dampeningSlider.value() / 10000);

  // add text besides sliders
  let fontSize = 12;
  strokeWeight(0);
  fill(color(70, 154, 170, 0.9));
  textSize(fontSize);
  text("Limb 1 Length: " + limb1, (limb1Slider.x + limb1Slider.width + 15), (limb1Slider.y + (limb1Slider.height / 2) + (fontSize / 2)));
  text("Limb 2 Length: " + limb2, (limb2Slider.x + limb2Slider.width + 15), (limb2Slider.y + (limb2Slider.height / 2) + (fontSize / 2)));
  text("Mass 1: " + mass1, (mass1Slider.x + mass1Slider.width + 15), (mass1Slider.y + (mass1Slider.height / 2) + (fontSize / 2)));
  text("Mass 2: " + mass2, (mass2Slider.x + mass2Slider.width + 15), (mass2Slider.y + (mass2Slider.height / 2) + (fontSize / 2)));
  text("Gravity: " + g, (gravitySlider.x + gravitySlider.width + 15), (gravitySlider.y + (gravitySlider.height / 2) + (fontSize / 2)));
  text("Dampening: " + `${dampening * 100} %`, (dampeningSlider.x + dampeningSlider.width + 15), (dampeningSlider.y + (dampeningSlider.height / 2) + (fontSize / 2)));

  // calculate angles
  let angle1Acc = (-g * (2 * mass1 + mass2) * sin(angle1) + -mass2 * g * sin(angle1 - 2 * angle2) + -2 * sin(angle1 - angle2) * mass2 * angle2Vel * angle2Vel * limb2 + angle1Vel * angle1Vel * limb1 * cos(angle1 - angle2)) / (limb1 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2)));

  let angle2Acc = (2 * sin(angle1 - angle2) * (angle1Vel * angle1Vel * limb1 * (mass1 + mass2) + g * (mass1 + mass2) * cos(angle1) + angle2Vel * angle2Vel * limb2 * mass2 * cos(angle1 - angle2))) / (limb2 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2)));

  // calculate ball locations
  x1 = limb1 * sin(angle1);
  y1 = limb1 * cos(angle1);

  x2 = x1 + limb2 * sin(angle2);
  y2 = y1 + limb2 * cos(angle2);

  // line stylings
  translate(cx, cy);
  stroke(color(229, 252, 255, 0.3));
  strokeWeight(1);

  line(0, 0, x1, y1);
  fill(color(229, 252, 255, 0.3));
  ellipse(x1, y1, ballDiameter, ballDiameter);

  line(x1, y1, x2, y2);
  fill(color(229, 252, 255, 0.3));
  ellipse(x2, y2, ballDiameter, ballDiameter);

  // receive forces
  angle1Vel += angle1Acc;
  angle2Vel += angle2Acc;
  angle1 += angle1Vel;
  angle2 += angle2Vel;

  // dampening velocity
  angle1Vel *= dampening;
  angle2Vel *= dampening;

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