//  This fill contans all the Board

let canvas;
let ctx;
let resetButton

let threshold = 0.2;

const WIDTH = 1200;
const HEIGHT = 800;

let isRunning = false


tileRowCount = 25
tileColumnCount = 50

cellSeperation = 3

tileW = 20;
tileH = 20;


let boundX = 0
let boundY = 0

let start = [0, 0]
let end = [tileColumnCount-1, tileRowCount-1]
var tiles = []

function handelRowsChange(rows){
    tiles = []
    tileRowCount = rows
    end = [tileColumnCount-1, rows-1]
    start = [0, 0]
  
    for(var c=0; c<tileColumnCount; c++){
        tiles[c] = []
        for(var r=0; r<tileRowCount; r++){
            tiles[c][r] = {x: c*(tileW+cellSeperation)  , y: r*(tileH+cellSeperation), state: "empty", h:0, f:0, g:0, column:c, row:r}  
        }
    }
    
    //  Adding neighbours to the tiles
    for(var c=0; c<tileColumnCount; c++){
        for(var r=0; r<tileRowCount; r++){
            var neighbours = []
            if(c>0){neighbours.push(tiles[c-1][ r])}
            if(r>0){neighbours.push(tiles[c][ r-1])}
            if(c < tileColumnCount -1){neighbours.push(tiles[c+1][ r])}
            if(r < tileRowCount -1){neighbours.push(tiles[c][ r+1])}
    
            tiles[c][r].neighbours = neighbours
        }
    }
    tiles[end[0]][end[1]].state = "end"
    tiles[start[0]][start[1]].state = "start"
}

function handelColumnssChange(columns){
    tiles = []
    tileColumnCount = columns
    end = [columns-1, tileRowCount-1]
    start = [0, 0]

    for(var c=0; c<tileColumnCount; c++){
        tiles[c] = []
        for(var r=0; r<tileRowCount; r++){
            tiles[c][r] = {x: c*(tileW+cellSeperation)  , y: r*(tileH+cellSeperation), state: "empty", h:0, f:0, g:0, column:c, row:r}  
        }
    }
    
    //  Adding neighbours to the tiles
    for(var c=0; c<tileColumnCount; c++){
        for(var r=0; r<tileRowCount; r++){
            var neighbours = []
    
            if(c>0){neighbours.push(tiles[c-1][ r])}
            if(r>0){neighbours.push(tiles[c][ r-1])}
            if(c < tileColumnCount -1){neighbours.push(tiles[c+1][ r])}
            if(r < tileRowCount -1){neighbours.push(tiles[c][ r+1])}
    
            tiles[c][r].neighbours = neighbours
        }
    }
    tiles[end[0]][end[1]].state = "end"
    tiles[start[0]][start[1]].state = "start"
}

function handelThresholdChange(value){
    threshold = value
    console.log(value)
}

for(var c=0; c<tileColumnCount; c++){
    tiles[c] = []
    for(var r=0; r<tileRowCount; r++){
        tiles[c][r] = {x: c*(tileW+cellSeperation)  , y: r*(tileH+cellSeperation), state: "empty", h:0, f:0, g:0, column:c, row:r}  
    }
}

//  Adding neighbours to the tiles
for(var c=0; c<tileColumnCount; c++){
    for(var r=0; r<tileRowCount; r++){
		var neighbours = []

        if(c>0){neighbours.push(tiles[c-1][ r])}
        if(r>0){neighbours.push(tiles[c][ r-1])}
        if(c < tileColumnCount -1){neighbours.push(tiles[c+1][ r])}
        if(r < tileRowCount -1){neighbours.push(tiles[c][ r+1])}

        tiles[c][r].neighbours = neighbours
    }
}
// console.log("tiles = ", tiles)


tiles[start[0]][start[1]].state = "start";
tiles[end[0]][end[1]].state = "end";

function rect(x, y, w, h, state){
    //  draws a rectangle as per the given arguments
    // console.log("state = ", state)
    if(state == "start"){ctx.fillStyle = "green"}
    else if(state == "end"){ctx.fillStyle = "red"}
    else if(state == "wall"){ctx.fillStyle = "black"}
    else if(state == "empty"){ctx.fillStyle = "#AAAAAA"}
    else if(state =="visited"){ctx.fillStyle = "blue"}
    else if(state == "open"){ctx.fillStyle = "orange"}
    else if(state == "current"){ctx.fillStyle = "purple"}
    else if(state == "path"){ctx.fillStyle = "green"}
    else if(state == "frozen"){ctx.fillStyle = "green"}

    ctx.beginPath();
    ctx.rect(x, y, w, h)
    ctx.closePath();
    ctx.fill();
}

function clear(){
    // console.log("clearing the canvas")
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------
const  draw = async() => {
    clear()
    // console.log("drawing the canvas")

    for(var c=0; c<tileColumnCount; c++){
        for(var r=0; r<tileRowCount; r++){
            rect(tiles[c][r].x, tiles[c][r].y, tileW, tileH, tiles[c][r].state)
        }
    }



    window.requestAnimationFrame(draw)
}

function init(){
    canvas = document.getElementById("canvas")
    canvas.height = (tileH+3)*(tileRowCount)
    ctx = canvas.getContext("2d")
    // return setInterval(draw, 10);
    window.requestAnimationFrame(draw)
}
init()

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------

function resetMaze(){
    isRunning = true
    solved = false
    openSet = [tiles[start[0]][start[1]] ]   // only for Astar 
    closedSet = [] // only for Astar
    for(var c=0; c<tileColumnCount; c++){
        tiles[c] = []
        for(var r=0; r<tileRowCount; r++){
            tiles[c][r] = {x: c*(tileW+3)  , y: r*(tileH+3), state: "empty", column: c, row:r}  
        }
    }
    for(var c=0; c<tileColumnCount; c++){
        for(var r=0; r<tileRowCount; r++){
            var neighbours = []
    
            if(c>0){neighbours.push(tiles[c-1][ r])}
            if(r>0){neighbours.push(tiles[c][ r-1])}
            if(c < tileColumnCount -1){neighbours.push(tiles[c+1][ r])}
            if(r < tileRowCount -1){neighbours.push(tiles[c][ r+1])}
    
            tiles[c][r].neighbours = neighbours
        }
    }
    tiles[0][0].state = "start";
    tiles[tileColumnCount-1][tileRowCount-1].state = "end";
}

function randomMaze(){
    var chance
    for(var c=0; c<tileColumnCount; c++){
        for(var r=0; r<tileRowCount; r++){
         
            if(tiles[c][r].state !="start" && tiles[c][r].state != "end"){

                chance = Math.random()
                tiles[c][r] = {x: c*(tileW+3)  , y: r*(tileH+3), state: chance<threshold? "wall":"empty", h:0, f:0, g:0, column:c, row:r}  
            }
        }
    }
    for(var c=0; c<tileColumnCount; c++){
        for(var r=0; r<tileRowCount; r++){
            var neighbours = []
    
            if(c>0){neighbours.push(tiles[c-1][ r])}
            if(r>0){neighbours.push(tiles[c][ r-1])}
            if(c < tileColumnCount -1){neighbours.push(tiles[c+1][ r])}
            if(r < tileRowCount -1){neighbours.push(tiles[c][ r+1])}
    
            tiles[c][r].neighbours = neighbours
        }
    }
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
                    openSet = [tiles[start[0]][start[1]] ]  // only for Astar
                    tiles[c][r].state =  "start" 
                    console.log("changing the start position")
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