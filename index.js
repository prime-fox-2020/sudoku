"use strict"
// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\r\n")[5]

class Sudoku {
  constructor(board_string) {
    this._boardString = board_string
    this._board = []
    this._yAxis = []
    this._grid = []
    this._userBoard = []
    this._userY = []
    this._userGrid = []
    this._gameEnded = false
    this._loop = 0
    this._answer = undefined
    this._boardSize = Math.floor(Math.sqrt(board_string.length))
  }

  get boardString() {
    return this._boardString
  }
  get getBoard() {
    return this._board
  }
  get userBoard() {
    return this._userBoard
  }
  get boardSize() {
    return this._boardSize
  }
  get gameEnded() {
    return this._gameEnded
  }
  set gameEnded(bool) {
    this._gameEnded = bool
  }
  get loopCount() {
    return this._loop
  }
  set loopCount(num) {
    this._loop = num
  }
  get answer() {
    return this._answer
  }
  set answer(str) {
    this._answer = str
  }

  gameStart() {
    this.devide(this.userBoard, this.boardString)
    this.collectColumn(this.userBoard, this._userY)
    this.collectGrid(this.userBoard, this._userGrid)
  }



  devide(dest, str) {
    let count = 0
    for (let i = 0; i < this.boardSize; i++) {
      let rowAxis = []      
      for (let j = 0; j < this.boardSize; j++) {
        rowAxis.push(str[count])
        count++
      }
      dest.push(rowAxis)
    }
    // console.log(this.getBoard)
  }

  collectColumn(src, dest) {
    // console.log('cC')
    for (let i = 0; i < this.boardSize; i++) {
      let temp = []
      for (let j = 0; j < this.boardSize; j++) {
        temp.push(src[j][i])
      }
      dest.push(temp)
    }
  }

  collectGrid(src, dest) {
    // console.log('grid')
    let grid = Math.floor(Math.sqrt(this.boardSize))
    for (let i = 0; i < this.boardSize; i += 3) {
      for (let j = 0; j < this.boardSize; j += 3) {
        let temp = []
        for (let k = 0; k < grid; k++) {
          for (let l = 0; l < grid; l++) {
            temp.push(src[i + k][j + l])
          }
        }
        dest.push(temp)
      }
    }
    // console.log(this._grid)
  }

  solve() {
    let n = 1
    this.devide(this.getBoard, this.boardString)
    this.collectColumn(this.getBoard, this._yAxis)
    this.collectGrid(this.getBoard, this._grid)
    do {
      for (let i = 0; i < this.boardSize; i++) {
        for (let j = 0; j < this.boardSize; j++) {
          if (this.getBoard[i][j] === '0') {
            let arr = [],
              mapper = [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
              num
            for (let k = 1; k <= this.boardSize; k++) {
              num = k.toString()
              if (!this.getBoard[i].some(el => el === num) && !this._yAxis[j].some(el => el === num)) {
                if (!this._grid[mapper[Math.floor(i / 3)][Math.floor(j / 3)]].some(el => el === num)) {
                  console.log(`${k.toString()} ${i + ' ' + j} >>> ${mapper[Math.floor(i / 3)][Math.floor(j / 3)]}`)
                  arr.push(k.toString())
                }
                if (arr.length > 1) break
              }
            }
            if (arr.length === 1) {
              this.getBoard[i][j] = arr[0]
              this._yAxis = []
              this.collectColumn(this.getBoard, this._yAxis)
              this._grid = []
              this.collectGrid(this.getBoard, this._grid)
              // console.log(this.board())
            } 
          }
        }
      }
      if (this.board(this.getBoard).indexOf('0') < 0) this.gameEnded = true
      n++
    } while (!this.gameEnded)
    this.loopCount = n
    this.answer = this.board(this.getBoard)
  }

  // Returns a string representing the current state of the board
  board(arr) {
    // console.log(arr[0])

    return !arr[0] ? this.boardString
      : arr[0].concat(arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8]).join('')
  }
}


var game = new Sudoku(board_string)
console.log(game.gameStart())
console.log(game.board(game.userBoard))
// console.log(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()

// console.log(game.board())
// console.log(game.board().indexOf('0'))
// console.log(game.getBoard)
// console.log(board_string)

// const data = fs.readFileSync('set-01_sample.unsolved.txt')
//   .toString()
//   .split("\r\n")

// const games = []
// data.forEach(el => {
//   games.push(new Sudoku(el))
// });

// games[0].solve()
// games[1].solve()
// games[2].solve()
// games[3].solve()
// games[4].solve()
// games[5].solve()
// games[6].solve()
// games[7].solve()
// // games[8].solve()  // HaRD
// // games[9].solve()  // HaRD
// // games[10].solve()  // HaRD
// // games[11].solve()  // HaRD
// // games[12].solve()  // HaRD
// // games[13].solve()  // HaRD
// games[14].solve()
// console.log(games)

