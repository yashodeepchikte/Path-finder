
function DFS(){
	console.log("running DFS")
	var solved = false
	var openSet = [tiles[start[0]][start[1]] ]  // this is changed in these functinons :-  handelMouseMoveStart, resetMaze 
	var closedSet = []
	var isRunning = true

		// This will clear any residual paath state cells from any previous session
	// This is only for proper visualisarion and makes no effect on the actual function
	for(var c=0; c<tileColumnCount; c++){
        for(var r=0; r<tileRowCount; r++){
            if( tiles[c][r].state !="wall" &&  tiles[c][r].state != "start" &&  tiles[c][r].state != "end"){
                tiles[c][r].state = "empty"
            }
        }
	}
	
	const recursiveFunction = () => {
		if (openSet.length == 0){
			console.log("open set is empty")
			return
		}
		if (solved){
			console.log("Solved is true")
			solved = false
			openset = []
			return
		}
		if( !isRunning ){
			console.log("returning because isRunning is false")
			return
		}
		isRunning = true                                     //     ------------------------------------------>  TODo -->     Check if this is required

		currentNode = openSet.shift()

		if(currentNode.column == tiles[end[0]][end[1]].column && currentNode.row == tiles[end[0]][end[1]].row){
			solved = true
			isRunning = false
			clearPath()
			setTimeout(showPath, delay)	
			openSet=[]
			return
		}

		closedSet.push(currentNode)

		if(tiles[currentNode.column][currentNode.row].state!="start" &&	 tiles[currentNode.column][currentNode.row].state !="end"){
			tiles[currentNode.column][currentNode.row].state = "visited"
		}
		
		var neighbours = currentNode.neighbours

		for(var i=0; i<neighbours.length; i++){
			if(tiles[neighbours[i].column][neighbours[i].row].state != "wall" && !closedSet.includes(tiles[neighbours[i].column][neighbours[i].row])){
				openSet.push(neighbours[i])
			}
		}
		recursiveFunction()
		// setTimeout(recursiveFunction, delay)

	}
	recursiveFunction()
}