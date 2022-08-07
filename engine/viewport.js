/** @type {HTMLCanvasElement} */
let canvas

/** @type {WebGL2RenderingContext} */
let canvasContext

/** */
export const initializeViewport = async () => {
    canvas = document.querySelector('#viewport')

    if (canvas === null) {
        throw new Error('Viewport canvas not found')
    }

    canvasContext = canvas.getContext('webgl2', {
        alpha: false,
        depth: true,
        stencil: true,
        antialias: false,
        desynchronized: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance'
    })

    if (canvasContext === null) {
        throw new Error('Failed to create the WebGL2 rendering context')
    }

    return
}
