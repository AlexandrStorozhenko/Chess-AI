let gameOver = false;
let whiteTurn = true;
let n = 0;
let from = undefined;
let board = document.querySelector('#board');
board.addEventListener('mousedown',(pos)=>{
    if(!gameOver){
        let index = matrix[pos.target.className[7]][pos.target.className[9]]; 
        if(typeof(index)==='object'&&n%2===0||n%2!==0){
            if(possibleBoards('white', matrix).length!==0){
                if(n%2===0){
                    n++;
                    from = pos;
                }else{
                    n++;
                    let obj = matrix[from.target.className[7]][from.target.className[9]];
                    let x = pos.target.className[7]-from.target.className[7];
                    let y = pos.target.className[9]-from.target.className[9];
                    if(obj.color==='white'&&whiteTurn){
                        if(obj.legalMove(x,y,matrix,true)){
                            //test board to evaluate for check
                            let test = deepCopy(matrix);
                            let pieceClone = Object.assign( Object.create( Object.getPrototypeOf(obj)), obj);
                            if(obj.borderCheck(x,y)){
                                let pos2 = matrix[obj.positionX+x][obj.positionY+y];
                                if(typeof(pos2)==='object'){
                                    let pos2Clone = Object.assign( Object.create( Object.getPrototypeOf(pos2)), pos2);  
                                    test[obj.positionX+x][obj.positionY+y] = pos2Clone;
                                }
                            }
                            pieceClone.move(x,y, test, false);
                            if(checkEval('white', test)===false){
                                obj.move(x,y, matrix, true);
                                if(possibleBoards('black', matrix).length!==0){
                                    let best = bestMove(matrix, 3, true);
                                    updateBoard(best);
                                    whiteTurn=!whiteTurn;
                                }else{
                                    gameOver = true;
                                }
                            }
                        }
                    }
                }
            }else{
                gameOver = true;
            }
        }
    }else{
        alert('Game Over!');
    }
})