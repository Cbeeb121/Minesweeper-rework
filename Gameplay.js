function win(rows, cols, arr)
{
    let count = 0;
    for(let i = 0; i < cols; i++)
    {
        for(let j = 0; j < rows; j++)
        {
            if(!arr[i][j].isUnCovered())
            {
                count++;
            }
        }
    }
    if(count==numOfBombs)
    {
        return true;
    }
    return false;
}
function lose()
{
    Window.alert("You Lost");
}
function rightClick(row,col,arr)
{
    arr[row][col].flag();
}