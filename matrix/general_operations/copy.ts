import type { 
	SquareMat, Point, Vec
} from "../../types.ts";

/**
 * Used to copy a matrix.
 * 
 * @param mat The matrix to copy.
 * @returns A copy of the matrix.
 */
function copy<T extends SquareMat | Point | Vec>(mat: T): T {
	if (typeof mat[0] === "number") {
		// mat is a `Point` or `Vec`
		return [
			mat[0],
			mat[1],
			mat[2],
			mat[3]
		] as T
	}

	// mat is a `SquareMat`
	const n = mat.length
	const copied = Array(n)
	for (let row = 0; row < n; row++) {
		copied[row] = Array(n)
		for (let col = 0; col < n; col++) {
			copied[row][col] = (mat as SquareMat)[row][col]
		}
	}
	return copied as T
}

export { copy }
