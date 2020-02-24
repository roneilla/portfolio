let t = 0; // time variable
let c = 0;

function setup() {
    createCanvas(innerWidth, innerHeight);
    noStroke();
    // colorMode(HSB);
}

function draw() {

    background(25);

    for (let x = 0; x <= width; x = x + 75) {
        for (let y = 0; y <= height; y = y + 75) {

            const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
            const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);

            const angle = xAngle * (x / width) + yAngle * (y / height);

            const myX = x + 40 * cos(2 * PI * t + angle);
            const myY = y + 40 * sin(2 * PI * t + angle);

            stroke(255);
            strokeWeight(0.5);

            line(x, y, myX, myY);

            fill(255);

            ellipse(myX, myY, 2);

            ellipse(x, y, 2);

        }
    }

    t = t + 0.005;

}
