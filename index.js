class Sudoku {
  constructor() { }

  isSafe(board, row, col, num) {
    for (let d = 0; d < board.length; d++) {
      if (board[row][d] == num) {
        return false
      }
    }

    for (let r = 0; r < board.length; r++) {
      if (board[r][col] == num) {
        return false
      }
    }

    let sqrt = Math.sqrt(board.length)
    let boxRowStart = row - row % sqrt
    let boxColStart = col - col % sqrt

    for (let r = boxRowStart; r < boxRowStart + sqrt; r++) {
      for (let d = boxColStart; d < boxColStart + sqrt; d++) {
        if (board[r][d] == num) {
          return false
        }
      }
    }

    return true
  }

  solve(board, n) {
    let row = -1
    let col = -1
    let isEmpty = true

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] == 0) {
          row = i
          col = j

          isEmpty = false;
          break
        }
      }
      if (!isEmpty) {
        break
      }
    }

    if (isEmpty) {
      return true
    }

    for (let num = 1; num <= n; num++) {
      if (this.isSafe(board, row, col, num)) {
        board[row][col] = num
        if (this.solve(board, n)) {
          return true;
        }
        else {
          board[row][col] = 0
        }
      }
    }

    return false
  }

  // Returns a string representing the current state of the board
  board(board, N) {
    let result = []

    for (let r = 0; r < N; r++) {
      let temp = []
      for (let d = 0; d < N; d++)
        temp.push(board[r][d])

      result.push(temp)
      // console.log('\n')
      // if ((r+1) % Math.sqrt(N) == 0) console.log('')
    }

    if (board.length !== 0) {
      console.table(result);
    }
    else {
      console.log(`========== THERE IS NO MORE DATA LEFT ==========\n`);
      console.log(`======= ALL PUZZLES ARE SOLVED! - ISMAIL =======\n`);
    }
  }
}

// DATA
let fs = require('fs')
let board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")


// console.log(board_string);

// DRIVER CODE for all puzzles

for (let i = 0; i < board_string.length; i++) {
  let board = []
  let temp = []
  for (let j = 0; j < board_string[i].length; j++) {
    // console.log(board_string[i])
    temp.push(Number(board_string[i][j]))
    if (temp.length > 8) {
      board.push(temp)
      temp = []
      // console.log(temp)
    }

  }

  if (i < board_string.length - 1) {
    console.log(`- BEFORE -`);
    console.table(board)
    console.log(`\n- AFTER -`);
  }

  let sudoku = new Sudoku(board)
  let N = board.length;

  if (sudoku.solve(board, N)) {
    sudoku.board(board, N)
    board = []
    if (i < board_string.length - 1) {
      console.log(`-- PUZZLE ${i + 1} SOLVED --\n`);
    }
  }
  else {
    console.log('No solution')
  }
}