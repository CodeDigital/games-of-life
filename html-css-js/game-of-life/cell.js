const CLASS_CELL_INACTIVE = 'cell';
const CLASS_CELL_ACTIVE = 'cell cell-active';

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