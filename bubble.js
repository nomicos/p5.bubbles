"use strict";

// Random movement (aka vibration) mode settings.
Bubble.vibration = true;
Bubble.vibrationStep = 5;

Bubble.toggleVibration = function() {
  Bubble.vibration = !Bubble.vibration;
}
Bubble.increaseVibrationStep = function() {
  if (Bubble.vibrationStep < 40) {
    Bubble.vibrationStep++;
  }
}
Bubble.decreaseVibrationStep = function() {
  if (Bubble.vibrationStep > 1) {
    Bubble.vibrationStep--;
  }
}

// Two modes: 'time' and 'random'.
Bubble.colorGenerationMode = 'time';

Bubble.toggleColorGenerationMode = function() {
  Bubble.colorGenerationMode = (
    Bubble.colorGenerationMode === 'time'
    ? 'random'
    : 'time'
  );
}

// Time of bubble's existence (in frames).
const LIFESPAN_MAX = 200;

function Bubble(x, y) {
  this.x = x;
  this.y = y;
  this.diameter = 20;

  if (Bubble.colorGenerationMode === 'time') {
    // Determined at the time of creation.
    this.fillColor = Math.floor(Date.now() / 100) % 100;
  } else if (Bubble.colorGenerationMode === 'random') {
    // Just a random rainbow-ish color.
    this.fillColor = random(0, 100);
  }

  this.lifespan = LIFESPAN_MAX;

  this.display = function() {
    const colorBrightness = map(this.lifespan, 0, LIFESPAN_MAX, 0, 100);
    const strokeShade = (this.lifespan > 255 ? 255 : this.lifespan);

    // Hue is the "rainbow" component.
    colorMode(HSB, 100);
    fill(this.fillColor, 100, colorBrightness, 60);
    noStroke();
    ellipse(this.x, this.y, this.diameter);
  };

  this.update = function() {
    if (Bubble.vibration) {
      const step = Bubble.vibrationStep;
      this.x += random(-step, step);
      this.y += random(-step, step);
    }

    this.lifespan--;
    this.diameter += 2;
  };

  this.isFaded = function() {
    return this.lifespan < 0;
  };
}
