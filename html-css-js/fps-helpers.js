const fpsOptions = [1/5,1,2,5,10,30,60,120]
let fpsIndex = 3

/**
 * Return the fps based on the fpsIndex variable
 *
 * @return {number} 
 */
function fps() {
    return fpsOptions[fpsIndex]
}

/**
 * Update the index of FPS.
 * Also update the FPS text based on the new index.
 *
 * @param {int} deltaIndex
 */
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