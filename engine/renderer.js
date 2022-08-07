/** @type {WebGL2RenderingContext} */
let canvasContext

/**
 * @param {HTMLCanvasElement} canvas
 */
export const initializeRenderer = async (canvas) => {
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
}
