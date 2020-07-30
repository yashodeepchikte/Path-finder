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

 function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }