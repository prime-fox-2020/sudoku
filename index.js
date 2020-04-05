"use strict"

class Sudoku {
  constructor(board_string) {
    this._board = this.parseBoardString(board_string)
  }

  parseBoardString(board_string){
    let result = []
    let counter = 0
    let temp = []

    for (let i = 0; i<board_string.length; i++){
      temp.push(Number(board_string[i]))
      counter ++
      if (counter == 9){
        result.push(temp)
        temp = []
        counter = 0
      }
    }
    return result
  }

  // Returns a string representing the current state of the board
  board() {
    let printSrc = ''
    for (let i = 0; i<this._board.length; i++){
      if (i%3 === 0){
        printSrc += '-------------------------------\n'
      }
      for (let j = 0; j<this._board[i].length; j++){
        if(j%3 == 0 && j !== 0){
          printSrc += ' | ' + this._board[i][j]
        } else {
          printSrc += ' ' + this._board[i][j]
        }
      }
      printSrc += '\n'
    }
    printSrc += '-------------------------------'
    return printSrc
  }

  solve() {
    for (let row = 0; row<this._board.length; row++){
      for (let col = 0; col<this._board[row].length; col++){
        if(this._board[row][col] === 0){
          for (let value = 1; value<=9; value++){
            if (this.checkAllCondition(row,col,value)){
              this._board[row][col] = value
              if (this.solve()){
                return true
              } else {
                this._board[row][col] = 0
              }
            }
          }
          return false
        }
      }
    }
    return true
  }

  checkEntireRow(row, value){
    for (let i = 0; i<this._board[row].length; i++){
      if (this._board[row][i] === value){
        return false
      }
    }
    return true
  }

  checkEntireColumn(col, value){
    for (let i = 0; i<this._board.length; i++){
      if(this._board[i][col] === value){
        return false
      }
    }
    return true
  }

  checkSquare(row,col,value){
    let rowSquare = (Math.floor(row / 3)) *3
    let colSquare = (Math.floor(col / 3)) *3
    for (let i = rowSquare; i<rowSquare+3; i++){
      for (let j = colSquare; j<colSquare+3; j++){
        if(this._board[i][j] === value){
          return false
        }
      }
    }
    return true
  }

  checkAllCondition(row,col,value){
    if(this.checkEntireRow(row,value) && this.checkEntireColumn(col,value) && this.checkSquare(row,col,value)){
      return true
    } else {
      return false
    }
  }
  
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
// var board_string = fs.readFileSync('./week1/weekend/sudoku/set-01_sample.unsolved.txt')
var board_string = fs.readFileSync('./set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log('BEFORE')
console.log(game.board())
console.log('=/=/=/=//=/=/=///=/=/=/////=/=//')

game.solve()
console.log('after')
console.log(game.board())
