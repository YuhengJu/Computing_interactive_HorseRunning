function preload(){
    stable = loadImage("images/stable.png");
    pony = loadImage("images/pony.gif");
    unicorn = loadImage("images/unicorn.gif");
    brown_horse = loadImage("images/brown_horse.gif");
}

function setup(){
    createCanvas(256,256)
    background(0)
}

function draw(){
    imageMode(CORNER);
    image(stable,0,0);
    image(pony,0,50);
    image(unicorn,100,70);
    image(brown_horse,50,140);

}