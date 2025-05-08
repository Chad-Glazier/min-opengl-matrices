import type { SquareMat } from "../../types.ts"

/**
 * Returns the determinant of a submatrix formed by omitting a specific row
 * and column from a larger matrix. This is usually used as an intermediate
 * step in calculating more useful values like the determinant and adjugate
 * matrix.
 * 
 * https://en.wikipedia.org/wiki/Minor_(linear_algebra)
 * 
 * @param rowIndexToExclude 
 * @param columnIndexToExclude 
 * @param mat 
 */
function minor(
	rowIndexToExclude: number, 
	columnIndexToExclude: number, 
	mat: SquareMat
): number {
	switch (mat.length) {
	case 2: {
		return mat[rowIndexToExclude === 0 ? 1 : 0][columnIndexToExclude === 0 ? 1 : 0]
	}
	case 3: {
		let termsFound = 0
		const terms = Array(4)

		for (let row = 0; row < 3; row++) {
			if (row === rowIndexToExclude) {
				continue
			}
			for (let col = 0; col < 3; col++) {
				if (col === columnIndexToExclude) {
					continue
				}
				terms[termsFound] = mat[row][col]
				termsFound++
			}
		}

		return terms[0] * terms[2] - terms[1] * terms[3]
	}
	case 4: {
		let termsFound = 0
		const terms = Array(9)

		for (let row = 0; row < 4; row++) {
			if (row === rowIndexToExclude) {
				continue
			}
			for (let col = 0; col < 4; col++) {
				if (col === columnIndexToExclude) {
					continue
				}
				terms[termsFound] = mat[row][col]
				termsFound++
			}
		}

		return (
			terms[0] * terms[4] * terms[8] +
			terms[1] * terms[5] * terms[6] +
			terms[2] * terms[3] * terms[7] -
			terms[2] * terms[4] * terms[6] -
			terms[1] * terms[3] * terms[8] -
			terms[0] * terms[5] * terms[7]
		)
	}}
}

export { minor }
