var $ = function (id) { return document.getElementById(id);};


var gameplay = {

    rows:0,
    cols:0,
    mines:0,
    myBoard: new Board(1,1,1),
    dx: [-1,-1,0,1,1,1,0,-1],
    dy: [0,1,1,1,0,-1,-1,-1],
    ended:0,

    start: function()
    {
        this.ended = 0;
        this.rows = $('rows').value;
        this.cols = $('cols').value;
        this.mines = $('mines').value;

        this.myBoard = new Board(this.rows,this.cols,this.mines);

        /*console.log(this.rows+" "+this.cols+" "+this.mines);
        for (let i=0;i<this.rows;i++)
        for (let j=0;j<this.cols;j++)
        if (this.myBoard.getNumber(i,j)==-1) console.log(i+" "+j);*/

        gameplay.add_grid();
        //onclick stuff

    },

    add_grid: function () {
        $('grid').innerHTML = '';
        for (let i = 0; i < this.rows; i++) {
            $('grid').innerHTML += '<br>';
            for (let j = 0; j < this.cols; j++) {
                gameplay.add_cell(i, j);
            }
        }
    },

    add_cell: function (row, col) {
        var cell = this.myBoard.getNumber(row,col),
            id = 'id="cell-'+ row +'-'+ col +'"',
            classname = 'class="cell" ',
            onclick = 'onclick="gameplay.leftClick('+ row +','+ col +')" ',
            oncontext = 'oncontextmenu="gameplay.rightClick('+ row +','+ col +'); return false"',
            button = ('<button '+ id + classname + onclick
                      + oncontext + '>&nbsp;</button>');

        $('grid').innerHTML += button;
    },

    rightClick: function(row, col)
    {
        if (this.ended) {
            this.ended++;
            if (this.ended>3) alert("C'mon, the game ended./nThere's nothing you can do.");
            return;
        }
        if (this.myBoard.isRevealed(row,col)) return;
        var id = 'cell-' + row + '-' + col;
        if (this.myBoard.flag(row,col)) {
            $(id).innerHTML = '&#9873';
            $(id).style.color = '#ff0000';
            gameplay.checkWin();
        }
        else {
            $(id).innerHTML = '&nbsp;';
            $(id).style.color = '#000000';
        }
    },

    isInside: function(row, col)
    {
        return(row>=0 && col>=0 && row<this.rows && col<this.cols);
    },

    revealHelper: function(row, col)
    {
        if (!this.myBoard.reveal(row,col)) return;
        if (this.myBoard.getNumber(row,col)!=0) return;
        for(let i=0;i<8;i++) {
            let u = row+this.dx[i];
            let v = col+this.dy[i];
            if (gameplay.isInside(u,v)) gameplay.revealHelper(u,v);
        }
    },

    leftClick: function(row,col)
    {
        if (this.ended) {
            this.ended++;
            if (this.ended>3) alert("C'mon, the game ended. There's nothing you can do.");
            return;
        }
        if (this.myBoard.isFlagged(row,col) || this.myBoard.isRevealed(row,col)) return;
        if (this.myBoard.getNumber(row,col)==-1)
        {
            this.checkLose(row,col);
        }
        else if (this.myBoard.getNumber(row,col)==0)
        {
            //recursive stuff
            gameplay.revealHelper(row,col);
            this.checkWin();
        }
        else
        {
            this.myBoard.reveal(row,col);
            this.checkWin();
        }
    },

    reset: function () {
        gameplay.start();
    },

    checkLose: function () {
        this.ended = 1;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                var id = 'cell-' + i + '-' + j;
                if (this.myBoard.getNumber(i,j) == -1)
                    $(id).innerHTML = '&#9728';
                else
                    $(id).innerHTML = '&#9760';
            }
        }
    },

    checkWin: function()
    {
        if(this.myBoard.getRevealed()==(this.rows*this.cols-this.mines))
        {
            this.ended = 1;
            for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.cols; j++) {
                var id = 'cell-' + i + '-' + j;
                $(id).innerHTML = '&#x2b50';
            }
        }
    }
}

window.onload = function ()
{
    gameplay.start();
}
