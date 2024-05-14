document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const message = document.getElementById("message");
    let currentPlayer = "Your Turn";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.textContent = "";
        });
        const winner = checkWinner(); 
        if (winner) {
            message.textContent = `Player ${winner} wins!`; 
        } else if (!gameBoard.includes("")) {
            message.textContent = "It's a draw!";
        } else {
            currentPlayer = "Your Turn";
            message.textContent = `${currentPlayer}`;
            if (currentPlayer === "Computer's Turn") {
                setTimeout(computerMove, 1000); 
            }
        }
    }
    
    function computerMove() {
        
        const emptyCells = getEmptyCells();
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const cell = emptyCells[randomIndex];
        cell.textContent = "O"; 
        const index = parseInt(cell.dataset.index);
        gameBoard[index] = "O"; 
        const winner = checkWinner();
        if (winner) {
            message.textContent = `Player ${winner} wins!`;
            resetGame(); 
        } else if (!gameBoard.includes("")) {
            message.textContent = "It's a draw!";
            resetGame(); 
        } else {
            currentPlayer = "Your Turn";
            message.textContent = `${currentPlayer}`;
        }
    }

    function handleCellClick(cell) {
        console.log("Cell clicked:", cell.dataset.index); 
        if (!cell.textContent && !checkWinner()) {
            cell.textContent = currentPlayer === "Your Turn" ? "X" : ""; 
            const index = parseInt(cell.dataset.index);
            gameBoard[index] = "X"; 
            const winner = checkWinner();
            if (winner) {
                message.textContent = `Player ${winner} wins!`;
                resetGame(); 
            } else if (!gameBoard.includes("")) {
                message.textContent = "It's a draw!";
                resetGame(); 
            } else {
                currentPlayer = "Computer's Turn";
                message.textContent = `${currentPlayer}`;
                setTimeout(computerMove, 1000); 
            }
        }
    }

    function getEmptyCells() {
        return [...document.querySelectorAll(".cell")].filter(cell => !cell.textContent);
    }

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                const winner = gameBoard[a];
                alert(`Player ${winner} wins!`); 

                return winner;
            }
        }
        return null;
    }
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", () => {
            handleCellClick(cell);
        });
        board.appendChild(cell);
    }

    resetGame();
});



