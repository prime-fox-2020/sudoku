"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = this.insert(board_string);
  }

  solve() {
    let backTrack = false;
    for (let sub in this.board) {
      for (let cell in this.board[sub]) {
        if (this.board[sub][cell] == 0) {
          backTrack = false;
          let inside = false;
          let horizontally = false
          let vertically = false;
          let uniqueNumber = 0;
          
          while(!inside && !horizontally && !vertically) {
            uniqueNumber++;
            // Check inside the little square
            for (let i = 0; i < 9; i++){
              if (this.board[sub][i] == uniqueNumber){
                inside = true;
                break;
              }
            }
            // Check cell in the same row
            let row = +sub;
            let column = +cell;
            for (let j = 0; j < 3; j++) {
              for (let k = 0; k < 3; k++) {
                if (this.board[row][column] == uniqueNumber) {
                  horizontally = true;
                  j = 3;
                  break;
                }
                column++;
                if (column % 3 == 0) {
                  column -= 3;
                }
              }
              row++;
              if (row % 3 == 0) {
                row -= 3;
              }
            }
            // Check cell in the same column
            let vRow = +sub;
            let vColumn = +cell;
            for (let l = 0; l < 3; l++) {
              for (let m = 0; m < 3; m++) {
                if (this.board[vRow][vColumn] == uniqueNumber) {
                  vertically = true;
                  l = 3;
                  break;
                }
                vColumn += 3;
                if (Math.floor(vColumn / 3) >= 3) {
                  vColumn %= 3;
                }
              }
              vRow += 3;
              if (Math.floor(vRow / 3) >= 3) {
                vRow %= 3;
              }
            }
            // Check all condition
            if (inside || horizontally || vertically) {
              inside = false;
              horizontally = false;  
              vertically = false;
              if (uniqueNumber == 9) {
                backTrack = true;
                break;
              }
            } else {
              break;
            }
          }
          if (!backTrack) {
            this.board[sub][cell] = uniqueNumber;
          } else {
            break;
          }
        }
      }
    }
    if (backTrack) {
      console.log("Miscombination. You need to back track!");
    } else {
      console.log("Congratulation! Sudoku is solved");
    }
    console.log(this.printBoard());
  }

  // Returns a string representing the current state of the board
  printBoard() {
    let string = '-----------\n';
    for (let h = 0; h < 9; h += 3) {
      for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 3; k++) {
            string += this.board[j + h][k + i];
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
    for (let h = 0; h < 9; h += 3) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 3; k++) {
            board[j + h].push(+string[index]);
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

console.log("Solve the puzzle");
console.log(game.printBoard());

// Remember: this will just fill out what it can and not "guess"
game.solve();