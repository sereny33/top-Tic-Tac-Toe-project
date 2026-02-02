function gameActions() {
    // Create gameboard
    let gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];


    const resetGameboard = () => {
        gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        document.querySelectorAll('.field').forEach((cell) => {
            cell.innerHTML = `-`;
            cell.classList.remove('yellow');
            cell.classList.remove('circle');
            cell.classList.remove('cross');
            document.getElementById('currentPlayer').innerHTML = ``;
        });

    }
    // Create Players
    const createPlayer = (marker) => {
        const name = prompt(`Игрок ${marker} Введите ваше имя`, `${marker}`);
        return { name, marker };
    }

    playerX = createPlayer('X');
    playerO = createPlayer('O');

    // Current player is always X in the beginning
    let currentPlayer = playerX;


    // Allows to pass currentPlayer somwhere else
    const getCurrentPlayer = () => currentPlayer
    
    // Change current player
    const switchPlayer = () => {
        (currentPlayer === playerX)
            ? currentPlayer = playerO
            : currentPlayer = playerX
        return currentPlayer
    };

    // Make turn 
    const makeTurn = (index) => {
        if (gameboard[index] !== 0) return;

        gameboard[index] = currentPlayer.marker

        if (!getGameStatus()) {
            switchPlayer();
        }
    }

    // Check if anyone has won
    const getGameStatus = () => {

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ];

        const winningCombo = winningConditions.find(combo => {
            const [firstElement, secondElement, thirdElement] = combo;
            return (gameboard[firstElement] !== 0
                && gameboard[firstElement] === gameboard[secondElement]
                && gameboard[firstElement] === gameboard[thirdElement])
        });

        if (winningCombo) {
            return {
                winner: gameboard[winningCombo[0]],
                winnerLine: winningCombo
            }
        }

        if (!gameboard.includes(0)) {
            return {
                winner: 'Draw',
            }
        } else {
            return false;
        }
    }

    return { gameboard, getCurrentPlayer, playerX, playerO, createPlayer, makeTurn, switchPlayer, getGameStatus, resetGameboard }
}

function playGame() {

    // Starts new game
    game = gameActions();

    // Changes cell signs
    document.querySelectorAll('.field').forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (game.gameboard[index] !== 0) return;

            // cell.innerHTML = `${game.getCurrentPlayer().marker}`;
            if (game.getCurrentPlayer().marker === "O") {
                cell.classList.add('circle');
            } else {
                cell.classList.add('cross');
            }
            game.makeTurn(index);

            document.getElementById('currentPlayer').innerHTML = `Player ${game.getCurrentPlayer().marker} turn`;

            const gameStatus = game.getGameStatus();
            if (gameStatus.winner === 'Draw') {
                document.querySelectorAll('.field').forEach((cell) => {
                    cell.innerHTML = `draw`
                });
                return;
            } else if (gameStatus.winner === "X") {
                document.querySelectorAll('.field').forEach((cell) => {
                    cell.innerHTML = `${game.playerX.name} has won`;
                    gameStatus.winnerLine.forEach(index => {
                        const yellowField = document.getElementById(index);
                        yellowField.classList.add('yellow')
                    })
                });
                return;
            } else if (gameStatus.winner === "O") {
                document.querySelectorAll('.field').forEach((cell) => {
                    cell.innerHTML = `${game.playerO.name} has won`;
                    gameStatus.winnerLine.forEach(index => {
                        const yellowField = document.getElementById(index);
                        yellowField.classList.add('yellow')
                    });
                });
                return;
            }
        });
    });
    
    // Resets gameboard for a new game
    document.getElementById('reset-btn').addEventListener('click', () => {
        game.resetGameboard();
        return;
    })
}
