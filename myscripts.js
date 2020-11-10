// the board
const gameBoard = ( () => {
    const board = [
        '', '', '',
        '', '', '', 
        '', '', '', 
    ];
    
    // show the board as boxes
    const updateDisplay = () => {
        const boxes = document.querySelectorAll('.boxItem');
        boxes.forEach( box => {
            box.textContent = gameBoard.board[box.id]
        } )
    }
    
    return {board, updateDisplay}  
})();



const players = ( () => {
    let playersArr = [];
    
    // factory player
    const factoryPlayer = (name, sign) => {
        return {name, sign}
    }

    // get the buttons for no. of players
    const singleplayerButton = document.getElementById('singleplayerButton');
    const multiplayerButton = document.getElementById('multiplayerButton');
    
    const createSingleplayer = () => {
        // show the form
        const formPop = document.getElementById('formPop');
        formPop.style.display = 'block';
        
        const singleplayerFormMarkup = `
            <i class="material-icons md-36 close-form" id="closeButton">close</i>
            <h1>Single Player</h1>
            <div class="form-item">
                <h2>Player</h2>
                <input type="text" placeholder="Enter Player name" class="border border-dark input-field" id="playerNameInput" required>
            </div>
            <button type="button" class="btn btn-dark rounded" id="startBtn">Start Game</button>
        `;
        formPop.innerHTML = singleplayerFormMarkup;
        
        document.getElementById('closeButton').addEventListener('click', () => {formPop.style.display = 'none';})
        
        // create player on click of game start button
        const startBtn = document.getElementById('startBtn');
        startBtn.addEventListener('click', () => {
            
            const playerName = document.getElementById('playerNameInput').value;
            
            if (playerName != '') {
                const player1 = factoryPlayer(playerName, 'X');
                const player2 = factoryPlayer('The Bot', 'O');
                
                playersArr.push(player1); 
                playersArr.push(player2);
                
                // making grid clickable and hide the form
                formPop.style.display = 'none';
                const gameBoardContainer = document.getElementById('gameBoardContainer');
                gameBoardContainer.classList.remove('unclickable');
            }
        })
    }
    
    const createMultiplayer = () => {
        // show the form
        const formPop = document.getElementById('formPop');
        formPop.style.display = 'block';
        
        const multiplayerFormMarkup = `
            <i class="material-icons md-36 close-form" id="closeButton">close</i>  
            <h1>Multiplayer</h1>
            <div class="form-item">
                <h2>Player 1</h2>
                <input type="text" placeholder="Enter Player 1 name" class="border border-dark input-field" id="player1NameInput" required>
            </div>
            <div class="form-item">
                <h2>Player 2</h2>
                <input type="text" placeholder="Enter Player 2 name" class="border border-dark input-field" id="player2NameInput" required>
            </div>
            <button type="button" class="btn btn-dark rounded" id="startBtn">Start Game</button>
        `;
        formPop.innerHTML = multiplayerFormMarkup;
        
        document.getElementById('closeButton').addEventListener('click', () => {formPop.style.display = 'none';})
        
        // create player on click of game start button
        const startBtn = document.getElementById('startBtn');
        startBtn.addEventListener('click', () => {
            
            const player1Name = document.getElementById('player1NameInput').value;
            const player2Name = document.getElementById('player2NameInput').value;
            
            if (player1Name != '' && player2Name != '') {
                const player1 = factoryPlayer(player1Name, 'X');
                const player2 = factoryPlayer(player2Name, 'O');
                
                playersArr.push(player1); 
                playersArr.push(player2);
                
                // making grid clickable and hide the form
                formPop.style.display = 'none';
                const gameBoardContainer = document.getElementById('gameBoardContainer');
                gameBoardContainer.classList.remove('unclickable');
            }
        })
    }
    
    // event listening to pop form
    singleplayerButton.addEventListener('click', createSingleplayer);
    multiplayerButton.addEventListener('click', createMultiplayer);
    
    return {playersArr}
} )();



const game = ( () => {
    let winnner = '';
    
    // checking for win
    const checkWinningCombo = (sign1, sign2, sign3) => {
        if (sign1 == 'X' || sign1 == 'O') {
            // set the winner
            (sign1 == 'X') ? winnner = players.playersArr[0].name : winnner = players.playersArr[1].name;
    
            // check for 3-in-a-row
            return (sign1 == sign2 && sign1 == sign3) ? true : false;
        }
    };
    
    const checkTie = () => {
        let count = 0;
        gameBoard.board.forEach(mark => { (mark != '') ? count++ : null; })
        
        if(count > 8) {
            alert('tie');
            
            showResult('Tie');
            
            
            // making grid unclickable
            const gameBoardContainer = document.getElementById('gameBoardContainer');
            gameBoardContainer.classList.add('unclickable');
        }
    }
    
    const checkWin = () => {
        if (
            checkWinningCombo(gameBoard.board[0], gameBoard.board[1], gameBoard.board[2]) ||
            checkWinningCombo(gameBoard.board[3], gameBoard.board[4], gameBoard.board[5]) ||
            checkWinningCombo(gameBoard.board[6], gameBoard.board[7], gameBoard.board[8]) ||
            checkWinningCombo(gameBoard.board[0], gameBoard.board[3], gameBoard.board[6]) ||
            checkWinningCombo(gameBoard.board[1], gameBoard.board[4], gameBoard.board[7]) ||
            checkWinningCombo(gameBoard.board[2], gameBoard.board[5], gameBoard.board[8]) ||
            checkWinningCombo(gameBoard.board[0], gameBoard.board[4], gameBoard.board[8]) ||
            checkWinningCombo(gameBoard.board[2], gameBoard.board[4], gameBoard.board[6])
        ) {
            alert(winnner + " won");
            console.log(players.playersArr[0].name);
            
            // making grid unclickable
            const gameBoardContainer = document.getElementById('gameBoardContainer');
            gameBoardContainer.classList.add('unclickable');
            
        } else {
            checkTie();
        }
    };
    
    // marking the box
    const markBox = (() => {
        const boxes = document.querySelectorAll('.boxItem');
        
        // create the nextMove
        let nextMove = '';
        const nextMoveFunction = () => { return (nextMove == '' || nextMove == 'O') ? nextMove = 'X' : nextMove = 'O'; }
        
        // looping for clicking
        boxes.forEach( box => {
            box.addEventListener('click', () => { 
                
                if (box.textContent == '') {
                    gameBoard.board[box.id] = nextMoveFunction();
                }
                
                // update display
                gameBoard.updateDisplay();
                
                // check for win after each click
                checkWin();
                
                console.log(gameBoard.board)
            } )
            
            
        } )
        
        
    }
    )();
    
    
    
    
    
    
    
    
    
} )();








   


















