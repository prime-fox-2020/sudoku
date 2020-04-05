"use strict"

class Sudoku {
  constructor(board_string) {
    this.temp_board = this.tempBoard(board_string);
    this.emptyPlaces = this.findZero();
  }

  tempBoard() {
    let board = []
    let counter = 0
    for (let i = 0; i < 9; i++) {
      let row = []
      for (let j = 0; j < 9; j++) {
        row.push(parseInt(board_string[counter]))
        counter ++
      }
      board.push(row)
    }
    return board
  }

  findZero() {
    let zero = [];
    for (let i = 0; i < this.temp_board.length; i++) {
      for (let j = 0; j < this.temp_board[i].length; j++) {
        if (this.temp_board[i][j] === 0) zero.push([i, j])
      }
    }
    return zero
  }

  checkRow(rows, number) {
    for (let i = 0; i < this.temp_board[rows].length; i++) {
      if (this.temp_board[rows][i] === number) {
        return false
      }
    }
    return true
  }

  checkColumn(column, number) {
    for (let i = 0; i < this.temp_board.length; i++) {
      if (this.temp_board[i][column] === number) {
        return false
      }
    }
    return true
  }

  checkBox(rows, column, number) {
    let row = Math.floor(rows / 3) * 3;
    let col = Math.floor(column / 3) * 3
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.temp_board[i + row][j + col] === number){
        return false
        }  
      }
    }
    return true
  }
  
  checkPlace(rows, column, number) {
    let checkHorizontal = this.checkRow(rows, number)
    let checkVertical = this.checkColumn(column, number)
    let checkBlock = this.checkBox(rows, column, number)

    if (checkHorizontal && checkVertical && checkBlock) {
      return true
    }
    return false
  }

  isSolved() {
    for (let i = 0; i < this.temp_board.length; i++) {
      for (let j = 0; j < this.temp_board[i].length; j++) {
        if (this.temp_board[i][j] === 0) {
          return false
        }
      }
    }
    return true
  }
    
  solve() {
    let counter = 0
    
    while (!this.isSolved()) {
      let row = this.emptyPlaces[counter][0]
      let col = this.emptyPlaces[counter][1]
      let num = this.temp_board[row][col]
      
      while (num < 10) {
        if (this.checkPlace(row, col, num)) {
          this.temp_board[row][col] = num
          counter++
          break
        }
        if (num === 9) {
          this.temp_board[row][col] = 0
          counter--
        }
        num++
      }
    }
  }

  // Returns a string representing the current state of the board
  board() {
    let displayStr = ''
    for (let i = 0; i < this.temp_board.length; i++) {
      let row = ''
      for (let j = 0; j < this.temp_board[i].length; j++) {
        row += this.temp_board[i][j];
        if (j === 2 || j === 5) {
          row += ' | '
        } else {
          row += ' '
        }
      }
      displayStr += `${row}\n`
      if (i === 2 || i === 5) {
        displayStr += `---------------------\n`
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
console.log(`========BEFORE=======\n`);

console.log(game.board())

game.solve()

console.log(`========AFTER========`);
console.log(game.board())
// console.log(board_string);
// console.log(game.tempBoard())