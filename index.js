// 1. *Grid completed in html file
// 2. When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
// 3. A heading should say whether it is X's or O's turn and change with each move made.
// 4. A button should be available to clear the grid and restart the game.
// When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.


let currentPlayer = 'X'; //X will start the game
const turnChange = document.getElementById('turn');
const winnerAlert = document.getElementById('winnerAlert');
const winnerNameSpan = document.getElementById('winnerName');
const drawAlert = document.getElementById('drawAlert');
const resetButton = document.getElementById('resetButton');

const buttons = document.querySelectorAll('.btn');

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnChange.textContent = `It is ${currentPlayer}'s turn`;
}

function checkWinner() {
    const cells = document.querySelectorAll('.btn');
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return cells[a].textContent; // Returns 'X' or 'O' if there's a winner
        }
    }

    return null; // Return null if there's no winner
}
function isBoardFull() {
    // Check if all buttons have been clicked
    for (let i = 0; i < buttons.length; i++) {
        if (!buttons[i].textContent) {
            return false; // There's an empty button, board is not full
        }
    }
    return true;
}

buttons.forEach(button => {
    if (!button.hasEventListener) {//troubleshooting
        button.hasEventListener = true;//troubleshooting
        button.addEventListener('click', () => {
            console.log('button was clicked!');//troubleshooting
            console.log('button text content:', button.textContent);//troubleshooting
            if (!button.textContent) {
                button.textContent = currentPlayer;
                const winner = checkWinner();
                if (winner) {
                    console.log(`Player ${winner} wins!`);
                    winnerNameSpan.textContent = winner;
                    winnerAlert.classList.remove('d-none');
                } else if (isBoardFull()) {
                    console.log("It's a draw!");
                    drawAlert.classList.remove('d-none');
                }

            }
            changePlayer();
        });
    }
});

//found the problem in my code- html had text in button so !button was returning false...removed text, game works.
resetButton.addEventListener('click', (event) => {
    buttons.forEach(button => {
        button.textContent = '';
    });
    // Reset turn message
    turnChange.textContent = `It is X's turn`;
    // Hide winner or draw alert
    winnerAlert.classList.add('d-none');
    drawAlert.classList.add('d-none');
    // Reset currentPlayer to 'X'
    currentPlayer = 'X';
});
