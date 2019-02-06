// select all 9 cells of the game board
// it returns an array of all the cells, console log cells to check it out
let cells = document.querySelectorAll('.row div');


let gameOver = false; //a variable we can toggle depending on if the game is over or not
let currentPlayer = 'X'; //defines the starting player string
let moveCount = 0; //a variable to track how many moves have been made

// loop through the array of cells
for (let i = 0; i < cells.length; i++) {
    //tell each cell in the array to run the function "cellClicked"
    //only when it is clicked on
    cells[i].addEventListener('click', cellClicked);
}

// function that runs each time a cell is clicked
function cellClicked() {

    if(gameOver) {
        resetBoard();
        return;
    }

    //check to prevent a player from drawing over an occupied space
    //if the space isn't empty, don't draw in it!
    if (event.target.textContent !== '') {
        //return; keyword stops cellClicked HERE
        //it never gets down to the rest of the code below this statement!
        return;
    }

    //draws the value of currentPlayer into the cell we click on
    event.target.textContent = currentPlayer;

    //increments moveCount by 1
    moveCount++;

    //runs a function that checks if we have:
    //a winner or a draw
    checkGameWinOrDraw();

    //runs the togglePlayer function after drawing a player
    togglePlayer();
}

//toggles between X and O on each click
function togglePlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
}

//our main function for checking if the game has a winner or ended in a draw
//runs on EVERY click to check
function checkGameWinOrDraw() {
    //checks all winning combos to see if someone won
    if (checkTop() || checkMiddleRow() || checkBottom() || checkLeft() || checkMiddleColumn() || checkRight() || checkDiagnols()) {
        gameOver = true;
        document.getElementById('message').textContent = currentPlayer + ' is the winner!';
        //if the first if statement is still false AND the moveCount is 9, it's a draw
    } else if (moveCount === 9) {
        gameOver = true;
        document.getElementById('message').textContent = 'It is a draw!';
    }
}

//used to reset the board when gameOver is true
//clears the board, the message banner,
//and resets moveCounter, gameOver, and currentPlayer back to their original values
function resetBoard() {
    gameOver = false;
    moveCount = 0;
    currentPlayer = 'X';
    document.getElementById('message').textContent = '';
    // loop through the array of cells
    for (let i = 0; i < cells.length; i++) {
        //clear each cell of "X" and "O"
        cells[i].textContent = '';
    }
}

//checks any 3 cells if all their text content is the same
//ie are they all "X" or all "O"?
//if they are, return true 'cause we got a winner!
function checkCells(a, b, c) {
    if (cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent) {
        return true;
    } else {
        return false;
    }
}

//checks 3 cells to see if any are empty, if they are, return true
function isEmpty(a, b, c) {
    if (cells[a].textContent === '' || cells[b].textContent === '' || cells[c].textContent === '') {
        return true;
    } else {
        return false;
    }
}

//top cells, aka index positions in the array of "cells"
//0,1,2
//makes sure checkCells returns true
//and isEmpty returns false
//meaning they all have the same value and they arne't empty
function checkTop() {
    if (checkCells(0, 1, 2) && !isEmpty(0, 1, 2)) {
        return true;
    } else {
        return false;
    }
}

//the rest of the below functions are the same idea as checkTop,
//except they deal with every other winning row or column
function checkMiddleRow() {
    if (checkCells(3, 4, 5) && !isEmpty(3, 4, 5)) {
        return true;
    } else {
        return false;
    }
}

function checkBottom() {
    if (checkCells(6, 7, 8) && !isEmpty(6, 7, 8)) {
        return true;
    } else {
        return false;
    }
}

function checkLeft() {
    if (checkCells(0, 3, 6) && !isEmpty(0, 3, 6)) {
        return true;
    } else {
        return false;
    }
}

function checkMiddleColumn() {
    if (checkCells(1, 4, 7) && !isEmpty(1, 4, 7)) {
        return true;
    } else {
        return false;
    }
}

function checkRight() {
    if (checkCells(2, 5, 8) && !isEmpty(2, 5, 8)) {
        return true;
    } else {
        return false;
    }
}

function checkDiagnols() {
    if ((checkCells(0, 4, 8) && !isEmpty(0, 4, 8)) || (checkCells(2, 4, 6) && !isEmpty(2, 4, 6))) {
        return true;
    } else {
        return false;
    }
}