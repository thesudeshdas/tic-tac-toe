// the board
const gameBoard = ( () => {
    // board array to store the sign
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
    
    // players array
    const playersArr = [];
    
    // factory player
    const factoryPlayer = (name, sign) => {
        return {name, sign}
    }
    

    // get the buttons for no. of players
    const singleplayerButton = document.getElementById('singleplayerButton');
    const multiplayerButton = document.getElementById('multiplayerButton');
    
    // get players name
    const createSingleplayer = () => {
        
        // get form
        const formPop = document.getElementById('formPop');
        formPop.style.display = 'block';
        
        const singleplayerFormMarkup = `
            <i class="material-icons md-36 close-form" id="closeButton">close</i>
            <h1>Single Player</h1>
            <div class="form-item">
                <h2>Player</h2>
                <input type="text" placeholder="Enter Player name" class="border border-dark input-field" id="playerNameInput" required>
            </div>
            <button class="btn btn-dark rounded" id="startBtn">Start Game</button>
        `;
        formPop.innerHTML = singleplayerFormMarkup;
        
        // create player on click of game start button
        const startBtn = document.getElementById('startBtn');
        startBtn.addEventListener('click', () => {
            
            // get player name
            const playerName = document.getElementById('playerNameInput').value;
            
            const player1 = factoryPlayer(playerName, 'X');
            
            playersArr.push(player1);
            
        })
        
        
        
        
        
        
        
        
        
        
        
    }
    
    const createMultiplayer = () => {
        
        // get form
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
            <button class="btn btn-dark rounded" id="startBtn">Start Game</button>
        `;
        
        formPop.innerHTML = multiplayerFormMarkup;
        
    }
    
    
    
    
    
    
    
    
    // event listening to pop form
    singleplayerButton.addEventListener('click', createSingleplayer);
    multiplayerButton.addEventListener('click', createMultiplayer);
    
   
    
    
    
    
    
    return {playersArr}
    
    
} )();








const game = ( () => {
    
    console.log(players.playersArr)
    
    // const newGame = (() => {console.log('New game clicked')})();
    let winnner = '';
    
    
    
    // checking for win
    const checkWinningCombo = (sign1, sign2, sign3) => {
        if (sign1 == 'X' || sign1 == 'O') {
            // set the winner
            (sign1 == 'X') ? winnner = 'X' : winnner = 'O';
    
            // check for 3-in-a-row
            return (sign1 == sign2 && sign1 == sign3) ? true : false;
            
        }
    };
    
    const checkTie = () => {
        let count = 0;
        gameBoard.board.forEach(mark => {
            if (mark != '') {
                count++;
            }
        })
        
        if(count > 8) {
            alert('tie');
            const gameBoardContainer = document.getElementById('gameBoardContainer');
            gameBoardContainer.style.cssText = 'pointer-events: none';
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
            console.log(typeof winnner);
            
            const gameBoardContainer = document.getElementById('gameBoardContainer');
            gameBoardContainer.style.cssText = 'pointer-events: none';
            
        } else {
            checkTie();
        }
    };
    
    // marking the box
    const markBox = (() => {
        const boxes = document.querySelectorAll('.boxItem');
        

        // create the nextMove
        let nextMove = '';
        
        function nextMoveFunction()  {
            (nextMove == '' || nextMove == 'O') ? nextMove = 'X' : nextMove = 'O';
            return nextMove;
        }
        
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








   


















