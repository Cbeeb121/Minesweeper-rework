class Tile {

  //constructor
  constructor(newNumber, newFlag, newMine)
  {
    this.number = newNumber;
    this.flag = newFlag;
    this.mine = newMine;
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

  //setMine
  setMine(mineStatus)
  {
    this.mine = mineStatus;
  }

  //get mine
  get getMine()
  {
    return this.mine;
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
