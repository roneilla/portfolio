let font;
let pts;

let colour;

function preload() {
    font = loadFont('assets/Syne-Bold.ttf');

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    pts = font.textToPoints('RONEILLA', 0, 0, 150, {
        sampleFactor: 0.9,
        simplifyThreshold: 0
    });
    // colorMode(HSB, 360);
}

function ns(x, y, z, scale_, min_, max_) {
    return map(
        noise(x * scale_, y * scale_, z * scale_),
        0, 1, min_, max_);
}

let xz = 0;
let yz = 1000;

let xz2 = 0;
let yz2 = 1000;

let xz3 = 0;
let yz3 = 1000;

function draw() {
    blendMode(BLEND);
    background(0);
    noStroke();
    blendMode(ADD);
    push();
    translate(200, 400);
    for (let i = 0; i < pts.length; i++) {
        let xoff = ns(pts[i].x, pts[i].y, xz, 0.005, -50, 50);
        let yoff = ns(pts[i].y, pts[i].x, yz, 0.005, -50, 50);

        let xoff2 = ns(pts[i].x, pts[i].y, xz2, 0.005, -50, 50);
        let yoff2 = ns(pts[i].y, pts[i].x, yz2, 0.005, -50, 50);

        let xoff3 = ns(pts[i].x, pts[i].y, xz3, 0.005, -50, 50);
        let yoff3 = ns(pts[i].y, pts[i].x, yz3, 0.005, -50, 50);

        //        colour = map(i, 0, pts.length, 0, 360);
        fill(255, 0, 0);
        ellipse(pts[i].x + xoff, pts[i].y + yoff, 5, 5);

        fill(0, 255, 0);
        ellipse(pts[i].x + xoff2, pts[i].y + yoff2, 5, 5);

        fill(0, 0, 255);
        ellipse(pts[i].x + xoff3, pts[i].y + yoff3, 5, 5);
    }
    pop();
    xz += 2;
    yz += 2;
    xz2 += 2.25;
    yz2 += 2.25;
    xz3 += 2.5;
    yz3 += 2.5;
//
//    xz = mouseX + 50;
//    yz = mouseY + 50;
//    xz2 = mouseX + 200;
//    yz2 = mouseY + 200;
//    xz3 = mouseX;
//    yz3 = mouseY;
}
