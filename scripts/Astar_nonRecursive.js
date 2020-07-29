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
	console.log("running A*")
	isRunning = true
	var solved = false
	var openSet = [tiles[start[0]][start[1]] ]
	var closedSet = []

	while(openSet.length != 0 && !solved){

		//  First we will find the node in the openset having the lowest f value
		minIndex = 0
		for(var i=0; i<openSet.length; i++){
			if (openSet[i].f < openSet[minIndex].f){
				minIndex = i
			}
		}

		currentNode = openSet[minIndex]
		
		if(currentNode.column == tiles[end[0]][end[1]].column && currentNode.row == tiles[end[0]][end[1]].row){
			solved = true
			isRunning = false		


			break
		}
		if(closedSet.length > tileRowCount*tileColumnCount){
			isRunning = false
			solved = false
			break	
		}

		removeElmentFromArray(openSet, currentNode)

		closedSet.push(tiles[currentNode.column][currentNode.row])
		if(tiles[currentNode.column][currentNode.row].state!="start" &&	 tiles[currentNode.column][currentNode.row].state !="end"){

			tiles[currentNode.column][currentNode.row].state = "visited"
		}

		var neighbours = currentNode.neighbours

		for(var i=0; i<neighbours.length; i++){

			if(tiles[neighbours[i].column][neighbours[i].row].state != "wall" && !closedSet.includes(tiles[neighbours[i].column][neighbours[i].row])){
				var tempG = tiles[currentNode.column][currentNode.row].g + hurestics(tiles[currentNode.column][currentNode.row] ,tiles[neighbours[i].column][neighbours[i].row])
				var newPathBetter = false

				if(openSet.includes(tiles[neighbours[i].column][neighbours[i].row])){
					//  this block will run only of the node is already in the open set meaning we already have a path for this node
					//  the hurestic will remain the same but the value of g will be differet
					// we should change this value only if the g value is lesser than the already existing g value
					if(tempG<tiles[neighbours[i].column][neighbours[i].row].g){
						newPathBetter = true
						tiles[neighbours[i].column][neighbours[i].row].g = tempG
					}
				}else{
					newPathBetter = true // since this will be the only path we have for the node
					tiles[neighbours[i].column][neighbours[i].row].g = tempG
					openSet.push(tiles[neighbours[i].column][neighbours[i].row])
					tiles[neighbours[i].column][neighbours[i].row].state="open"
				}
				
				if(newPathBetter){
					tiles[neighbours[i].column][neighbours[i].row].h = hurestics(tiles[neighbours[i].column][neighbours[i].row], tiles[end[0]][end[1]])
					tiles[neighbours[i].column][neighbours[i].row].f = tiles[neighbours[i].column][neighbours[i].row].g + tiles[neighbours[i].column][neighbours[i].row].h
					tiles[neighbours[i].column][neighbours[i].row].previous = tiles[currentNode.column][currentNode.row]
				}
			}
		}
		clear()
		draw()
	}
	console.log("while loop ended")
	if(solved == false){
		alert("no solution")
	}else{
		var temp = tiles[end[0]][end[1]]
		tiles[end[0]][end[1]].state ="end"
		while(temp.previous){
			// sleep(1000)
			// console.log("sleeping for 100")
			tiles[temp.column][temp.row].state = "path"
			temp = tiles[temp.column][temp.row].previous
		}
	}
	isRunning = false

}