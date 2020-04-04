"use strict"
class Sudoku {
  constructor(board_string) {
    this.board_print = []
    this.board_string = board_string
    this.board_arr = []
  }
  // Returns a string representing the current state of the board
  board() {
    console.log('-----------');
    for (let k = 0; k < this.board_string.length - 1; k += 9) {
      // console.log(k);
      let tempi = ''
      let tempiArr = []
      for (let i = 0; i < 9; i += 3) {
        // console.log(i);
        let temp = ''
        let tempArr = []
        for (let j = 0; j < 3; j++) {
          temp += (board_string[i + j + k])
          tempArr.push(board_string[i + j + k])
        }
        if (i == 0 || i == 3) {
          temp += '|'
        }
        tempi += (temp)
        tempiArr.push(tempArr)
      }
      console.log(tempi)
      if (k == 18 || k == 45) {
        console.log('-----------');
      }
      this.board_print.push(tempiArr)
    }
    console.log('-----------');
    return ''
  }
  getBoardArr() {
    for (let i = 0; i < this.board_string.length; i += 9) {
      let board_line = []
      for (let j = i; j < i + 9; j++) {
        board_line.push(this.board_string[j])
      }
      this.board_arr.push(board_line);
    }
    return this.board_arr
  }
  cekRow(row, obj) {
    for (let i = 0; i < 9; i++) {
      if (this.board_arr[row][i] != '0') {
        delete obj[this.board_arr[row][i]]
      }
    }
    return obj
  }
  cekCol(col, obj) {
    for (let i = 0; i < 9; i++) {
      if (this.board_arr[i][col] != '0') {
        delete obj[this.board_arr[i][col]]
      }
    }
    return obj
  }
  cekBox(row, col, obj) {
    let rowBox = (Math.floor(row / 3)) * 3
    let colBox = (Math.floor(col / 3)) * 3
    for (let i = rowBox; i < rowBox + 3; i++) {
      for (let j = colBox; j < colBox + 3; j++) {
        if (this.board_arr[i][j] != '0') {
          delete obj[this.board_arr[i][j]]
        }
      }
    }
    return obj
  }
  cekZero() {
    for (let i = 0; i < this.board_arr.length; i++) {
      for (let j = 0; j < this.board_arr[i].length; j++) {
        if (this.board_arr[i][j] == '0') {
          return true
        }
      }
    }
    return false
  }
  solve() {
    this.getBoardArr()
    while (this.cekZero()) {
      for (let i = 0; i < this.board_arr.length; i++) {
        for (let j = 0; j < this.board_arr[i].length; j++) {
          if (this.board_arr[i][j] == '0') {
            let cekNumber = {
              '1': 0,
              '2': 0,
              '3': 0,
              '4': 0,
              '5': 0,
              '6': 0,
              '7': 0,
              '8': 0,
              '9': 0
            }
            cekNumber = this.cekRow(i, cekNumber)
            cekNumber = this.cekCol(j, cekNumber)
            cekNumber = this.cekBox(i, j, cekNumber)
            let missing = Object.keys(cekNumber)
            if (missing.length == 1) {
              // console.log('missing: ', i, j, missing);
              this.board_arr[i][j] = Number(missing[0])
              // console.table(this.board_arr);
            }
          }
        }
      }
    }
    return console.table(this.board_arr);
  }
}
// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\r\n")[0]
var game = new Sudoku(board_string)
console.clear();
console.log(game.board())
// Remember: this will just fill out what it can and not "guess"
game.solve()