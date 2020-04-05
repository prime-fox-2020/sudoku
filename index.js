"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
  }

  makingBoard() {
    this.boards = [];
    let arrTemp = [];
    for (let i = 0; i < this.board_string.length; i++) {
      arrTemp.push(Number(this.board_string[i]));
      if (i % 9 == 8) {
        this.boards.push(arrTemp);
        arrTemp = []
      }
    }
  }

  detectZero() {
    this.indexZero = []
    for (let i = 0; i < this.boards.length; i++) {
      for (let j = 0; j < this.boards[i].length; j++) {
        let arrTemp = []
        if (this.boards[i][j] == 0) {
          arrTemp.push(i, j)
          this.indexZero.push(arrTemp)
        }

      }

    }
  }

  solve() {
    this.makingBoard()
    this.detectZero()
    let backTrack = 0
    while (backTrack < this.indexZero.length) {
      this.boards[this.indexZero[backTrack][0]][this.indexZero[backTrack][1]]++
      while (this.checkHorizontal(this.indexZero[backTrack][0], this.indexZero[backTrack][1]) == "Exist" || this.checkVertical(this.indexZero[backTrack][0], this.indexZero[backTrack][1]) == "Exist" || this.check3x3(this.indexZero[backTrack][0], this.indexZero[backTrack][1]) == "Exist") {
        this.boards[this.indexZero[backTrack][0]][this.indexZero[backTrack][1]]++
      }
      if (this.boards[this.indexZero[backTrack][0]][this.indexZero[backTrack][1]] > 9) {
        this.boards[this.indexZero[backTrack][0]][this.indexZero[backTrack][1]] = 0;
        backTrack--
      } else {
        backTrack++
      }
    }

  }

  checkHorizontal(ver, hor) {
    for (let i = 0; i < this.boards.length; i++) {
      if (this.boards[ver][i] == this.boards[ver][hor] && i !== hor) {
        // console.log(ver,i)
        return "Exist"
      }
    }
    return "Not exist"
  }

  checkVertical(ver, hor) {
    for (let i = 0; i < this.boards[ver].length; i++) {
      if (this.boards[i][hor] == this.boards[ver][hor] && i !== ver) {
        // console.log(i,hor)
        return "Exist"
      }
    }
    return "Not exist"
  }

  check3x3(ver, hor) {
    let row = Math.floor(ver / 3) * 3
    let col = Math.floor(hor / 3) * 3
    for (let k = row; k < row + 3; k++) {
      for (let l = col; l < col + 3; l++) {
        if (this.boards[k][l] == this.boards[ver][hor] && k !== ver && l !== hor) {
          return "Exist"
        }
      }
    }
    return "Not exist"
  }


  // Returns a string representing the current state of the boards
  board() {
    let str = ''
    for (let i = 0; i < this.boards.length; i++) {
      if (i % 3 === 0 && i !== 0) {
        str += '------------------------' + "\n"
      }
      for (let j = 0; j < this.boards[i].length; j++) {
        str += "|" + this.boards[i][j]
        if (j % 3 === 2 ) {
          str += '| '
        }else if(j == this.boards[i].length){
          str+="|"
        }
      }
      str+='\n'
    }
    return str
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split("\n")[9]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board())