class Cell {

  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  highlight = (ctx) => {
    ctx.beginPath();
    ctx.fillStyle = 'hsl(50, 50%, 50%)';
    ctx.arc(
      this.x * this.width + this.width / 2,
      this.y * this.width + this.width / 2,
      this.width / 8,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  checkNeighbors = (grid) => {
    const neighbors = [];

    let top, left, bottom, right;

    if (this.y > 0)
      top = grid[this.x][this.y - 1];
    
    if (this.x < grid.length - 1)
      left = grid[this.x + 1][this.y];

    if (this.y < grid.length - 1)  
      bottom = grid[this.x][this.y + 1];
    
    if (this.x > 0)
      right = grid[this.x - 1][this.y];

    if (top && !top.visited)
      neighbors.push(top);

    if (right && !right.visited)
      neighbors.push(right);

    if (bottom && !bottom.visited)
      neighbors.push(bottom);

    if (left && !left.visited)
      neighbors.push(left);

    if (neighbors.length)
      return neighbors[Math.floor(Math.random() * neighbors.length)];
    else
      return undefined;
  }

  show = (ctx) => {
    ctx.strokeStyle = 'white';

    //* top line
    if (this.walls[0]) {
      ctx.beginPath();
      ctx.moveTo(this.x * this.width, this.y * this.width);
      ctx.lineTo(this.x * this.width + this.width, this.y * this.width);
      ctx.stroke();
    }

    //* right line
    if (this.walls[1]) {
      ctx.beginPath();
      ctx.moveTo(this.x * this.width + this.width, this.y * this.width);
      ctx.lineTo(this.x * this.width + this.width, this.y * this.width + this.width);
      ctx.stroke();
    }

    //* bottom line
    if (this.walls[2]) {
      ctx.beginPath();
      ctx.moveTo(this.x * this.width, this.y * this.width + this.width);
      ctx.lineTo(this.x * this.width + this.width, this.y * this.width + this.width);
      ctx.stroke();
    }

    //* left line
    if (this.walls[3]) {
      ctx.beginPath();
      ctx.moveTo(this.x * this.width, this.y * this.width);
      ctx.lineTo(this.x * this.width, this.y * this.width + this.width);
      ctx.stroke();
    }

    if (this.visited) {
      ctx.fillStyle = 'hsl(255, 50%, 50%, 0.3)';
      ctx.beginPath();
      ctx.rect(
        this.x * this.width,
        this.y * this.width,
        this.width,
        this.width
      );
      ctx.fill();

    }
  }
}

export default Cell;