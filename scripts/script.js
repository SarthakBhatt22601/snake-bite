// Game Constants & Variables
let inputDir = {x:0 , y:0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');

let speed = 13;
let score = 0;
let hiscore = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:15 , y:15}
];
food = {x:4 , y:6};

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr){
    //If snake eat himself
    for (let i=1;i<sarr.length;i++) {
        if(sarr[0].x === sarr[i].x && sarr[0].y === sarr[i].y)
            return true;
    }
    //If snake hir the wall
    if(sarr[0].x <=0 || sarr[0].x >=20 || sarr[0].y <=0 || sarr[0].y >=20)
        return true;
    return false;    
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    //snake collide
    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir = {x:0 , y:0};
        alert("GAME OVER, Press any key to play again!!!");
        score = 0;
        scoreBox.innerHTML = "Score : " +score;
        snakeArr = [{x:13 , y:13}];
        food = {x:4 , y:6};
        score = 0;
    }

    //increment score & next food generate
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        score += 1;
        if(score > hiscore){
            hiscore += 1;
            hiscoreBox.innerHTML = "High Score : " + hiscore;
        }
        scoreBox.innerHTML = "Score : " + score;
        snakeArr.push({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        let a=2;
        let b=19;
        food = {x:Math.round(Math.random()*(b-a) + a) , y:Math.round(Math.random()*(b-a) + a)}
    }

    //To move snake
    for (let i=snakeArr.length - 2;i>=0;i--) {
        snakeArr[i+1].x = snakeArr[i].x;
        snakeArr[i+1].y = snakeArr[i].y;
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display snake & food
    //Display Snake
    gameBox.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        gameBox.appendChild(snakeElement);
    });

    //Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBox.appendChild(foodElement);
}

//move functions
function arrowUp(){
    moveSound.play();
    inputDir.x = 0;
    inputDir.y = -1;
}

function arrowDown(){
    moveSound.play();
    inputDir.x = 0;
    inputDir.y = 1;
}

function arrowLeft(){
    moveSound.play();
    inputDir.x = -1;
    inputDir.y = 0;
}

function arrowRight(){
    moveSound.play();
    inputDir.x = 1;
    inputDir.y = 0;
}

// Main logic starts here
window.requestAnimationFrame(main); // Game loop

window.addEventListener('keydown',e =>{
    switch (e.key) {
        case "ArrowUp":
            arrowUp();
            break;

        case "ArrowDown":
            arrowDown();
            break;

        case "ArrowLeft":
            arrowLeft();
            break;

        case "ArrowRight":
            arrowRight();
            break;     

        default:
            break;
    }
})