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
