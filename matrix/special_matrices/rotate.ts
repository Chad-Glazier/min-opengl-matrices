import type { Mat4 } from "../../types.ts"
import { transpose } from "../matrix_operations/transpose.ts"

/**
 * Creates an affine rotation matrix about an arbitrary axis.
 * 
 * For example,
 * ```ts
 * const rotation = rotate([ 0, 1, 2 ], Math.PI / 3)
 * ```
 * or, if you need the inverse as well,
 * ```ts
 * const [ rotation, invRotation ] = rotate([ 0, 1, 2 ], Math.PI / 3, true)
 * ```
 * 
 * @param axis: The axis of rotation.
 * @param angle: The magnitude of the rotation, in radians. Positive values are
 * counterclockwise, negative values are clockwise.
 * @param computeInverse: Indicates whether or not to compute the inverse at
 * the same time. For rotation matrices in particular, the inverse is always
 * easy to compute (as it is the transpose) but this option is still included 
 * to maintain a consistent interface.
 * @returns A matrix that induces the specified rotation, as well as the 
 * inverse transformation if specified.
 */
function rotate(axis: [ x: number, y: number, z: number ], angle: number, computeInverse?: false): Mat4 
function rotate(axis: [ x: number, y: number, z: number ], angle: number, computeInverse: true): [ matrix: Mat4, inverse: Mat4 ]
function rotate(axis: [ x: number, y: number, z: number ], angle: number, computeInverse: boolean = false): [ matrix: Mat4, inverse: Mat4 ] | Mat4 {
	const sin = Math.sin(angle)
	const cos = Math.cos(angle)
	const oneMinusCos = 1 - cos
	const [ x, y, z ] = axis

	const matrix: Mat4 = [
		[
			cos + x * x * oneMinusCos, 
			x * y * oneMinusCos - z * sin,
			x * z * oneMinusCos + y * sin,
			0
		],
		[
			x * y * oneMinusCos + z * sin,
			cos + y * y * oneMinusCos,
			y * z * oneMinusCos - x * sin,
			0
		],
		[
			x * z * oneMinusCos - y * sin,
			y * z * oneMinusCos + x * sin,
			cos + z * z * oneMinusCos,
			0
		],
		[
			0, 0, 0, 1
		]
	]

	if (!computeInverse) {
		return matrix
	}

	return [ matrix, transpose(matrix) ]
}

/**
 * Returns the inverse of the specified rotation matrix.
 * 
 * @param axis: The axis of rotation.
 * @param angle: The magnitude of the rotation, in radians. Positive values are
 * counterclockwise, negative values are clockwise.
 */
function rotateInverse(axis: [ x: number, y: number, z: number ], angle: number): Mat4 {
	const sin = Math.sin(-angle)
	const cos = Math.cos(-angle)
	const oneMinusCos = 1 - cos
	const [ x, y, z ] = axis

	return [
		[
			cos + x * x * oneMinusCos, 
			x * y * oneMinusCos - z * sin,
			x * z * oneMinusCos + y * sin,
			0
		],
		[
			x * y * oneMinusCos + z * sin,
			cos + y * y * oneMinusCos,
			y * z * oneMinusCos - x * sin,
			0
		],
		[
			x * z * oneMinusCos - y * sin,
			y * z * oneMinusCos + x * sin,
			cos + z * z * oneMinusCos,
			0
		],
		[
			0, 0, 0, 1
		]
	]
}

export { rotate, rotateInverse }
