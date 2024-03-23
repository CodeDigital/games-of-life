let paused = false

/**
 * Set up the grid and update the FPS display
 *
 */
window.onload = () => {
    
    createGrid()
    updateFPS(0)
}
/**
 * Keyboard management
 *
 * @param {event} event
 */
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

/**
 * Game loop
 * Reference: https://www.sitepoint.com/quick-tip-game-loop-in-javascript/
 * 
 * @param {*} timestamp
 */
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

// initiate the render timestamp and deltatime tracker (also start game loop)
let lastRender = 0
let dt = 0
window.requestAnimationFrame(loop)
