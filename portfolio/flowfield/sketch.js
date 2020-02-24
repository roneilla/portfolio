var scl = 30;
var xvec, yvec;
var noiseInc = .1;
var time = 0;
var particles = [];
var flowfield;

let c = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    for (var i = 0; i < 500; i++) {
        particles[i] = new Particle();
    }


}

function draw() { // Rotating Vectors

  //  background(0, 2);
    FlowField();
// colorMode(HSL, 360);
//    if (c >= 360) {
//        c = 0;
//    } else {
//        c++;
//    }

    stroke(255);

    for (var k = 0; k < particles.length; k++) {
        particles[k].show();
        particles[k].update();
        particles[k].edge();
        particles[k].follow(flowfield);
    }
}

function FlowField() {
    xvec = floor((windowWidth + 50) / scl);
    yvec = floor((windowHeight + 50) / scl);
    flowfield = new Array(xvec * yvec);

    var yNoise = 0;
    for (var y = 0; y < yvec; y++) {
        var xNoise = 0;
        for (var x = 0; x < xvec; x++) {
            var vecDirect = noise(xNoise, yNoise, time) * 2 * (TWO_PI);
            var dir = p5.Vector.fromAngle(vecDirect);
            var index = x + y * xvec;
            flowfield[index] = dir;
            dir.setMag(3);
            xNoise += noiseInc;
            stroke(180);
            push();
            translate(x * scl, y * scl);
            rotate(dir.heading());
           // line(0, 0, scl, 0);
            pop();
        }
        yNoise += noiseInc;
        time += .001;
    }
}

function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 2.0;
    this.maxspeed = 5;
    this.prev = this.pos.copy();


    this.update = function () {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
        this.vel.limit(this.maxspeed);
    }

    this.follow = function (vectors) { // flowfield vectors
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * xvec;
        var force = vectors[index];
        this.applyForce(force);
    }

    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.show = function () {
        //fill(255,0,0,100);
        //        stroke(255);

        strokeWeight(0.2);
        line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);

        this.updatePrev();

    }

    this.updatePrev = function () {
        this.prev.x = this.pos.x;
        this.prev.y = this.pos.y;
    }

    this.edge = function () {
        if (this.pos.x < -this.r) this.pos.x = width + this.r;
        if (this.pos.y < -this.r) this.pos.y = height + this.r;
        if (this.pos.x > width + this.r) this.pos.x = -this.r;
        if (this.pos.y > height + this.r) this.pos.y = -this.r;

        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
