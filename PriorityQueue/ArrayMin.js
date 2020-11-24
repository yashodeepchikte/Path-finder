class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}



class ArrayPriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        // This is used to add values to the queue
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        return this.bubbleUp()
    }

    bubbleUp() {
        // This function gets the nodes in correct order
        return this.values.sort((a, b) => a.priority - b.priority)
    }

    dequeue() {
        // this function will extract the min value from the PQ
        if (this.values.length > 0) {
            let p = this.values.pop(0)
            return p
        } else {
            console.log("There was an attempt to extract from empty PQ")
        }
    }

    changePriority(key, newPriority) {
        let element = this.values.filter(a => a.val == key)
        if (element.length == 0 || element.length > 1) {
            console.log("More than one or 0 elements witht the given key")
            return false
        } else {
            for (let i = 0; i < this.values.length; i++) {
                if (this.values[i].val == key) {
                    this.values[i].priority = newPriority
                    this.bubbleUp()
                    break
                }
            }
            return true
        }
    }


}