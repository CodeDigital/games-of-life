const CLASS_CELL_INACTIVE = 'cell';
const CLASS_CELL_ACTIVE = 'cell cell-active';

/**
 * Class function for Cell object.
 *
 * @param {int} x
 * @param {int} y
 * @param {boolean} isAlive
 * @return {Cell} 
 */
function Cell(x, y, isAlive) {
    
    // Current and future states of cell
    this.alive = isAlive
    this.willBeAlive = false

    // Position data
    this.x = x
    this.y = y
    this.index = cellIndex(this.x, this.y)

    // DOM data
    this.element = document.createElement('div')
    this.element.className = 'cell' + (isAlive ? ' cell-active':'')
    this.element.id = this.index

    /**
     * When cell is clicked, switch its state
     *
     */
    this.element.onclick = () => {
        this.setCurrentState(!this.alive)
        this.setFutureState(this.alive)
        console.log('clicked ' + this.index)
    }

    /**
     * Hard set the current and future states
     *
     * @param {boolean} isAlive
     */
    this.resetState = (isAlive) => {
        this.setCurrentState(isAlive)
        this.setFutureState(isAlive)
    }

    /**
     * Set the current state
     *
     * @param {boolean} isAlive
     */
    this.setCurrentState = (isAlive) => {
        
        if(isAlive) {
            this.alive = true
            this.element.className = CLASS_CELL_ACTIVE
        }else{
            this.alive = false
            this.element.className = CLASS_CELL_INACTIVE
        }
    }

    /**
     * Set the future state
     *
     * @param {boolean} willBeAlive
     */
    this.setFutureState = (willBeAlive) => {
        this.willBeAlive = willBeAlive
    }

    /**
     * Update the future state based on neighbour counts
     * (AKA apply Conway's rules)
     *
     * @param {*} activeNeighbours
     */
    this.updateFutureState = (activeNeighbours) => {
        if(activeNeighbours == 3 || (activeNeighbours == 2 && this.alive)){
            this.willBeAlive = true
            return
        }
        this.willBeAlive = false
    }

    /**
     * Current state is set to future state.
     * Future state is assumed to always be false
     * (not that that makes a massive difference)
     *
     */
    this.iterateState = () => {
        
        this.setCurrentState(this.willBeAlive)
        this.willBeAlive = false
    }

    return this
}

// cell coords to index
function cellIndex(x, y) {
    return x + y * GRID_WIDTH
}