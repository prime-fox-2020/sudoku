"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = this.insert(board_string);
  }

  solve() {
  }

  // Returns a string representing the current state of the board
  printBoard() {
    let string = '-----------\n';
    for (let h = 0; h < 9; h+=3) {
      for (let i = 0; i < 9; i+=3) {
        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 3; k++) {
            debugger;
            string += this.board[j+h][k+i];
          }
          if (j != 3) {
            string += '|';
          }
        }
        string += '\n';
      }
      string += "-----------\n"
    }
    return string;
  }

  initiate() {
    const board = [];
    for (let i = 0; i < 9; i++) {
      board.push([]);
    }
    return board;
  }

  insert(string) {
    const board = this.initiate();
    let index = 0;
    for (let h = 0; h < 9; h+=3) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 3; k++) {
            board[j+h].push(string[index]);
            index++;
          }
        }
      }
    }
    return board;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs');
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]
var game = new Sudoku(board_string);

console.log(game.printBoard());

// Remember: this will just fill out what it can and not "guess"
// game.solve();

// console.log(game.board());




// leftRigt(process.argv[2]);
// upDown(process.argv[2]);

// console.log(Sudoku.initiate());