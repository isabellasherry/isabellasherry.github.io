// Set up the canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 300;

// Game variables
let fish = { x: 180, y: 250, size: 30 };
let obstacle = { x: 50, y: 100, width: 80, height: 20, speed: 2 };
let level = 1;
let gameOver = false;
let gameWon = false;

// Load the fish image
const fishImage = new Image();
fishImage.src = "fish.png"; // Replace with your fish image file

// Background colors for levels
const levelColors = ["#00BFFF", "#1E90FF", "#4682B4"];

// Start the game
function startGame() {
  fish = { x: 180, y: 250, size: 30 }; // Reset fish position
  obstacle = { x: 50, y: 100, width: 80, height: 20, speed: 2 + level }; // Reset obstacle
  level = 1;
  gameOver = false;
  gameWon = false;
  document.getElementById("status-message").textContent = "";
  document.getElementById("level-display").textContent = "Level: 1";
  requestAnimationFrame(gameLoop);
}

// Draw the fish
function drawFish() {
  ctx.drawImage(fishImage, fish.x - fish.size / 2, fish.y - fish.size / 2, fish.size, fish.size);
}

// Draw the obstacle
function drawObstacle() {
  ctx.fillStyle = "red";
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Move the obstacle
function moveObstacle() {
  obstacle.x += obstacle.speed;
  if (obstacle.x > canvas.width || obstacle.x < 0) {
    obstacle.speed = -obstacle.speed;
  }
}

// Check for collisions
function checkCollision() {
  if (
    fish.x + fish.size / 2 > obstacle.x &&
    fish.x - fish.size / 2 < obstacle.x + obstacle.width &&
    fish.y + fish.size / 2 > obstacle.y &&
    fish.y - fish.size / 2 < obstacle.y + obstacle.height
  ) {
    gameOver = true;
  }
}

// Check for level completion
function checkWin() {
  if (fish.y < 20) {
    if (level === 3) {
      gameWon = true;
    } else {
      level++;
      fish.y = 250; // Reset fish position
      obstacle.speed += 1; // Increase difficulty
      document.getElementById("level-display").textContent = "Level: " + level;
    }
  }
}

// Handle mouse clicks to move the fish
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  fish.x = event.clientX - rect.left;
  fish.y = event.clientY - rect.top;
});

// Game loop
function gameLoop() {
  if (gameOver) {
    document.getElementById("status-message").textContent = "Game Over! Try Again.";
    return;
  }

  if (gameWon) {
    document.getElementById("status-message").textContent = "You Won! Congratulations!";
    return;
  }

  // Set background color based on level
  ctx.fillStyle = levelColors[level - 1];
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw game elements
  drawFish();
  drawObstacle();

  // Update game elements
  moveObstacle();
  checkCollision();
  checkWin();

  // Continue the game loop
  requestAnimationFrame(gameLoop);
}

// Start the game when the page loads
startGame();
