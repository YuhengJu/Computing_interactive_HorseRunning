/// <reference path="/Users/yuhengju/Documents/MAMP/interactive/p5.d/p5.global-mode.d.ts">

// select your horse
let myHorse = "brown_horse";
window.addEventListener("load",function(){
    let iframe = document.getElementById("frame1");
    let selectedHorse = iframe.contentWindow.document.getElementById("horseForm").children[0];
    selectedHorse.addEventListener("change", function(){
        myHorse = selectedHorse.value;
    });
})

let x = 200;
let y = 390;
let jumpMode = false;
let jumpPower = 0;


let stoneX = 980;
let stoneY = 412;
let woodX = 980;
let woodY = 412;
let gateX = 990;
let gateY = 412;
let grassX = -50;
let grassY = 412;

let stoneSpeed = 0;
let woodSpeed = 0;
let gateSpeed = 0;
let grassSpeed = 0;

let newObstacle = true; 

let grassTimer = 0;
let points = 0;

let gameOver = undefined;

let startScreen = document.getElementById("startScreen");
let startBtn = document.querySelector("button");
let difficulty = document.querySelector("select");

let endScreen = document.getElementById("endScreen");
endScreen.style.display = "none";


// difficulty values
let difficultyValue;
difficulty.addEventListener("change", function(){
    if(difficulty.value == "easy"){
        difficultyValue = 1;
    }else if(difficulty.value == "normal"){
        difficultyValue = 1.5;
    }else{
        difficultyValue = 2;
    }
})

var jump;
var collect;

// background repeatition
let layer;
let layer02;

layerSpeed = 2;
layer02Speed = 0.5;

let layer_X = 0;
let layer_X2 = 1024;
let layer02_X = 0;
let layer02_X2 = 1920;

function preload(){
    brown_horse = loadImage("images/brown_horse.gif");
    unicorn = loadImage("images/unicorn.gif");
    pony = loadImage("images/pony.gif");
    
    my_background = loadImage("images/background.jpg");
    layer = loadImage("images/layer.png");
    layer02 = loadImage("images/layer02.png");
    
    stone = loadImage("images/stone.png");
    wood = loadImage("images/wood.png");
    gate = loadImage("images/gate.png");
    grass = loadImage("images/grass.png");

    jump = loadSound("sounds/jump.mp3");
    collect = loadSound("sounds/collect.mp3");
}

function setup() {
    let c = createCanvas(960,500);
    c.parent("gameContainer");
    background(0);
}

