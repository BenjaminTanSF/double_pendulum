# Double Pendulum Simulator

![GIF](https://github.com/BenjaminT88/double_pendulum/blob/master/assets/images/ezgif.com-video-to-gif.gif?raw=true)

[Live Link](https://benjamintan.dev/double_pendulum/)

## Overview

In physics and mathematics, in the area of dynamical systems, a `double pendulum` is a pendulum with another pendulum attached to its end, and is a simple physical system that exhibits rich dynamic behavior with a strong sensitivity to initial conditions. The motion of a `double pendulum` is governed by a set of coupled ordinary differential equations and is chaotic.

Several variants of the double pendulum may be considered; the two limbs may be of equal or unequal lengths and masses, they may be `simple pendulums` or `compound pendulums`.

[Wikipdeia Page](https://en.wikipedia.org/wiki/Double_pendulum)

## Functionality

* Users are able to define the mass of each pendulum.
* Users can define the length of each limb.
* Users can also see the motion of the double compound pendulum.


### Technologies

This project will be implemented with the following technologies:

* `HTML5 Canvas` for DOM rendering
* `p5.js` for drawing functionality

### Formula Implementation and mass tracking

Although implementing the original formula is fairly straight forward, it is not as easy to track the locations of balls at all times.

![formula](https://github.com/BenjaminT88/double_pendulum/blob/master/assets/images/formula.png?raw=true)

```javascript
angle1Acc = (-g * (2 * mass1 + mass2) * sin(angle1) + -mass2 * g * sin(angle1 - 2 * angle2) + -2 * sin(angle1 - angle2) * mass2 * angle2Vel * angle2Vel * limb2 + angle1Vel * angle1Vel * limb1 * cos(angle1 - angle2)) / (limb1 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2)));

angle2Acc = (2 * sin(angle1 - angle2) * (angle1Vel * angle1Vel * limb1 * (mass1 + mass2) + g * (mass1 + mass2) * cos(angle1) + angle2Vel * angle2Vel * limb2 * mass2 * cos(angle1 - angle2))) / (limb2 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2)));
```

The locations of balls are needed at all times because velocity, acceleration, and angle of force are recalculated constantly.

```javascript
function calculateBallLocations() {
  // ball 1
  x1 = limb1 * sin(angle1);
  y1 = limb1 * cos(angle1);

  // ball 2
  x2 = x1 + limb2 * sin(angle2);
  y2 = y1 + limb2 * cos(angle2);
}
```
