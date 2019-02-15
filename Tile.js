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
  set number(num)
  {
    this.number = num;
  }

  //get number
  get number()
  {
    return this.number;
  }

  //set flag
  set flag(flagStatus)
  {
    this.flag = flagStatus;
  }

  //get flag
  get flag()
  {
    return this.flag;
  }

  //setMine
  set mine(mineStatus)
  {
    this.mine = mineStatus;
  }

  //get mine
  get mine()
  {
    return this.mine;
  }

  //set revealed
  set revealed(revealedStatus)
  {
    this.revealed = revealedStatus;
  }

  //get revealed
  get revealed()
  {
    return this.revealed;
  }
}
