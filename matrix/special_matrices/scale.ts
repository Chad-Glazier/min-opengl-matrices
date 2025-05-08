import type { Mat4 } from "../../types.ts"

/**
 * Creates an affine scaling transformation.
 * 
 * For example,
 * ```ts
* const scaling = scale(1, 2, 3)
* ```
* or, if you need the inverse as well,
* ```ts
* const [ scaling, invScaling ] = scale(1, 2, 3)
* ```
* 
* @param x: The amount to scale along the x axis.
* @param y: The amount to scale along the y axis.
* @param z: The amount to scale along the z axis.
* @param computeInverse: Indicates whether or not to compute the inverse at
* the same time.
* @returns A matrix that induces the specified rotation, as well as the 
* inverse transformation if specified.
*/
function scale(x: number, y: number, z: number, computeInverse?: false): Mat4
function scale(x: number, y: number, z: number, computeInverse: true): [ matrix: Mat4, inverse: Mat4 ]
function scale(x: number, y: number, z: number, computeInverse: boolean = false): Mat4 | [ matrix: Mat4, inverse: Mat4 ] {
	const matrix: Mat4 = [
		[ x, 0, 0, 0 ],
		[ 0, y, 0, 0 ],
		[ 0, 0, z, 0 ],
		[ 0, 0, 0, 1 ]
	]

	if (!computeInverse) {
		return matrix
	}

	const inverse: Mat4 = [
		[ 1/x, 0, 0, 0 ],
		[ 0, 1/y, 0, 0 ],
		[ 0, 0, 1/z, 0 ],
		[ 0, 0,   0, 1 ]
	]

	return [ matrix, inverse ]
}

/**
 * Returns the inverse of the specified scaling transformation.
 * 
 * @param x: The amount to scale along the x axis.
 * @param y: The amount to scale along the y axis.
 * @param z: The amount to scale along the z axis.
 */
function scaleInverse(x: number, y: number, z: number): Mat4 {
	return [
		[ 1/x, 0, 0, 0 ],
		[ 0, 1/y, 0, 0 ],
		[ 0, 0, 1/z, 0 ],
		[ 0, 0,   0, 1 ]
	]
}

export { scale, scaleInverse }
