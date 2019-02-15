class Board {
    constructor(rows, cols, num_mines) {
        this.rows = rows;
        this.cols = cols;
        this.size = rows * cols;
        this.num_mines = num_mines;
        this.mines = [];
        this.tiles = [];
        this.num_revealed = 0;
        this.flags = [];
        this.num_flagged = 0;

        this.setMines();
        this.generateBoard();
        this.generateNumbers();
    }

    setMines() {
        for (let i = 0; i < this.num_mines; i++) {
            let index = Math.floor(Math.random() * this.size);
            if (!this.mines.includes(index)) {
                this.mines.push(index);
            }
        }
    }

    generateBoard() {
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let j = 0; j < this.cols; j++) {
                let index = i * this.cols + j;
                let isMine = this.mines.includes(index);
                row.push(new Tile(0, false, isMine));
            }
            this.tiles.push(row);
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
        if (this.tiles[x][y].getMine()) {
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
                if (this.tiles[x - 1][y - 1].getMine()) {
                    count++;
                }
                // Cell 1
                if (this.tiles[x][y - 1].getMine()) {
                    count++;
                }
            }
            if (x + 1 < this.cols && y - 1 >= 0) {
                // Cell 2
                if (this.tiles[x + 1][y - 1].getMine()) {
                    count++;
                }
                // Cell 3
                if (this.tiles[x + 1][y].getMine()) {
                    count++;
                }
            }
            if (x + 1 < this.cols && y + 1 < this.rows) {
                // Cell 4
                if (this.tiles[x + 1][y + 1].getMine()) {
                    count++;
                }
                // Cell 5
                if (this.tiles[x][y + 1].getMine()) {
                    count++;
                }
            }
            if (x - 1 >= 0 && y + 1 < this.rows) {
                // Cell 6
                if (this.tiles[x - 1][y + 1].getMine()) {
                    count++;
                }
                // Cell 7
                if (this.tiles[x - 1][y].getMine()) {
                    count++;
                }
            }

            this.tiles[x][y].setNumber(count);
        }
    }

    reveal(x, y) {
        this.tiles[x][y].setRevealed(true);

        this.num_revealed++;
    }

    flag(x, y) {
        this.tiles[x][y].setFlag(true);

        this.flags.push(y * cols + x);

        this.num_flagged++;
    }

    getNumber(x, y) {
        return this.tiles[x][y].getNumber();
    }
};
