"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
  }

  solve() {
    let backTrackData = []
    for(let i = 0; i < this.board_string.length; i++){
      if(this.board_string[i] === '0'){
        backTrackData.push(i)
      }
    }
    let i = 0
    while(i < backTrackData.length){
      let row = Math.floor(backTrackData[i]/9)
      let col = backTrackData[i] - row*9
      let arr = this.createTempArrayBoard()
      let start = 0
      if(arr[row][col] != 0){
        start = parseInt(arr[row][col])
      }
      for(let j = start+1; j <= 10; j++){
        if(j == 10){
          let temporary = this.board_string.split('')
          temporary[backTrackData[i]] = 0
          this.board_string = temporary.join('')
          i--
          break
        }
        let flag = this.checkPosibility(row,col,j)
        if(flag){
          let temp = this.board_string.split('')
          temp[backTrackData[i]] = j
          this.board_string = temp.join('')
          i++
          break
        }
      }
    }
  }
  // Returns a string representing the current state of the board
  board() {
    let temp = '----------------------\n'
    for(let i = 0; i < this.board_string.length; i++){
      temp += `${this.board_string[i]} `
      if((i+1) % 3 === 0 && (i+1) % 9 !== 0){
        temp += '| '
      }
      if((i+1) % 9 === 0){
        temp += '\n'
      }
      if((i+1) % 27 === 0){
        temp += '----------------------\n'
      }
    }
    return temp
  }
  createTempArrayBoard(){
    let arrBoard = []
    let temp = []
    for(let i = 0; i < this.board_string.length; i++){
      temp.push(this.board_string[i])
      if((i+1) % 9 === 0){
        arrBoard.push(temp)
        temp = []
      }
    }
    return arrBoard
  }
  checkRow(row, col, angka){
    let arr = this.createTempArrayBoard()
    let flag = true
    for(let j = 0; j < arr.length; j++){
      if(arr[row][j] == angka){
        flag = false
      }
      if(!flag){
        break
      }
    }
    return flag
  }
  checkColumn(row, col, angka){
    let arr = this.createTempArrayBoard()
    let flag = true
    for(let j = 0; j < arr.length; j++){
      if(arr[j][col] == angka){
        flag = false
      }
      if(!flag){
        break
      }
    }
    return flag
  }
  checkBox(row, col, angka){
    let arr = this.createTempArrayBoard()
    let startRow = row
    let startCol = col
    let uniqueNum = {}
    while(startRow % 3 !== 0){
      startRow--
    }
    while(startCol % 3 !== 0){
      startCol--
    }
    let flag = true
    for(let i = startRow; i < startRow + 3; i++){
      for(let j = startCol; j < startCol + 3; j++){
        if(arr[i][j] == angka){
          flag = false
          break
        }
      }
      if(!flag){
        break
      }
    }
    return flag
  }
  checkPosibility(row, col, angka){
    if(this.checkRow(row,col,angka) && this.checkBox(row,col,angka) && this.checkColumn(row,col,angka)){
      return true
    }
    else{
      return false
    }
  }
}

// // The file has newlines at the end of each line,
// // so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
// console.log(game.board())
game.solve()
console.log(game.board())
