/** @typedef {number} Pixels */
/** @typedef {number} Radians */
/** @typedef {number} Units */
/** @typedef {number[]} Matrix */
/** @typedef {number[]} Vector */

/** @type {Matrix} */
const cache = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

/**
 * @returns {Matrix}
 */
export const createMatrix = () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]

/**
 * @param {Pixels} width viewport width
 * @param {Pixels} height viewport height
 * @param {Radians} angle field of view
 * @param {Units} near clipping distance
 * @param {Units} far clipping distance
 * @returns {Matrix}
 */
export const createProjectionMatrix = (width, height, angle, near, far) => {
    const a = width / height
    const f = Math.tan(Math.PI * 0.5 - angle * 0.5)
    const i = 1 / (near - far)

    const matrix = createMatrix()

    matrix[0] = f / a
    matrix[5] = f
    matrix[10] = (near + far) * i
    matrix[11] = -1
    matrix[14] = near * far * i * 2
    matrix[15] = 0

    return matrix
}

/**
 * @returns {Vector}
 */
export const createVector = () => [0, 0, 0, 1]

/**
 * @param {Matrix} matrix
 * @param {Matrix} output
 */
export const copyMatrix = (matrix, output = null) => {
    if (matrix === output) {
        return output
    }

    if (output === null) {
        output = createMatrix()
    }

    for (let i = 0; i < 16; i++) {
        output[i] = matrix[i]
    }

    return output
}

/** */
export const copyVector = (vector, output = null) => {
    if (vector === output) {
        return output
    }

    if (output === null) {
        output = createVector()
    }

    for (let i = 0; i < 4; i++) {
        output[i] = vector[i]
    }

    return output
}

/**
 * @param {Matrix} matrix
 * @param {Vector} rotation
 */
export const rotateMatrix = (matrix, rotation, output = matrix) => {
    if (rotation[1] !== 0) {
        const c = Math.cos(rotation[1])
        const s = Math.sin(rotation[1])
        const n = -s

        for (let i = 0; i < 16; i += 4) {
            const x = matrix[i + 0]
            const y = matrix[i + 1]
            const z = matrix[i + 2]
            const w = matrix[i + 3]

            cache[i + 0] = x * c + z * n
            cache[i + 1] = y
            cache[i + 2] = x * s + z * c
            cache[i + 3] = w
        }
    }

    if (rotation[0] !== 0) {
        const c = Math.cos(rotation[0])
        const s = Math.sin(rotation[0])
        const n = -s

        for (let i = 0; i < 16; i += 4) {
            const x = matrix[i + 0]
            const y = matrix[i + 1]
            const z = matrix[i + 2]
            const w = matrix[i + 3]

            cache[i + 0] = x
            cache[i + 1] = y * c + z * s
            cache[i + 2] = y * n + z * c
            cache[i + 3] = w
        }
    }

    if (rotation[2] !== 0) {
        const c = Math.cos(rotation[2])
        const s = Math.sin(rotation[2])
        const n = -s

        for (let i = 0; i < 16; i += 4) {
            const x = matrix[i + 0]
            const y = matrix[i + 1]
            const z = matrix[i + 2]
            const w = matrix[i + 3]

            cache[i + 0] = x * c + y * s
            cache[i + 1] = x * n + y * c
            cache[i + 2] = z
            cache[i + 3] = w
        }
    }

    return copyMatrix(cache, output)
}

/**
 * @param {Matrix} matrix
 * @param {Vector} scale
 */
export const scaleMatrix = (matrix, scale, output = matrix) => {
    for (let i = 0; i < 16; i += 4) {
        let x = matrix[i + 0]
        let y = matrix[i + 1]
        let z = matrix[i + 2]
        let w = matrix[i + 3]

        cache[i + 0] = x * scale[0]
        cache[i + 1] = y * scale[1]
        cache[i + 2] = z * scale[2]
        cache[i + 3] = w
    }

    return copyMatrix(cache, output)
}

/**
 * @param {Matrix} matrix
 * @param {Vector} translation
 * @param {Matrix} output
 */
export const translateMatrix = (matrix, translation, output = null) => {
    for (let i = 0; i < 16; i += 4) {
        let x = matrix[i + 0]
        let y = matrix[i + 1]
        let z = matrix[i + 2]
        let w = matrix[i + 3]

        cache[i + 0] = x + w * translation[0]
        cache[i + 1] = y + w * translation[1]
        cache[i + 2] = z + w * translation[2]
        cache[i + 3] = w
    }

    return copyMatrix(cache, output)
}

/**
 * @param {Vector} vector
 * @param {Matrix} transformation
 */
export const transformVector = (vector, transformation, output = vector) => {
    const x = vector[0]
    const y = vector[1]
    const z = vector[2]
    const w = vector[3]

    cache[0] = x * transformation[0] + y * transformation[4] + z * transformation[8] + w * transformation[12]
    cache[1] = x * transformation[1] + y * transformation[5] + z * transformation[9] + w * transformation[13]
    cache[2] = x * transformation[2] + y * transformation[6] + z * transformation[10] + w * transformation[14]
    cache[3] = x * transformation[3] + y * transformation[7] + z * transformation[11] + w * transformation[15]

    return copyVector(cache, output)
}
