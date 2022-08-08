let canvasContext: WebGL2RenderingContext

/** */
export const initializeRenderer = async (canvas: HTMLCanvasElement): Promise<void> => {
    canvasContext = canvas.getContext('webgl2', {
        alpha: false,
        depth: true,
        stencil: true,
        antialias: false,
        desynchronized: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance'
    }) as WebGL2RenderingContext

    if (canvasContext === null) {
        throw new Error('Failed to create the rendering context')
    }
}
