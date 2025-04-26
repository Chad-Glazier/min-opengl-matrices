import { Mat4, Point, Vec } from "../../types.ts";

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
	const n = mat.length;

	if (Array.isArray(mat[n - 1])) {
		// mat is a matrix
		const newMatrix: Mat4 = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
		for (let rowIdx = 0; rowIdx < n; rowIdx++) {
			for (let colIdx = 0; colIdx < n; colIdx++) {
				newMatrix[rowIdx][colIdx] = fn(
					(mat as Mat4)[rowIdx][colIdx],
					rowIdx,
					colIdx,
				);
			}
		}
		return newMatrix as T;
	}

	if (mat[3] === 0) {
		// mat is a vector
		return [
			fn(mat[0], 0, 0),
			fn(mat[1], 1, 0),
			fn(mat[2], 2, 0),
			0,
		] as T;
	}

	// mat is a point
	return [
		fn((mat as Point)[0], 0, 0),
		fn((mat as Point)[1], 1, 0),
		fn((mat as Point)[2], 2, 0),
		mat[3],
	] as T;
}

export default map;
