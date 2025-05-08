import type { Mat4, Point, Vec } from "../../types.ts"

/**
 * Applies a given function to every element of a matrix, returning a new
 * matrix (without mutating the original) with the respective return values.
 * If the matrix is a point or vector then last element, the scaling
 * coordinate `w`, is ignored.
 *
 * @param mat the matrix to map over.
 * @param fn the callback function to apply to each element.
 * @returns a new matrix of the same dimensionality as the original.
 */
function map<T extends Mat4 | Vec | Point>(
	mat: T,
	fn: (a: number, rowIdx: number, colIdx: number) => number,
): T {
	if (typeof mat[3] === "number") {
		// mat is a `Point` or a `Vec`
		return [
			fn((mat as Point)[0], 0, 0),
			fn((mat as Point)[1], 1, 0),
			fn((mat as Point)[2], 2, 0),
			mat[3]
		] as T
	}

	// mat is a `Mat4`
	const newMatrix: Mat4 = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	]
	for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
		for (let colIdx = 0; colIdx < 4; colIdx++) {
			newMatrix[rowIdx][colIdx] = fn(
				mat[rowIdx][colIdx],
				rowIdx,
				colIdx,
			)
		}
	}
	return newMatrix as T
}

/**
 * Applies a given function to every element of a matrix, mutating it in-place
 * and returning it. If the matrix is a point or vector then last element (the 
 * scaling coordinate `w`) is ignored.
 *
 * @param mat The matrix to map over.
 * @param fn The callback function to apply to each element.
 * @returns a reference to the original matrix.
 */
function map_i<T extends Mat4 | Vec | Point>(
	mat: T,
	fn: (a: number, rowIdx: number, colIdx: number) => number,
): T {
	if (typeof mat[3] === "number") {
		// mat is a `Point` or a `Vec`
		mat[0] = fn(mat[0], 0, 0)
		mat[1] = fn(mat[1], 1, 0)
		mat[2] = fn(mat[2], 2, 0)

		return mat
	}

	// mat is a `Mat4`
	for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
		for (let colIdx = 0; colIdx < 4; colIdx++) {
			mat[rowIdx][colIdx] = fn(
				mat[rowIdx][colIdx],
				rowIdx,
				colIdx,
			);
		}
	}
	return mat
}

export {
	map,
	map_i
}
