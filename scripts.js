//check validity of row, column, or subsquare of a sudoku board
function lineValid(grid, row) {
    for (var i=0; i<9; i++) {
      for (var x=0; x<9; x++) {
        if (grid[row][i] == grid[row][x] && x!==i && grid[row][x]!==0) {
            return false
        }
      }
    }
    return true
  } 

function columnValid(grid,column) {
    for (var i=0; i<9; i++) {
      for (var x=0; x<9; x++) {
        if (grid[i][column] == grid[x][column] && x!==i && grid[x][column]!==0) {
            return false
        }
      }
    }
    return true
  }

function squareValid(grid,row,column) {
    if (row >= 0 && row <= 2) {
      var x = 0;
    } else if (row >= 3 && row <= 5) {
      var x = 3;
    } else if (row >=6 && row <=8) {
      var x = 6;
    };

    if (column >= 0 && column <= 2) {
      var y = 0;
    } else if (column >= 3 && column <= 5) {
      var y = 3;
    } else if (column >=6 && column <=8) {
      var y = 6;
    };

    var lst = [];

    for (var i=0; i<3; i++) {
      for (var a=0; a<3; a++) {
        lst.push(grid[x+i][y+a]);
      }
    };

    for (var i=0; i<9; i++) {
        for (var x=0; x<9; x++) {
          if (lst[i]==lst[x] && x!=i && lst[i]!==0 && lst[x]!=0) {
            return false
          }
        }
      }
    return true
    };

//check validity of entire sudoku board
function checkValidity(grid,row,column) {
    return (this.lineValid(grid,row) && this.columnValid(grid,column) && this.squareValid(grid,row,column));
  }

function nextPosition(row,column) {
    if (column==8) {
      var newPosit = [row+1, 0]
    } else {
      var newPosit = [row, column+1]
    }
    return newPosit;
  }

//solving algorithm (input/output are both 2D array)
function solveGrid(grid,row,column) {
    if (row==9) {
        // console.log(grid);
        return grid
    } else if (grid[row][column]!==0) {
        var newPosit = this.nextPosition(row,column);
        return this.solveGrid(grid,newPosit[0],newPosit[1])
    } else {
        for (var i=1; i<10; i++) {
          grid[row][column] = i;
          if (this.checkValidity(grid,row,column)) {
              var nextPosit = this.nextPosition(row,column);
              if (this.solveGrid(grid,nextPosit[0],nextPosit[1])) {
                  return grid;
              }
          }
        }
      grid[row][column]=0;
      return false;
    }
  }

//make sure user enters valid sudoku board
function validateInputs(arr) {
     for (var i=0; i<arr.length; i++) {
       if (arr[i].includes(NaN)) {
         alert("Please enter a valid Sudoku board.");
         return false
       }
     }
     return true
  }

//convert user input to 2D array
function collectInputs() {
    var gridArray = [];
    var inputs = document.getElementsByClassName('cell');

    for (var i=0; i<81; i+=9) {
      var rowArray = [];
      for (var index=i; index<i+9; index++) {
        if (inputs[index].value === "") {
          rowArray.push(0);
        } else {
          rowArray.push(parseInt(inputs[index].value));
        }
      }
      gridArray.push(rowArray);
    }

    if (this.validateInputs(gridArray)) {
      return gridArray;
    } else {
      return false;
    }
  }

//fill board from 2D array
function fillBoard(answers) {
      var cells = document.getElementsByClassName('cell');
      for (var i=0; i<cells.length; i++) {
         cells[i].value = answers[Math.floor(i/9)][i%9]
      }
  }

//collect inputs, solve puzzle, display result in the board
function solvePuzzle() {
    var grid = this.collectInputs();
    if (grid !== false) {
      var solvedGrid = this.solveGrid(grid,0,0)
      // console.log(this.solveGrid(grid,0,0));
      if (!solvedGrid) {
        alert("This Sudoku board is invalid.")
      } else {
        this.fillBoard(solvedGrid);
      }
    }
  }

//clears sudoku grid
function clearBoard() {
    var cells = document.getElementsByClassName('cell');
    for (var i=0; i<cells.length; i++) {
       cells[i].value = ""
    }
  }