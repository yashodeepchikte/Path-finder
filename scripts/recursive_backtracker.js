
function get_neighbours(c, r) {

	let neighbours = []
	if (tiles[c + 2]) {
		if (!tiles[c + 2][r].visited) {
			neighbours.push(tiles[c + 2][r])
		}
	}
	if (tiles[c - 2]) {
		if (!tiles[c - 2][r].visited) {
			neighbours.push(tiles[c - 2][r])
		}
	}
	if (tiles[c][r + 2]) {
		if (!tiles[c][r + 2].visited) {
			neighbours.push(tiles[c][r + 2])
		}
	}
	if (tiles[c][r - 2]) {
		if (!tiles[c][r - 2].visited) {
			neighbours.push(tiles[c][r - 2])
		}
	}
	return neighbours
}



function recursiveBacktracker() {


	let current = tiles[start[0]][start[1]]
	for (let c = 0; c < tileColumnCount; c++) {
		for (let r = 0; r < tileRowCount; r++) {
			tiles[c][r].state = "wall"
			tiles[c][r].visited = false
		}
	}
	const recursiveFunction = (current) => {

		tiles[current.column][current.row].visited = true
		tiles[current.column][current.row].state = "open"
		if (!(current.column === end[0] && current.row === end[1]) && !(current.column === start[0] && current.row === start[1])) {

			setTimeout(() => tiles[current.column][current.row].state = "empty", 100)
		}
		let neighbours = get_neighbours(current.column, current.row)



		if (neighbours.length == 0) {
			tiles[current.column][current.row].visited = true

			console.log("tiles[current.column][current.row].previous = ", tiles[current.column][current.row].previous)
			if (tiles[current.column][current.row].previous) {

				next = tiles[current.column][current.row].previous
				tiles[start[0]][start[1]].state = "start"
				tiles[end[0]][end[1]].state = "end"
				setTimeout(() => recursiveFunction(next), 10)
			} else {
				tiles[start[0]][start[1]].state = "start"
				tiles[end[0]][end[1]].state = "end"
				return
			}
		} else {

			for (let i = 0; i < neighbours.length; i++) {
				tiles[neighbours[i].column][neighbours[i].row].previous = tiles[current.column][current.row]
				// tiles[neighbours[i].column][neighbours[i].row].state = "neighbour"
			}

			tiles[current.column][current.row].visited = true

			rand_index = Math.floor(Math.random() * neighbours.length)
			console.log("Rand_index = ", rand_index)
			next = neighbours[rand_index]
			tiles[next.column][next.row].state = "empty"
			// tiles[neighbours[rand_index].column][tiles[neighbours[rand_index].row]].state = "empty"
			col = current.column + neighbours[rand_index].column
			col = Math.floor(col / 2)
			row = current.row + neighbours[rand_index].row
			row = Math.floor(row / 2)

			tiles[col][row].state = "empty"
			current = tiles[next.column][next.row]
			tiles[start[0]][start[1]].state = "start"
			tiles[end[0]][end[1]].state = "end"
			setTimeout(() => recursiveFunction(current), delay / 5)
		}
		tiles[start[0]][start[1]].state = "start"
		tiles[end[0]][end[1]].state = "end"
	}
	recursiveFunction(current)


}