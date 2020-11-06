
// gamBoard to hold the values of all the 9 boxes
const gameBoardObject = ( () => {
    
    const winXArray = [];
    const winOArray = [];
    const gameBoardArray = [];
    
    return {gameBoardArray, winXArray, winOArray}
    
})(); 




// show the gameBoardArray as boxes
const updateDisplay =  () => {
    
    const boxes = document.querySelectorAll('.boxItem');

    boxes.forEach( box => {
        box.textContent = gameBoardObject.gameBoardArray[box.id]
    } )
}

// checking for win
const checkWinningCombo = (sign1, sign2, sign3) => {
    if (sign1 == sign2 && sign1 == sign3 && sign1 != '') {
        return true;
    }
};

const checkWin = () => {
    
    if (
        checkWinningCombo(gameBoardObject.gameBoardArray[0], gameBoardObject.gameBoardArray[1], gameBoardObject.gameBoardArray[2]) ||
        checkWinningCombo(gameBoardObject.gameBoardArray[3], gameBoardObject.gameBoardArray[4], gameBoardObject.gameBoardArray[5]) 
        // checkWinningCombo(gameBoardObject.gameBoardArray[6], gameBoardObject.gameBoardArray[7], gameBoardObject.gameBoardArray[8]) ||
        // checkWinningCombo(gameBoardObject.gameBoardArray[0], gameBoardObject.gameBoardArray[3], gameBoardObject.gameBoardArray[6]) ||
        // checkWinningCombo(gameBoardObject.gameBoardArray[1], gameBoardObject.gameBoardArray[4], gameBoardObject.gameBoardArray[7]) ||
        // checkWinningCombo(gameBoardObject.gameBoardArray[2], gameBoardObject.gameBoardArray[5], gameBoardObject.gameBoardArray[8]) ||
        // checkWinningCombo(gameBoardObject.gameBoardArray[0], gameBoardObject.gameBoardArray[4], gameBoardObject.gameBoardArray[9]) ||
        // checkWinningCombo(gameBoardObject.gameBoardArray[2], gameBoardObject.gameBoardArray[4], gameBoardObject.gameBoardArray[6])
    ) {
        alert("Someone won")
    } 
    
    
    
    
    
    
    console.log(gameBoardObject.winXArray, gameBoardObject.winOArray)
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
            
            box.textContent = nextMoveFunction();
            gameBoardObject.gameBoardArray[box.id] = box.textContent;
            
            if (box.textContent == 'X') {
                gameBoardObject.winXArray.push(box.id);
            } else  {
                gameBoardObject.winOArray.push(box.id);
            }
            
            // update display
            updateDisplay();
            
            // check for win after each click
            checkWin();
        } )
    } )
    
}
)();








