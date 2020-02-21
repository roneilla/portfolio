let font;
var points = [];

var theme = ['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)'];

let message = "RONEILLA\nBUMANLAG"

function preload() {
    font = loadFont('../assets/fonts/RobotoMono-Medium.ttf');
}

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-container');
    textSize(168);
    textFont(font);
    background(0);

    for (var px = 20; px < width - 20; px += 50) {
        for (var py = 20; py < height - 20; py += 50) {
            //  var point = points_array[i];
            var vehicle = new Vehicle(px, py);
            points.push(vehicle);
        }
    }
    frameRate(60);
}

function draw() {
    background(0);

    noStroke();
    fill(255, 90);

    textAlign(CENTER);
    rectMode(CENTER);
    text(message, width / 2, height / 2)

    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        point.update();
        point.behaviors();
        fill(255);
        point.show();
    }

    stroke(255, 50);
    strokeWeight(40);
    noFill();
    rect(width / 2, height / 2, width, height);

}

function Vehicle(x, y) {
    this.pos = createVector(x, y);
    // this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.target = createVector(x, y);
    this.r = 8;
    this.maxspeed = 5;
    this.maxforce = 0.2;

    this.behaviors = function () {
        var arrive = this.arrive(this.target);
        var mouse = createVector(mouseX, mouseY);
        var flee = this.flee(mouse);

        arrive.mult(1);
        flee.mult(10);

        this.applyForce(arrive);
        this.applyForce(flee);
    }

    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.arrive = function (target) {
        var desired = p5.Vector.sub(target, this.pos);
        var distance = desired.mag();
        var speed = this.maxspeed;
        if (distance < 100) {
            speed = map(distance, 0, 100, 0, this.maxspeed);
        }

        desired.setMag(speed);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);

        return steer;
    }

    this.flee = function (target) {
        var desired = p5.Vector.sub(target, this.pos);
        var distance = desired.mag();
        if (distance < 250) {
            desired.setMag(this.maxspeed);
            desired.mult(-1);
            var steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxforce);

            return steer;
        } else {
            return createVector(0, 0);
        }
    }

    this.update = function () {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    this.show = function () {

        //        strokeWeight(10);
        noStroke();

        ellipse(this.pos.x, this.pos.y, 2);

    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
