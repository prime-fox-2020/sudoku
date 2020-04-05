"use strict"

class Sudoku {
  constructor(board_string) {
    this._boardString = this.boardArray(board_string);
    this._boardArr    = this._boardString;
    this._boardEmpty  = this.unAssigned();
  }

  get boardArr(){
    return this._boardArr;
  }
  set boardArr(val){
    this._boardArr = val;
  }
  get boardEmpty(){
    return this._boardEmpty;
  }
  set boardEmpty(val){
    this._boardEmpty = val;
  }

  boardArray(boardString){
    const arr = []
    let index = 0;
    for(let i = 0; i < 9; i++){
      const row = [];
      for(let j = 0; j < 9; j++){
        row.push(Number(boardString[index]));
        index++;
      }
      arr.push(row);
    }
    return arr;
  }

  unAssigned(){
    const empty = [];
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(this.boardArr[i][j] === 0) empty.push([i,j]);
      }
    }
    return empty;
  }

  usedHorizontal(row, num){
    for(let col = 0; col < 9; col++){
      if(this.boardArr[row][col] === num) return true;
    }
    return false;
  }

  usedVertical(col, num){
    for(let row = 0; row < 9; row++){
      if(this.boardArr[row][col] === num) return true;
    }
    return false;
  }

  usedInBox(boxRow, boxCol, num){
    boxRow = Math.floor(boxRow/3) * 3;
    boxCol = Math.floor(boxCol/3) * 3;

    for (let row = 0; row < 3; row++){
      for (let col = 0; col < 3; col++){
        if (this.boardArr[row + boxRow] [col + boxCol] === num) return true; 
      }
    } 
    return false; 
  } 

  isSafe(row, col, num){
    return (!this.usedHorizontal(row, num) && !this.usedVertical(col, num) && !this.usedInBox(row, col, num))
  }

  solvedYet(){
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(this.boardArr[i][j] === 0) return false
      }
    }
    return true;
  }
  
  solve(empty = 0) {
    const {boardArr, boardEmpty} = this;
    //Finishing Recursion when there is no 0 in the board anymore
    if(this.solvedYet()) return;
    //make animation with frame change every 500 milisecond
    this.displayAnimation(500);
    //took row and colom that was saved in boardEmpty
    let row = boardEmpty[empty][0];
    let col = boardEmpty[empty][1];
    let num = boardArr[row][col];
    //Checking for avability of num 
    while (num < 10) {
      //going foward if there is no problem with checking
      if (this.isSafe(row, col, num)) {
        boardArr[row][col] = num;
        empty++;
        break;
      }
      //going backward when there is something wrong
      if (num === 9) {
        boardArr[row][col] = 0;
        empty--;
      }
      num++;
    }
    return this.solve(empty)
  }

  // Returns a string representing the current state of the board
  board() {
    let displayStr = `=========================\n`;
    for (let i = 0; i < 9; i++) {
      let row = '| ';
      for (let j = 0; j < 9; j++) {
        row += this.boardArr[i][j];
        
        if (j === 2 || j === 5 || j === 8) {
          row += ' | '
        } else {
          row += ' '
        }
      }
      displayStr += `${row}\n`
      
      if (i === 2 || i === 5 || i === 8) {
        displayStr += `=========================\n`
      }
    }
    console.log(displayStr);
  }

  displayAnimation(timer){
    this.board();
    sleep(timer);
    console.clear();
  }
}

function sleep (milliseconds) {
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]
var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

game.board();
