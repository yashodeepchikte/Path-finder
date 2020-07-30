// let availableOptions = []
// function addToAvailableOptions(column, row){
// 	tiles[column][row].state = "open"
// 	availableOptions.push(tiles[column][row])
// }

// function countNeighbouringPassage(column, row){
// 	let neighbours = tiles[column][row]
// 	let count = 0
// 	for(let i = 0; i<neighbours.length; i++){
// 		if (tiles[neighbours[i].column][neighbours[i].row].state == "empty"){
// 			count++
// 		}
// 	}
// 	return count
// }

// function openNode(column, row){
// 	tiles[column][row].state = "empty"
// }

// function PrimsMazeGeneration(){
// 	console.log("Running  maze generation with Prims algorithm")

// 	// Step1:- Start with a grid full of walls
//     for(var c=0; c<tileColumnCount; c++){
//         for(var r=0; r<tileRowCount; r++){
	
//             if(tiles[c][r].state!="start" || tiles[c][r].state!="end"){
//                 tiles[c][r].state = "wall"
//             }
//         }
//     }

// 	//  Set the starting point
// 	tiles[start[0]][start[1]].state = "empty"
// 	tiles[start[0]][start[1]].primesVisited = true
// 	var neighbours = tiles[start[0]][start[1]].neighbours
// 	for(let i = 0; i<tiles[start[0]][start[1]].neighbours.length; i++){
// 		addToAvailableOptions(neighbours[i].column, neighbours[i].row)
// 	}

// 	const abc = () => {
// 		if(availableOptions.length==0){
// 			return
// 		}
// 		let randomIndex = Math.floor(Math.random()*availableOptions.length)
// 		let currentNode = availableOptions[randomIndex]
// 		tiles[currentNode.column][currentNode.row].state = "current"

// 		neighbours = tiles[currentNode.column][currentNode.row].neighbours
// 		for(let i = 0; i< neighbours.length; i++){
// 			if(!neighbours[i].primesVisited){
// 				addToAvailableOptions(neighbours[i].column, neighbours[i].row)
// 			}else{
// 				tiles[neighbours[i].column][ neighbours[i].row].state = "visited"
// 			}
// 		}

// 		let neighbouringPassageCount = countNeighbouringPassage(currentNode.column, currentNode.row)
// 		if(neighbouringPassageCount < 1){
// 			openNode(currentNode.column, currentNode.row)
// 			tiles[currentNode.column][currentNode.row].primesVisited = true
// 		}else{
// 			tiles[currentNode.column][currentNode.row].state = "wall"
// 		}
// 		removeElmentFromArray(availableOptions, currentNode)
// 		setTimeout(abc, 10)
// 	}
// 	abc()

// }


// console.log("prims_maze_generation  file was loaded")

// function countNeighboursVisited(tile){
// 	var neighbours = tile.neighbours
// 	let count = 0
// 	for(let i=0; i< neighbours.length; i++){
// 		// if (neighbours[i].row == tile.row && neighbours[i].primsVisited){
// 			count++
// 		// } 
// 	}
// 	return count
// }

// function PrimsMazeGeneration(){
// 	console.log("Running  maze generation with Prims algorithm")

// 	// Step1:- Start with a grid full of walls
//     for(var c=0; c<tileColumnCount; c++){
//         for(var r=0; r<tileRowCount; r++){
	
//             if(tiles[c][r].state!="start" || tiles[c][r].state!="end"){
//                 tiles[c][r].state = "wall"
//             }
//         }
//     }

// 	let wallList = []
// 	console.log("WallList =>> ", wallList)
// 	console.log("tiles[start[0]][start[1]] = ", tiles[start[0]][start[1]]) 

//     // Step 2 :- Pick the starting  cell, mark it as part of the open space. Add the walls of the cell to the wall list.
//     // Step 2A:- Pick the starting cell 
//     var startCell = tiles[start[0]][start[1]]
//     // Step 2B:- mark this cell as part of the open space.
//     tiles[start[0]][start[1]].state = "start"
//     tiles[start[0]][start[1]].primsVisited = true
//     removeElmentFromArray(wallList,  tiles[start[0]][start[1]])
//     // Step 2C:- Add the walls of the cell to the wall list.
//     var neighbours = tiles[start[0]][start[1]].neighbours
//     for(let i=0; i<neighbours.length; i++){
//             wallList.push(neighbours[i])
//     }
    
//     // Step 3: While there are walls in the list:
//     //      1: Pick a random wall from the list. If only one of the two cells that the wall divides is visited, then:
//                     // Make the wall a passage and mark the unvisited cell as part of the maze.
//                     // Add the neighboring walls of the cell to the wall list.
//     //      2: Remove the wall from the list.
//     var tester = 0
//     const abc = () => {
// 		console.log("\n\n-------------------------------------------------------------------")
// 		tester ++ 
// 		if(tester > 15){
// 			return
// 		}
//         if(wallList.length==0){
//             return
// 		}
// 		if(wallList.length > tileRowCount*tileColumnCount){
// 			console.log("WallList  was larger than the max allowable length")
// 			return
// 		}

