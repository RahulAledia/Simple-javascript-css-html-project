let timer;
let foodCreated = false;
const food = document.querySelector(".food");
const head = document.querySelector(".head");
let dir;
let foodCordinatesRow;
let foodCordinatesColumn;
let container = document.querySelector('#board');
let seconds;
let finish = false;
let score = 0;
let highscore = localStorage.getItem("highscore");
//snake head
let snakeHead = { y: 1, x: 1 };
//snake body
let snakeBody = [];
createFood();
createHighScore();

//create a highscore in localstorage.
function createHighScore() {
    if (highscore == null) { localStorage.setItem("highscore", "0"); }
    else {
        let highScoreBoard = document.querySelector(".highScore");
        highScoreBoard.innerHTML = `highscore:${highscore}`;
    }
}

//Update score board;
function updateScore() {
    let scoreBoard = document.querySelector(".score");
    scoreBoard.innerHTML = `score: ${score}`;
    let highScoreBoard = document.querySelector(".highScore");
    localStorage.setItem("highscore", highscore);
    highScoreBoard.innerHTML = `highscore: ${highscore}`;

}

// Restart the game.
function restart() {
    for (const iterator of seconds) {
        iterator.remove();
    }
    createFood();
    //snake head
    snakeHead = { y: 1, x: 1 };
    head.style.gridRow = snakeHead.y;
    head.style.gridColumn = snakeHead.x;
    //snake body
    snakeBody = [];
    finish = false;
    score = 0;
    updateScore();
}

//function to listed to the keyboard to change the direction.
document.addEventListener('keydown', logKey);
function logKey(e) {
    dir = e.code;
    if (!finish) {
        update();
    }
    else {
        restart();
    }
}

// food is created if it is eaten i.e  foodCreated = false;
function createFood() {
    foodCordinatesRow = Math.floor((Math.random() * 18) + 1);
    foodCordinatesColumn = Math.floor((Math.random() * 18) + 1);
    food.style.gridRow = foodCordinatesRow;
    food.style.gridColumn = foodCordinatesColumn;
    foodCreated = true;
}

// Main game loop
function update() {
    clearInterval(timer);
    timer = setInterval(
        function run() {
            if (checkFoodEaten()) {
                snakeBody.push({ y: foodCordinatesRow, x: foodCordinatesColumn })
                //Create a body part and assign style to it
                let second = document.createElement('div');
                second.className = "second";
                second.style.gridColumn = snakeBody[snakeBody.length - 1].x;
                second.style.gridRow = snakeBody[snakeBody.length - 1].y;
                container.appendChild(second);
                // recount all the body parts.
                seconds = document.querySelectorAll('.second');
                createFood();
                score += 10;
                if (highscore < score) highscore = score;
                updateScore();
            }
            if (snakeBody.length != 0)
                incrementSnake();

            if (dir == 'ArrowDown') {
                head.style.gridRow = ++snakeHead.y;
            }
            else if (dir == 'ArrowRight') {
                head.style.gridColumn = ++snakeHead.x;
            }
            else if (dir == 'ArrowUp') {
                head.style.gridRow = --snakeHead.y;
            }
            else if (dir == 'ArrowLeft') {
                head.style.gridColumn = --snakeHead.x;
            }

            if (gameover()) {
                clearInterval(timer);
                finish = true;
                alert("game over!");
                restart();
            }
        }
        , 100);
}

//Increase snakes length
function incrementSnake() {
    for (let index = snakeBody.length - 1; index >= 1; index--) {
        snakeBody[index].y = snakeBody[index - 1].y;
        snakeBody[index].x = snakeBody[index - 1].x;
        seconds[index].style.gridRow = snakeBody[index].y;
        seconds[index].style.gridColumn = snakeBody[index].x;
    }
    snakeBody[0].y = snakeHead.y;
    snakeBody[0].x = snakeHead.x;
    seconds[0].style.gridRow = snakeBody[0].y;
    seconds[0].style.gridColumn = snakeBody[0].x;
}

//Check if food is eaten.
function checkFoodEaten() {
    if (head.style.gridColumnStart == food.style.gridColumnStart && head.style.gridRowStart == food.style.gridRowStart) {
        return true;
    }
    else return false;
}

//Snake's head touches itself
function snakeEatsItself() {
    let EatsItself = false;
    for (const key of snakeBody) {
        if (key.y == snakeHead.y && key.x == snakeHead.x) {
            EatsItself = true;
        }
    }
    return EatsItself;
}

//Gameover
function gameover() {
    // Snake touches the boundary.
    if (head.style.gridColumnStart > 18 || head.style.gridColumnStart < 0 || head.style.gridRowStart > 18 || head.style.gridRowStart < 0) {
        return true;
    }

    // Snake's head touches itself
    else if (snakeEatsItself()) return true;

    // If not from any of the above return false;
    else return false;
}










