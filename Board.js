/**
 * @file Board class that holds and manuipulates board data and interacts with Tile.js and Gameplay.js.
 * @author Ryan Pope, Giang Nguyen, Hirsh Guha, Jordan Love, John Quitno
 * @contributors Evan Gofourth, Clay Beabout, Alex Johnson, Sandy Rech
 *
 */
class Board {
    /**
        * Creates the board.
        * @constructor
        * @param {number} rows - The number of rows in the grid.
        * @param {number} cols - The number of columns in the grid..
        * @param {number} num_mines - The number of randomly placed mines.
        */
    constructor(rows, cols, num_mines) {
        this.rows = rows;
        this.cols = cols;
        this.num_mines = num_mines;
        this.tiles = [];
        this.num_revealed = 0;
        this.num_flagged = 0;

        this.generateBoard();
        this.generateNumbers();
    }
    /**
        * Generates the board by using the Tile constructor at each postition.
        */
    generateBoard() {
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let i = 0; i < this.cols; i++) row.push(new Tile(0, false));
            this.tiles.push(row);
        }
        this.setMines();
    }
    /**
        * Randomly places mines on the board.
        */
    setMines() {
        for (let i = 0; i < this.num_mines; i++) {
            do {
                var row = Math.floor(Math.random() * this.rows);
                var col = Math.floor(Math.random() * this.cols);
            }
            while (this.tiles[row][col].isMine());
            this.tiles[row][col].setMine();
        }
    }
    /**
        * Sets the number for each postiion depending on how many mines are directly adjacent to each tile.
        */
    generateNumbers() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.calculateNumber(i, j);
            }
        }
    }
    /**
        * Sets the number for each postiion depending on how many mines are directly adjacent to each tile.
        * @param {number} - The x coordinate of a Tile.
        * @param {number} - The y coordinate of a Tile.
        */

    calculateNumber(x, y) {
        var dx = [-1,-1,0,1,1,1,0,-1];
        var dy = [0,1,1,1,0,-1,-1,-1];

        if (!this.tiles[x][y].isMine()) {
            let count = 0;

            for(let i=0;i<8;i++) {
                let u = x+dx[i];
                let v = y+dy[i];
                if (this.isInside(u,v) && this.tiles[u][v].isMine()) count++;
            }
            this.tiles[x][y].setNumber(count);
        }
    }
    /**
        * Returns a bool indicating whether the x,y position is in the board.
        * @param {number} - The x coordinate of a Tile.
        * @param {number} - The y coordinate of a Tile.
        * @return {bool} - returns a bool indicating whether the x,y position is in the board.
        */
    isInside(row, col) {
        return(row>=0 && col>=0 && row<this.rows && col<this.cols);
    }


    /**
        * Reveals a tile if it hasn't been revealed yet and returns true or false depending on whether or not it has.
        * @param {number} - The x coordinate of a Tile.
        * @param {number} - The y coordinate of a Tile.
        * @param {bool} - tempBool - indicates whether the reveal is temporary (as in for a powerup) or not.
        * @return {bool} - returns a bool indicating if the tile has been previously revealed .
        */
    reveal(x, y, tempBool = false) {
if(tempBool)
{
  if (this.tiles[x][y].getRevealed || this.tiles[x][y].getFlag) return false;

  var id = 'cell-' + x + '-' + y;


  if(this.tiles[x][y].number == -1)
  {
    $(id).style.backgroundColor = '#ff0000';
    $(id).innerHTML = '&#9728';
    return true;
  }


  //some colorful styling!!
  switch (this.tiles[x][y].getNumber) {
      case 1:
          $(id).style.color = 'blue'; break;
      case 2:
          $(id).style.color = 'green'; break;
      case 3:
          $(id).style.color = 'red'; break;
      case 4:
          $(id).style.color = 'purple'; break;
      default:
          $(id).style.color = 'black'; break;
  }
  $(id).style.background = '#EEE';
  if (this.tiles[x][y].getNumber!=0)
      $(id).innerHTML = this.tiles[x][y].getNumber;

  return true;
}
else
{
  if (this.tiles[x][y].getRevealed || this.tiles[x][y].getFlag) return false;

  var id = 'cell-' + x + '-' + y;

  //some colorful styling!!
  switch (this.tiles[x][y].getNumber) {
      case 1:
          $(id).style.color = 'blue'; break;
      case 2:
          $(id).style.color = 'green'; break;
      case 3:
          $(id).style.color = 'red'; break;
      case 4:
          $(id).style.color = 'purple'; break;
      default:
          $(id).style.color = 'black'; break;
  }
  $(id).style.background = '#EEE';
  if (this.tiles[x][y].getNumber!=0)
      $(id).innerHTML = this.tiles[x][y].getNumber;

  this.tiles[x][y].setRevealed(true);
  this.num_revealed++;
  return true;
}


    }

    /**
    * for the sake of reveal powerup and cheatmode, it has become necessary to create a "hide"
    * method. This method will return the tile clicked referenced back to its normal hidden state.
    * @param {number} row - the row number of the tile to hide.
    * @param {number} col - the column number of the tile to hide.
    */
    hide(row,col)
    {

      var id = 'cell-' + row + '-' + col;

          $(id).style.backgroundColor = '#666';
          $(id).innerHTML = '&nbsp';

    }
    /**
    * a specialized hide method for hiding tiles that have flags on them.
    * @param {number} row - the row number of the tile to hide.
    * @param {number} col - the column number of the tile to hide.
    */
    flagHide(row, col)
    {
      var id = 'cell-' + row + '-' + col;

      $(id).innerHTML = '&#9873';
      $(id).style.color = '#ff0000';
    }
    /**
        * Returns true or false depending on whether or not it has been revealed.
        * @param {number} - The x coordinate of a Tile.
        * @param {number} - The y coordinate of a Tile.
        * @return {bool} - returns a bool indicating if the tile has been previously revealed .
        */
    isRevealed(x, y) {
        return (this.tiles[x][y].getRevealed);
    }
    /**
        * Flags a tile if it has't been flagged, and unflag it if it has.
        * @param {number} - The x coordinate of a Tile.
        * @param {number} - The y coordinate of a Tile.
        * @return {bool} - returns a bool indicating the position has been flagged.
        */
    flag(x, y) {
        if (this.tiles[x][y].getFlag) {
            this.tiles[x][y].setFlag(false);
            this.num_flagged--;
        }
        else {
              this.tiles[x][y].setFlag(true);
              this.num_flagged++;
              return true;
        }
        return false;
    }
    /**
        * Returns true or false depending on whether or not it has been flagged.
        * @param {number} - The x coordinate of a Tile.
        * @param {number} - The y coordinate of a Tile.
        * @return {bool} - returns a bool indicating if the tile has been previously flagged .
        */
    isFlagged(x, y) {
        return (this.tiles[x][y].getFlag);
    }
    /**
        * returns the number of bombs surrounding a tile.
        * @param {number} - The x coordinate of a Tile.
        * @param {number} - The y coordinate of a Tile.
        * @return {number} - returns the number of bombs surrounding a tile .
        */
    getNumber(x, y) {
        return this.tiles[x][y].getNumber;
    }
    /**
        * returns the number of revealed tiles..
        * @param {number} - The x coordinate of a Tile.
        * @param {number} - The y coordinate of a Tile.
        * @return {number} - returns the number of revealed tiles..
        */
    getRevealed() {
        return this.num_revealed;
    }
};
