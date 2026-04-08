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
    }}

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
        
    }
    
    }

class Apple{
    constructor(){
        let onSnake

        while (true) {
            onSnake = false;
            this.x = Math.floor(Math.random() * rows / snakeBody.size) * snakeBody.size
            this.y
    }
}
}