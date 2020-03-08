if (!(/iPhone|iPad|iPod|Android|webOS|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent))) {
    let font, pts, colour;
    let textEl = 5;
    var points = [];
    var theme = ['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)'];

    let message = "HELLO";
    let description = "I'm Roneilla, an Interaction Designer based in Toronto.\n\nScroll down to view my work!";
    let currentTime = 0;

    var textDist = 40;

    function preload() {
        font = loadFont('../assets/fonts/RobotoMono-Medium.ttf');
    }

    function setup() {
        var canvasDiv = document.getElementById('sketch-container');
        var p5Width = canvasDiv.offsetWidth;
        var canvas = createCanvas(p5Width, windowHeight);
        canvas.parent('sketch-container');
        rectMode(CENTER);
        textAlign(CENTER);
        background(0);

        for (var px = 20; px < width - 50; px += textDist) {
            for (var py = 20; py < height - 50; py += textDist) {
                //  var point = points_array[i];
                var vehicle = new Vehicle(px, py);
                points.push(vehicle);
            }
        }

        pts = font.textToPoints(message, 0, 0, width / 5, {
            sampleFactor: 0.5,
            simplifyThreshold: 0
        });

        frameRate(60);
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
        textAlign(CENTER);

        background(0);

        noStroke();
        blendMode(ADD);
        push();
        translate(width / 5, height / 1.75);
        for (let i = 0; i < pts.length; i++) {
            let xoff = ns(pts[i].x, pts[i].y, xz, 0.005, -50, 50);
            let yoff = ns(pts[i].y, pts[i].x, yz, 0.005, -50, 50);

            let xoff2 = ns(pts[i].x, pts[i].y, xz2, 0.005, -50, 50);
            let yoff2 = ns(pts[i].y, pts[i].x, yz2, 0.005, -50, 50);

            let xoff3 = ns(pts[i].x, pts[i].y, xz3, 0.005, -50, 50);
            let yoff3 = ns(pts[i].y, pts[i].x, yz3, 0.005, -50, 50);

            //        colour = map(i, 0, pts.length, 0, 360);
            fill(255, 0, 0);
            ellipse(pts[i].x + xoff, pts[i].y + yoff, textEl, textEl);

            fill(0, 255, 0);
            ellipse(pts[i].x + xoff2, pts[i].y + yoff2, textEl, textEl);

            fill(0, 0, 255);
            ellipse(pts[i].x + xoff3, pts[i].y + yoff3, textEl, textEl);
        }
        pop();

        xz += 1;
        yz += 1;
        xz2 += 1.1;
        yz2 += 1.1;
        xz3 += 1.2;
        yz3 += 1.2;
        blendMode(BLEND);
        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            point.update();
            point.behaviors();
            fill(255);
            point.show();
        }
        //        stroke(255, 240, 50);
        //        strokeWeight(40);
        //        noFill();
        //        rect(width / 2, height / 2, width, height);

        noStroke();
        fill(255);
        textFont(font);
        textSize(18);
        text(description, width / 2, height / 2 + height / 6);
        //
        //        blendMode(BLEND);
        //        strokeWeight(1);
        //        stroke(255);
        //        fill(255, 50);
        //        ellipse(mouseX, mouseY, 450);

        noStroke();
        fill(255);
        ellipse(mouseX, mouseY, 10, 10);

    }


    function Vehicle(x, y) {
        // this.pos = createVector(x, y);
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        this.target = createVector(random(width), random(height));
        this.r = 8;
        this.maxspeed = 10;
        this.maxforce = 0.2;
        this.xspeed = 5;
        this.yspeed = 5;
        this.rad = 2;
        this.xdirection = random(-1, 1);
        this.ydirection = random(-1, 1);
        this.bounds = 300;


        this.behaviors = function () {
            this.target = createVector(this.pos.x, this.pos.y);
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
            if (distance < this.bounds) {
                speed = map(distance, 0, this.bounds, 0, this.maxspeed);
            }

            desired.setMag(speed);
            var steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxforce);
            return steer;
        }

        this.flee = function (target) {
            var desired = p5.Vector.sub(target, this.pos);
            var distance = desired.mag();
            if (distance < this.bounds) {
                //                this.xdirection *= -1;
                //                this.ydirection *= -1;
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
            if (this.pos.x > width - this.rad || this.pos.x < this.rad) {
                this.xdirection *= -1;
            }
            if (this.pos.y > height - this.rad || this.pos.y < this.rad) {
                this.ydirection *= -1;
            }
        }

        this.show = function () {
            this.pos.x = this.pos.x + this.xspeed * this.xdirection;
            this.pos.y = this.pos.y + this.yspeed * this.ydirection;

            noStroke();
            ellipse(this.pos.x, this.pos.y, this.rad);

        }
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
    }
}
