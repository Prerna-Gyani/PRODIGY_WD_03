const gameBoard = document.getElementById('game-board');
const cells = Array.from(document.getElementsByClassName('cell'));
const resetButton = document.getElementById('reset-button');
const player1Input = document.getElementById('player1-name');
const player2Input = document.getElementById('player2-name');
const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let player1Score = 0;
let player2Score = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkForWinner()) {
        alert(`${currentPlayer === 'X' ? player1Input.value || 'Player 1' : player2Input.value || 'Player 2'} has won!`);
        updateScore();
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        alert('Game is a draw!');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkForWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

function updateScore() {
    if (currentPlayer === 'X') {
        player1Score++;
        player1ScoreElement.textContent = player1Score;
    } else {
        player2Score++;
        player2ScoreElement.textContent = player2Score;
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
