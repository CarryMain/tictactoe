const cells = document.querySelectorAll('.cell');
const text = document.querySelector('.text');
const restartBtn = document.querySelector('.resetBtn');

const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ['','','','','','','','',''];
let currentPlayer = 'x';
let running = false;

function game() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    text.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellInd = this.getAttribute('data-item'); 

    if(options[cellInd] != '' || !running) {
        return 
    }

    updateCell(this, cellInd);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer == 'x' ? 'o' : 'x';
    text.textContent = `${currentPlayer}'s turn;`
}

function checkWinner() {
    let win = false;
    for(let i = 0; i < winCombination.length; i++) {
        const condition = winCombination[i];
        const a = options[condition[0]];
        const b = options[condition[1]];
        const c = options[condition[2]];

        if(a == '' || b == '' || c == '') {
            continue;
        }
        if(a == b && b == c) {
            win = true;
            break;
        }
    }

    if(win) {
        text.textContent = `${currentPlayer} wins!`
        running = false;
    }
    else if(!options.includes('')) {
        text.textContent = `${currentPlayer} Draw!`
        running = false;
    }
    else {
        changePlayer();
    }
}

function restartGame() {
    options = ['','','','','','','','',''];
    currentPlayer = 'x';
    text.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    running = true;
}

game();