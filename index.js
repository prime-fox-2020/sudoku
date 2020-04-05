"use strict"

class Sudoku {
  constructor(board_string) {
    this.boards = board_string
    this.solvedBoard = this.board()
  }

  solve() {
    let row = 0
    let col = 0
    let isEmpty = true

    for(let i = 0; i < this.solvedBoard.length; i++){
      for(let j = 0; j < this.solvedBoard.length; j++){
        if(this.solvedBoard[i][j] === ' '){
          row = i
          col = j
          isEmpty = false
        }
      } 
    }

    if(isEmpty){
      return true
    }

    for(let num = 1; num <= this.solvedBoard.length; num++){
      if(this.isSafe(row,col,num)){
        this.solvedBoard[row][col] = num
        if(this.solve(this.solvedBoard)){
          return true
        }else{
          this.solvedBoard[row][col]  = ' '
        }
      }
    }

    return false
  }

  // Returns a string representing the current state of the board

  board() {
    if(!this.solvedBoard){

      let board = []
      let index = 0
  
      do{
        let num = []
        for(let i=0; i<9; i++){
          num = []
          for(let j=0; j<9; j++){
            if(this.boards[index] == 0){
              num.push(' ')
            }else{
              num.push(Number(this.boards[index]))
            }
            index++
          }
          board.push(num)
        }
      } while(index < this.boards.length-1)
      
      console.log('=============================Before===============================')
      console.table(board)

      return board
    } else if(this.solve()){
      return this.solvedBoard
    }
  }
  
  isSafe(row,col,num){
   
    for(let i=0; i<this.solvedBoard.length; i++){
      if(this.solvedBoard[i][col] === num && this.solvedBoard[row][i] === num){
        return false
      }
    }

    let rowBoxStart = row - row % Math.sqrt(this.solvedBoard)
    let colBoxStart = col - col % Math.sqrt(this.solvedBoard)

    let rowBox = rowBoxStart + Math.sqrt(this.solvedBoard)
    let colBox = colBoxStart + Math.sqrt(this.solvedBoard)

    for(let row=rowBoxStart; row<rowBox; row++){
      for(let col = colBoxStart; col <colBox ; col++){
        if(this.solvedBoard === num){
          return false
        }
      }
    }

    return true
  }
  
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
const fs = require('fs')
let board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]
  // console.log(board_string)

let game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()
console.log('=============================After===============================')
console.table(game.board())