"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string;
  }

  check(options, array){
    for(let i=0; i<options.length; i++){
      for(let j=0; j<array.length; j++){
        if(options[i] == array[j]){
          options[i] = '0';
        }
      }
    }
    let arr = [];
    for(let i=0; i<options.length; i++){
      if(options[i] != '0'){
        arr.push(options[i])
      }
    }
    return arr;
  }

  generateRow(num){
    let row = [];
    for(let i=0; i<9; i++){
      row.push( this.board_string[i + (9 * (Math.floor(num/9)))]);
    }
    return row;
  }

  generateColumn(num){
    let col = [];
    while(num >= 9){
      num -= 9;
    }
    for(let i=0; i<9; i++){
      col.push(this.board_string[i*9+num]);
    }
    return col;
  }

  generateSquare(num){
    let box = []
    while((num >= 9 && num < 27) || (num >= 36 && num < 54) || (num >= 63) ){
      num -=9;
    }
    let startIndex = [0,3,6,27,30,33,54,57,60];
    for(let i = startIndex.length-1; i >= 0; i--){
      if(startIndex[i] <= num){
        num = startIndex[i];
        break;
      }
    }
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        box.push(this.board_string[num + i*9 + j]);
      }
    }
    return box;
  }

  solve() {
    let check = false;
    for(let i=0; i<this.board_string.length; i++){
      if(this.board_string[i] == '0'){
        let options = ['1','2','3','4','5','6','7','8','9'];
        options = this.check(options, this.generateRow(i));
        options = this.check(options, this.generateColumn(i));
        options = this.check(options, this.generateSquare(i));
        if(options.length == 1){
          this.board_string = this.board_string.substring(0,i) + options[0] + this.board_string.substring(i+1)
          check = true;
        }
      }
    }
    if(check == true) this.solve();
  }

  // Returns a string representing the current state of the board
  board() {
    let tempBoard = [];
    for(let i=0; i<9; i++){
      let arrayString = '';
      for(let j=0; j<9; j++){
        if(j == 3 || j == 6){
          arrayString += '|'
        }
        arrayString += ` ${this.board_string[i*9+j]} `;
      }
      tempBoard.push(arrayString);
    }
    console.log('-----------------------------');
    for(let i=0; i<3; i++){
      console.log(tempBoard[i]);
    }
    console.log('-----------------------------');
    for(let i=3; i<6; i++){
      console.log(tempBoard[i]);
    }
    console.log('-----------------------------');
    for(let i=6; i<9; i++){
      console.log(tempBoard[i]);
    }
    console.log('-----------------------------');
  }
}
// The file has newlines at the end of each line,
// so we call split to remove it (\n)
const fs = require('fs');
var board_strings = fs.readFileSync('set-01_sample.unsolved.txt', 'utf-8').toString().split("\n");

let boardstring = board_strings[0]; //
var game = new Sudoku(boardstring)
console.log('\nUnsolved Sudoku Board:')
game.board();
console.log('\nSolved Sudoku Board:')
game.solve();
game.board(); 