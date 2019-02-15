class Tile {
  //constructor
  constructor(newNumber, newFlag, newMine)
  {
    this.number = newNumber;
    this.flag = newFlag;
    this.mine = newMine;
    this.revealed = false;
  }

  //getNum
  get number()
  {
    return this.number;
  }

  //isFlag
  isFlag()
  {
    return this.flag;
  }

  //isBomb
  isMine()
  {
    return this.mine;
  }

  //isUncovered
  isRevealed()
  {
    return this.revealed;
  }
}
