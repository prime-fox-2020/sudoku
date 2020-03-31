"use strict"

class Sudoku {
  constructor(board_string) {
    this._board = this.parseBoardString(board_string);
    this._iter = 0;
  }

  solve() {
    this._iter++;
    // console.log(this._iter);
    for(let row = 0; row < this._board.length; row++) {
      for(let column = 0; column < this._board[row].length; column++) {
        if(this._board[row][column] === 0) {
          let blockcolumn = Math.floor(column / 3);
          let blockrow = Math.floor(row / 3);
          for(let insertNumber = 1; insertNumber <= 9; insertNumber++) {
            if(this.isNumberUniqueInRow(insertNumber, row) &&
               this.isNumberUniqueInColumn(insertNumber, column) &&
               this.isNumberUniqueInBlock(insertNumber, blockrow, blockcolumn)) {
                this._board[row][column] = insertNumber;
                if(this.solve()) return true;
                else this._board[row][column] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  parseBoardString(str) {
    let result = [];
    let counter = 0;
    let temp = [];
    for(let i = 0; i < str.length; i++) {
      let theNumber = Number(str[i]);
      temp.push(theNumber);
      counter++;
      if(counter >= 9) {
        result.push(temp);
        temp = [];
        counter = 0;
      }
    }
    return result;
  }

  // Returns a string representing the current state of the board
  board() {
    let printStr = '';
    for(let i = 0; i < this._board.length; i++) {
      if(i % 3 == 0) printStr += '-----------------------\n';
      for(let j = 0; j < this._board[i].length; j++) {
        if(j % 3 === 0 && j !== 0) {
          printStr += ' | ' + this._board[i][j];
        } else {
          printStr += ' ' + this._board[i][j];
        }
      }
      printStr += '\n';
    }
    printStr += '-----------------------';
    return printStr;
  }

  isNumberUniqueInRow(number, row) {
    for(let i = 0; i < this._board[row].length; i++) {
      if(number === this._board[row][i]) return false;
    }
    return true;
  }

  isNumberUniqueInColumn(number, column) {
    for(let i = 0; i < this._board.length; i++) {
      if(number === this._board[i][column]) return false;
    }
    return true;
  }

  isNumberUniqueInBlock(number, blockRow, blockColumn) {
    let blockRowStart = blockRow * 3;
    let blockColumnStart = blockColumn * 3;
    for(let i = blockRowStart; i < blockRowStart + 3; i++) {
      for(let j = blockColumnStart; j < blockColumnStart + 3; j++) {
        if(number === this._board[i][j]) return false;
      }
    }
    return true;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
console.log('BEFORE');
console.log(game.board());

// Remember: this will just fill out what it can and not "guess"
game.solve();
console.log('AFTER');
console.log(game.board());