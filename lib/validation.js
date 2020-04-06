"use strict"

class Validation {
    constructor() {
        this._board;
        this._row;
        this._column;
    }

    set board (board) {
        this._board = board;
    }

    set row (row) {
        this._row = row
    }

    set column (column) {
        this._column = column;
    }

    get onRow () {
        for (let i = 0; i < this._board[this._row].length; i++) {
            if (this._board[this._row][i] === this._board[this._row][this._column] && i !== this._column) {
                return false;
            }
        }
        return true;
    }

    get onColumn () {
        for (let i = 0; i < this._board.length; i++) {
            if (this._board[i][this._column] === this._board[this._row][this._column] && i !== this._row) {
                return false;
            }
        }
        return true;
    }

    get onBoard () {
        for (let x = Math.floor(this._row / 3) * 3; x < Math.floor(this._row / 3) * 3 + 3; x++) {
            for (let y = Math.floor(this._column / 3) * 3; y < Math.floor(this._column / 3) * 3 + 3; y++) {
                if (this._board[x][y] === this._board[this._row][this._column] && x !== this._row && y !== this._column) {
                    return false;
                }
            }
        }
        return true;
    }
}

module.exports = Validation;