const default_rows = 25
const default_cols = 50
const default_delay = 10000 // 10k console log and clear

const wallWeight = 10000000
const smallObstaclWeigth = 5
const LargeObstacleWeigth = 10
const normalWeight = 1

let numRows = document.getElementById("numRows").value ? document.getElementById("numRows").value : default_rows
let numCols = document.getElementById("numCols").value ? document.getElementById("numCols").value : default_cols
let selector = document.getElementById("selector").value ? document.getElementById("selector").value : "Wall"
let algorithm = document.getElementById("algorithm").value ? document.getElementById("algorithm").value : "A* algorithm"
let distMatric = document.getElementById("distandeMeasure").value ? document.getElementById("distandeMeasure").value : "Euclidean distance"
let heapType = document.getElementById("heapType").value ? document.getElementById("heapType").value : "Binary Min heap"

let board = document.getElementById("board")

let wallList = []
let smallObstacleList = []
let LargeObstacleList = []
let visitedList = []
let start = { row: Math.round(numRows / 2) - 1, col: 2 }
let end = { row: Math.round(numRows / 2) - 1, col: numCols - 3 }

let weights = {}
let predecessorList = {}
let distancesList = {}

const getString = (r, c) => {
	return `row-${r}-col-${c}`
}

const getIndex = (s) => {
	let a = s.split("-")
	return [Number(a[1]), Number(a[3])]
}

const getClass = (r, c) => {
	let temp = getString(r, c)
	if (wallList.includes(temp)) {
		return "Wall"
	} else if (smallObstacleList.includes(temp)) {
		return "Small-Obstacle"
	} else if (LargeObstacleList.includes(temp)) {
		return "Large-Obstacle"
	} else if (visitedList.includes(temp)) {
		return "visited"
	}
	else if (start.row == r && start.col == c) {
		return "Start"
	} else if (end.row == r && end.col == c) {
		return "End"
	} else {
		return "cell"
	}
}
const handelInputsChange = (e) => {
	// e.preventDefault()
	console.log("handel inputs change was called")
	try {
		algorithm = document.getElementById("algorithm").value ? document.getElementById("algorithm").value : "A* algorithm"
		distMatric = document.getElementById("distandeMeasure").value ? document.getElementById("distandeMeasure").value : "Euclidean distance"
		heapType = document.getElementById("heapType").value ? document.getElementById("heapType").value : "Binary Min heap"
		selector = document.getElementById("selector").value ? document.getElementById("selector").value : "Wall"
		numRows = document.getElementById("numRows").value ? document.getElementById("numRows").value : default_rows
		numRows = numRows > 3 ? numRows : 3
		numCols = document.getElementById("numCols").value ? document.getElementById("numCols").value : default_cols
		numCols = numCols > 3 ? numCols : 3
		numRows = Math.round(numRows)
		numCols = Math.round(numCols)
		console.log(
			"Inputs changed successfully",
			"\nalgorithm = ", algorithm,
			"\ndistMatric = ", distMatric,
			"\nheapType  = ", heapType,
			"\nselector = ", selector,
			"\nnumRows = ", numRows,
			"\nnumCols = ", numCols,
		)
		drawBoard()
		//  Reste the board and state 
		// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	} catch (error) {
		console.log("there was an error in canging the input parameters")
	}
}

const getNeighbours = (r, c) => {
	temp = []
	if (c > 0 && !wallList.includes(getString(r, c - 1)) && !visitedList.includes(getString(r, c))) {

		temp.push(getString(r, c - 1))
	}
	if (r > 0 && !wallList.includes(getString(r - 1, c)) && !visitedList.includes(getString(r, c))) {
		temp.push(getString(r - 1, c))
	}
	if (r < numRows && !wallList.includes(getString(r + 1, c)) && !visitedList.includes(getString(r, c))) {
		temp.push(getString(r + 1, c))
	}
	if (c < numCols && !wallList.includes(getString(r, c + 1)) && !visitedList.includes(getString(r, c))) {
		temp.push(getString(r, c + 1))
	}
	return temp
}


const changeWeight = (r1, c1, r2, c2, weight = 1) => {
	let node = getString(r1, c1)
	let temp = getString(r2, c2)
	if (weights[node]) {
		weights[node][temp] = weight
	} else {
		weights[node] = {
			[temp]: weight
		}
	}
	if (weights[temp]) {
		weights[temp][node] = weight
	} else {
		weights[temp] = {
			[node]: weight
		}
	}
}

const updateNeighboursWeight = (r, c, weight = 1) => {
	let temp
	let node = getString(r, c)
	if (c > 0) {
		temp = getString(r, c - 1)
		// temp_weigth = max([weights[temp][node], weights[node][temp], weight])
		temp_weigth = Math.max(weights[temp][node], weights[node][temp], weight)
		changeWeight(r, c, r, c - 1, temp_weigth)
	}
	if (r > 0) {
		temp = getString(r - 1, c)
		temp_weigth = Math.max(weights[temp][node], weights[node][temp], weight)

		changeWeight(r, c, r - 1, c, temp_weigth)
	}
	if (r < numRows) {
		temp = getString(r + 1, c)
		temp_weigth = Math.max(weights[temp][node], weights[node][temp], weight)
		changeWeight(r, c, r + 1, c, temp_weigth)
	}
	if (c < numCols) {
		temp = getString(r, c + 1)
		// temp_weigth = max([weights[temp][node], weights[node][temp], weight])
		temp_weigth = Math.max(weights[temp][node], weights[node][temp], weight)

		changeWeight(r, c, r, c + 1, weight)
	}
}



