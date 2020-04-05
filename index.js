"use strict"

class Sudoku {
  constructor(board_string) {
    this.displayBoard = this.createBoard(board_string);
    this.emptyPlaces = this.findEmptyPlaces(); 
  }

  createBoard(board_string) {
    let theBoard = []
    let indexStr = 0;
    for (let i = 0; i < 9; i++) {
      let row = [];
      for (let j = 0; j < 9; j++) {
          row.push(Number(board_string[indexStr]));
          indexStr++;
      }
      theBoard.push(row);
    }
    return theBoard;
  }

  findEmptyPlaces() {
    let emptyPlaces = [];
    for (let i = 0; i < this.displayBoard.length; i++) {
      for (let j = 0; j < this.displayBoard[i].length; j++) {
        if (this.displayBoard[i][j] === 0) emptyPlaces.push([i, j]);
      }
    }
    return emptyPlaces;
  }

  checkHorizontal(indexRow, number) {
    for (let i = 0; i < this.displayBoard[indexRow].length; i++) {
      if (this.displayBoard[indexRow][i] === number) return false;
    }
    return true;
  }

  checkVertical(indexCol, number) {
    for (let i = 0; i < this.displayBoard.length; i++) {
      if (this.displayBoard[i][indexCol] === number) return false;
    }
    return true;
  }

  checkBlock(indexRow, indexCol, number) {
    let row = Math.floor(indexRow / 3) * 3;
    let col = Math.floor(indexCol / 3) * 3
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.displayBoard[i + row][j + col] === number) return false;
      }
    }
    return true;
  }

  isValidPlace(indexRow, indexCol, number) {
    let isHorizontalValid = this.checkHorizontal(indexRow, number);
    let isVerticalValid = this.checkVertical(indexCol, number);
    let isBlockValid = this.checkBlock(indexRow, indexCol, number);
    
    if (isHorizontalValid && isVerticalValid && isBlockValid) return true;
    return false;
  }

  isSolved() {
    for (let i = 0; i < this.displayBoard.length; i++) {
      for (let j = 0; j < this.displayBoard[i].length; j++) {
        if (this.displayBoard[i][j] === 0) return false;
      }
    }
    return true;
  }


  solve() {
    let indexOnEmptyPlaces = 0;
    while (!this.isSolved()) {
      let row = this.emptyPlaces[indexOnEmptyPlaces][0];
      let col = this.emptyPlaces[indexOnEmptyPlaces][1];
      let num = this.displayBoard[row][col];

      while (num < 10) {
        if (this.isValidPlace(row, col, num)) {
          this.displayBoard[row][col] = num;
          indexOnEmptyPlaces++;
          break;
        }
        if (num === 9) {
          this.displayBoard[row][col] = 0;
          indexOnEmptyPlaces--;
        }
        num++;
      }
    }
  }

  // Returns a string representing the current state of the board
  board() {
    let displayStr = `-------------------------\n`;
    for (let i = 0; i < this.displayBoard.length; i++) {
      let row = '| ';
      for (let j = 0; j < this.displayBoard[i].length; j++) {
        row += this.displayBoard[i][j];
        if (j === 2 || j === 5 || j === 8) {
          row += ' | '
        } else {
          row += ' '
        }
      }
          
      displayStr += `${row}\n`
      if (i === 2 || i === 5 || i === 8) {
        displayStr += `-------------------------\n`
      }
    }
    return displayStr
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
console.log('---------BEFORE----------')
console.log(game.board())

console.log('---------SOLVED----------')
game.solve()

console.log(game.board())
