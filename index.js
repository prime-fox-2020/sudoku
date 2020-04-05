"use strict"

class Sudoku {
  constructor(board_string) {
    this._soal = board_string;
    this._complete = '';
  }

  get soal() {
    return this._soal;
  }

  get complete() {
    return this._complete;
  }

  set complete(val) {
    this._complete = val;
  }

  //membuat array per baris
  baris(str) {
    let arr = [], temp = [];
    for (let i in str) {
      temp.push(str[i]);
      if ((+i + 1) % 9 == 0) {
        arr.push(temp);
        temp = [];
      }
    }
    return arr;
  }

  // membuat array per kolom
  kolom(baris) {
    let arr = [];
    for (let i in baris) {
      let temp = '';
      for (let j in baris) {
        temp += baris[j][i];
      }
      arr.push(temp);
    }
    return (arr);
  }

  //membuat array per blok
  blok(baris) {
    let arr = [];
    for (let i = 0; i < baris.length; i += 3) {
      for (let j = 0; j < baris.length; j += 3) {
        let temp = '';
        for (let k = i; k < i + 3; k++) {
          for (let l = j; l < j + 3; l++) {
            temp += baris[k][l];
          }
        }
        arr.push(temp);
      }
    }
    return arr;
  }

  //penyelesaian sudoku
  solve() {
    let result = this.baris(this.soal), cond = true; //memasukkan array baris sekaligus sebagai result
    while (cond == true) { //memberhentikan pengecekkan keseluruhan
      cond = false;
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
          // keseluruhan fungsi mulai dari sini
          if (result[i][j] == '0') { 
            cond = true;
            //cek per baris (membuat array uniqe number per baris)
            let br = []; // array unique number (angka yg tidak terdapat di baris array)
            for (let a = 1; a <= result[i].length; a++) {
              let cn = false;
              for (let b in result[i]) {
                if (result[i][b] == a) {
                  cn = true;
                  break;
                }
              }
              if (cn == false) br.push(String(a));
            }
            //cek per kolom (membuat array uniqe number per kolom)
            let kolom = this.kolom(result), kl = []; // array unique number (angka yg tidak terdapat di kolom array)
            for (let a = 1; a <= kolom[j].length; a++) {
              let cn = false;
              for (let b in kolom[j]) {
                if (kolom[j][b] == a) {
                  cn = true;
                  break;
                }
              }
              if (cn == false) kl.push(String(a));
            }
            //cek per blok (membuat array uniqe number per kolom)
            let blok = this.blok(result), bk = [], pos = 0; // array unique number (angka yg tidak terdapat di blok array)
            if (i < 3) pos = 0;
            else if (i < 6) pos = 1;
            else if (i < 9) pos = 2;
            if (j < 3) pos = pos * 3 + 0;
            else if (j < 6) pos = pos * 3 + 1;
            else pos = pos * 3 + 2;
            for (let a = 1; a <= blok[pos].length; a++) {
              let cn = false;
              for (let b in blok[pos]) {
                if (blok[pos][b] == a) {
                  cn = true;
                  break;
                }
              }
              if (cn == false) bk.push(String(a));
            }

            //penentuan hasil
            let hasil = [];
            //pengecekkan unique number yang sama antara unique number di array baris, kolom, dan blok
            for (let a in br) {
              for (let b in kl) {
                if (kl[b] == br[a]) {
                  for (let c in bk) {
                    if (bk[c] == kl[b]) hasil.push(bk[c]);
                  }
                }
              }
            }
            //hasil langsung dipanggil apabila unique number yang sama hanya ada 1
            if (hasil.length == 1) result[i][j] = hasil[0]; 
            //lanjut pengecekkan dengan metode berbeda
            else {
              //pengecekkan berdasarkan array hasil
              for (let a in hasil) {
                //pengecekkan per indek hasil berdasarkan array baris(result)
                let find = this.findSame(result, i, j, hasil[a]);
                if (find !== '0') {
                  result[i][j] = find;
                  break;
                }
                else {
                  //pengecekkan per indek hasil berdasarkan array kolom 
                  find = this.findSame(kolom, j, i, hasil[a]);
                  if (find !== '0') {
                    result[i][j] = find;
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }
    //input ke properti complete sebagai string
    for (let i in result){
      for (let j in result[i]){
        this.complete += result[i][j];
      }
    }
    return this;
  }

  findSame(arr, i, j, hasil) {
    // banding 1 - 4 merupakan indeks pembanding 
    let banding1 = 0, banding2 = 0, banding3 = 0, banding4 = 0;
    if (i == 0 || i % 3 == 0) {
      banding1 = 1;
      banding2 = 2;
    }
    else if (i == 1 || i % 3 == 1) {
      banding1 = -1;
      banding2 = 1;
    }
    else if (i == 2 || i % 3 == 2) {
      banding1 = -2;
      banding2 = -1;
    }
    if (j == 0 || j % 3 == 0) {
      banding3 = 1;
      banding4 = 2;
    }
    else if (j == 1 || j % 3 == 1) {
      banding3 = -1;
      banding4 = 1;
    }
    else if (j == 2 || j % 3 == 2) {
      banding3 = -2;
      banding4 = -1;
    }
    let find = 0;
    for (let b in arr[i + banding1]) {
      if (arr[i + banding1][b] == hasil) {
        find++;
        break;
      }
    }
    for (let b in arr[i + banding2]) {
      if (arr[i + banding2][b] == hasil) {
        find++;
        break;
      }
    }
    //cek apakah value di sekitar (atas bawah atau kiri kanan) bernilai '0' atau tidak
    if (arr[i][j + banding3] !== '0' && arr[i][j + banding4] !== '0' && find == 2) return hasil;
    else return '0';
  }

  // Returns a string representing the current state of the board
  board() {
    console.log(`---------------------
        SOAL
---------------------`);
    for (let i = 0; i < 9; i++) {
      let print = '';
      for (let j = 0; j < 9; j++) {
        if (this.soal[9 * i + j] == '0') print += '_ ';
        else print += `${this.soal[9 * i + j]} `;
        if ((j + 1) % 3 == 0 && j !== 8) print += '| ';
      }
      console.log(print);
      if ((i + 1) % 3 == 0) console.log('---------------------');
    }
    console.log();
    console.log(`---------------------
      COMPLETE
---------------------`);
    for (let i = 0; i < 9; i++) {
      let print = '';
      for (let j = 0; j < 9; j++) {
        print += `${this.complete[9 * i + j]} `;
        if ((j + 1) % 3 == 0 && j !== 8) print += '| ';
      }
      console.log(print);
      if ((i + 1) % 3 == 0) console.log('---------------------');
    }
    return;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[2]

var game = new Sudoku(board_string)
// Remember: this will just fill out what it can and not "guess"
game.solve();

game.board();