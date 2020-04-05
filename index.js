"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = this.arrBoard(board_string);
  }

  solve() {
    let platform = this.board_string;
    for (let row = 0; row < platform.length; row++) {
      for (let col = 0; col < platform[row].length; col++) {
        if (platform[row][col] == 0) {
          let boxRow = Math.floor(row / 3);
          let boxCol = Math.floor(col / 3);
          for (let number = 1; number < 10; number++) {
            if (this.rowNum(number, row) && this.colNum(number, col) && this.boxNum(number, boxRow, boxCol)) {
              platform[row][col] = number;
              if (this.solve()) {
                return true;
              }
              else {
                platform[row][col] = 0
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  // Returns a string representing the current state of the board
  arrBoard(board_string) {
    let arr = [];
    let temp = [];
    // console.log(this.board_string.length)
    for (let i = 0; i < board_string.length; i++) {
      temp.push(board_string[i]);
      if (temp.length == 9) {
          arr.push(temp);
          temp = [];
      }
    }
    return arr;
  }

  board () {
    let str = '';
    for (let i = 0; i < this.board_string.length; i++) {
      if (i % 3 == 0) {
        str += '---------------------\n'
      }
      for (let j = 0; j < this.board_string[i].length; j++) {
        if (j % 3 == 0 && j !== 0) {
          str += '|' + this.board_string[i][j];
        }
        else {
          str += this.board_string[i][j];
        }
      }
      str += '\n';
    }
    str += '---------------------'
    return str;
  }

  rowNum (number, row) {
    for (let i = 0; i < this.board_string[row].length; i++) {
      if (number == this.board_string[row][i]) {
        return false;
      }
    }
    return true;
  }

  colNum (number, col) {
    for (let i = 0; i < this.board_string.length; i++) {
      if (number == this.board_string[i][col]) {
        return false;
      }
    }
    return true;
  }

  boxNum (number, boxRow, boxCol) {
    let beginBoxRow = boxRow * 3;
    let beginBoxCol = boxCol * 3;
    for (let i = beginBoxRow; i < beginBoxRow + 3; i++) {
      for (let j = beginBoxCol; j < beginBoxCol + 3; j++) {
        if (number == this.board_string[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt', 'utf8')
  .toString()
  .split("\n")[0]



var game = new Sudoku(board_string)
// console.log(board_string);
// console.log(board_string.length);
// Remember: this will just fill out what it can and not "guess"
// game.board()
// console.log(game.solve())
game.solve()
console.log(game.board())
