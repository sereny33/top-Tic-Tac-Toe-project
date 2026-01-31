// Есть поле(gameboard) 3х3 (состоит из ячеек) (Объект с массивом клеток внутри, типа матрицы)
// Есть 2 игрока (Х, О) (Два однотипных объекта с параметрами @name, @marker, factory function)

// Основная логика игры:
// Игроки ходят по очереди, начиная с Х;
// Каждый игрок присваивает одной из ячеек Х/О;
// ХОД ИГРОКА: Выбрать одну из ячеек объекта gameboard.[fieldNumber] = player.mark
// После каждого хода проверяется выполнение:
// есть ли три одинаковых символа по вертикали, горизонтали, диагонали? (если да - верни победителя, нет - продолжить проверки)
// есть ли свободные поля? (если есть - вернуться к ходу игрока; если нет - ничья)
//

/*  
Функция createGameboard возвращает поле для игры в крестики-нолики

*/

function createGameboard() {
    const gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    return gameboard;
}

/*
Функция createPlayer() принимает в параметры Имя игрока и Игровой символ
затем возвращает объект с присвоенными игроку данными 
*/

function createPlayer(marker) {
    const name = prompt(`Игрок ${marker} Введите ваше имя`, 'Default')
    return { name, marker }
}

/*
Функция playGame() принимает в параметры новое игровое поле 
и двух игроков playerХ и playerО

Пока (!gameboard содержит три одинаковых поля подряд 
    ||!gameboard.includes(0)отсутствуют свободные ячейки) {   
    
    Выбор текущего игрока
    getCurrentPlayer() {
        let currentPlayer;
        let lastMarker;
        
        if(!lastMarker) {
        lastMarker = 'X'}
        
        if(lastMarker = 'X') {
            lastMarker = 'O';
            curentPlayer = playerO;
        } else {
            lastMarker = 'X'
            currentPlayer = playerX;
        }

        return currentPlayer
    }; 

    Ячейке присваивается marker игрока currentPlayer;
    makeTurn(index) {
        index = prompt(`${currentPlayer.name} выбери ячейку`)
        gameboard[index] = currentPlayer.marker;

    } 
    
    Проверка условий:
        если (gameboard содержит три одинаковых поля подряд) {
            вернуть победителя
        }
        иначе если (!gameboard.includes(0)отсутствуют свободные ячейки) {
            вернуть сообщение о ничьей
        }

    changeCurrentPlayer();
}
    
*/

function playGame(gameboard, playerX, playerO) {
    gameboard = createGameboard();
    playerX = createPlayer('X');
    playerO = createPlayer('O');
    let currentPlayer = playerX;

    function switchPlayer() {
        (currentPlayer === playerX)
            ? currentPlayer = playerO
            : currentPlayer = playerX
        return currentPlayer
    };

    function makeTurn(index) {
        index = prompt(`${currentPlayer.name} выбери ячейку`)
        gameboard[index] = currentPlayer.marker;
        currentPlayer = switchPlayer();
        console.log(gameboard)
    }
    while (gameboard.includes(0)) {
        makeTurn()
    }
    return { gameboard, playerX, playerO, currentPlayer }
}