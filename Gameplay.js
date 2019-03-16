/**
 * @file Gameplay.js interacts with the html file and does most of the computation.
 * @author Ryan Pope, Giang Nguyen, Hirsh Guha, Jordan Love, John Quitno
 *
 */
var $ = function (id) { return document.getElementById(id);};

//a bool to signal when the reveal powerup is selected.
let reveal_powerup = false;
//a bool to signal when the invincibility powerup is selected
let invincibility_powerup = false;
let photo_bank =
{
  0: "click",
  1: "success",
  2: "doge",
  3: "flag"
};
let r_photo_bank =
{
  0: "bomb",
  1: "drake",
  2: "simply",
  3: "kermit",
  4: "dark",
  5: "bf"
};
//function to check if reveal powerup is enabled.
let revealEnabled = function()
{
  let PowerupString = document.getElementById("RevealQuantity_Attach").value;
  let PowerupNum = parseInt(PowerupString,10);
//  window.alert(PowerupNum);
  if(document.getElementById("RevealCheckbox").checked && PowerupNum > 0)
  {
    return true;
  }
  else
  {
    return false;
  }
}

//function checking if invincibility powerup is enabled
let invincibilityEnabled = function()
{
  let invincibilityString = document.getElementById("InvincibilityQuantity_Attach").value;
  let InvincibilityRemain = parseInt(invincibilityString, 10);

  if (document.getElementById("InvincibilityCheckbox").checked && InvincibilityRemain > 0) {
    return true;
  }
  else {
    return false;
  }
}

