const blocksize = 20;
const rows = 30;
const cols = 30;
const canvas = document.getElementById("board");
const boardContext = canvas.getContext("2d");

canvas.width = cols * blocksize;
canvas.height = rows * blocksize;


window.onload = () => {
    gameLoop();
}

function gameLoop() {
    setInterval(show, 1500/20)
}
 
function show() {
    update();
    draw();
}

let gameState = "start";


const gameStartImg = new Image();
gameStartImg.src = "start.jpg";    

const gameOverImg = new Image();
gameOverImg.src = "youded.jpg";


function update() {
    if (gameState !== "playing") {
        return;
    }

    boardContext.clearRect(0, 0, canvas.width, canvas.height);
    snek.movement();
    wallCollision();
    appleYumYum();
    selfTouching();
    score();
 
}

function score(){
        if (snek.body.length > 0) {
            document.querySelector(".score").innerHTML = "Score: " + (snek.body.length - 1);
        }      
    }

function createRect(x, y, width, height, color) {
    boardContext.fillStyle = color;
    boardContext.fillRect(x, y, width, height);
}


window.addEventListener("keydown", (event) => {
        if (event.key == "ArrowUp" && snek.dirY != 1){
            snek.dirY = -1
            snek.dirX = 0
        } else if (event.key == "ArrowDown" && snek.dirY != -1){
            snek.dirY = 1
            snek.dirX = 0
        } else if (event.key == "ArrowLeft" && snek.dirX != 1){
            snek.dirY = 0
            snek.dirX = -1
        } else if (event.key == "ArrowRight" && snek.dirX != -1) {
            snek.dirY = 0
            snek.dirX = 1
        } else if (event.key == " " && gameState == "start") {
            gameState = "playing";
        }
        else if (event.key == " " && gameState == "gameOver") {
            snek = new Snek(40, 40, blocksize);
            apple = new Apple();
            gameState = "playing";
        }
    })


   
function appleYumYum() {
    if(snek.body[snek.body.length - 1].x == apple.x &&
        snek.body[snek.body.length - 1].y == apple.y) {
            snek.grow = true;
            apple = new Apple();
        }
}

function selfTouching() {
  const head = snek.body[snek.body.length - 1];
  for (let i = 0; i < snek.body.length - 1; i++) {
    if (head.x === snek.body[i].x && head.y === snek.body[i].y) {
      gameState = "gameOver";
      return;
    }
  }
}

function wallCollision() {
    
    let head = snek.body[snek.body.length - 1]

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameState = "gameOver";
    }
    
}


function draw() {
    if (gameState == "start") {
       const x = canvas.width / 2 - gameStartImg.width / 2;
        const y = canvas.height / 2 - gameStartImg.height / 2;
       
        boardContext.drawImage(gameStartImg, x, y, gameStartImg.width, gameStartImg.height);
    } 
    if (gameState == "playing") {
    createRect(0, 0, canvas.width, canvas.height, "white");
    createRect(apple.x, apple.y, blocksize, blocksize, "red");
    for (let i = 0; i < snek.body.length; i++){
            createRect(snek.body[i].x, snek.body[i].y, snek.size, snek.size, "green")
        }
    }
    if (gameState == "gameOver") {
       const x = canvas.width / 2 - gameOverImg.width / 2;
        const y = canvas.height / 2 - gameOverImg.height / 2;

        boardContext.drawImage(gameOverImg, x, y); 
    }
}


class Snek{
    constructor(x, y, size){
        this.body = [{x: x, y: y}]
        this.x = x 
        this.y = y
        this.size = size
        this.dirX = 0
        this.dirY = 1
        this.grow = false;   
    }
    movement(){ 
        let move 
        
        if ( this.dirX == 1) {
            move = {
                x: this.body[this.body.length - 1].x + this.size,
                y: this.body[this.body.length - 1].y
            }
        } else if ( this.dirX == -1) {
            move = {
                x: this.body[this.body.length - 1].x - this.size,
                y: this.body[this.body.length - 1].y
        }
        } else if ( this.dirY == 1) {
            move = {
                x: this.body[this.body.length - 1].x,
                y: this.body[this.body.length - 1].y + this.size
        }
        } else if ( this.dirY == -1) {
            move = {
                x: this.body[this.body.length - 1].x,
                y: this.body[this.body.length - 1].y - this.size
        }
        }
        if (!this.grow) {
            this.body.shift();
        } else {
            this.grow = false;
        }
         this.body.push(move);
    } 
        
}
        
  
    

class Apple{
    constructor(){
        let touchSnake

        while (true) {
            touchSnake = false;
            this.x = Math.floor(Math.random() * cols) * blocksize;
            this.y = Math.floor(Math.random() * rows) * blocksize;
            
            for (let i = 0; i < snek.body.length; i++) {
                if (snek.body[i].x == this.x && snek.body[i].y == this.y) {
                    touchSnake = true;
                    break;
                }
            }
            this.size = snek.size;
            this.color = "red";
            if (!touchSnake) {
                break;
            }
        }
    }
}

let snek = new Snek(40, 40, blocksize);
let apple = new Apple();
