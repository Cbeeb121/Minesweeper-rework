var gamepalay = {
    start: function()
    {
        var rows = $('rows').value,
            cols = $('cols').value,
            mines = $('mines').value

        let myBoard = new Board(rows,cols,mines);
        //onclick stuff

    }


    rightClick: function(row, col)
    {
        myBoard.flag(row,col);
    }

    leftClick: function(row,col)
    {
        if(myBoard.isMine(row,col))
        {
            gameplay.lose();
        }
        else if(myBoard.getNumber(row,col)==0)
        {
            //recursive stuff
        }
        else
        {
            myBoard.reveal(row,col)
        }
    }
    
}

window.onload = function () 
{
    gameplay.start();
}