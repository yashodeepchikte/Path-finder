// this file will contain all the code related to the main app

let delay = 5


function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    console.log("sleeping for", miliseconds, "milliseconds")
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }

 //  helper function to remove elements from an array
function removeElmentFromArray (arr, element){
	for (var i = arr.length -1; i >=0; i--){
		if (arr[i] == element) {
			arr.splice(i, 1);
			}
	}
}

 function handelSpeedChange(value){
     console.log("delay = ",  value, " milliSecond")
     value = Number(value)
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



//   var canvas = document.querySelector("canvas");
  var video = document.querySelector("video");
  var videoStream = canvas.captureStream(30);
var mediaRecorder = new MediaRecorder(videoStream);

var chunks = [];
mediaRecorder.ondataavailable = function(e) {
  chunks.push(e.data);
};

mediaRecorder.onstop = function(e) {
    var blob = new Blob(chunks, { 'type' : 'video/mp4' });
    chunks = [];
    var videoURL = URL.createObjectURL(blob);
    video.src = videoURL;
  };
  mediaRecorder.ondataavailable = function(e) {
    chunks.push(e.data);
  };
