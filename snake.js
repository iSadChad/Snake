const blocksize = 40;
const rows = 50;
const cols = 50;
const canvas = document.getElementById("board");
const boardContext = canvas.getContext("2d");


let gameOver = false;


window.onload = () => {
    gameLoop();
}

function gameLoop() {
    setInterval(show, 1000/20)
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
        if(snek.x == apple.x && snek.y == apple.y) {
            apple = new Apple();
            snek.tail();
        }
    }


function wallCollision() {
    canvas.width - snek.size
    canvas.height - snek.size
    
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
        return position
         }

    tail(){ 
        snek.push({x: this.x, y: this.y})
        
    }
    
    }

class Apple{
    constructor(){
        let onSnake

        while (true) {
            onSnake = false;
            this.x = Math.floor(Math.random() * cols) * blocksize;
            this.y = Math.floor(Math.random() * rows) * blocksize;

            
            if (!onSnake) {
                break;
            }
        }
    }
}

const snek = new Snek(20, 20, blocksize);
let apple = new Apple();
