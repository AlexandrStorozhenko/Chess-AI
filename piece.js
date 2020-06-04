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
                    else if(whiteMove2||blackMove2){
                        return true;
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

class King extends Piece{
    constructor(x, y, color){
        super(x, y, color);
        this.value=0;
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

//evaluation of check and mate
//if mate ==> gameOver = true;
//if check ==> restrict the number of allowed moves