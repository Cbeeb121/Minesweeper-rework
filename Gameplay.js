var $ = function (id) { return document.getElementById(id);};


var gameplay = {

    mark: [],
    rows:0,
    cols:0,
    mines:0,
    numRevealed:0,
    myBoard: new Board(1,1,1),

    start: function()
    {
        this.rows = $('rows').value;
        this.cols = $('cols').value;
        this.mines = $('mines').value;

        gameplay.myBoard = new Board(this.rows,this.cols,this.mines);

        // not sure if needed
        for(let i=0;i<this.rows;i++) gameplay.mark[i]=[];

        gameplay.add_grid();
        //onclick stuff

    },

    add_grid: function () {
        $('grid').innerHTML = '';
        for (var i = 0; i < this.rows; i++) {
            $('grid').innerHTML += '<br>';
            for (var j = 0; j < this.cols; j++) {
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
        var id = 'cell-' + row + '-' + col;
        if ($(id).innerHTML === '&nbsp;') {
            $(id).innerHTML = '&#9873';
            $(id).style.color = '#ff0000';
        } else {
            if ($(id).innerHTML = '&#9873') {
                $(id).innerHTML = '&nbsp;';
            }
        }
    },

    isInside: function(row, col)
    {
        return(row>=0 && col>=0 && row<rows && col<cols);
    },

    revealHelper: function(row, col)
    {
        var dx = [-1,-1,0,1,1,1,0,-1];
        var dy = [0,1,1,1,0,-1,-1,-1];

        gameplay.mark[row,col]=false;
        for(let i=1;i<=8;i++) {
            let u = row+dx[i];
            let v = col+dy[i];
            if (isInside(u,v) && gameplay.mark[u][v]) {
                this.myBoard.reveal(u,v);
                if (this.myBoard.getNumber(u,v)==0) revealHelper(u,v);
            }
        }
    },

    leftClick: function(row,col)
    {
        if(this.myBoard.isMine(row,col))
        {
            gameplay.lose(row,col);
        }
        else if(this.myBoard.getNumber(row,col)==0)
        {
            // initiate mark array
            for(let i=0;i<rows;i++)
            for(let j=0;j<cols;j++) gameplay.mark[i][j]=true;
            //recursive stuff
            revealHelper(row,col);
        }
        else
        {
            this.myBoard.reveal(row,col);
            numRevealed++;
            gameplay.checkWin();
        }
    },

    reset: function () {
        gameplay.start();
    },

    checkWin: function()
    {
        if(this.myBoard.numRevealed==(this.rows*this.cols-this.mines))
        {
            alert("You Win!!!!!!!!!");
            gameplay.start();
        }
    }
}

window.onload = function ()
{
    gameplay.start();
}
