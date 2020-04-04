"use strict"

class Sudoku {
  constructor(dataSudoku) {
    this.dataSudoku =dataSudoku
  }

  solve() {
    
  }

  // Returns a string representing the current state of the board
  board() {
    console.log(`----------------------`)
    for (let i = 0; i < this.dataSudoku.length; i++) {
     let temp='';
     for (let j = 0; j < this.dataSudoku[i].length; j++) {
       if(j==3 || j ==6){
        temp += ` | ${this.dataSudoku[i][j]}`
       }else{
        temp += ` ${this.dataSudoku[i][j]}`
       }
     }
     console.log(temp)

     if(i%3==2){
       console.log(`----------------------`)
     }
   }
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
let fs = require('fs')
let board_string = fs.readFileSync('./set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

//Ubah data
let dataArr=[];
let temp ='';
for (let i = 0; i < board_string.length-1; i++) {
  temp += board_string[i];
  if(temp.length == 9 ){
    dataArr.push(temp)
    temp='';
  }
}
let dataSudoku =[]
for (let i = 0; i < dataArr.length; i++) {
  dataSudoku[i]=dataArr[i].split('')
}


let game = new Sudoku(dataSudoku)

// // Remember: this will just fill out what it can and not "guess"
game.solve()
game.board()


