const GRID_WIDTH = 256;
const GRID_HEIGHT = 144;
const CLASS_CELL_INACTIVE = 'cell';
const CLASS_CELL_ACTIVE = 'cell cell-active';
const PROB_CELL_INITIAL_ACTIVE = 0.4
const NEIGHBOUR_DELTAS = [
    [-1, -1], [0, -1], [1, -1],
    [-1,  0],          [1,  0],
    [-1,  1], [0,  1], [1,  1]
]
const fpsOptions = [1/5,1,2,5,10,30,60]
let fpsIndex = 3
let grid = []
let paused = false

// create the game grid
window.onload = () => {
    createGrid()
    updateFPS(0)
}

window.onkeydown = (event) => {
    switch (event.key) {
        case 'c':
            clearGrid()
            break;
        case 'r':
            populateGrid()
            break;

        case 'ArrowUp':
            updateFPS(1)
            break;

        case 'ArrowDown':
            updateFPS(-1)
            break;

        case ' ':
            paused = !paused

        default:
            break;
    }
}

function fps() {
    return fpsOptions[fpsIndex]
}

function updateFPS(deltaIndex){
    fpsIndex = Math.max(
        0, 
        Math.min(
            fpsOptions.length - 1, 
            deltaIndex + fpsIndex
        )
    )
    let fpsSpan = document.getElementById('fps')
    fpsSpan.innerText = 'FPS: ' + fps()
}

// start game loop from https://www.sitepoint.com/quick-tip-game-loop-in-javascript/
function loop(timestamp) {

    if(!paused) {
        // update dt in seconds
        dt += (timestamp - lastRender) / 1000;

        // run the cell updates while dt is greater than spf.
        for(;dt >= 1/fps(); dt -= 1/fps()){
            // console.log('test')
            updateGrid()
        }
    }

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}
let lastRender = 0
let dt = 0
window.requestAnimationFrame(loop) 

// create the grid and return it
function createGrid() {

    // get the body element
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

// update the grid 
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

function clearGrid() {
    grid.forEach((cell) => {
        cell.resetState(false)
    })
}

function populateGrid() {
    grid.forEach((cell) => {
        let newState = Math.random() < PROB_CELL_INITIAL_ACTIVE
        cell.resetState(newState)
    })
}

function countActiveNeighbours(grid, cell){
    let numActive = 0

    NEIGHBOUR_DELTAS.forEach((neighbourDelta) => {
        let nx = cell.x + neighbourDelta[0]
        let ny = cell.y + neighbourDelta[1]
        if(nx < 0 || nx >= GRID_WIDTH || ny < 0 || ny >= GRID_HEIGHT) return
        let nindex = cellIndex(nx, ny)
        if(grid[nindex].alive) numActive++
    })

    return numActive
}


// cell object
function Cell(x, y, isAlive) {

    this.alive = isAlive
    this.willBeAlive = false
    this.x = x
    this.y = y
    this.index = cellIndex(this.x, this.y)
    this.element = document.createElement('div')
    this.element.className = 'cell' + (isAlive ? ' cell-active':'')
    this.element.id = this.index
    this.element.onclick = () => {
        this.setState(!this.alive)
        this.setFutureState(this.alive)
        console.log('clicked ' + this.index)
    }

    this.resetState = (isAlive) => {
        this.setState(isAlive)
        this.setFutureState(isAlive)
    }

    this.setState = (isAlive) => {
        if(isAlive) {
            this.alive = true
            this.element.className = CLASS_CELL_ACTIVE
        }else{
            this.alive = false
            this.element.className = CLASS_CELL_INACTIVE
        }
    }

    this.setFutureState = (willBeAlive) => {
        this.willBeAlive = willBeAlive
    }

    // update active status to new value
    this.updateFutureState = (activeNeighbours) => {
        if(activeNeighbours == 3 || (activeNeighbours == 2 && this.alive)){
            this.willBeAlive = true
            return
        }
        this.willBeAlive = false
    }

    this.iterateState = () => {
        this.setState(this.willBeAlive)
        this.willBeAlive = false
    }

    return this
}

// cell coords to index
function cellIndex(x, y) {
    return x + y * GRID_WIDTH
}