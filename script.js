function gameActions() {
    // Создать массив-поле для игры
    const gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    // Создать игроков
    const createPlayer = (marker) => {
        const name = prompt(`Игрок ${marker} Введите ваше имя`, `${marker}`)
        return { name, marker }
    }

    // Создать игроков
    playerX = createPlayer('X');
    playerO = createPlayer('O');

    // Текущий игрок в начале всегда Х
    let currentPlayer = playerX;

    const getCurrentPlayer = () => currentPlayer
    // Смена текущего игрока
    const switchPlayer = () => {
        (currentPlayer === playerX)
            ? currentPlayer = playerO
            : currentPlayer = playerX
        return currentPlayer
    };

    // Ход игрока
    const makeTurn = (index) => {
        if (gameboard[index] !== 0) return;

        gameboard[index] = currentPlayer.marker
        console.log('done')

        if (!getGameStatus()) {
            switchPlayer();
        }
    }

    // Проверка состояния игры
    const getGameStatus = () => {
        if (!gameboard.includes(0)) {

            return 'Draw'
        } else if (gameboard[0] === 'X' && gameboard[3] === 'X' && gameboard[6] === 'X'
            || gameboard[1] === 'X' && gameboard[4] === 'X' && gameboard[7] === 'X'
            || gameboard[2] === 'X' && gameboard[5] === 'X' && gameboard[8] === 'X'
            || gameboard[0] === 'X' && gameboard[1] === 'X' && gameboard[2] === 'X'
            || gameboard[3] === 'X' && gameboard[4] === 'X' && gameboard[5] === 'X'
            || gameboard[6] === 'X' && gameboard[7] === 'X' && gameboard[8] === 'X'
            || gameboard[0] === 'X' && gameboard[4] === 'X' && gameboard[8] === 'X'
            || gameboard[6] === 'X' && gameboard[4] === 'X' && gameboard[2] === 'X') {
            console.log('X has won')
            return 'X'
        } else if (gameboard[0] === 'O' && gameboard[3] === 'O' && gameboard[6] === 'O'
            || gameboard[1] === 'O' && gameboard[4] === 'O' && gameboard[7] === 'O'
            || gameboard[2] === 'O' && gameboard[5] === 'O' && gameboard[8] === 'O'
            || gameboard[0] === 'O' && gameboard[1] === 'O' && gameboard[2] === 'O'
            || gameboard[3] === 'O' && gameboard[4] === 'O' && gameboard[5] === 'O'
            || gameboard[6] === 'O' && gameboard[7] === 'O' && gameboard[8] === 'O'
            || gameboard[0] === 'O' && gameboard[4] === 'O' && gameboard[8] === 'O'
            || gameboard[6] === 'O' && gameboard[4] === 'O' && gameboard[2] === 'O') {
            console.log('O has won')
            return 'O'
        } else {
            return false
        }
    }

    return { gameboard, getCurrentPlayer, playerX, playerO, createPlayer, makeTurn, switchPlayer, getGameStatus }
}

function playGame() {
    // Создать игру

    game = gameActions();

    document.querySelectorAll('.field').forEach((cell, index) => {
        cell.addEventListener('click', () => {
            cell.innerHTML = `${game.getCurrentPlayer().marker}`;
            game.makeTurn(index);


            const gameStatus = game.getGameStatus();
            if (gameStatus === 'Draw') {
                console.log('Draw');
                document.querySelectorAll('.field').forEach((cell, index) => {
                    cell.innerHTML = `draw`
                })
                return;
            } else if (gameStatus === 'X') {
                console.log('X has won');
                document.querySelectorAll('.field').forEach((cell, index) => {
                    cell.innerHTML = `X has won`
                })
                return;
            } else if (gameStatus === 'O') {
                console.log('O has won');
                document.querySelectorAll('.field').forEach((cell, index) => {
                    cell.innerHTML = `O has won`
                })
                return;
            }
        });
    });

}
