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
            this.x = x;
            this.y = y;
            this.size = size;
    }
     movement(){ 
        
       }}