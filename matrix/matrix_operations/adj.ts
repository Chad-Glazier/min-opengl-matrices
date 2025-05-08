import type { SquareMat } from "../../types.ts"
import { cofactor } from "./cofactor.ts"

/**
 * Returns the adjugate matrix.
 * 
 * @param mat 
 */
function adj<T extends SquareMat>(mat: T): T {
	const n = mat.length
	const adjugate = Array(n)

	for (let row = 0; row < n; row++) {
		adjugate[row] = Array(n)
		for (let col = 0; col < n; col++) {
			adjugate[row][col] = cofactor(mat, col, row)
		}
	}

	return adjugate as T
}

export { adj }
