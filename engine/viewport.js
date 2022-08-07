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
        throw new Error('Viewport canvas not found')
    }

    synchronizeCanvasSize()

    window.addEventListener('resize', synchronizeCanvasSize, { passive: true })
}

/** */
export const getViewportCanvas = () => canvas
