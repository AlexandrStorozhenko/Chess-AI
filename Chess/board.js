function createArray(length) {
    let arr = new Array(length || 0),
        i = length;
    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
    return arr;
}

//Matrix representing the 8x8 chess board
let matrix = createArray(8, 8);

//Graphical display of the board
let square = document.createElement('div');
for(let i=0; i<64; i++){
    i%16<=7?i%2===0?square.style.background='#eeeed2':square.style.background='#2F4858':
    i%16<=15?i%2===0?square.style.background='#2F4858':square.style.background='#eeeed2':undefined;
    let posX = i%8;
    let posY = 8-((i-posX)/8);
    square.className = "";
    square.classList.add('square');
    square.classList.add(`${posX};${posY-1}`);
    document.querySelector('#board').appendChild(square.cloneNode(true));
}

//Board UI update function
function updateBoard(board){
    for(let i=0; i<8;i++){
        board[i].forEach(element => {
            if(typeof(element)==='object'){
                let prevState = matrix[element.positionX][element.positionY];
                if(typeof(prevState)==='object'){
                    if(prevState!==element){
                        prevState.delete();
                    }
                }
                prevState = element;
                prevState.show();
            }
        });
    }
    matrix=board;
}