var canvas;
var ctx;

const WIDTH = 1200;
const HEIGHT = 800;

tileW = 20;
tileH = 20

tileRowCount = 25
tileColumnCount = 40

var tiles = []

for(var c=0; c<tileColumnCount; c++){
    tiles[c] = []
    for(var r=0; r<tileRowCount; r++){
        tiles[c][r] = {x: c*(tileW+3)  , y: r*(tileH+3), state: "empty"}  
    }
}

tiles[0][0].state = "start";
tiles[tileColumnCount-1][tileRowCount-1].state = "end";

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
    ctx = canvas.getContext("2d")
    return setInterval(draw, 10);
    
}
init()

function handelMouseDown(e){

    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;

    for(var c=0; c<tileColumnCount; c++){
        for(var r=0; r<tileRowCount; r++){
            if( c*(tileW+3) < x && x< c*(tileW+3) + tileW && r*(tileH+3) < y && y < r*(tileH+3) + tileH ){  
                tiles[c][r].state = tiles[c][r].state == "empty" ? "wall" : "empty"
            }   
        }
    }

}

canvas.onmousedown = handelMouseDown;