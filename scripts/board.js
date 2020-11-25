//  This fill contans all the Board

let canvas;
let ctx;
let resetButton

let threshold = 0.2;

const WIDTH = 1200;
const HEIGHT = 800;

let isRunning = false


tileRowCount = 25
tileColumnCount = 60

cellSeperation = 1

tileW = 20;
tileH = 20;


let boundX = 0
let boundY = 0

let start = [2, Math.floor(tileRowCount / 2)]
let end = [tileColumnCount - 3, Math.floor(tileRowCount / 2)]
var tiles = []





function handelRowsChange(rows) {
    rows = rows > 1 ? rows : 1
    tiles = []
    tileRowCount = rows
    end = [tileColumnCount - 1, rows - 1]
    start = [0, 0]
    canvas.height = (tileH + cellSeperation) * (tileRowCount) - cellSeperation
    canvas.width = (tileW + cellSeperation) * (tileColumnCount) - cellSeperation

    for (var c = 0; c < tileColumnCount; c++) {
        tiles[c] = []
        for (var r = 0; r < tileRowCount; r++) {
            tiles[c][r] = { x: c * (tileW + cellSeperation), y: r * (tileH + cellSeperation), state: "empty", h: 0, f: 0, g: 0, column: c, row: r }
        }
    }

    //  Adding neighbours to the tiles
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            var neighbours = []
            if (c > 0) { neighbours.push(tiles[c - 1][r]) }
            if (r > 0) { neighbours.push(tiles[c][r - 1]) }
            if (c < tileColumnCount - 1) { neighbours.push(tiles[c + 1][r]) }
            if (r < tileRowCount - 1) { neighbours.push(tiles[c][r + 1]) }

            tiles[c][r].neighbours = neighbours
        }
    }
    tiles[end[0]][end[1]].state = "end"
    tiles[start[0]][start[1]].state = "start"
}

function handelColumnssChange(columns) {
    columns = columns > 0 ? columns : 1
    tiles = []
    tileColumnCount = columns
    end = [columns - 1, tileRowCount - 1]
    start = [0, 0]
    canvas.height = (tileH + cellSeperation) * (tileRowCount) - cellSeperation
    canvas.width = (tileW + cellSeperation) * (tileColumnCount) - cellSeperation
    for (var c = 0; c < tileColumnCount; c++) {
        tiles[c] = []
        for (var r = 0; r < tileRowCount; r++) {
            tiles[c][r] = { x: c * (tileW + cellSeperation), y: r * (tileH + cellSeperation), state: "empty", h: 0, f: 0, g: 0, column: c, row: r }
        }
    }

    //  Adding neighbours to the tiles
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            var neighbours = []

            if (c > 0) { neighbours.push(tiles[c - 1][r]) }
            if (r > 0) { neighbours.push(tiles[c][r - 1]) }
            if (c < tileColumnCount - 1) { neighbours.push(tiles[c + 1][r]) }
            if (r < tileRowCount - 1) { neighbours.push(tiles[c][r + 1]) }

            tiles[c][r].neighbours = neighbours
        }
    }
    tiles[end[0]][end[1]].state = "end"
    tiles[start[0]][start[1]].state = "start"
}

function handelCellSeperationChange(value) {
    value = value >= 0 ? value : 0
    cellSeperation = Number(value)
    console.log("Cell Seperation = ", cellSeperation)
    canvas.height = (tileH + cellSeperation) * (tileRowCount) - cellSeperation
    canvas.width = (tileW + cellSeperation) * (tileColumnCount) - cellSeperation

    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            tiles[c][r].x = c * (tileW + cellSeperation)
            tiles[c][r].y = r * (tileH + cellSeperation)


        }
    }
}





for (var c = 0; c < tileColumnCount; c++) {
    tiles[c] = []
    for (var r = 0; r < tileRowCount; r++) {
        tiles[c][r] = { x: c * (tileW + cellSeperation), y: r * (tileH + cellSeperation), state: "empty", h: 0, f: 0, g: 0, column: c, row: r }
    }
}

