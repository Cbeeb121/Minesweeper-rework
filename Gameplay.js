var gamepalay = {
    var dx = [-1,-1,0,1,1,1,0,-1];
    var dy = [0,1,1,1,0,-1,-1,-1];
    var mark = [];

    start: function()
    {
        this.rows = $('rows').value;
        this.cols = $('cols').value;
        this.mines = $('mines').value;

        this.myBoard = new Board(rows,cols,mines);

        // not sure if needed
        for(let i=0;i<rows;i++) mark[i]=[];

        //onclick stuff

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
        mark[row,col]=false;
        for(let i=1;i<=8,i++) {
            let u = row+dx[i];
            let v = col+dy[i];
            if (isInside(u,v) && mark[u][v]) {
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
            for(let j=0;j<cols;j++) mark[i][j]=true;
            //recursive stuff
            revealHelper(row,col);
        }
        else
        {
            myBoard.reveal(row,col);
            myBoard.checkWin();
        }
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
