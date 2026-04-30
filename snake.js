const blocksize = 20;
const rows = 30;
const cols = 30;
const board = document.getElementById("board");
const boardContext = board.getContext("2d");


let snakeBody = [];

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
    boardContext.clearRect(0, 0, board.width, board.height);
    wallCollision();
}

function appleYumYum() {
        if(snek.x == apple.x && snek.y == apple.y) {
            apple = new Apple();
            snek.tail();
        }
    }


function wallCollision() {
    if (snek.x == 0 && snek.dirX == -1) {
        gameOver = true;
    }
    if (snek.x == cols && snek.dirX == 1) {
        gameOver = true;
    }
    if (snek.y == 0 && snek.dirY == -1) {
        gameOver = true;
    }
    if (snek.y == rows && snek.dirY == 1) {
        gameOver = true;
    }
}

function draw() {
    boardContext.fillStyle = "black";
    boardContext.fillText("Score: " + snakeBody.length, 10, 20);
        boardContext.fillStyle = "red";
        boardContext.fillRect(apple.x, apple.y, blocksize, blocksize);

        boardContext.fillStyle = "green";
        boardContext.fillRect(snek.x, snek.y, blocksize, blocksize);
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
        snakeBody.shift({x: this.x, y: this.y})
        snakeBody.push({x: this.x, y: this.y})

        
    }
    
    }

class Apple{
    constructor(){
        let onSnake

        while (true) {
            onSnake = false;
            this.x = Math.floor(Math.random() * rows / blocksize) * blocksize
            this.y = Math.floor(Math.random() * cols / blocksize) * blocksize

            for (let i = 0; i < snakeBody.length; i++) {
                if (this.x == snakeBody[i].x && this.y == snakeBody[i].y) {
                    onSnake = true;
                }
            }
            if (!onSnake) {
                break;
            }
        }
    }
}

const snek = new Snek(20, 20, blocksize);
const snek = new Snek(20, 20, blocksize);
