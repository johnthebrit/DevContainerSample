const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let rows, cols, cellSize; // Declare rows, cols, and cellSize globally

let grid = createGrid();
let ageGrid = createAgeGrid(); // Ensure ageGrid is initialized separately

function createGrid() {
    const grid = [];
    for (let row = 0; row < rows; row++) {
        grid[row] = [];
        for (let col = 0; col < cols; col++) {
            grid[row][col] = Math.random() > 0.8 ? 1 : 0; // Randomly populate grid
        }
    }
    return grid;
}

function createAgeGrid() {
    const ageGrid = [];
    for (let row = 0; row < rows; row++) {
        ageGrid[row] = [];
        for (let col = 0; col < cols; col++) {
            ageGrid[row][col] = 0; // Initialize all ages to 0
        }
    }
    return ageGrid;
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col]) {
                ageGrid[row][col]++; // Increment age if cell is alive
                const age = ageGrid[row][col];
                if (age <= 20) {
                    const red = Math.floor((age / 20) * 255);
                    const blue = 255 - red;
                    ctx.fillStyle = `rgb(${red}, 0, ${blue})`;
                } else {
                    ctx.fillStyle = 'rgb(255, 0, 0)'; // Stay red after age 20
                }
            } else {
                ageGrid[row][col] = 0; // Reset age if cell is dead
                ctx.fillStyle = 'white';
            }
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}

function getNextGeneration(grid) {
    const nextGrid = createGrid();
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const neighbors = countNeighbors(grid, row, col);
            if (grid[row][col] === 1) {
                nextGrid[row][col] = neighbors === 2 || neighbors === 3 ? 1 : 0;
            } else {
                nextGrid[row][col] = neighbors === 3 ? 1 : 0;
            }
        }
    }
    return nextGrid;
}

function countNeighbors(grid, row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                count += grid[newRow][newCol];
            }
        }
    }
    return count;
}

function update() {
    grid = getNextGeneration(grid);
    drawGrid();
    setTimeout(update, 500); // Update every 0.5 seconds
}

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;
    cellSize = 10; // Keep cells small with a fixed size
    rows = Math.floor(canvas.height / cellSize);
    cols = Math.floor(canvas.width / cellSize);
    grid = createGrid(); // Reinitialize grid with random live cells
    ageGrid = createAgeGrid();
    drawGrid();
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas(); // Initial resize to set up the canvas

drawGrid();
update();
