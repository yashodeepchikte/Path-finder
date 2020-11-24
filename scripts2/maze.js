const randomProbablity = 0.25

const resetMaze = (event) => {
    event.preventDefault()
    numRows = document.getElementById("numRows").value ? document.getElementById("numRows").value : default_rows
    numRows = numRows > 3 ? numRows : 3
    numCols = document.getElementById("numCols").value ? document.getElementById("numCols").value : default_cols
    numCols = numCols > 3 ? numCols : 3
    numRows = Math.round(numRows)
    numCols = Math.round(numCols)
    wallList = []
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            if (!(start.row == r && start.col == c) && !(end.row == r && end.col == c)) {
                let temp = document.getElementById(getString(r, c))
                // console.log(temp, " set to cell")
                temp.setAttribute("class", "cell")
            }
        }
    }
    // SET a start and end
    start = { row: Math.round(numRows / 2) - 1, col: 2 }
    end = { row: Math.round(numRows / 2) - 1, col: numCols - 3 }

    temp = document.getElementById(getString(start.row, start.col))
    temp.setAttribute("class", "Start")

    temp = document.getElementById(getString(end.row, end.col))
    temp.setAttribute("class", "End")



    wallList = []
    smallObstacleList = []
    LargeObstacleList = []


    drawBoard()
}

const generateRandomMaze = (event) => {
    event.preventDefault()
    resetMaze(event)
    console.log("Generate random maze was called")
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            if (!(start.row == r && start.col == c) && !(end.row == r && end.col == c)) {
                chance = Math.random()
                if (chance < 0.3) {
                    let temp = document.getElementById(getString(r, c))
                    temp.setAttribute("class", "Wall")
                    // let node = getString(r, c)
                    wallList.push(getString(r, c))
                    // updateNeighboursWeight(r, c, wallWeight)
                }
            }
        }
    }
    drawBoard()
}


const generateSpiralMaze = (event) => {
    resetMaze(event)
    event.preventDefault()
    let upperBound = 1
    let lowerBound = numRows - 1
    let leftBound = 0
    let rightBound = numCols - 2

    let right = 0
    let down = 1
    let left = 2
    let up = 3

    let direction = 0

    let temp
    let count = 0
    while (upperBound <= lowerBound && leftBound <= rightBound) {

        // if (count > 5) {
        //     break
        // }
        // count++
        if (direction == right) {
            for (let i = leftBound; i <= rightBound; i++) {
                let temp = document.getElementById(getString(upperBound, i))
                temp.setAttribute("class", "Wall")
                wallList.push(getString(upperBound, i))
            }
            direction = down
            upperBound += 2
        }
        else if (direction == down) {
            for (let i = upperBound - 1; i <= lowerBound - 1; i++) {
                let temp = document.getElementById(getString(i, rightBound))
                temp.setAttribute("class", "Wall")
                wallList.push(getString(i, rightBound))
            }
            direction = left
            rightBound -= 2
        }
        else if (direction == left) {
            for (let i = leftBound + 1; i <= rightBound + 1; i++) {
                let temp = document.getElementById(getString(lowerBound - 1, i))
                temp.setAttribute("class", "Wall")
                wallList.push(getString(lowerBound - 1, i))
            }
            direction = top
            lowerBound -= 2
        }

        else if (direction == top) {
            for (let i = upperBound; i <= lowerBound; i++) {
                let temp = document.getElementById(getString(i, leftBound + 1))
                temp.setAttribute("class", "Wall")
                wallList.push(getString(i, leftBound + 1))
            }
            direction = right
            leftBound += 2
        }
    }


    // SET a start and end
    start.row = 0;
    start.col = 0
    temp = document.getElementById(getString(0, 0))
    temp.setAttribute("class", "Start")

    end.row = Math.round(numRows / 2)
    end.col = Math.round(numCols / 2)
    temp = document.getElementById(getString(end.row, end.col))
    temp.setAttribute("class", "End")

    wallList = wallList.filter(node => node != getString(start.row, start.col))
    wallList = wallList.filter(node => node != getString(end.row, end.col))
    drawBoard()
}