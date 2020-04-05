"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
  }

  cetakPapan() {
    this.kotak = [];
    let arrTemp = [];
    for (let i = 0; i < this.board_string.length; i++) {
      arrTemp.push(Number(this.board_string[i]));
      if (i % 9 == 8) {
        this.kotak.push(arrTemp);
        arrTemp = []
      }
    }
  }
  detectZero() {
    this.ghostIndex = []
    for (let i = 0; i < this.kotak.length; i++) {
      for (let j = 0; j < this.kotak[i].length; j++) {
        let arrTemp = []
        if (this.kotak[i][j] == 0) {
          arrTemp.push(i, j)
          this.ghostIndex.push(arrTemp)
        }

      }

    }
  }
  
  solve() {
    this.cetakPapan()
    this.detectZero()
    let backTrack = 0
    while (backTrack < this.ghostIndex.length) {
      this.kotak[this.ghostIndex[backTrack][0]][this.ghostIndex[backTrack][1]]++
      while (this.checkHorizontal(this.ghostIndex[backTrack][0], this.ghostIndex[backTrack][1]) == "ada" || this.checkVertical(this.ghostIndex[backTrack][0], this.ghostIndex[backTrack][1]) == "ada" || this.check3x3(this.ghostIndex[backTrack][0], this.ghostIndex[backTrack][1]) == "ada") {
        this.kotak[this.ghostIndex[backTrack][0]][this.ghostIndex[backTrack][1]]++
      }
      if (this.kotak[this.ghostIndex[backTrack][0]][this.ghostIndex[backTrack][1]] > 9) {
        this.kotak[this.ghostIndex[backTrack][0]][this.ghostIndex[backTrack][1]] = 0;
        backTrack--
      } else {
        backTrack++
      }
    }

  }
  checkHorizontal(ver, hor) {
    for (let i = 0; i < this.kotak.length; i++) {
      if (this.kotak[ver][i] == this.kotak[ver][hor] && i !== hor) {
        // console.log(ver,i)
        return "ada"
      }
    }
    return "Not ada"
  }

  checkVertical(ver, hor) {
    for (let i = 0; i < this.kotak[ver].length; i++) {
      if (this.kotak[i][hor] == this.kotak[ver][hor] && i !== ver) {
        // console.log(i,hor)
        return "ada"
      }
    }
    return "Not ada"
  }

  check3x3(ver, hor) {
    let row = Math.floor(ver / 3) * 3
    let col = Math.floor(hor / 3) * 3
    for (let k = row; k < row + 3; k++) {
      for (let l = col; l < col + 3; l++) {
        if (this.kotak[k][l] == this.kotak[ver][hor] && k !== ver && l !== hor) {
          return "ada"
        }
      }
    }
    return "Not ada"
  }

  // Returns a string representing the current state of the board
  board() {
    let str = ''
    for (let i = 0; i < this.kotak.length; i++) {
      if (i % 3 === 0 && i !== 0) {
        str += '------------------------' + "\n"
      }
      for (let j = 0; j < this.kotak[i].length; j++) {
        str += "|" + this.kotak[i][j]
        if (j % 3 === 2 ) {
          str += '| '
        }else if(j == this.kotak[i].length){
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
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

 var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board())
