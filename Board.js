class Board extends gameplay{
    constructor(rows, cols, num_mines) {
        this.rows = rows;
        this.cols = cols;
        this.size = rows * cols;
        this.num_mines = num_mines;
        this.mines = [];
        this.tiles = [];
        this.num_revealed = 0;

        this.setMines();
        this.generateBoard();
        this.generateNumbers();
    },

    setMines: function() {
        for (let i = 0; i < this.num_mines; i++) {
            let index = Math.floor(Math.random() * size);
            if (!this.mines.includes(index)) {
                this.mines.push(index);
            }
        }
    },

    generateBoard: function() {
        for (let i = 0; i < this.rows; i++) {
            row = [];
            for (let j = 0; j < this.cols; j++) {
                let index = i * this.cols + j;
                let isMine = this.mines.includes(index);
                row.push(new Tile(isMine));
            }
            this.tiles.push(row);
        }
    },

    generateNumbers: function() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.calculateNumber(i, j);
            }
        }
    },

    calculateNumber: function(x, y) {
        if (this.tiles[x][y].isMine()) {
            this.tiles[x][y].setNumber(-1);
            return;
        } else {
            let count = 0;
            // Board Layout:
            //  | 0 | 1 | 2 |
            //  | 7 | t | 3 |
            //  | 6 | 5 | 4 |
            if (x - 1 >= 0 && y - 1 >= 0) {
                // Cell 0
                if (this.tiles[x - 1][y - 1].isMine()) {
                    count++;
                }
                // Cell 1
                if (this.tiles[x][y - 1].isMine()) {
                    count++;
                }
            }
            if (x + 1 < this.cols && y - 1 >= 0) {
                // Cell 2
                if (this.tiles[x + 1][y - 1].isMine()) {
                    count++;
                }
                // Cell 3
                if (this.tiles[x + 1][y].isMine()) {
                    count++;
                }
            }
            if (x + 1 < this.cols && y + 1 < this.rows) {
                // Cell 4
                if (this.tiles[x + 1][y + 1].isMine()) {
                    count++;
                }
                // Cell 5
                if (this.tiles[x][y + 1].isMine()) {
                    count++;
                }
            }
            if (x - 1 >= 0 && y + 1 < this.rows) {
                // Cell 6
                if (this.tiles[x - 1][y + 1].isMine()) {
                    count++;
                }
                // Cell 7
                if (this.tiles[x - 1][y].isMine()) {
                    count++;
                }
            }

            this.tiles[x][y].setNumber(count);
        }
    },

};
