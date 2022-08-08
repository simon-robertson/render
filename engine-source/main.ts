import { getViewportCanvas, initializeViewport } from './viewport.js'
import { initializeRenderer } from './renderer.js'

/** */
const main = async (): Promise<void> => {
    // The initialisation order is important here.
    await initializeViewport()
    await initializeRenderer(getViewportCanvas())
}

main()
