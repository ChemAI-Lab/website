let containerWidth = document.getElementById('canvas-container').offsetWidth;
let containerHeight = document.getElementById('canvas-container').offsetHeight;


// Collection of bubbles
let bubbles = [];

// 
let meta_images_ON = ["./Media/Infographics/i_1_ON.png", "./Media/Infographics/i_2_ON.png", "./Media/Infographics/i_3_ON.png", "./Media/Infographics/i_4_ON.png"];
let meta_images_OFF = ["./Media/Infographics/i_1_OFF.png", "./Media/Infographics/i_2_OFF.png", "./Media/Infographics/i_3_OFF.png", "./Media/Infographics/i_4_OFF.png"];
const links = ["./Contact.html", "./Gallery.html", "./footer.html", "./Contact.html"]

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
    imageMode(CENTER)
}

function mousePressed() {
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].clicked(mouseX, mouseY);
    }
}

function draw() {
    background(7, 13, 16);
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].move();
        bubbles[i].updateSize();
        bubbles[i].show();
    }

    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].hover(mouseX, mouseY);
    }
}

class Bubble {
    constructor(x, y, r, myIDX) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.myIDX = myIDX;
        this.img = images_OFF[this.myIDX];
        this.t = random(0,10);
        this.scaleResize = 10; //how much bigger/smaller will the circle get
        this.rescaledRadius = this.r;
        this.speedSin = 0.015;
        // this.kitten = random(kittens);
    }

    hover(px, py) {
        //let d = dist(px, py, this.x, this.y);
        //if (d < this.r) {
        if (
            px > this.x - this.r/2 &&
            px < this.x + this.r/2 &&
            py > this.y - this.r/2 &&
            py < this.y + this.r/2
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
            px > this.x - this.r/2 &&
            px < this.x + this.r/2 &&
            py > this.y - this.r/2 &&
            py < this.y + this.r/2
        ) {
            event.preventDefault();
            window.location.href = links[this.myIDX]; // Opens the URL in a new tab
        }
    }

    move() {
        this.x = this.x + random(-0.5, 0.5);
        this.y = this.y + random(-0.5, 0.5);
    }

    updateSize(){
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