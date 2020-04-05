"use strict"

class Sudoku {
  constructor(board_string) {
      this.sudokuNumbers=board_string
      ///// game .sudo isinya angka yang dikasih
  }
    
  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  clear(){
    console.clear()
  }

  solve() {
    let sudokuBoard = this.board()
    // return sudokuBoard
    // // return sudokuBoard
    var allNumbers = {}
    var numbersInsideAllNumbers ;
    var infiniteloop = 81; 
    var step = 0

    this.clear()
    console.log(sudokuBoard)
    console.log(`Check count ${step} !`)
    this.sleep(50)
    while (infiniteloop > 0){
    infiniteloop = 0 ;
    for(var vert = 0 ; vert < sudokuBoard.length ; vert ++){

        for(var hori = 0 ; hori < sudokuBoard.length ; hori ++){
            if(sudokuBoard[vert][hori]===0){
                allNumbers = {};
                for ( var i = 0 ; i < 9 ; i ++){
                    if(sudokuBoard[vert][i] > 0){
                        allNumbers[sudokuBoard[vert][i]]= true;
                    }
                    if (sudokuBoard[i][hori] > 0){
                        allNumbers[sudokuBoard[i][hori]]= true;
                    }
                }
                for (var checkvert = Math.floor(vert / 3) * 3 ; checkvert < Math.floor(vert / 3) * 3 + 3 ; checkvert ++){
                    for( var checkhori = Math.floor(hori / 3) * 3 ; checkhori < Math.floor(hori / 3) * 3 + 3 ; checkhori ++){
                        if(sudokuBoard [checkvert][checkhori]){
                            allNumbers[sudokuBoard[checkvert][checkhori]] = true
                        }
                    }
                }
            // console.log(allNumbers)
                numbersInsideAllNumbers = Object.keys(allNumbers);
                if(numbersInsideAllNumbers.length === 8){
                for( var i = 1 ; i < 10 ; i++){
                    if(numbersInsideAllNumbers.indexOf(i.toString()) < 0){
                        // console.log(vert,hori)
                        sudokuBoard[vert][hori] = i ; 
                        }
                    }
                }else{
                    infiniteloop++ 
                }
            }
        }
        this.clear()
        step++
        console.log(`Check count ${step} !`)
        console.log(sudokuBoard)
        this.sleep(50)
        this.clear()
      }
      }
    console.log(`Check count ${step} !`)
    console.log(sudokuBoard)
    return sudokuBoard

  }
  // Returns a string representing the current state of the board
  board() {
    let verticalArray=[]
    let horizontalArray=[]
    for(var i = 0 ; i < this.sudokuNumbers.length ; i ++){
        verticalArray.push(Number(this.sudokuNumbers[i]))
        if(i==8 || i==17 || i==26
          || i==35 || i==44 || i==53 
          || i==62 || i == 71 || i == 80){
        horizontalArray.push(verticalArray)
        verticalArray=[]
        }
     
    }
    return horizontalArray
  }
    
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
// GAME IS NEW SUDOKU
// Remember: this will just fill out what it can and not "guess"
game.solve()


///// game isinya 
// console.log(game.sudo)
// let enter = `\n`