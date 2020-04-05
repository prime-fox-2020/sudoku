"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardStr = board_string;
  }

  solve() {
    let res = [];


    for (let i = 0; i < this.boardStr.length; i++) {
      if (this.boardStr[i]=== "0") {
        res.push(i);
      }
    }

    let i = 0;
    while (i < res.length) {
      let row = Math.floor(res[i]/9);
      let col = res[i] - row*9;
      let arr = this.createBoard();
      let start = 0;
      if (arr[row][col] != 0) {
        start = parseInt(arr[row][col]);
      }

      for (let j = start+1; j <= 10; j++) {
        if (j == 10) {
          let temp = this.boardStr.split("");
          temp[res[i]] = 0;
          this.boardStr = temp.join("");
          i--;
          break;
        }

        let flag = this.checkPosibility(row, col, j)
      // if (this.checkCol(row, col, j) == true && this.checkRow(row,col, j) == true && this.checkBox(row, col, j) == true) {
        if(flag) {
          let tempor = this.boardStr.split("");
          tempor[res[i]] = j;
          this.boardStr = tempor.join("");
          i++
          break;
        }
      }
    }
  }

  // Returns a string representing the current state of the board
  board() {
    let temp = "";
    for (let i = 0; i < this.boardStr.length; i++) {
      temp += ` ${this.boardStr[i]}`;
      if ((i+1)%3 === 0) {
        temp += " | ";
      }
      if ((i+1)%9===0) {
        temp += "\n"
      }
      if ((i+1)%27 === 0) {
        temp += "--------------------------\n" ;
      }
    }
    return temp;
  }

  createBoard() {
      let showBoard = [];
      let temp =[];

      for (let i = 0; i < this.boardStr.length; i++) {
        temp.push(this.boardStr[i]);
        if ((i+1)% 9 === 0) {
          showBoard.push(temp)
          temp = [];
        }
      }
    return showBoard;
  }

  checkRow (row, num) {
  let board = this.createBoard();

    for(let i = 0; i < board.length; i++){
      if(board[row][i] === num){
        return false;
        break;
      }
    }
  return true;
  }

  checkCol(col, num) {
    let board = this.createBoard();

    for (let i = 0; i < board.length; i++) {
      if (board[i][col]=== num) {
        return false;
        break;
      }
    }
    return true;
  }

  checkBox(col, row, num) {
    let board = this.createBoard();
    let sRow = row;
    let sCol = col;

    while(sRow % 3 !== 0){
      sRow--;
    }
    while(sCol % 3 !== 0){
      sCol--;
    }

    for (let i = sRow; i < sRow + 3; i++) {
      for (let j = sCol; j < sCol + 3; j++) {
        if (board[i][j]=== num) {
          return false;
          break;
        }
      }
    }
    return true;
  }

  checkPosibility(row, col, angka){
   if(this.checkRow(row,col,angka) && this.checkBox(row,col,angka) && this.checkCol(row,col,angka)){
     return true
   }
   else{
     return false
   }
 }

  // =========END============
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"
// console.log("BEFORE");
console.log(game.board());

game.solve();
// console.log("AFTER");
console.log(game.board());
