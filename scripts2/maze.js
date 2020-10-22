const randomProbablity = 0.25


const generateRandomMaze = () => {
    var chance
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
                temp.setAttribute("class", "cell")
            }
        }
    }
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