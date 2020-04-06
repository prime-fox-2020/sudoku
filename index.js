"use strict"

const validation = require('./lib/validation')

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string;
    this.gameBoard = []
    this.filling = []
  }

  solve() {
    this.generateBoards();
    this.fillBoard();

    // start load solver library
    let counter = 0;
    let sv = new validation()


    while (counter < this.filling.length) {
      this.gameBoard[this.filling[counter].X][this.filling[counter].Y]++;
      
      sv.board = this.gameBoard
      sv.row = this.filling[counter].X;
      sv.column = this.filling[counter].Y;

      // trying to solve .....

      while(!sv.onRow || !sv.onColumn || !sv.onBoard) {
        this.gameBoard[this.filling[counter].X][this.filling[counter].Y]++;      
      }
      // backtrack
      if (this.gameBoard[this.filling[counter].X][this.filling[counter].Y] > 9) {
        this.gameBoard[this.filling[counter].X][this.filling[counter].Y] = 0;
        counter--;
      } else {
        counter++
      }

    }
  }

  // Returns a string representing the current state of the board
  board() {
    let result = '', line = '=';

    for (let x = 0; x < this.gameBoard.length; x++) {
      if (x % 3 == 0) result += `${line.repeat(22)}\n` 
      for (let y = 0; y < this.gameBoard[x].length; y++) {
        result += this.gameBoard[x][y];
        result += (y % 3 == 2 && y !== this.gameBoard[x].length - 1) ? ' | ' : ' ';
      }
      result += '\n';
    }
    result += line.repeat(22)
    return result;
  }

  generateBoards() {
    let cache = [];
    this.gameBoard = [];
    
    // starting importing data from textfile
    for (let i = 0; i < this.board_string.length; i++) {
      cache.push(+this.board_string[i]);
      if (i % 9 === 8) {
          this.gameBoard.push(cache);
          cache = [];
      }
    }
  }

  fillBoard() {
    this.filling = [];
    for (let x = 0; x < this.gameBoard.length; x++) {
      for (let y = 0; y < this.gameBoard[x].length; y++) {
        if (this.gameBoard[x][y] == 0) {
          let mem_Obj = {}
          mem_Obj.X = x;
          mem_Obj.Y = y;
          this.filling.push(mem_Obj);
        }
      }
    }
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
game.solve()

console.log(game.board())
