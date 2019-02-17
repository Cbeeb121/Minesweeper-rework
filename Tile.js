class Tile {
    //constructor
    constructor(newNumber, newFlag)
    {
        this.number = newNumber;
        this.flag = newFlag;
        this.revealed = false;
    }

    //  set number
    setNumber(num)
    {
        this.number = num;
    }

    //get number
    get getNumber()
    {
        return this.number;
    }

    //set flag
    setFlag(flagStatus)
    {
        this.flag = flagStatus;
    }

    //get flag
    get getFlag()
    {
        return this.flag;
    }

    //set mine
    setMine()
    {
        this.number = -1;
    }

    //check mine
    isMine()
    {
        return (this.number==-1);
    }

    //set revealed
    setRevealed(revealedStatus)
    {
        this.revealed = revealedStatus;
    }

    //get revealed
    get getRevealed()
    {
        return this.revealed;
    }
}
