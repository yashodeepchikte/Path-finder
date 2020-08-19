




function dijkstras(){

    console.log("Running Dijkstra's Algorithm")
    let openSet = [tiles[start[0]][start[1]]]
    let closedSet = []
    let solved = false
    let _isRunning = true


    for(var c=0; c<tileColumnCount; c++){
        for(var r=0; r<tileRowCount; r++){
            if( tiles[c][r].state !="wall" &&  tiles[c][r].state != "start" &&  tiles[c][r].state != "end"){
                tiles[c][r].state = "empty"
            }
        }
    }

    const recursiveFunction = () => {
        // console.log("\n\nOpenSet = ", openSet)

        // for (let i = 0; i < openSet.length; i++){
        //     console.log("Openset element = ", openSet[i])
        // }
        if(openSet.length == 0){
            _isRunning = false
            console.log("Debug : returning because the openset is empty")
            return
        }
        if(_isRunning == false){
            console.log("Debug : returning because _isRunning is false")
            return
        }
        if(solved == true){
            console.log("Debug : returning because solved = true")
            return
        }


        minIndex = 0
        for(var i=0; i<openSet.length; i++){
            if (openSet[i].g < openSet[minIndex].g){
                minIndex = i
            }
        }

        currentNode = openSet[minIndex]

        if(currentNode.column == tiles[end[0]][end[1]].column && currentNode.row == tiles[end[0]][end[1]].row ){
            solved = true
            _isRunning = false
            clearPath()
			setTimeout(showPath, delay)	
            return
        }
        closedSet.push(currentNode)
        removeElmentFromArray(openSet, currentNode)
        if(tiles[currentNode.column][currentNode.row].state!="start" &&	 tiles[currentNode.column][currentNode.row].state !="end"){
            tiles[currentNode.column][currentNode.row].state = "visited"
        }

        if(tiles[currentNode.column][currentNode.row].state!="start" &&	 tiles[currentNode.column][currentNode.row].state !="end"){
            tiles[currentNode.column][currentNode.row].state = "visited"
        }

        var neighbours = currentNode.neighbours
        // console.log("current node = ", currentNode)
        // console.log("Neighbours = ", neighbours)

        for(var i=0; i<neighbours.length; i++){

            if(tiles[neighbours[i].column][neighbours[i].row].state != "wall" && !closedSet.includes(tiles[neighbours[i].column][neighbours[i].row])){
                var tempG = tiles[currentNode.column][currentNode.row].g + 1
                var newPathBetter = false   
			    if(openSet.includes(tiles[neighbours[i].column][neighbours[i].row])){
                    if(tempG<tiles[neighbours[i].column][neighbours[i].row].g){
                        newPathBetter = true
                        tiles[neighbours[i].column][neighbours[i].row].g = tempG
                    }
                }else{
                    newPathBetter = true
                    tiles[neighbours[i].column][neighbours[i].row].g = tempG
                    openSet.push(tiles[neighbours[i].column][neighbours[i].row])
                    // console.log("Pusing - ", neighbours[i])
                    tiles[neighbours[i].column][neighbours[i].row].state="open"
                }

                if(newPathBetter){
                    tiles[neighbours[i].column][neighbours[i].row].previous = tiles[currentNode.column][currentNode.row]
                }
            }
        }

        setTimeout(recursiveFunction, delay)
    }

    recursiveFunction()


}