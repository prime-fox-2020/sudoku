"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string;
    this.dataString = this.makeData();

  }
  test(){
    console.log(this.dataString);
  }
  makeData() {
    let result = [];
    let temp = [];
    for (let a = 0; a < board_string.length; a++) {
      temp.push(board_string[a]);

      if ((a + 1) % 9 == 0) {
        result.push(temp);
        temp = [];
      }
    }
    return result;
  }

  checkBoard(data, row, col, check) {
    for (let a = 0; a < 9; a++) {
      let b = 3 * Math.floor(row / 3) + Math.floor(a / 3);
      let c = 3 * Math.floor(col / 3) + a % 3;
      if (data[row][a] == check || data[a][col] == check || data[b][c] == check) {
        return false;
      }
    }
    return true;
  }


  solve() {
    for (let a = 0; a < 9; a++) {
      for (let b = 0; b < 9; b++) {
        if (this.dataString[a][b] == 0) {
          for (let c = 1; c <= 9; c++) {
            if (this.checkBoard(this.dataString, a, b, c)) {
              this.dataString[a][b] = `${c}`;
              if (this.solve(this.dataString)) {
                return true;
              } else {
                this.dataString[a][b] = 0;
              }
            }
          }
          return false;
        }
      }
    }
    this.board_string = "";
    // console.log(this.dataString);
    for (let a = 0; a < this.dataString.length; a++) {
      for (let b = 0; b < this.dataString[a].length; b++) {
        this.board_string += this.dataString[a][b];
      }
    }
  }

  // Returns a string representing the current state of the board
  board() {
    let line = '---------------------\n';
    let count = 1;
    for (let a = 0; a < this.board_string.length; a++) {
      line += `${this.board_string[a]} `;
      if (count % 3 == 0 && count != 9) {
        line += '| ';
        count++;
      } else if (count % 9 == 0) {
        line += '\n';
        count = 1;
      } else {
        count++;
      }

      if ((a + 1) % 27 == 0 && a != 0) {
        line += '---------------------\n';
      }
    }
    return line;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

console.log(game.board())
// Remember: this will just fill out what it can and not "guess"
game.solve()
console.log("!!!!!!! SOLVED !!!!!!!")
console.log(game.board())