function draw() {
    if(gameOver == undefined){
        console.log("choose difficulty");
        endScreen.style.display = "none";
        startScreen.style.display = "block";

        // background repeatition
        imageMode(CORNER);
        image(my_background,0,0);
        image(layer02,layer02_X,-80);
        image(layer02,layer02_X2,-80);
        image(layer,layer_X,435);
        image(layer,layer_X2,435);
        // floor moving
        layer_X -= layerSpeed;
        layer_X2 -= layerSpeed;
        if(layer_X <= -1024){
            layer_X = layer_X2 + 1024;
        }
        if(layer_X2 <= -1024){
            layer_X2 = layer_X + 1024;
        }
        // cloud moving
        layer02_X -= layer02Speed;
        layer02_X2 -= layer02Speed;
        if(layer02_X <= -1920){
            layer02_X = layer02_X2 + 1920;
        }
        if(layer02_X2 <= -1920){
            layer02_X2 = layer02_X + 1920;
        }


        // start screen and select the difficulty
        startBtn.onclick = function (){
            if(difficulty.value != ""){
                startScreen.style.display = "none";
                gameOver = false;
            } 
        }
    }
    
    if(gameOver == false){
        console.log("game starts")

        // load the images
        imageMode(CORNER);
        image(my_background,0,0);
        image(layer02,layer02_X,-80);
        image(layer02,layer02_X2,-80);
        image(layer,layer_X,435);
        image(layer,layer_X2,435);
        // floor moving
        layer_X -= layerSpeed;
        layer_X2 -= layerSpeed;
        if(layer_X <= -1024){
            layer_X = layer_X2 + 1024;
        }
        if(layer_X2 <= -1024){
            layer_X2 = layer_X + 1024;
        }
        // cloud moving
        layer02_X -= layer02Speed;
        layer02_X2 -= layer02Speed;
        if(layer02_X <= -1920){
            layer02_X = layer02_X2 + 1920;
        }
        if(layer02_X2 <= -1920){
            layer02_X2 = layer02_X + 1920;
        }

        imageMode(CENTER);
        // image(brown_horse,x,y);
        if(myHorse !== undefined) {
            console.log("myHorse changed to", myHorse);
            if(myHorse == "brown_horse") {
                image(brown_horse,x,y);
            }else if(myHorse == "unicorn"){
                image(unicorn,x,y);
            }else if(myHorse == "pony"){
                image(pony,x,y);
            }
        }
        image(stone,stoneX,stoneY);
        image(wood,woodX,woodY);
        image(gate,gateX,gateY);

        image(grass,grassX,grassY);
        
        // control the character
        // avoid double jump
        if((keyIsDown(UP_ARROW)) && (jumpMode == false)){
            jumpMode = true;
            jumpPower = -13;
            jump.play();
        }

        if(jumpMode == true){
            y += jumpPower;
            // apply gravity
            jumpPower += 0.5;

            if(y>=390){
                jumpMode = false;
                y = 390;
            }
        }

        // obstacle
        imageMode(CENTER);
        if (newObstacle == true) {
                randomObstacle();
            }


        // moving stone
        stoneX -= stoneSpeed;
        if(stoneX < 0){
            stoneX = random(980,1200);
            stoneSpeed = 0;
            newObstacle = true;
        }
        // hit the stone, game is over
        stoneDis = dist(x,y,stoneX,stoneY);
        if(stoneDis < 80){
            gameOver = true;
        } 

        // moving wood
        woodX -= woodSpeed;
        if(woodX < 0){
            woodX = random(980,1200);
            woodSpeed = 0;
            newObstacle = true;
        }
        // hit the wood, game is over
        woodDis = dist(x,y,woodX,woodY);
        if(woodDis<80){
            gameOver = true;
        }

        // moving gate
        gateX -= gateSpeed;
        if(gateX < 0){
            gateX = random(990,1200);
            gateSpeed = 0; 
            newObstacle = true;
        }
        // hit the wood, game is over
        gateDis = dist(x,y,gateX,gateY);
        if(gateDis<80){
            gameOver = true;
        }

        // collection
        // let grassTimer increases
        grassTimer += 1;
        grassX -= grassSpeed;
        // Check if it's time to generate grass
        if(grassTimer >= 500){
            grassX = 980;
            grassSpeed = 5;
            grassTimer = 0;
        }
        // scoring system
        grassDis = dist(x,y,grassX,grassY);
        if(grassDis < 80){
            points += 1;
            grassX = -50;
            collect.play();
        }

        fill(0,120,150);
        textSize(20);
        textFont("Copperplate")
        text("Points: " + points, 50,50);
        text("Highest: " + window.localStorage.getItem("highest"), 50,100);

    }

    if(gameOver == true){
        console.log("game is over");
        // end screen
        endScreen.style.display = "block";

        // initiate the values
        x = 200;
        y = 390;

        jumpMode = false;
        jumpPower = 0;

        stoneX = 980;
        woodX = 980;
        gateX = 990;
        grassX = -50;
        
        stoneSpeed = 0;
        woodSpeed = 0;
        gateSpeed = 0;
        grassSpeed = 0;

        newObstacle = true; 
        
        grassTimer = 0;   
    }
}

function randomObstacle(){
    newObstacle = false;
    let a = floor(random(1, 4));
    if (a == 1) {
        console.log('1');
        stoneSpeed = difficultyValue * random(3,10);
    } else if (a == 2) {
        console.log('2');
        woodSpeed = difficultyValue * random(3,10);
    } else {
        console.log('3');
        gateSpeed = difficultyValue * random(3,10);
    }
} 

// restart the game
function mousePressed(){
    if(gameOver == true){
        gameOver = undefined;

        if((window.localStorage.getItem == null) || (window.localStorage.getItem == 0)){
            window.localStorage.setItem("highest",points);
        }else if(window.localStorage.getItem('highest')<=points){
            window.localStorage.setItem("highest",points);
        }

        points = 0;
    }

    }
    