//  Adding neighbours to the tiles
const handelNeighboursChange = () => {
    var selector = document.getElementById("Neighbours").value
    console.log("inti neighbours was called")
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            var neighbours = []
            if (selector === "4-Adjcent Neighbours" || selector === "All 8 Neighbours") {
                if (c > 0) { neighbours.push(tiles[c - 1][r]) }
                if (r > 0) { neighbours.push(tiles[c][r - 1]) }
                if (c < tileColumnCount - 1) { neighbours.push(tiles[c + 1][r]) }
                if (r < tileRowCount - 1) { neighbours.push(tiles[c][r + 1]) }
            }
            if (selector === "Diagonal Neighbours" || selector === "All 8 Neighbours") {
                if (c > 0 && r > 0) { neighbours.push(tiles[c - 1][r - 1]) }
                if (c > 0 && r < tileRowCount - 1) { neighbours.push(tiles[c - 1][r + 1]) }
                if (c < tileColumnCount - 1 && r > 0) { neighbours.push(tiles[c + 1][r - 1]) }
                if (c < tileColumnCount - 1 && r < tileRowCount - 1) { neighbours.push(tiles[c + 1][r + 1]) }
            }
            tiles[c][r].neighbours = neighbours
        }
    }
}

handelNeighboursChange()

// console.log("tiles = ", tiles)


tiles[start[0]][start[1]].state = "start";
tiles[end[0]][end[1]].state = "end";

function rect(x, y, w, h, state) {
    //  draws a rectangle as per the given arguments
    // console.log("state = ", state)
    if (state == "start") { ctx.fillStyle = "#7bc043 " }
    else if (state == "end") { ctx.fillStyle = "red" }
    else if (state == "wall") { ctx.fillStyle = "#1e1f26" }
    else if (state == "empty") { ctx.fillStyle = " white " }
    else if (state == "visited") { ctx.fillStyle = "#4f5b66" }
    else if (state == "open") { ctx.fillStyle = "#3d1e6d" }
    else if (state == "current") { ctx.fillStyle = "purple" }
    else if (state == "path") { ctx.fillStyle = "#316aff " }
    else if (state == "frozen") { ctx.fillStyle = "green" }

    else if (state == "left") { ctx.fillStyle = "blue" }
    else if (state == "down") { ctx.fillStyle = "orange" }
    else if (state == "right") { ctx.fillStyle = "green" }
    else if (state == "up") { ctx.fillStyle = "red" }

    else if (state == "neighbour") { ctx.fillStyle = "blue" }


    ctx.beginPath();
    ctx.rect(x, y, w, h)
    ctx.closePath();
    ctx.fill();
}

function clear() {
    // console.log("clearing the canvas")
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------
const draw = async () => {
    clear()
    // console.log("drawing the canvas")

    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            rect(tiles[c][r].x, tiles[c][r].y, tileW, tileH, tiles[c][r].state)
        }
    }



    window.requestAnimationFrame(draw)
}

function init() {
    canvas = document.getElementById("canvas")
    canvas.height = (tileH + cellSeperation) * (tileRowCount) - cellSeperation
    canvas.width = (tileW + cellSeperation) * (tileColumnCount) - cellSeperation
    ctx = canvas.getContext("2d")
    // return setInterval(draw, 10);
    window.requestAnimationFrame(draw)
}
init()

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------
function createVerticalmaze() {

    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            tiles[c][r].state = "empty"
        }
    }
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            if (c % 3 == 1) {
                tiles[c][r].state = "wall"
                if (r == 0 && c % 3 == 1) {
                    tiles[c][r].state = "empty"
                }

                if (r == tileRowCount - 1 && c % 6 == 1) {
                    tiles[c][0].state = "wall"
                    tiles[c][r].state = "empty"
                }

            }
        }
    }
    tiles[0][0].state = "start"
    tiles[tileColumnCount - 1][tileRowCount - 1].state = "end"
    end[0] = tileColumnCount - 1
    end[1] = tileRowCount - 1
    start[0] = 0
    start[1] = 0
}

