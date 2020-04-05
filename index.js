"use strict"

class Sudoku {
  constructor(board_string) {
    this.input = board_string
    this.papan = this.board()
    this.hasil = this.solve()
  }
  solve() {
    var kosong = this.cariKosong(this.papan)
    var keys = Object.keys(kosong)
    var num = 1
    for(let i = 1 ; i <= keys.length ; i++){
      let kordinatX = kosong[i][0]
      let kordinatY = kosong[i][1]
      if(num>9){
        this.papan[kordinatX][kordinatY] = 0
        let before_x = kosong[i-1][0]
        let before_y = kosong[i-1][1]
        num = this.papan[before_x][before_y] + 1
        i -= 2
      }
      else{
        let hasil = this.cekBaris(this.papan, kordinatX, num) && this.cekKolom(this.papan,kordinatY,num) && this.cekGrid(this.papan,kordinatX,kordinatY,num)
        if(hasil){
          this.papan[kordinatX][kordinatY] = num
          num = 1
        }
        else{
          num++
          i--
        }
      }
    }
    return this.papan
  }
  board(){
    let papan = []
    let start = 0
    for(let i = 0 ; i < 9 ; i++){
      let temp = []
      for(let j = 0 ; j < 9 ; j++){
        temp.push(Number(this.input[start]))
        start++
      }
      papan.push(temp)
    }
    return papan
  }

cekBaris(board ,kordinatX ,angka){
    let baris = kordinatX
    let kolom = 0
    for(kolom; kolom < board[baris].length ; kolom++){
      if(board[baris][kolom] === angka){
        return false
      }
    }
    return true
  }

cekKolom(board ,kordinatY ,angka){
    let kolom = kordinatY
    let baris = 0
    for(baris; baris < board.length; baris++){
      if(board[baris][kolom] === angka){
        return false
      }
    }
    return true
  }
  cekGrid(board, kordinatX, kordinatY, angka){
    let baris = 3 * Math.floor(kordinatX/3)
    let kolom = 3 * Math.floor(kordinatY/3)
    let barisBerhenti = baris + 3
    let kolomBerhenti = kolom + 3
    for(let i = baris; i < barisBerhenti; i++){
      for(let j = kolom; j < kolomBerhenti; j++){
        if(board[i][j] === angka){
          return false
        }
      }
    }
    return true
  }
cariKosong(board){
    let kordinat = {}
    let angka = 1
    for(let baris = 0 ; baris < board.length ; baris++){
      for(let kolom = 0 ; kolom < board[baris].length ; kolom++){
        if(board[baris][kolom] === 0){
          kordinat[angka] = []
          kordinat[angka].push(baris)
          kordinat[angka].push(kolom)
          angka++
        }
      }
    }
    return kordinat
  }
}

//Returns a string representing the current state of the board

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
.toString()
.split("\n")[0]
var game = new Sudoku('096040001100060004504810390007950043030080000405023018010630059059070830003590007')
// var game = new Sudoku (board_string)
console.log(game.hasil) 