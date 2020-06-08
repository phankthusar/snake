const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

const box = 32;
let score = 0;
let dir = "";
const ground = new Image();
ground.src = "ground.png";
const foodImg = new Image();
foodImg.src = "food.png";


let snake = [];

snake[0]={
    x: 9*box,
    y: 10*box
};

let food = {
    x: Math.floor(Math.random()*17+1)*box,
    y: Math.floor(Math.random()*15+3)*box
};

document.addEventListener("keydown", direction)

function direction(event){
    
    let key = event.keyCode;
    console.log(key)
    if(key ==37 && dir != "left"&& dir != "right"){
        return dir= "left";
    }
    else if(key ==38 && dir != "up"&& dir != "down"){
        return dir= "up";
    }
    else if(key ==39 && dir != "right" && dir != "left"){
        return dir= "right";
    }
    else if(key ==40 && dir != "down"&& dir != "up"){
        return dir= "down";
    }
    
    
}
function checkCollision (head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}
function draw(){
    context.drawImage(ground,0,0)
    function drawSnake(){
        for(let i=0;i<snake.length;i++){
            context.fillStyle= (i == 0) ?"green" : "white";
            context.fillRect(snake[i].x,snake[i].y,box, box);
            context.strokeStyle ="red";
            context.strokeRect(snake[i].x,snake[i].y,box, box);
        }
    }
    
    context.drawImage(foodImg,food.x,food.y);
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    switch(dir){
        case "left":
            snakeX -= box;
            break;
        case "right":
            snakeX += box;
            break;
        case "up": 
            snakeY -= box;
            break;
        case "down":
            snakeY += box;
            break;
    }
    
    if(snakeX ==food.x && snakeY == food.y){
        score++
        food ={
            x: Math.floor(Math.random()*17+1)*box,
            y: Math.floor(Math.random()*15+3)*box
        }

    }
        else{
            snake.pop()
        }
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    if(snakeX< box || snakeX>17*box || snakeY<3*box || snakeY > 17*box ||checkCollision(newHead,snake)){
        clearInterval(game)
        context.fillStyle = "black";
    context.font = "45px Changa one";
    context.fillText("game over",6.3 *box,10*box);
    //context.style.zIndex = "-1";
    }

    snake.unshift(newHead);
    drawSnake();
    context.fillStyle = "black";
    context.font = "45px Changa one";
    context.fillText(score,2*box,1.6*box);
    
}


let game = setInterval(draw,100);