/** @type {HTMLCanvasElement} */
let canvas

/** */
const synchronizeCanvasSize = () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
}

/**
 * @param {Window} window
 */
export const initializeViewport = async (window) => {
    canvas = window.document.querySelector('#viewport')

    if (canvas === null) {
        throw new Error('Failed to access the viewport canvas element')
    }

    synchronizeCanvasSize()

    window.addEventListener('resize', synchronizeCanvasSize, { passive: true })
}

/** */
export const getViewportCanvas = () => canvas