function createHorizontalMaze() {
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            tiles[c][r].state = "empty"
        }
    }
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            if (r % 3 == 1) {
                tiles[c][r].state = "wall"
                tiles[tileColumnCount - 1][r].state = "empty"
                tiles[0][r].state = "empty"

                if (r % 3 == 1 && r % 6 != 1) {
                    tiles[c][r].state = "wall"
                }
                if (r % 6 == 1) {
                    tiles[0][r].state = "wall"
                }

            }
        }
    }
    tiles[0][0].state = "start"
    tiles[tileColumnCount - 1][tileRowCount - 1].state = "end"
    end[0] = tileColumnCount - 1
    end[1] = tileRowCount - 1
    start[0] = 0
    start[1] = 0
}

function createDiagonalMaze() {
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            tiles[c][r].state = "empty"
        }
    }

    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            if ((r + c) % 3 == 0) {
                tiles[c][r].state = "wall"
            }
            if (c % 3 == 0 && c % 6 != 0) {
                tiles[c][0].state = "empty"
            }
            if (r % 6 == 0) {
                tiles[0][r].state = "empty"
            }
            if (c % 6 == 0) {
                tiles[c][tileRowCount - 1].state = "empty"
            }
            if (r % 2 == 0) {
                console.log("print")
                tiles[tileColumnCount - 1][r].state = "empty"
            }
        }
    }
    tiles[0][0].state = "start"
    tiles[tileColumnCount - 1][tileRowCount - 1].state = "end"
    end[0] = tileColumnCount - 1
    end[1] = tileRowCount - 1
    start[0] = 0
    start[1] = 0

}

function createSpiralMaze() {

    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            tiles[c][r].state = "wall"
        }
    }

    let upperBound = 0
    let lowerBound = tileRowCount - 1
    let leftBound = 0
    let rightBound = tileColumnCount - 1

    let right = 0
    let down = 1
    let left = 2
    let up = 3
    let direction = 0
    while (upperBound <= lowerBound && leftBound <= rightBound) {
        console.log(" ----------------------------------------- ")
        console.log("UpperBound = ", upperBound)
        console.log("lowerBound = ", lowerBound)
        console.log(" ")
        console.log("leftBound = ", leftBound)
        console.log("rightBound = ", rightBound)

        if (direction == right) {
            for (let i = leftBound - 2 >= 0 ? leftBound - 2 : 0; i <= rightBound; i++) {
                tiles[i][upperBound].state = "empty"
            }
            direction = down
            upperBound += 2
        }
        else if (direction == down) {
            for (let i = upperBound - 2; i <= lowerBound; i++) {
                tiles[rightBound][i].state = "empty"
            }
            direction = left
            rightBound -= 2
        }
        else if (direction == left) {
            for (let i = leftBound; i <= rightBound + 2; i++) {
                tiles[i][lowerBound].state = "empty"
            }
            direction = up
            lowerBound -= 2
        }
        else if (direction == up) {
            for (let i = upperBound; i <= lowerBound + 2; i++) {
                tiles[leftBound][i].state = "empty"
            }
            direction = right
            leftBound += 2
        }
    }
    tiles[0][0].state = "start"
    tiles[Math.floor(tileColumnCount / 2)][Math.floor(tileRowCount / 2)].state = "end"
    end = [Math.floor(tileColumnCount / 2), Math.floor(tileRowCount / 2)]
    start = [0, 0]
}

function clearPath() {
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            if (tiles[c][r].state != "wall") {
                tiles[c][r].state = "empty"
            }
        }
    }
    tiles[start[0]][start[1]].state = "start"
    tiles[end[0]][end[1]].state = "end"

}


