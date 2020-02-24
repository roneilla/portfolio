let syne;

let points;
let bounds;
let size = 200;

let colour = 0;

var moving = false;

function preload() {
    font = loadFont('../p5-assets/Syne-Bold.ttf');
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    points = font.textToPoints('HELLO', 0, 0, 200, { sampleFactor: 0.1, simplifyThreshold: 0 });
    noStroke();
    fill(0);
    colorMode(HSB, 360);
}

function draw() {
    background(0, 30);
    textSize(size);
    fill(255);
    translate(width / 4, height / 2);
    for (let i = 0; i < points.length; i++) {
        let c = noise(i + frameCount * 0.01) * 255;
        let pt = points[i];
        let nx = noise(i * 10.1 + frameCount * 0.01) * 10 - 5.0;
        let ny = noise(i * 10.2 + frameCount * 0.01) * 10 - 5.0;
        if (mouseIsPressed) { if (moving) { moving = false; } else { moving = true; }
        }
        if (moving) { pt.x += noise(i * 10.1 + frameCount * 0.01) * 2 - 1.0; pt.y += noise(i * 10.2 + frameCount * 0.01) * 2 - 1.0; }
        colour = map(i, 0, points.length, 0, 360);
        fill(colour, 255, 255);
        ellipse(pt.x + nx + random(0, 2.5), pt.y + ny + random(0, 2.5), 5, 5);
    }
}
