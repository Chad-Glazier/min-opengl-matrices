import type { SquareMat } from "../../types.ts";

/**
 * Returns a new matrix that represents the transpose.
 * 
 * @param mat: The matrix to transpose.
 */
function transpose<T extends SquareMat>(mat: T): T {
	const n = mat.length

	const transposed = Array(n)
	for (let row = 0; row < n; row++) {
		transposed[row] = Array(n)
		for (let col = 0; col < n; col++) {
			transposed[row][col] = mat[col][row]
		}
	}

	return transposed as T
}

/**
 * Transposes a matrix in-place, mutating it. This version is more efficient 
 * than {@link transpose}.
 * 
 * @param mat: The matrix to transpose.
 * @returns a reference to the original matrix.
 */
function transpose_i<T extends SquareMat>(mat: T): T {
	const n = mat.length
	
	let tmp: number
	for (let row = 0; row < n; row++) {
		for (let col = row + 1; col < n; col++) {
			tmp = mat[row][col]
			mat[row][col] = mat[col][row]
			mat[col][row] = tmp
		}
	}

	return mat
}

export {
	transpose,
	transpose_i
}
