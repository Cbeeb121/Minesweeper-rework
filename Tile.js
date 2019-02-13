class Tile
{
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
  const function isFlag()
  {
    return this.flag;
  }

  //isBomb
  const function isMine()
  {
    return this.mine;
  }

  //isUncovered
  const function isRevealed()
  {
    return this.revealed;
  }
}
