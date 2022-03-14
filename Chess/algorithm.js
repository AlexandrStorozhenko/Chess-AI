//Alexander Storozhenko
//multidimensional array copy function 
function deepCopy(matrixBoard){
    let possibleBoard = createArray(8, 8);
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(matrixBoard===undefined){
                possibleBoard[i][j]=matrix[i][j];
            }else{
                possibleBoard[i][j]=matrixBoard[i][j];
            }
        }
    }
    return possibleBoard;
}
//check evaluation
function checkEval(color, board){
    let check = undefined;
    for(let i=0; i<8; i++){
        board[i].forEach(pos=>{
            if(pos instanceof King&&pos.color===color){
                check = pos.evaluateCheck(board);
            }
        })
    }
    return check;
}
//possible moves
function pawnPossibleMoves(color, board){
    let possibleBoardMatrix=[];
    let possibleBoard = deepCopy(board);
    let pieces = [];
    possibleBoard.forEach(row=>{
        let piece = row.filter(square=>{let filter = square instanceof Pawn?square.color===color?true:false:false;return filter;});
        piece.forEach(el=>{
            pieces.push(el);
        })
    })
    for(let i=0; i<pieces.length;i++){
        let pawn = pieces[i];
        let pawnClone = Object.assign( Object.create( Object.getPrototypeOf(pawn)), pawn);
        if(color==='white'){
            if(pawnClone.legalMove(0,1,possibleBoard, false)){
                pawnClone.move(0,1, possibleBoard, false);
                 if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                pawnClone = Object.assign( Object.create( Object.getPrototypeOf(pawn)), pawn);
            }
            if(pawnClone.legalMove(0,2,possibleBoard, false)){
                pawnClone.move(0,2, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                pawnClone = Object.assign( Object.create( Object.getPrototypeOf(pawn)), pawn);
            }
            if(pawnClone.legalMove(1,1,possibleBoard, false)){
                pawnClone.move(1,1, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                pawnClone = Object.assign( Object.create( Object.getPrototypeOf(pawn)), pawn);
            }
            if(pawnClone.legalMove(-1,1,possibleBoard, false)){
                pawnClone.move(-1,1, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                pawnClone = Object.assign( Object.create( Object.getPrototypeOf(pawn)), pawn);
            }
        }
        else{
            if(pawnClone.legalMove(0,-1,possibleBoard, false)){
                pawnClone.move(0,-1, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                pawnClone = Object.assign( Object.create( Object.getPrototypeOf(pawn)), pawn);
            }
            if(pawnClone.legalMove(0,-2,possibleBoard, false)){
                pawnClone.move(0,-2, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                pawnClone = Object.assign( Object.create( Object.getPrototypeOf(pawn)), pawn);
            }
            if(pawnClone.legalMove(1,-1,possibleBoard, false)){
                pawnClone.move(1,-1, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                pawnClone = Object.assign( Object.create( Object.getPrototypeOf(pawn)), pawn);
            }
            if(pawnClone.legalMove(-1,-1,possibleBoard, false)){
                pawnClone.move(-1,-1, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                pawnClone = Object.assign( Object.create( Object.getPrototypeOf(pawn)), pawn);
            }
        }
    }
    return possibleBoardMatrix;
}
function knightPossibleMoves(color, board){
    let possibleBoardMatrix=[];
    let possibleBoard = deepCopy(board);
    let pieces = [];
    possibleBoard.forEach(row=>{
        let piece = row.filter(square=>{
            let filter = square instanceof Knight?square.color===color?true:false:false;
            return filter;
        })
        piece.forEach(el=>{
            pieces.push(el);
        })
    })
    let moves = [[1,2],[1,-2],[-1,2],[-1,-2],[2,1],[2,-1],[-2,1],[-2,-1]];
    for(let p=0; p<pieces.length; p++){
        let knight = pieces[p];
        for(let i=0; i<moves.length; i++){
            let knightClone = Object.assign( Object.create( Object.getPrototypeOf(knight)), knight);
            if(knightClone.legalMove(moves[i][0],moves[i][1],possibleBoard, false)){
                knightClone.move(moves[i][0],moves[i][1], possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
            }
        }
    }
    return possibleBoardMatrix;
}
function bishopPossibleMoves(color, board){
    let possibleBoardMatrix=[];
    let possibleBoard = deepCopy(board);
    let pieces = [];
    possibleBoard.forEach(row=>{
        let piece = row.filter(square=>{
            let filter = square instanceof Bishop?square.color===color?true:false:false;
            return filter;
        })
        piece.forEach(el=>{
            pieces.push(el);
        })
    })
    for(let p=0; p<pieces.length; p++){
        let bishop = pieces[p];
        let bishopClone = Object.assign( Object.create( Object.getPrototypeOf(bishop)), bishop);
        for(let i=1;i<8;i++){
            if(bishopClone.legalMove(i,i,possibleBoard, false)){
                bishopClone.move(i,i, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                bishopClone = Object.assign( Object.create( Object.getPrototypeOf(bishop)), bishop);
            }        
            if(bishopClone.legalMove(i,-i,possibleBoard, false)){
                bishopClone.move(i,-i, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                bishopClone = Object.assign( Object.create( Object.getPrototypeOf(bishop)), bishop);
            }
            if(bishopClone.legalMove(-i,i,possibleBoard, false)){
                bishopClone.move(-i,i, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                bishopClone = Object.assign( Object.create( Object.getPrototypeOf(bishop)), bishop);
            }
            if(bishopClone.legalMove(-i,-i,possibleBoard, false)){
                bishopClone.move(-i,-i, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                bishopClone = Object.assign( Object.create( Object.getPrototypeOf(bishop)), bishop);
            }
        }
    }
    return possibleBoardMatrix;
}
function towerPossibleMoves(color, board){
    let possibleBoardMatrix=[];
    let possibleBoard = deepCopy(board);
    let pieces = [];
    possibleBoard.forEach(row=>{
        let piece = row.filter(square=>{
            let filter = square instanceof Tower?square.color===color?true:false:false;
            return filter;
        })
        piece.forEach(el=>{
            pieces.push(el);
        })
    })
    for(let p=0; p<pieces.length; p++){
        let tower = pieces[p]; 
        let towerClone = Object.assign( Object.create( Object.getPrototypeOf(tower)), tower);
        for(let i=1;i<8;i++){
            if(towerClone.legalMove(i,0,possibleBoard, false)){
                towerClone.move(i,0, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                towerClone = Object.assign( Object.create( Object.getPrototypeOf(tower)), tower);
            }
            if(towerClone.legalMove(-i,0,possibleBoard, false)){
                towerClone.move(-i,0, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                towerClone = Object.assign( Object.create( Object.getPrototypeOf(tower)), tower);
            }
            if(towerClone.legalMove(0,i,possibleBoard, false)){
                towerClone.move(0,i,possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                towerClone = Object.assign( Object.create( Object.getPrototypeOf(tower)), tower);
            }            
            if(towerClone.legalMove(0,-i,possibleBoard, false)){
                towerClone.move(0,-i,possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                towerClone = Object.assign( Object.create( Object.getPrototypeOf(tower)), tower);
            }
        }
    }
    return possibleBoardMatrix;
}
function queenPossibleMoves(color, board){
    let possibleBoardMatrix=[];
    let possibleBoard = deepCopy(board);
    let pieces = [];
    possibleBoard.forEach(row=>{
        let piece = row.filter(square=>{
            let filter = square instanceof Queen?square.color===color?true:false:false;
            return filter;
        })
        piece.forEach(el=>{
            pieces.push(el);
        })
    })
    for(let p=0; p<pieces.length; p++){
        let queen = pieces[p]; 
        let queenClone = Object.assign( Object.create( Object.getPrototypeOf(queen)), queen);
        for(let i=1;i<8;i++){
            if(queenClone.legalMove(i,0,possibleBoard, false)){
                queenClone.move(i,0, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                queenClone = Object.assign( Object.create( Object.getPrototypeOf(queen)), queen);
            }
            if(queenClone.legalMove(-i,0,possibleBoard, false)){
                queenClone.move(-i,0, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                queenClone = Object.assign( Object.create( Object.getPrototypeOf(queen)), queen);
            }
            if(queenClone.legalMove(0,i,possibleBoard, false)){
                queenClone.move(0,i,possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                queenClone = Object.assign( Object.create( Object.getPrototypeOf(queen)), queen);
            }            
            if(queenClone.legalMove(0,-i,possibleBoard, false)){
                queenClone.move(0,-i,possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                queenClone = Object.assign( Object.create( Object.getPrototypeOf(queen)), queen);
            }
            if(queenClone.legalMove(i,i,possibleBoard, false)){
                queenClone.move(i,i, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                queenClone = Object.assign( Object.create( Object.getPrototypeOf(queen)), queen);
            }        
            if(queenClone.legalMove(i,-i,possibleBoard, false)){
                queenClone.move(i,-i, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                queenClone = Object.assign( Object.create( Object.getPrototypeOf(queen)), queen);
            }
            if(queenClone.legalMove(-i,i,possibleBoard, false)){
                queenClone.move(-i,i, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                queenClone = Object.assign( Object.create( Object.getPrototypeOf(queen)), queen);
            }
            if(queenClone.legalMove(-i,-i,possibleBoard, false)){
                queenClone.move(-i,-i, possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
                queenClone = Object.assign( Object.create( Object.getPrototypeOf(queen)), queen);
            }
        }
    }
    return possibleBoardMatrix;
}
function kingPossibleMoves(color, board){
    let possibleBoardMatrix=[];
    let possibleBoard = deepCopy(board);
    let pieces = [];
    possibleBoard.forEach(row=>{
        let piece = row.filter(square=>{
            let filter = square instanceof King?square.color===color?true:false:false;
            return filter;
        })
        piece.forEach(el=>{
            pieces.push(el);
        })
    })
    for(let p=0; p<pieces.length; p++){
        let king = pieces[p];
        let moves = [[0,1],[1,0],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
        for(let i=0; i<moves.length; i++){
            let kingClone = Object.assign( Object.create( Object.getPrototypeOf(king)), king);
            if(kingClone.legalMove(moves[i][0],moves[i][1],possibleBoard, false)){
                kingClone.move(moves[i][0],moves[i][1], possibleBoard, false);
                if(checkEval(color, possibleBoard)===false){
                    possibleBoardMatrix.push(possibleBoard);
                }
                possibleBoard = deepCopy(board);
            }
        }
    }
    return possibleBoardMatrix;
}
function possibleBoards(color,board){
    let possibleBoardMatrix = [];
    let possibleBoard = deepCopy(board);
    //pawn
    let pawnMoves = pawnPossibleMoves(color, possibleBoard);
    pawnMoves.forEach(move=>possibleBoardMatrix.push(move))
    //knight
    let knightMoves = knightPossibleMoves(color, possibleBoard);
    knightMoves.forEach(move=>possibleBoardMatrix.push(move))
    //bishop
    let bishopMoves = bishopPossibleMoves(color, possibleBoard);
    bishopMoves.forEach(move=>possibleBoardMatrix.push(move))
    //tower
    let towerMoves = towerPossibleMoves(color, possibleBoard);
    towerMoves.forEach(move=>possibleBoardMatrix.push(move))
    //queen
    let queenMoves = queenPossibleMoves(color, possibleBoard);
    queenMoves.forEach(move=>possibleBoardMatrix.push(move))
    //king
    let kingMoves = kingPossibleMoves(color, possibleBoard);
    kingMoves.forEach(move=>possibleBoardMatrix.push(move))
    return possibleBoardMatrix;
}
//evaluation function -- improve from simple piece count
function evaluation(board){
    let point1 = 0;
    let point2 = 0;
    for(let i=0; i<8; i++){
        board[i].forEach(square=>{
            if(typeof(square)==='object'){
                if(square.color==='white'){
                    point1+=square.value;
                }else if(square.color==='black'){
                    point2+=square.value;
                }
            }
        })
    }
    return point2-point1;
}

//implementation of the minimax algorithm
let bestBoard = [];
function minimax(board, depth, maxPlayer){
    if(depth===0){
        let eval = evaluation(board);
        return eval;
    }else if(maxPlayer){
        let maxEval = -Infinity;
        let children = possibleBoards('black', board);
        if(children.length===0){
            return -50;
        }
        children.forEach(child=>{
            let eval = minimax(child, depth-1, false);
            let prevMax = maxEval;
            maxEval = Math.max(maxEval,eval);
            if(depth===3){
                if(prevMax<maxEval){
                    bestBoard = child;
                }
            }
        })
        return maxEval;
    }else{
        let minEval = Infinity;
        let children = possibleBoards('white',board);
        if(children.length===0){
            return 50;
        }
        children.forEach(child=>{
            let eval = minimax(child, depth-1, true);
            minEval = Math.min(minEval,eval);
        })
        return minEval;
    }
}

function bestMove(board, depth, maxPlayer){
    minimax(board, depth, maxPlayer);
    whiteTurn=!whiteTurn;
    return bestBoard;
}
