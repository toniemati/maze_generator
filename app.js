/** @type {HTMLCanvasElement} */

import Cell from './Cell.js';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

if (window.innerWidth > window.innerHeight)
  canvas.width = canvas.height = window.innerHeight * 0.9;
else
  canvas.width = canvas.height = window.innerWidth * 0.9;

const userFps = parseInt(prompt('Szybkość: (1-60)'));
const FPS = (userFps > 60 || userFps < 1) ? 1 : userFps;
let lastTime = 0;

const userRows = parseInt(prompt('Wielkość siatki: (3-60)'));
const rows = (userRows < 3 || userRows > 60) ? 3 : userRows;

const cols = rows;
const cellWidth = canvas.width / rows;
const grid = Array(rows).fill().map((row, i) => Array(cols).fill().map((col, j) => new Cell(i, j, cellWidth)));
let current = grid[0][0];
const stack = [];

const loop = (timestamp) => {
  const sec = (timestamp - lastTime) / 1000;
  requestAnimationFrame(loop)
  if (sec < 1 / FPS) return;
  lastTime = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  grid.forEach((row) => {
    row.forEach((col) => {
      col.show(ctx);
    });
  });

  current.visited = true;
  current.highlight(ctx);

  //* STEP 1
  const next = current.checkNeighbors(grid);
  if (next) {

    //* STEP 2
    stack.push(current);

    //* STEP 3
    removeWalls(current, next);

    //* STEP 4
    current = next;
    current.visited = true;
  } else if (stack.length) {
    const cell = stack.pop();
    current = cell;
  }
}

const removeWalls = (a, b) => {
  const x = a.x - b.x;
  const y = a.y - b.y;

  console.log(x, y);

  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;

  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;

  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

loop(0);

window.addEventListener('resize', () => {
  if (window.innerWidth > window.innerHeight)
    canvas.width = canvas.height = window.innerHeight * 0.9;
  else
    canvas.width = canvas.height = window.innerWidth * 0.9;
})