const intiailize = () => {
	console.log("initialize was called")
	algorithm = document.getElementById("algorithm").value ? document.getElementById("algorithm").value : "A* algorithm"
	distMatric = document.getElementById("distandeMeasure").value ? document.getElementById("distandeMeasure").value : "Euclidean distance"
	heapType = document.getElementById("heapType").value ? document.getElementById("heapType").value : "Binary Min heap"
	selector = document.getElementById("selector").value ? document.getElementById("selector").value : "Wall"
	numRows = document.getElementById("numRows").value ? document.getElementById("numRows").value : default_rows
	numRows = numRows > 2 ? numRows : 2
	numCols = document.getElementById("numCols").value ? document.getElementById("numCols").value : default_cols
	numCols = numCols > 2 ? numCols : 2
	numRows = Math.round(numRows)
	numCols = Math.round(numCols)

	//  we need to intialize 
	// weights list	--> 1 if both empty infinte if
	//  predecessors list ---> null for all
	//  distance list   ---> 0 for start node very high for the rest

	//  Initializing weights
	weights = {}
	for (let r = 0; r < numRows; r++) {
		for (let c = 0; c < numCols; c++) {
			if (c > 0) { changeWeight(r, c, r, c - 1) }
			if (r > 0) { changeWeight(r, c, r - 1, c) }
			if (r < numRows) { changeWeight(r, c, r + 1, c) }
			if (c < numCols) { changeWeight(r, c, r, c + 1) }
		}
	}

	//  Predecessors list
	for (let r = 0; r < numRows; r++) {
		for (let c = 0; c < numCols; c++) {
			let node = getString(r, c)
			predecessorList[node] = null
		}
	}

	//  Distance list
	for (let r = 0; r < numRows; r++) {
		for (let c = 0; c < numCols; c++) {
			node = getString(r, c)
			if (r == start.row && c == start.col) {
				distancesList[node] = 0
			} else {
				distancesList[node] = 1000000
			}
		}
	}
}


const removeFromAllLists = (r, c) => {
	let temp = getString(r, c)
	let currentClass = getClass(r, c)
	if (currentClass == "Wall") {
		wallList = wallList.filter(node => node != temp)
	}
	if (currentClass == "Small-Obstacle") {
		smallObstacleList = smallObstacleList.filter(node => node != temp)
	}
	if (currentClass == "Large-Obstacle") {
		LargeObstacleList = LargeObstacleList.filter(node => node != temp)
	}
}

const handelClick = (r, c, selector) => {
	// console.log("handel click was called on --> r = ", r, " c = ", c)
	if (!selector) {
		selector = document.getElementById("selector").value ? document.getElementById("selector").value : "Wall"
	}
	removeFromAllLists(r, c)
	let node = getString(r, c)
	if (selector === "Wall") {
		if (!(start.row == r && start.col == c) && !(end.row == r && end.col == c)) {
			// console.log("selector = wall")
			wallList.push(node)
			updateNeighboursWeight(r, c, wallWeight)
		}
	} else if (selector === "Start") {
		// console.log("selector = start")
		start.row = r
		start.col = c
		updateNeighboursWeight(r, c, normalWeight)
	} else if (selector === "End") {
		// console.log("selector = end")
		end.row = r
		end.col = c
		updateNeighboursWeight(r, c, normalWeight)

	} else if (selector === "Small-Obstacle") {
		if (!(start.row == r && start.col == c) && !(end.row == r && end.col == c)) {

			// console.log("selector = small obstaclle")
			smallObstacleList.push(node)
			updateNeighboursWeight(r, c, smallObstaclWeigth)
		}
	} else if (selector === "Large-Obstacle") {
		if (!(start.row == r && start.col == c) && !(end.row == r && end.col == c)) {

			// console.log("selector = large obstaclle")
			LargeObstacleList.push(node)
			updateNeighboursWeight(r, c, LargeObstacleWeigth)
		}
	} else {
		if (!(start.row == r && start.col == c) && !(end.row == r && end.col == c)) {

			// console.log("the selector must have been the empty cell	")
			updateNeighboursWeight(r, c, normalWeight)
		}
	}
	drawBoard()
}

const drawBoard = () => {
	// console.log("Draw board was called")
	try {
		// let board = document.createElement("div")
		board = document.getElementById("board")
		board.innerHTML = ""
		// board.setAttribute("class", "board")
		for (let r = 0; r < numRows; r++) {
			let row = document.createElement("div")
			row.setAttribute("class", "row")
			row.setAttribute("id", `row-{r}`)
			for (let c = 0; c < numCols; c++) {
				col = document.createElement("div")
				col.setAttribute("id", getString(r, c))
				let type = getClass(r, c)
				col.setAttribute("class", type)
				col.setAttribute("onClick", `handelClick(${r}, ${c})`)
				row.appendChild(col)
				// temp += `<div id="row-${r}-col-${c}"  class="cell"> </div>`
			}
			board.appendChild(row)
		}
		// board.innerHTML = temp
	} catch (error) {
		console.log("there is some error in drawing the board --> \n", error.message)
	}
}

intiailize()
drawBoard()








