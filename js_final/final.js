const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 300;

//pieces of game
let fish = { x: 180, y: 250, size: 50 };
let obstacle = { x: 50, y: 100, width: 80, height: 20, speed: 2 };
let level = 1;
let gameOver = false;
let gameWon = false;

//our fish friendy!
const fishImage = new Image();
fishImage.src = "fish.png";

//shift in colors for each level
const levelColors = ["#00BFFF", "#1E90FF", "#4682B4"];

//start game function
function startGame() {
  fish = { x: 180, y: 250, size: 50 };
  obstacle = { x: 50, y: 100, width: 80, height: 20, speed: 2 }; // Reset obstacle
  level = 1;
  gameOver = false;
  gameWon = false;
  document.getElementById("status-message").textContent = "";
  document.getElementById("level-display").textContent = "Level: 1";
  console.log("Game started!");
  requestAnimationFrame(gameLoop);
}

//render fish
function drawFish() {
  ctx.drawImage(fishImage, fish.x - fish.size / 2, fish.y - fish.size / 2, fish.size, fish.size);
}

//render obstacle
function drawObstacle() {
  ctx.fillStyle = "red";
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

//move obstacle
function moveObstacle() {
  console.log(`Before Move - X: ${obstacle.x}, Speed: ${obstacle.speed}`);
  obstacle.x += obstacle.speed;

  //reverse on boundaries of game
  if (obstacle.x + obstacle.width > canvas.width || obstacle.x < 0) {
    console.log("Reversing Direction");
    obstacle.speed = -obstacle.speed;
  }

  console.log(`After Move - X: ${obstacle.x}, Speed: ${obstacle.speed}`);
}

//collision check
function checkCollision() {
  if (
    fish.x + fish.size / 2 > obstacle.x &&
    fish.x - fish.size / 2 < obstacle.x + obstacle.width &&
    fish.y + fish.size / 2 > obstacle.y &&
    fish.y - fish.size / 2 < obstacle.y + obstacle.height
  ) {
    gameOver = true;
    console.log("Collision detected!");
  }
}

//check win function 
function checkWin() {
  if (fish.y < 20) {
    if (level === 3) {
      gameWon = true;
      console.log("Game Won!");
    } else {
      level++;
      fish.y = 250; // Reset fish position
      obstacle.x = 50; // Reset obstacle position
      obstacle.speed = 2 + level; // Increment speed for the new level
      document.getElementById("level-display").textContent = "Level: " + level;
      console.log(`Level Up! Now at Level: ${level}, Speed: ${obstacle.speed}`);
    }
  }
}

//fish movement by click
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  fish.x = event.clientX - rect.left;
  fish.y = event.clientY - rect.top;
  console.log(`Fish moved to: X=${fish.x}, Y=${fish.y}`);
});

//loop 
function gameLoop() {
  console.log(`Game Loop Running - Level: ${level}, Obstacle Position: ${obstacle.x}, Speed: ${obstacle.speed}`);
  if (gameOver) {
    document.getElementById("status-message").textContent = "Game Over! Try Again.";
    console.log("Game Over!");
    return;
  }

  if (gameWon) {
    document.getElementById("status-message").textContent = "You Won! Congratulations!";
    console.log("Game Won!");
    return;
  }

  //background
  ctx.fillStyle = levelColors[level - 1];
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //game elements
  drawFish();
  drawObstacle();

  //update game elements
  moveObstacle();
  checkCollision();
  checkWin();

  requestAnimationFrame(gameLoop);
}

startGame();

