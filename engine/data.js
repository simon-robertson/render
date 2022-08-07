/** @type {Map<string, unknown>} */
const resourceCache = new Map()

/**
 * @param {string} path
 */
export const load = (path) => {
    const resource = `/data/${path}.json`

    if (resourceCache.has(resource)) {
        return Promise.resolve(resourceCache.get(resource))
    }

    return fetch(resource)
        .then((response) => response.json())
        .then((data) => {
            resourceCache.set(resource, data)

            return data
        })
}

/**
 * @param {string} sceneId
 */
export const loadScene = (sceneId) => load(`scenes/${sceneId}`)

/** */
export const loadSceneList = () => load('scenes')
