// this file will contain all the code related to the main app

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    console.log("sleeping for", miliseconds, "milliseconds")
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }