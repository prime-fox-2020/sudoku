"use strict"

class Sudoku {
  constructor(board_string) {
    this.angka=board_string
    this.sudoku=this.arrBoard()
    this.emptyPlaces=this.checkEmpty()
  }

  solve() {
    let empty=0
    while (!this.isZero()){
      let row =this.emptyPlaces[empty][0]
      let col =this.emptyPlaces[empty][1]
      let number=this.sudoku[row][col]

      while(number<10){
        if(this.checkAll(row,col,number)){
          this.sudoku[row][col]=number
          empty++
          break
        }
        if(number==9){
          this.sudoku[row][col]=0
          empty--
        }
        number++
      }
    }
  }

  isZero(){
    for (let i = 0; i < this.sudoku.length; i++) {
      for (let j = 0; j < this.sudoku[i].length; j++) {
        if(this.sudoku[i][j]==0){
          return false
        }   
      }
    }
    return true
  }
  arrBoard(){
    let arr=[]
    let board=[]
    let angka=0
    for (let i = 0; i < this.angka.length; i++) {
      arr.push(this.angka[i])
      angka++
      if(angka==9){
        board.push(arr)
        angka=0
        arr=[]
      }
    }
    return board
  }

  checkEmpty(){
    let empty=[]
    for (let i = 0; i < this.sudoku.length; i++) {
      for (let j = 0; j < this.sudoku[i].length; j++) {
        if(this.sudoku[i][j]==0){
          empty.push([i,j])
        }
      }
    }
    return empty
  }

  checkHorizontal(row,number){
    for (let i = 0; i < this.sudoku.length; i++) {
      if(this.sudoku[row][i]==number){
        return false
      }
    }
    return true
  }

  checkVertical(col,number){
    for (let i = 0; i < this.sudoku.length; i++) {
      if(this.sudoku[i][col]==number){
        return false
      }
    }
    return true
  }

  checkBox(row,col,number){
    let indexRow=Math.floor(row/3)*3
    let indexCol=Math.floor(col/3)*3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if(this.sudoku[i+indexRow][j+indexCol]==number){
          return false
        }
      }  
    }
    return true
  }

  checkAll(row,col,number){
    let checkRow=this.checkHorizontal(row,number)
    let checkCol=this.checkVertical(col,number)
    let box=this.checkBox(row,col,number)
    if(checkRow&&checkCol&&box){
      return true
    }
    return false
  }

  // Returns a string representing the current state of the board
  board() {
    let display='-----------\n'
    for (let i = 0; i < this.sudoku.length; i++) {
      for (let j = 0; j < this.sudoku[i].length; j++) {
        display+=this.sudoku[i][j]
          if((j+1)%3==0&&(j+1)%9!==0){
            display+='|'
          }else if ((j+1)%9==0){
            display+='\n'
          } 
      }
      if((i+1)%3==0){
        display+='-----------\n'
      } 
    }
    return display
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

// console.log(game.checkEmpty())

console.log(game.board())

game.solve()

console.log(game.board())