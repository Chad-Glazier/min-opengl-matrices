import type { Mat4 } from "../../types.ts"

/**
 * Creates an affine translation transformation.
 * 
 * For example,
 * ```ts
 * const translation = translate(1, 2, 3)
 * ```
 * or, if you need the inverse as well,
 * ```ts
 * const [ translation, invTranslation ] = translate(1, 2, 3, true)
 * ```
 * @param x: The amount to translate along the x-axis.
 * @param y: The amount to translate along the y-axis. 
 * @param z: The amount to translate along the z-axis.
 * @param computeInverse: Indicates whether or not to compute the inverse at
 * the same time. Computing the inverse this way is much faster than any
 * numerical method of inverting the matrix.
 * @returns the matrix transformation, along with its inverse transformation if
 * specified.
 */
function translate(x: number, y: number, z: number, computeInverse?: false): Mat4
function translate(x: number, y: number, z: number, computeInverse: true): [ matrix: Mat4, inverse: Mat4 ]
function translate(x: number, y: number, z: number, computeInverse: boolean = false): Mat4 | [ matrix: Mat4, inverse: Mat4 ] {
	const matrix: Mat4 = [
		[ 1, 0, 0, x ],
		[ 0, 1, 0, y ],
		[ 0, 0, 1, z ],
		[ 0, 0, 0, 1 ]
	]
	
	if (!computeInverse) {
		return matrix
	}
	
	const inverse: Mat4 = [
		[ 1, 0, 0, -x ],
		[ 0, 1, 0, -y ],
		[ 0, 0, 1, -z ],
		[ 0, 0, 0, 1  ]
	]
	
	return [ matrix, inverse ]	
}

/**
 * Returns the inverse of the specified translation matrix.
 * 
 * @param x: The amount to translate along the x-axis.
 * @param y: The amount to translate along the y-axis. 
 * @param z: The amount to translate along the z-axis.
 */
function translateInverse(x: number, y: number, z: number): Mat4 {
	return [
		[ 1, 0, 0, -x ],
		[ 0, 1, 0, -y ],
		[ 0, 0, 1, -z ],
		[ 0, 0, 0, 1  ]
	]
}

export { translate, translateInverse }
