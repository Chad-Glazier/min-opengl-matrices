import { Mat2, Mat3, Mat4 } from "../../types.ts"

/**
 * Returns the determinant of a matrix.
 * 
 * @param mat 
 * @returns 
 */
function det<T extends Mat4 | Mat3 | Mat2>(mat: T): number {
	const n = mat.length

	switch (n) {
	case 2:
		return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0]
	case 3: {
		let cofactorExpansionSum = 0
		for (let col = 0; col < 3; col++) {
			const sign = col % 2 == 0 ? +1 : -1
			cofactorExpansionSum += 
				sign * 
				mat[0][col] * 
				det(subMat3(0, col, mat))
		}
		return cofactorExpansionSum
	}
	case 4: {
		let cofactorExpansionSum = 0
		for (let col = 0; col < 4; col++) {
			const sign = col % 2 == 0 ? +1 : -1
			cofactorExpansionSum += 
				sign * 
				mat[0][col] * 
				det(subMat4(0, col, mat))
		}
		return cofactorExpansionSum
	}}
}

// returns the submatrix of a Mat3 with the specified row and column excluded.
function subMat3(rowIndexToExclude: number, columnIndexToExclude: number, mat: Mat3): Mat2 {
	const subMat: Mat2 = [
		[0, 0],
		[0, 0]
	]

	let subMatRow = 0
	for (let row = 0; row < 3; row++) {
		if (row == rowIndexToExclude) {
			continue
		}
		let subMatCol = 0
		for (let col = 0; col < 3; col++) {
			if (col == columnIndexToExclude) {
				continue
			}
			subMat[subMatRow][subMatCol] = mat[row][col]
			subMatCol++
		}
		subMatRow++
	}

	return subMat
}

// returns the submatrix of a Mat4 with the specified row and column excluded.
function subMat4(rowIndexToExclude: number, columnIndexToExclude: number, mat: Mat4): Mat3 {
	const subMat: Mat3 = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	]

	let subMatRow = 0
	for (let row = 0; row < 4; row++) {
		if (row == rowIndexToExclude) {
			continue
		}
		let subMatCol = 0
		for (let col = 0; col < 4; col++) {
			if (col == columnIndexToExclude) {
				continue
			}
			subMat[subMatRow][subMatCol] = mat[row][col]
			subMatCol++
		}
		subMatRow++
	}

	return subMat
}

export default det
