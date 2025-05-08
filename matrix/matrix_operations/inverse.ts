import type { SquareMat } from "../../types.ts"
import { adj } from "./adj.ts"

/**
 * Returns the inverse of a matrix, computed with the adjugate-determinant
 * formula.
 * 
 * @returns the inverse matrix, unless the inverse doesn't exist (in which
 * case `null` is returned).
 */
function inverse<T extends SquareMat>(mat: T): T | null {
	const n = mat.length

	const adjugate = adj(mat)

	let determinant = 0
	for (let i = 0; i < n; i++) {
		determinant += mat[0][i] * adjugate[i][0]
	}

	if (determinant === 0) {
		return null
	}

	for (let row = 0; row < n; row++) {
		for (let col = 0; col < n; col++) {
			adjugate[row][col] /= determinant
		}
	}

	return adjugate
}

export { inverse }
