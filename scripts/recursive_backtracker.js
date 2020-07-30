function invert() {
    console.log("invert was called")

    for(let c=0; c<tileColumnCount; c++){
        for(let r=0; r<tileRowCount; r++){
            if(tiles[c][r].state == "wall"){
                tiles[c][r].state = "empty"
            }
            else if(tiles[c][r].state =="empty"){
                tiles[c][r].state = "wall"
            }
        }
    }
}

function cleanup(){
    start = [0, 0]
    end = [tileColumnCount-1, tileRowCount-1]
    tiles[0][0].state = "start"
    for(let c = 1; c < tiles.length; c++){
        tiles[c][0].state = "empty"
    }
    for(let c = 1; c < tiles.length; c++){
        tiles[c][2].state = "empty"
    }
    for(let c = 1; c<tiles.length/2; c++){
        tiles[c][Math.floor(tileRowCount/2)].state = "empty"
    }
    for(let c = 1; c<tiles.length/2; c++){
        tiles[tiles.length-c-1][Math.ceil(tileRowCount/2)+1].state = "empty"
    }
    
    tiles[0][1].state = "empty"
    tiles[1][0].state = "empty"

    tiles[1][1].state = "empty"
    
    tiles[0][2].state = "empty"
    tiles[2][0].state = "empty"
    tiles[2][2].state = "empty"

    // tiles[3][3].state = "empty"
    // tiles[3][0].state = "empty"
    // tiles[0][3].state = "empty"

    // tiles[][3].state = "empty"
    // tiles[3][0].state = "empty"
    // tiles[0][3].state = "empty"

    tiles[tileColumnCount-1][tileRowCount-1].state = "end"
    tiles[tileColumnCount-2][tileRowCount-1].state = "empty"
    tiles[tileColumnCount-1][tileRowCount-2].state = "empty"
    tiles[tileColumnCount-2][tileRowCount-2].state = "empty"
    tiles[tileColumnCount-1][tileRowCount-3].state = "empty"
    tiles[tileColumnCount-3][tileRowCount-1].state = "empty"

}
function recursiveBacktracker(){

    createBlackMaze()

    openSet2 = [tiles[0][0]]
    const abc = (current) => {
        console.log("openset 2 = ", openSet2)
        if(openSet2.length == 0){
            console.log("openset is empty")
            // invert()
            cleanup()
            return
        }
        if(openSet2.length > tileColumnCount*tileRowCount){
            return
        }
        let currentNeighbours = []
        if(current.row + 2 < tileRowCount  && tiles[current.column][current.row+2]){
            if(tiles[current.column][current.row+2].state != "empty"){
                // tiles[current.column+1][current.row].state = "empty"
                // tiles[current.column+2][current.row].state = "empty"
                currentNeighbours.push(tiles[current.column][current.row+2])
                // tiles[current.column][current.row+2].state = "open"
            }
            else{
                //  do nothing
            }
        }
        if(current.row - 2 > 0 && tiles[current.column][current.row-2]){
            if(tiles[current.column][current.row-2].state != "empty"){
                // tiles[current.column+1][current.row].state = "empty"
                // tiles[current.column+2][current.row].state = "empty"
                currentNeighbours.push(tiles[current.column][current.row-2])
                // tiles[current.column][current.row-2].state = "open"
            }
            else{
                //  do nothing
            }
        }
        if(current.column + 2 < tileColumnCount  && tiles[current.column + 2][current.row]){
            if(tiles[current.column + 2][current.row].state != "empty"){
                // tiles[current.column+1][current.row].state = "empty"
                // tiles[current.column+2][current.row].state = "empty"
                currentNeighbours.push(tiles[current.column+2][current.row])
                // tiles[current.column+2][current.row].state = "open"
            }
            else{
                //  do nothing
            }
        }  
        if(current.column - 2 > 0  && tiles[current.column - 2][current.row]){
            if(tiles[current.column - 2][current.row].state != "empty"){
                // tiles[current.column+1][current.row].state = "empty"
                // tiles[current.column+2][current.row].state = "empty"
                currentNeighbours.push(tiles[current.column-2][current.row])
                // tiles[current.column-2][current.row].state = "open"
            }
            else{
                //  do nothing
            }
        }
        if(currentNeighbours.length !=0){
            let randINdex = Math.floor(Math.random()*currentNeighbours.length)
            for(let i = 0; i<currentNeighbours.length; i++){
                if(i!=randINdex){
                    openSet2.push(currentNeighbours[i])
                }
            }

            next = currentNeighbours[randINdex]
            
            if(next.row - current.row < 0 && next.column == current.column){
                //  merging with top
                current.state = "empty"
                next.state = "empty"
                if(tiles[current.column][current.row-1]){
                    tiles[current.column][current.row-1].state = "empty"
                }
                if(tiles[current.column][current.row -2]){
                    tiles[current.column][current.row -2].state = "empty"
                }
            }
            if(next.row == current.row && next.coumn - current.column > 0){
                // moving right
                if( tiles[current.column+1]){
                    tiles[current.column+1][current.row].state = "empty"
                }
                if(tiles[current.column+2]){
                    tiles[current.column+2][current.row].state = "empty"
                }
            }
            if(next.row - current.row > 0 && next.column == current.column){
                // moving down
                if(tiles[current.column][current.row+1]){
                    tiles[current.column][current.row+1].state = "empty"
                }
                if(tiles[current.column][current.row+2]){
                    tiles[current.column][current.row+2].state = "empty"
                }
            }
            if(next.row == current.row && next.column - current.column < 0){
                // moving left
                if(tiles[current.column-1]){
                    tiles[current.column-1][current.row].state = "empty"
                } 
                if(tiles[current.column-2]){
                    tiles[current.column-2][current.row].state = "empty"
                }
            }





            setTimeout(() => abc(next), 50)
        }else{
            current = openSet2.pop()
            // current.state = "current"
            setTimeout(()=>abc(current), 50)
        }
    }
    abc(openSet2[0])
    // invert()
   

}