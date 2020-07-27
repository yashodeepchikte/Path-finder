let canvas;
let ctx;
let resetButton

const WIDTH = 1200;
const HEIGHT = 800;


tileRowCount = 25
tileColumnCount = 50

tileW = 20;
tileH = 20;


let boundX = 0
let boundY = 0

let start = [1, 1]
let end = [tileColumnCount-1, tileRowCount-1]
var tiles = []

for(var c=0; c<tileColumnCount; c++){
    tiles[c] = []
    for(var r=0; r<tileRowCount; r++){
        tiles[c][r] = {x: c*(tileW+3)  , y: r*(tileH+3), state: "empty"}  
    }
}

tiles[start[0]][start[1]].state = "start";
tiles[end[0]][end[1]].state = "end";

function rect(x, y, w, h, state){
    //  draws a rectangle as per the given arguments

    
    if(state == "start"){ctx.fillStyle = "green"}
    else if(state == "end"){ctx.fillStyle = "red"}
    else if(state == "wall"){ctx.fillStyle = "black"}
    else if(state == "empty"){ctx.fillStyle = "#AAAAAA"}
    ctx.beginPath();
    ctx.rect(x, y, w, h)
    ctx.closePath();
    ctx.fill();
}

function clear(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
}

function draw(){
    clear()
    for(var c=0; c<tileColumnCount; c++){
        for(var r=0; r<tileRowCount; r++){
            rect(tiles[c][r].x, tiles[c][r].y, tileW, tileH, tiles[c][r].state)
        }
    }
}

function init(){
    canvas = document.getElementById("canvas")
    canvas.height = (tileH+3)*(tileRowCount)
    ctx = canvas.getContext("2d")
    return setInterval(draw, 10);
}
init()

function resetMaze(){
    for(var c=0; c<tileColumnCount; c++){
        tiles[c] = []
        for(var r=0; r<tileRowCount; r++){
            tiles[c][r] = {x: c*(tileW+3)  , y: r*(tileH+3), state: "empty"}  
        }
    }
    tiles[0][0].state = "start";
    tiles[tileColumnCount-1][tileRowCount-1].state = "end";
}
function handelMouseMoveStart(e){
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    for(var c=0; c<tileColumnCount; c++){
        for(var r=0; r<tileRowCount; r++){
            if( c*(tileW+3) < x && x< c*(tileW+3) + tileW && r*(tileH+3) < y && y < r*(tileH+3) + tileH & ( c!= start[0] || r != start[1]) ){  
                if( tiles[c][r].state != "end"){
                    tiles[start[0]][start[1]].state = "empty"
                    start[0] = c
                    start[1] = r
                    tiles[c][r].state =  "start" 
                    console.log("we are running")
                }
            }   
        }
    }

}
function handelMouseMoveEnd(e){
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    console.log("end is being moved")
    for(var c=0; c<tileColumnCount; c++){
        for(var r=0; r<tileRowCount; r++){
            if( c*(tileW+3) < x && x< c*(tileW+3) + tileW && r*(tileH+3) < y && y < r*(tileH+3) + tileH & ( c!= start[0] || r != start[1]) ){  
                if( tiles[c][r].state != "start"){
                    tiles[end[0]][end[1]].state = "empty"
                    end[0] = c
                    end[1] = r
                    tiles[c][r].state =  "end" 
                }
            }   
        }
    }
}

function handelMouseMove(e){
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    for(var c=0; c<tileColumnCount; c++){
        for(var r=0; r<tileRowCount; r++){
            if( c*(tileW+3) < x && x< c*(tileW+3) + tileW && r*(tileH+3) < y && y < r*(tileH+3) + tileH & ( c!= boundX || r != boundY) ){  
                if(tiles[c][r].state !="start" && tiles[c][r].state != "end"){
                    tiles[c][r].state = tiles[c][r].state == "empty" ? "wall" : "empty"
                    boundX = c
                    boundY = r
                }
            }   
        }
    }
}

function handelMouseDown(e){
    canvas.onmousemove = handelMouseMove;
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    for(var c=0; c<tileColumnCount; c++){
        for(var r=0; r<tileRowCount; r++){
            if( c*(tileW+3) < x && x< c*(tileW+3) + tileW && r*(tileH+3) < y && y < r*(tileH+3) + tileH ){
                if(tiles[c][r].state !="start" && tiles[c][r].state != "end"){
                    tiles[c][r].state = tiles[c][r].state == "empty" ? "wall" : "empty"
                    boundX = c
                    boundY = r    
                }
                else{
                    if(tiles[c][r].state == "start"){
                        canvas.onmousemove =  handelMouseMoveStart;
                    }else{
                        canvas.onmousemove =  handelMouseMoveEnd;
                    }

                }
            }   
        }
    }
}

function handelMouseUp(e){
    canvas.onmousemove = null;
}

canvas.onmousedown = handelMouseDown;
canvas.onmouseup = handelMouseUp