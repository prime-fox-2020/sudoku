"use strict"

class Sudoku {
  constructor(dataSudoku) {
    this.dataSudoku =dataSudoku
  }

  //Menambah Method Untuk Menampilkan Data lama
  oldBoard() {
    console.log(` ------- INPUT -------`)
    console.log(` ---------------------`)
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
       console.log(` ---------------------`)
     }
   }
  }

  //Memasukan angka Sudoku Dengan mengecheck Perbaris dan Colum
  solve() {
    let angka ='123456789'; 
    for (let i = 0; i < this.dataSudoku.length; i++) {
      for (let j = 0; j < this.dataSudoku[i].length; j++) {
        if(this.dataSudoku[i][j]== '0' ){
          for (let k = 0; k < angka.length; k++) {
            if(game.flagging(this.dataSudoku,i,j,angka[k])){
              this.dataSudoku[i][j] = angka[k]
              if(game.solve()){
                return true
              }else{
                this.dataSudoku[i][j] = '0';
              }
            }
          }
          return false
        }
      }
    }
    return true
  }

  // Cek dengan bantuan Flagging
  flagging (data, baris, kolom, angka){
    for (let i = 0; i < data.length; i++) {
      // Menambah Flagging dengan Mencek per Area 3*3
      let row = Math.floor(i/3) + Math.floor(baris/3) *3
      let colum = i % 3 + Math.floor(kolom/3) * 3
      if (data[baris][i] == angka || data[i][kolom] == angka || data[row][colum] == angka) {
        return false;
      }
    }
    return true;
  }

  // Returns a string representing the current state of the board
  board() {
    console.log(`\n ------ SOLUSI -------`)
    console.log(` ---------------------`)
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
       console.log(` ---------------------`)
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

// Mengubah data Input menjadi data Array 9*9
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
game.oldBoard()
game.solve()
game.board()


