import type { Mat4, Vec4 } from "../../types.ts"
import { dot } from "../vector_operations/dot.ts"
import { identity } from "../special_matrices/identity.ts"
import { copy } from "../general_operations/copy.ts"

/**
 * Concatenates (multiplies) matrices together, returning the product as a
 * new matrix.
 * 
 * The order of the multiplication is right-to-left, just like in mathematical
 * notation. I.e.,
 * ```ts
 * concat(a, b, c)
 * ```
 * computes the matrix product `a * (b * c)` and returns it.
 */
function concat(...matrices: Mat4[]): Mat4 {
	if (matrices.length === 0) {
		return identity(4)
	}

	if (matrices.length === 1) {
		return copy(matrices[0])
	}

	const right = copy(matrices[matrices.length - 1])
	const rightCol = Array<number>(4) as Vec4
	for (let matrixIdx = matrices.length - 2; matrixIdx >= 0; matrixIdx--) {
		const left = matrices[matrixIdx]
		for (let col = 0; col < 4; col++) {
			rightCol[0] = right[0][col]
			rightCol[1] = right[1][col]
			rightCol[2] = right[2][col]
			rightCol[3] = right[3][col]
			for (let row = 0; row < 4; row++) {
				right[row][col] = dot(left[row], rightCol)
			}
		}
	}

	return right
}

/**
 * Concatenates (multiplies) matrices together, storing the product in the last
 * matrix.
 * 
 * The order of the multiplication is right-to-left, just like in mathematical
 * notation. I.e.,
 * ```ts
 * concat(a, b, c)
 * ```
 * computes the matrix product `a * (b * c)` and stores it in `c`.
 * 
 * @returns A reference to the last matrix, which now stores the product. 
 */
function concat_i(...matrices: Mat4[]): Mat4 {
	if (matrices.length === 0) {
		return identity(4)
	}

	if (matrices.length === 1) {
		return matrices[0]
	}

	const right = matrices[matrices.length - 1]
	const rightCol = Array<number>(4) as Vec4
	for (let matrixIdx = matrices.length - 2; matrixIdx >= 0; matrixIdx--) {
		const left = matrices[matrixIdx]
		for (let col = 0; col < 4; col++) {
			rightCol[0] = right[0][col]
			rightCol[1] = right[1][col]
			rightCol[2] = right[2][col]
			rightCol[3] = right[3][col]
			for (let row = 0; row < 4; row++) {
				right[row][col] =
					left[row][0] * rightCol[0] +
					left[row][1] * rightCol[1] +
					left[row][2] * rightCol[2] +
					left[row][3] * rightCol[3] 
			}
		}
	}

	return right
}

export {
	concat,
	concat_i
}
