import { initializeRenderer } from './renderer.js'
import { getViewportCanvas, initializeViewport } from './viewport.js'

/** */
const main = async () => {
    // The initialisation order is important here.
    await initializeViewport(window)
    await initializeRenderer(getViewportCanvas())
}

main()
