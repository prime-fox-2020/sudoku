"use strict"

class Sudoku {
  constructor(board_string) {
    this.sudokuNumber = board_string
    this.sudokuArr = []
  }

  boardArr() {
    let index = 0
    for (var i = 0; i < 9; i++) {
      let temp = []
      for (var j = 0; j < 9; j++) {
        temp.push(Number(this.sudokuNumber[index]))
        index++
      }
      this.sudokuArr.push(temp)
    }
  }
  checkHorizontal(row, number) {
    for (var i = 0; i < this.sudokuArr[row].length;i++) {
      if (this.sudokuArr[row][i] === number) {
        return true
      } else {
        return false
      }
    }
  }
  checkVertical(row, col, number) {
    for (var i = 0; i < this.sudokuArr.length; i++) {
      if (this.sudokuArr[i][col] === number) {
        return true
      }
    }
    return false
  }


  checkBox(row, col, number) {
    let fixRow = (Math.floor(row / 3)) * 3
    let fixCol = (Math.floor(col / 3)) * 3
    for (var i = 0; i < fixRow + 3; i++) {
      for (var j = 0; j < fixCol + 3; j++) {
        if (this.sudokuArr[i][j] === number) {
          return true
        }
      }
    }
    return false
  }

  tripleCheck(row, col, number) {
    if (this.checkHorizontal(row, number) && this.checkVertical(col, number) && this.checkBox(row, col, number)) {
      return true
    } else {
      return false
    }
  }

  solve() {
    //looping row 
    for (var row = 0; row < this.sudokuArr.length; row++) {
      for (var col = 0; col < this.sudokuArr[row].length; col++) {
        if (this.sudokuArr[row][col] === 0) { // jalankan jika kosong 
          for (var number = 1; number < 10; number++) {
            if (this.tripleCheck(row, col, number)) {
              this.sudokuArr[row][col] = number
              if (this.solve()) {
                return true
              } else {
                this.sudokuArr[row][col] = 0
              }
            }
          }
          return false
        }
      }
    }
    return true
  }

  // Returns a string representing the current state of the board
  board() {
    let print = ''
    for (var i = 0; i < this.sudokuArr.length; i++) {
      if (i % 3 == 0) {
        print += '-----------------------\n'
      }
      for (var j = 0; j < this.sudokuArr[i].length; j++) {
        if (j % 3 == 0 && j !== 0) {
          print += ' | ' + this.sudokuArr[i][j]
        } else {
          print += ' ' + this.sudokuArr[i][j]
        }
      }
      print += '\n'
    }
    print += '-----------------------'
    return print
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]
// console.log(board_string)
// Remember: this will just fill out what it can and not "guess"
var game = new Sudoku(board_string)
game.boardArr()
game.solve()
console.log(game.board())
