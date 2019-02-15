var $ = function (id) { return document.getElementById(id);};


var gameplay = {

    mark: [],
    rows:0,
    cols:0,
    mines:0,

    start: function()
    {
        var rows = $('rows').value;
        var cols = $('cols').value;
        var mines = $('mines').value;

        gameplay.myBoard = new Board(rows,cols,mines);

        // not sure if needed
        for(let i=0;i<rows;i++) gameplay.mark[i]=[];

        //onclick stuff

    },

    add_cell_to_DOM: function (row, col) {
        var cell = gameplay.grid[row][col],
            id = 'id="cell-'+ row +'-'+ col +'"',
            classname = 'class="cell" ',
            onclick = 'onclick="gameplay.click_cell('+ row +','+ col +')" ',
            oncontext = 'oncontextmenu="gameplay.flag_cell('+ row +','+ col +'); return false"',
            button = ('<button '+ id + classname + onclick
                      + oncontext + '>&nbsp;</button>');

        $('grid').innerHTML += button;
    },

    rightClick: function(row, col)
    {
        myBoard.flag(row,col);
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
                myBoard.reveal(u,v);
                if (myBoard.getNumber(u,v)==0) revealHelper(u,v);
            }
        }
    },

    leftClick: function(row,col)
    {
        if(myBoard.isMine(row,col))
        {
            gameplay.lose(row,col);
        }
        else if(myBoard.getNumber(row,col)==0)
        {
            // initiate mark array
            for(let i=0;i<rows;i++)
            for(let j=0;j<cols;j++) gameplay.mark[i][j]=true;
            //recursive stuff
            revealHelper(row,col);
        }
        else
        {
            myBoard.reveal(row,col);
            gameplay.checkWin();
        }
    },

    reset: function () {
        game.revealed = 0;
        game.start();
    },

    checkWin: function()
    {
        if(myBoard.numRevealed==(rows*cols-mines))
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
