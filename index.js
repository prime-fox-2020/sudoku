"use strict"

class Check {
  constructor() {
    this.value  = this.value()
  }
  value(){
    let obj = {
      1:false,
      2:false,
      3:false,
      4:false,
      5:false,
      6:false,
      7:false,
      8:false,
      9:false
    }
    return obj
  }

  findOneFalse(numI, numJ, check, arr){
    let numMinI = 0
    let numMaxI = 0
    let numMinJ = 0
    let numMaxJ = 0
    let length = 9;

    if(numI >= 0 && numI <= 2){
      numMinI = 0
      numMaxI = 2
    } else if (numI >= 3 && numI <= 5) {
      numMinI = 3
      numMaxI = 5
    } else if (numI >= 6 && numI <= 8) {
      numMinI = 6
      numMaxI = 8
    }
    if(numJ >= 0 && numJ <= 2){
      numMinJ = 0
      numMaxJ = 2
    } else if (numJ >= 3 && numJ <= 5) {
      numMinJ = 3
      numMaxJ = 5
    } else if (numJ >= 6 && numJ <= 8) {
      numMinJ = 6
      numMaxJ = 8
    }

    for (let i = 0; i < length; i++) {
      if (arr[numI][i] != ' ')
        check[arr[numI][i]] = true
      if (arr[i][numJ] != ' ')
        check[arr[i][numJ]] = true
    }
    
    for (let i = numMinI; i <= numMaxI; i++) {
      for (let j = numMinJ; j <= numMaxJ; j++) {
        if(arr[i][j] != ' ')
          check[arr[i][j]] = true
      }
    }

    let count = 0
    for(let key in check) {
      if (check[key] == true)
        count++
    }
    
    if (count == 8) {
      for(let key in check) {
        if (check[key] == false)
          arr[numI][numJ] = Number(key)
      }
      return true
    } else {
      return false
    }
  }
}

class Sudoku {
  constructor(board_string) {
    this.data = board_string
    this.arr = this.arr()
  }

  solve() {
    while(this.empty()) {
      for (let i = 0; i < this.arr.length; i++) {
        for (let j = 0; j < this.arr[i].length; j++) {
          if (this.arr[i][j] == ' '){
            let check = new Check()
            check = check.findOneFalse(i,j, check.value, this.arr)
          }
        }
      }
    }
  }
  
  board() {
    let temp = '+-----------------------------------+\n';
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr[i].length; j++) {
        temp += `| ${this.arr[i][j]} `
      }
      if (i != this.arr.length-1)
        temp += '|\n|---|---|---|---|---|---|---|---|---|\n'
      else
        temp += '|\n+-----------------------------------+'
    }
    return temp
  }

  empty(){
    let check = false;
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr[i].length; j++) {
        if (this.arr[i][j] == ' '){
          check = true
        }
      }
    }
    return check
  }

  arr(){
    let arr = []
    let length = 9;
    let count = 0

    for (let i = 0; i < length; i++) {
      let temp = []
      for (let j = 0; j < length; j++) {
        if (this.data[count] != 0) {
          temp.push(this.data[count])
        } else {
          temp.push(' ')
        }
        count++
      }
      arr.push(temp)
    }
    return arr
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')

var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"

console.log(game.board());
game.solve();
console.log(game.board());