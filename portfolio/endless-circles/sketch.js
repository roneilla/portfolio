let circles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    if (frameCount % 30 == 0) {
        circles.push(new Circle());
    }

    for (let i = 0; i < circles.length; i++) {
        circles[i].display();
    }
}

class Circle {
    diam = 0;
    c = 0;

    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.diam = 0;
        this.c = 0;
        colorMode(HSL, 360);

    }

    display() {
        if (this.c >= 360) {
            this.c = 0;
        } else {
            this.c++;
        }

        strokeWeight(50);
        stroke(this.c*2, 255, 255);
        noFill();
        ellipse(mouseX, mouseY, this.diam, this.diam);

        this.diam += 10;
    }

}