var gameplay = {

    rows:0,
    cols:0,
    mines:0,
    myBoard: new Board(1,1,1),
    dx: [-1,-1,0,1,1,1,0,-1],
    dy: [0,1,1,1,0,-1,-1,-1],
    ended:0,

    /**
        * Gets and verify the data from the html file, calls the board constructor then adds the .
        */
    start: function()
    {
        this.ended = 0;
        this.rows = $('rows').value;
        this.cols = $('cols').value;
        this.mines = $('mines').value;

        if (this.mines>=this.rows*this.cols) {
            alert("Too many mines!!! The maximum number of mines for this board is "+(this.rows*this.cols-1));
            return;
        }
        if (this.rows <2) {
            alert("The board must have at least 2 rows.");
            return;
        }
        if (this.cols <2) {
            alert("The board must have at least 2 columns.");
            return;
        }
        if (this.mines < 1) {
            alert("You need at least one mine!")
            return;
        }

        this.myBoard = new Board(this.rows,this.cols,this.mines);

        /*console.log(this.rows+" "+this.cols+" "+this.mines);
        for (let i=0;i<this.rows;i++)
        for (let j=0;j<this.cols;j++)
        if (this.myBoard.getNumber(i,j)==-1) console.log(i+" "+j);*/

        gameplay.add_grid();
        //onclick stuff

    },
    /**
        * Adds the grid of the correct size to the html file.
        */
    add_grid: function () {
        $('grid').innerHTML = '';
        for (let i = 0; i < this.rows; i++) {
            $('grid').innerHTML += '<br>';
            for (let j = 0; j < this.cols; j++) {
                gameplay.add_cell(i, j);
            }
        }
    },
    /**
        * Adds an individual cell to our grid.
        * @param {number} row - The row of the cell being added.
        * @param {number} column - The column of the cell being added.
        */
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
    /**
        * Flags a tile.
        * @param {number} row - The row of the Tile.
        * @param {number} column - The column of the Tile.
        */
    rightClick: function(row, col)
    {
      image.src = photo_bank[3] + ".jpg"
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
    /**
        * Returns true iff the given row and col are in the board.
        * @param {number} row - The row of the tile.
        * @param {number} col - The column of the tile.
        * @return {bool} - Returns true or false depending onn whether the coordinates are valid.
        */
    isInside: function(row, col)
    {
        return(row>=0 && col>=0 && row<this.rows && col<this.cols);
    },
    /**
        * Recursive function that reveals all tiles not next to a mine.
        * @param {number} row - The row of the tile.
        * @param {number} col - The column of the tile..
        */
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
    /**
        * Handles when a user left clicks and changes the board and game state accordingly..
        * @param {number} row - The row of the tile.
        * @param {number} col - The column of the tile..
        */


    //Evan - Building into this function.
    //Function will first check if the reveal powerup is enabled.
    //if it is, this function will look very different.
    //if not, proceed as usual.
    leftClick: function(row,col)
    {

        if (this.ended) {
            this.ended++;
            if (this.ended>3) alert("C'mon, the game ended. There's nothing you can do.");
            return;
        }

        if(revealEnabled())
        {
          //then we do not do the regular left click, but rather reveal.

          //we will reveal a 3x3 set of tiles.

          //deduct one powerup
          let PowerupString = document.getElementById("RevealQuantity_Attach").value;
          let PowerupNum = parseInt(PowerupString,10);
          PowerupNum--;
          let UpdateStr = "Reveals remaining: " + PowerupNum;
          document.getElementById("RevealQuantity_Attach").value = PowerupNum;
          document.getElementById("RevealQuantity").innerHTML = UpdateStr;
          if(PowerupNum < 1)
          {
            document.getElementById("RevealCheckbox").checked = false;
            document.getElementById("RevealCheckbox").disabled = true;
            window.alert("This is your last REVEAL powerup.");
          }
          //center
          this.myBoard.reveal(row,col,true);
          //left
          if(this.myBoard.isInside(row-1,col))
          {
            this.myBoard.reveal(row-1,col, true);
          }
          //right
          if(this.myBoard.isInside(row+1,col))
          {
            this.myBoard.reveal(row+1,col, true);
          }
          //up
          if(this.myBoard.isInside(row,col+1))
          {
            this.myBoard.reveal(row,col+1, true)
          }
          //down
          if(this.myBoard.isInside(row,col-1))
          {
            this.myBoard.reveal(row,col-1, true)
          }
          //down left
          if(this.myBoard.isInside(row-1,col-1))
          {
            this.myBoard.reveal(row-1,col-1, true)
          }
          //down right
          if(this.myBoard.isInside(row+1,col-1))
          {
            this.myBoard.reveal(row+1,col-1, true)
          }
          //up left
          if(this.myBoard.isInside(row-1,col+1))
          {
            this.myBoard.reveal(row-1,col+1, true)
          }
          //up right
          if(this.myBoard.isInside(row+1,col+1))
          {
            this.myBoard.reveal(row+1,col+1, true)
          }

//window.alert(this);
let obj = this;
          //wait here
           let r = function(row, col, obj)
          {
            //window.alert(obj);
            //center
            if(!obj.myBoard.isRevealed(row,col))
            {
                obj.myBoard.hide(row,col);
            }

            //left
            if(obj.myBoard.isInside(row-1,col) && !(obj.myBoard.isRevealed(row-1,col)) && !(obj.myBoard.isFlagged(row-1,col)))
            {
              //window.alert("in");
              obj.myBoard.hide(row-1,col);
            }
            //right
            if(obj.myBoard.isInside(row+1,col) && !(obj.myBoard.isRevealed(row+1,col))  && !(obj.myBoard.isFlagged(row+1,col)))
            {
              obj.myBoard.hide(row+1,col);
            }
            //up
            if(obj.myBoard.isInside(row,col+1) && !(obj.myBoard.isRevealed(row,col+1))  && !(obj.myBoard.isFlagged(row,col+1)))
            {
              obj.myBoard.hide(row,col+1);
            }
            //down
            if(obj.myBoard.isInside(row,col-1) && !(obj.myBoard.isRevealed(row,col-1))  && !(obj.myBoard.isFlagged(row,col-1)))
            {
              obj.myBoard.hide(row,col-1);
            }
            //down left
            if(obj.myBoard.isInside(row-1,col-1) && !(obj.myBoard.isRevealed(row-1,col-1)) && !(obj.myBoard.isFlagged(row-1,col-1)))
            {
              obj.myBoard.hide(row-1,col-1);
            }
            //down right
            if(obj.myBoard.isInside(row+1,col-1) && !(obj.myBoard.isRevealed(row+1,col-1))  && !(obj.myBoard.isFlagged(row+1,col-1)))
            {
              obj.myBoard.hide(row+1,col-1);
            }
            //up left
            if(obj.myBoard.isInside(row-1,col+1) && !(obj.myBoard.isRevealed(row-1,col+1))  && !(obj.myBoard.isFlagged(row-1,col+1)))
            {
              obj.myBoard.hide(row-1,col+1);
            }
            //up right
            if(obj.myBoard.isInside(row+1,col+1) && !(obj.myBoard.isRevealed(row+1,col+1))  && !(obj.myBoard.isFlagged(row+1,col+1)))
            {
              obj.myBoard.hide(row+1,col+1);
            }

          }

let p = setTimeout(function(){r(row, col, obj);},3000);
//p();
          //wait a 3 seconds then undo the reveal.
          //var myvar = setTimeout(hideClick(row,col),1000);
          //if(this.myBoard.isInside(row+1,col+1))
          //{
          //  this.myBoard.hide(row+1,col+1)
        //  }
        }
        else {
          if (this.myBoard.isFlagged(row,col) || this.myBoard.isRevealed(row,col)) return;
          if (this.myBoard.getNumber(row,col) == -1 && invincibilityEnabled())
          {
            //decrement one powerup on conditions that bomb is clicked and checkbox is enabled
            this.ended = 0;
            freeBomb = 'cell-' + row + '-' + col;
            let invincibilityString = document.getElementById("InvincibilityQuantity_Attach").value;
            let InvincibilityRemain = parseInt(invincibilityString,10);
            InvincibilityRemain--;
            let newQuantity = "Invincibilities remaining: " + InvincibilityRemain;
            document.getElementById("InvincibilityQuantity_Attach").value = InvincibilityRemain;
            document.getElementById("InvincibilityQuantity").innerHTML = newQuantity;
            if(InvincibilityRemain < 1)
            {
              document.getElementById("InvincibilityCheckbox").checked = false;
              document.getElementById("InvincibilityCheckbox").disabled = true;
              window.alert("You have no invincibility powerups remaining");
            }
            $(freeBomb).style.backgroundColor = '#ff0000';
            $(freeBomb).innerHTML = '&#9728';
            return;
          }
          else if (this.myBoard.getNumber(row,col)==-1 && !invincibilityEnabled())
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
        }


    },
    /**
        * Resets the board.
        */
    reset: function () {
        gameplay.start();
        image.src = photo_bank[0] + ".jpg"
    },
    /**
        * Checks if a bomb was clicked, and stops the game if so
        */
    checkLose: function () {

        this.ended = 1;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                var id = 'cell-' + i + '-' + j;
                if (this.myBoard.getNumber(i,j) == -1) {
                  $(id).style.backgroundColor = '#ff0000';
                  $(id).innerHTML = '&#9728';
                  image.src = photo_bank[2] + ".jpg"

                }
                else{
                    $(id).style.backgroundColor = '#ccc';
                    $(id).innerHTML = '&#9760';
                }
            }
        }
    },
    /**
        * Checks the number of revealed squares to figure out if the game was won and alerts the user accordingly.
        */
    checkWin: function()
    {
        if(this.myBoard.getRevealed()==(this.rows*this.cols-this.mines))
        {
            this.ended = 1;
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    var id = 'cell-' + i + '-' + j;

                    if (this.myBoard.getNumber(i,j) == -1)
                    {
                        $(id).style.color = '#000000';
                        $(id).style.backgroundColor = '#00FF00';
                        $(id).innerHTML = '&#9728';
                        image.src = photo_bank[1] + ".jpg"
                    }
                    else{
                        $(id).style.backgroundColor = '#ccc';
                        $(id).innerHTML = '&#x2b50';
                    }
                }
            }
        }
    }
}
    /**
        * Starts the game when the window is loaded.
        */
window.onload = function ()
{
    gameplay.start();
}
