
//  helper function to remove elements from an array
function removeElmentFromArray (arr, element){
	for (var i = arr.length -1; i >=0; i--){
		if (arr[i] == element) {
			arr.splice(i, 1);
			}
	}
}
//  helper Hurestics Function
function hurestics(a, b){
	//  Euclidean distance
	var dist1 = Math.pow(  (Math.pow( (a.column-b.column) , 2) + Math.pow(a.row-b.row, 2) )  ,  0.5)
	//  dist if we can not go along the diagonals
	// var dist2 = Math.abs(a.x-b.x) + Math.abs(a.y-b.y) 
	return dist1
}

function Astar(){
	
	isRunning = true
	let solved = false
	let openSet = [tiles[start[0]][start[1]]]
	let closedSet = []
	let current = openSet[0]
	const goal = tiles[end[0]][end[1]]

	while(openSet.length > 0){
		if(!isRunning){
			break
		}
		if (current.column == goal.column && current.row == goal.row){
			isRunning = false
			solved = true
		}

		removeElmentFromArray(openSet, current)
		closedSet.push(current)

		var neighbours = current.neighbours
		for (let i=0; i< neighbours.length; i++){
			var neighbour = neighbours[i]

			if(!closedSet.includes(neighbour) && neighbour.state !=="wall"){
				var tempG = (current.g ) + hurestics(current, neighbour);
				var newPathBetter = false
				if (openSet.includes(neighbour)){
					if(tempG < neighbour.g){
						newPathBetter = true
						tiles[neighbour.column][neighbourer.row].g =  tempG
					}
				}

			}else{
				newPathBetter = true // since this is the only path known so far we say it is better
				tiles[neighbourer.column][neighbourer.row].g = tempG
				openSet.push(neighbour)
			}

			if(newPathBetter){
				tiles[neighbourer.column][neighbourer.row].h = hurestics(neighbour, goal) 
				tiles[neighbourer.column][neighbourer.row].f = hurestics(neighbour, goal) +  tiles[neighbourer.column][neighbourer.row].g
				tiles[neighbourer.column][neighbourer.row].previous = current 
			}
		}
	}

	let winnerIndex = 0
	for(var i=0; i<openSet.length; i++){
		if(openSet[i]){
			
		}
	}

}