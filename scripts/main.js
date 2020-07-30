// this file will contain all the code related to the main app

let delay = 10


function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    console.log("sleeping for", miliseconds, "milliseconds")
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }

 function handelSpeedChange(value){
     console.log(value)
     delay = value
 }

 function randomInteger(upper){
     let number = Math.floor(Math.random()*upper)
     return number
 }

 function createBlackMaze(){
    for(var c=0; c<tileColumnCount; c++){
        for(var r=0; r<tileRowCount; r++){
            tiles[c][r].state = "wall"
        }
    }
 }