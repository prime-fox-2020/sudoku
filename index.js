"use strict"

class Sudoku {
  constructor(board_string) {
    this.string = board_string
    this.board = this.board()
  }

  // Returns a string representing the current state of the board
  board () {
    const emptyBoard = []
    for (let i = 0; i < this.string.length; i += 9) {
      const temp = []
      for (let j = i; j < i + 9; j++) {
        temp.push(Number(this.string[j]))
      }
      emptyBoard.push(temp)
    }
    return emptyBoard
  }

  // check rows, col, and box
  check_rows (row, number) {
    for (let i = 0; i < 9; i++) {
      if (this.board[row][i] === number) {
        return true
      }
    }
    return false
  }

  check_col (col, number) {
    for (let i = 0; i < 9; i++) {
      if (this.board[i][col] === number) {
        return true
      }
    }
    return false
  }

  check_box (row, col, number) {
    const r = row - row % 3
    const c = col - col % 3

    for (let i = r; i < r + 3; i++) {
      for (let j = c; j < c + 3; j++) {
        if (this.board[i][j] === number) {
          return true
        }
      }
    }
    return false
  }

  // check before filling another box
  checkAll (row, col, num) {
    return !this.check_rows(row, num) && !this.check_col(col, num) && !this.check_box(row, col, num)
  }

  solve () {
    const board = this.board
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 0) { // empty space
          for (let num = 1; num <= 9; num++) {
            if (this.checkAll(row, col, num)) {
              board[row][col] = num
              if (this.solve()) { // repeat to fill another 
                return true
              } else {
                board[row][col] = 0
              }
            }
          }
          return false
        }
      }
    }
    return true
  }

  displayBoard() {
    const line = `-----------------`
    for (let i = 0; i < 9; i++) {
      this.board[i] = this.board[i].join(' ')
    }
    for (let k = 3; k < 8; k += 4) {
      this.board.splice(k, 0, line)
    }
    console.log('   ~ SUDOKU ~   ')
    console.log(`-----------------`)
    console.log(this.board.join('\n'))
    console.log(`-----------------`)
    return ''
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

// var game = new Sudoku(board_string)
const game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

game.displayBoard()