let whiteTurn = true;
let n = 0;
let from = undefined;
let board = document.querySelector('#board');
board.addEventListener('mousedown',(pos)=>{
    let index = matrix[pos.target.className[7]][pos.target.className[9]]; 
    if(typeof(index)==='object'&&n%2===0||n%2!==0){
        if(n%2===0){
            n++;
            from = pos;
        }else{
            n++;
            let obj = matrix[from.target.className[7]][from.target.className[9]];
            let x = pos.target.className[7]-from.target.className[7];
            let y = pos.target.className[9]-from.target.className[9];
            if(obj.color==='white'&&whiteTurn||obj.color==='black'&&!whiteTurn){
                if(obj.legalMove(x,y,matrix,true)){
                    obj.move(x,y, matrix, true);
                    let best = bestMove(matrix, 3, true);
                    updateBoard(best);
                    whiteTurn=!whiteTurn;
                }
            }
        }
    }
})