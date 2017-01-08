"use strict";

// Array containing all the bubbles currently on screen.
const bubbles = [];

// Global state variables.
let rainingMode = false;
let textIsShowing = true;

function setup() {
  createCanvas(800, 480);
  background(0);

  frameRate(50);
}

function draw() {
  background(0);

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].update();

    if (bubbles[i].isFaded()) {
      bubbles.splice(i--, 1);
    }
  }

  if (rainingMode) {
    // Create a randomly positioned bubble.
    const x = random(0, width);
    const y = random(0, height);
    bubbles.push(new Bubble(x, y));
  } else if (mouseIsPressed) {
    // Works only with raining mode off.
    bubbles.push(new Bubble(mouseX, mouseY));
  }

  if (textIsShowing) {
    showText();
  }

  print("#\ttext: " + textIsShowing + "\t\training: " + rainingMode);
}

function keyPressed() {
  switch (keyCode) {

    case ' '.charCodeAt(): {
      for (let i = 0; i < bubbles.length; i++) {
        if (bubbles[i].lifespan > 40) {
          bubbles[i].lifespan = 40;
        }
      }
      break;
    }

    case 'X'.charCodeAt(): {
      Bubble.toggleVibration();
      break;
    }

    case 'M'.charCodeAt(): {
      Bubble.toggleColorGenerationMode();
      break;
    }

    case 'L'.charCodeAt(): {
      const old = textIsShowing;
      textIsShowing = !textIsShowing;
      print("*L\ttext: " + textIsShowing + "\t\training: " + rainingMode);
      break;
    }

    case 'R'.charCodeAt(): {
      const old = rainingMode;
      rainingMode = !rainingMode;
      print("*R\ttext: " + textIsShowing + "\t\training: " + rainingMode);
      break;
    }

    case UP_ARROW: {
      Bubble.increaseVibrationStep();
      break;
    }

    case DOWN_ARROW: {
      Bubble.decreaseVibrationStep();
      break;
    }

  }
}

// Alternative for UP_ARROW and DOWN_ARROW.
function mouseWheel(event) {
  // Only works if vibration is on.
  if (Bubble.vibration) {
    if (event.delta > 0) {
      // Scrolled down.
      Bubble.decreaseVibrationStep();
    } else {
      // Scrolled up.
      Bubble.increaseVibrationStep();
    }
  }
}

// Show text layers.
function showText() {
  fill(255);
  stroke(0);
  textSize(12);

  showTextLegend(); // Upper-left.
  showTextVibration(); // Upper-right.
  showTextBubbleInfo(); // Bottom-left.

  function showTextLegend() {
    const keys = [
      ["Place a bubble", "LMB"],
      ["Toggle vibration", "X"],
      ["Toggle colour mode", "M"],
      ["Increase vibration", "Wheel Up, \u2191"],
      ["Decrease vibration", "Wheel Down, \u2193"],
      ["Toggle raining mode", "R"],
      ["Show or hide text", "L"],
      ["Clear all bubbles", "Spacebar"]
    ];

    const lineHeight = 17;

    for (let i = 0; i < keys.length; i++) {
      textAlign(RIGHT);
      text(keys[i][0], 120, 20 + i*lineHeight);
      textAlign(LEFT);
      text(keys[i][1], 130, 20 + i*lineHeight);
    }
  }

  function showTextVibration() {
    const state = Bubble.vibration ? Bubble.vibrationStep.toString() : "off";
    text("Vibration: " + state, width - 80, 20);
  }

  function showTextBubbleInfo() {
    let bubbleCountText = "Bubble count: " + bubbles.length.toString();
    bubbleCountText += ", new bubbles' colour depends on " + Bubble.colorGenerationMode + ".";
    text(bubbleCountText, 10, height - 10);
  }
}
