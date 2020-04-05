"use strict"

class Sudoku {
  constructor(board_string) {
    this.strBoard = board_string;
    this.solv = this.createArrBoard(this.strBoard);
  }

  solve() {
    let board = this.solv;
    let find = this.findIndex(board);
    if (!find) {
      return true;
    } else {
      var [row, column] = find;
    }
    for (let i = 1; i < 10; i++) {
      if (this.check(board, row, column, i)) {
        board[row][column] = i; 
        if (this.solve()) {
          return true;
        }
        board[row][column] = 0;
      }
    }
    this.solv = board;
    return false;
  }

  check(board, row, column, num) {
    //row
    for (let i = 0; i < board[0].length; i++) {
      if (board[row][i] == num) {
        return false;
      }
    }

    //column
    for (let i = 0; i < board.length; i++) {
      if (board[i][column] == num) {
        return false;
      } 
    }

    //box
    let boxRow = Math.floor(row/3)*3;
    let boxCol = Math.floor(column/3)*3;
    for (let i = boxRow; i < boxRow+3; i++) {
      for (let j = boxCol; j < boxCol+3; j++) {
        if (board[i][j] == num) {
          return false;
        }
      }
    }
    return true;
  }

  findIndex(board) {
    //find empty cell
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] == 0) {
          return [i,j];
        }
      }
    }
    return false;
  }

  createArrBoard(strBoard) {
    let arrBoard = strBoard.split('');
    let board = [];
    let temp = [];
    
    //fill board
    for (let i = 0; i < arrBoard.length; i++) {
      temp.push(arrBoard[i]);
      if ((i+1)%9 == 0) {
        board.push(temp);
        temp = [];
      }
    }
    return board;
  }

  // Returns a string representing the current state of the board
  board() {
    let array = this.solv;

    let strBoard = '+--------|---------|--------+\n';

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        strBoard += ` ${array[i][j]} `;
        if ((j+1) % 3 == 0 && j+1 != array[i].length) {
          strBoard += '|';
        }
      }
      if ((i+1) % 3 == 0) {
        strBoard += '\n+--------|---------|--------+';
      }
      strBoard += '\n';
    }

    return strBoard;
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
console.log(game.board())

//solve from set 02.

// let newString = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt').toString().split('\n');
// for (let i = 0; i < newString.length; i++) {
//   let go = newString[i];
//   let newGame = new Sudoku(go);
//   newGame.solve();
//   console.log(newGame.board());
// }