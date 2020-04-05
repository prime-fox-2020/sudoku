"use strict"

class Sudoku {
  // Membuat atribut
  constructor(board_string) {
    this.string = board_string

    let tampArray = []
    let boardArray = []
    let count = 0

    for (let i = 0; i < board_string.length; i++) {
      tampArray.push(board_string[i])
      count++
      if (count == 9) {
        boardArray.push(tampArray)
        count = 0
        tampArray = []
      }
    }

    this.boardSudoku = boardArray
    this.lengthSudoku = Math.sqrt(board_string.length)

  }
  // Methode solve
  solve() {
    let i = 0;
    let j = 0;
    let tampArray = []
    let valueBefore = 0

    // Selama valuenya kurang dari panjangnya sudoku?
    while (i >= 0 && i < this.lengthSudoku) {
      while (j >= 0 && j < this.lengthSudoku) {
        let value = 1
        let flag = true

        if (this.boardSudoku[i][j] == 0) {
          while (value <= this.lengthSudoku) {
            if (this.checkHorizontal(i, value) && this.checkVertical(j, value) && this.checkSub(i, j, value) && value > valueBefore) {
              this.boardSudoku[i][j] = '' + value
              tampArray.push([i, j])
              valueBefore = 0
              flag = true
              break
            }
            value++
          }

          if (value > this.lengthSudoku) {
            flag = false
          }
        }

        if (!flag) {
          i = tampArray[tampArray.length - 1][0]
          j = tampArray[tampArray.length - 1][1]
          valueBefore = this.boardSudoku[i][j]
          this.boardSudoku[i][j] = '' + 0
          tampArray = tampArray.slice(0, tampArray.length - 1)
          flag = true
          j--
        }
        j++
        value = 0
      }
      i++
      j = 0
    }
  }
  // Method checkHorizontal yang akan dilempar ke methode solve
  checkHorizontal(x, value) {
    for (let j = 0; j < this.lengthSudoku; j++) {
      if (value == this.boardSudoku[x][j]) {
        return false
      }
    }
    return true
  }
  // Method checkVertical yang akan dilempar ke method solve
  checkVertical(y, value) {
    for (let i = 0; i < this.lengthSudoku; i++) {
      if (value == this.boardSudoku[i][y]) {
        return false
      }
    }
    return true
  }
  // Method checkSub yang akan dilempar ke methode solve
  checkSub(x, y, value) {
    let topX = Math.floor(x / Math.sqrt(this.lengthSudoku) + 1) * Math.sqrt(this.lengthSudoku)
    let bottomX = Math.floor(x / Math.sqrt(this.lengthSudoku)) * Math.sqrt(this.lengthSudoku)

    let topY = Math.floor(y / Math.sqrt(this.lengthSudoku) + 1) * Math.sqrt(this.lengthSudoku)
    let bottomY = Math.floor(y / Math.sqrt(this.lengthSudoku)) * Math.sqrt(this.lengthSudoku)

    for (let i = bottomX; i < topX; i++) {
      for (let j = bottomY; j < topY; j++) {
        if (this.boardSudoku[i][j] == value) {
          return false
        }
      }
    }

    return true
  }


  board() {
    return this.boardSudoku
  }
}


// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString().split("\n")[2]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"

game.solve()

console.log(game.board())