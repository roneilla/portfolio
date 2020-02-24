// Original code: Wavemaker
// Contributed by Aatish Bhatia, inspired by Orbiters by Dave Whyte.
// https://p5js.org/examples/interaction-wavemaker.html

let t = 0; // time variable
let c = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();

}

function draw() {
    colorMode(RGB);

    background(0);
    colorMode(HSL, 360);

    for (let x = 0; x <= width; x = x + 20) {
        for (let y = 0; y <= height; y = y + 20) {

            const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
            const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
            
            const angle = xAngle * (x / width) + yAngle * (y / height);

            const myX = x + 200 * cos(2 * PI * t + angle);
            const myY = y + 200 * sin(2 * PI * t + angle);

            c = map(x, 0, width, 0, 360);
            
            fill(c,255,255);
            
            ellipse(myX, myY, 4);
        }
    }

    t = t + 0.005;

}
