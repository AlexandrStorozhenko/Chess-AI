//declaration of the piece classes
class Piece{
    constructor(x, y, color){
        this.positionX=x;
        this.positionY=y;
        this.color = color;
        this.eaten = false;
    }
    move(X, Y, matrixBoard, show){
        matrixBoard[this.positionX][this.positionY]=undefined;
        this.positionX+=X;
        this.positionY+=Y;
        matrixBoard[this.positionX][this.positionY]=this;
        if(show){
            this.show();
        }
    }
    show(){
        if(!this.eaten){
            Array.from(document.getElementsByClassName(`${this.positionX};${this.positionY}`))[0].appendChild(this.DOMrepresentation);
        }else{
            this.DOMrepresentation.remove();
        }
    }    
    delete(){
        this.eaten=true;
        this.show();
    }
    borderCheck(x,y){
        if(this.positionX+x>7||(this.positionX+x)<0||(this.positionY+y)>7||(this.positionY+y)<0){
            return false;
        }
        return true;
    }
}
class King extends Piece{
    constructor(x, y, color){
        super(x, y, color);
        this.value=50;
        this.src=this.color==='white'?'assets/KW.png':'assets/KB.png';
        this.create();
    }
    create(){
        matrix[this.positionX][this.positionY]=this;
        this.DOMrepresentation = document.createElement('img');
        this.DOMrepresentation.src = this.src;
        this.show(this.DOMrepresentation);
    }
    legalMove(x,y,matrixBoard,take){
        let pos = 1;
        if(this.borderCheck(x,y)){
            pos = matrixBoard[this.positionX+x][this.positionY+y];
        }
        if(Math.abs(x)<=1&&Math.abs(y)<=1){
            if(typeof(pos)==='object'){
                if(this.color!==pos.color){
                    if(take){
                        pos.delete();
                    }
                    return true;
                }else{
                    return false;
                }
            }else if(pos===1){
                return false;
            }
            return true;
        }if(this.positionX===4&&(this.positionY===0||this.positionY===7)){
            if(this.evaluateCheck(matrix)===false){
                if(x===2){
                    let square1 = matrixBoard[this.positionX+1][this.positionY];
                    let square2 = matrixBoard[this.positionX+2][this.positionY];
                    let square3 = matrixBoard[this.positionX+3][this.positionY];
                    if(typeof(square1)==='undefined'&&typeof(square2)==='undefined'){
                        if(square3 instanceof Tower){
                            square3.move(-2,0, matrixBoard, true);  
                            return true;
                        }
                    }
                }else if(x===-2){
                    let square1 = matrixBoard[this.positionX-1][this.positionY];
                    let square2 = matrixBoard[this.positionX-2][this.positionY];
                    let square3 = matrixBoard[this.positionX-3][this.positionY];
                    let square4 = matrixBoard[this.positionX-4][this.positionY];
                    if(typeof(square1)==='undefined'&&typeof(square2)==='undefined'&&typeof(square3)==='undefined'){
                        if(square4 instanceof Tower){
                            square4.move(3,0, matrixBoard, true);
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    //Check evaluation function
    // --> if there's an object of an opposite color blocking the opponent danger check object, the function should be evaluated to false
    diagonalCheck(matrixBoard, x, y){
        for(let i=1; i<8; i++){
            let pos = 1;
            if(x&&y){
                if(this.borderCheck(i,i)){
                    pos = matrixBoard[this.positionX+i][this.positionY+i];
                }else{
                    return false;
                }
            }else if(x&&!y){
                if(this.borderCheck(i,-i)){
                    pos = matrixBoard[this.positionX+i][this.positionY-i];
                }else{
                    return false;
                }
            }else if(!x&&y){
                if(this.borderCheck(-i,i)){
                    pos = matrixBoard[this.positionX-i][this.positionY+i];
                }else{
                    return false;
                }
            }else if(!x&&!y){
                if(this.borderCheck(-i,-i)){
                    pos = matrixBoard[this.positionX-i][this.positionY-i];
                }else{
                    return false;
                }
            }
            //checks whether the position contains an object
            if(typeof(pos)==='object'){
                if(this.color===pos.color){
                    return false;
                }else if(this.color!==pos.color){
                    if(Math.abs(i)===1){
                        if(pos instanceof Pawn||pos instanceof Bishop||pos instanceof Queen){
                            return true;
                        }else{
                            return false;
                        }
                    }else if(Math.abs(i)>1){
                        if(pos instanceof Bishop||pos instanceof Queen){
                            return true;
                        }else{
                            return false;
                        }
                    }
                }
            }
        }
        return false;
    }
    horizvertCheck(matrixBoard, x , xu, y, yu){
        for(let i=1; i<8; i++){
            let pos = 1;
            if(x&&xu){
                if(this.borderCheck(i,0)){
                    pos = matrixBoard[this.positionX+i][this.positionY];
                }else{
                    return false;
                }
            }else if(x&&!xu){
                if(this.borderCheck(-i,0)){
                    pos = matrixBoard[this.positionX-i][this.positionY];
                }else{
                    return false;
                }
            }else if(y&&yu){
                if(this.borderCheck(0,i)){
                    pos = matrixBoard[this.positionX][this.positionY+i];
                }else{
                    return false;
                }
            }else if(y&&!yu){
                if(this.borderCheck(0,-i)){
                    pos = matrixBoard[this.positionX][this.positionY-i];
                }else{
                    return false;
                }
            }
            //checks whether the position contains an object
            if(typeof(pos)==='object'){
                if(this.color===pos.color){
                    return false;
                }else if(this.color!==pos.color){
                    if(pos instanceof Tower||pos instanceof Queen){
                        return true;
                    }else{
                        return false;
                    }
                }
            }
        }
        return false;
    }
    knightCheck(matrixBoard){
        for(let i=1; i<8; i++){
            let pos = 1;
            let moves = [[2,1],[-2,1],[2,-1],[-2,-1],[1,2],[-1,2],[1,-2],[-1,-2]];
            let x = moves[i][0];
            let y = moves[i][1];
            if(this.borderCheck(x,y)){
                pos = matrixBoard[this.positionX+x][this.positionY+y];
            }else{
                continue;
            }
            if(typeof(pos)==='object'){
                if(this.color===pos.color){
                    continue;
                }else if(this.color!==pos.color){
                    if(pos instanceof Knight){
                        return true;
                    }
                }
            }
        }
        return false;
    }
    evaluateCheck(matrixBoard){
        let d1 = this.diagonalCheck(matrixBoard, true, true);
        let d2 = this.diagonalCheck(matrixBoard, false, true);
        let d3 = this.diagonalCheck(matrixBoard, true, false);
        let d4 = this.diagonalCheck(matrixBoard, false, false);
        let h1 = this.horizvertCheck(matrixBoard, true, true, false, false);
        let h2 = this.horizvertCheck(matrixBoard, true, false, false, false);
        let v1 = this.horizvertCheck(matrixBoard, false, false, true, true);
        let v2 = this.horizvertCheck(matrixBoard, false, false, true, false);
        let k1 = this.knightCheck(matrixBoard);
        if(d1||d2||d3||d4||h1||h2||v1||v2|k1){
            return true;
        }
        return false;
    }
}
class Pawn extends Piece{
    constructor(x, y, color){
        super(x, y, color);
        this.value=1;
        this.src=this.color==='white'?'assets/PW.png':'assets/PB.png';
        this.create();
    }
    create(){
        matrix[this.positionX][this.positionY]=this;
        this.DOMrepresentation = document.createElement('img');
        this.DOMrepresentation.src = this.src;
        this.show(this.DOMrepresentation);
    }
    legalMove(x, y, matrixBoard,take){
        let place = 1; 
        if(this.borderCheck(x,y)){
            place = matrixBoard[this.positionX+x][this.positionY+y];   
        }
        let whiteMove1 = y===1&&this.color==='white'?true:false;
        let whiteMove2 = y===2&&this.color==='white'&&this.positionY===1?true:false;
        let blackMove1 = y===-1&&this.color==='black'?true:false;
        let blackMove2 = y===-2&&this.color==='black'&&this.positionY===6?true:false;
        if(this.color==='white'&&y>0||this.color==='black'&&y<0){
            if(x===0){
                if(!(typeof(place)==='object')){
                    if(whiteMove1||blackMove1){
                        return true;
                    }
                    else if(whiteMove2){
                        if(typeof(matrixBoard[this.positionX][this.positionY+1])!=='object'){
                            return true;
                        }
                    }
                    else if(blackMove2){
                        if(typeof(matrixBoard[this.positionX][this.positionY-1])!=='object'){
                            return true;
                        }
                    }
                }
            }else if(x===1&&(y===1||y===-1)||x===-1&&(y===1||y===-1)){
                if(typeof(place)==='object'){
                    if(place.color!==this.color){
                        if(take){
                            matrixBoard[this.positionX+x][this.positionY+y].delete();
                        }
                        return true;
                    }
                }   
            }
        }
        return false;
    }
}
class Bishop extends Piece{
    constructor(x, y, color){
        super(x, y, color);
        this.value=3;
        this.src=this.color==='white'?'assets/BW.png':'assets/BB.png';
        this.create();
    }
    create(){
        matrix[this.positionX][this.positionY]=this;
        this.DOMrepresentation = document.createElement('img');
        this.DOMrepresentation.src = this.src;
        this.show(this.DOMrepresentation);
    }
    legalMove(x, y,matrix, take){
        if(Math.abs(x)===Math.abs(y)){
            if(x>0&&y>0){        
                for(let i=1; i<=x; i++){
                let pos = 1;
                if(this.borderCheck(i,i)){
                    pos = matrix[this.positionX+i][this.positionY+i];
                }
                if(typeof(pos)==='object'){
                    if(i===Math.abs(x)&&pos.color!==this.color){
                        if(take){
                            pos.delete();
                        }
                        return true;
                    }else{
                        return false;
                    }
                }else if(pos===1){
                    return false;
                }else if(i===Math.abs(x)){
                    return true;
                }
            }
            }else if(x>0&&y<0){
                for(let i=1; i<=x; i++){                
                    let pos = 1;
                    if(this.borderCheck(i,-i)){
                        pos = matrix[this.positionX+i][this.positionY-i];
                    }
                    if(typeof(pos)==='object'){
                        if(i===Math.abs(x)&&pos.color!==this.color){
                            if(take){
                                pos.delete();
                            }
                            return true;
                        }else{
                            return false;
                        }
                    }else if(pos===1){
                        return false;
                    }else if(i===Math.abs(x)){
                        return true;
                    }
                }
            }else if(x<0&&y>0){
                for(let i=1; i<=Math.abs(x); i++){
                    let pos = 1;
                    if(this.borderCheck(-i,i)){
                        pos = matrix[this.positionX-i][this.positionY+i];
                    }
                    if(typeof(pos)==='object'){
                        if(i===Math.abs(x)&&pos.color!==this.color){
                            if(take){
                                pos.delete();
                            }
                            return true;
                        }else{
                            return false;
                        }
                    }else if(pos===1){
                        return false;
                    }else if(i===Math.abs(x)){
                        return true;
                    }
                }
            }else if(x<0&&y<0){
                for(let i=1; i<=Math.abs(x); i++){                
                    let pos = 1;
                    if(this.borderCheck(-i,-i)){
                        pos = matrix[this.positionX-i][this.positionY-i];
                    }
                    if(typeof(pos)==='object'){
                        if(i===Math.abs(x)&&pos.color!==this.color){
                            if(take){
                                pos.delete();
                            }
                            return true;
                        }else{
                            return false;
                        }
                    }else if(pos===1){
                        return false;
                    }else if(i===Math.abs(x)){
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
class Tower extends Piece{
    constructor(x, y, color){
        super(x, y, color);
        this.value=5;
        this.src=this.color==='white'?'assets/TW.png':'assets/TB.png';
        this.create();
    }
    create(){
        matrix[this.positionX][this.positionY]=this;
        this.DOMrepresentation = document.createElement('img');
        this.DOMrepresentation.src = this.src;
        this.show(this.DOMrepresentation);
    }
    legalMove(x, y,matrix, take){
        if(x===0||y===0){
            if(x>0){      
                for(let i=1; i<=x; i++){
                let pos = 1;
                if(this.borderCheck(i,0)){
                    pos = matrix[this.positionX+i][this.positionY];
                }
                if(typeof(pos)==='object'){
                    if(i===Math.abs(x)&&pos.color!==this.color){
                        if(take){
                            pos.delete();
                        }
                        return true;
                    }else{
                        return false;
                    }
                }else if(i===Math.abs(x)&&pos!==1){
                    return true;
                }
            }
            }else if(x<0){
                for(let i=1; i<=Math.abs(x); i++){                
                    let pos = 1;
                    if(this.borderCheck(-i,0)){
                        pos = matrix[this.positionX-i][this.positionY];
                    }
                    if(typeof(pos)==='object'){
                        if(i===Math.abs(x)&&pos.color!==this.color){
                            if(take){
                                pos.delete();
                            }
                            return true;
                        }else{
                            return false;
                        }
                    }else if(i===Math.abs(x)&&pos!==1){
                        return true;
                    }
                }
            }else if(y>0){
                for(let i=1; i<=y; i++){                    
                    let pos = 1;
                    if(this.borderCheck(0,i)){
                        pos = matrix[this.positionX][this.positionY+i];
                    }
                    if(typeof(pos)==='object'){
                        if(i===Math.abs(y)&&pos.color!==this.color){
                            if(take){
                                pos.delete();
                            }
                            return true;
                        }else{
                            return false;
                        }
                    }else if(i===Math.abs(y)&&pos!==1){
                        return true;
                    }
                }
            }else if(y<0){
                for(let i=1; i<=Math.abs(y); i++){                    
                    let pos = 1;
                    if(this.borderCheck(0,-i)){
                        pos = matrix[this.positionX][this.positionY-i];
                    }
                    if(typeof(pos)==='object'){
                        if(i===Math.abs(y)&&pos.color!==this.color){
                            if(take){
                                pos.delete();
                            }
                            return true;
                        }else{
                            return false;
                        }
                    }else if(i===Math.abs(y)&&pos!==1){
                        return true;
                    }
                }
            }
            return false;
        }
    }
}
class Queen extends Piece{
    constructor(x, y, color){
        super(x, y, color);
        this.value=9;
        this.src=this.color==='white'?'assets/QW.png':'assets/QB.png';
        this.create();
    }
    create(){
        matrix[this.positionX][this.positionY]=this;
        this.DOMrepresentation = document.createElement('img');
        this.DOMrepresentation.src = this.src;
        this.show(this.DOMrepresentation);
    }
    legalMove(x, y,matrix, take){
        if(x===0||y===0){
            if(x>0){      
                for(let i=1; i<=x; i++){
                let pos = 1;
                if(this.borderCheck(i,0)){
                    pos = matrix[this.positionX+i][this.positionY];
                }
                if(typeof(pos)==='object'){
                    if(i===Math.abs(x)&&pos.color!==this.color){
                        if(take){
                            pos.delete();
                        }
                        return true;
                    }else{
                        return false;
                    }
                }else if(i===Math.abs(x)&&pos!==1){
                    return true;
                }
            }
            }else if(x<0){
                for(let i=1; i<=Math.abs(x); i++){                
                    let pos = 1;
                    if(this.borderCheck(-i,0)){
                        pos = matrix[this.positionX-i][this.positionY];
                    }
                    if(typeof(pos)==='object'){
                        if(i===Math.abs(x)&&pos.color!==this.color){
                            if(take){
                                pos.delete();
                            }
                            return true;
                        }else{
                            return false;
                        }
                    }else if(i===Math.abs(x)&&pos!==1){
                        return true;
                    }
                }
            }else if(y>0){
                for(let i=1; i<=y; i++){                    
                    let pos = 1;
                    if(this.borderCheck(0,i)){
                        pos = matrix[this.positionX][this.positionY+i];
                    }
                    if(typeof(pos)==='object'){
                        if(i===Math.abs(y)&&pos.color!==this.color){
                            if(take){
                                pos.delete();
                            }
                            return true;
                        }else{
                            return false;
                        }
                    }else if(i===Math.abs(y)&&pos!==1){
                        return true;
                    }
                }
            }else if(y<0){
                for(let i=1; i<=Math.abs(y); i++){                    
                    let pos = 1;
                    if(this.borderCheck(0,-i)){
                        pos = matrix[this.positionX][this.positionY-i];
                    }
                    if(typeof(pos)==='object'){
                        if(i===Math.abs(y)&&pos.color!==this.color){
                            if(take){
                                pos.delete();
                            }
                            return true;
                        }else{
                            return false;
                        }
                    }else if(i===Math.abs(y)&&pos!==1){
                        return true;
                    }
                }
            }
        }else if(Math.abs(x)===Math.abs(y)){
            if(x>0&&y>0){        
                for(let i=1; i<=x; i++){
                let pos = 1;
                if(this.borderCheck(i,i)){
                    pos = matrix[this.positionX+i][this.positionY+i];
                }
                if(typeof(pos)==='object'){
                    if(i===Math.abs(x)&&pos.color!==this.color){
                        if(take){
                            pos.delete();
                        }
                        return true;
                    }else{
                        return false;
                    }
                }else if(pos===1){
                    return false;
                }else if(i===Math.abs(x)){
                    return true;
                }
            }
            }else if(x>0&&y<0){
                for(let i=1; i<=x; i++){                
                    let pos = 1;
                    if(this.borderCheck(i,-i)){
                        pos = matrix[this.positionX+i][this.positionY-i];
                    }
                    if(typeof(pos)==='object'){
                        if(i===Math.abs(x)&&pos.color!==this.color){
                            if(take){
                                pos.delete();
                            }
                            return true;
                        }else{
                            return false;
                        }
                    }else if(pos===1){
                        return false;
                    }else if(i===Math.abs(x)){
                        return true;
                    }
                }
            }else if(x<0&&y>0){
                for(let i=1; i<=Math.abs(x); i++){
                    let pos = 1;
                    if(this.borderCheck(-i,i)){
                        pos = matrix[this.positionX-i][this.positionY+i];
                    }
                    if(typeof(pos)==='object'){
                        if(i===Math.abs(x)&&pos.color!==this.color){
                            if(take){
                                pos.delete();
                            }
                            return true;
                        }else{
                            return false;
                        }
                    }else if(pos===1){
                        return false;
                    }else if(i===Math.abs(x)){
                        return true;
                    }
                }
            }else if(x<0&&y<0){
                for(let i=1; i<=Math.abs(x); i++){                
                    let pos = 1;
                    if(this.borderCheck(-i,-i)){
                        pos = matrix[this.positionX-i][this.positionY-i];
                    }
                    if(typeof(pos)==='object'){
                        if(i===Math.abs(x)&&pos.color!==this.color){
                            if(take){
                                pos.delete();
                            }
                            return true;
                        }else{
                            return false;
                        }
                    }else if(pos===1){
                        return false;
                    }else if(i===Math.abs(x)){
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
class Knight extends Piece{
    constructor(x, y, color){
        super(x, y, color);
        this.value=3;
        this.src=this.color==='white'?'assets/HW.png':'assets/HB.png';
        this.create();
    }
    create(){
        matrix[this.positionX][this.positionY]=this;
        this.DOMrepresentation = document.createElement('img');
        this.DOMrepresentation.src = this.src;
        this.show(this.DOMrepresentation);
    }
    legalMove(x,y,matrixBoard, take){
        if((Math.abs(x)===2&&Math.abs(y)===1)||(Math.abs(x)===1&&Math.abs(y)===2)){
            let pos = 1; 
            if(this.borderCheck(x,y)){
                pos = matrixBoard[this.positionX+x][this.positionY+y];   
            }
            if(typeof(pos)==='object'){
                if(this.color!==pos.color){
                    if(take){
                        pos.delete();
                    }
                    return true;
                }
                else{
                    return false;
                }
            }
            if(pos!==1){
                return true;   
            }
        }
        return false;
    }
}

//piece generation
for(let i=0; i<8; i++){
    window[`pw${i+1}`] = new Pawn(i, 1, 'white');
    window[`pb${i+1}`]  = new Pawn(i, 6, 'black');
}
let bw1 = new Bishop(2, 0, 'white');
let bw2 = new Bishop(5, 0, 'white');
let bb1 = new Bishop(2, 7, 'black');
let bb2 = new Bishop(5, 7, 'black');
let hw1 = new Knight(1, 0, 'white');
let hw2 = new Knight(6, 0, 'white');
let hb1 = new Knight(1, 7, 'black');
let hb2 = new Knight(6, 7, 'black');
let tw1 = new Tower(0, 0, 'white');
let tw2 = new Tower(7, 0, 'white');
let tb1 = new Tower(0, 7, 'black');
let tb2 = new Tower(7, 7, 'black');
let qw = new Queen(3, 0, 'white');
let qb = new Queen(3, 7, 'black');
let kw = new King(4, 0, 'white');
let kb = new King(4, 7, 'black');