function resetMaze() {
    isRunning = true
    solved = false
    openSet = [tiles[start[0]][start[1]]]   // only for Astar 
    closedSet = [] // only for Astar
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            if (tiles[c][r].state != "start" && tiles[c][r].state != "end") {
                tiles[c][r].state = "empty"
            }
        }
    }
    tiles[start[0]][start[1]].state = "start"
    tiles[end[0]][end[1]].state = "end"
}

function randomMaze() {
    var chance
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {

            if (tiles[c][r].state != "start" && tiles[c][r].state != "end") {

                chance = Math.random()
                tiles[c][r].state = chance < threshold ? "wall" : "empty"
            }
        }
    }
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            var neighbours = []

            if (c > 0) { neighbours.push(tiles[c - 1][r]) }
            if (r > 0) { neighbours.push(tiles[c][r - 1]) }
            if (c < tileColumnCount - 1) { neighbours.push(tiles[c + 1][r]) }
            if (r < tileRowCount - 1) { neighbours.push(tiles[c][r + 1]) }

            tiles[c][r].neighbours = neighbours
        }
    }
}

function handelMouseMoveStart(e) {

    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            if (c * (tileW + cellSeperation) < x && x < c * (tileW + cellSeperation) + tileW && r * (tileH + cellSeperation) < y && y < r * (tileH + cellSeperation) + tileH & (c != start[0] || r != start[1])) {
                if (tiles[c][r].state != "end") {
                    tiles[start[0]][start[1]].state = "empty"
                    start[0] = c
                    start[1] = r
                    openSet = [tiles[start[0]][start[1]]]  // only for Astar
                    tiles[c][r].state = "start"
                    console.log("changing the start position")
                }
            }
        }
    }
}

function handelMouseMoveEnd(e) {
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    console.log("end is being moved")
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            if (c * (tileW + cellSeperation) < x && x < c * (tileW + cellSeperation) + tileW && r * (tileH + cellSeperation) < y && y < r * (tileH + cellSeperation) + tileH & (c != start[0] || r != start[1])) {
                if (tiles[c][r].state != "start") {
                    tiles[end[0]][end[1]].state = "empty"
                    end[0] = c
                    end[1] = r
                    tiles[c][r].state = "end"
                }
            }
        }
    }
}

function handelMouseMove(e) {
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            if (c * (tileW + cellSeperation) < x && x < c * (tileW + cellSeperation) + tileW && r * (tileH + cellSeperation) < y && y < r * (tileH + cellSeperation) + tileH & (c != boundX || r != boundY)) {
                if (tiles[c][r].state != "start" && tiles[c][r].state != "end") {
                    tiles[c][r].state = tiles[c][r].state == "empty" ? "wall" : "empty"
                    boundX = c
                    boundY = r
                }
            }
        }
    }
}

function handelMouseDown(e) {
    clearPath()
    canvas.onmousemove = handelMouseMove;
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    for (var c = 0; c < tileColumnCount; c++) {
        for (var r = 0; r < tileRowCount; r++) {
            if (c * (tileW + cellSeperation) < x && x < c * (tileW + cellSeperation) + tileW && r * (tileH + cellSeperation) < y && y < r * (tileH + cellSeperation) + tileH) {
                if (tiles[c][r].state != "start" && tiles[c][r].state != "end") {
                    tiles[c][r].state = tiles[c][r].state == "empty" ? "wall" : "empty"
                    boundX = c
                    boundY = r
                }
                else {
                    if (tiles[c][r].state == "start") {
                        canvas.onmousemove = handelMouseMoveStart;
                    } else {
                        canvas.onmousemove = handelMouseMoveEnd;
                    }

                }
            }
        }
    }
}

function handelMouseUp(e) {
    clearPath()
    canvas.onmousemove = null;
}


canvas.onmousedown = handelMouseDown;
canvas.onmouseup = handelMouseUp