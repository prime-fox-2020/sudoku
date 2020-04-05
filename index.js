"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
  }

  solve() {
    this.boardUsed = [];
    let temp = [];
    for (let i = 0; i < this.board_string.length; i++) {
      temp.push(Number(this.board_string[i]));
      if (i % 9 == 8) {
        this.boardUsed.push(temp);
        temp = []
      }
    }

    this.nulls = []
    for (let i = 0; i < this.boardUsed.length; i++) {
      for (let j = 0; j < this.boardUsed[i].length; j++) {
        let temp2 = []
        if (this.boardUsed[i][j] == 0) {
          temp2.push(i, j)
          this.nulls.push(temp2)
        }

      }
    }

    let counter = 0
    while (counter < this.nulls.length) {
      this.boardUsed[this.nulls[counter][0]][this.nulls[counter][1]]++
      while (this.horizontal(this.nulls[counter][0], this.nulls[counter][1]) == true || this.vertikal(this.nulls[counter][0], this.nulls[counter][1]) == true || this.square(this.nulls[counter][0], this.nulls[counter][1]) == true) {
        this.boardUsed[this.nulls[counter][0]][this.nulls[counter][1]]++
      }
      if (this.boardUsed[this.nulls[counter][0]][this.nulls[counter][1]] > 9) {
        this.boardUsed[this.nulls[counter][0]][this.nulls[counter][1]] = 0;
        counter--
      } else {
        counter++
      }
    }

  }

  horizontal(x, y) {
    for (let i = 0; i < this.boardUsed.length; i++) {
      if (this.boardUsed[x][i] == this.boardUsed[x][y] && i !== y) {
        return true
      }
    }
    return false
  }

  vertikal(x, y) {
    for (let i = 0; i < this.boardUsed[x].length; i++) {
      if (this.boardUsed[i][y] == this.boardUsed[x][y] && i !== x) {
        return true
      }
    }
    return false
  }

  square(x, y) {
    let row = Math.floor(x / 3) * 3
    let col = Math.floor(y / 3) * 3
    for (let k = row; k < row + 3; k++) {
      for (let l = col; l < col + 3; l++) {
        if (this.boardUsed[k][l] == this.boardUsed[x][y] && k !== x && l !== y) {
          return true
        }
      }
    }
    return false
  }

  // Returns a string representing the current state of the boardUsed
  board() {
    let string = ''
    for (let i = 0; i < this.boardUsed.length; i++) {
      if (i % 3 === 0 && i !== 0) {
        string += '------------------------' + "\n"
      }
      for (let j = 0; j < this.boardUsed[i].length; j++) {
        string += "|" + this.boardUsed[i][j]
        if (j % 3 === 2 ) {
          string += '| '
        }else if(j == this.boardUsed[i].length){
          string +="|"
        }
      }
      string +='\n'
    }
    return string
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[3]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board())