// 		var currentCell = wallList[0]
// 		// console.log("Wall list[0] = ", wallList[0])
// 		// for(var i = 0; i<wallList.length; i++){
// 		// 	console.log("wallList[i] = ", wallList[i])
// 		// }
// 		// console.log("Wall list  = ", wallList)
// 		var neighboursVisited = countNeighboursVisited(tiles[currentCell.column][currentCell.row])
//         if(neighboursVisited < 2){
// 			tiles[currentCell.column][currentCell.row].state = "empty"
// 			tiles[currentCell.column][currentCell.row].primsVisited = true
			
//         }
// 		removeElmentFromArray(wallList,  tiles[currentCell.column][currentCell.row])
//         var neighbours = tiles[currentCell.column][currentCell.row].neighbours
//         for(let i=0; i<neighbours.length; i++){
// 			if(!neighbours[i].primsVisited){
// 				console.log("Pusinng this to the wall list", neighbours[i])
// 				wallList.push(tiles[neighbours[i].column][[neighbours[i].row]])
// 			}
// 		}

// 		console.log("Before removal request")
// 		for(var i = 0; i<wallList.length; i++){
// 			console.log("wallList[i] = ", wallList[i])
// 		}

// 		console.log("Current = ", tiles[currentCell.column][currentCell.row])

// 		removeElmentFromArray(wallList,  tiles[currentCell.column][currentCell.row])
// 		console.log("After removal request")
// 		for(var i = 0; i<wallList.length; i++){
// 			console.log("wallList[i] = ", wallList[i])
// 		}
// 		setTimeout(abc, delay)
// 	}
// 	abc()
// 	tiles[end[0]][end[1]].state="end"
	
// }



// function countNeighboursVisited(tile){
// 	var neighbours = tile.neighbours
// 	let count = 0
// 	for(let i=0; i< neighbours.length; i++){
// 		if (neighbours[i].row == tile.row && neighbours[i].primsVisited){
// 			count++
// 		} 
// 	}
// 	return count
// }

// function PrimsMazeGeneration() {

// 	console.log("Running  maze generation with Prims algorithm")

// 	// Step1:- Start with a grid full of walls
//     for(var c=0; c<tileColumnCount; c++){
//         for(var r=0; r<tileRowCount; r++){
//                 tiles[c][r].state = "wall"
//         }
//     }
// 	//  define a wall list
// 	let wallList = []

// 	 // Step 2A:- Pick the starting cell
// 	tiles[start[0]][start[1]].state = "start"

// 	// Step 2B:- mark this cell as part of the open space.
// 	tiles[start[0]][start[1]].primsVisited = true

// 	// Step 2C:- Add the walls of the cell to the wall list.
// 	var neighbours =	tiles[start[0]][start[1]].neighbours
// 	console.log("neighbours for the starting block = ", neighbours)
// 	for(let i=0; i<neighbours.length; i++){
// 		wallList.push(tiles[neighbours[i].column][neighbours[i].row])
// 		console.log("WallList inside push = ", wallList)
// 	}
//     // Step 3: While there are walls in the list:
//     //      1: Pick a random wall from the list. If only one of the two cells that the wall divides is visited, then:
//                     // Make the wall a passage and mark the unvisited cell as part of the maze.
//                     // Add the neighboring walls of the cell to the wall list.
// 	//      2: Remove the wall from the list.
// 	const abc = ()=>{
// 		console.log("Wall List inside abc = ", wallList)
// 		if(wallList.length <1){
// 			console.log("Wall list empty")
// 			return
// 		}
// 		if(wallList.length  > tileColumnCount*tileRowCount){
// 			console.log("WallList  was larger than the max allowable length")
// 			return
// 		}

// 		let currentCell = wallList.pop()
// 		var neighboursVisited = countNeighboursVisited(tiles[currentCell.column][currentCell.row])
// 		tiles[currentCell.column][currentCell.row].primsVisited = true

// 		if (neighboursVisited < 2){
// 			// make this cell a passage
// 			tiles[currentCell.column][currentCell.row].state = "empty"
// 			var neighbours = tiles[currentCell.column][currentCell.row].neighbours
// 			for (let i = 0; i<neighbours.length; i++){
// 				if(!neighbours[i].primsVisited){
// 					wallList.push(tiles[neighbours[i].column][neighbours[i].row])
// 				}
// 			}

// 		}
// 		setTimeout(abc, 100)
// 	}
// 	abc()
// }