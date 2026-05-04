const blocksize = 20;
const rows = 30;
const cols = 30;
const canvas = document.getElementById("board");
const boardContext = canvas.getContext("2d");

canvas.width = cols * blocksize;
canvas.height = rows * blocksize;

let gameOver = false;


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

function update() {
    if (gameOver) {
        return;
    }

    boardContext.clearRect(0, 0, canvas.width, canvas.height);
    let next = snek.movement();
            snek.x = next.x;
            snek.y = next.y;
    wallCollision();
    appleYumYum();
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
        }
    })


   
function appleYumYum() {
        if(snek.body[snek.body.length - 1].x == apple.x &&
            snek.body[snek.body.length - 1].y == apple.y) {
                snek.body[snek.body.length] = {x: x, y: y}
                apple = new Apple();
            }
        }


function wallCollision() {
    snek.x == canvas.width - snek.size
    snek.y == canvas.height - snek.size
    if (snek.x == 0 && snek.dirX == -1) {
        gameOver = true;
    }
    if (snek.x == canvas.width && snek.dirX == 1) {
        gameOver = true;
    }
    if (snek.y == 0 && snek.dirY == -1) {
        gameOver = true;
    }
    if (snek.y == canvas.height && snek.dirY == 1) {
        gameOver = true;
    }
    
}

function draw() {
    
    createRect(0, 0, canvas.width, canvas.height, "white");
    createRect(snek.x, snek.y, snek.size, snek.size, "green");
    createRect(apple.x, apple.y, blocksize, blocksize, "red");
}


class Snek{
        constructor(x, y, size){
            this.body = [{x: x, y: y}]
            this.x = x
            this.y = y
            this.size = size
            this.dirX = 0
            this.dirY = 1
        }
     movement(){ 
        let position 
        
        if ( this.dirX == 1) {
            position = {
                x: this.x + this.size,
                y: this.y
            }
        } else if ( this.dirX == -1) {
            position = {
                x: this.x - this.size,
                y: this.y
        }
        } else if ( this.dirY == 1) {
            position = {
                x: this.x,
                y: this.y + this.size
        }
        } else if ( this.dirY == -1) {
            position = {
                x: this.x,
                y: this.y - this.size
        }
        }
        this.body.shift();
        this.body.push(position);
        return position;
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

const snek = new Snek(40, 40, blocksize);
let apple = new Apple();
