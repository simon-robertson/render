import { Matrix, Vector } from './types/math.js'
import { Pixels, Radians, Units } from './types/units.js'

/** */
const cache: Matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

/** */
export const createMatrix = (): Matrix => {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
}

/**
 * @param width viewport width
 * @param height viewport height
 * @param angle field of view
 * @param near clipping distance
 * @param far clipping distance
 */
export const createProjectionMatrix = (
    width: Pixels,
    height: Pixels,
    angle: Radians,
    near: Units,
    far: Units
): Matrix => {
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

/** */
export const createVector = (): Vector => {
    return [0, 0, 0, 1]
}

/**
 * @param matrix
 * @param output
 */
export const copyMatrix = (matrix: Matrix, output?: Matrix): Matrix => {
    if (matrix === output) {
        return output
    }

    if (output === undefined) {
        output = createMatrix()
    }

    for (let i = 0; i < 16; i++) {
        output[i] = matrix[i]
    }

    return output
}

/**
 * @param vector
 * @param output
 */
export const copyVector = (vector: Vector, output?: Vector): Vector => {
    if (vector === output) {
        return output
    }

    if (output === undefined) {
        output = createVector()
    }

    for (let i = 0; i < 4; i++) {
        output[i] = vector[i]
    }

    return output
}

/**
 * @param matrix
 * @param rotation
 */
export const rotateMatrix = (matrix: Matrix, rotation: Vector, output: Matrix = matrix): Matrix => {
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
 * @param matrix
 * @param scale
 */
export const scaleMatrix = (matrix: Matrix, scale: Vector, output: Matrix = matrix): Matrix => {
    for (let i = 0; i < 16; i += 4) {
        const x = matrix[i + 0]
        const y = matrix[i + 1]
        const z = matrix[i + 2]
        const w = matrix[i + 3]

        cache[i + 0] = x * scale[0]
        cache[i + 1] = y * scale[1]
        cache[i + 2] = z * scale[2]
        cache[i + 3] = w
    }

    return copyMatrix(cache, output)
}

/**
 * @param matrix
 * @param translation
 * @param output
 */
export const translateMatrix = (matrix: Matrix, translation: Vector, output: Matrix = matrix): Matrix => {
    for (let i = 0; i < 16; i += 4) {
        const x = matrix[i + 0]
        const y = matrix[i + 1]
        const z = matrix[i + 2]
        const w = matrix[i + 3]

        cache[i + 0] = x + w * translation[0]
        cache[i + 1] = y + w * translation[1]
        cache[i + 2] = z + w * translation[2]
        cache[i + 3] = w
    }

    return copyMatrix(cache, output)
}

/**
 * @param vector
 * @param transformation
 */
export const transformVector = (vector: Vector, transformation: Matrix, output: Vector = vector): Vector => {
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
