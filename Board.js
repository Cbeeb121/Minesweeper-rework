class Board {
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

    generateBoard() {
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let i = 0; i < this.cols; i++) row.push(new Tile(0, false));
            this.tiles.push(row);
        }
        this.setMines();
    }

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

    generateNumbers() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.calculateNumber(i, j);
            }
        }
    }

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

    isInside(row, col) {
        return(row>=0 && col>=0 && row<this.rows && col<this.cols);
    }


    reveal(x, y) {
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

    isRevealed(x, y) {
        return (this.tiles[x][y].getRevealed);
    }

    flag(x, y) {
        if (this.tiles[x][y].getFlag) {
            this.tiles[x][y].setFlag(false);
            this.num_flagged--;
        }
        else {
          if (this.num_flagged<this.num_mines) {
              this.tiles[x][y].setFlag(true);
              this.num_flagged++;
              return true;
          }
          else alert("No more flags available")
        }
        return false;
    }

    isFlagged(x, y) {
        return (this.tiles[x][y].getFlag);
    }

    getNumber(x, y) {
        return this.tiles[x][y].getNumber;
    }

    getRevealed() {
        return this.num_revealed;
    }
};
