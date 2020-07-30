
function DFS_MazeGenerator(c, r) {

    createBlackMaze()
    const abc = (c, r) => {        
        // Generate a loop to go over 4 directions
        //  0 = down  1 = right  2 = up  3 = left
        //  all our movements will be in steps of 2 cells
        for(var i = 0; i<4; i++){
            switch(i){
                case 0:
                    //  moving down
                    if(!(r+2 > tileRowCount) && tiles[c][r+2]){
                        if(tiles[c][r+2].state != "empty"){
                            //  set these 2 cells to an empty passage
                            tiles[c][r+1].state = "empty"
                            tiles[c][r+2].state = "empty"
                            setTimeout( () => abc(c, r+2), 100)
                        }
                    }else{
                        //  do nothing
                    }
                    // break
                case 1:
                    //  moving left
                    
                    if( !(c+2 > tileColumnCount - 1) && tiles[c+2][r]){
                        if(tiles[c+2][r].state!="empty"){
                            //  set these 2 cells to an empty passage
                            tiles[c+1][r].state = "empty"
                            tiles[c+2][r].state = "empty"
                            setTimeout( () => abc(c+2, r), 100)
                        }
                    }else{
                        //  do nothing
                    }
                    // break
                
                case 2:
                    //  Moving up
                    if( !(r-2 < 0) && tiles[c][r-2]){
                        if(tiles[c][r-2].state != "empty"){
                        //  set these 2 cells to an empty passage
                        tiles[c][r-1].state = "empty"
                        tiles[c][r-2].state = "empty"
                        setTimeout( () => abc(c, r-2), 100 )

                        }
                    }else{
                        //  Do nothing
                    }
                    // break
                case 3:
                    //  Moving Left
                    if(!(c-2 < 0) && tiles[c-2][r]){
                        if(tiles[c-2][r].state !="empty"){
                            //  Set these two cells to empty passage
                            tiles[c-1][r].state ="empty"
                            tiles[c-2][r].state = "empty"
                            abc(c-2, r)
                            setTimeout(()=>abc(c-2, r), 100)
                        }
                    }else{
                        //  Do Nothing
                    }      
                    // break
            }
        }
    }
    abc(5, 10)
}