import type { SquareMat } from "../../types.ts"
import { cofactor } from "./cofactor.ts";

/**
 * Returns the determinant of a matrix.
 */
function det(mat: SquareMat): number {
	switch (mat.length) {
	case 2: {
		return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0]
	}
	case 3: {
		return (
			mat[0][0] * mat[1][1] * mat[2][2] +
			mat[0][1] * mat[1][2] * mat[2][0] +
			mat[0][2] * mat[1][0] * mat[2][1] -
			mat[0][2] * mat[1][1] * mat[2][0] -
			mat[0][1] * mat[1][0] * mat[2][2] -
			mat[0][0] * mat[1][2] * mat[2][1]
		)
	}
	case 4: {
		let cofactorExpansionSum = 0
	
		for (let col = 0; col < mat.length; col++) {
			cofactorExpansionSum += mat[0][col] * cofactor(mat, 0, col)
		}
		
		return cofactorExpansionSum
	}}
}

export { det }
