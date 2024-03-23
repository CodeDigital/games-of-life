const GRID_WIDTH = 256;
const GRID_HEIGHT = 144;
const PROB_CELL_INITIAL_ACTIVE = 0.4
const NEIGHBOUR_DELTAS = [
    [-1, -1], [0, -1], [1, -1],
    [-1,  0],          [1,  0],
    [-1,  1], [0,  1], [1,  1]
]
let grid = []


/**
 * Creates the initial cell grid in DOM.
 *
 */
function createGrid() {
    // Get the container
    const container = document.getElementById('cell-container');

    // create the cells, append to grid array, and add to cell container.
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            let newCell = new Cell(x, y, Math.random() < PROB_CELL_INITIAL_ACTIVE)
            container.appendChild(newCell.element)
            grid[newCell.index] = newCell
        }
        container.appendChild(document.createElement('br'))
    }

}

/**
 * Performs a frame update of the grid.
 * (AKA iterate the game of life)
 *
 */
function updateGrid() {
    // count the active neighbours and update the future state
    grid.forEach((cell) => {
        cell.updateFutureState(countActiveNeighbours(grid, cell))
    });

    // update the states of the cells to their new states
    grid.forEach((cell) => {
        cell.iterateState()
    });
}

/**
 * Set every cell in the grid to dead state.
 * (clear the grid)
 * 
 */
function clearGrid() {
    grid.forEach((cell) => {
        cell.resetState(false)
    })
}

/**
 * Randomly populate the grid
 * 
 */
function populateGrid() {
    grid.forEach((cell) => {
        let newState = Math.random() < PROB_CELL_INITIAL_ACTIVE
        cell.resetState(newState)
    })
}

/**
 * Count the number of active/alive neighbours for a given cell
 * 
 * @param {Cell[]} grid 
 * @param {Cell} cell 
 * @returns {int}
 */
function countActiveNeighbours(grid, cell){
    let numActive = 0

    // iterate on the neighbour delta vectors
    NEIGHBOUR_DELTAS.forEach((neighbourDelta) => {
        let nx = cell.x + neighbourDelta[0]
        let ny = cell.y + neighbourDelta[1]
        if(nx < 0 || nx >= GRID_WIDTH || ny < 0 || ny >= GRID_HEIGHT) return
        let nindex = cellIndex(nx, ny)
        if(grid[nindex].alive) numActive++
    })

    return numActive
}

/**
 * Calculate the index of the cell in the grid array
 *
 * @param {int} x
 * @param {int} y
 * @return {int} 
 */
function cellIndex(x, y) {
    return x + y * GRID_WIDTH
}