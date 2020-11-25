const djkstra = (event) => {
    event.preventDefault()
    console.log("Djkstra function was called ")

    let distances = {}
    let pred = {}
    //  Initializing the graph 
    //  1 --> set the distance to all the nodes to infinity
    //    --> set distance to the starte node to be 0
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            distances[getString(r, c)] = 1000000;
            pred[getString(r, c)] = null;
        }
    }

    distances[getString(start.row, start.col)] = 0

    //  2 --> initialise the priority queue
    let PQ
    let heapType = document.getElementById("heapType").value ? document.getElementById("algorithm").value : "Array"
    if (heapType == "Array") {
        PQ = new ArrayPriorityQueue()
    } else if (heapType == "Binary Min heap") {
        PQ = new BinaryHeapPQ()
    } else {
        PQ = new ArrayPriorityQueue()
    }

    PQ.enqueue(getString(start.row, start.col), 0)

    while (PQ.values.length > 0) {

        let current = PQ.dequeue()
        // console.log("-------------------")
        // console.log("current  = ", current)
        let [r, c] = getIndex(current.val)
        let neighbourers = getNeighbours(r, c)
        // console.log("neighbourers = ", neighbourers)
        visitedList.push(getString(r, c))
        if (r == end.row && c == end.col) {
            alert("path was found")
            // put in a call for the draw path function
            break
        }
        for (i = 0; i < neighbourers.length; i++) {
            let neighbourer = neighbourers[i]
            let [neb_r, neb_c] = getIndex(neighbourer)

            if (weights[getString(r, c)] && weights[getString(neb_r, neb_c)]) {


                let edgeWeight = Math.max(weights[getString(r, c)][getString(neb_r, neb_c)], weights[getString(neb_r, neb_c)][getString(r, c)])
                let temp_distance = edgeWeight + distances[getString(r, c)]
                if (temp_distance < distances[getString(neb_r, neb_c)]) {
                    //  new path is better  
                    distances[getString(neb_r, neb_c)] = temp_distance
                    pred[getString(neb_r, neb_c)] = getString(r, c)
                    // console.log("callsing 1")
                    PQ.changePriority(getString(neb_r, neb_c), distances[getString(neb_r, neb_c)])
                    // console.log("callsing 5")

                } else {
                    //  the old path is already better
                }
                PQ.enqueue(getString(neb_r, neb_c), distances[getString(neb_r, neb_c)])
            }
        }
        drawBoard()
    }
    // alert("The function has ended")


}