let canvas: HTMLCanvasElement

/** */
const synchronizeCanvasSize = (): void => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
}

/** */
export const initializeViewport = async (): Promise<void> => {
    canvas = document.querySelector('#viewport') as HTMLCanvasElement

    if (canvas === null) {
        throw new Error('Failed to access the viewport canvas element')
    }

    synchronizeCanvasSize()

    window.addEventListener('resize', synchronizeCanvasSize, { passive: true })
}

/** */
export const getViewportCanvas = (): HTMLCanvasElement => {
    return canvas
}
