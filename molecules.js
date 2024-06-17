let containerWidth = document.getElementById('canvas-container').offsetWidth;
let containerHeight = document.getElementById('canvas-container').offsetHeight;


// Collection of bubbles
let bubbles = [];
let bgbubbles = [];

// 
let meta_images_ON = ["./Media/Infographics/i_1_ON.png", "./Media/Infographics/i_2_ON.png", "./Media/Infographics/i_3_ON.png", "./Media/Infographics/i_4_ON.png"];
let meta_images_OFF = ["./Media/Infographics/i_1_OFF.png", "./Media/Infographics/i_2_OFF.png", "./Media/Infographics/i_3_OFF.png", "./Media/Infographics/i_4_OFF.png"];
const links = ["./Research.html", "./People.html", "./External.html", "./Contact.html"]
const bgParticlePATH = "./Media/Infographics/background_particle.png"
let bgParticle;

let images_ON = [];
let images_OFF = [];

let flower;
let kittens = [];

// divided width by 12, and height by 12
let positions = [[2, 4], [5, 3], [8, 8], [10, 2]]
function preload() {
    for (let i = 0; i < 4; i++) {
        images_ON[i] = loadImage(meta_images_ON[i]);
        images_OFF[i] = loadImage(meta_images_OFF[i]);
    }
    bgParticle = loadImage(bgParticlePATH);


}

function setup() {
    canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent("canvas-container");
    for (let i = 0; i < 4; i++) {
        let x = (containerWidth / 12) * positions[i][0];
        let y = (containerHeight / 12) * positions[i][1];

        // let r = random(60, 80);
        let r = random((containerHeight / 4) - 15, (containerHeight / 4) + 15);
        let imgID = i;
        console.log(i);
        // console.log(imgID);
        // let kitten = random(kittens);
        let b = new Bubble(x, y, r, imgID);
        bubbles.push(b);
    }

    // generate and push simple background bubbles
    for (let i = 0; i < 50; i++) {
        let x = random(0, containerWidth);
        let y = random(0, containerHeight);

        // let r = random(60, 80);
        let startSize = i + 1
        let r = random(i, i + 1) * 0.5;
        // let imgID = int(random(0, images_ON.length));
        // console.log(imgID);
        // let kitten = random(kittens);
        let b = new BG_Bubble(x, y, r);
        bgbubbles.push(b);
    }
    imageMode(CENTER)
}

function mousePressed() {
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].clicked(mouseX, mouseY);
    }
}

function draw() {
    background(7, 13, 16);
    for (let i = 0; i < bgbubbles.length; i++) {
        bgbubbles[i].move();
        bgbubbles[i].show();
    }
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].move();
        bubbles[i].updateSize();
        bubbles[i].show();
    }

    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].hover(mouseX, mouseY);
    }
}

class BG_Bubble {
    constructor(x, y, r, myIDX) {
        this.x = x;
        this.y = y;
        this.r = r;
        // this.myIDX = myIDX;
        this.img = bgParticle;
        this.t = random(0, 10);
        this.scaleResize = 10; //how much bigger/smaller will the circle get
        this.rescaledRadius = this.r;
        this.speedSin = 0.015;
        // this.kitten = random(kittens);
    }
    show() {
        // tint(255, 100);
        image(this.img, this.x, this.y, this.rescaledRadius, this.rescaledRadius);
        // noTint(); 
    }

    move() {
        // calculate the distance to the bubble relative to the mouse position
        let dX = mouseX - this.x;
        let dY = mouseY - this.y;
        // let dst = createVector(dX, dY).normalize();
        if (Math.sqrt(dX * dX + dY * dY) < 300) {
            // this.x += dst.x * 0.9;
            // this.y += dst.y * 0.9;
            this.x = this.x + random(-5, 5);
            this.y = this.y + random(-5, 5);
        } else {
            this.x = this.x + random(-0.7, 0.7);
            this.y = this.y + random(-0.7, 0.7);
        }



    }
}

class Bubble {
    constructor(x, y, r, myIDX) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.myIDX = myIDX;
        this.img = images_OFF[this.myIDX];
        this.t = random(0, 10);
        this.scaleResize = 10; //how much bigger/smaller will the circle get
        this.rescaledRadius = this.r;
        this.speedSin = 0.015;
        // this.kitten = random(kittens);
    }

    hover(px, py) {
        //let d = dist(px, py, this.x, this.y);
        //if (d < this.r) {
        if (
            px > this.x - this.r / 2 &&
            px < this.x + this.r / 2 &&
            py > this.y - this.r / 2 &&
            py < this.y + this.r / 2
        ) {
            this.img = images_ON[this.myIDX]; //random(kittens);
        } else {
            this.img = images_OFF[this.myIDX]; //random(kittens);
        }
    }

    clicked(px, py) {
        //let d = dist(px, py, this.x, this.y);
        //if (d < this.r) {
        if (
            px > this.x - this.r / 2 &&
            px < this.x + this.r / 2 &&
            py > this.y - this.r / 2 &&
            py < this.y + this.r / 2
        ) {
            event.preventDefault();
            window.location.href = links[this.myIDX]; // Opens the URL in a new tab
        }
    }

    move() {
        this.x = this.x + random(-0.5, 0.5);
        this.y = this.y + random(-0.5, 0.5);
    }

    updateSize() {
        this.rescaledRadius = this.r + (Math.sin(this.t) * this.scaleResize);
        this.t += this.speedSin;
    }

    show() {
        image(this.img, this.x, this.y, this.rescaledRadius, this.rescaledRadius);

    }
}


function windowResized() {
    containerWidth = document.getElementById('canvas-container').offsetWidth;
    containerHeight = document.getElementById('canvas-container').offsetHeight;
    resizeCanvas(containerWidth, containerHeight);

    for (let i = 0; i < 4; i++) {
        let x = (containerWidth / 12) * positions[i][0];
        let y = (containerHeight / 12) * positions[i][1];
        // let r = random(60, 80);
        let r = random((containerHeight / 5) - 5, (containerHeight / 5) + 5);
        bubbles[i].x = x;
        bubbles[i].y = y;
        bubbles[i].r = r;
    }
}