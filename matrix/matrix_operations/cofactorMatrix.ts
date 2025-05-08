import type { SquareMat } from "../../types.ts"
import { cofactor } from "./cofactor.ts"

/**
 * Returns the cofactor matrix.
 * 
 * @param mat 
 */
function cofactorMatrix<T extends SquareMat>(mat: T): T {
	const n = mat.length
	const cofactors = Array(n)

	for (let row = 0; row < n; row++) {
		cofactors[row] = Array(n)
		for (let col = 0; col < n; col++) {
			cofactors[row][col] = cofactor(mat, row, col)
		}
	}

	return cofactors as T
}

export { cofactorMatrix }
