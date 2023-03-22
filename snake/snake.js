var blockSize=25;
var rows=15;
var columns=15;
var board;
var score=0;
var context;

//snake head
var snakeX=blockSize*5;
var snakeY=blockSize*5;

var snakeBody=[];

//food
var appleX;
var appleY;

var velocityX=0;
var velocityY=0;

var gameOver=false;

window.onload = function(){
    board= document.getElementById("board");
    
    board.height=rows*blockSize;
    board.width=columns*blockSize;
    context=board.getContext("2d");

    placeApple();
    document.addEventListener("keyup",changeDirection);
    setInterval(update,1000/2);
}

function update(){

    if(gameOver)    return;

    context.fillStyle="black"
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle="red"
    context.fillRect(appleX,appleY,blockSize,blockSize);

    document.getElementById('score').innerHTML = "Score: " + score;

    document.getElementById('resetButton').innerHTML = "Reset";
    //document.getElementById('resetButton').setAttribute("href", 'javascript:window.location.href=window.location.href"');
    if(snakeX==appleX && snakeY==appleY){
        snakeBody.push([appleX,appleY]);
        placeApple();
        score=score+1;
    }

    for(let i=snakeBody.length-1;i>=0;i--){
        snakeBody[i]=snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0]=[snakeX,snakeY];
    }

    context.fillStyle="lime"
    snakeX+=velocityX*blockSize;
    snakeY+=velocityY*blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
    for(let i=0;i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }

    if(snakeX < 0 || snakeY < 0 || snakeX > columns*blockSize || snakeY > rows*blockSize){
        gameOver=true;
        //alert("Game over");
       // reset();
    }

    for(let i=0;i<snakeBody.length;i++){
        if(snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1])
        {
            gameOver=true;
         //   alert("Game over");
          //  reset();
        }
    }
}

function reset(){
    score=0;
    snakeX=blockSize*5;
    snakeY=blockSize*5;
    snakeBody=[];
    placeApple();
    gameOver=false;
    velocityX=0;
    velocityY=0;
}

function changeDirection(e){
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeApple(){
    appleX=Math.floor(Math.random()*columns)*blockSize;
    appleY=Math.floor(Math.random()*rows)*blockSize;
}