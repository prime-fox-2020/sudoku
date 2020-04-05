
'use strict'

class Sudoku {
  constructor (boardString) {
    this.string = boardString
    this.initial = this.initBoard()
    this.solved = this.initBoard()
  }

  initBoard () {
    const unsolvedArray = []
    for (let i = 0; i < this.string.length; i += 9) {
      const temp = []
      for (let j = i; j < i + 9; j++) {
        temp.push(+this.string[j])
      }
      unsolvedArray.push(temp)
    }
    return unsolvedArray
  }

  solve () {
    const board = this.solved

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 0) {
          for (let number = 1; number <= 9; number++) {
            if (this.isOk(row, col, number)) {
              board[row][col] = number
              if (this.solve()) {
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

  getEmptyPosition (board) {
    const result = []
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          result.push([i, j, 0])
        }
      }
    }
    return result
  }

  isInRow (row, number) {
    for (let i = 0; i < 9; i++) {
      if (this.solved[row][i] === number) {
        return true
      }
    }
    return false
  }

  isInCol (col, number) {
    for (let i = 0; i < 9; i++) {
      if (this.solved[i][col] === number) {
        return true
      }
    }
    return false
  }

  isInBox (row, col, number) {
    const r = row - row % 3
    const c = col - col % 3

    for (let i = r; i < r + 3; i++) {
      for (let j = c; j < c + 3; j++) {
        if (this.solved[i][j] === number) {
          return true
        }
      }
    }
    return false
  }

  isOk (row, col, number) {
    return !this.isInRow(row, number) && !this.isInCol(col, number) && !this.isInBox(row, col, number)
  }

  board () {
    console.log(`SUDOKU SOLVER\n=============`)
    console.log(`Problem : ${this.string}\n`)

    for (let i = 0; i < 9; i++) {
      this.solved[i].splice(0, 0, '┃')
      this.solved[i].splice(4, 0, '┃')
      this.solved[i].splice(8, 0, '┃')
      this.solved[i].splice(12, 0, '┃')
      this.solved[i] = this.solved[i].join(' ')
      this.initial[i].splice(0, 0, '┃')
      this.initial[i].splice(4, 0, '┃')
      this.initial[i].splice(8, 0, '┃')
      this.initial[i].splice(12, 0, '┃')
      this.initial[i] = this.initial[i].join(' ')
    }
    const line = `┣━━━━━━━╋━━━━━━━╋━━━━━━━┫`

    for (let k = 3; k < 8; k += 4) {
      this.solved.splice(k, 0, line)
      this.initial.splice(k, 0, line)
    }

    console.log('Initial Sudoku Board:')
    console.log('=====================')
    console.log(`┏━━━━━━━┳━━━━━━━┳━━━━━━━┓`)
    console.log(this.initial.join('\n'))
    console.log(`┗━━━━━━━┻━━━━━━━┻━━━━━━━┛\n`)

    console.log('Solved Sudoku Board:')
    console.log('====================')
    console.log(`┏━━━━━━━┳━━━━━━━┳━━━━━━━┓`)
    console.log(this.solved.join('\n'))
    console.log(`┗━━━━━━━┻━━━━━━━┻━━━━━━━┛`)
    return ""
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